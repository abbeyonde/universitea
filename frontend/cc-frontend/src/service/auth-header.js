export default function authHeader() {
    const uT_token = JSON.parse(sessionStorage.getItem('uT_token'));
    const user = JSON.parse(sessionStorage.getItem('user'));
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