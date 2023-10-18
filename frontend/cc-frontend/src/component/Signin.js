import { useNavigate } from 'react-router-dom';
import './Signin-Signup.css'
import { useState } from 'react'
import authService from '../service/auth.service';
import { Link } from 'react-router-dom';

const SignIn = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const isPasswordSecure = (password) => {
        const re = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[._!@#\$%\^&\*])(?=.{8,})');
        return re.test(password);
    }

    const navigate = useNavigate();

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    }

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    }

    const handleClickSignIn = (e) => {
        //service signin
        authService.signIn(username, password)
            .then(() => {
                navigate('/home');
                window.location.reload();
            })
            .catch((e,res) => {
                const resMsg = (e.response && e.response.data && e.response.data.message ||
                    e.message ||
                    e.toString());
                console.log(e.response)
                alert(resMsg);
                //check resMsg here password or verification
                //if else
                setMessage(e.response.data);
            })
    }

    return (
        <div className="bg-signin">
            <div className="signin-form">
                Sign In
                <div className="signin-input-field">
                    <label className='input-field'>
                        <input
                            type='text'
                            placeholder='Username'
                            onChange={onChangeUsername}></input>
                    </label>
                    <label className='input-field'>
                        <input
                            type='password'
                            placeholder='Password'
                            onChange={onChangePassword}></input>
                    </label>
                    <div className='message transparent'>
                        <small className='message'>{message}</small>
                    </div>
                    <Link className='forgot-password' to={'/forgot-password'}>Forgot Password?</Link>
                    <button
                        className='btn-sign-in'
                        onClick={handleClickSignIn}>Sign In</button>
                </div>
            </div>
        </div>
    );
}

export default SignIn;