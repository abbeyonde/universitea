import axios from 'axios';

export default axios.create({
    baseURL: 'https://universitea.onrender.com',
    headers: {
        'Content-Type': 'application/json'
    }
});