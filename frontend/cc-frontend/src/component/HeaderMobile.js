import { Link, useNavigate } from 'react-router-dom';
import './HeaderMobile.css'
import Hamburger from '../icon/Hamburger';
import { useEffect, useState } from 'react';
import authService from '../service/auth.service';

const HeaderMobile = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(()=> {
        const user = authService.getCurrentUser();
        if(user){
            return setCurrentUser(user);
        }
    })

    const onClickConfess = () => {
        navigate('/post/new');
    }
    const onClickSignOut = () => {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('uT_token');
        navigate('/');
        window.location.reload();
    }
    return (
        <header>
            {currentUser?
            <nav className="navlink">
                <ul className='flex'>
                    <li><button className='sign-up' onClick={onClickConfess}>Confess</button></li>
                    <li className='name'>universiTea</li>
                    <li className='dropdown'>
                        <Hamburger />
                        <div className='dropdown-ctt'>
                            <Link to={'/home'}><label>Home</label></Link>
                            <Link to={`/post/user/${currentUser.username}`}><label>My Confession</label></Link>
                            <Link to={`/profile/${currentUser.username}`}><label>My Profile</label></Link>
                            <label onClick={onClickSignOut}>Sign Out</label>
                        </div>
                    </li>
                </ul>
            </nav>
            :
            <div></div>}
        </header>
    )
}

export default HeaderMobile;