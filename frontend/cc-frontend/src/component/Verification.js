import { useNavigate, useParams } from "react-router-dom";
import accountService from "../service/account.service";
import './Verification.css'
const Verification = () => {
    const { username, verifyToken } = useParams();
    const navigate = useNavigate();
    const onClickVerify = () => {
        const data = {
            username: username,
            verifyToken:  verifyToken,
        }
        accountService.verify(data);
        navigate('/sign-in');
    }
    return (
        <div className="verify">
            <h1>Email Verification</h1>
            <p>Click the button below to verify your email</p>
            <button onClick={ onClickVerify}>Verify</button>
        </div>
    )
}

export default Verification;