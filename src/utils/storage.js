// 使用localStorage实现Token存储
const TOKEN_KEY = 'x-token';

export default {
    // 获取Token
    getToken() {
        return localStorage.getItem(TOKEN_KEY);
    },

    // 设置Token
    setToken(token) {
        localStorage.setItem(TOKEN_KEY, token);
    },

    // 移除Token
    removeToken() {
        localStorage.removeItem(TOKEN_KEY);
    },

    // 检查是否已登录
    isAuthenticated() {
        return !!this.getToken();
    }
};