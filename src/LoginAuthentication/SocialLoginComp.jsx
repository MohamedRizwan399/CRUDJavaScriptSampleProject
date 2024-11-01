import React from "react";
import { Component } from "react";

class SocialLoginComp extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isGLoginClicked: false
        }
    }


    handleGoogleLogin = () => {
        const {handleGoogleSignIn} = this.props
        this.setState({isGLoginClicked: !this.state.isGLoginClicked},
            () => handleGoogleSignIn(this.state.isGLoginClicked)
        )
    }

    render() {
        return(
                <div className="alt-login">
                    <div className="facebook"></div>
                    <div className="google" onClick={this.handleGoogleLogin}></div>
                    <div className="github"></div>
                </div>
        );
    }
}

export default SocialLoginComp;