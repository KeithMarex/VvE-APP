import axios from 'axios'

export default axios.create({
    withCredentials: true,
    baseURL: 'http://192.168.178.56:3001',
    headers: {'Content-Type': 'application/json'}
})
