import './Home.css'

const Post = () => {
    return (
        <div className='post'>
            <div className='img-anon'></div>
            <div className='post-content'></div>
            <div className='tea-score'>
                <div className='hot-vote'></div>
                <div className='cold-vote'></div>
            </div>
        </div>
    );
}

export default Post;