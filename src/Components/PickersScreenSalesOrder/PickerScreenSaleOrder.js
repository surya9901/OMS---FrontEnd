import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios';
import env from '../setting'
import Loader from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';


function PickerScreenSaleOrder() {
    const navigate = useNavigate();
    const [pickerAssignedSO, setPickerAssignedSO] = useState([])
    let fetchData = async () => {
        try {
            var phone = JSON.parse(window.localStorage.getItem('email'))
            setLoading(true);
            let data = await axios.get(`${env.api}/get/pickerOrders?status=assigned&pickerPhone=${phone}`, {
                headers: {
                    'X-Auth-Token': "Z29mcnVnYWxoYWNrYXRob24="
                }
            })
            console.log(data);
            window.localStorage.setItem('pickerSalesOrders', JSON.stringify(data.data))
            if (data.data.length > 0) {
                setPickerAssignedSO([...JSON.parse(window.localStorage.getItem('pickerSalesOrders'))]);
            } else {
                setPickerAssignedSO([])
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            navigate('/Crash')
        }
    }
    const handleViewOrder = (id, phone) => {
        JSON.stringify(window.localStorage.setItem('custPhone', phone))
        navigate(`/PickerSalesOrder/ViewOrder/${id}`)
    }
    useEffect(() => {
        fetchData();
    }, [])
    const [loading, setLoading] = useState(false);
    return (
        <>
            <Navbar />
            <div className='container'>
                <div className='mb-3' style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h6 className='mt-3 mb-3' style={{ textDecoration: 'underline' }}>Pending Sale Order</h6>
                    <button className='btn' onClick={fetchData}>
                        <i className="fa fa-redo"></i>
                    </button>
                </div>
                {
                    loading ? <Loader /> :
                        <div className="card">
                            <div className="card-body">
                                <div className="card-deck">
                                    {!pickerAssignedSO.length > 0 ? <h6>No Data Found</h6> : <>
                                        {
                                            pickerAssignedSO.map(data => {
                                                var d = data.orderDate;
                                                var date = d.substr(0, 10).split("-")
                                                var time = d.substr(11, 20).split(":");
                                                date = date[2] + "-" + date[1] + "-" + date[0];
                                                time = time[0] + ":" + time[1] + ":" + time[2];
                                                return (
                                                    <div className="card mb-3" onClick={() => handleViewOrder(data.salesOrderId, data.shipPhone)}>
                                                        <div className="card-body">
                                                            <p className="card-title" style={{ fontWeight: 'bold' }}>Order Number #{data.salesOrderId}</p>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                <p className="card-text" style={{ fontSize: '12px' }}><i className='fa fa-envelope'></i>{data.shipEmail}</p>
                                                                <p className="card-text" style={{ fontSize: '12px' }}><i className="fa fa-phone"></i>&nbsp;&nbsp;{data.shipPhone}</p>
                                                            </div>
                                                            <div className="card-text" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                <p className="card-text" style={{ fontSize: '12px' }}><i className="fa fa-calendar"></i>&nbsp;&nbsp;{date}</p>
                                                                <p className="card-text" style={{ fontSize: '12px' }}><i className="fa fa-clock"></i>&nbsp;&nbsp;{time}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </>

                                    }
                                </div>
                            </div>
                        </div>
                }
            </div>
        </>
    )
}

export default PickerScreenSaleOrder