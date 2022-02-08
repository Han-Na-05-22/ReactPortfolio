import {useEffect, useRef,useState} from 'react';
import axios from 'axios';

export default function Department(){
    let main = useRef(null);
    // axios로 불러온 빈배열을 state로 초기화
    const [members, setMembers] = useState([]);
    // public 폴더의 절대값 경로 구함
    const path = process.env.PUBLIC_URL;
    // 절대 경로에서 부터의 json 데이터 url값 구함
    const url = `${path}/db/department.json`;

    useEffect(()=>{
        main.current.classList.add("on");

        // 처음 컴포넌트 생성 시
        axios
            .get(url) // 비동기적으로 데이터를 호출
            .then(json=>{
                console.log(json.data.data);
                // 전달받은 데이터를 members state에 옮겨담음
                setMembers(json.data.data);
            });
  },[]);

    return(
        <main className="content department" ref={main}>
            <figure></figure>
            <div className="inner">
                <h1>Department</h1>
                <section>
                    {members.map((data,idx)=>{
                        return(
                            <article key={idx}>
                                <img src={`${path}/img/${data.pic}`} />
                                <h2>{data.name}</h2>
                                <p>{data.position}</p>
                            </article>
                        );
                    })}
                </section>
            </div>
        </main>
    );
}