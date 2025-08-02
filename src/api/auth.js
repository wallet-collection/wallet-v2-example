import request from './axios'; // 引入封装好的axios

export const loginInfo = () => {
    return request.get('/member/loginInfo');
};

export const login = (data) => {
    return request.post('/login', data);
};

export const register = (data) => {
    return request.post('/register', data);
};

export const getCoinList = () => {
    return request.get('/memberCoin/list');
};

export const getCoinNetworkList = (params) => {
    return request.get('/coinConf/list',{
        params: params
    });
};

export const getRechargeAddress = (params) => {
    return request.get('/recharge/address',{
        params: params
    });
};

export const getMemberCoinInfo = (params) => {
    return request.get('/memberCoin/info',{
        params: params
    });
};

export const rechargeList = (params) => {
    return request.get('/recharge/list',{
        params: params
    });
};

export const withdraw = (data) => {
    return request.post('/withdraw', data);
};

export const withdrawList = (params) => {
    return request.get('/withdraw/list',{
        params: params
    });
};