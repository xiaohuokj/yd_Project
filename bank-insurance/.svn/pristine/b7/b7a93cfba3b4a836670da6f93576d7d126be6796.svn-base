import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        account: '',
        token: null,
        accountName:'',
        cityNumber:'',
        cityName:'',
        map:null,
        caseId:''
    },
    mutations: {
        update(state,value) {
            state.token = value.token;
            state.account = value.account;
            state.accountName = value.name;
            state.cityNumber=value.cityNumber;
            state.cityName=value.cityName;
            state.governmentName=value.governmentName;
            state.map=value.map;
            state.caseId= value.caseId;
        }
    },
    getters:{
        getCityInfo:function(state,data){
            debugger
            if(!state.token){
                state.token = SessionStorage.getItem('LOGIN_TOKEN');
            }
            return state.token;
        }
    }
})
