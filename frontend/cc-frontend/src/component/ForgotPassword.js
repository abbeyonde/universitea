import { useState } from "react"
import accountService from "../service/account.service";

const ForgotPassword = () => {

    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const onChangeUsername = (e) => {
        setMessage('')
        const username = e.target.value
        setUsername(username);
    }

    const handleClickResetPassword = () => {
        console.log('pass')
        if (username) {
            setMessage('');
            const data = {
                username: username
            }
            accountService.forgotPassword(data)
        }
        else{
            setMessage('Please fill out the required field')
        }
    }
    return (
        <div className="form">
            <input placeholder="username" onChange={onChangeUsername} required></input>
            <small>{message}</small>
            <button type="submit" onClick={handleClickResetPassword}>Reset Password</button>
        </div>
    )
}

export default ForgotPassword;