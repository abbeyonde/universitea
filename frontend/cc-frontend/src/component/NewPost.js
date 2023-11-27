import './NewPost.css'
import { useState } from 'react'
import Post from '../service/post.service';
import { useNavigate } from 'react-router-dom';
// import socket from '../service/ws.service';
import socket from '../socket';


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

    const handleClickPost = async () => {
        const user = await JSON.parse(sessionStorage.getItem('user'));
        const data = {
            content: content,
            accountId: user.id,
            communityId: user.communityId
        }
        console.log(data);

        Post.newPost(data)
            .then(() => {
                alert("Your confession has been uploaded")
                navigate('/home');
                socket.emit('new_post');
                // window.location.reload();
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
                <button className='new-post-btn' onClick={handleClickPost}>Spill</button>
            </div>
        </div>
    )
}

export default NewPost;