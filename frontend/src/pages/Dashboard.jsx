import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import Uploader from '../Components/Uploader';
import Sidebar from '../Components/Sidebar';
import Result from '../Components/Result';
import { SkewLoader } from 'react-spinners';

export default function Dashboard() {
    const [loading, setLoading] = useState(false);
    const [apiData, setApiData] = useState(''); // State to hold API response

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);

    // Function to clear apiData
    const clearApiData = () => {
        setApiData('');
    };

    return (
        <div>
            {loading ? 
                <div className='dashboard-spinner-container'>
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
                            <Uploader setApiData={setApiData} clearApiData={clearApiData} />
                        </div>
                        <div className='dashboard-result'>
                            <Result data={apiData} />
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
