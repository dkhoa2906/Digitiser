import {React, useState} from 'react';
import { Link } from 'react-router-dom';
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye';
import '../styles/RegisterPage.css';


export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);

    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text');
        } else {
            setIcon(eyeOff);
            setType('password');
        }
    };

    return (
        <div>
            <div className = 'register-wrapper'>
                <form >
                    <h1>Sign up for Digitiser</h1>

                    <div className="register-input-box">
                        <input 
                            type="text"
                            placeholder="Full name"
                            onChange={(e) => setFullName(e.target.value)}
                            required/>
                    </div>

                    <div className="register-input-box">
                        <input 
                            type="email"
                            placeholder="Email address"
                            onChange={(e) => setEmail(e.target.value)}
                            required/>
                    </div>

                    <div className="register-input-box">
                        <input type= {type} name="password"
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"/>
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

                    <button type='submit'>Sign Up</button>

                    <div className="register-login">
                        <p>Already have an account? <Link to="/login">Log in</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}
