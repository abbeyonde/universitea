import { Link } from 'react-router-dom';
import { Menu, MenuItem, Button} from '@mui/material';
import './Home.css'
import Post from '../service/post.service';
import { useEffect, useState } from 'react';
import Posts from './Post'

const Home = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const [posts, setPosts] = useState([
        {
            id: 1,
            content: "adsadasdasda"
        }
    ]);

    useEffect(() => {
        retrievePosts();
    }, [])

    const onClickMenu = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null)
    }




    const retrievePosts = () => {
        Post.allPost()
            .then(async (res) => {
                const datas = [];
                const data = await res.data;
                for (var i in data) {
                    datas.push(data[i]);
                }
                setPosts(datas);
                console.log(datas);
            })
            .catch(e => {
                console.log(e);
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
                                    <p className='bg-transparent align-left'>{post.content}</p>
                                </div>
                                <div className='tea-score'>
                                    <div className='hot-vote'></div>
                                    <div className='cold-vote'></div>
                                </div>
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