import './Content.css'
import { Link, Routes, Route } from 'react-router-dom';
import SignIn from './Signin';
import SignUp from './Signup';
import Home from './Home';
import NewPost from './NewPost';

const Content = () => {
    return (
        <main>
            <div className='container mt-3'>
                <Routes>
                    <Route path='/sign-in' element={<SignIn />} />
                    <Route path='/sign-up' element={<SignUp />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/post/new' element={<NewPost />} />
                </Routes>
            </div>
        </main>
        
    );
}

export default Content;