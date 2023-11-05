import http from "../http-common";
import authHeader from "./auth-header";

class Comment {
    new(data) {
        return http.post('api/comment/new', {
            content: data.content,
            postId: data.postId,
            accountId: data.accountId,
            communityId: data.communityId
        }, {
            headers: authHeader(),
        })
    }

    postComment(postId) {
        return http.get(`api/comment/${postId}/all-comments`, { headers: authHeader() });
    }

    count(id) {
        return http.get(`api/comment/count/${id}`, { headers: authHeader() });
    }
}

export default new Comment();