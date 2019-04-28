import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import home from '@/page/home'//首页
import sign from '@/page/sign-in'//注册
import choice from '@/page/choice'//套餐选择
import regsuccess from '@/page/registered-successfully'//注册成功
import regfailure from '@/page/registered-failure'//注册失败
import rechsuccess from '@/page/recharge-success'//充值成功
import rechfailure from '@/page/recharge-failure'//充值失败
import myorder from '@/page/my-order'//充值失败
import ordersuccess from '@/page/order-success'//订购成功
import orderfailure from '@/page/order-failure'//订购失败
import recharge from '@/page/recharge'//充值失败

Vue.use(Router)

export default new Router({
  // mode: 'history',  //去掉url中的#
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path:'/sign',
      component:sign
    },
    {
      path:'/choice',
      component:choice
    },
    {
      path:'/regsuccess',
      component:regsuccess
    },
    {
      path:'/regfailure',
      component:regfailure
    },
    {
      path:'/rechsuccess',
      component:rechsuccess
    },
    {
      path:'/rechfailure',
      component:rechfailure
    },
    {
      path:'/myorder',
      component:myorder,
      meta: {
        keepAlive: true // 需要被缓存
      }

    },
    {
      path:'/ordersuccess',
      component:ordersuccess
    },
    {
      path:'/orderfailure',
      component:orderfailure
    },
    {
      path:'/recharge',
      component:recharge
    },
  ]
})
