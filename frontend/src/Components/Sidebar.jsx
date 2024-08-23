import {React, useState} from 'react';
import '../styles/Sidebar.css';
import { BiLogOut } from "react-icons/bi";
import { Link } from 'react-router-dom';


export default function Sidebar() {
    return (
        <div>  
            <div >
                <button className='sidebar-brand'>
                    <h1>Digitiser</h1>
                </button>
            </div>               

            <div>
                <button className='sidebar-conmeo'> Birth Certificate </button>

                <button className='sidebar-concho'> Driver's license </button>
                
                <button className='sidebar-conga'> Identity Card </button>
            </div>  

            <div>
                <Link to="/login">
                    <button className='sidebar-logout'><BiLogOut className='sidebar-icon'/> Log out</button>
                </Link>
            </div>                
        </div>

    );
}
