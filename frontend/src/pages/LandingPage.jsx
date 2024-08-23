import {React, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import '../styles/LandingPage.css'; 
import { SkewLoader } from 'react-spinners';

export default function LandingPage() {

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
    
        }, 1500)
    
      }, [])

    return (
        <div className='landing-body'>

            {loading? 
            <SkewLoader 
                color={'rgb(29, 174, 241)'}
                loading={loading}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"

            /> :
        
            
                <div >
                    <div className='landing-wrapper'>
                            <h1>Welcome to Digitiser</h1>
                            <h2>An Automated Digitization System <br/> for Vietnam Birth Certificates.</h2>

                            <Link to="/login">
                                <button>Continue</button>
                            </Link>
                                </div>
                </div>
            }
        </div>
    );
}