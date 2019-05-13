import axios from 'axios'
import router from '../router'
import bus from '../libs/bus.js'

axios.defaults.withCredentials = true;

let util = {

};
util.title = function(title) {
    title = title ? title + ' - Home' : 'iView project';
    window.document.title = title;
};
axios.interceptors.request.use(function (config) {
    // 发送请求之前做一些处理
    config.headers.token = sessionStorage.getItem("LOGIN_TOKEN") || ''//将接口返回的token信息配置到接口请求中
    return config;
}, function (error) {
    return Promise.reject(error);
});
axios.interceptors.response.use(response => {
    // let token = localStorage.getItem('LOGIN_TOKEN') || '';
    // response.header['token'] = token;
        if(response.data.code=='1001'||response.data.code=='1002'){//具体的判断token失效的参数
        sessionStorage.setItem("LOGIN_TOKEN",'')
        sessionStorage.setItem("LOGIN_INFO",'{}')
        window.location.href="../../supervise-web/login.html"
        // router.replace({
        //     path: '/login',
        //     query: {redirect: router.currentRoute.fullPath}
        // })//需求方要求一旦出错立即跳转登录，所以采取这种侵入式的手段。
      }else{
        return response
      }
      //return response;

   // return response
}, error => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                window.location.href="../../supervise-web/login.html"//需求方要求一旦出错立即跳转登录，所以采取这种侵入式的手段。
                break;
            case 502:
                window.location.href="../../supervise-web/login.html"//需求方要求一旦出错立即跳转登录，所以采取这种侵入式的手段。
                break;
                // router.replace({
                //     path: '/login',
                //     query: {redirect: router.currentRoute.fullPath}
                // })
        }
    }
    return Promise.reject(error.response.data)
})
util.ajax = axios
export default util;


//基地址
let base = '';  //接口代理地址参见：config/index.js中的proxyTable配置

//通用方法
export const POST = (url, params) => {
  return axios.post(`${base}${url}`, params).then(res => res.data)
}

export const GET = (url, params) => {
  return axios.get(`${base}${url}`, {params: params}).then(res => res.data)
}

export const PUT = (url, params) => {
  return axios.put(`${base}${url}`,params).then(res => res.data)
}

export const DELETE = (url, params) => {
  return axios.delete(`${base}${url}`, {params: params}).then(res => res.data)
}

export const PATCH = (url, params) => {
  return axios.patch(`${base}${url}`, params).then(res => res.data)
}
