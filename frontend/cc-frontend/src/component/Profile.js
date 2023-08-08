import { useEffect, useState } from "react";
import authService from "../service/auth.service";
import { useNavigate } from "react-router-dom";
import accountService from "../service/account.service";

const Profile = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [newUsername, setNewUsername] = useState(undefined);
    const [oldPassword, setOldPassword] = useState(undefined);
    const [newPassword, setNewPassword] = useState(undefined);
    const [reNewPassword, setReNewPassword] = useState(undefined);
    const [changeUsername, setChangeUsername] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [communityId, setCommunityId] = useState('');
    useEffect(() => {
        getProfile();
    }, [])

    const getProfile = async () => {
        const currentUser = await JSON.parse(localStorage.getItem('user'));
        setUser(currentUser);
        authService.getProfile(currentUser)
            .then(async (res) => {
                const data = await res.data;
                console.log(data);
                setUsername(data.username);
                setEmail(data.email);
                setCommunityId(data.communityId);
            });

    }

    const onClickUsername = () => {
        setChangeUsername(true);
    }
    const onClickPassword = () => {
        setChangePassword(true);
    }

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setNewUsername(username);
    }

    const onChangeOldPassword = (e) => {
        setOldPassword(e.target.value);
    }

    const onChangeNewPassword = (e) => {
        setNewPassword(e.targe.value);
    }

    const onChangeReNewPassword = (e) => {
        setReNewPassword(e.target.value);
    }


    const onClickSubmitUsername = () => {
        console.log(user);
        accountService.changeUsername(newUsername, user);
        // setUsername(newUsername);
        setChangeUsername(false);
        window.location.reload()
    }

    const onClickSubmitPassword = () => {

    }

    return (
        <div>
            <p>{`Username: ${username}`}</p>
            <button onClick={onClickUsername}>change username</button>
            {changeUsername ?
                (
                    <div>
                        <input onChange={onChangeUsername} placeholder="New username"></input>
                        <button onClick={onClickSubmitUsername}>Submit</button>
                    </div>
                ) : (
                    <div>
                    </div>
                )}
            <p>{`Email: ${email}`}</p>
            <button onClick={onClickPassword}>change password</button>
            {changePassword ?
                (
                    <div>
                        <input onChange={onChangeOldPassword} placeholder="Old password"></input>
                        <input onChange={onChangeNewPassword} placeholder="New password"></input>
                        <input onChange={onChangeReNewPassword} placeholder="Re-type new password"></input>
                        <button onClick={onClickSubmitPassword}>Submit</button>
                    </div>
                ) : (
                    <div>
                    </div>
                )}
            <p>{`Community: ${communityId}`}</p>

        </div>
    )
}

export default Profile;