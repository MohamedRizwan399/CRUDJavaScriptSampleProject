import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginPage.css';
import {emailValidator,passwordValidator} from "../utility/regexValidator";
import SocialLoginComp from "./SocialLoginComp";
import { toast } from 'react-toastify';
import {auth, provider} from "./firebase/FirebaseConfig";
import {signInWithPopup } from "firebase/auth";
import {handleCreateUserWithEmailAndPassword, handleSignInWithEmailAndPassword} from './firebase/LoginAuthCreation';
import ClipLoader from 'react-spinners/ClipLoader';
import Popup from "../popup/Popup";

// for each time show the google accounts in the dialog
provider.setCustomParameters({
    prompt: "select_account"
})

/**
 * Register and Login are handled in this component using hooks concepts
 */

function LoginPage(props) {
    //for navigate
    const navigateToNextPage = useNavigate();
    const {setLoggedInUser} = props;
    const [isLoading, setIsLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [isRegisterClicked, setRegisterClicked] = useState(false);
    const isReadInfoOnce = localStorage.getItem('isInfoRead') || false;

    //password requirement
    const [isPwdFeedbackHint, setPwdFeedbackHint] = useState(null);

    //input state
    const [input, setInput] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    })

    const inputUsernameRef = useRef(null);
    const inputPasswordRef = useRef(null);

    //error state
    const [errorMessageEmail, seterrorMessageEmail] = useState('')
    const [errorMessagePassword, seterrorMessagePWD] = useState('')
    const [errorMessageConfPassword, seterrorMessageConfirmPWD] = useState('')

    const handleChange=(e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        seterrorMessageEmail('');
        seterrorMessagePWD('');
        seterrorMessageConfirmPWD('');
    }

    const handleFocus = (fieldName = "") => {
        if (fieldName === "password") {
            setPwdFeedbackHint(handlePasswordErrorFeedback());
        }
    }

    const handleBlur = () => {
        setPwdFeedbackHint(null);
    }

    //Handle password validation to show error text
    const handlePasswordErrorFeedback = useCallback(() => {
        if (input.password.length < 1) {
            return null;
        }
        return (
                <div className="password-dialog">
                    <p>Password must meet the following requirements:</p>
                    <ul>
                        <li style={{ color: input.password.length >= 8 ? "green" : "red" }}>At least 8 characters</li>
                        <li style={{ color: /[A-Z]/.test(input.password) ? "green" : "red" }}>At least one uppercase letter</li>
                        <li style={{ color: /[a-z]/.test(input.password) ? "green" : "red" }}>At least one lowercase letter</li>
                        <li style={{ color: /\d/.test(input.password) ? "green" : "red" }}>At least one number</li>
                    </ul>
                    <div>
                        {passwordValidator(input.password) ? 
                            <h3 style={{ color: 'green' }}>Password is valid</h3> : <h3 style={{ color: 'red' }}>Password is not valid</h3>
                        }
                    </div>
                </div>
        )    
    }, [input.password]);

    useEffect(() => {
        setPwdFeedbackHint(handlePasswordErrorFeedback());
    }, [input.password, handlePasswordErrorFeedback])


    // For show the popup initially
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 1500)

        return () => clearTimeout(timer);
    }, [])


    // Login via username/password
    async function loginClicked(e) {
        e.preventDefault();
        seterrorMessageEmail('');
        seterrorMessagePWD('');

        //validate username/email and password
        const isValidated = handleValidationForUserInput(input.username, input.password);
        if (!isValidated) return;

        try {
            setIsLoading(true);
            const signInwithUsername = await handleSignInWithEmailAndPassword(input.username, input.password);
            if(signInwithUsername?.success) {
                const userObj = {
                    loginUsernamePwdSuccess: signInwithUsername?.success,
                    displayName: input.username.slice(0,7) + "...",
                    email: input.username
                }
                storeLoginSuccessAndNavigate(userObj);
            } else {
                notifyToast({
                    textContent: signInwithUsername?.data?.code + " Check your login credential and try again",
                    type: "error"
                })
            }
            
        } catch(e) {
            console.log("catch error login--",e)
        } finally {
            setIsLoading(false);
        }
    }

    // Register via username/password
    const registerClicked = async () => {
        // validate username/email and password
        const isValidated = handleValidationForUserInput(input.username, input.password);
        if (!isValidated) return;

        // validate password & confirm password
        if (input.confirmPassword !== input.password) {
            return seterrorMessageConfirmPWD("Confirm password should match with your password")
        }

        try {
            setIsLoading(true);
            const registerWithUsername = await handleCreateUserWithEmailAndPassword(input.username, input.password);
            if (registerWithUsername?.success) {
                notifyToast({
                    textContent: "Registered successful!! Use your credentials to Login here!!",
                    type: "info"
                })
            } else {
                notifyToast({textContent: registerWithUsername?.data?.code, type: "error"})
            }
            navigateToRegister_Login();
        } catch(e) {
            console.log("catch error register--",e)
        } finally {
            setIsLoading(false);
        }
    }

    //handle validation for username/email and password based on input
    function handleValidationForUserInput(username, password) {
        if (!emailValidator(username)) {
            seterrorMessageEmail("Please Enter valid username/email format*");
            return false;
        }

        if (!passwordValidator(password)) {
            seterrorMessagePWD("Please Enter your password*");
            return false;
        }
        return true;
    }

    // handle navigate from Register to Login and viceversa using state change
    function navigateToRegister_Login() {
        inputUsernameRef.current.value = "";
        inputPasswordRef.current.value = "";
        setRegisterClicked(!isRegisterClicked);
        seterrorMessageEmail("");
        seterrorMessagePWD("");
        seterrorMessageConfirmPWD("");
    }

    // handle Google signIn method
    function googleLogin() {
        //signInWithRedirect(auth, provider) // alternative for Glogin
        signInWithPopup(auth, provider).then((data) => {
            storeLoginSuccessAndNavigate(data?.user);
        }).catch((e) => {
            console.error("signinpopup catch--", e);
        })
    }

    // Stored LoginStatus in localStorage and navigate to home
    const storeLoginSuccessAndNavigate = (user) => {
        const loginObj = {
            loginSuccess: true,
            loggedInType: user?.loginUsernamePwdSuccess ? "usernamePwd" : "socialLogin", 
            loggedInUsername: user?.displayName || "",
            loggedInEmail: user?.email || input?.username || "",
            loggedInPhotoUrl: user?.photoURL || ""
        }
        localStorage.setItem("loggedInData", JSON.stringify(loginObj));
        setLoggedInUser(true);
        navigateToNextPage('/home');
    }

    // To show toast
    function notifyToast({textContent, type}) {
        if (type === "error") {
            toast.error(textContent)
        } else if(type === "info") {
            toast.info(textContent);
        }
        return;
    }

    const closePopupInfo = (isRead = false) => {
        if(isRead) {
            setShowPopup(false);
            localStorage.setItem('isInfoRead', true);
        }
    }
    
    return(
        
        <div className="cover">
            {/* Popup shown initially */}
            {showPopup && !isReadInfoOnce  && (<Popup setClosePopup={closePopupInfo}/>)}

            <u><h2>{isRegisterClicked ?  "Register Here " : "Login Here "}</h2></u>
            <p>{!isRegisterClicked ? "Sign in" : "Register here"} & let's get started</p>
            {errorMessageEmail.length > 0 && (<div className="error1">{errorMessageEmail}</div>)}
            <input 
                type="text" 
                className="input" 
                placeholder="Enter your username/email" 
                name="username" 
                onChange={handleChange} 
                ref={inputUsernameRef}
                onFocus={() => handleFocus("username")}
                onBlur={handleBlur}
            />

            {errorMessagePassword.length > 0 && (<div className="error2">{errorMessagePassword}</div>)}
            <input 
                type="text" 
                className="input" 
                placeholder="Enter your password" 
                name="password" 
                onChange={handleChange} 
                ref={inputPasswordRef}
                onFocus={() => handleFocus("password")}
                onBlur={handleBlur}
            />

            {errorMessageConfPassword.length > 0 && (<div className="error3" style={{marginLeft:"-130px", marginBottom:"-20px", color:"red"}}>
                {errorMessageConfPassword}</div>
            )}
            {isRegisterClicked && 
                <input 
                    type="text" 
                    className="input" 
                    placeholder="Confirm password" 
                    name="confirmPassword" 
                    onChange={handleChange}
                    onFocus={() => handleFocus("confirmPassword")}
                    onBlur={handleBlur}
                />
            }

            {!isRegisterClicked ? (<button className="login-btn" onClick={loginClicked}>Login</button> 
                ) : <button className="register-btn" onClick={registerClicked}>Register</button>
            }
            <div className="haveAnAcc">
                {!isRegisterClicked ?  "Don't have an account ? " : "Already have an account ? "}
                <button className="nav-registerlogin-btn" onClick={navigateToRegister_Login}>
                    {isRegisterClicked ? "Login here" : "Register here"}</button>
            </div>

            <p className="text"> or login using</p>

            <SocialLoginComp handleGoogleSignIn={googleLogin} otherClick={notifyToast}/>

            {/* Password hint feedback dialog */}
            {isPwdFeedbackHint}

            {/* Loader */}
            {isLoading && <div className="loader">
                <ClipLoader color="#09f" loading={isLoading} size={50} /></div>
            }
        </div>
        
    )
}

export default LoginPage;