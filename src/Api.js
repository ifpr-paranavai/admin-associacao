import axios from 'axios';
import config from './config';

const instance = axios.create({
    baseURL: config.apiHost
});

const token = localStorage.getItem('associadoToken');

instance.defaults.headers.common['Authorization'] = token;

// axios.interceptors.request.use(config => {
//     const token = localStorage.getItem('associadoToken');
//     config.headers.Authorization = token;
//     return config;
// });

// instance.interceptors.response.use(
//     response => {
//         return response;
//     },
//     error => {
//         const { response } = error;

//         if (response.status === 498) {
//             // Sessão expirada
//             console.log('asd');
//             window.location = 'expired';
//         }
//     }
// );

export default instance;