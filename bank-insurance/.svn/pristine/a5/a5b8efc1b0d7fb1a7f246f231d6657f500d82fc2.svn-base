import 'babel-polyfill'
import $ from 'jquery'
import Vue from 'vue'
import App from './App'
import router from './router'
import Util from './libs/util'
import * as api from './libs/api.bak'
import bus from './libs/bus'
// import store from './libs/store.js.bak'
import {get, post} from './libs/http'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/theme/element-variables.scss'
import './assets/theme/element_custom.css'
import './assets/style/index.scss'
import Components from './libs/index'
import moment from 'moment'
import echarts from 'echarts'
import axios from 'axios'
Vue.prototype.$echarts=echarts;
Vue.prototype.moment = moment
Vue.prototype.HOST = '/api'
Vue.prototype.$axios=axios
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.use(ElementUI)
// Vue.use(VueMoment)
Vue.use(Components)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
require ('../static/swfobject.js')
import VueAMap from 'vue-amap';
import { lazyAMapApiLoaderInstance } from 'vue-amap';
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
    key: '1f3fb9df758e80830b1be722930f002e',
    mapStyle: "amap://styles/blue",
    // mapStyle:'amap://styles/8ae924480c549dbcf37982f127d3939d',
    plugin: ['AMap.MarkerClusterer','AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','AMap.Driving',"AMap.MouseTool","AMap.Geocoder"]
});
lazyAMapApiLoaderInstance.load().then(() => {
    /*this.map = new AMap.Map('amapContainer', {
        center: new AMap.LngLat(121.59996, 31.197646)
    });*/
});
