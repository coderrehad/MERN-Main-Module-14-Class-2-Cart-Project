import axios from "axios";
import {GetToken, ManageTokenExpire, SetEmail, SetToken} from "../utility/TokenHelper.js";


const BaseURL = "https://cart-api.teamrabbil.com/api";


export async function UserLoginRequest(postBody) {
    try{
        let res = await axios.post(`${BaseURL}/user-login`, postBody);
        SetEmail(postBody['UserEmail']);
        return res.data['msg']
    }catch (e) {
        return false
    }
}


export async function OTPVerifyRequest(postBody) {
    try{
        let res = await axios.post(`${BaseURL}/verify-login`, postBody);
        if(res.data['msg'] === "success"){
            SetToken(res.data['data'])
        }
        return res.data['msg']
    }catch (e) {
        return false
    }
}



export async function ProductListRequest() {
    try{
        let res = await axios.get(`${BaseURL}/product-list`);
        return res.data['data']
    }catch (e) {
        return []
    }
}


const config = {
    headers:{
        token: GetToken(),
    }
}


export async function CartListRequest() {
    try{
        let res = await axios.get(`${BaseURL}/cart-list`,config);
        return res.data['data']
    }catch (e) {
        ManageTokenExpire(e.response.status);
    }
}


export async function AddCartRequest(product_id) {
    try{
        let res = await axios.get(`${BaseURL}/create-cart/${product_id}`,config);
        return res.data['msg']
    }catch (e) {
        ManageTokenExpire(e.response.status);
    }
}



export async function RemoveCartRequest(product_id) {
    try{
        let res = await axios.get(`${BaseURL}/remove-cart/${product_id}`,config);
        return res.data['msg']
    }catch (e) {
        ManageTokenExpire(e.response.status);
    }
}



