import http from "../http-common";
import authHeader from "./auth-header";

class Account {
    changeUsername(username, user) {
        return http.put(`account/profile/${user.id}/username`, {
            username: username
        },
            {
                headers: authHeader()
            })
            .then(res => {
                console.log(res);
            })
            .catch((e, res) => {
                console.log(e.message);
                res.status(500).send(e.message);
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
            .catch((e, res) => {
                console.log(e.message);
                res.status(500).send(e.message);
            })
    }

    update(user){
        return http.get(`account/profile/update/${user.id}`);
    }
}

export default new Account();