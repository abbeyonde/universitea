import http from "../http-common";
import authHeader from "./auth-header";

class Account {
    changeUsername(username, user) {
        return http.put(`account/profile/${user.id}/change-username`, {
            id: user.id,
            username: username
        },
            {
                headers: authHeader()
            })
            .then(res => {
                console.log(res.data);
            })
            .catch((e) => {
                console.log(e.message);
            })
    }

    changePassword(data) {
        return http.put(`account/profile/${data.id}/password`, {
            id: data.id,
            password: data.oldPassword,
            newPassword: data.newPassword
        },
            {
                headers: authHeader()
            })
            .then(res => {
                console.log(res);
            })
            .catch((e) => {
                console.log(e.message);
            })
    }

    update(user){
        return http.get(`account/profile/update/${user.id}`,{headers: authHeader()});
    }

    verify(data){
        return http.put(`account/verify/${data.username}/${data.verifyToken}`)
    }

    resendVerify(data){
        return http.get(`account/resend-verify/${data.username}`)
    }

    forgotPassword(data){
        return http.get(`account/forgot-password/${data.username}`)
    }

    resetPassword(data){
        return http.put(`account/reset-password/${data.username}/${data.token}`,
        {
            newPassword: data.newPassword
        })
    }
}

export default new Account();