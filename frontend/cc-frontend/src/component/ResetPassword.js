import { useState } from "react"
import accountService from "../service/account.service";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [repNewPassword, setRepNewPassword] = useState('');
    const [messagePw, setMessagePw] = useState('');
    const [messageRePw, setMessageRePw] = useState('');
    const [pwState, setPwState] = useState(false);
    const {username, token} = useParams();

    const isPasswordSecure = (password) => {
        const re = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[._!@#\$%\^&\*])(?=.{8,})');
        return re.test(password);
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
        setNewPassword(password);
    }
    const onChangeRepeatPassword = (e) => {
        const repeatPassword = e.target.value;
        if (String(repeatPassword) === String(newPassword)) {
            setMessageRePw('');
            setPwState(true)
        }
        else {
            setMessageRePw("Password doesn't match")
        }
        setRepNewPassword(repeatPassword);
    }
    const handleClickResetPassword = () => {
        if (pwState) {
            const data = {
                username: username,
                token:token,
                newPassword: newPassword,
            }
            accountService.resetPassword(data)
            .then(()=> {
                alert("Your password has been reset");
                navigate('/sign-in')
            })
            .catch(err => {
                console.log(err.message);
            })
        }
        else{
            setMessagePw('fill this field')
        }
    }
    return (
        <div className="form">
            <input type='password' placeholder="New Password" onChange={onChangePassword} required></input>
            <small>{messagePw}</small>
            <input type='password' placeholder="Re-type new Password" onChange={onChangeRepeatPassword} required></input>
            <small>{messageRePw}</small>
            <button type="submit" onClick={handleClickResetPassword}>Submit</button>
        </div>
    )
}

export default ResetPassword;