export default function authHeader(){
    const user = JSON.parse(localStorage.getItem('user'));
    const cookie = document.cookie;

    //get accessToken from cookie

    if (user && user.accessToken) {
        return { Authorization: `Bearer ${user.uT_token}`};
    }else{
        return{};
    }
}