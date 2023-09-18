import { Link } from 'react-router-dom';
// import { Menu, MenuItem, Button } from '@mui/material';
import './Home.css'
import Post from '../service/post.service';
import { useEffect, useState } from 'react';
import UpvoteIcon from '../icon/UpvoteIcon.jsx';
import DownvoteIcon from '../icon/DownvoteIcon';
import Comment from '../service/comment.service';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:8080');

const Home = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const [posts, setPosts] = useState([
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

    useEffect(() => {
        retrievePosts();
        socket.on('new_post_uploaded', () => {
            console.log('new post in')
            retrievePosts();
        })
    }, [socket])

    // const onClickMenu = (e) => {
    //     setAnchorEl(e.currentTarget);
    // }

    // const handleClose = () => {
    //     setAnchorEl(null)
    // }

    const retrievePosts = () => {
        Post.allPost()
            .then(async (res) => {
                const datas = [];
                const data = await res.data;
                for (var i in data) {
                    //check from db user liked the post or not
                    data[i].upvoted = false;
                    data[i].downvoted = false;
                    datas.push(data[i]);
                }
                datas.reverse();
                setPosts(datas);
                console.log(datas);
            })
            .catch(e => {
                console.log(e);
            })
    }

    const onClickUpvote = (id, value) => {

        Post.upVote(id, value);
        const listPosts = posts.map((post) => post.id === id ? { ...post, upvoted: !post.upvoted } : post);
        setPosts(listPosts);
    }
    const onClickDownvote = (id) => {
        Post.downVote(id);
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
        <div>
            <Link to='/post/new' className=''>
                <label className='post-button'>Confess</label>
            </Link>
            <div className="post-body">
                <div className='search-bar'></div>
                {/* <Posts /> */}
                <ul>
                    {posts && posts.map && posts.map((post, index) => (
                        <li className='display-block bg-transparent' key={post.id}>
                            <div className='post'>
                                <div className='img-anon'></div>
                                <div className='post-content bg-transparent align-left'>
                                <Link to={`/post/${post.id}`}>
                                    <p className='bg-transparent align-left'>{post.content}</p>
                                </Link>
                                </div>
                                <div className='tea-score'>
                                    {post.upvoted ?
                                        <div className='hot-vote'>
                                            <button className='vote' onClick={() => { onClickUpvote(post.id, -1) }}>
                                                <UpvoteIcon color={'tomato'} />
                                            </button>
                                        </div> :
                                        <div className='hot-vote'>
                                            <button className='vote' onClick={() => { onClickUpvote(post.id, 1) }}>
                                                <UpvoteIcon color={'grey'} />
                                            </button>
                                        </div>
                                    }
                                    <div className='counter'>
                                        <p>{post.upvote - post.downvote}</p>
                                    </div>
                                    <div className='cold-vote'>
                                        <button className='vote' onClick={() => { onClickDownvote(post.id) }}>
                                            <DownvoteIcon color={'rgb(58, 58, 252)'} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='comment'>
                                <textarea
                                    placeholder='Comment'
                                    onChange={onChangeComment}
                                    required></textarea>
                                <button onClick={() => {handleClickComment(post.id)}}>Comment</button>
                            </div>
                        </li>
                    )
                    )}
                </ul>
            </div>

        </div>
    );
}

export default Home;