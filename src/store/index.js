
import Vuex from 'vuex';
import Vue from 'vue';


Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        token: null,
    },
    mutations: {
        // 登录成功将, token保存在localStorage和sessionStorage中
        login: (state,data) => {
            // state.token = data;
            // localStorage.token = data;
        },
        // 退出登录将, token清空
        logout: (state) => {
            // localStorage.removeItem('token');
            // localStorage.removeItem('role_type');
            localStorage.removeItem('loginForm');
            sessionStorage.removeItem('search_info')
            // state.token = null
        },
    }
})