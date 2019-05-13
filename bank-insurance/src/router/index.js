import Vue from 'vue'
import Router from 'vue-router'
import {getCookie} from '@/libs/cookieFun'
//import Home from '@/views/Home'
import StyleHome from '@/views/StyleHome'
import Overview from '@/views/Overview/Overview'
// import Archive from '@/views/Archive/ArchiveDetail'
// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/views/Login'], resolve)

Vue.use(Router)
let router = new Router({
    mode: 'history',
     base:'/bankinsurance/',
    routes: [
        /*{
            path: '/',
            redirect: {
                name: '登录'
            },
            component: Login
        },*/
        {
            path: '/login',
            name: '登录',
            component: Login
        },
        {
            path: '/',
            redirect: {
                name: '总览'
            },
            component: StyleHome,
            meta:{
                requireLogin: true // 当前路由需要校验，不需要就不用写
            },
            children: [
                {path: '/', component: (resolve) => require(['@/views/Overview/Overview'],resolve), name: '总览', menuShow:true}
            ]
        },
        {
            path: '/stylehome',
            component: StyleHome,
            redirect: {
                name: '总览'
            },
            menuShow: true,
            style: 'iconfont icon-books',
            meta:{
                requireLogin: true // 当前路由需要校验，不需要就不用写
            },
            children: [
                {path: '/overview', component: (resolve) => require(['@/views/Overview/Overview'],resolve), name: '总览', menuShow:true}
            ]
        },
        {
            path: '/stylehome',
            component: StyleHome,
            redirect: {
                name: '实时预览'
            },
            menuShow: true,
            style: 'iconfont icon-books',
            meta:{
                requireLogin:true // 当前路由需要校验，不需要就不用写
            },
            children: [
                {path: '/monitored', component: (resolve) => require(['@/views/Monitored/Maptest'],resolve), name: '实时预览', menuShow: true},
            ]
        },
        {
            path: '/stylehome',
            component: StyleHome,
            redirect: {
                name: '预警信息'
            },
            menuShow: true,
            style: 'iconfont icon-books',
            meta:{
                requireLogin:true // 当前路由需要校验，不需要就不用写
            },
            children: [
                {path: '/earlywarning', component: (resolve) => require(['@/views/EarlyWarning/EarlyWarning'],resolve), name: '预警信息', menuShow:true}
            ]
        },
        {
            path: '/stylehome',
            component: StyleHome,
            redirect: {
                name: '单只牛预警列表'
            },
            menuShow: true,
            style: 'iconfont icon-books',
            meta:{
                requireLogin:true // 当前路由需要校验，不需要就不用写
            },
            children: [
                {path: '/OddearlyList', component: (resolve) => require(['@/views/OddearlyList/OddearlyList'],resolve), name: '单只牛预警列表', menuShow:true}
            ]
        },
        {
            path: '/stylehome',
            component: StyleHome,
            redirect: {
                name: '单只牛轨迹'
            },
            menuShow: true,
            style: 'iconfont icon-books',
            meta:{
                requireLogin:true // 当前路由需要校验，不需要就不用写
            },
            children: [
                {path: '/Oddtrajectory', component: (resolve) => require(['@/views/Oddtrajectory/Oddtrajectory'],resolve), name: '单只牛轨迹', menuShow:true}
            ]
        },
        {
            path: '/stylehome',
            component: StyleHome,
            redirect: {
                name: '告警位置'
            },
            menuShow: true,
            style: 'iconfont icon-books',
            meta:{
                requireLogin:true // 当前路由需要校验，不需要就不用写
            },
            children: [
                {path: '/Alarmaddres', component: (resolve) => require(['@/views/Oddtrajectory/Alarmaddres'],resolve), name: '告警位置', menuShow:true}
            ]
        },
        {
            path: '/stylehome',
            component: StyleHome,
            redirect: {
                name: '牛只档案'
            },
            menuShow: true,
            style: 'iconfont icon-books',
            meta:{
                requireLogin: true // 当前路由需要校验，不需要就不用写
            },
            children: [
                {path: '/archive', component: (resolve) => require(['@/views/Archive/Archive'],resolve), name: '牛只档案', menuShow: true},
            ]
        },
        {
            path: '/stylehome',
            component: StyleHome,
            redirect: {
                name: '档案查看'
            },
            menuShow: true,
            style: 'iconfont icon-books',
            meta:{
                requireLogin:true // 当前路由需要校验，不需要就不用写
            },
            children: [
                {path: '/ArchiveDetail', component: (resolve) => require(['@/views/Archive/ArchiveDetail'],resolve), name: '档案查看', menuShow:true}
            ]
        },
        {
            path: '/stylehome',
            component: StyleHome,
            redirect: {
                name: '健康统计'
            },
            menuShow: true,
            style: 'iconfont icon-books',
            meta:{
                requireLogin:true // 当前路由需要校验，不需要就不用写
            },
            children: [
                {path: '/healthy', component: (resolve) => require(['@/views/Healthy/Healthy'],resolve), name: '健康统计', menuShow:true}
            ]
        },
        {
            path: '/stylehome',
            component: StyleHome,
            redirect: {
                name: '生产养殖'
            },
            menuShow: true,
            style: 'iconfont icon-books',
            meta:{
                requireLogin: true // 当前路由需要校验，不需要就不用写
            },
            children: [
                {path: '/breed', component: (resolve) => require(['@/views/Breed/Breed'],resolve), name: '生产养殖', menuShow:true}
            ]
        }
    ]
})

/*router.beforeEach((to, from, next) => {
    let token = window.localStorage.getItem('token')
    if(to.matched.some(record =>record.meta.requiresAuth) && (!token || token ===null)){
        next({
            path: '/login',
            query: { redirect: to.fullPath }
        })
    }else {
        next()
    }
})*/
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireLogin)){  // 判断该路由是否需要登录权限
        let token = getCookie('token')
        if (token) {  // 判断当前用户的登录信息loginInfo是否存在
            next();
        } else {
            next({
                path: '/login'
            })
        }
    }else {
        next();
    }

})




export default router
