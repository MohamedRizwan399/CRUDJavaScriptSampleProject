import { useEffect } from "react";
import React from "react";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import './GoogleLogin.css';

function GoogleLogin() {
    const google = window.google;

    const [user,setUser]=useState({});

    //
    function handleCallbackResponse(response){
        console.log("Encoded JWT ID token:"+response.credential);
        var userObject=jwt_decode(response.credential);
        console.log("After Decode:"+JSON.stringify(userObject));
        setUser(userObject);

        document.getElementById("signInDiv").hidden=true;
        console.log(user.name)
    }


    //
    function handleSignOut(event){
       let alert= window.confirm("Are you want to logout?")
       if(alert){
        setUser({});
        document.getElementById("signInDiv").hidden=false;
       }

    }

    useEffect(()=>{
        //its global google and its from client
        google.accounts.id.initialize({
            client_id:"375227420820-mn72656fvcmuc1rogk4d2ad8kepjqfkl.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {
                theme:"filled_blue",
                size:"large",
                shape:"pill",
                width: "350.043",
                type:"standard",
                logo_alignment: "left",
                display:"flex"    
            }
        );
    },[]);

    //if no user ,shown signIn button, else Logout button

    return(
        <div className="GoogleLogin">
            <div className="signInDiv" id="signInDiv"></div>
            {Object.keys(user).length ==0 &&
                
            <button onClick={(e)=>handleSignOut(e)}>SIGN OUT</button>
            
            }
           
            {user &&
            <div>
                <img src={user.picture}></img>
                <h1>{user.name}</h1>
                <h3>{user.email}</h3>

            </div>
            }
            
            
        </div>
    );

}
export default GoogleLogin;