import Home from '../assets/home.svg'
import {Link} from "react-router-dom";
import './Navbar.css'
import {useAuthContext} from "../hooks/useAuthContext";
import {useLogout} from "../hooks/useLogout";

export default function Navbar() {
    const {user} = useAuthContext();
    const {logout} = useLogout();
    return (
        <div className='navbar'>
            <ul>
                <li className='logo'>
                    <img src={Home}/>
                    <Link to='/'><span>backdoor</span></Link>
                </li>
                {!user && <li> <Link to='/login'>login</Link></li>}
                {!user && <li><Link to='/signup'>sign up</Link></li>}
                {user && <li><Link to='/create'>create</Link></li>}
                <li>
                    {user && <button className='btn' onClick={logout}>logout</button>}
                </li>
            </ul>
        </div>
    );
};
