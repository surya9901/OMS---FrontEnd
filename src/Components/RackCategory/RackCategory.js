import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import Toastoptions from '../ToastOptions';
import axios from 'axios'
import env from '../setting'

function RackCategory() {

    const [category, setCategory] = useState([]);
    const [loader, setLoader] = useState(true)

    const fetchData = async () => {
        try {
            let rackCategory = await axios.get(`${env.api}/get/categorydtl`, {
                headers: {
                    'X-Auth-Token': "Z29mcnVnYWxoYWNrYXRob24="
                }
            })
            window.localStorage.setItem('CategoryData', JSON.stringify(rackCategory.data));
            setCategory(JSON.parse([window.localStorage.getItem('CategoryData')]));
            setLoader(false)
        } catch (error) {
            console.log(error);
            navigate('/Crash');
        }
    }
    useEffect(() => {
        fetchData()
    }, []);

    var navigate = useNavigate();
    var handleGetRackDetails = (id) => {
        navigate(`/RackCategory/RackDetails/${id}`);
    }

    return (
        <>
            <Toastoptions />
            <Navbar />
            {
                loader ? <Loader /> : <>

                    <div className='container'>
                        <h5 className='mt-3 mb-2' style={{ textDecoration: 'underline' }}>Category:</h5>
                        <hr />
                        <div className="card-deck">
                            <div className='row'>
                                {
                                    category.map((data) => {
                                        return (
                                            <button className="card col-11 col-lg-2 m-3 p-4" key={data.catId} style={{ alignItems: 'center', borderRadius: '10px' }} onClick={() => handleGetRackDetails(data.catId)}>
                                                <div className="card-body">
                                                    <p className="card-text">{data.catName}</p>
                                                </div>
                                            </button>
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

export default RackCategory