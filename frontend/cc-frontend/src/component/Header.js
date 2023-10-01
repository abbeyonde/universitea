import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../service/auth.service';
import { useEffect, useState } from 'react';
import Expand from '../icon/Expand';
import ProfileIcon from '../icon/ProfileIcon';

const Header = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(undefined);
    const [page, setPage] = useState('Home');

    useEffect(() => {
        const user = authService.getCurrentUser();
        // setPage('Home')
        if (user) {
            return setCurrentUser(user);
        }
    })

    const onClickSignOut = () => {
        localStorage.removeItem('user');
        navigate('/');
        window.location.reload();
    }

    const onClickConfess = () => {
        navigate('/post/new');
    }

    return (
        <header>
            {currentUser ?
                <Link className='app-name' to={'/home'} onClick={() => { setPage('Home') }} >universiTea</Link>
                :
                <Link className='app-name' to={'/'} >universiTea</Link>
            }
            {currentUser ?
                <div className='sign-in-sign-up'>
                    <nav className='nav-links'>
                        <ul>
                            <li>
                                <Link to={`/home`} className='home' style={{ textDecoration: 'none' }} ><label onClick={() => { setPage('Home') }}>Home</label></Link>
                            </li>
                            <li>
                                <button className='sign-up' onClick={onClickConfess}>Confess</button>
                            </li>
                            <li>
                                <div className='dropdown'>
                                    <button><ProfileIcon /> <Expand /></button>
                                    {/* <Expand className='expand-icon'/> */}
                                    <div className='dropdown-content'>
                                        {/* <Link to={`/home`} className='sign-in' style={{ textDecoration: 'none' }} ><label onClick={() => { setPage('Home') }}>Home</label></Link> */}
                                        <Link to={`/post/user/${currentUser.username}`} className='sign-in' onClick={() => { setPage('My Confession') }} style={{ textDecoration: 'none' }}><label>My Confession</label></Link>
                                        <Link to={`/profile/${currentUser.username}`} className='sign-in' style={{ textDecoration: 'none' }} ><label onClick={() => { setPage('My Profile') }}>My Profile</label></Link>
                                        <label onClick={onClickSignOut}>Sign out</label>
                                    </div>

                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
                :
                (<div className='sign-in-sign-up'>
                    <p className='desc-sign-in'>Existing user?</p>
                    <Link to={'/sign-in'} className='sign-in' >Sign In</Link>
                    <button className='sign-up'><Link to={'/sign-up'} className='transparent color-white'>Sign Up</Link></button>
                </div >)
            }
        </header >

    );
}

export default Header;