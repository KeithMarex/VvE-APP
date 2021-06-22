import axios from 'axios'
import {API_URL} from 'react-native-dotenv';

export default axios.create({
    withCredentials: true,
    baseURL: 'https://vve-api.janvanoverbeek.nl/',
    headers: {'Content-Type': 'application/json'}
})
