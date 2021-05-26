import axios from 'axios'

export default axios.create({
    baseURL: 'https://vve-api.janvanoverbeek.nl/',
    headers: {'Content-Type': 'application/json'}
})
