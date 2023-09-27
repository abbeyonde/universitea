import { useEffect, useState } from 'react';
import './Home.css'
import postService from '../service/post.service';
import { useParams, Link } from 'react-router-dom';
import UpvoteIcon from '../icon/UpvoteIcon.jsx';
import Comment from '../service/comment.service';
import io from 'socket.io-client';
import voteService from '../service/vote.service';

const socket = io.connect('http://localhost:8080');


const Post = () => {
    const [post, setPost] = useState('');
    const [comments, setComments] = useState([
        {
            id: 1,
            content: "adsadasdasda",
            upvote: 9,
            downvote: 2,
            upvoted: false,
            downvoted: false
        }
    ]);
    const [comment, setComment] = useState('');
    const { id } = useParams();
    useEffect(() => {
        getPost();
        retrieveComments();
        socket.on('new_comment_add', ()=>{
            retrieveComments();
        })

    }, [socket]);

    const retrieveComments = () => {
        Comment.postComment(id)
            .then(async (res) => {
                const datas = [];
                const data = await res.data;
                for (var i in data) {
                    datas.push(data[i]);
                }
                datas.reverse();
                setComments(datas);
                console.log(datas);
            })
            .catch(e => {
                console.log(e.message);
            })
    }
    const getPost = () => {
        postService.post(id)
            .then(async (res) => {
                const data = res.data;
                const upVoteState = await checkVoteLog(postVote);
                data.upvoted = upVoteState;
                setPost(data);
            })
            .catch((err, res) => {
                res.send(err.message);
            })
    }

    const checkVoteLog = async (data) => {
        
        const voteState = await voteService.checkLog(data)
        console.log(voteState);
        return voteState.data;
    }

    const onClickUpvote = async (id, value) => {

        const user = await JSON.parse(localStorage.getItem('user'));
        const postVote = {
            accountId: user.id,
            postId: id
        }
        Post.upVote(id, value);
        if (voteState) {
            voteService.deleteVote(postVote);
        }
        else {
            voteService.logVote(postVote);
        }
        
        post.upvoted = !post.upvoted; 
        setPost(post);
    }

    const onChangeComment = (e) => {
        const comment = e.target.value;
        setComment(comment);
    }

    const handleClickComment = async (postId) => {
        const user = await JSON.parse(localStorage.getItem('user'));
        const data = {
            content: comment,
            postId: postId,
            accountId: user.id,
            communityId: user.communityId
        }
        console.log(data)
        Comment.new(data)
            .then(() => {
                alert("Comment uploaded");
                socket.emit('new_comment');
                window.location.reload();
            })
            .catch(e => {
                const resMsg = (e.response && e.response.data && e.response.data.message ||
                    e.message ||
                    e.toString());
                // alert(resMsg);
                console.log(resMsg);
            })

    }

    return (
        <div className="post-body">
            <div className='post'>
                <div className='img-anon'></div>
                <div className='post-content bg-transparent align-left'>
                    <Link to={`/post/${post.id}`}>
                        <p className='bg-transparent align-left'>{post.content}</p>
                    </Link>
                </div>
                <div className='tea-score'>
                    <div className='counter'>
                        <p>{post.upvote}</p>
                    </div>
                    {post.upvoted ?
                        <div className='hot-vote'>
                            <button className='vote' onClick={() => { onClickUpvote(post.id, -1, post.upvoted) }}>
                                <UpvoteIcon color={'tomato'} />
                            </button>
                        </div> :
                        <div className='hot-vote'>
                            <button className='vote' onClick={() => { onClickUpvote(post.id, 1, post.upvoted) }}>
                                <UpvoteIcon color={'grey'} />
                            </button>
                        </div>
                    }
                </div>
            </div>
            <div className='comment'>
                <textarea
                    placeholder='Comment'
                    onChange={onChangeComment}
                    required></textarea>
                <button onClick={() => { handleClickComment(post.id) }}>Comment</button>
            </div>
            <div className='comments'>
                <ul>
                    {comments && comments.map && comments.map((comment) => (
                        <li className='display-block'>
                            <div className='post'>
                                {/* <div className='img-anon'></div> */}
                                <div className='post-content bg-transparent align-left'>
                                    <p className='bg-transparent align-left'>{comment.content}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Post;