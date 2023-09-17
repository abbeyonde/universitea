import { useEffect, useState } from 'react';
import './Home.css'
import postService from '../service/post.service';
import { useParams, Link } from 'react-router-dom';
import UpvoteIcon from '../icon/UpvoteIcon.jsx';
import DownvoteIcon from '../icon/DownvoteIcon';
import Comment from '../service/comment.service';

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
    }, []);

    const retrieveComments = () => {
        Comment.postComment(id)
            .then(async (res) => {
                const datas = [];
                const data = await res.data;
                for (var i in data) {
                    datas.push(data[i]);
                }
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
                setPost(data);
            })
            .catch((err, res) => {
                res.send(err.message);
            })
    }

    const onClickUpvote = (id, value) => {

        Post.upVote(id, value);
        // const listPosts = posts.map((post) => post.id === id ? { ...post, upvoted: !post.upvoted } : post);
        // setPosts(listPosts);
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
        <div className="post-body">
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