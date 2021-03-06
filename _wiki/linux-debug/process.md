---
layout  : wiki
title   : linux-debug/process
summary : 디버깅을 통해 배우는 리눅스 커널의 구조와 원리/프로세스
date    : 2020-11-10 23:51:56 +0900
lastmod : 2020-12-09 13:31:33 +0900
tags    : [linux-debug, process]
draft   : false
parent  : debug-linux
---

### 프로세스
* x64 용으로 컴파일 해서 작업하고 있어서, 다른부분이 있다.
* 책 151쪽에서 여러 함수들에 filter를 거는데, 당연히도 안걸린다. 그런데 function 을 걸면 당연히 문제가 된다. 스크립트채로 따라쳐서 실행하지 말고, 한줄한줄 실행하고 동작하는지 확인하면서 작업했다.

#### 유저 레벨 프로세스 실행 실습
```bash
cat /sys/kernel/debug/tracing/available_filter_functions | grep sys_clone
```

* 이렇게 하면 `__x64_sys_clone` 이 나오는데 이걸 `sys_clone` 대신 넣어주자.
* 그렇게 해서 나온 스크립트는 아래와 같다.

```bash
#!/bin/bash

echo 0 > /sys/kernel/debug/tracing/tracing_on
sleep 1
echo "tracing_off"

echo 0 > /sys/kernel/debug/tracing/events/enable
sleep 1
echo "events disabled"

echo __x64_sys_clone do_exit > /sys/kernel/debug/tracing/set_ftrace_filter
sleep 1
echo "set_ftrace_filter init"

echo function > /sys/kernel/debug/tracing/current_tracer
sleep 1
echo "function tracer enabled"

echo __x64_sys_clone do_exit > /sys/kernel/debug/tracing/set_ftrace_filter
echo _do_fork copy_process* >> /sys/kernel/debug/tracing/set_ftrace_filter
sleep 1
echo "set_ftrace_filter enabled"

echo 1 > /sys/kernel/debug/tracing/events/sched/sched_switch/enable
echo 1 > /sys/kernel/debug/tracing/events/sched/sched_wakeup/enable
echo 1 > /sys/kernel/debug/tracing/events/sched/sched_process_fork/enable
echo 1 > /sys/kernel/debug/tracing/events/sched/sched_process_exit/enable

echo 1 > /sys/kernel/debug/tracing/events/signal/enable

sleep 1
echo "event enabled"

echo 1 > /sys/kernel/debug/tracing/options/func_stack_trace
echo 1 > /sys/kernel/debug/tracing/options/sym-offset
echo "function stack trace enabled"

echo 1 > /sys/kernel/debug/tracing/tracing_on
echo "tracing_on"
```
* 프로세스 생성 단계의 함수 흐름 : 책이랑 살짝 다른데 이건 cpu마다 다를듯?
```
copy_process.part.53+0x5/0x1d40
_do_fork+0xcf/0x3a0
__x64_sys_clone+0x27/0x30
do_syscall_64+0x55/0x110
```
* 프로세스 종료 단계의 함수 흐름
```
do_exit+0x5/0xbd0
do_group_exit+0x47/0xb0
get_signal+0xfe/0x7e0
do_signal+0x37/0x650
exit_to_usermode_loop+0x9b/0xb0
do_syscall_64+0x101/0x110
```

##### 프로세스 실행 흐름
1. 프로세스 생성
1. raspbian_proc 프로세스 실행
1. 프로세스 종료
1. 부모 프로세스에게 시그널 전달

##### 배운 내용
* 프로세스가 스스로 exit POSIX 시스템 콜을 호출하면 스스로 소멸할 수 있다.
* exit POSIX 시스템 콜에 대한 시스템 콜 핸들러는 sys_exit_group() 함수이다.
* 프로세스는 소멸되는 과정에서 부모 프로세스에게 SIGCHLD 시그널을 전달해 자신이 종료될 것이라고 통지한다.

#### 커널 스레드
* 커널 스레드는 커널 공간에서만 실행되며, 유저 공간과 상호작용하지 않습니다.
* 커널 스레드는 실행, 휴면 등 모든 동작을 커널에서 직접 제어 관리합니다.
* 대부분의 커널 스레드는 시스템이 부팅할 때 생성되고 시스템이 종료할 때까지 백그라운드로 실행됩니다.

##### 커널 스레드 생성 과정
1. kthreadd 프로세스에서 커널 스레드 생성을 요청
  * kthread_create()
  * kthread_create_on_node()
1. kthreadd 프로세스가 커널 스레드를 생성
  * kthreadd()
  * create_kthread()

##### 커널 내부 프로세스의 생성 과정 (_do_fork() 함수)
* 위에서 말한 대로 실제로 생성하는 곳은 kthreadd가 호출하는 create_kthread 인데, 이건 결국 _do_fork 를 호출한다.
* _do_fork 의 호출 과정
  1. 프로세스 생성 : copy_process() 함수를 호출해서 프로세스를 생성
  1. 생성한 프로세스의 실행 요청 : copy_process 함수를 호출해 프로세스를 만든 후, wake_up_new_task 함수를 호출

* copy_process() 함수를 호출해 프로세스를 생성
* wake_up_new_task() 함수를 호출해 생성한 프로세스를 깨움
* 생성한 프로세스 PID를 반환

##### copy_process 함수 분석
* dup_task_struct : task_struct 구조체와 프로세스가 실행될 스택 공간을 할당, 이후 새로운 구조체 주소를 반환
  * 책에서는 여기만 나와 있는데, memory 동적할당이 어떻게 되는지 궁금해서 확인해봤다.
  * 쭉쭉 따라가보면, alloc_task_struct_node -> kmem_cache_alloc_node -> kmem_cache_alloc ->slab_alloc 가 호출되는데, slab이 뭔지 몰라서 찾아봤다.
    * 참고 : https://lascrea.tistory.com/66
    * slab allocator라고 하며, 일종의 자원 할당자 중 하나로 4KB의 크기를 가진 Page로 데이터를 저장하고 관리할 경우 발생하는 단편화를 최소화 하기 위해 만들어졌다.
    * 리눅스 커널은 slab을 사용하고 있으며 /proc/meminfo에서 리눅스 커널이 사용하는 cache 크기를 의미한다.
    * 리눅스 커널에서 커널과 디바이스 드라이버, 파일시스템 등은 영구적이지 않은 데이터(inode, task 구조체, 장치 구조체 등)들을 저장하기 위한 공간이 필요한데 이것이 slab에 관리된다.
* 그리고 기본적인 자원들(메모리, 파일 등)을 복사한다.
```c
 /* copy all the process information */
 shm_init_task(p);
 retval = security_task_alloc(p, clone_flags);
 if (retval)
   goto bad_fork_cleanup_audit;
 retval = copy_semundo(clone_flags, p);
 if (retval)
   goto bad_fork_cleanup_security;
 retval = copy_files(clone_flags, p);
 if (retval)
   goto bad_fork_cleanup_semundo;
 retval = copy_fs(clone_flags, p);
 if (retval)
   goto bad_fork_cleanup_files;
 retval = copy_sighand(clone_flags, p);
 if (retval)
   goto bad_fork_cleanup_fs;
 retval = copy_signal(clone_flags, p);
 if (retval)
   goto bad_fork_cleanup_sighand;
 retval = copy_mm(clone_flags, p);
 if (retval)
   goto bad_fork_cleanup_signal;
 retval = copy_namespaces(clone_flags, p);
 if (retval)
   goto bad_fork_cleanup_mm;
 retval = copy_io(clone_flags, p);
 if (retval)
   goto bad_fork_cleanup_namespaces;
 retval = copy_thread_tls(clone_flags, stack_start, stack_size, p, tls);
```
##### wake_up_new_task()
* 프로세스 상태를 TASK_RUNNING으로 변경
* 현재 실행 중인 CPU 번호를 thread_info 구조체의 cpu 필드에 저장 (CONFIG_SMP 값이 켜져 있을때)
* 런큐에 프로세스를 큐잉

#### 프로세스의 종료 과정 분석
* 프로세스가 죽는 두가지 흐름
  * 유저 애플리케이션에서 exit() 함수를 호출할 때
  * 종료 시그널을 전달받을 때
* 이번에는 책 보기 전에 ftrace 결과에 나오는 함수들 다 찾아보자.
  * `kernel/exit.c`
    ```c
    SYSCALL_DEFINE1(exit_group, int, error_code)
    {
      do_group_exit((error_code & 0xff) << 8);
      /* NOTREACHED */
      return 0;
    }
    ```
  * `kernel/signal.c`
    ```c
    bool get_signal(struct ksignal *ksig)
    {
    /* skip */
        /*
         * Death signals, no core dump.
         */
        do_group_exit(ksig->info.si_signo);
        /* NOTREACHED */
      }
      spin_unlock_irq(&sighand->siglock);

      ksig->sig = signr;
      return ksig->sig > 0;
    }
   ```
  * 이거 이외에도 `fpu.c`, `seccomp.c` 에 있는데, 이건 찾아보니까 fpu 에서 에러가 나서 죽일때랑, [[seccomp]]에서 강제로 죽일때 호출. 일반적으로 죽는 경우는 아니니, 위에 2가지만이 do_group_exit를 호출한다라고 알수 있다.

* do_exit() 함수의 동작 방식 확인
  1. init 프로세스가 종료하면 강제 커널 패닉 유발 : 보통 부팅 과정에서 발생함
  2. 이미 프로세스가 do_exit() 함수의 실행으로 프로세스가 종료되는 도중 다시 do_exit() 함수가 호출됐는지 점검
  3. 프로세스 리소스(파일 디스크립터, 가상 메모리, 시그널) 등을 해제
  4. 부모 프로세스에게 자신이 종료되고 있다고 알림
  5. 프로세스의 실행 상태를 task_struct 구조체의 state 필드에 TASK_DEAD로 설정
  6. do_task_dead() 함수에 호출해 스케줄링을 실행, do_task_dead() 함수에서 __schedule() 함수가 호출되어 프로세스 자료구조인 태스크 디스크립터와 스택 메모리를 해제

* do_task_daed() 함수를 호출하고 난 후의 동작
  * __schedule() 함수
  * context_switch() 함수
  * finish_task_switch() 함수

##### 태스크 디스크립터(task_struct 구조체)
* 프로세스를 식별하는 필드
  * comm : 프로세스 이름
  * pid : 프로세스 id
  * tgid : task_group id, 만약 thread가 leader 인 경우, tgid == pid
* 프로세스 상태 저장
  * state: 프로세스 실행 상태
    * TASK_RUNNING : CPU에서 실행 중이거나 런큐에서 대기 상태에 있음
    * TASK_INTERRUPTIBLE : 휴면 상태
    * TASK_UNINTERRUPTIBLE : 특정 조건에서 깨어나기 위해 휴면 상태로 진입한 상태
  * flags: 프로세스 세부 동작 상태와 속성 정보
    * PF_IDLE : 자신이 IDLE thread 임을 나타내는 flag
    * PF_EXITING : 종료되는 중
    * PF_EXITPIDONE : 종료 됨
    * PF_WQ_WORKER : 워커 쓰레드
    * PF_KTHREAD : 커널 스레드
* 프로세스 간의 관계
 * real_parent : 자신을 생성한 부모 프로세스의 태스크 디스크립터 주소를 저장
 * parent : 부모 프로세스의 태스크 디스크립터 주소를 담고 있음.
 * children : 자식 프로세스 리스트
 * sibiling : 형제 프로세스 리스트
* 프로세스 실행 시각 정보
 * utime : 유저 모드에서 프로세스가 실행한 시각 (account_user_time)
 * stime : 커널 모드에서 프로세스가 실행한 시각 (account_system_index_time)
 * sched_info.last_arrival :  프로세스가 CPU에서 실행된 시각 (context_switch -> prepare_task_switch -> sched_info_switch -> __sched_info_switch -> sched_info_arrive)

##### 스레드 정보 : thread_info 구조체
* 선점 스케줄링 실행 여부
* 시그널 전달 여부
* 인터럽트 컨텍스트와 Soft IRQ 컨텍스트 상태
* 휴면 상태로 진입하기 직전 레지스터 세트를 로딩 및 백업

```c
struct thread_info {
  struct task_struct	*task;		/* main task structure */
  unsigned long		flags;		/* low level flags */
  __u32			cpu;		/* current CPU */
  __s32			preempt_count; /* 0 => preemptable, <0 => BUG */

  mm_segment_t		addr_limit; /* thread address space:
                                 0-0x7FFFFFFF for user-thead
                                 0-0xFFFFFFFF for kernel-thread
                               */
  __u8			supervisor_stack[0];

/* saved context data */
unsigned long           ksp;
};
#endif
```

* preempt_count 가 바뀌는 조건
  * 인터럽트 컨텍스트 실행 시작 및 종료 설정
  * Soft IRQ 컨텍스트 실행 시작 및 종료 설정
  * 프로세스 선점 스케줄링 가능 여부

##### cpu 필드에 대한 상세 분석
 * sm_processor_id()
 * set_task_cpu()

##### thread_info 구조체 초기화 코드 분석
 * dup_task_struct()
 * setup_thread_stack(tsk, orig);
 * alloc_task_struct_node()
 * alloc_thread_stack_node()

##### 프로세스의 태스크 디스크립터에 접근하는 매크로 함수
 * current : 현재 구동 중인 프로세스의 태스크 디스크립터 주소
 * arch/x86/include/asm/current.h

 ```c
  DECLARE_PER_CPU(struct task_struct *, current_task);
  static __always_inline struct task_struct *get_current(void)
  {
    return this_cpu_read_stable(current_task);
  }

  #define current get_current()
 ```
 * 보면은, cpu 마다 task_struct를 선언하는데, 이 변수 명은 current_task 인데, arch/x86/kernel/process_64.c 에 있는 `__switch_to()`에서

 ```c
  this_cpu_write(current_task, next_p);
  this_cpu_write(cpu_current_top_of_stack, task_top_of_stack(next_p));

  /* Reload sp0. */
  update_task_stack(next_p);

  switch_to_extra(prev_p, next_p);
 ```
 * 이렇게 매번 task가 전환 될때 cpu 별로 따로 넣어준다. 이때마다, update_task_stack를 호출해주면서 stack을 설정한다.

##### 프로세스 디버깅
 * 사용하는 명령어 : layout asm
 * 내용 정리
   * 리눅스 유틸리티 프로그램을 실행할 때 프로세스는 fork()와 execve() 시스템 콜 함수를 호출한다.
   * ftrce의 sched_process_exec 이벤트로 리눅스 유틸리티 프로그램의 파일 위치를 알 수 있다.
   * 리눅스 유틸리티 프로그램을 종료할 때의 프로세스는 exit() 시스템 콜 함수를 호출한다.

