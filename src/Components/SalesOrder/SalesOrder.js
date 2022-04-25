import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import env from '../setting'
import Loader from '../Loader/Loader'
import { useNavigate } from 'react-router-dom'
import { Modal } from 'react-bootstrap';
import { toastsuccess } from '../utils'
import Toastoptions from '../ToastOptions'

function SalesOrder() {

  const [saleOrder, setSaleOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [salesOrder, setSalesOrder] = useState([]);
  const [seperateLoad, setSeperateLoad] = useState([]);
  const [pickerList, setPickerList] = useState([]);

  const navigate = useNavigate();
  let fetchData = async () => {
    try {
      setSalesOrder('')
      setLoading(true);
      let data = await axios.get(`${env.api}/get/orders?status=pending`, {
        headers: {
          'X-Auth-Token': "Z29mcnVnYWxoYWNrYXRob24="
        }
      })
      var pendingSales = data.data.salesOrderDetailList
      window.localStorage.setItem('pendingSales', JSON.stringify(pendingSales))
      setSaleOrder([...JSON.parse(window.localStorage.getItem('pendingSales'))])
      setLoading(false);
    } catch (error) {
      console.log(error)
      navigate('/Crash')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const showSaleOrder = async (id) => {
    try {
      setSeperateLoad(true)
      var salesOrderDetailResponse = [];
      let data = await axios.get(`${env.api}/get/salesOrder?salesOrderNo=${id}`, {
        headers: {
          'X-Auth-Token': "Z29mcnVnYWxoYWNrYXRob24="
        }
      })
      var sODResponse = data.data.salesOrderDetailResponse;
      salesOrderDetailResponse.push(sODResponse);
      window.localStorage.setItem('salesOrderDetailResponse', JSON.stringify(salesOrderDetailResponse))
      window.localStorage.setItem('availablePickerList', JSON.stringify(data.data.availablePickerList))
      setSalesOrder([...JSON.parse(window.localStorage.getItem('salesOrderDetailResponse'))]);
      setPickerList([...JSON.parse(window.localStorage.getItem('availablePickerList'))])
      window.localStorage.setItem('orderId', id);
      setSeperateLoad(false);
    } catch (error) {
      console.log(error);
      navigate('/Crash')
    }
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const pickrOdrAssign = async (phnum) => {
    try {
      var orderId = window.localStorage.getItem('orderId')
      await axios.post(`${env.api}/map/salesOrder?pickerPhone=${phnum}&salesOrderNo=${orderId}`, {}, {
        headers: {
          "X-Auth-Token": "Z29mcnVnYWxoYWNrYXRob24="
        }
      });
      toastsuccess();
      handleClose();
      setSalesOrder('')
    } catch (error) {
      console.log(error);
      navigate('/Crash')
    }
  }

  return (
    <>
      <Toastoptions />
      <Navbar />
      {
        loading ? <Loader /> :
          <div className='container mb-3'>
            <div className='mt-3' style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h5 className='mt-2' style={{ textDecoration: 'underline' }}>Pending Sales Order:</h5>
              <button className='btn' onClick={fetchData}>
                <i className="fa fa-redo"></i>
              </button>
            </div>
            <hr />
            <div className='row'>
              <div className='col-lg-3 mb-4' style={{ height: '550px', overflowY: 'scroll', padding: '10px' }}>
                {
                  saleOrder.map(data => {
                    var d = data.orderDate;
                    var date = d.substr(0, 10).split("-")
                    var time = d.substr(11, 20).split(":");
                    date = date[2] + "-" + date[1] + "-" + date[0];
                    time = time[0] + ":" + time[1] + ":" + time[2];
                    return (
                      <div className="card mb-3" onClick={() => showSaleOrder(data.salesOrderId)} style={{ cursor: 'pointer' }}>
                        <div className="card-header" style={{ fontSize: '14px', fontWeight: 'bold', backgroundColor: '#06113C', color: 'white' }}>
                          {data.shipEmail}
                        </div>
                        <div className="card-body">
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p className="card-title" style={{ fontSize: '12px' }}>Order Number #{data.salesOrderId}</p>
                            <p className="card-title" style={{ fontSize: '12px' }}>&#8377;&nbsp;{data.totalAmount}</p>
                          </div>
                          <p className="card-text" style={{ fontSize: '12px' }}><i className="fa fa-phone"></i>&nbsp;&nbsp;{data.shipPhone}</p>
                          <div className="card-text" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p className="card-text" style={{ fontSize: '12px' }}><i className="fa fa-calendar"></i>&nbsp;&nbsp;{date}</p>
                            <p className="card-text" style={{ fontSize: '12px' }}><i className="fa fa-clock"></i>&nbsp;&nbsp;{time}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              <div className='col-lg-9' style={{ marginLeft: '0px' }}>
                {
                  salesOrder.length > 0 ? <>
                    {
                      seperateLoad ? <Loader /> : <div className='container mt-2'>
                        {
                          salesOrder.map(data => {
                            return (
                              <div className='container mb-3' style={{ border: 'solid grey 1px', padding: '10px' }}>
                                <h6 className='text-center' style={{ fontSize: '12px' }}>Order #{data.salesOrderId}</h6>
                                <hr />
                                <p style={{ fontSize: '12px', fontWeight: 'bold' }}>Item Details</p>
                                {
                                  data.itemDetailList.map((data, index) => {
                                    return (
                                      <div>
                                        <p style={{ fontSize: '12px', fontWeight: 'bold' }}>Item {index + 1}</p>
                                        <p style={{ fontSize: '12px' }}>Item Name: {data.itemName}</p>
                                        <p style={{ fontSize: '12px' }}>Item Price: {data.itemPrice}</p>
                                        <p style={{ fontSize: '12px' }}>Quatity: {data.quantity}</p>
                                        <p style={{ fontSize: '12px' }}>Total Price: {data.quantity} nos x {data.itemPrice} = {data.itemTotalPrice} </p>
                                        <hr />
                                      </div>
                                    )
                                  })
                                }
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <button className='btn' style={{ backgroundColor: '#06113C', color: 'white', fontSize: '12px' }} onClick={handleShow}>
                                    Assing Picker
                                  </button>
                                  <p style={{ fontSize: '18px', justifyContent: 'center', margin: '5px 0' }}>Total Amount: &#8377; {data.totalAmount}</p>
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>
                    }
                  </> : <div style={{ top: '25vh', position: 'relative' }}><p className='text-muted text-center'>No Record to Display! Select Any Order to view Details.</p></div>
                }
              </div>
            </div>
          </div>
      }
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Picker Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Available Picker</h6>
          <hr />
          <div>
            <ul style={{ listStyleType: 'none' }}>
              {
                !pickerList.length > 0 ? <p className='text-center'>Oopss... All Pickers are busy!</p> : <>
                  {
                    pickerList.map(data => {
                      return (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <li>{data.pickerName}</li>
                          <li>{data.pickerPhone}</li>
                          <button className='btn' style={{ backgroundColor: '#06113C', color: 'white', fontSize: '12px' }} onClick={() => pickrOdrAssign(data.pickerPhone)}>Assign</button>
                        </div>
                      )
                    })
                  }
                </>
              }
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default SalesOrder