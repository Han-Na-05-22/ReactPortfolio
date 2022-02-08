import {useEffect, useRef} from 'react';

export default function Location(){
    let main = useRef(null);

    useEffect(()=>{
        main.current.classList.add("on");

        return()=>{
      }
  },[])

    return(
        <main className="content location" ref={main}>
           <figure></figure>
            <div className="inner">
                <h1>Location</h1>
                <section></section>
            </div>
        </main>
    );
}