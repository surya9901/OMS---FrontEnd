import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import env from '../setting'
import { toastsuccess } from '../utils';
import Toastoptions from '../ToastOptions';
import { Modal } from 'react-bootstrap';
import Loader from '../Loader/Loader';

function PickerView() {
    const navigate = useNavigate();
    var param = useParams();
    const [pickerSalesOrder, setPickerSalesOrder] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false); }
    const handleShow = () => setShow(true);
    const [downLink, setDownloadLink] = useState('');
    const [loading, setLoading] = useState(true);


    const fetchData = () => {
        let orderDetails = JSON.parse(window.localStorage.getItem('pickerSalesOrders'));
        var fetchData = orderDetails.filter(data => {
            return data.salesOrderId == param.id
        })
        var pushFilterData = [];
        fetchData[0].itemDetailList.map(data => {
            if (data.status.toString() === 'true') {
                pushFilterData.push(data);
            }
        })
        window.localStorage.setItem('verifyData', JSON.stringify(pushFilterData))
        setPickerSalesOrder([...fetchData])
        setLoading(false)
    }
    useEffect(() => {
        fetchData()
    }, [])

    var selectedverData = [];
    const [enable, setEnable] = useState(false);
    const handleCheck = (e, data) => {
        if (e.target.checked === true) {
            selectedverData.push(data);
            if (JSON.parse(window.localStorage.getItem('verifyData')).length === selectedverData.length) {
                setEnable(true);
            } else {
                setEnable(false);
            }
        } else {
            setEnable(false);
        }
    }

    const handlePickUp = async () => {
        try {
            setLoading(true)
            let data = JSON.parse(window.localStorage.getItem('verifyData'))
            data.map((data => {
                delete data.category;
                delete data.status;
            }))
            let postData = {
                'salesOrderId': parseInt(param.id),
                itemDetailList: data

            }
            let email = JSON.parse(window.localStorage.getItem('email'))
            await axios.post(`${env.api}/save-invoice?pickerPhone=${email}`, postData, {
                headers: {
                    'X-Auth-Token': "Z29mcnVnYWxoYWNrYXRob24="
                }
            })
            var phone = JSON.parse(window.localStorage.getItem('custPhone'))
            var InvoiceLink = await axios.get(`http://integration-qa.gofrugalretail.com/Alert/whatsapp/exclusife/getInvoiceDetails?orderNo=${phone}`)
            setDownloadLink(InvoiceLink.data);
            setLoading(false)
            handleShow();
        } catch (error) {
            console.log(error);
            navigate('/Crash')
        }
    }

    const handlerouteChange = () => {
        handleClose()
        toastsuccess()
        setTimeout(() => {
            navigate('/PickerSalesOrder')
        }, 1500)
    }

    return (
        <>
            <Toastoptions />
            <Navbar />
            <div className='container mb-3'>
                {
                    loading ? <Loader /> :
                        <div className="card mt-3">
                            <div className="card-body">
                                {
                                    pickerSalesOrder.map(data => {

                                        return (
                                            <div className='container mb-3' style={{ border: 'solid grey 1px', padding: '10px' }}>
                                                <h6 className='text-center' style={{ fontSize: '12px' }}>Order #{data.salesOrderId}</h6>
                                                <hr />
                                                <p style={{ fontSize: '12px', fontWeight: 'bold' }}>Item Details</p>
                                                {
                                                    data.itemDetailList.map((data, index) => {
                                                        return (
                                                            <div>
                                                                {data.status ? '' : <p style={{ color: 'red' }}>No required Quantity</p>}
                                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                    <p style={{ fontSize: '12px', fontWeight: 'bold' }}>Item {index + 1}</p>
                                                                    <input type='checkbox' onClick={(e) => handleCheck(e, data)} disabled={!data.status ? true : false} />
                                                                </div>
                                                                <p style={{ fontSize: '12px' }}>Item Sku Code: {data.itemSkuCode}</p>
                                                                <p style={{ fontSize: '12px' }}>Item Name: {data.itemName}</p>
                                                                <p style={{ fontSize: '12px' }}>Category: {data.category}</p>
                                                                <div>
                                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                        <p style={{ fontSize: '12px' }}>Rack Name: {data.rackName}</p>
                                                                        <p style={{ fontSize: '12px' }}>Row No: {data.rowNo}</p>
                                                                    </div>
                                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                        <p style={{ fontSize: '12px' }}>Item Stock: {data.itemStock}</p>
                                                                        <p style={{ fontSize: '12px' }}>Quatity: {data.quantity}</p>
                                                                    </div>

                                                                </div>
                                                                <hr />
                                                            </div>
                                                        )
                                                    })
                                                }
                                                <div className='text-center'>
                                                    <button className='btn' style={{ backgroundColor: '#06113C', color: 'white', fontSize: '12px' }} onClick={handlePickUp} disabled={enable ? false : true}>
                                                        Pick Up
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                }
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Download Invoice</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <a className='text-center' href={downLink} onClick={handlerouteChange}>Click to Download!</a>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>

    )
}

export default PickerView