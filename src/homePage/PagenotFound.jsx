import React from "react";
import { Link, useNavigate } from "react-router-dom";

function PagenotFound() {
    const navigate = useNavigate();

    const handleBackNavigate = () => {
        navigate(-1); //Go to previous page
    }

    return(
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>404!! PAGE NOT FOUND</h1> <Link onClick={handleBackNavigate}>Click here to go back</Link>
        </div>
    );
}

export default PagenotFound;