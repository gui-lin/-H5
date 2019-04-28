<template>
  <div id="home">
    <mt-header title="首页"></mt-header>
    <div class="home-box">
      <div class="font"> 亚太星通海事服务</div>
      <div class="three">
        <div class="thr blue" @click="goSign">个人上网账号注册</div>
        <div class="thr origin " @click="recharge">个人账户充值</div>
        <div class="thr green" @click="myorder">个人流量包订购</div>
      </div>


      <div class="btn" @click="gohome">跳转至认证登录页面</div>
    </div>

  </div>
</template>

<script>
import { Header } from 'mint-ui'
import { MessageBox } from 'mint-ui'
import { Indicator } from 'mint-ui'

export default {
  name: 'home',
  components: {
    Header
  },
  data() {
    return {
      wx: true,

      mvnoBusinessMark: '',
      userId: ''
    }
  },
  methods: {
    goSign() {
      if (!this.wx) {
        MessageBox('提示', '请使用非微信浏览器进行打开/扫码！')
        return
      }
      /*  let url='http://218.249.69.213:60024/rest/user/userInfo'
        let data={
          "serial_number":"10001"
        }
        Indicator.open();
        this.$axios.defaults.timeout =  3000;
        this.$axios.post(url,data).then((res)=>{
          Indicator.close();
          if(res.status===200){

            this.$router.push('/sign')
            // console.log(this.mvnoBusinessMark, this.userId)
          }else {
            console.log('请求失败')
          }
        }).catch((err)=>{
          Indicator.close();
          // console.log(err,'sss')
          MessageBox('提示', '当前网络不支持此功能')
          return
        })*/
      this.$router.push('/sign')
    },
    isWeiXin() {
      var ua = window.navigator.userAgent.toLowerCase()
      console.log(ua)
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true
      } else {
        return false
      }
    },

    recharge() {
      if (!this.wx) {
        MessageBox('提示', '请使用非微信浏览器进行打开/扫码！')
        return
      }

      this.$router.push('/recharge')
    },
    myorder() {
      if (!this.wx) {
        MessageBox('提示', '请使用非微信浏览器进行打开/扫码！')
        return
      }
      /*  let url='http://218.249.69.213:60024/rest/user/userInfo'
        let data={
          "serial_number":"10001"
        }
        Indicator.open();
        this.$axios.defaults.timeout =  3000;
        this.$axios.post(url,data).then((res)=>{
          Indicator.close();
          if(res.status===200){

            this.$router.push('/myorder')
            // console.log(this.mvnoBusinessMark, this.userId)
          }else {
            console.log('请求失败')
          }
        }).catch((err)=>{
          Indicator.close();
          // console.log(err,'sss')
          MessageBox('提示', '当前网络不支持此功能')
          return
        })*/

      this.$router.push('/myorder')
    },
    init() {
      let obj = {
        mvnoBusinessMark: this.mvnoBusinessMark,
        userId: this.userId
      }
      let str = JSON.stringify(obj)
      sessionStorage.setItem('objj', str)
    },
    gohome() {
      window.location.href = 'http://10.129.102.188:10000/portal_ytwx/'
    }
  },
  beforeCreate() {
    // this.isWeiXin()

  },
  created() {
    this.$store.state.user = {}
    this.$store.state.sign = {}
    this.$store.state.prodList = {}
    this.$store.state.name = ''
    this.$store.state.accountId = ''
  },
  mounted() {
    // this.init()
    if (this.isWeiXin()) {
      // alert(" 是来自微信内置浏览器")
      this.wx = false
      MessageBox('提示', '请使用非微信浏览器进行打开/扫码！')
      return
    } else {
      this.wx = true
    }
    let url = 'http://218.249.69.213:60024/rest/user/userInfo'
    //  let url='http://10.129.102.188:8051/rest/user/userInfo'//生产环境
    let data = {
      'serial_number': '10001'
    }
    this.$axios.defaults.timeout = 40000
    this.$axios.post(url, data).then((res) => {

      if (res.status === 200) {

        this.mvnoBusinessMark = res.data.vno_id
        this.userId = res.data.vsat_id
        this.init()
        // console.log(this.mvnoBusinessMark, this.userId)
      } else {
        console.log('当前网络不支持此功能')
      }
    }).catch((err) => {
      // console.log(err,'sss')
      console.log('当前网络不支持此功能')
    })
  }
}
</script>

<style scoped lang="less">
  @import url('../../style/main.less');

  body {
    height: 100%;
  }

  #home {
    height: 100vh;
  }

  .mint-header {
    background: @themecolor;
  }
  .btn {
    .w(280);
    .h(40);
    background: #3a80ce;
    color: white;
    text-align: center;
    .lh(40);
    .br(10);
    margin: 0 auto;
    .fz(18);
    .mt(150)

  }

  .home-box {
    height: 100%;
    width: 100%;
    background: url("../../../static/image/bg_05.png");
    background-size: 100% 100%;

    .font {
      color: @themecolor;
      width: 100%;
      .h(75);
      text-align: center;
      .fz(22);
      .lh(75);
    }

    .three {
      .w(300);
      .h(300);
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .thr {
        .w(125);
        .h(125);
        .lh(125);
        .fz(14);
        background: #3A80CE;
        .br(10);
        text-align: center;
        color: #ffffff;

      }

      .blue {
        background: url("../../../static/image/swzh_zc_01.png");
        background-size: 100% 100%;
      }

      .origin {
        background: url("../../../static/image/gr_cz_01.png");
        background-size: 100% 100%;
      }

      .green {
        background: url("../../../static/image/gr_llb_01.png");
        background-size: 100% 100%;
      }
    }
  }
</style>
