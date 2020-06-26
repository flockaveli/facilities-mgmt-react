import axios from 'axios';
//axios base url
export default axios.create({
    baseURL: "/api",
    headers: {
        "Content-type": "application/json"
    }
})
