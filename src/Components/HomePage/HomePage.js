import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './gofrugal_logo.png'
import { toastmismatch } from '../utils';
import Toastoptions from '../ToastOptions';

function HomePage() {

    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    var validateLogin = (e) => {
        e.preventDefault();
        if ('admin@gft.com' === email.toString() && '12345' === password.toString()) {
            window.localStorage.setItem('isAdmin', true)
            window.localStorage.setItem('email', email)
            setEmail('');
            setPassword('');
            navigate('/Dashboard')
        } else if ('12345' === password.toString()) {
            window.localStorage.setItem('isPicker', true)
            window.localStorage.setItem('email', email)
            navigate('/PickerSalesOrder')
        } else {
            toastmismatch();
        }
    }
    return (
        <>
            <Toastoptions />
            <div className='container mt-5' style={{ top: '10vh', position: 'relative' }}>
                <div className='row'>
                    <div className='col-lg-9 mb-3'>
                        <div className='title' id='homeTitle'>
                            <h1>Order Management System</h1>
                            <div className='col col-lg-9 mt-5'>
                                <img className='warehouseGif' src={logo} alt='wait untill page loads' style={{ width: '300px' }} />
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3'>
                        <div className='Login text-center mt-4' id='homeLogin'>
                            <form onSubmit={validateLogin}>
                                <div className="form-floating mb-3">
                                    <input type="alphanum" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="floatingInput" placeholder="name@example.com" />
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="floatingPassword" placeholder="Password" autoComplete='on' />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                                <div className='toRegister mb-3'>
                                    <Link to="/RegisterNewUser" style={{ color: 'black' }}>New User? Click Here</Link>
                                </div>
                                <div className='mb-3'>
                                    <button type="submit" className="btn" style={{ backgroundColor: '#FF8C32' }}>Log In</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage