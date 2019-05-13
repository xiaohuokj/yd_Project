import axios from 'axios';
import QS from 'qs';
import { Message } from 'element-ui'
import {getCookie} from '@/libs/cookieFun'
// import store from '../store/index'

// 环境的切换
/*if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = '/api';
} else if (process.env.NODE_ENV == 'debug') {
    axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = 'http://api.123dailu.com/';
}*/

//  axios.defaults.baseURL = 'http://192.168.0.67:8990' // 洪建

// axios.defaults.baseURL = 'http://192.168.0.44:8997' // 张咪
axios.defaults.baseURL = 'http://47.92.12.118:80' // 服务端线上
// axios.defaults.baseURL = 'http://192.168.0.16:8990' // 志伟
// axios.defaults.baseURL = 'http://192.168.0.68:8997' // hongliang

// axios.defaults.baseURL = 'http://192.168.0.59:8990' // 春波
// axios.defaults.baseURL = 'http://192.168.0.57:8080' // 大亨


// 请求超时时间
axios.defaults.timeout = 100000;

// 允许携带token跨域
axios.withCredentials = true;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

axios.create({
    headers: 'X-Auth-Token'
});

// 请求拦截器
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        // token && (config.headers.Authorization = token);
        /*if (getCookie('token')) { //判断token是否存在
            config.headers['token'] = Cookies.get("token");  //将token设置成请求头
        }*/
        var token = getCookie('token')
        if(token){
        }
        return config;
    },
    error => {
        return Promise.error(error);
    })

// 响应拦截器
axios.interceptors.response.use(response => {
        // Loading.service().close();
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },error => { // 服务器状态码不是200的情况
        // Loading.service().close();
        if (error.result == "false") {
            switch (error.result == "false") {
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。
                case 401:
                    router.replace({
                        path: '/login'
                    });
                    break;
                // 403 token过期
                // 登录过期对用户进行提示
                // 清除本地token和清空vuex中token对象
                // 跳转登录页面
                case 403:
                    /*Message({
                        message: error.message,
                        type: error,
                        duration: 3000
                    });*/
                    // 清除token
                    delCookie('token');
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                    setTimeout(() => {
                        router.replace({
                            path: '/login'
                        });
                    }, 1000);
                    break;
                // 404请求不存在
                case 404:
                    Message({
                        message: error.message,
                        type: error,
                        duration: 3000
                    });
                    break;
                case 500:
                    Message({
                        message: error.message,
                        type: error,
                        duration: 3000
                    });
                    setTimeout(() => {
                        router.replace({
                            path: '/login'
                        });
                    }, 1000);
                    delCookie('token');
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    /*Message({
                        message: error.message,
                        type: error,
                        duration: 3000
                    });
                    setTimeout(() => {
                        router.replace({
                            path: '/login'
                        });
                    }, 1000);
                    delCookie('token');*/
            }
            return Promise.reject(error.response);
        }
    }
);
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params){
    return new Promise((resolve, reject) =>{
        axios.get(url, {
            params: params,
        })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err)
            })
    });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err)
            })
    });
}