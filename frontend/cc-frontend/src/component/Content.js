import './Content.css'
import { Link, Routes, Route } from 'react-router-dom';
import SignIn from './Signin';
import SignUp from './Signup';
import Home from './Home';
import NewPost from './NewPost';
import Profile from './Profile';
import { useEffect, useState } from 'react';
import authService from '../service/auth.service';
import Post from './Post';
import MyConfess from './MyConfess';



const Content = () => {
    const [currentUsername, setCurrentUsername] = useState('');
    // useEffect(async ()=> {
    //     const user = await authService.getCurrentUser();
    //     setCurrentUsername(user.username);
    // })
    return (
        <main>
            <div className='container mt-3'>
                <Routes>
                    <Route path='/sign-in' element={<SignIn />} />
                    <Route path='/sign-up' element={<SignUp />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/post/new' element={<NewPost />} />
                    <Route path='/profile/:username' element={<Profile />} />
                    <Route path='/post/:id' element={<Post />} />
                    <Route path='/post/:username' element={<MyConfess />} />
                </Routes>
            </div>
        </main>

    );
}

export default Content;