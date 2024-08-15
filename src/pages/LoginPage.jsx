import {React, useState} from 'react';
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'


const LoginPage = () => {
    const [password, setPassword] = useState("");
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    const handleToggle = () => {
        if (type==='password'){
           setIcon(eye);
           setType('text')
        } else {
           setIcon(eyeOff)
           setType('password')
        }
     }
    return (
        <div>
            <div className = 'wrapper'>
                <form action="">
                    <h1>Log in to Digitiser</h1>

                    <div className="input-box">
                        <input type='text' placeholder='Username'/>

                    </div>

                    <div className="input-box">
                        <input type= {type} name="password"
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

                    <div className="remember-forget">
                        <label><input type="checkbox" />Remember me</label> 
                        <a href="#"> Forgot password?</a>
                    </div>

                    <button type='submit'>Log In</button>

                    <div className="register">
                        <p>Don't have an account? <a href="#">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
