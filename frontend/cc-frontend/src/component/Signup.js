import './Signin-Signup.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../service/auth.service';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    }

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    }

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    }
    const onChangeRepeatPassword = (e) => {
        const repeatPassword = e.target.value;
        setPassword(repeatPassword);
    }

    const handleClickSignUp = (e) => {
        const data = {
            username: username,
            email: email,
            password: password
        }
        //service signin
        authService.signUp(data)
            .then(() => {
                navigate('/sign-in');
                window.location.reload();
            })
            .catch(e => {
                const resMsg = (e.response && e.response.data && e.response.data.message ||
                    e.message ||
                    e.toString());
                alert(resMsg);
                setMessage(resMsg);
            })
    }

    return (
        <div className="bg-signin">
            <div className="signin-form w-50p">
                Sign Up
                <div className="signin-input-field">
                    <label className='input-field'>
                        <input
                            type='text'
                            placeholder='Username'
                            onChange={onChangeUsername}></input>
                    </label>
                    <label className='input-field'>
                        <input
                            type='text'
                            placeholder='Email'
                            onChange={onChangeEmail}></input>
                    </label>
                    <label className='input-field'>
                        <input
                            type='password'
                            placeholder='Password'
                            onChange={onChangePassword}></input>
                    </label>
                    <label className='input-field'>
                        <input
                            type='password'
                            placeholder='Re-type Password'
                            onChange={onChangeRepeatPassword}></input>
                    </label>
                    <div className='tnc-line transparent'>
                        <input type='checkbox' id='tnc' name='tnc' className='align-left'></input>
                        <label for='tnc' className='label-tnc size-sm transparent align-center'>Agree to <a className='transparent size-sm text-underline' href=''>terms and conditions</a></label>
                    </div>
                    <button
                        className='btn-sign-in'
                        onClick={handleClickSignUp}>Sign Up</button>
                </div>
            </div>
        </div>
    );

}

export default SignUp;