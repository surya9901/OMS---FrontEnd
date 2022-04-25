import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import env from '../setting';
import Loader from '../Loader/Loader';
import { toasterror, toastsuccess } from '../utils'
import Toastoptions from '../ToastOptions';
import './RackDetails.css';

function RackDetails() {
  var params = useParams();
  const navigate = useNavigate();
  var categoryId = JSON.parse(params.id);
  var catId = params.id
  const [rackDetails, setRackDetails] = useState([]);
  const [loader, setLoader] = useState(true);

  var fetchData = async (id) => {
    try {
      let data = await axios.get(`${env.api}/get/categoryRack?categoryId=${id}`, {
        headers: {
            'X-Auth-Token': "Z29mcnVnYWxoYWNrYXRob24="
        }
    })
      setRackDetails([...data.data.categoryRack])
      setLoader(false);
    } catch (error) {
      console.log(error)
      toasterror()
      setTimeout(() => {
        navigate('/Crash');
      })
    }
  }

  var handlePost = async (catId, rackId) => {
    try {
      var mappedData = [
        {
          'rack_id': rackId,
          'cat_id': catId
        }
      ]
      await axios.post(`${env.api}/map/categoryRack`, mappedData, {
        headers: {
            'X-Auth-Token': "Z29mcnVnYWxoYWNrYXRob24="
        }
    })
      toastsuccess();
      setTimeout(() => {
        navigate('/Dashboard')
      }, 1500)
    } catch (error) {
      console.log(error);
      toasterror();
      setTimeout(() => {
        navigate('/Crash');
      }, 1500)
    }
  }

  useEffect(() => {
    fetchData(catId);
  }, []);

  console.log(params);

  return (
    <>
      {
        loader ? <Loader /> : <>
          <Toastoptions />
          <Navbar />
          <div className='container'>
            <div className='mt-3 mb-2 p-2'>
              <div className='row'>
                <div className='col col-lg-8 mt-2'>
                  <h6 style={{ textDecoration: 'underline' }}>Rack Details:</h6>
                </div>
                <div className='searchBox col col-lg-4' style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Search Rack" aria-label="Recipient's username" aria-describedby="button-addon2" />
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2"><i className="fa fa-search"></i></button>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="card-deck mb-3">
              <div className='row'>
                {
                  rackDetails.map((data) => {
                    return (
                      <div className="card col-11 col-lg-2 text-center" style={{ borderRadius: '10px', margin: '10px 15px' }}>
                        <div className="card-body">
                          <p>Rack Name:</p>
                          <p className="card-text"><b>{data.rackName}</b></p>
                        </div>
                        <div>
                          <button className='btn btn-success mb-2' id='mapBtn' onClick={() => handlePost(categoryId, data.rackId)} disabled={data.status.toString() === 'true' ? true : ''}>
                            Map
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
      }
    </>
  )
}

export default RackDetails