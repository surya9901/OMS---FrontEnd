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
            let RackMappedData = await axios.get(`${env.api}/get/categoryRackMap`,{
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
            {
                loader ? <Loader /> :
                    <Navbar />
            }
        </>
    )
}

export default DashBoard