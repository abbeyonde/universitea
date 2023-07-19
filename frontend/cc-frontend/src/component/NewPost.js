import './NewPost.css'
import { useState } from 'react'
import Post from '../service/post.service';
import { useNavigate } from 'react-router-dom';

const NewPost = () => {
    const textarea = document.querySelector('textarea');
    const navigate = useNavigate();
    if (textarea) {
        textarea.addEventListener('keyup', e => {
            textarea.style.height = '63px';
            let scHeight = e.target.scrollHeight;
            textarea.style.height = `${scHeight}px`;
        })
    }

    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');

    const onChangeContent = (e) => {
        const content = e.target.value;
        setContent(content);
    }

    const handleClickPost = () => {
        const user = localStorage.getItem('user');
        const data = {
            content: content,
            accountId: user.id,
            communityId: user.communityId
        }

        Post.newPost(data)
            .then(() => {
                navigate('/home');
                window.location.reload();
            })
            .catch(e => {
                const resMsg = (e.response && e.response.data && e.response.data.message ||
                    e.message ||
                    e.toString());
                alert(resMsg);
                setMessage(resMsg);
            })


    }

    return (
        <div className='body'>
            <div className='wrapper'>
                <h2 className='transparent'>Confession</h2>
                <textarea
                    placeholder='Write your confession here...'
                    onChange={onChangeContent}
                    required></textarea>
                <button className='new-post-btn' onClick={handleClickPost}>Post</button>
            </div>
        </div>
    )
}

export default NewPost;