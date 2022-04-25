import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import env from '../setting';
import Loader from '../Loader/Loader';

function Picker() {
  const navigate = useNavigate();
  const [pickerStatusData, setPickerStatusData] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      setLoading(true);
      let data = await axios.get(`${env.api}/get/pickers`, {
        headers: {
            'X-Auth-Token': "Z29mcnVnYWxoYWNrYXRob24="
        }
    })
      window.localStorage.setItem('pickerStatusDetails', JSON.stringify(data.data));
      setPickerStatusData([...JSON.parse(window.localStorage.getItem('pickerStatusDetails'))])
      setLoading(false);
    } catch (error) {
      console.log(error);
      navigate('/Crash')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Navbar />
      {
        loading ? <Loader /> :
          <div className='container mb-3'>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <p className='mt-3 mb-3' style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Available Pickers:</p>
              <button className='btn' onClick={fetchData}>
                <i className="fa fa-redo"></i>
              </button>
            </div>
            {
              pickerStatusData.length > 0 ? <table className="table table-striped table-responsive mt-2">
                <thead>
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Picker Name</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>

                  {
                    pickerStatusData.map((data, index) => {
                      console.log(data)
                      return (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{data.pickerName}</td>
                          <td>{data.pickerPhone}</td>
                          <td>{data.status === 'available' || data.status === 'Available' ? <i className="fa fa-circle" style={{ color: 'green', fontSize: '8px' }}></i> : <i className="fa fa-circle" style={{ color: 'red', fontSize: '8px' }}></i>} &nbsp; {data.status}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table> : <p style={{ top: '20vh', position: 'relative' }}>Oops... All Picker Offline!</p>
            }
          </div>
      }
    </>
  )
}

export default Picker