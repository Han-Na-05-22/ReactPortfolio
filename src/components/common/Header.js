import {NavLink} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default function Header(props){
    const active={color : 'aqua'}

    return(
        <header className={props.type}>
            <div className="inner">
                <h1><NavLink exact to='/'>DCODELAB</NavLink></h1>
                <ul id="gnb">
                    <li><NavLink activeStyle={active} to='/department'>Department</NavLink></li>
                    <li><NavLink activeStyle={active} to='/community'>Community</NavLink></li>
                    <li><NavLink activeStyle={active} to='/gallery'>Gallery</NavLink></li>
                    <li><NavLink activeStyle={active} to='/youtube'>Youtube</NavLink></li>
                    <li><NavLink activeStyle={active} to='/location'>Location</NavLink></li>
                    <li><NavLink activeStyle={active} to='/join'>Join</NavLink></li>
                </ul>

            <FontAwesomeIcon icon={faBars} />
            </div>
        </header>
    );
}

