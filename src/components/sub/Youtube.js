import {useEffect, useRef,useState} from 'react';
import axios from 'axios';

export default function Youtube(){
    let main = useRef(null);
    const[items,setItems] = useState([]);
    const [isPop,setIsPop] = useState(false);
    const [index,setIndex] = useState(0);
    const playListId = "PL0sD6ZGYpbrKWrPFqyeaTvHFb5lL8h4p7";
    const Key = "AIzaSyCn1tyD9aK47ZQNCljr9-sDVPjoLxpdJhc";
    const num = 10;
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${Key}&playlistId=${playListId}&maxResults=${num}`;
    

    useEffect(()=>{
        main.current.classList.add("on");

        axios.get(url).then(json=>{
            console.log(json.data.items);
            setItems(json.data.items);
        })
  },[])
// 리턴문 안에서는 조건문은 삼항연산자, 반복은 map 만 동작이 됨
    return(
        <> {/*프래그먼트로 묶어줌*/}
            <main className="content youtube" ref={main}>
                <figure></figure>
                <div className="inner">
                    <h1>Youtube</h1>
                    <section>
                        {items.map((item,idx)=>{
                            let tit = item.snippet.title;
                            let tit_len = tit.length;

                            let desc = item.snippet.description;
                            let desc_len = desc.length;
                            return(
                                <article key={idx}>
                                    <div className="inner">
                                        <div className="txt">
                                            <h2>{tit_len > 40 ? tit.substr(0,40)+'...' : tit}</h2>
                                            <p>{desc_len > 150 ? desc.substr(0,150)+'...' : desc}</p>
                                        </div>
                                        <div className="pic" onClick={()=>{
                                        setIsPop(true);
                                        setIndex(idx);
                                        }}>
                                            <img src={item.snippet.thumbnails.standard.url} alt="" />
                                        </div>
                                    </div>
                                </article>
                            )
                        })}
                    </section>
                </div>
            </main>
            {isPop ? <Pop /> : null}
        </>
    );

    function Pop(){
        useEffect(()=>{
            document.body.style.overflow="hidden";
            return()=>{
                document.body.style.overflow="auto";
            }
        })
        return(
            <aside className="pop">
                <iframe src={`https://www.youtube.com/embed/${items[index].snippet.resourceId.videoId}&frameborder=0`}></iframe>
                <span onClick={()=>{
                    setIsPop(false);
                }}>close</span>
            </aside>
        )
    }
}