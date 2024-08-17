import React, { } from "react";
import {Link} from "react-router-dom";
import '../styles/LandingPage.css'; 

export default function LandingPage() {
    return (
        <div>
            <div className='wrapper'>
                    <h1>Welcome to Digitiser</h1>
                    <h2>An Automated Digitization System <br/> for Vietnam Birth Certificates.</h2>

                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                        </div>
        </div>
    );
}