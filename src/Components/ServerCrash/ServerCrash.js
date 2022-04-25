import React from 'react';
import './ServerCrash.css';

function ServerCrash() {
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