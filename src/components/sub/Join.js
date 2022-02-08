import {useEffect, useRef} from 'react';

export default function Join(){
    let main = useRef(null);

    useEffect(()=>{
        main.current.classList.add("on");

        return()=>{
      }
  },[])

    return(
        <main className="content join" ref={main}>
           <figure></figure>
            <div className="inner">
                <h1>Join</h1>
                <section></section>
            </div>
        </main>
    );
}