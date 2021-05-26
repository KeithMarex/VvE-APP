import axios from "axios";

export default axios.create({
    withCredentials: true,
    credentials: 'include',
    baseURL: 'http://192.168.0.105:3001',
})
