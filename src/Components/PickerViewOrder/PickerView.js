import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import env from '../setting'

function PickerView() {

    var param = useParams();
    const [pickerSalesOrder, setPickerSalesOrder] = useState([]);

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
            let data = JSON.parse(window.localStorage.getItem('verifyData'))
            data.map((data => {
                delete data.category;
                delete data.status;
            }))
            let postData = [{
                'salesOrderId': param.id,
                itemDetailList: data

            }]
            await axios.post(`${env.api}/save-invoice?pickerPhone=1234`, postData, {
                headers: {
                    'X-Auth-Token': "Z29mcnVnYWxoYWNrYXRob24="
                }
            })
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <Navbar />
            <div className='container mb-3'>
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
                                                            <input type='checkbox' onClick={(e) => handleCheck(e, data)} disabled={data.status ? false : true} />
                                                        </div>
                                                        <p style={{ fontSize: '12px' }}>Item Sku Code: {data.itemSkuCode}</p>
                                                        <p style={{ fontSize: '12px' }}>Item Name: {data.itemName}</p>
                                                        <div>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                <p style={{ fontSize: '12px' }}>Item Stock: {data.itemStock}</p>
                                                                <p style={{ fontSize: '12px' }}>Quatity: {data.quantity}</p>
                                                            </div>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                <p style={{ fontSize: '12px' }}>Rack Name: {data.rackName}</p>
                                                                <p style={{ fontSize: '12px' }}>Row No: {data.rowNo}</p>
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
            </div>
        </>

    )
}

export default PickerView