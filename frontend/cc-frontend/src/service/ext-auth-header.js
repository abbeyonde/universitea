import { useParams } from "react-router-dom";

export default function ExternalAuthHeader() {
    const { token } = useParams();
    const resetToken = token;
    // const user = JSON.parse(localStorage.getItem('user'));
    //get accessToken from cookie

    if (token) {
        return {
            'Authorization': `Bearer ${resetToken}`,
            'Accept': 'application/json'
        };
    } else {
        return {};
    }
}