import axios from 'axios'
import {API_URL} from 'react-native-dotenv';

export default axios.create({
    withCredentials: true,
    baseURL: API_URL,
    headers: {'Content-Type': 'application/json'}
})
