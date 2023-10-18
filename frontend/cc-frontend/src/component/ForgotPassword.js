import { useState } from "react"

const ForgotPassword = () => {

    const [username, setUsername] = useState('');

    const onChangeUsername = (e) => {
        const username = e.target.value
        setUsername(username);
    }

    const handleSubmitResetPassword = ()=> {
        console.log('pass')
    }
    return (
        <div className="form">
            <form className="reset-password">
                <input placeholder="username" onChange={onChangeUsername} required></input>
                <button type="submit" onSubmit={handleSubmitResetPassword}>Reset Password</button>
            </form>
        </div>
    )
}

export default ForgotPassword;