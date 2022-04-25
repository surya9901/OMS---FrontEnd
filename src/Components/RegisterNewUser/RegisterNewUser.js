import React, { useState } from 'react';
import './RegisterNewUser.css';
import { Link, useNavigate } from 'react-router-dom';

function RegisterNewUser() {

  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [mobile, setMobileNumber] = useState('')
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const validateRegister = async (e) => {
    e.preventDefault();
    alert('registered!')
    JSON.stringify(window.localStorage.setItem('email', email))
    JSON.stringify(window.localStorage.setItem('password', password))
    navigate('/');

  }


  return (
    <div className='container text-center' id='RegisterContainer'>
      <div className="registerClose_button">
        <Link to="/" className="badge rounded-pill bg-danger" style={{ textDecoration: 'none' }}>X</Link>
      </div>
      <h4 className="mt-1 mb-3"><u>Register:</u></h4>
      <form onSubmit={validateRegister}>
        <div className="row">
          <div className="col-lg-6">
            <div className="form-floating mb-3">
              <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete="username" placeholder="john" required />
              <label htmlFor="floatingInput">First Name</label>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-floating mb-3">
              <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} autoComplete="username" placeholder="wick" required />
              <label htmlFor="floatingInput">Last Name</label>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-6'>
            <div className="form-floating mb-3">
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="new-email" placeholder="name@example.com" required />
              <label htmlFor="floatingInput">Email address</label>
            </div>
          </div>
          <div className='col-lg-6'>
            <div className="form-floating mb-3">
              <input type="tel" className="form-control" value={mobile} onChange={(e) => setMobileNumber(e.target.value)} autoComplete="tel" placeholder="0123456789" required />
              <label htmlFor="floatingInput">Mobile Number</label>
            </div>
          </div>
        </div>
        <div className="form-floating mb-3">
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" placeholder="******" required />
          <label htmlFor="floatingInput">Password</label>
        </div>
        <div className="form-floating mb-3">
          <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password" placeholder="*****" required />
          <label htmlFor="floatingInput">Confirm Password</label>
        </div>
        <Link to="/" style={{ color: 'black' }}>Already a user? Click Here</Link><br />
        <div className="text-center">
          <button className="btn btn-success mt-3 mb-5" type="submit">Register</button>
        </div>
      </form>
    </div>
  )
}

export default RegisterNewUser