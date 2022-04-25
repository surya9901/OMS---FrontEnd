import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import Toastoptions from '../ToastOptions';

function RackCategory() {

    const [category, setCategory] = useState([]);
    const [loader, setLoader] = useState(true)
    useEffect(() => {
        setCategory(JSON.parse([window.localStorage.getItem('CategoryData')]));
        if (window.localStorage.getItem('CategoryData') === null) {
            navigate('/Crash')
        }
        setLoader(false)
    }, []);

    var navigate = useNavigate();
    var handleGetRackDetails = (id) => {
        navigate(`/RackCategory/RackDetails/${id}`);
    }

    return (
        <>
            {
                loader ? <Loader /> : <>
                    <Toastoptions />
                    <Navbar />
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