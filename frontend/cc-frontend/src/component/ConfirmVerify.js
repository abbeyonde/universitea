import { useNavigate, useParams } from "react-router-dom";
import accountService from "../service/account.service";
import './Verification.css'
import { useEffect, useState } from "react";
const ConfirmVerification = () => {
    const { username } = useParams();
    const [second, setSecond] = useState(90);
    const [button, setButton] = useState(true);
    useEffect(() => {
        const newSecond = second;
        let myInterval = setInterval(() => {
            if (second > 0) {
                // const second = second;
                setSecond(newSecond - 1);
            }
            else{
                setButton(false);
                setSecond(0);
            }
        }, 1000)
        return ()=>{
            clearInterval(myInterval);
        }
    })
    const onClickResend = () => {
        const data = {
            username: username,
        }
        setSecond(90);
        setButton(true);
        accountService.resendVerify(data);

    }
    return (
        <div className="verify">
            <h1>Email Verification</h1>
            <p>Check your email to get the verification link</p>
            <button onClick={onClickResend} disabled={button}>Resend verification link ({second}s)</button>
        </div>
    )
}

export default ConfirmVerification;