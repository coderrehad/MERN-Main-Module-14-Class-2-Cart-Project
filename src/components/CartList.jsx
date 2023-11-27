import React, {useEffect, useState} from 'react';
import {CartListRequest, RemoveCartRequest} from "../apiRequest/apiRequest.js";
import FullScreenLoader from "./FullScreenLoader.jsx";
import toast, {Toaster} from "react-hot-toast";

const CartList = () => {
    const [data, SetData] = useState([]);
    const [Loader, setLoader] = useState("d-none");
    const [refresh, setRefresh] = useState(0);

    useEffect(()=>{
        ( async ()=>{
            setLoader("")
            let res = await CartListRequest();
            setLoader("d-none")
            SetData( res);
        })()
    },[refresh])

    const RemoveCart = async (id)=>{
        setLoader("")
        let msg = await RemoveCartRequest(id);
        setLoader("d-none")
        if(msg === "success"){
            setRefresh(refresh+1);
            toast.success("Item Remove")
        }
        else{
            toast.error("Application Filed")
        }
    }
    return (
        <>
            <div className='container'>
                <div className='row'>
                    {
                        data.map((item, index)=>{
                            return(
                                // eslint-disable-next-line react/jsx-key
                                <div className='col-md-4 mt-3'>
                                    <div className='card w-100'>
                                        <img alt='Not Found' src={item['product']['image']}/>
                                        <div className='card-body'>
                                            <h3 className='card-title'>{item['product']['title']}</h3>
                                            <button onClick={()=>RemoveCart(item['product']['id'])} className='btn btn-success'>Remove</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <FullScreenLoader visibility={Loader}/>
            <Toaster position='bottom-center'/>
        </>
    );
};

export default CartList;