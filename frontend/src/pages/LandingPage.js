import React, { } from "react";

import {Link} from "react-router-dom";

export default function LandingPage() {
    return (
        <div>
            <div className="landing-page">
                <div className="landing-page-content">
                    <h1>Welcome to Digitiser</h1>
                    <p>
                        Digitiser is a web application that allows you to digitize your documents.
                    </p>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}