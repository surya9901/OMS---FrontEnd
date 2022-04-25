import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import env from '../setting';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';

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
                    <div className='title mt-3 mb-3'>
                        <h6>Dashboard:</h6>
                        <hr />
                    </div>
                    <div className='content'>
                            <div class="row row-cols-1 row-cols-md-3 g-4">
                                <div class="col">
                                    <div class="card h-100">
                                        <div class="card-body">
                                            <h5 class="card-title">Card title</h5>
                                            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card h-100">
                                        <div class="card-body">
                                            <h5 class="card-title">Card title</h5>
                                            <p class="card-text">This is a short card.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card h-100">
                                        <div class="card-body">
                                            <h5 class="card-title">Card title</h5>
                                            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card h-100">
                                        <div class="card-body">
                                            <h5 class="card-title">Card title</h5>
                                            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
                </>
    )
}

            export default DashBoard