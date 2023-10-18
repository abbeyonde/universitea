const ForgotPassword = () => {

    const handleSubmitResetPassword = ()=> {
        console.log('pass')
    }
    return (
        <div className="form">
            <form className="reset-password">
                <input placeholder="username" required></input>
                <button type="submit" onSubmit={handleSubmitResetPassword}>Reset Password</button>
            </form>
        </div>
    )
}

export default ForgotPassword;