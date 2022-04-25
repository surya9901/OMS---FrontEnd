import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import env from '../setting';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import bar from '../DashBoard/bar.gif'
import pie from '../DashBoard/pie.gif'

function DashBoard() {

    var navigate = useNavigate();
    const [loader, setLoader] = useState(true)
    useEffect(() => {
        fetchData()
    }, []);
    const fetchData = async () => {
        try {
            //****rack category**** 
            let rackCategory = await axios.get(`${env.api}/get/categorydtl`, {
                headers: {
                    'X-Auth-Token': "Z29mcnVnYWxoYWNrYXRob24="
                }
            })
            window.localStorage.setItem('CategoryData', JSON.stringify(rackCategory.data));
            //****Unmapped Item details****
            let ItemDetails = await axios.get(`${env.api}/getItems`, {
                headers: {
                    'X-Auth-Token': "Z29mcnVnYWxoYWNrYXRob24="
                }
            })
            window.localStorage.setItem('ItemData', JSON.stringify(ItemDetails.data));
            // ****All rack based on Category****
            let RackMappedData = await axios.get(`${env.api}/get/categoryRackMap`, {
                headers: {
                    'X-Auth-Token': "Z29mcnVnYWxoYWNrYXRob24="
                }
            })
            window.localStorage.setItem('MappedRackData', JSON.stringify(RackMappedData.data));

            setLoader(false)
        } catch (error) {
            console.log(error);
            navigate('/Crash');
        }
    }

    return (
        <>
            <Navbar />
            {
                loader ? <Loader /> : <div className='container'>
                    <div className='title mt-2 mb-3'>
                        <h5>Dashboard:</h5>
                        <hr />
                    </div>
                    <div className='content text-center mt-2 mb-4'>
                        <i className="fa fa-tools" style={{ fontSize: '60px', color: 'red' }}></i>
                        <div class="alert alert-warning mt-3 mb-4" role="alert">
                            Under Construction!
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-6 mb-3'>
                            <img src={bar} alt='bar' style={{ width: '-webkit-fill-available' }} />
                        </div>
                        <div className='col-lg-6'>
                            <img src={pie} alt='pie' style={{ width: '-webkit-fill-available' }} />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default DashBoard