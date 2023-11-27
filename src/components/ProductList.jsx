import React, {useEffect, useState} from 'react';
import {AddCartRequest, ProductListRequest} from "../apiRequest/apiRequest.js";
import FullScreenLoader from "./FullScreenLoader.jsx";
import toast, {Toaster} from "react-hot-toast";

const ProductList = () => {
    const [data, setDate] = useState([]);
    const [Loader, setLoader] = useState("d-none");

    useEffect(()=>{
        (async ()=>{
            setLoader("")
            let res = await ProductListRequest();
            setLoader("d-none")
            setDate(res)
        })()
    }, [])

    const AddCart = async (id)=>{
        setLoader("")
        let msg = await AddCartRequest(id);
        setLoader("d-none")
        if(msg === 'success'){
            toast.success("View To Cart")
        }else{
            toast.error("Failed")
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
                                        <img alt='Not Found' src={item['image']}/>
                                        <div className='card-body'>
                                            <h3 className='card-title'>{item['title']}</h3>
                                            <button onClick={()=>AddCart(item['id'])} className='btn btn-success'>Add To Card</button>
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

export default ProductList;