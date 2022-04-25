import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Offcanvas } from 'react-bootstrap'
import './Navbar.css'

function Navbar() {

    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showDrop, setShowDrop] = useState(false);
    const dropShow = () => setShowDrop(!showDrop);

    const [rackDropdown, setRackDropdown] = useState(false);

    const [stockDrop, setStockDrop] = useState(false);
    const stockDropDown = () => setStockDrop(!stockDrop)

    const toggleLogOut = () => {
        window.localStorage.clear();
        navigate('/');
    }
    // if (!window.localStorage.getItem("isAdmin" || !window.localStorage.getItem("isPicker"))) {
    //     navigate('/');
    // }

    return (
        <>
            {
                window.localStorage.getItem('isAdmin') ?
                    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#06113C', borderBottom: 'solid #DA1212 2px' }}>
                        <div className="container-fluid">
                            <div>
                                <button className='btn' onClick={handleShow}>
                                    <i className="fa fa-bars" aria-hidden="true" style={{ color: 'white' }} />
                                </button>&nbsp;&nbsp;&nbsp;
                                <NavLink active className="navbar-brand" to="/Dashboard">OMS <small style={{ fontSize: '10px' }}>-A Gofrugal's Product</small></NavLink>
                            </div>
                            <div>
                                {/* Empty Div for dividing the space equally*/}
                            </div>
                            <div className="dropdown">
                                <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ color: 'white', fontSize: '15px' }} onClick={dropShow}>
                                    Hi, {localStorage.getItem('email')}
                                </button>
                                <div className={`dropdown-menu ${showDrop ? 'show' : ''}`} aria-labelledby="dropdownMenuButton" style={{ backgroundColor: '#FAF5E4' }}>
                                    <a active className="dropdown-item" href="https://www.gofrugal.com/assure-support.html" target='blank' onClick={dropShow}>Need Help!</a>
                                    <button active className="dropdown-item" onClick={toggleLogOut}>Log Out</button>
                                </div>
                            </div>
                        </div>
                    </nav> : <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#06113C', borderBottom: 'solid #DA1212 2px' }}>
                        <div className="container-fluid">
                            <div>
                                <button className='btn' onClick={handleShow}>
                                    <i className="fa fa-bars" aria-hidden="true" style={{ color: 'white' }} />
                                </button>&nbsp;&nbsp;&nbsp;
                                <NavLink active className="navbar-brand" to="/PickerSalesOrder">OMS <small style={{ fontSize: '10px' }}>-A Gofrugal's Product</small></NavLink>
                            </div>
                            <div>
                                {/* Empty Div for dividing the space equally*/}
                            </div>
                            <div className="dropdown">
                                <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ color: 'white', fontSize: '15px' }} onClick={dropShow}>
                                    Hi, {localStorage.getItem('email')}
                                </button>
                                <div className={`dropdown-menu ${showDrop ? 'show' : ''}`} aria-labelledby="dropdownMenuButton" style={{ backgroundColor: '#FAF5E4' }}>
                                    <a active className="dropdown-item" href="https://www.gofrugal.com/assure-support.html" target='blank' onClick={dropShow}>Need Help!</a>
                                    <button active className="dropdown-item" onClick={toggleLogOut}>Log Out</button>
                                </div>
                            </div>
                        </div>
                    </nav>
            }
            <Offcanvas id='sidePane' show={show} onHide={handleClose} style={{ backgroundColor: '#06113C', color: 'white' }}>
                <div style={{ padding: '10px 15px', marginBottom: '0px', color: 'white', fontSize: '25px' }}>
                    <p>OMS<small style={{ fontSize: '10px' }}>&nbsp; -A Gofrugal's Product</small></p>
                </div>
                <Offcanvas.Header style={{ marginTop: '-30px', color: 'white' }} closeButton>
                    <Offcanvas.Title style={{ color: 'white' }}>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <hr style={{ margin: '0 10px' }} />
                <Offcanvas.Body style={{ margin: '0' }}>
                    {
                        window.localStorage.getItem('isPicker') ?
                            <ul style={{ listStyleType: 'none' }}>
                                <li style={{ margin: '20px 0' }}>
                                    <NavLink active style={{ textDecoration: 'none', color: 'white' }} to="/PickerSalesOrder" onClick={handleClose}>
                                        <i className="fas fa-money-bill" aria-hidden="true" style={{ color: 'white', fontSize: '20px' }}></i>&nbsp;&nbsp;&nbsp;
                                        Sales Order
                                    </NavLink>
                                </li>
                            </ul> : <ul style={{ listStyleType: 'none' }}>
                                <li style={{ margin: '20px 0' }}>
                                    <NavLink active style={{ textDecoration: 'none', color: 'white' }} to="/Dashboard" onClick={handleClose}>
                                        <i className="fa fa-pie-chart" aria-hidden="true" style={{ color: 'white', fontSize: '20px' }}></i>&nbsp;&nbsp;&nbsp;
                                        Dashboard
                                    </NavLink>
                                </li>
                                <li style={{ margin: '20px 0px' }}>
                                    <NavLink active style={{ textDecoration: 'none', color: 'white' }} to="/RackCategory" onClick={handleClose}>
                                        <i className="fa fa-th" aria-hidden="true" style={{ color: 'white', fontSize: '20px' }}></i>&nbsp;&nbsp;&nbsp;&nbsp;
                                        Rack
                                    </NavLink>
                                </li>
                                <li style={{ margin: '20px -10px' }}>
                                    <button active className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ textDecoration: 'none', color: 'white' }} onClick={stockDropDown}>
                                        <i className="fa fa-cubes" aria-hidden="true" style={{ color: 'white', fontSize: '20px' }}></i>&nbsp;&nbsp;&nbsp;
                                        Stock
                                    </button>
                                    <div className="dropdown">
                                        <div className={`dropdown-menu ${stockDrop ? 'show' : ''}`} aria-labelledby="dropdownMenuButton" style={{ backgroundColor: '#FAF5E4' }}>
                                            <NavLink active to="/StockDetails" className="dropdown-item" onClick={stockDropDown}>Item vs Category&Rack</NavLink>
                                            <NavLink active to="/MappedStock" className="dropdown-item" onClick={stockDropDown}>Mapped Item</NavLink>
                                        </div>
                                    </div>
                                </li>
                                <li style={{ margin: '20px 0' }}>
                                    <NavLink active style={{ textDecoration: 'none', color: 'white' }} to="/SalesOrder" onClick={handleClose}>
                                        <i className="fas fa-money-bill" aria-hidden="true" style={{ color: 'white', fontSize: '20px' }}></i>&nbsp;&nbsp;&nbsp;
                                        Sales Order
                                    </NavLink>
                                </li>
                                <li style={{ margin: '20px 0' }}>

                                    <NavLink active style={{ textDecoration: 'none', color: 'white' }} to="/Picker" onClick={handleClose}>
                                        <i className="fas fa-truck-loading" aria-hidden="true" style={{ color: 'white', fontSize: '18px' }}></i>&nbsp;&nbsp;&nbsp;
                                        Picker
                                    </NavLink>
                                </li>
                            </ul>
                    }
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Navbar