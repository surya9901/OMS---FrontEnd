import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Loader from '../Loader/Loader';
import { Modal} from 'react-bootstrap'
import axios from 'axios';
import env from '../setting'
import { useNavigate } from 'react-router-dom';

function StockDetails() {
  const navigate = useNavigate();
  const [ItemDetails, setItemDetails] = useState([]);
  const [rackCategory, setRackCategory] = useState([]);
  const [rackDetails, setRackDetails] = useState([])
  const [loader, setLoader] = useState(true);

  const fetchData = async () => {
    try {
      setLoader(true)
      //****Unmapped Item details****
      let ItemDetails = await axios.get(`${env.api}/getItems`, {
        headers: {
          'X-Auth-Token': "Z29mcnVnYWxoYWNrYXRob24="
        }
      })
      window.localStorage.setItem('ItemData', JSON.stringify(ItemDetails.data));
      setItemDetails(JSON.parse([window.localStorage.getItem('ItemData')]));
      // ****All rack based on Category****
      let RackMappedData = await axios.get(`${env.api}/get/categoryRackMap`, {
        headers: {
          'X-Auth-Token': "Z29mcnVnYWxoYWNrYXRob24="
        }
      })
      window.localStorage.setItem('MappedRackData', JSON.stringify(RackMappedData.data));
      setRackCategory(JSON.parse([window.localStorage.getItem('MappedRackData')]));
      setLoader(false)
    } catch (error) {
      console.log(error);
      navigate('/Crash');
    }
  }

  useEffect(() => {
    fetchData();
    setLoader(false)
  }, []);

  const [catId, setCatId] = useState('');

  const [show, setShow] = useState(false);
  const handleModalClose = () => {
    setShow(false)
    setCatDisable(false)
    window.localStorage.removeItem('catId', catId);
  };
  const handleModalShow = (itemSkuCode) => {
    JSON.stringify(window.localStorage.setItem('itemSkuCode', itemSkuCode));
    setShow(true);
  }

  const [catDisable, setCatDisable] = useState(false);
  const disableCatSelection = () => {
    window.localStorage.setItem('catId', catId);
    rackDetailsData();
    setCatDisable(true)
  }
  const enableCatSelection = () => {
    window.localStorage.removeItem('catId', catId);
    setCatDisable(false)
  }

  const rackDetailsData = async () => {
    setLoader(true)
    let catId = window.localStorage.getItem('catId')
    let data = await axios.get(`${env.api}/get/categoryRack?categoryId=${catId}`, {
      headers: {
        'X-Auth-Token': "Z29mcnVnYWxoYWNrYXRob24="
      }
    })
    setRackDetails([...data.data.categoryRack])
    setLoader(false)
  }

  const handlesubmit = async (data) => {
    try {
      var skuCode = JSON.parse(window.localStorage.getItem('itemSkuCode'));
      await axios.post(`${env.api}/save/itemrackMap?itemSkuCode=${skuCode}&categoryRackMapId=${data.categoryRackMapId}`, {}, {
        headers: {
          'X-Auth-Token': "Z29mcnVnYWxoYWNrYXRob24="
        }
      })
      handleModalClose()
      fetchData();
    } catch (error) {
      console.log(error);
      navigate('/Crash')
    }
  }

  return (
    <>
      <Navbar />
      {
        loader ? <Loader /> : <>
          <div className='container mt-3 mb-3'>
            <h6 style={{ textDecoration: 'underline' }}>Rack Details:</h6>
            <hr />
            <div className='table-responsive'>
              <table className="table table-striped text-center">
                <thead>
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Item Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Rack</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Expiry Date</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    ItemDetails.map((data, index) => {
                      function formatDate(input) {
                        var datePart = input.match(/\d+/g),
                          year = datePart[0].substring(2),
                          month = datePart[1], day = datePart[2];
                        return day + '/' + month + '/' + year;
                      }
                      return (
                        <tr>
                          <th scope="row" key={data.itemSkuCode}>{index + 1}</th>
                          <td>{data.itemName}</td>
                          <td>{data.category === null ? 'Not MApped' : data.category.catName}</td>
                          <td>{data.categoryRackMap === null ? 'Not Mapped' : data.categoryRackMap.rackMaster.rackName}</td>
                          <td>{data.stockQty}</td>
                          <td>{formatDate(data.expDate)}</td>
                          <td>
                            <div>
                              <button className='btn' style={{ backgroundColor: '#EDE6DB', color: '#1D5C63' }} onClick={() => handleModalShow(data.itemSkuCode)}>
                                Map
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </>
      }
      {/* Modal */}
      <Modal
        fullscreen={true}
        show={show}
        onHide={handleModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Rack Mapping</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='container'>
            <h6>Rack Category Master</h6>
            <div className="input-group mb-3">
              <select className="custom-select form-control" id="inputGroupSelect02" value={catId} onChange={(e) => setCatId(e.target.value)} disabled={catDisable ? true : false}>
                <option value={''}></option>
                {
                  rackCategory.map(data => {
                    return (
                      <>
                        <option value={data.categoryId}>{data.categoryName}</option>
                      </>
                    )
                  })
                }
              </select>
              <div class="input-group-append">
                {
                  catDisable ? <button className="input-group-text" htmlFor="inputGroupSelect02" onClick={enableCatSelection}><i className="fa fa-times" style={{ fontSize: '25px' }}></i></button> : <button class="input-group-text" htmlFor="inputGroupSelect02" onClick={disableCatSelection}>Save</button>
                }
              </div>
            </div>
            {
              loader ? <Loader /> : <>
                {
                  catDisable ? <>
                    <div className='container'>
                      <div className='row'>
                        {
                          rackDetails.map(data => {
                            console.log(data);
                            return (
                              <>
                                {
                                  data.status ? <button className='btn col-3 col-lg-2 text-center' onClick={() => handlesubmit(data)}>
                                    <div className="card bg-light mb-3">
                                      <div className="card-header">{data.rackName}</div>
                                    </div>
                                  </button> : ''
                                }
                              </>
                            )
                          })
                        }
                      </div>
                    </div>
                  </> : ''
                }
              </>
            }
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default StockDetails