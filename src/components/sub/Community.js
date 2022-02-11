import {useEffect, useRef, useState} from 'react';

export default function Community(){

    const main = useRef(null);
    const input = useRef(null);
    const textarea = useRef(null);
    const showBox = useRef(null);
    const updateInput = useRef(null);
    const updateTextarea = useRef(null);

    const getLocalItems = () =>{
        let data = localStorage.getItem('posts');

        // 만약 로컬 저장소에 posts 키값의 데이터가 있으면
        if(data){
            // 해당 데이터를 객체 형체로 다시 변환해서 리턴
            return JSON.parse(data);

            // 로컬 저장소에 데이터가 없을 때(해당 컴포넌트가 처음 로딩 시)
        }else{
            return [];
        }
    }

    // getLocalItems의 리턴값에 따라 posts에 값이 할당됨
    const [posts,setPosts] = useState(getLocalItems);

    /*
    const [posts, setPosts] = useState([
        {title : 'Hello', content : 'Here, comes description in detail.'},
        {title : 'Hello2', content : 'Here, comes description in detail2.'},
        {title : 'Hello3', content : 'Here, comes description in detail3.'},
        {title : 'Hello4', content : 'Here, comes description in detail4.'},
        {title : 'Hello5', content : 'Here, comes description in detail5.'}
    ]);
    */

    useEffect(()=>{

    },[])

    // posts값이 변경될 때마다 실행될 hook
    useEffect(()=>{
        console.log('posts state 변경됨')
        // 로컬스토리지에 posts 키 값으로 기존 데이터를 문자 형태로 변환해서 저장
        localStorage.setItem('posts',JSON.stringify(posts))
    },[posts]);

    // trim(); : 빈칸이 하나든 두개든 세개든 값을 다 찾아주는 것
    const createPost=()=>{
        const inputVal = input.current.value.trim();
        const textareaVal = textarea.current.value.trim();

        if(!inputVal || !textareaVal || inputVal == ' ' || textareaVal==' '){
            alert("제목과 본문에 내용을 입력하세요.");
            return;
        }

        // 기존 posts값을 복사해서 추가로 입력된 객체값을 추가해서 통합
        setPosts([

            {
                title:input.current.value,
                content:textarea.current.value
            },
            ...posts
        ])

        // 입력창 값 비움
        input.current.value='';
        textarea.current.value='';
    }

    // 순번으로 받은 게시글만 삭제하는 함수
    // index는 idx의 값
    const deletePost = index =>{
        setPosts(
            // 기본 배열을 받아서 조건식을 통해 특정 조건이 성립하는 데이터만 필터링해서 다시 새롭게 반환하는 함수
            posts.filter((_,idx)=> idx !== index)
            // 현재 반복돌고 있는 post의 순번이랑 인수로 받은 삭제 post 순번이 같은 것만 반환
            // 사용하지 않는 인수값은 _로 표현
        )
    }

    // 인수로 수정모드 변경할 포스트의 순서값을 받아서 해당 순번의 state 값만 수정 가능한 형태로 정보값 변경
    const enableUpdate = index => {
        setPosts(
            // 기존 posts를 반복 돌면서
            posts.map((post,idx)=>{
                // 현재 반복도는 post 순번가 인수로 받은 수정해야 될 순번이 같으면 해당 post에만 enableUpdate = true 라는 값을 추가해서 해당 post만 기존 posts에 덮어쓰기 해서 기존 posts state값 변경
                if(idx == index) post.enableUpdate=true;
                return post;
            })
        )
        console.log(posts);     
    }

    // 기존 state 값을 인수로 받은 순번의 포스트 값만 enableUpdate=false 로 변경해서
    // 출력모드 상태로 변경해주는 함수
    const disableUpdate = index =>{
        setPosts(

            posts.map((post,idx)=>{
   
                if(idx == index) post.enableUpdate=false;
                return post;
            })
        )
        console.log(posts); 
    }

    // 리액트에서는 쿼리셀렉터를 사용하면 안 되나, 아래 상황의 경우에는 사용...?
    // querySelector는 가상돔을 탐색하는게 아닌 리얼돔을 탐색함
    // 실제 post 업데이트 함수 
    const updatePost = index => {

        const inputVal2 = updateInput.current.value.trim();
        const textareaVal2 = updateTextarea.current.value.trim();

        if(!inputVal2 || !textareaVal2 || inputVal2 == ' ' || textareaVal2==' '){
            alert("제목과 본문에 내용을 입력하세요.");
            return;
        }

        setPosts(
            posts.map((post,idx)=>{
                if(idx == index){
                    // const article = showBox.current.children[index];
                    // const input = article.querySelector('input');
                    // const textarea = article.querySelector('textarea');

                    // post.title = input.value;
                    // post.content = textarea.value;

                    post.title = updateInput.current.value;
                    post.content = updateTextarea.current.value;
                    post.enableUpdate = false;
                }
                return post;
            })
        )
    }

    useEffect(()=>{
      main.current.classList.add("on");
  },[])

    return(
        <main className="content community" ref={main}>
            <figure></figure>
            <div className="inner">
                <h1>Community</h1>
                <section>
                    <div className = 'inputBox'>
                        <input type="text" placeholder='제목을 입력하세요.' ref={input} /><br />
                        <textarea cols="30" rows="10" placeholder='본문에 내용을 입력하세요.' ref={textarea}></textarea><br />
    
                        <button onClick={()=>{
                            input.current.value='';
                            textarea.current.value='';
                        }}>cancel</button>
                        <button onClick={createPost}>create</button>
                    </div>
    
                    <div className="showList" ref={showBox}>
                        {posts.map((post,idx)=>{
                            return(
                                <article key={idx}>
                                    {
                                        post.enableUpdate
                                        ?
                                        // 수정화면
                                        <>
                                            <div className="post">
                                                <input type="text" defaultValue={post.title} ref={updateInput}/><br />
                                                <textarea defaultValue={post.content} ref={updateTextarea}></textarea><br />
                                            </div> 

                                            <div className="btns">
                                                {/* 수정 버튼 클릭 시 수정 모드로 변경해주는 함수 호출 */}
                                                <button onClick={()=>updatePost(idx)}>update</button>
                                                {/* 삭제 버튼 클릭 시 현재 게시글의 순번을 인수로 전달 */}
                                                <button onClick={()=>disableUpdate(idx)}
                                                >cancel</button>
                                            </div>     
                                        </>
                                    
                                        :
                                        // 출력화면
                                        <>
                                            <div className="post">
                                                <h2>{post.title}</h2>
                                                <p>{post.content}</p>
                                            </div>                  
                                            
                                            <div className="btns">                    
                                                <button onClick={()=>enableUpdate(idx)}>modify</button>
                                                <button onClick={()=>deletePost(idx)}>delete</button>
                                            </div>
                                        </>
                                    }

                                </article>
                            )
                        })}
                    </div>
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