import { Link } from "react-router-dom";
import SignUp from "./Signup";
import SignIn from "./Signin";
import { useState } from "react";
import './LandingPage.css'

const LandingPage = () => {
    const [signup, setSignUp] = useState(false);
    const [signin, setSignIn] = useState(false);
    
    const onClickSignUp = () => {
        setSignUp(true)
    }
    return (

        <div className="container-lp">
            <div className="logo">
                <Link to='/'><h1>universiTea</h1></Link>
            </div>
            <div className="in-container">
                <div className="desc">
                    <h2>Share with us</h2>
                    <p>A forum where you can share your thoughts</p>
                    <p>Confess your feelings and read about others.</p>
                    <h3><b>Do it here anonymously</b></h3>
                </div>
                <div className="sign-button">
                    {/* <div>
                    <label>Don't have an account yet?</label>
                    <a href="#signup-popup">Sign Up</a>
                    <div id="signup-popup" className="popup">
                    <div className="content">
                    <a href="/">x</a>
                    <SignUp />
                    </div>
                    </div>
                </div> */}
                    <div className="signup-el">
                        <button onClick={() => { setSignUp(true) }}>Sign Up</button>
                        {signup ?
                            <div className="popup">
                                <SignUp />
                            </div>
                            :
                            <div></div>
                        }

                    </div>
                    <div className="signin-el">
                        <p>Already have an account?</p>
                        <button onClick={() => { setSignIn(true) }}>Sign In</button>
                        {signin ?
                            <div className="popup">
                                <SignIn />
                            </div>
                            :
                            <div></div>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;