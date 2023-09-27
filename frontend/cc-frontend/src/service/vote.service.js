import http from "../http-common";
import authHeader from "./auth-header";

class Vote {
    logVote(data) {
        return http.post('api/vote/log',{
            postId: data.postId,
            accountId: data.accountId
        },{
            headers: authHeader(),
        })
    }

    deleteVote(data){
        return http.delete(`api/vote/delete/${data.postId}/${data.accountId}`,{headers: authHeader()});
    }

    checkLog(data){
        return http.get(`api/vote/check/${data.postId}/${data.accountId}`,{ headers: authHeader()})
    }
}

export default new Vote();