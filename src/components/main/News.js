import { useState, useEffect } from 'react';

export default function News(){

    const defaultData = [
        {title : 'Hello', content : 'Here, comes description in detail.'},
        {title : 'Hello2', content : 'Here, comes description in detail2.'},
        {title : 'Hello3', content : 'Here, comes description in detail3.'},
        {title : 'Hello4', content : 'Here, comes description in detail4.'},
        {title : 'Hello5', content : 'Here, comes description in detail5.'}
    ]

    const getLocalItems=()=>{
        let data = localStorage.getItem('posts');

        if(data){
            return JSON.parse(data);
        }else{
            return defaultData;
        }
    }

    const [posts]=useState(getLocalItems);

    useEffect(()=>{
        localStorage.setItem('posts', JSON.stringify(posts));
    },[]);
    // 커뮤니티 값 불러오기!
    return(
        <section id='news'>
            <div className="inner">
                <h1>Recent Post</h1>
                <ul>
                    {posts.map((post,idx)=>{
                        if(idx < 4){
                            return(
                                <li key={idx}>
                                    <h2>{post.title}</h2>
                                    <p>{post.content}</p>
                                </li>
                            )
                        }
                    })}
                </ul>
            </div>
        </section>
    );
}