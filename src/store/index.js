import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    user:{
      username:'',
      password:''
    },
    name:'',
    prodList:{},
    orderNo:'',//流量包订购成功流水号
    packageName:'',//名称
    sign:{},//注册信息,
    successNum:'',//个人注册成功流水号
    successName:'',
    small:'',
    defeated:'',
    accountId:'',
    mvnoBusinessMark:'',
    userId:'',
    acctId:''
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }

  }
});
/*const store = createStore({
  state: {
    user:{
      username:'',
      password:''
    }


  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }

  }
})*/

export default store
