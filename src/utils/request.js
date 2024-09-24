/* eslint-disable */
import {getUser,removeUser} from '../api/tools';
import router from '../router';

/**
 * 获取当前请求域名
 * @returns {*|{devHost: string, imgHost: string, host: string, payHost: string}}
 */
function getBaseUrl(){
	//获取当前Http协议
	const other = {
		host: "https://ysyos.com/admin"
		// host: "http://192.168.1.6:8081"
		// host: "http://112.124.61.54:8081"
	}
	return other
}

import axios from 'axios';

// 创建axios实例
const http = axios.create({
  baseURL: getBaseUrl().host, // 接口的基础url
  timeout: 5000 // 请求超时时间
});

// 请求拦截器
http.interceptors.request.use(async (config) => {
    // 在发送请求之前做一些处理，在登录后的接口增加token
	if (getUser() && getUser().token !== null) {
		config.headers.Authorization = `Bearer ${getUser().token}`
	}
    return config;
  },
  error => {
    // 请求错误处理
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use( async (response) => {
    // 对响应数据进行处理，比如统一处理错误码等
	if (response.data.code === 401) {
		removeUser();
		await router.replace('./login');
		return;
	}
    return response.data;
  },
	async error => {
	// 判断请求异常信息
	if(error.response.data.code === 401){
		removeUser();
		await router.replace('/login');
		// reject这个错误信息
		return Promise.reject(error);
	}
	console.log('error', error)
    return Promise.reject(error);
  }
);

export default {
	http,
	// jsonp是用来访问/finger/xxx.html后序的接口，
	// 用axios访问会报跨域，用proxy代理访问服务端又接收不到参数，
	// 最后决定用jsonp
	jsonp: async (url, params) => {
		const res = await Vue.jsonp(getBaseUrl().host + url, params);
		const {resultCode} = res;
		if (resultCode.toString() === '-9999') {
			await router.replace('./login');
		}
		return res;
	},
	get: (url, params) => http.get(getBaseUrl().host + url, {params}),
	post: (url, data, config) => http.post(getBaseUrl().host + url, data, config),
	$post: (url, data, config) => http.post(url, data, config),
};