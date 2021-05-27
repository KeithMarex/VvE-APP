import axios from 'axios'

export default axios.create({
    withCredentials: true,
    baseURL: 'http://145.101.73.223:3001',
    headers: {'Content-Type': 'application/json'}
})
