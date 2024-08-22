import { React, useState, useEffect } from 'react';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { Link } from 'react-router-dom';
import '../styles/LoginPage.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { SkewLoader } from 'react-spinners';


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
    
        }, 1500)
    
      }, [])


    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text');
        } else {
            setIcon(eyeOff);
            setType('password');
        }
    };

    const logInUser = (event) => {
        event.preventDefault();
        if (email.length === 0 || password.length === 0) {
            alert("Please fill in all fields");
        } else {
            axios.post('https://digitiser.up.railway.app/login', {
                email: email,
                password: password
            })
                .then(function (response) {
                    console.log(response);
                    navigate("/dashboard");
                })
                .catch(function (error) {
                    console.log(error);
                    if (error.response && error.response.status === 401) {
                        alert("Incorrect email or password");
                    } else {
                        alert("An error occurred");
                    }
                });
        }
    };

    return (
        <div className='login-body'>

            {loading? 
                <SkewLoader 
                    color={'rgb(29, 174, 241)'}
                    loading={loading}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"

                /> :

            <div className='login-wrapper'>
                    
                        <h1>
                            <span
                                style={{
                                    position: 'absolute',
                                    left: '25px',
                                    top: '35px',
                                }}>
                                <Link to="/">
                                    <a className='login-back'>◄ Back</a>
                                </Link>
                            </span>
                            Log in to Digitiser

                        </h1>
                    

                <form onSubmit={logInUser}>
                    <div className="login-input-box">
                        <input
                            type='text'
                            placeholder='Email address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="login-input-box">
                        <input
                            type={type}
                            name="password"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                        <span
                            style={{
                                position: 'absolute',
                                right: '20px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                            }}
                            onClick={handleToggle}
                        >
                            <Icon icon={icon} size={25} />
                        </span>
                    </div>

                    <div className="login-remember-forget">
                        <label><input type="checkbox" /> Remember me</label>
                        <a href="#"> Forgot password?</a>
                    </div>

                    <button type='submit'>Log In</button>

                    <div className="login-register">
                        <p>Don't have an account? <Link to="/register">Register</Link></p>
                    </div>
                </form>
            </div>
            }
        </div>
    );
}
