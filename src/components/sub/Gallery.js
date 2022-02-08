import {useEffect, useRef,useState} from 'react';
import axios from 'axios';

export default function Gallery(){
    let main = useRef(null);
    let [items, setItems] = useState([]);
    const api_key = '8fa271bedd4a017590060c13ebf89615';
    const method1 = "flickr.interestingness.getList";
    const num = 5;
    const username = "194808976@N04";
    const url = `https://www.flickr.com/services/rest/?method=${method1}&per_page=${num}&api_key=${api_key}&format=json&nojsoncallback=1&user_id=${username}`;


    useEffect(()=>{
      main.current.classList.add("on");
      
      axios.get(url).then(json=>{
            console.log(json.data.photos.photo);
            setItems(json.data.photos.photo);
        });
  },[]);

    return(
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
                                    <div className="pic">
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
    );
}