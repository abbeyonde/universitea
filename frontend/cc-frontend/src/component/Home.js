import { Link } from 'react-router-dom';
import './Home.css'
import Post from '../service/post.service';
import { React, useEffect, useRef, useState } from 'react';
import UpvoteIcon from '../icon/UpvoteIcon.jsx';
import Comment from '../service/comment.service';
import io from 'socket.io-client';
import voteService from '../service/vote.service';
import BarLoader from 'react-spinners/BarLoader'
import './Loading.css'
import Anon from '../icon/Anon';
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
import socket from '../socket';

const Home = () => {
    
    // const [posts, setPosts] = useState([]);
    // const socket = io();
    const [posts, setPosts] = useState([
        {
            id: 1,
            content: "Lorem ipsum dolor sit amet",
            upvote: 9,
            downvote: 2,
            upvoted: false,
            downvoted: false
        }
    ]);
    
    const [isLoading, setIsLoading] = useState(false);
    const [newConfession, setNewConfession] = useState(false);
    const textarea = useRef(null);
    

    const [comment, setComment] = useState('');

    useEffect(() => {
        retrievePosts()
        socket.on('new_post_uploaded', () => {
            console.log('new post in');
            setNewConfession(true);

        });
        socket.on('update_vote_count', () => {
            console.log('new vote');
            retrievePosts();
        });
    }, [socket])

    const retrievePosts = () => {
        Post.allPost()
            .then(async (res) => {
                const datas = [];
                const data = await res.data;
                const user = await JSON.parse(localStorage.getItem('user'));
                for (var i in data) {
                    //check from db, user liked the post or not
                    const postVote = {
                        accountId: user.id,
                        postId: data[i].id
                    }
                    const upVoteState = await checkVoteLog(postVote);
                    console.log(`upvoteState: ${upVoteState}`);
                    data[i].upvoted = upVoteState;
                    data[i].downvoted = false;
                    datas.push(data[i]);
                }
                datas.reverse();
                setPosts(datas);
                setIsLoading(false);
                // console.log(datas);
            })
            .catch(e => {
                console.log(e);
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
        Post.upVote(id, value);
        if (voteState) {
            voteService.deleteVote(postVote);
        }
        else {
            voteService.logVote(postVote);
        }

        const listPosts = posts.map((post) => post.id === id ? { ...post, upvoted: !post.upvoted } : post);
        setPosts(listPosts);
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
        };
        textarea.current.value = '';

        console.log(data)
        Comment.new(data)
        .then(() => {
                setComment('');
                alert("Comment uploaded");
                socket.emit('new_comment');
            })
            .catch(e => {
                const resMsg = (e.response && e.response.data && e.response.data.message ||
                    e.message ||
                    e.toString());
                console.log(resMsg);
            })
    }

    const onClickNewConfession = () => {
        if (newConfession) {
            setNewConfession(false);
            window.location.reload();
        }
        window.location.reload();
    }

    return (

        <div>
            {isLoading ?
                <div className='post-body'>
                    <div className='border-1px display-block bg-transparent'>
                        <div className='post'>
                            <div className="sweet-loading">
                                <div className='post-content'>
                                    <BarLoader
                                        className="loader"
                                        color="rgb(194, 194, 194)"
                                        height={20}
                                        width={400}
                                        speedMultiplier={1} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                < div className="post-body">
                    {newConfession ?
                        <div className='confession'>
                            <label onClick={onClickNewConfession} > New Confession is up!</label>
                        </div> :
                        <div></div>}
                    <ul>
                        {posts && posts.map && posts.map((post, index) => (
                            <li className='border-1px display-block bg-transparent' key={post.id}>
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
                                                    post.upvote += -1
                                                }}>
                                                    <UpvoteIcon color={'tomato'} />
                                                </button>
                                            </div> :
                                            <div className='hot-vote'>
                                                <button className='vote' onClick={() => {
                                                    onClickUpvote(post.id, 1, post.upvoted);
                                                    post.upvote += 1
                                                }}>
                                                    <UpvoteIcon color={'grey'} />
                                                </button>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className='comment'>
                                    <textarea
                                        ref={textarea}
                                        className='comment-textarea'
                                        placeholder='Comment'
                                        onChange={onChangeComment}
                                        required></textarea>
                                    <button onClick={() => { handleClickComment(post.id) }}>Comment</button>
                                </div>
                            </li>
                        )
                        )}
                    </ul>
                </div>}
        </div >
    );
}

export default Home;