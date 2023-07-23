import http from "../http-common";
import authHeader from "./auth-header";

class Post {
    //all request must send header
    //create a new post
    newPost(data) {
        return http.post('api/post/new', {
            content: data.content,
            accountId: data.accountId,
            communityId: data.communityId
        },
            {
                headers: authHeader()
            })
    }

    //retrieve all post
    allPost() {
        return http.get('api/post/all', { headers: authHeader() });
    }

    //retrieve one post

    //delete a post

}

export default new Post();