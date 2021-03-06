---
layout  : wiki
title   : "The new ext4 filesystem: current status and future plans"
summary : 
date    : 2020-04-30 19:42:16 +0900
lastmod : 2020-05-01 23:11:40 +0900
tags    : [linux, ext4 ,filesystem]
draft   : false
parent  : 
---

## Abstract
* 주요 키워드 : scalability, performance, reliability, stability
* 2007 년 논문임을 가만하고 읽으면 좋다.

## 1. Introduction
* `ext3`의 장점 : 안정성(stable), 엄격성(robust)
* `ext3`의 단점 : 큰 규모에 한계 (큰 파일과 많은 파일)

### 단점 극복에 관한 기존 방안
* `ext3`는 최대 16TB 만 지원가능
* 이미 기업에선 한계점이 보임 (디스크 최대 용량은 매년 2배가 되고 있음)
* 물론, `larger filesystem capacity`와 `extents mapping`을 담고 있는 패치를 2006년 선보였으나, 이 패치는  결국 disk의 형식을 변경하고 호환성을 버릴수 밖에 없었다.
* 따라서 여기선 ext3를 버리고 ext4로 새로 분기 했다.

### 주요 목표
* scalability (확장성), performance (성능), reliability (신뢰성) 을 모두 고려한 주소 방식을 제시하는 것이 목표
* 기존의 문제가 해결된 `XFS` 기반이나, 혹은 아예 새로운 기반에서 시작하지 않는 이유 => 호환성 문제 : ext3에서 ext4로 넘어오기 편하게 하기 위해서.

---
## 2. Scalability enhancements
### 2.1 Large filesystem (파일 시스템의 최대 용량)
* ext3에선 32-bit block number 를 사용 => ext4에서 48-bit block number 사용으로 전환 (용량 2의 16승 증가 => 16,384배 증가)
* 각 block 별 크기는 4KB가 기본이고 이를 계산해보면 2^(48+12) = 2^60 bytes = 1EB
* 이에 따른 Metadata(
   [[superblock]],
   [[group descriptor table]]{group descriptor},
   [[journal]]) 또한 변화해야한다.
  * 따라서 새로운 32-bit fields 를 block group descriptor structure에 추가함.
* 주소 체계의 변화로 인해, journaling block layer(JBD)  또한 48bit를 지원하도록 수정해야한다. 따라서 JDB2로 분기했고, 아직(이 논문을 낼 당시) 32-bit와 64-bit filesystem이 모두 호환이 되는 JDB를 만들지는 못했다.
* 질문점 : 왜 굳이 64가 아닌 48bit를 선택하였는가? 간략하게 설명하면 48 bit 만 사용해도 단순 계산으로 119년이 소모되고, 그 사이에 충분히 논의가 가능하다. 또한 실험을 통해 성능 체크를 해보았을때 64bit는 너무 많다.

### 2.1.1 Future work
* 현재 (논문을 쓸 당시) 해결 못한 이슈로는 block groups의 수가 여전히 제한되어 있기 때문에 128MB(2^27 bytes) [[block group]] size를 그룹별로 나눠가지면, 최대 2^27/64 = 2^21 의 블록 groups 밖에 만들지 못한다.
* 해결책으로 metablock group feture (META_BG) 를 사용해서 추가적으로 Block Group을 만들수 있게 하면 된다. 이럴 경우 block groups의 최대 개수는 2^32 가 되므로 1EB를 충분히 지원할수 있다.

### 2.2 Extents
* ext3에서 사용하던 indirect block mapping은 logical block 과 disk block 이 동일하다. 물론 크기가 작은 파일에 대해서는 효율적이지만 큰파일에 대해서는 그리 효율적이지 않다.
* 따라서 ext4_extent structure를 제시하여 length 를 지정할수 있게 한다.
* 이때 호환성을 생각해서 ext4_extent_header를 제시한다.
  * eh_entries (몇개의 속성들이 있는지), eh_max (최대 몇개의 속성을 넣을수 있는지), eh_depth (tree의 depth, 0이면 datablock), eh_generation (tree의 세대, 종류를 나타내려고 만듬)
  * 추가적으로 magic number
* tree 구조로 파일을 쌓을 꺼기 때문에 ext4_extent_idx 라는 구조를 만들어
  * ei_block(해당하는 block), ei_leaf, ei_leaf_hi, ef_unused 를 제시한다.
  * 자세한 구조는 논문의 Figure2. Ext4 extent tree layout 을 참조하면 도움이 된다.
### 2.2.1 Future work
* 사실 extents 자체가 작은 파일들, 매우 단편화된 파일들에서는 효율적이지는 않음.
* 그래서 호환성을 생각하면서 ext4_extent_header를 제시해놓았으니 이를 바꿔가면서 이런 파일들을 처리하는 것을 제시해야함.
* 속성을 4개 이상 추가하길 원하면 extent tail(inode number랑 inode generation을 포함해서)을 만든 다음 뒤에다가 붙이는 식으로 만들면 됨.
### 2.3 Large files
* Linux에서 inode 특성상 ext4에선 2TB만 가능하게 설정되게 되는데 (filesystem 에서 1 block의 크기는 4KB이더라도 disk sector의 크기가 512 Bytes라서, ext4 에서 사용하는 변수의 크기가 32bit임을 감안하면 2^32 * 512 bytes = 2^41 = 2TB, 근데 여기 부분에서 filesystem 1 block 의 크기가 아니라 왜 sector의 크기를 곱하는지 이해가 안됨.)
* 따라서 HUGE_FILE flag를 도입 (EXT4_HUGE_FILE_FL), flag 값을 확인하여 처리
### 2.4 Large number of files
* 이론적으로 수백억개가 가능하겠지만 inode table의 통계적 수치분석 결과 다 못사용하고 있음.
* inode의 최대개수를 제한(fix)하고 사용해도 괜찮다는 결론이 나옴 (무한히 생성가능하도록 만들 필요가 없음)
* 따라서 아래 3가지 관점을 가지고 접근했는데
  * Performance : inode만 보고 바로 block에 접근 가능해야함. (빠르게)
  * Robustness : filesystem이 고장나도 e2fsck 가 흩어져 있는 inode table blocks을 찾을수 있어아함.
  * Compatibility : 64 bit inode 가 32bit 시스템에서 overflow 되더라도 잘 작동해야함.
* 미정리 : 그림 참조
### 2.5 Directory scalability
* 무한 sub directory 기능을 지원하도록 설정해야함.
* 많은 수의 entries를 가진 큰 디렉토리도 지원해야하기 때문에 HTree(32bit hashing을 응용해서 BTree를 변형, 그림 참조)
### 2.5.1 Future work
* HTree 의 최대 높이가 제한되어 있는데 (2로), 이를 풀어야함.
* 디렉토리 내부의 파일 리스트가 파일 이름을 기반으로 정렬되어 있기 때문에, readdir(디렉토리 내부 파일 리스트 출력) 실제론 디스크에서 랜덤 엑세스하는 것과 동일해진다. 따라서 hash 순서로 돌도록 조정해주어야 한다.
* 이를 해결하기 위해서 생각한 방법중 하나는, directory entry(inode 를 reference 하고 있는 데이터)가 아니라, inode 자체를 directory에다 넣는 방법을 생각해보았는데, 이러면 readdir 과정에서 inode를 찾느라고 디스크를 계속 읽을 필요 없이, 이미 memory에 올라온 데이터를 읽으면 된다.
* 위에서 말한 방법이면 dynamic inode allocation도 가능해지는데 directory가 inode 의 container 개념이 되게 된다. 
* hard linked file 같은 경우 여러개의 directory에 동시에 생성되면 되고, inode 자체적으로 link count를 조정하게 할 수 있다.
### 2.6 Large inode and fast extended attributes
* ext3에서는 inode size가 다양하게 되는걸 지원했다.
* ext4에서는 일정 이상 커지면 고정된 128 bytes를 추가하도록 했다. 이렇게 하면, e2fsck가 많은 코드를 짤 필요가 없어진다.
---
## 3. Block allocation enhancements
* 현대 파일시스템 모두의 목표인 향상된 처리량(increased filesystem throughput)에 대해서 이야기한다.
* 단편화(fragmentation), 추가된 metadata들이 일으키는 오버헤드에 대해서 논하고, ext4에 추가된 기능이 얼마나 장점이 많고 block allocation을 잘해서 단편화를 줄이는지 이야기한다.
### 3.1 Persistent preallocation
* 재시작되도 영구적으로 유지되는 사전 할당을 한다.
* 사전 할당은 최대한 파일이 연속적으로 할당 되는데 도움이 되고, 사전할당된 영역에 쓰기가 가능하도록 보장해준다. (파일 영역이 커진다고 해서 추가적으로 할당할 일이 없어 단편화 문제를 논하는 듯)
* 대부분의 프로그램은 연속적으로 파일을 쓰기때문에 충분하다고 생각하지만, database같이 랜덤한 부분에 쓰는 프로그램들도 고려해주어야함
* ext4_extent 에서 초기화되어있는지 여부에 대한 플레그도 만들어 놨으니 잘 사용할수 있음.
* 직접적으로 이 기능을 쓰고 싶으면 posix_fallocate API에 기능을 mapping 해놓았으니 쓰면됨.
### 3.2 Delayed and multiple block allocation
### 3.3 Online defragmentation
## 4. Reliability enhancements
### 4.1 Unused inode count and fast e2fsck
### 4.2 Checksumming
## 5. Other new features
## 6. Migration tool
### 6.1 Upgrading from ext3 to ext4
### 6.2 Downgrading from ext4 to ext3
## 7. Performance evaluation
### 7.1 FFSB comparison
### 7.2 Postmark comparison
### 7.3 IOzone comparison
## 8. Conclusion
