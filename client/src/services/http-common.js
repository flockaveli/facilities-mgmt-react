import axios from 'axios';
//axios base url
export default axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-type": "application/json"
    }
})
