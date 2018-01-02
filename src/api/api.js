import ElementUI from 'element-ui'
import axios from 'axios';

// console.log(process.env)
var ajax = axios.create({
    baseURL: process.env.BASE_URL, //根据环境选择地址
    headers: {},
    withCredentials: true, //cookie
    crossDomain: true //跨域
});
//添加一个请求拦截器
ajax.interceptors.request.use(function(config) {
    //在请求发出之前进行一些操作
    if (sessionStorage.getItem('jwt')) {
        config.headers.TOKEN = sessionStorage.getItem('jwt');
    }
    return config;
}, function(err) {
    console.error(err);
    ElementUI.Message.error({
        message: '请求发生错误,请稍后再试!',
        type: 'error'
    });
    //Do something with request error
    return Promise.reject(err);
});
//添加一个响应拦截器
ajax.interceptors.response.use(function(res) {
    //在这里对返回的数据进行处理
    if (!res.data.status) {
        ElementUI.Message.error({
            message: res.data.message,
            type: 'error'
        });
        if (res.data.errorCode == 401) {
            console.log('请登录')
            location.href = '/login'
        }
        throw new Error(res.data.message);
    }

    return (res.data.data ? res.data.data : res.data.status);
}, function(err) {
    console.error(err);
    ElementUI.Message.error({
        message: '网络错误,请稍后再试!',
        type: 'error'
    });
    //Do something with response error
    return Promise.reject(err);
});

//调度员登录
export const dispatherLogin = params => {
    return ajax.post('handler/dispatcher/login', params);
};

//获取骑手列表
export const getRiderLists = params => {
    return ajax.get('handler/rider', params);
};

//获取订单列表
export const getOrderLists = params => {
    return ajax.get('handler/order', params);
};
//获取订单详情
export const getOrderDetail = orderId => {
    return ajax.get('handler/order/' + orderId);
};
//派单
export const doDispatchOrder = params => {
    return ajax.post('handler/order/dispatch', params);
};
//改派
export const reDoDispatchOrder = params => {
    return ajax.post('handler/order/redispatch', params);
};
//设置异常单
export const setOrderException = orderId => {
    return ajax.post('handler/order/setexception/' + orderId);
};
//取消订单
export const cancelOrderById = params => {
    return ajax.post('handler/order/cancel', params);
};
//获取订单经纬度信息
export const getOrderGeoInfo = orderId => {
    return ajax.get('handler/order/geoInfo/' + orderId);
};