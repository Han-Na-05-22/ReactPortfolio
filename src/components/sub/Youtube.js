import {useEffect, useRef} from 'react';

export default function Youtube(){
    let main = useRef(null);

    useEffect(()=>{
        main.current.classList.add("on");

        return()=>{
      }
  },[])

    return(
        <main className="content youtube" ref={main}>
            <figure></figure>
            <div className="inner">
                <h1>Youtube</h1>
                <section></section>
            </div>
        </main>
    );
}