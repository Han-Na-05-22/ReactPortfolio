import {useEffect, useRef,useState} from 'react';

export default function Location(){
    let main = useRef(null);
    const {kakao} = window;
    const container = useRef(null);
    const [map, setMap] = useState(null); // 정보값을 받는 중요한 데이터는 반드시 useState에 담아준다.
    // 변수값과 state의 값은 서로 다르기 때문에 이름이 같아도 상관없음
    const [index, setIndex] = useState(0);
    const path = process.env.PUBLIC_URL;

    const info =[
        {
            title:"본점",
            latlng : new kakao.maps.LatLng(37.48544680034892, 126.90113363256869),
            imgSrc : path + '/img/marker1.png',
            imgSize : new kakao.maps.Size(232,99),
            imgPos : {offset : new kakao.maps.Point(116,99)},
        },
        {
            title:"지점1",
            latlng : new kakao.maps.LatLng(37.4660917,126.9003506,14),
            imgSrc : path + '/img/marker2.png',
            imgSize : new kakao.maps.Size(232,99),
            imgPos : {offset : new kakao.maps.Point(116,99)},
        },
        {
            title:"지점2",
            latlng : new kakao.maps.LatLng(37.5031826,126.879848,17),
            imgSrc : path + '/img/marker3.png',
            imgSize : new kakao.maps.Size(232,99),
            imgPos : {offset : new kakao.maps.Point(116,99)},
        }
    ];

    // info 값을 state에 담음
    const [mapInfo] = useState(info);

    //처음 로딩시 한번만 실행
    useEffect(()=>{
        main.current.classList.add('on'); 
    },[]); // 뒤에 빈 배열이 있는 경우에는 한번만 실행

  // index state 값이 변경될 때마다 실행
  useEffect(()=>{
    // 해당 hook 함수가 재 호출될 때마다 일단 #map 안쪽을 비워둠
    container.current.innerHTML = '';
      
    const options = {
        center : mapInfo[0].latlng,
        level : 3
    }

        // 카카오 api를 통해 리턴한 인스턴스를 state map에 옮겨담음
        const map = new kakao.maps.Map(container.current, options);
        setMap(map); 

        // 마커출력 인스턴스 생성 시 미리 state에 저장해놓은 mapInfo 배열의 정보값을 옵션으로 전달
        new kakao.maps.Marker({
            map : map,
            position: mapInfo[index].latlng,
            title : mapInfo[index].title,
            image : new kakao.maps.MarkerImage(mapInfo[index].imgSrc, mapInfo[index].imgSize, mapInfo[index].imgPos)
        })
        
        map.setCenter(mapInfo[index].latlng);

        const mapSet = () => map.setCenter(mapInfo[index].latlng);

        // 브라우저 리사이즈 될 떄마다 마커 위치를 중앙 배치
        window.addEventListener('resize',mapSet);

        // 지도 타입 변경 컨트롤러 표시
        const mapType = new kakao.maps.MapTypeControl();
        map.addControl(mapType, kakao.maps.ControlPosition.TOPRIGHT);


        // 휠로 줌 기술 활성화 유무
        map.setZoomable(true);

        // 마우스 드래그 기능 활성화 유무
        map.setDraggable(true);

        // 해당 컴포넌트가 재 랜더링 될 때마다 기존 window 객체에 등록된 함수를 다시 제거
        return()=> window.removeEventListener('resize',mapSet);
  },[index]); // 배열을 넣을 경우 state 값이 실행될 때 마다 실행

  // 리액트는 a태그가 아닌 버튼 태그로 만든다!
    return(
        <main className="content location" ref={main}>
           <figure></figure>
            <div className="inner">
                <h1>Location</h1>
                <section>
                    <div id="map" ref={container}>
                    </div>
                    <nav className = "traffic">
                        <button onClick={()=>{
                                map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
                            }}>교통정보 보기</button>
                            <button onClick={()=>{
                                map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);                           
                            }}>교통정보 끄기</button>
                    </nav>
                    <nav className="branch">
                        {mapInfo.map((data,idx)=>{
                            return <button key = {idx} onClick={()=>setIndex(idx)}>{data.title}</button>
                        })}
                    </nav>
                </section>
            </div>
        </main>
    );
}