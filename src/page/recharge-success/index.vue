<template>
  <div id="success">
    <mt-header title="充值成功">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="succes-box">
        <div class="succes-top">
          <img src="../../../static/image/rig_01.png" alt="">
          <div class="strong">充值成功！</div>
        </div>
        <div class="succes-center">
          <div class="success-cen">
            <div class="center-left">充值金额</div>
            <div class="center-right blue">{{money}}元 </div>
          </div>
          <div class="success-cen">
            <div class="center-left">支付金额</div>
            <div class="center-right blue">{{alipay}}元 </div>
          </div>
          <div class="success-cen">
            <div class="center-left">充值时间</div>
            <div class="center-right hui">{{time}} </div>
          </div>
          <!--<div class="success-cen">
            <div class="center-left">充值流水号</div>
            <div class="center-right hui">{{number}} </div>
          </div>-->
        </div>

    </div>

    <div class="end">
      <div class="bottom">
        <!--<div class="bot-left" @click="gohome">跳转至首页</div>-->
        <div class="bot-right" @click="gorecharge">继续充值</div>
      </div>
    </div>


  </div>

</template>

<script>
import { Header } from 'mint-ui'
import { Indicator } from 'mint-ui';
import { getPaymentRecordById } from '../../api/means'
export default {
  name: 'index',
  components: {
    Header,
  },
  data(){
    return{
      number:'',
      time:'',
      money:'',
      alipay:''
    }
  },
  methods:{
    gohome(){
      window.location.href='http://h5.apsatcom.com:5091/'    //调到首页 测试环境
    },
    gorecharge(){
      console.log('aa')
      window.location.href='http://h5.apsatcom.com:5091/#/recharge' //调到首页 测试环境

    }
  },
  mounted() {
    var url = window.location.href
      // let url='http://h5prod.apsatcom.com/#/rechsuccess?billOrderId=1130'
      let id=url.split('=')[1]
    getPaymentRecordById({paymentId:id}).then((res)=>{
      console.log(res.data.data.payDate)
      this.time=res.data.data.payDate
      this.alipay=res.data.data.amount
      this.money=res.data.data.amount
    })
  }
}
</script>

<style scoped lang="less">

  @import url('../../style/main.less');
  .mint-header {
    background: @themecolor;
  }
  #success{
    background: @bgcolor;
    height: 100vh;
    .succes-top{
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      img{
        .w(90);
        .h(90);
        .mb(15)
      }
      .strong{
        color: green;
        .fz(18);
        font-weight: 600;
        .mb(15)
      }
    }
    .succes-center{
      background: white;
      .success-cen{
        display: flex;
        .padding(0,10,0,10);
        .h(40);
        .lh(40);
        border-bottom: 1px solid @bgcolor;
        .center-left{
          .fz(14);
          color: #6f6b67;
          .w(80)
        }
        .blue{
          .fz(14);
          font-weight: 600;
          color: #3A80CE;
        }
        .hui{
          .fz(12);
          color: #a2a4b6;
        }
      }
    }
  }

  .bottom{
    margin: auto;
    .w(310);
    .h(60);
    .fz(18);
    display: flex;
    justify-content: space-between;
    .bot-left{
      .w(150);
      .h(40);
      background: white;
      border: 1px solid #3A80CE;
      text-align: center;
      .lh(40);
      color: #3A80CE;
      .br(5);
    }
    .bot-right{
      .w(300);
      .h(40);
      background: #3A80CE;
      border: 1px solid #3A80CE;
      text-align: center;
      .lh(40);
      color: #ffffff;
      .br(5);
    }
  }
  .end{
    position: fixed;
   .w(375);
    bottom: 0;
  }
</style>
