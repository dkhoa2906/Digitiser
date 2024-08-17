import {React, useState} from 'react';
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'



const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");

     

    return (
        <div>
            <div className = 'wrapper'>
                <form >
                    <h1>Sign up for Digitiser</h1>

                    <div className="input-box">
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="First name"
                            onChange={(e) => setFname(e.target.value)}
                            required/>
                    </div>

                    <div className="input-box">
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Last name"
                            onChange={(e) => setLname(e.target.value)}/>
                    </div>

                    <div className="input-box">
                        <input 
                            type="email"
                            className="form-control"
                            placeholder="Email address"
                            onChange={(e) => setEmail(e.target.value)}
                            required/>
                    </div>

                    <div className="input-box">
                        <input type= "password" name="password"
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"/>
                    </div>

                    <button type='submit'>Sign Up</button>

                    <div className="register">
                        <p>Already have an account? <a href="#">Log in</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage

