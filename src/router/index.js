const NotFound = r => require.ensure([],() => r(require('../views/404.vue')), 'NotFound');
const Login = r => require.ensure([],() => r(require('../views/Login.vue')), 'Login');
const Home = r => require.ensure([],() => r(require('../views/Home.vue')), 'Home');
const Index = r => require.ensure([],() => r(require('../views/Index.vue')), 'Index');
let routes = [{
    path: '/login',
    component: Login,
    name: '',
    hidden: true
}, {
    path: '/404',
    component: NotFound,
    name: '404',
    hidden: true
}, {
    path: '/',
    component: Home,
    redirect: '/index',
    name: '',
    hidden: true
}, {
    path: '/index',
    component: Home,
    children: [
        { path: '/', component: Index, name: '主页' }
    ],
    hidden: true
},
// {
//     path: '/',
//     component: Home,
//     name: '',
//     leaf: true, //只有一个节点
//     iconCls: 'fa fa-flag',
//     children: [
//         { path: '/banner', component: Banner, name: 'Banner管理' },
//     ]
// }, {
//     path: '/',
//     component: Home,
//     name: '店铺管理',
//     iconCls: 'fa fa-shopping-bag', //图标样式class
//     children: [ {
//         path: '/shopAuditLogs',
//         component: ShopAuditLogs,
//         name: '审核日志'
//     }, {
//         path: '/shopAuditDetail',
//         component: ShopAuditDetail,
//         name: '店铺审核详情',
//         hidden: true
//     }]
// },
{
    path: '*',
    hidden: true,
    redirect: { path: '/404' }
}];

export default routes;
