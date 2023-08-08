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

    changePassword(password) {
        return http.put('account/profile/password', {
            password: password
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
}

export default new Account();