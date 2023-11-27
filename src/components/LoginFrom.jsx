import React, {useState} from 'react';
import toast, {Toaster} from "react-hot-toast";
import {UserLoginRequest} from "../apiRequest/apiRequest.js";
import {useNavigate} from "react-router-dom";
import FullScreenLoader from "./FullScreenLoader.jsx";

const LoginFrom = () => {
    const [FromValue, SetFromValue] = useState({"UserEmail": ""});

    const [Loader, setLoader] = useState("d-none");

    const navigate = useNavigate();
    
    const InputOnChange = function (key,value) {
        SetFromValue(FromValue=>({
            ...FromValue,
            [key]:value
        }))
    }

    const SubmitFrom = async ()=>{
        if(FromValue.UserEmail.length === 0){
            toast.error("Email Address Required")
        }else {
            setLoader("")
            let msg = await UserLoginRequest(FromValue);
            setLoader("d-none")
            if(msg === "success"){
                toast.success("Request Successful")
                navigate('/otp');
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
                            <h3>Login</h3>
                            <input value={FromValue.UserEmail}
                                   onChange={(e)=>{InputOnChange('UserEmail', e.target.value)}}
                                   type='email' className='form-control'
                                   placeholder='Your Email Address'/>
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

export default LoginFrom;