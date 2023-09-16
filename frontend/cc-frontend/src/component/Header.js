import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../service/auth.service';
import { useEffect, useState } from 'react';

const Header = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        const user = authService.getCurrentUser();

        if (user) {
            return setCurrentUser(user);
        }
    })

    const onClickSignOut = () => {
        localStorage.removeItem('user');
        navigate('/');
        window.location.reload();
    }

    return (
        <header>
            {currentUser ?
                <Link className='app-name' to={'/home'} >universiTea</Link>
                :
                <Link className='app-name' to={'/'} >universiTea</Link>
            }

            {currentUser ?
                <div className='sign-in-sign-up'>
                    <nav className='nav-links'>
                        <ul>
                            <li>
                                <Link to={'/all/'} className='sign-in' >My Confession</Link>
                            </li>
                            <li>
                                <Link to={`/profile/${currentUser.username}`} className='sign-in' >My Profile</Link>
                            </li>
                            <li>
                                <button className='sign-up' onClick={onClickSignOut}>Sign Out</button>
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