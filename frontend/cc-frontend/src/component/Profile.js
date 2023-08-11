import { useEffect, useState } from "react";
import authService from "../service/auth.service";
import accountService from "../service/account.service";
import './Profile.css';

const Profile = () => {

    const [user, setUser] = useState('');
    const [newUsername, setNewUsername] = useState(undefined);
    const [oldPassword, setOldPassword] = useState(undefined);
    const [newPassword, setNewPassword] = useState(undefined);
    const [reNewPassword, setReNewPassword] = useState(undefined);
    const [changeUsername, setChangeUsername] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const [changeProfile, setChangeProfile] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [username, setUsername] = useState('test');
    const [email, setEmail] = useState('test');
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
        const pw = e.target.value;
        setOldPassword(pw);
    }

    const onChangeNewPassword = (e) => {
        const pw = e.target.value;
        setNewPassword(pw);
    }

    const onChangeReNewPassword = (e) => {
        const pw = e.target.value;
        setReNewPassword(pw);
    }


    const onClickSubmitUsername = () => {
        console.log(user);
        accountService.changeUsername(newUsername, user);
        // setUsername(newUsername);
        setChangeUsername(false);
        setUsername(newUsername);
        // window.location.reload()
        setChangeProfile(true);
    }

    const onClickSubmitPassword = () => {

        const data = {
            id: user.id,
            oldPassword: oldPassword,
            newPassword: newPassword
        }
        accountService.changePassword(data)
            .then(() => {

            });
        setChangePassword(false);
        // window.location.reload();
        setChangeProfile(true);
    }

    const onClickUpdateProfile = () => {
        accountService.update(user);
    }

    return (
        <div className="post-body">
            <div className="container-username">
                <div className="bg-transparent">
                    <label>Username:</label>
                    <input type="text" value={username} readOnly></input>
                </div>
                <button onClick={onClickUsername}>change username</button>
                {changeUsername ?
                    (
                        <div className="new-field">
                            <input className="mx-right-0" onChange={onChangeUsername} placeholder="New username"></input>
                            <button onClick={onClickSubmitUsername}>Submit</button>
                        </div>
                    ) : (
                        <div>
                        </div>
                    )}
            </div>
            <div className="container-email">
                <label>Email:</label>
                <input type="text" value={email} readOnly></input>
            </div>
            <div className="container-pw">
                <label>Password:</label>
                <button onClick={onClickPassword}>change password</button>
                {changePassword ?
                    (
                        <div className="input-pw new-field">
                            <input type="password" onChange={onChangeOldPassword} placeholder="Old password"></input>
                            <input type="password" onChange={onChangeNewPassword} placeholder="New password"></input>
                            <input type="password" onChange={onChangeReNewPassword} placeholder="Re-type new password"></input>
                            <button onClick={onClickSubmitPassword}>Submit</button>
                        </div>
                    ) : (
                        <div>
                        </div>
                    )}
            </div>
            <div className="container-community">
                <label>Community:</label>
                <input type="text" value={'UNITEN'} readOnly></input>
            </div>
            {
                changeProfile ?
                <button className="update-button" onClick={onClickUpdateProfile}>Update</button>
                :
                <div></div>
}
        </div>
    )
}
export default Profile;