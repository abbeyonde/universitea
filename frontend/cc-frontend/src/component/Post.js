import { useEffect, useRef, useState } from 'react';
import './Home.css'
import postService from '../service/post.service';
import { useParams, Link } from 'react-router-dom';
import FavoriteIcon from '../icon/FavoriteIcon.jsx';
import Comment from '../service/comment.service';
import voteService from '../service/vote.service';
import socket from '../socket';
import Anon from '../icon/Anon';



const Post = () => {
    // const [post, setPost] = useState('');
    // const [comments, setComments] = useState([]);
    const [post, setPost] = useState([
        {
            id: 1,
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Pretium quam vulputate dignissim suspendisse in est ante in. Nunc consequat interdum varius sit amet mattis vulputate. Leo vel orci porta non pulvinar neque. Tortor at risus viverra adipiscing at in tellus integer. Ultrices sagittis orci a scelerisque purus semper eget duis at. Turpis nunc eget lorem dolor sed viverra ipsum nunc. Velit dignissim sodales ut eu sem integer. Facilisi nullam vehicula ipsum a. Sit amet massa vitae tortor condimentum lacinia quis vel eros. Natoque penatibus et magnis dis. Urna porttitor rhoncus dolor purus non enim praesent. Neque gravida in fermentum et. Porttitor rhoncus dolor purus non enim praesent. Id porta nibh venenatis cras sed. Consequat interdum varius sit amet mattis vulputate. Commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae. Elementum sagittis vitae et leo duis. Enim lobortis scelerisque fermentum dui faucibus in ornare.",
            upvote: 9,
            downvote: 2,
            upvoted: false,
            downvoted: false
        }
    ]);
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
        socket.on('new_comment_add', () => {
            retrieveComments();
        })
        socket.on('update_vote_count', () => {
            console.log('new vote');
            getPost();
        });

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
                const user = await JSON.parse(localStorage.getItem('user'));
                const postVote = {
                    accountId: user.id,
                    postId: data.id
                }
                const upVoteState = await checkVoteLog(postVote);
                data.upvoted = upVoteState;
                setPost(data);
            })
            .catch(err => {
                // res.send(err.message);
                console.log(err.message)
            })
    }

    const checkVoteLog = async (data) => {

        const voteState = await voteService.checkLog(data)
        console.log(voteState);
        return voteState.data;
    }

    const onClickUpvote = async (id, value, voteState) => {

        const user = await JSON.parse(localStorage.getItem('user'));
        const postVote = {
            accountId: user.id,
            postId: id
        }
        postService.upVote(id, value);
        if (voteState) {
            voteService.deleteVote(postVote);
            // post.upvoted = false;
        }
        else {
            voteService.logVote(postVote);
            // post.upvoted = true;

        }

        // post.upvoted = !post.upvoted;

        console.log(post);
        setPost(post);
    }

    const onChangeComment = (e) => {
        const comment = e.target.value;
        setComment(comment);
    }
    const textarea = useRef(null);
    const handleClickComment = async (postId) => {
        const user = await JSON.parse(localStorage.getItem('user'));
        const data = {
            content: comment,
            postId: postId,
            accountId: user.id,
            communityId: user.communityId
        }
        console.log(data)
        textarea.current.value = '';
        Comment.new(data)
            .then(() => {
                setComment('')
                alert("Comment uploaded");
                socket.emit('new_comment');
                // window.location.reload();
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
            <div className='border-1px display-block bg-transparent'>
                <div className='post'>
                    <div className='img-anon'><Anon /></div>
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
                                <button className='vote' onClick={() => {
                                    onClickUpvote(post.id, -1, post.upvoted);
                                    post.upvote += -1;
                                    post.upvoted = false;
                                }}>
                                    <FavoriteIcon color={'tomato'} />
                                </button>
                            </div> :
                            <div className='hot-vote'>
                                <button className='vote' onClick={() => {
                                    onClickUpvote(post.id, 1, post.upvoted);
                                    post.upvote += 1;
                                    post.upvoted = true;

                                }}>
                                    <FavoriteIcon color={'grey'} />
                                </button>
                            </div>
                        }
                    </div>
                </div>
                <div className='comment'>
                    <textarea
                        ref={textarea}
                        placeholder='Comment'
                        onChange={onChangeComment}
                        required></textarea>
                    <button onClick={() => { handleClickComment(post.id) }}>Comment</button>
                </div>
            </div>

            <div className='comments'>
                <ul>
                    {comments && comments.map && comments.map((comment) => (
                        <li className='border-1px display-block transparent'>
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