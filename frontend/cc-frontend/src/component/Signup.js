import './Signin-Signup.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../service/auth.service';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [messagePw, setMessagePw] = useState('');
    const [messageUsername, setMessageUsername] = useState('');
    const [messageRePw, setMessageRePw] = useState('');
    const [messageSignUp, setMessageSignUp] = useState('');
    const [agree, setAgree] = useState(false);
    const [usernameState , setUsernameState] = useState(false);
    const [emailState , setEmailState] = useState(false);
    const [pwState , setPwState] = useState(false);

    const navigate = useNavigate();

    const isPasswordSecure = (password) => {
        const re = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*._-+=])(?=.{8,})');
        return re.test(password);
    }

    const onChangeUsername = (e) => {
        const username = e.target.value;
        if(String(username).length >= 6 && String(username).length <= 12){
            setMessageUsername('');
            setUsernameState(true);
        }
        else{
            setMessageUsername('Username must be between 6-12 characters only');
        }
        setUsername(username);
    }

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
        setEmailState(true);

    }

    const onChangePassword = (e) => {
        const password = e.target.value;
        console.log(password)
        if (isPasswordSecure(password)) {
            setMessagePw('');
        }
        else {
            setMessagePw('Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)')
        }
        setPassword(password);
    }
    const onChangeRepeatPassword = (e) => {
        const repeatPassword = e.target.value;
        if (String(repeatPassword) === String(password)) {
            setMessageRePw('');
            setPwState(true)
        }
        else {
            setMessageRePw("Password doesn't match")
        }
        setRepeatPassword(repeatPassword);
    }

    const handleClickSignUp = (e) => {
        const data = {
            username: username,
            email: email,
            password: password
        }
        console.log('click')
        //service signin
        if( usernameState && emailState && pwState && agree){
            console.log(true)
            setMessageSignUp('')
            authService.signUp(data)
                .then(() => {
                    alert('Please verify your email first before signing in');
                    navigate('/sign-in');
                    window.location.reload();
                })
                .catch(e => {
                    const resMsg = (e.response && e.response.data && e.response.data.message ||
                        e.message ||
                        e.toString());
                    alert(resMsg);
                    setMessageUsername(e.response.data);
                })
        }
        else{
            console.log(false);
            setMessageSignUp('You must fill all fields and agree to our terms and condition')
        }
    }

    const onClickTnC = ()=>{
        const agreeLocal = agree;
        setAgree(!agreeLocal);
        if( usernameState && emailState && pwState && agree){
            console.log(true)
            setMessageSignUp('')
        }
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
                    <div className='message transparent'>
                        <small className='message'>{messageUsername}</small>
                    </div>
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
                            onChange={onChangePassword}
                            autoComplete='off'></input>
                    </label>
                    <div className='message transparent'>
                        <small className=''>{messagePw}</small>
                    </div>
                    <label className='input-field'>
                        <input
                            type='password'
                            placeholder='Re-type Password'
                            onChange={onChangeRepeatPassword}></input>
                    </label>
                    <div className='message transparent'>
                        <small className='message'>{messageRePw}</small>
                    </div>
                    <div className='tnc-line transparent'>
                        <input type='checkbox' id='tnc' name='tnc' className='align-left' onClick={onClickTnC}></input>
                        <label htmlFor='tnc' className='label-tnc size-sm transparent align-center'>Agree to <a className='transparent size-sm text-underline' href=''>terms and conditions</a></label>
                    </div>
                    <div className='message transparent'>
                        <small className='message'>{messageSignUp}</small>
                    </div>
                    <button
                        className='btn-sign-in'
                        onClick={handleClickSignUp} 
                        >Sign Up</button>
                </div>
            </div>
        </div >
    );

}

export default SignUp;