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
        localStorage.removeItem();
    }

    return (
        <header>
            {currentUser ?
                <Link className='app-name' to={'/home'} onClick={() => { window.location.reload() }}>universiTea</Link>
                :
                <Link className='app-name' to={'/'} onClick={() => { window.location.reload() }}>universiTea</Link>
            }
            <nav>
                <ul className='nav-links'>
                    {/* <li>Profile</li> */}
                </ul>
            </nav>

            {currentUser ?
                <div className='sign-in-sign-up'>
                    <button className='sign-up'><Link to={'/'} className='transparent color-white' onClick={onClickSignOut}>Sign Out</Link></button>
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