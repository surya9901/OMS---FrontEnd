import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ServerCrash.css';

function ServerCrash() {

    var navigate = useNavigate();
    setTimeout(() => {
        navigate('/Dashboard');
    }, 5000)

    return (
        <div className='container' id='crashContainer'>
            <div>
                <i className="fas fa-exclamation-triangle" style={{ color: 'rgb(243, 164, 61)', fontSize: '200px' }}></i>
            </div>
            <div>
                <h6>Server BreakDown! Kindly retry after sometime or Contact the admin.</h6>
            </div>
        </div>
    )
}

export default ServerCrash