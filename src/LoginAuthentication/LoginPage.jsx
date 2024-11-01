import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginPage.css';
import {emailValidator,passwordValidator} from "../Utility/regexValidator";
import SocialLoginComp from "./SocialLoginComp";
import {auth, provider} from "./FirebaseConfig";
import {signInWithPopup } from "firebase/auth";

// for each time show the google accounts in the dialog
provider.setCustomParameters({
    prompt: "select_account"
})

function LoginPage(props) {
    //for navigate
    const navigateToNextPage = useNavigate();
    const {setLoggedInUser} = props;

    //GLogin state
    const [getLoginData, setLoginData] = useState({
        loggedInUsername: "",
        loggedInEmail: "",
        loggedInPhotoUrl: ""
    });

    //input state
    const [input, setInput] = useState({
        username: "",
        password: ""
    })

    //error state
    const [errorMessage1,seterrorMessageEmail] = useState('')
    const [errorMessage2,seterrorMessagePWD] = useState('')

    //success state
    const [successMsg, setSuccessMessage] = useState('')


    const handleChange=(e) => {
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
        if(!emailValidator(input.username)) {
            seterrorMessagePWD("Please Enter your password*")
            return seterrorMessageEmail("Please enter valid username/email*") 
        }

        //for password
        if(!passwordValidator(input.password)) {
            console.log("passwordValidator")
            return seterrorMessagePWD("Please Enter your password*")
        }

        //static credentials to check
        else if (input.username!=="mohamedrizwan3@gmail.com" || input.password!=="Rizwan@123") {
            return seterrorMessagePWD("Invalid password");
        } else {
            storeLoginSuccessAndNavigate()
        }
    }

    // handle Google signIn method
    function googleLogin(isEnable = false) {
        //signInWithRedirect(auth, provider) // alternative for Glogin
        signInWithPopup(auth, provider).then((data) => {
            setLoginData({
                loggedInUsername: data?.user?.displayName,
                loggedInEmail: data?.user?.email,
                loggedInPhotoUrl: data?.user?.photoURL
            })
            storeLoginSuccessAndNavigate()

        }).catch((e) => {
            console.error("signinpopup catch--",e)
        })

    }

    // Stored LoginStatus in localStorage and navigate to home
    const storeLoginSuccessAndNavigate = () => {
        const loginObj = {
            loginSuccess: true,
            loggedInUsername: getLoginData.loggedInUsername || "",
            loggedInEmail: getLoginData.loggedInEmail || input?.username || "",
            loggedInPhotoUrl: getLoginData.loggedInPhotoUrl || ""
        }
        localStorage.setItem("loggedInData", JSON.stringify(loginObj));
        setLoggedInUser(true)
        navigateToNextPage('/home')
        console.log("page navigated and data stored in localStorage")
    }

    
    return(
        
        <div className="cover">
            <u><h2>Login Here</h2></u>
            <p>Sign in & let's get started</p>
            {errorMessage1.length > 0 && (
                <div style={{marginLeft:"-130px",marginBottom:"-20px",color:"red"}}>
                    {errorMessage1}
                </div>
            )}
            <input type="text" className="input" placeholder="Enter your username/email" name="username" onChange={handleChange}/>
            {errorMessage2.length > 0 && (
                <div style={{marginLeft:"-130px",marginBottom:"-20px",color:"red"}}>
                    {errorMessage2}
                </div>
            )}
            <input type="text" className="input" placeholder="Enter your password" name="password"onChange={handleChange}/>
            <button className="login-btn" onClick={loginClicked}>Login</button>
            <p className="text"> or login using</p>

            <SocialLoginComp handleGoogleSignIn={googleLogin}/>
        </div>
        
    )
        
}

export default LoginPage;