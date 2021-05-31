import axios from 'axios'

export default axios.create({
    withCredentials: true,
    baseURL: process.env.API_URL,
    headers: {'Content-Type': 'application/json'}
})
