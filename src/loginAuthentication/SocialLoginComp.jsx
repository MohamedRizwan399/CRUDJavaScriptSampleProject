import React from "react";
import { Component } from "react";
import { LOGIN_TOAST_INFO } from "../utility/constants";

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

    handleOtherAction = () => {
        const { otherClick } = this.props;
        otherClick({textContent: LOGIN_TOAST_INFO, type: "info"});
    }

    render() {
        return(
                <div className="alt-login">
                    <div className="facebook" onClick={this.handleOtherAction}></div>
                    <div className="google" onClick={this.handleGoogleLogin}></div>
                    <div className="github" onClick={this.handleOtherAction}></div>
                </div>
        );
    }
}

export default SocialLoginComp;