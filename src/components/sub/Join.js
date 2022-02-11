import { faEraser } from '@fortawesome/free-solid-svg-icons';
import {useEffect, useRef,useState} from 'react';

// dom은 하나의 객체
// react는 항상 변경하기 전 상태값이 있어야함!! (불변성) -- 절대 원래있던 값을 훼손 시키면 안 됨

export default function Join(){
    let main = useRef(null); // uerRef으로 가상 dom을 참조 

    // state로 관리할 초기 value 값들
    const initVal = {
        userid : '',
        pwd1:'',
        pwd2:'',
        email : '',
        gender: false,
        interests: false,
        edu: false,
        comments : ''
    }

    // useState로 초기 value 값을 state에 담아서 관리 시작
    const [val, setVal] = useState(initVal);

    // input의 인증 실패 시 출력 될 에러메시지를 담을 state 생성
    const[err,setErr] = useState({}); // usestate 불변성

    const[isSubmit,setIsSubmit] = useState(false);

    const [success, setSuccess] = useState(false);


    // input 상태값이 변경될 때마다 실행될 함수
    const handleChange = e =>{
        // console.log(e.target);

        // input 요소의 name값과 value 값을 구조분해 할당으로 가져옴
        const {name, value} = e.target;
        // console.log(`name:${name}, value:${value}`);

        // onChange 발생 시 기존 val state 값을 현재 사용자가 입력하는 값으로 갱신
        setVal({...val,[name]:value});
        // 결과적으로 현재 입력하고 있는 값이 input 요소의 value 속성에 의해서 출력됨
        // console.log(val);
    }

    const handleRadio = e => {    
        const {name} = e.target;
        const isCheck = e.target.checked;   
        setVal({...val, [name]: isCheck});
      }

      const handleReset = () => {
        setVal(initVal);
        setErr({});
        setIsSubmit(false);
      }

    const handleCheck = e =>{
        let isChecked = false;
        const {name} = e.target;
        const isputs = e.target.parentElement.querySelectorAll('input');
        isputs.forEach(el=>{
            if(el.checked) isChecked = true;
        });
        setVal({...val,[name]:isChecked});
    }

    const handleSelect = e =>{
        const{name} = e.target;
        const isSelected = e.target.options[e.target.selectedIndex].value;
        setVal({...val,[name]:isSelected});

    }

    const handleSubmit = e =>{
        e.preventDefault();
        // 인증 처리함수를 호출해서 인증 실패 시
        // err state 객체에 에러문구 추가

        // check 함수에 인수로 기존 err state를 인수로 전달
        setErr(check(val));  

        setIsSubmit(true); 
    }

    // 에러 객체를 반환하는 함수
    const check = val => {
        let errs = {};
        const eng = /[a-zA-Z]/;
        const num = /[0-9]/;
        const spc = /[~!@#$%^&*()_]/;

        // 인수로 받은 value의 조건에 부합하면
        if(val.userid.length<5){
            // 빈 err 객체에 userid에 해당하는 에러 객체를 추가
            errs.userid = '아이디를 5글자 이상 입력하세요.'
        }

        if(val.pwd1 < 5 || !eng.test(val.pwd1) || !num.test(val.pwd1) || !spc.test(val.pwd1)){
            errs.pwd1 = '비밀번호는 5글자 이상, 문자, 숫자, 특수문자를 포함하여 입력하세요.'
        }

        if(val.pwd1 !== val.pwd2){
            errs.pwd1 = '두개의 비밀번호를 동일하게입력하세요.'
        }

        if(val.email.length<8 || !/@/.test(val.email)){
            errs.email = '이메일 주소는 8글자 이상 @를 포함하여 입력하세요.'
        }

        if(!val.gender){
            errs.gender='성별을 선택하세요.'
        }

        if(!val.interests){
            errs.interests = '관심사를 1개 이상 선택하세요.'
        }

        if(!val.edu){
            errs.edu='학력을 선택해주세요.'
        }

        if(val.comments.length < 10){
            errs.comments='남기는 말을 10글자 이상 입력하세요.'
        }
        console.log(errs);
        // 추가된 객체내용을 내보냄
        return errs;
    }

    useEffect(()=>{
        main.current.classList.add("on");
    },[])

    useEffect(()=>{
        // 에러 객체의 키 값 갯수 반환
        const len = Object.keys(err).length;

        if(len === 0 && isSubmit){
            setSuccess(true);
        }else{
            setSuccess(false);
        }
    },[err]);
  

    return(
        <main className="content join" ref={main}>
           <figure></figure>
            <div className="inner">
                <h1>Join</h1>
                <section>
                    {success ? <div class="success">회원가입을 축하합니다.</div> : null}
                    {/* submit 이벤트 발생 시 함수 호출 */}
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <legend className='h'>회원가입 폼 양식</legend>
                            <table border='1'>
                                <caption className='h'>회원가입 입력</caption>
                                <tbody>
                                    {/* userid */}
                                    <tr>
                                        <th scope='row'>
                                            <label htmlFor="userid">USER ID</label>
                                        </th>
                                        <td>
                                            <input type="text" id="userid" name="userid" placeholder='아이디를 입력하세요' 
                                            // 실제 state 값이 변경되어야지 input창에 값을 출력
                                            value={val.userid} onChange={handleChange} />
                                            {/* value 값을 참조할 수 있게 설정해줘야함 */}

                                            <span className="err">{err.userid}</span>
                                        </td>
                                    </tr>

                                    {/* password */}
                                    <tr>
                                        <th scope='row'>
                                            <label htmlFor="pwd1">PASSWORD</label>
                                        </th>
                                        <td>
                                            <input type="password" name="pwd1" id="pwd1" placeholder='비밀번호를 입력하세요.' value={val.pwd1} onChange={handleChange} />

                                            <span className="err">{err.pwd1}</span>
                                        </td>
                                    </tr>

                                    {/* re password */}
                                    <tr>
                                        <th scope='row'>
                                            <label htmlFor="pwd2">RE-PASSWORD</label>
                                        </th>
                                        <td>
                                            <input type="password" name="pwd2" id="pwd2" placeholder='비밀번호를 입력하세요.' value={val.pwd2} onChange={handleChange} />

                                            <span className="err">{err.pwd2}</span>
                                        </td>
                                    </tr>

                                    {/* email */}
                                    <tr>
                                        <th scope='row'>
                                            <label htmlFor="email">E-MAIL</label>
                                        </th>
                                        <td>
                                            <input type="text" id="email" name="email" placeholder='이메일 주소를 입력하세요.' value={val.email} onChange={handleChange}/>

                                            <span className="err">{err.email}</span>
                                        </td>
                                    </tr>

                                    {/* gender */}
                                    <tr>
                                        <th scope="row">
                                            GENDER
                                        </th>
                                        <td>
                                            <label htmlFor="male">Male</label>
                                            <input type="radio" id='male' name='gender' onChange={handleRadio} />

                                            <label htmlFor="famale">Famale</label>
                                            <input type="radio" id='famale' name='gender' onChange={handleRadio} />

                                            <span className="err">{err.gender}</span>
                                        </td>
                                    </tr>

                                    {/* interests */}
                                    <tr>
                                        <th scope='row'>
                                            INTERESTS
                                        </th>
                                        <td>
                                            <label htmlFor="sports">Sports</label>
                                            <input type="checkbox" name='interests' id='sports' onChange={handleCheck} />

                                            <label htmlFor="sports">Music</label>
                                            <input type="checkbox" name='interests' id='music' onChange={handleCheck} />

                                            <label htmlFor="sports">Game</label>
                                            <input type="checkbox" name='interests' id='game' onChange={handleCheck} />

                                            <span className="err">{err.interests}</span>
                                        </td>
                                    </tr>

                                    {/* edu */}
                                    <tr>
                                        <th scope='row'>
                                            <label htmlFor="edu">EDUCATION</label>
                                        </th>
                                        <td>
                                            <select name="edu" id="edu" onChange={handleSelect}>
                                                <option value="">학력을 선택하세요.</option>
                                                <option value="elementery-school">초등학교 졸업</option>
                                                <option value="middle-school">중학교 졸업</option>
                                                <option value="high-school">고등학교 졸업</option>
                                                <option value="college">대학교 졸업</option>
                                            </select>

                                            <span className="err">{err.edu}</span>
                                        </td>
                                    </tr>

                                    {/* comments */}
                                    <tr>
                                        <th>
                                            <label htmlFor="comments">LEAVE COMMENTS</label>
                                        </th>
                                        <td>
                                            <textarea name="comments" id="comments" cols="30" rows="10" value={val.comments}onChange={handleChange}></textarea>

                                            <span className="err">{err.comments}</span>
                                        </td>
                                    </tr>

                                    {/* btns */}
                                    <tr>
                                        <th colSpan='2' className='btnSet'>
                                            <input type="reset" value="CANCEL" onClick={handleReset} />
                                            <input type="submit" value="SEND" />
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </fieldset>
                    </form>
                </section>
            </div>
        </main>
    );
}