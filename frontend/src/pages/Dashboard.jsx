import {React, useState, useEffect} from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from "react-router-dom";
import '../styles/Dashboard.css';
import Uploader from '../Components/Uploader';
import Sidebar from '../Components/Sidebar';
import Result from '../Components/Result';
import { SkewLoader } from 'react-spinners';
export default function Dashboard() {

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
    
        }, 1500)
    
      }, [])

    return (
        <div>
            {loading? 
                <div className='dashboard-spinner-container' >
                    <SkewLoader
                        color={'rgb(29, 174, 241)'}
                        loading={loading}
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            :
            
            <div>
                <div className='dashboard-sidebar'>
                    <Sidebar />
                </div>  
                <div className='dashboard-body'>                    
                    <div className='dashboard-uploader'>
                        <Uploader />
                    </div>
                    <div className='dashboard-result'>
                        <Result />
                    </div>
                </div> 
    
            </div>
            }
        </div>
    );
}
