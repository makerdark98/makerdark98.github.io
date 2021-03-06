---
layout  : wiki
title   : Effective Debugging/Chatper 6. 컴파일 시간 기법
summary :
date    : 2020-04-07 20:44:40 +0900
lastmod : 2020-09-26 23:28:28 +0900
tags    :
parent  : Effective Debugging
---
## Item 50. 생성된 코드 확인하기

- 컴파일러에서 생성한 코드를 살펴보면 컴팡리 및 실행 시간에 발생한 문제가 소스 코드의 어느 부분에 관련이 있는지 찾아낼 수 있다.
- 컴파일러로 생성된 코드를 좀 더 읽기 좋게 표현하려면 컴파일러에 적절한 옵션을 지정하거나 특수한 도구를 사용한다.

## Item 51. 정적 분석 도구 활용하기

### 자주하는 실수 모음

- 널 포인터 참조
- 동시성 오류 및 경쟁 상태
- 철자 오류 (변수를 명시적으로 선언하지 않아도 되는 언어에서 주로 발생함)
- 배열이나 메모리 버퍼에 대한 잘못된 인덱스 참조
- 잘못된 조건문, 반복문, case문으로 인해 실행될 수 없는 문장
- 처리하지 않은 예외
- 사용하지 않는 변수나 루틴
- 수식 오류
- 중복된 코드
- C++에서의 3의 법칙이나 0의 법칙을 따르지 않거나, 자바에서 클래스를 정의할 때 equals/HashCode 메서드를 일고나성이 없는 형태로 구현한 경우
- 자원 누수
- 보안 취약점
- 문법 오류

### 기억할 사항

- 정적 프로그램 분석 도구를 활용하면 컴파일러 경고 메시지로 찾지 못한 잠재적인 버그를 발견할 수 있다.
- 프로그램에 존재하는 버그를 분석하기 좋도록 컴파일러 옵션을 적절히 설정한다.
- 빌드 과정과 지속적인 통합 과정에 최소한 한 개 이상의 정적 프로그램 분석 도구를 거치도록 설정한다.

## Item 52. 빌드 결과와 실행 동작이 항상 일정하도록 설정하기
- 악의적인 공격을 막기 위해 OS 커널이 프로그램이 올라갈 메모리의 위치에 대한 주소 값을 난수로 정한다. (ALSR, Address Space Layout Randomization)
- GNU/Linux 에서는
```bash
  setarch $(uname -m) -R myprogram
```
- Visual Studio에서는 `/DYNAMICBASE:NO` 옵션을 지정한다.

- 컴파일러는 기호 이름을 결과 파일에 넣을 때 임의로 생성한 값을 사용한다. `GCC`에서 `-frandom-seed` 플래그를 지정하면 이 값을 고정할 수 있다.
- 컴파일러에 입력한 값의 순서가 변한다. 컴파일하거나 링크할 파일을 Makefile에서 와일드카드 형태로 지정했다면 빌드할 때마다 실제로 파일이 입력되는 순서가 달라진다. 입력값을 명시적으로 지정하거나, 와일드카드로 입력할 항목을 정렬하면 순서를 일정하게 유지할 수 있다.
- `__DATE__`와 `__TIME__` 매크로를 이용하여 소프트웨어의 버전을 타밍스탬프 값으로 표기하도록 코드를 작성했다면 이 값도 매번 달라진다. 타임스탬프 대신 버전관리 시스템의 식별자를 사용하면 고정할 수 있다.
- 해시나 맵을 통해 생성한 리스트도 변한다. 어떤 컴파일러는 알고리즘 복잡도 공격을 막기 위해 객체에 대한 해시 방식도 바꾼다.
- 어떤 값을 암호화 하는 과정에서 salt를 추가하기도 한다. 이렇게 하면 dictionary attacks을 어느 정도 막을 수 있다. 단, 코드를 디버깅할 때는 꺼두는게 좋다.

## Item 53. 라이브러리에서 제공하는 디버깅 및 검사 기능 설정하기
### 기억할 사항
 * 현재 개발 환경의 컴파일러와 라이브러리에서 제공하는 런타임 디버깅 기능을 찾아서 적극 활용한다.
 * 현재 환경에서 제공되는 런타임 디버깅 기능이 없다면 이를 제공하는 서드파티 라이브러리를 사용하도록 설정한다.
