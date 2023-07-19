import { Link } from 'react-router-dom';
import './Home.css'
import Post from './Post';

const Home = () => {
    return (
        <div>
            <Link to='/post/new'className=''>
                <label className='post-button'>Confess</label>
            </Link>
            <div className="post-body">
                <div className='search-bar'></div>
                <div className='post'>
                    <div className='img-anon'></div>
                    <div className='post-content'></div>
                    <div className='tea-score'>
                        <div className='hot-vote'></div>
                        <div className='cold-vote'></div>
                    </div>
                </div>
                <Post />
            </div>

        </div>
    );
}

export default Home;