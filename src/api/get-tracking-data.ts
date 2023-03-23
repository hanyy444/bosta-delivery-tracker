import axios from 'axios'
import axiosInstance from "./axios-instance"

export default async (trackingNumber: number) => {
    try {
        const response = await axiosInstance({ url: `/${trackingNumber}`, method: 'get' })
        if(response.status === 200) return response.data
        else Promise.reject('Something went wrong!')
    } catch (error) {
        if (axios.isAxiosError(error)) 
            throw new Error(error.response?.data?.error || 'Something went wrong!')
        throw error;
    } 
}