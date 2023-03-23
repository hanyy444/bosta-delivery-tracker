import axios from 'axios'

const BASE_URL = 'https://tracking.bosta.co/shipments/track'

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})

export default axiosInstance