import { useState } from "react"
import accountService from "../service/account.service";

const ResetPassword = () => {

    const [newPassword, setNewPassword] = useState('');
    const [repNewPassword, setRepNewPassword] = useState('');
    const [messagePw, setMessagePw] = useState('');
    const [messageRePw, setMessageRePw] = useState('');
    const [pwState , setPwState] = useState(false);

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
    const handleSubmitResetPassword = ()=> {
        const data = {
            newPassword: newPassword,
        }
        accountService.resetPassword(data)
    }
    return (
        <div className="form">
            <form className="reset-password">
                <input placeholder="New Password" required></input>
                <small>{messagePw}</small>
                <input placeholder="Re-type new Password" required></input>
                <small>{messageRePw}</small>
                <button type="submit" onSubmit={handleSubmitResetPassword}>Submit</button>
            </form>
        </div>
    )
}

export default ResetPassword;