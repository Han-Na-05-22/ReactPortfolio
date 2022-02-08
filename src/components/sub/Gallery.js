import {useEffect, useRef,useState} from 'react';
import axios from 'axios';

export default function Gallery(){
    let main = useRef(null);
    const [items, setItems] = useState([]);
    const [isPop, setIsPop] = useState(false);
    const [index, setIndex] = useState(0);
    const api_key = '8fa271bedd4a017590060c13ebf89615';
    const method1 = "flickr.interestingness.getList";
    const num = 20;
    const url = `https://www.flickr.com/services/rest/?method=${method1}&per_page=${num}&api_key=${api_key}&format=json&nojsoncallback=1`;


    useEffect(()=>{
      main.current.classList.add("on");
      
      axios.get(url).then(json=>{
            setItems(json.data.photos.photo);
        });
  },[]);

    return(
        <>
            <main className="content gallery" ref={main}>
            <figure></figure>
                <div className="inner">
                    <h1>Gallery</h1>
                    <section>
                        {items.map((data,idx)=>{
                            let imgSrc = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`

                            return(
                                <article key={idx}>
                                    <div className="inner">
                                        <div className="pic" onClick={()=>{
                                            setIsPop(true);
                                            setIndex(idx);
                                        }}>
                                            <img src={imgSrc} />
                                        </div>
                                        <h2>{data.title}</h2>
                                    </div>
                                </article>
                            )
                        })}
                    </section>
                </div>
            </main>
            {isPop ? <Popup /> : null}
        </>
    );

    function Popup(){
        useEffect(()=>{
            document.body.style.overflow="hidden";

            return()=>{
                document.body.style.overflow="auto";
            }
        },[])
        return(
            <aside className="popup">
                <h2>{items[index].title}</h2>
                <img src={`https://live.staticflickr.com/${items[index].server}/${items[index].id}_${items[index].secret}_b.jpg`} />
                <span onClick={()=>{
                    setIsPop(false);
                }}>close</span>
            </aside>
        )
    }
}

