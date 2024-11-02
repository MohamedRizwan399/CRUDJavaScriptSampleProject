import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginPage.css';
import {emailValidator,passwordValidator} from "../utility/regexValidator";
import SocialLoginComp from "./SocialLoginComp";
import {auth, provider} from "./FirebaseConfig";
import {signInWithPopup } from "firebase/auth";
import { toast } from 'react-toastify';
import {LOGIN_TOAST_INFO} from '../utility/constants'

// for each time show the google accounts in the dialog
provider.setCustomParameters({
    prompt: "select_account"
})

function LoginPage(props) {
    //for navigate
    const navigateToNextPage = useNavigate();
    const {setLoggedInUser} = props;
    const [isRegisterClicked, setRegisterClicked] = useState(false);

    //input state
    const [input, setInput] = useState({
        username: "",
        password: ""
    })

    //error state
    const [errorMessage1, seterrorMessageEmail] = useState('')
    const [errorMessage2, seterrorMessagePWD] = useState('')
    const [errorMessage3, seterrorMessageConfirmPWD] = useState('')


    //success state
    const [successMsg, setSuccessMessage] = useState('')


    const handleChange=(e) => {
        console.log("handle change--e.target.name--",e.target.name, "\n e.target.value--",e.target.value)
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    // Login via username/password
    function loginClicked(e) {
        e.preventDefault();
        console.log("typed input", input)
        seterrorMessageEmail('')
        seterrorMessagePWD('')
        const emailvalidate =emailValidator(input.username)
        const pwdvalidate =passwordValidator(input.password)

        console.log("EmailValidate",emailvalidate)
        console.log("pwdValidate",pwdvalidate)

        //for username/email
        if (!emailValidator(input.username)) {
            seterrorMessagePWD("Please Enter your password*")
            return seterrorMessageEmail("Please enter valid username/email*") 
        }

        //for password
        if (!passwordValidator(input.password)) {
            console.log("passwordValidator")
            return seterrorMessagePWD("Please Enter your password*")
        }

        //static credentials to check
        else if (input.username!=="mohamedrizwan3@gmail.com" || input.password!=="Rizwan@123") {
            return seterrorMessagePWD("Password is Invalid. Try again")
        } else {
            storeLoginSuccessAndNavigate()
        }
    }

    // register function
    const registerClicked = () => {

    }

    function navigateToRegister() {
        setRegisterClicked(!isRegisterClicked);
        seterrorMessageEmail("");
        seterrorMessagePWD("");
        seterrorMessageConfirmPWD("");
    }

    // handle Google signIn method
    function googleLogin() {
        //signInWithRedirect(auth, provider) // alternative for Glogin
        signInWithPopup(auth, provider).then((data) => {
            storeLoginSuccessAndNavigate(data?.user)
        }).catch((e) => {
            console.error("signinpopup catch--",e)
        })

    }

    // Stored LoginStatus in localStorage and navigate to home
    const storeLoginSuccessAndNavigate = (user) => {
        const loginObj = {
            loginSuccess: true,
            loggedInUsername: user?.displayName || "",
            loggedInEmail: user?.email || input?.username || "",
            loggedInPhotoUrl: user?.photoURL || ""
        }
        localStorage.setItem("loggedInData", JSON.stringify(loginObj));
        setLoggedInUser(true)
        navigateToNextPage('/home')
    }

    // To show toast
    function notifyToast() {
        toast.info(LOGIN_TOAST_INFO);
        return;
    }    

    
    return(
        
        <div className="cover">
            <u><h2>{isRegisterClicked ?  "Register Here " : "Login Here "}</h2></u>
            <p>{!isRegisterClicked ? "Sign in" : "Register here"} & let's get started</p>
            {errorMessage1.length > 0 && (
                <div className="error1" style={{marginLeft:"-130px", marginBottom:"-20px", color:"red"}}>
                    {errorMessage1}
                </div>
            )}
            <input type="text" className="input" placeholder="Enter your username/email" name="username" onChange={handleChange}/>
            {errorMessage2.length > 0 && (
                <div className="error2"> 
                    {errorMessage2}
                </div>
            )}
            <input type="text" className="input" placeholder="Enter your password" name="password"onChange={handleChange}/>

            {errorMessage3.length > 0 && (
                <div className="error3" style={{marginLeft:"-130px", marginBottom:"-20px", color:"red"}}>
                    {errorMessage3}
                </div>
            )}
            {isRegisterClicked && 
                <input type="text" className="input" placeholder="Confirm password" name="password"onChange={handleChange}/>
            }

            {!isRegisterClicked ? (<button className="login-btn" onClick={loginClicked}>Login</button> 
                ) : <button className="register-btn" onClick={registerClicked}>Register</button>
            }
            <div className="haveAnAcc">
                {!isRegisterClicked ?  "Don't have an account ? " : "Already have an account ? "}
                <button className="nav-registerlogin-btn" onClick={navigateToRegister}>
                    {isRegisterClicked ? "Login here" : "Register here"}</button>
            </div>

            <p className="text"> or login using</p>

            <SocialLoginComp handleGoogleSignIn={googleLogin} otherClick={notifyToast}/>
        </div>
        
    )
        
}

export default LoginPage;