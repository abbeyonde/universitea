export default function authHeader() {
    const uT_token = JSON.parse(localStorage.getItem('uT_token'));
    const user = JSON.parse(localStorage.getItem('user'));
    //get accessToken from cookie

    if (user && uT_token) {
        return {
            'Authorization': `Bearer ${uT_token}`,
            'Accept': 'application/json'
        };
    } else {
        return {};
    }
}