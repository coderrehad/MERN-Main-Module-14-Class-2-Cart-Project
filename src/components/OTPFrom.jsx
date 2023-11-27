import React, {useState} from 'react';
import toast, {Toaster} from "react-hot-toast";
import {OTPVerifyRequest} from "../apiRequest/apiRequest.js";
import {useNavigate} from "react-router-dom";
import FullScreenLoader from "./FullScreenLoader.jsx";
import {GetEmail} from "../utility/TokenHelper.js";

const OtpFrom = () => {
    const [FromValue, SetFromValue] = useState({"UserEmail": GetEmail(), "OTP":""});

    const [Loader, setLoader] = useState("d-none");

    const navigate = useNavigate();

    const InputOnChange = function (key,value) {
        SetFromValue(FromValue=>({
            ...FromValue,
            [key]:value
        }))
    }

    const SubmitFrom = async ()=>{
        if(FromValue.OTP.length === 0){
            toast.error("OTP Code Required")
        }else {
            setLoader("")
            let msg = await OTPVerifyRequest(FromValue);
            setLoader("d-none")
            if(msg === "success"){
                toast.success("Request Successful")
                navigate('/');
            }else {
                toast.error("Request Fail ! Try Again")
            }
        }
    }
    return (
        <>
            <div className='container mx-auto'>
                <div className='row justify-content-center'>
                    <div className='col-md-4'>
                        <div className='card p-6 mt-5'>
                            <h3>OTP Verification</h3>
                            <input value={FromValue.OTP}
                                   onChange={(e)=>{InputOnChange('OTP', e.target.value)}}
                                   type='number' className='form-control'
                                   placeholder='OTP Code Here'/>
                            <button onClick={SubmitFrom} className='btn btn-primary w-100 mt-3'>Next</button>
                            <Toaster position='bottom-center'/>
                        </div>
                    </div>
                </div>
            </div>
            <FullScreenLoader visibility={Loader}/>
        </>
    );
};

export default OtpFrom;