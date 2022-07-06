import axios from "axios";
import { response } from "express";

const httpClient = axios.create({
    baseURL: process.env.PAYSTACK_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
    }
});

httpClient.interceptors.response.use(async(response) => {
    return response.data;
})
export default httpClient;