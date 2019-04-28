<template>
  <div class="success">
    <mt-header title="注册成功">
      <router-link to="/sign" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="succes-box">
      <div class="succes-top">
        <img src="../../../static/image/rig_01.png" alt="">
        <div class="green-font">业务受理成功！</div>
        <div class="number1">订单流水号{{number}}</div>
        <div class="number2">上网账号{{num}}</div>
        <div class="jieshao"> 尊敬的用户您已经成功订购 <span class="blue">{{name}}</span> 感谢您的使用!</div>

      </div>
      <div class="red" v-if="show">当前账户需要支付{{money}}元，请立即支付!</div>
    </div>
    <div class="end">
      <div class="bottom">
        <div class="bot-left" @click="gohome">跳转至首页</div>
        <div class="bot-right" @click="wxapliy">{{this.show?'去支付':'去充值'}}</div>
      </div>
    </div>
    <div class="buy" v-if="motaishow" @click="hidden"></div>
    <div class="buy-box" v-if="motaishow">
      <div class="buy-font">支付方式选择</div>
      <div class="quanxian-option">
        <div class="wx">
          <img src="../../../static/image/wx_05.png" alt="">
          <div class="xxxx"> 微信支付</div>
          <input class="radio-btn" type="radio" id="one" name="apily" checked="checked" @change="changeRadio">
          <label for="one"></label>
        </div>
        <div class="wx">
          <img src="../../../static/image/zfb_05.png" alt="">
          <div class="xxxx">支付宝支付</div>
          <input class="radio-btn" type="radio" id="two" name="apily" @change="changeRadio2">
          <label for="two"></label>
        </div>
      </div>
      <div class="gobuy" @click="wxapliy">去付款</div>
    </div>

  </div>

</template>

<script>
import { Header } from 'mint-ui'
import { MessageBox } from 'mint-ui'
import { getPaymentDetail } from '../../api/means'
import { userInfoDetail } from '../../api/means'
import { qryUserInfoByAcct } from '../../api/means'
import { selectMonthlyRentalTariffValueByPricingPlanId } from '../../api/means'
import { saveEleUnPayment } from '../../api/means'
import { Indicator } from 'mint-ui';
export default {
  name: 'index',
  components: {
    Header
  },
  data() {
    return {
      motaishow: false,
      number: '',
      miaoshu: '',
      userId: '',
      num: '',
      name: '',
      show: false,
      money: ''
    }
  },
  methods: {
    buybuy() {
      this.motaishow = true
      this.type = 1
    },
    gohome() {
      this.$router.replace({ path: '/' })
    },
    changeRadio() {
      this.type = 1
    },
    changeRadio2() {
      this.type = 2
    },
    selectMonthlyd(){
      Indicator.open();
      selectMonthlyRentalTariffValueByPricingPlanId({pricingPlanId:this.$store.state.prodList.discntId}).then((res)=>{
        Indicator.close();
        if(res.data.respCode==='0000'){
          this.money=this.money - res.data.data
          if(this.money<0){
            this.show=true
            this.money=Math.abs(this.money)
          }
        }
      })
    },
    hidden() {
      this.motaishow = false
    },
    wxapliy() {
      if(this.show){
        let data={
          acctId:this.$store.state.acctId,
          realReceived : this.money,
          from:'6',
          // mvnoBusinessMark: JSON.parse(sessionStorage.getItem('objj')).mvnoBusinessMark,
          mvnoBusinessMark: this.$store.state.mvnoBusinessMark,
          loginUserId: 1,
          detailName:'充值交费',
          // redirectUrl:'http://h5prod.apsatcom.com', //开发环境
          redirectUrl:'http://http://h5.apsatcom.com:5091/#/rechsuccess',
          loginUserName:'H5用户'

        }
        Indicator.open();
        saveEleUnPayment(data).then((res) => {
          Indicator.close();
          if(res.data.respCode==='0000'){
            window.location.href=res.data.data.url;
          }

        }).catch((err)=>{
          Indicator.close()
        })
      }else {
        this.$store.state.accountId = this.$store.state.sign.userId
        this.$router.replace({path:'/recharge'})
      }

    },
    userInfo(){
      let data={
        userId:this.$store.state.userId,
        userType:2,
        mvnoBusinessMark: this.$store.state.mvnoBusinessMark,
      }
      userInfoDetail(data).then((res)=>{
        if(res.data.respCode==='0000'){
          this.acctId=res.data.data[0].accouts[0].accoutId
          this.$store.state.acctId=res.data.data[0].accouts[0].accoutId
          this.getPaymentDetail (this.acctId)
        }
      }).catch((err)=>{
        Indicator.close()
      })
    },
    getPaymentDetail(acctId) {
      Indicator.open();
      getPaymentDetail({ acctId }).then(res => {
        Indicator.close();
        if (res.data.respCode === '0000') {

          if(res.data.data.generalBalance<0){
            this.show=true
          }
          this.money = Math.abs(res.data.data.generalBalance)
          console.log(res.data.data.generalBalance,'余额')
          // this.selectMonthlyd()
        }
      }).catch((err)=>{
        Indicator.close()
      })
    }

  },
  created() {
    this.num=this.$store.state.sign.userId
    this.number = this.$store.state.successNum
    this.name = this.$store.state.successName
    this.userId = this.$store.state.sign.userId
    this.miaoshu = this.$store.state.prodList.prodPackageDesc
  },
  mounted() {
/*
    Indicator.open();
    qryUserInfoByAcct({ account: this.userId }).then((res) => {
      Indicator.close();
      if (res.data.respCode === '0000') {
        this.getPaymentDetail(res.data.data.accoutId)
      }
    }).catch((err)=>{
      Indicator.close()
    })
*/
this.userInfo()
  }
}
</script>

<style scoped lang="less">
  @import url('../../style/main.less');

  .mint-header {
    background: @themecolor;
  }

  .succes-top {
    display: flex;
    flex-direction: column;
    align-items: center;
    .w(230);
    margin: 0 auto;
    .mt(100);

    img {
      .w(85);
      .h(85);
      .mb(15)
    }

    .green-font {
      color: #008000;
      font-weight: 600;
      .fz(16);
      .mb(15)
    }

    .number1 {
      .fz(12);
      color: #565061;
      .mb(15)
    }

    .number2 {
      .fz(18);
      font-weight: 600;
      .mb(15);
    }

    .jieshao {
      .fz(12);
      color: #565061;
      .mb(70);

      .blue {
        color: #3A80CE;
      }
    }

  }

  .red {
    .w(280);
    margin: 0 auto;
    color: red;
    .fz(16)
  }

  .bottom {
    margin: auto;
    .w(310);
    .h(60);
    .fz(18);
    display: flex;
    justify-content: space-between;

    .bot-left {
      .w(150);
      .h(40);
      border: 1px solid #3A80CE;
      text-align: center;
      .lh(40);
      color: #3A80CE;
      .br(5);
    }

    .bot-right {
      .w(140);
      .h(40);
      background: #3A80CE;
      border: 1px solid #3A80CE;
      text-align: center;
      .lh(40);
      color: #ffffff;
      .br(5);
    }
  }

  .end {
    position: fixed;
    .w(375);
    bottom: 0;
  }

  .buy {
    .w(375);
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
  }

  .buy-box {
    background: white;
    .w(300);
    .h(180);
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    .br(20);

    .buy-font {
      .fz(16);
      font-weight: 600;
      text-align: center;
      width: 100%;
      .mt(5);

    }

    .wx {
      width: 100%;
      .h(50);
      border-bottom: 1px solid #F2F2F2;
      display: flex;

      img {
        .w(30);
        .mt(10);
        .ml(10);
        .h(30);

      }

      div {
        .fz(16);
        .lh(50);
        .ml(10);
      }
    }

    .gobuy {
      background: #3A80CE;
      .w(80);
      .h(30);
      .br(5);
      color: white;
      text-align: center;
      .lh(30);
      margin: 0 auto;
      .mt(10)
    }
  }

  .xxxx {
    .w(180);
  }

  input[type="radio"] {

    .w(20);
    .h(20);
    opacity: 0;
    .mt(10)
  }

  label {

    /*position: absolute;*/
    /*left: 5px;*/
    /*top: 8px;*/
    .w(20);
    .h(20);
    .mt(15);
    border-radius: 50%;
    border: 1px solid #999;
  }

  /*设置选中的input的样式*/
  /* + 是兄弟选择器,获取选中后的label元素*/
  input:checked + label {
    background-color: #006eb2;
    border: 1px solid #006eb2;
  }

  input:checked + label::after {
    position: absolute;
    content: "";
    .w(5);
    .h(10);
    top: 3px;
    left: 6px;
    border: 2px solid #fff;
    border-top: none;
    border-left: none;
    transform: rotate(45deg)
  }
</style>
