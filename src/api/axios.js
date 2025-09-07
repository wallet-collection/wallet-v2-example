import axios from 'axios';
import storage from '../utils/storage'; // 引入存储工具
import Toast from '../utils/toast'

const service = axios.create({
    baseURL: 'https://4b3b12a.r24.cpolar.top',
    timeout: 5000
});

// 请求拦截器 - 自动注入Token
service.interceptors.request.use(
    config => {
        const token = storage.getToken();
        if (token) {
            config.headers['x-token'] = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截器 - 自动处理Token更新
service.interceptors.response.use(
    response => {
        const res = response.data;
        // 接口返回的新Token（如有）
        if (res?.data?.token) {
            storage.setToken(res.data.token);
        }
        if (res.code > 0) {
            // Toast.error(res.message, 5000);
            // return Promise.reject(new Error(res.message));
        }
        return res;
    },
    error => {
        // 401未授权自动清理Token
        if (error.response?.status === 401) {
            storage.removeToken();
            window.location.reload(); // 触发路由守卫
        }
        return Promise.reject(error);
    }
);


export default service;