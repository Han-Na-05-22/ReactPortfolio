import {useEffect, useRef, useState} from 'react';

export default function Community(){
    let main = useRef(null);
    let [index, setIndex] = useState(0);

    useEffect(()=>{
      // 해당 컴포넌트가 생성될 때 실행
      console.log('community 컴포넌트 생성');
      main.current.classList.add("on");
      
      // 해당 컴포넌트가 소멸될 때 실행
      return()=>{
            console.log('community 컴포넌트 소멸');
      }
  },[])

// State 값 변경될 때마다 실행
  useEffect(()=>{
      console.log('index값 변경됨');
  },[index])

    return(
        <main className="content community" ref={main}>
            <figure></figure>
            <div className="inner">
                <h1>Community</h1>
                <section>
                    <button onClick={()=>setIndex(--index)}>-</button>
                    <button onClick={()=>setIndex(++index)}>+</button>
                    <h2>{index}</h2>
                </section>
            </div>
        </main>
    );
}

/*
    useEffect : 해당 컴포넌트의 생성, 상태 값 변경, 소멸이라는 생명주기에 따라 특정 구문을 실행할 수 있는 hook
    └ 항상 컴포넌트 안에 입력해줘야 함!

    -- useEffect 첫번째 인수로 콜백함수 등록
    -- useEffect 두번째 인수로는 의존성을 등록
    -- useEffect 두번째 인수로 빈 배열을 의존성으로 등록 : 해당 컴포넌트가 처음 생성될 때 한번만 호출 가능
 */