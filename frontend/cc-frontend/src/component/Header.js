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
    return (
        <header>
            <Link className='app-name' to={'/'}>universiTea</Link>
            <nav>
                <ul className='nav-links'>
                    {/* <li>Profile</li> */}
                </ul>
            </nav>

            {currentUser ? 
            (<div>

            </div>)
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