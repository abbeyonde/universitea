import http from "../http-common";
import authHeader from "./auth-header";

class AuthService {
    //signIn
    signIn(username, password) {
        return http.post('account/sign-in', {
            username: username,
            password: password
        })
            .then(res => {
                const AUTH_TOKEN = res.data.accessToken;
                if (AUTH_TOKEN) {
                    //save token in cookie not header directly
                    document.cookie = `uT_token=${AUTH_TOKEN}`;
                    const user = {
                        id: res.data.user.id,
                        username: res.data.user.username,
                        communityId: res.data.user.communityId,
                        uT_token: AUTH_TOKEN
                    }
                    sessionStorage.setItem('user', JSON.stringify(user));
                    sessionStorage.setItem('uT_token', JSON.stringify(AUTH_TOKEN));
                }
                return res.data;
            })
    }
    //signUp new account
    signUp(data) {
        return http.post('account/sign-up', {
            username: data.username,
            email: data.email,
            password: data.password
        })
    }

    //logout

    //get account profile
    getProfile(user) {
        console.log(user.username);
        return http.get(`account/profile/${user.id}`, { headers: authHeader() });
    }

    //delete account

    //chech if user is signed in or not
    getCurrentUser() {
        return JSON.parse(sessionStorage.getItem('user'));
    }
}
export default new AuthService();