---
layout  : wiki
title   : Effective Debugging/Chatper 4. 디버거 활용법
summary :
date    : 2020-04-07 20:44:40 +0900
lastmod : 2020-09-26 23:27:54 +0900
tags    :
parent  : Effective Debugging
---
## Item 28. 디버깅 버전으로 컴파일 하기

- 이클립스에서 자바 코드를 디버깅할 때 기본적으로 심볼 정보가 생성된다. 옵션을 다르게 줘서 원하는 설정으로 바꿀수 있다.
- 오라클 JDK 컴파일러에서는 -g 옵션으로 디버깅 정보와 이를 제어하기 위한 다양한 인수를 추가할 수 있다.
- 유닉스 컴파일러는 대부분 -g 옵션으로 디버깅 정보를 추가할 수 있다.
- 마이크로소프트에서 제공하는 컴파일러에서는 /Zi 옵션을 지정하면 디버깅 정보가 추가된다.

### 팁

- 최신 컴파일러는 상당히 높은 수준으로 최적화하기 때문에 코드의 형태가 완전히 바뀌기도 한다.
- 디버깅할 때는 코드 최적화 기능을 꺼두고 빌드하는 것이 좋다.

### 기억할 사항

- 디버깅 정보가 원하는 수준으로 포함되도록 디버깅 옵션을 설정한다.
- 디버깅할 떄 소스 코드와 생성된 코드가 잘 매칭되게 하려면 코드 최적화 옵션을 끈다.

## Item 29. 한 단계씩 코드 실행하기

- 코드를 한 단계씩 실행하는 방식으로 프로그램의 실행 흐름과 상태를 자세히 살펴본다.
- 건너뛰기 기능을 사용하여 관련 없는 부분은 걸러내서 디버깅 속도를 높인다.
- 건너뛰기로 진행하다가 자세히 검토할 부분을 발견하면 중단점을 지정해서 다시 실행한 뒤, 해당 부분은 한 단계씩 실행하는 방식으로 문제를 탐색할 영역을 좁혀나간다.

## Item 30. 코드와 데이터 중단점 활용하기

- 코드 중단점을 이용하여 분석하려는 코드 영역을 좁혀나간다.
- 관심 없는 부분은 건너뛰도록 중단점을 추가한다.
- 비정상적으로 종료하는 오류를 디버깅할 때는 예외나 종료 루틴에 중단점을 지정한다.
- 프로그램이 뻗어버릴 떄는 디버거를 통해 프로그램의 실행을 중단시킨 뒤 문제를 해결한다.
- 값이 이상하게 변하는 변수를 분석할 때는 데이터 중단점을 활용한다.

## Item 31. 리버스 디버깅

- Visual Studio 에서는 IntelliTrace라고 부르고, Rogue Wave Software의 TotalView에서는 ReplayEngine이라고 부른다.

### 리버스 디버깅하는 방법

1. `break main`을 사용해서 (또는 다른 breakpoint 를 걸어서) 리버스 디버깅할 곳에서 정지한다.
2. `record` 를 사용해서 원하는 부분부터 기록한다.
3. 실행하다가 거꾸로 가고싶으면 `reverse-next` 를 사용해서 거꾸로 올라간다.
4. `reverse-continue`를 사용하면 거꾸로 올라가서 처음 나오는 breakpoint에 멈춘다.
- 주의할 점. 데이터베이스에서 삭제하는 연산이나 시그널, 네트워크 패킷과 같이 비동기적 이벤트에서는 돌릴수 없다.

## Item 32. 루틴 사이의 호출 흐름 추적하기

### 콜 스택에 쌓이는 정보

- 호출한 루틴에 전달한 인수 (인수의 개수가 달라져도 쉽게 처리하도록 오른쪽에서 왼쪽으로 향하는 순서로 저장된다.)
- (루틴이 메서드일 경우) 메서드가 속한 객체에 대한 포인터
- 호출된 루틴의 실행이 끝나고 되돌아갈 주소
- 호출된 루틴에서 사용하는 지역변수

### 스택 트레이스

- 스택 트레이스의 최상위 항목에 알 수 없는 루틴이 적혀 있다면 프로그램에서 서드파티 코드를 실행하던 중에 인터럽트가 걸렸기 때문일 수 있다. GUI 프로그램이 프레임워크에서 제공하는 라이브러리를 통해 저수준으로 상호작용하는 동안에도 이런 현상이 종종 발생한다. 또는 프로그램에서 뭔가 특별한 작업을 처리하기 위해 임베디드 SQL 데이터베이스와 같은 서드파티 라이브러리를 호출할 떄도 이렇게 나타난다. 루틴에 전달된 인수가 없고 루틴의 이름 대신 메모리 주소만 나열되어 있다면 코드를 컴파일할 때 디버깅 정보를 추가하지 않았기 때문이다. 이렇게 표시된 스택 트레이스를 위에서부터 차례대로 살펴보면 어느 지정에서 서드파티 코드를 호출했는지 찾을 수 있다.
- 스택 트레이스에 서드파티 루틴만 담겨 있다면 현재 프로그램의 제어권이 프로엠워크로 넘어가서 콜백 루틴을 통해 상호작용하고 있는 중일 수 있다. 프레임워크 코드는 디버깅 대상이 아니므로 원하는 부분만 디버깅하도록 적절히 중단점을 지정해야한다.
- 스택 트레이스에 담긴 정보가 예상과 달리 너무 빈양한데다 아라볼 수 없는 루틴만 담겨 있다면, 잘못된 포인터로 인해 스택에 엉뚱한 내용이 담겨 있기 때문일 수 있다. 이럴 때는 포인터가 정상적으로 설정된 상태로 들어가서 다시 한 단계씩 실행시키면서 어느 지점에서 스택이 엉켰는지 찾는다.
- 재귀 호출되는 부분을 디버깅할 때는 스택 트레이스에 동일한 루틴이 여러 차례 나올 수 있다.

### 기억할 사항

- 프로그램의 스택을 통해 현재 상태를 이해할 수 있다.
- 코드에 문제가 발생하면 스택의 내용이 꼬일 수 있다.

## Item 33. 변수와 표현식의 값을 분석하여 에러 찾기

- Visual Studio에서 사용자 지정 시각화(Custom visualizer)
- gdb 에서 pretty-printer라 부른다.
- QtCreator에서는 debug-visualizer
- python - pprint module - PrettyPrinter method
- perl-Data::Dumper
- javascript-JSON.stringify(obj, null, 4)

### 기억할 사항

- 주요 표현식의 값을 확인한다.
- 알고리즘을 실행하는 동안 표현식의 값을 지속적으로 표시하도록 디버거를 설정한다.
- 루틴의 지역변수의 값의 추이를 따라가는 방식으로 루틴의 로직을 분석한다.
- 이해하기 힘든 복잡한 자료 구조에 대해서는 데이터 시각화 도구를 활용한다.

## Item 34. 실행 중인 프로세스에 디버거 연동하기

- 이미 실행 상태에 있는 프로세스에 디버거를 연결하여 디버깅한다.
- 자원이 부족한 장치에서 실행되는 애플리케이션을 디버깅할 때는 원격 머신에 디버깅 환경을 구축한다.

## Item 35. 코어 덤프 다루기

1. 프로그램에서 메모리 덤프를 생성할 때 관련된 메타데이터도 함께 생성하도록 설정한다. 메모리 덤프를 생성하도록 설정하는 방법에 대해서는 앞에서 소개한 바 있다. 메타데이터를 생성할 때 최소한 프로그램의 버전 정보를 표시한다. 그 밖에도 프로그램을 실행하는 환경에 대한 데이터(프로세서, 운영체제, 환경변수, 공유 라이브러리 버전 등), 로그 파일, 사용자 입력, 프로그램 사용에 대한 히스토리 파일 등도 표기하면 디버깅에 도움이 된다.
2. 프로그램에서 생성한 메모리 덤프 파일이 제대로 전달되도록 설정한다. 충돌이 발생한 후에 프로그램의 상태가 꼬였다면 외부 프로그램을 통해 전달하는 것이 좋다. 디버깅하려는 프로그램을 다른 프로그램으로 실행시킨 뒤, 그 프로그램에서 디버깅할 프로그램의 종료 상태를 확인해서 지정한 값과 일치할 때만 메모리 파일을 전달하도록 설정한다. 유닉스라면 프로그램이 SIGABRT 핸들러를 통해 앞서 지정한 값으로 종료하게 하고, 윈도우라면 예외 필터 함수를 통해 종료하게 한다. 데이터를 보낼 때는 HTTP POST 요청을 활용하는 것이 가장 쉬우면서도 안정적인 방법이다.
3. 이렇게 전달되 데이터를 저장해서 나중에 분석할 때 활용하도록 디버깅 작업을 수행하는 환경에 HTTP 요청을 받아서 데이터를 저장하는 기능을 수행하는 서버를 간단히 작성한다. 나중에 분석하기 좋도록 메타데이터를 데이터베이스에 저장하는 것도 좋은 방법이다.
4. 충돌이 발생한 프로긂의 버전을 구분하는 방법도 확보한다. 버전 관리 시스템에서 소스 코드의 각 버전마다 태그르 달고, 메타데이터에 이 태그도 함께 담아서 보낸다. 태깅된 소스 코드로부터 완전히 동일한 버전의 바이너리를 재현할 수 없다면 바이너리 실행파일을 각 버전마다 저장해두는 것이 좋다.
5. 사용자가 겪은 문제를 디버깅할 때는 정상적인 소스 코드와 실행 파일과 충돌 시 생성된 메모리 덤프 파일을 디버거에 전달하여 구동한다.

### 기억할 사항

- 충돌이 발생하거나 아무 반응 없이 뻗어버린 애플리케이션을 디버깅할 때 메모리 덤프를 활용한다.
- 설치된 고객 애플리케이션을 디버깅할 때 충돌 리포트 시스템을 활용한다.

## Item 36. 디버깅 도구 조율하기

- 그래픽 인터페이스를 갖춘 디버거를 사용한다.
- 히스토리를 저장하고 원하는 키보드 바인딩을 사용하도록 gdb를 설정한다.
- 자주 사용하는 명령을 gdb 스크립트에 저장한다.
- 입력한 명령을 기록해두기 위해 gdb 안에서 프로그램을 빌드한다.

## Item 37. 어셈블리 코드와 메모리 값 확인하기

- 코드의 동작을 제대로 이해하려면 디스어셈블된 기계어 명령을 살펴보는 것이 좋다.
- 레지스터 eax나 r0은 함수의 반환값을 담는데 사용된다.
- 데이터가 저장된 방식을 제대로 이해하려면 내부 표현 방식을 확인해야 한다.
