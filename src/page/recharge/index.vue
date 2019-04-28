<template>
  <div class="rechargeRoot">
    <mt-header title="充值">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="rechargeSearch">
      <div class="searchInput">
        <input class="earchinput" type="text" v-model="searchValue" @blur="getuserInfo" placeholder="请输入上网账号">
        <div class="tuomin" v-if="name">{{name}} | 欠费金额: <span class="red">{{money}}元</span></div>
        <div class="tuomin" v-if="exist">该账户不存在</div>
      </div>
      <div class="rechargeType">
        <div
          v-for="(item,index) in rechargeTypeArr "
          :class="arry_now[index]==1?'active':'rechargeTypeItem'"
          :key="index"
          @click="selectItem(item,index)"
        >

          <div class="big">
            {{item.title}}
            <span v-if=" item.title !=='自定义金额' "> 元</span>
          </div>
          <div v-if=" item.title !=='自定义金额' " class="small">
            售价：{{item.money}}元
          </div>
          <div class="image" v-if="arry_now[index]==1">
            <img src="../../../static/image/u142.png" alt="">
          </div>
        </div>
        <div class="custom" v-if="customInput">
          <input type="number" v-model="customAcc" @blur="customFn" placeholder="00.00">
          <span>元</span>
        </div>
      </div>
      <!--<div class="btn" @click="buybuy">-->
      <div class="btn" :class="this.exist?'zhui':''" @click="wxapliy">
        立即支付{{rechargeBill}}<span v-if="!customInput">元</span><span v-if="yuan">元</span>
      </div>
      <div class="bto">
        <div class="blue">温馨提示</div>
        <div class="hui">1、本页仅支持您通过移动端（手机、PAD等可支持微信支付功能的终端）进行充值。</div>
        <div class="hui">2、充值前，请确认：</div>
        <div class="hui">&nbsp;&nbsp;&nbsp;&nbsp;1）您使用的终端已安装微信APP、且微信APP开通了支付功能。</div>
        <div class="hui">&nbsp;&nbsp;&nbsp;&nbsp;2）微信APP已在后台运行。</div>
        <div class="hui">3、充值后实时到账，若充值失败将于48小时内发起退款。</div>
      </div>
      <div class="buy" v-if="show" @click="hidden">

      </div>
      <div class="buy-box" v-if="show">
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

  </div>
</template>

<script>
import { Header } from 'mint-ui'
import { Indicator } from 'mint-ui'
import { MessageBox } from 'mint-ui'
import { qryUserInfoByAcct } from '../../api/means'
import { getPaymentDetail } from '../../api/means'
import { saveEleUnPayment } from '../../api/means'

export default {
  name: 'index',
  components: {
    Header
  },
  data() {
    return {
      searchValue: '',
      type: 1,
      exist: false,
      mvnoBusinessMark: '',
      show: false,
      name: '',
      money: '',
      noBuy: '',
      accoutId: '',
      customAcc: '',
      yuan: false,
      customInput: false,
      text: '上网账号',
      rechargeBill: '',
      arry_now: [],
      rechargeTypeArr: []
    }
  },
  methods: {
    getuserInfo() {
      if (!this.searchValue) {
        MessageBox('提示', '请输入上网账号')
        return
      } else {
        this.tuomin()
      }
    },
    tuomin() {
      Indicator.open()
      qryUserInfoByAcct({ account: this.searchValue }).then((res) => {
        Indicator.close()
        if (res.data.respCode === '0000') {
          let name = res.data.data.accountName
          this.mvnoBusinessMark = res.data.data.mvnoBusinessMark
          this.name = this.formatName(name)
          this.noBuy = true
          this.exist = false
          this.accoutId = res.data.data.accoutId
          this.getPaymentDetail(res.data.data.accoutId)
        } else {
          if (this.searchValue) {
            this.noBuy = false
            this.name = ''
            this.exist = true
            // MessageBox('提示', '请输入正确上网账号')
            return
          }
        }

      }).catch((err) => {
        Indicator.close()
      })
    },
    changeRadio() {
      // console.log('单选1')
      this.type = 1
    },
    changeRadio2() {
      // console.log('单选2')
      this.type = 2
    },

    getPaymentDetail(acctId) {
      Indicator.open()
      getPaymentDetail({ acctId }).then(res => {
        Indicator.close()
        if (res.data.respCode === '0000') {
          if (res.data.data.generalBalance > 0) {
            this.money = '0.00'
          } else {
            let money = Math.abs(res.data.data.generalBalance)
            this.money = money
          }

        }
      }).catch((err) => {
        Indicator.close()
      })
    },
    formatName(str) {
      var reg = /[a-zA-Z]/
      var reg2 = /[0-9]/
      var reg1 = /[\u4e00-\u9fa5]/
      console.log(str.length, 1111)
      if (reg.test(str)) {
        if (str.length <= 3) {
          return str
        } else {
          return '*' + str.substr(-3, 3)
        }

      } else if (reg1.test(str)) {
        if (str.length === 1) {
          return str
        } else {
          return '*' + str.substr(-1)
        }

      } else if (reg2.test(str)) {
        if (str.length <= 3) {
          return str
        } else {
          return '*' + str.substr(-3, 3)
        }

      } else {
        if (str.length === 1) {
          return str
        } else {
          return '*' + str.substr(-1)
        }
      }
    },
    getData() {
      this.rechargeTypeArr = [
        {
          title: '20',
          money: '20.00'
        },
        {
          title: '30',
          money: '30.00'
        },
        {
          title: '50',
          money: '50.00'
        },
        {
          title: '100',
          money: '100.00'
        },
        {
          title: '200',
          money: '200.00'
        },
        {
          title: '300',
          money: '300.00'
        },
        {
          title: '自定义金额'
        }
      ]
      var arry_now1 = []
      for (var i = 0; i < this.rechargeTypeArr.length; i++) {
        arry_now1.push(0)
      }

      arry_now1[3] = 1
      this.rechargeBill = this.rechargeTypeArr[3].title
      this.arry_now = arry_now1
    },
    customFn(e) {
      console.log(e.target.value,1111)
      if (!/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(e.target.value)) {
        MessageBox('提示', '请输入正确金额')
        return
      } else if (e.target.value == 0) {
        MessageBox('提示', '请输入正确金额')
        return
      } else {

        this.rechargeBill = e.target.value
        this.yuan = true
      }
    },
    buybuy() {
      this.type = 1
      if (!this.searchValue) {
        MessageBox('提示', '请输入上网账号')
        return
      }
      if (!this.rechargeBill) {
        MessageBox('提示', '请输入充值金额')
        return
      }
      if (this.noBuy) {
        this.show = true
      } else {

      }

    },
    hidden() {
      this.show = false
    },
    wxapliy() {
      if (this.exist) {
        return
      }
      if (!this.noBuy) {
        MessageBox('提示', '请输入正确上网账号')
        return
      }
      if (!this.rechargeBill) {
        MessageBox('提示', '请输入充值金额')
        return
      }
      let data = {
        acctId: this.accoutId,
        realReceived: this.rechargeBill,
        from: '6',
        mvnoBusinessMark: this.mvnoBusinessMark,
        loginUserId: 1,
        detailName: '充值交费',
        // redirectUrl: `http://h5prod.apsatcom.com/#/rechsuccess`,//开发环境
        redirectUrl: 'http://h5.apsatcom.com:5091/#/rechsuccess',
        // redirectUrl: `http://localhost:8080/#/rechsuccess?acctId${this.accoutId}`,
        loginUserName: 'H5用户'

      }
      Indicator.open()
      saveEleUnPayment(data).then((res) => {
        Indicator.close()
        if (res.data.respCode === '0000') {
          // console.log(res)
          window.location.href = res.data.data.url
        }

      }).catch((err) => {
        Indicator.close()
      })

    },
    selectItem(i, e) {
      let idx_s = e
      for (var k = 0; k < this.arry_now.length; k++) {
        if (idx_s === k) {
          this.arry_now[k] = 1
        } else {
          this.arry_now[k] = 0
        }
      }
      if (i.title !== '自定义金额') {
        this.rechargeBill = i.title
        this.customInput = false
        this.yuan = false
      } else {
        this.customInput = true
        this.rechargeBill = this.money
        this.customAcc=this.money

      }
    }
  },
  mounted() {
    this.getData()
    this.searchValue = this.$store.state.accountId
    this.tuomin()
  }

}

</script>

<style scoped lang="less">
  @import url('../../style/main.less');

  .mint-header {
    background: @themecolor;
  }

  .rechargeSearch {

    .searchInput {
      .padding(20, 0, 0, 7);
      .h(70);

      .earchinput {

        .h(35);
        .w(360);
        border: 1px solid #cccccc;
        .br(5);
        margin: 0 auto;

      }
    }

    .tuomin {
      .fz(10);
      color: #8b8182;
      .mt(5);

      .red {
        color: red;
      }
    }

    .rechargeType {
      .w(360);
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;

      .rechargeTypeItem {
        .w(108);
        .h(60);
        border: 1px solid #a5a4a4;
        .br(5);
        .mb(15);
        .mr(8);
        position: relative;

        .image {
          position: absolute;
          .left(87);
          .top(38);

        }

        text-align: center;

        .big {
          .fz(16px);
          .mt(15);
          .mb(5);
        }

        .small {
          .fz(10);
          color: #a5a4a4;
        }
      }
    }

    .custom {
      .h(20);
      .w(110);
      .padding(40, 0, 0, 5);

      input {
        border: none;
        border-bottom: 1px solid #a5a4a4;
        .w(80);
        .h(20);
        text-align: center;
        .padding(0, 0, 0, 5);
      }
    }

    .btn {
      .w(320);
      .h(40);
      .lh(40);
      text-align: center;
      background: #3A80CE;
      color: white;
      margin: 0 auto;
      .br(5);
      .mt(40);
    }

    .bto {
      .w(350);
      margin: 0 auto;
      .mt(50);

      .blue {
        .fz(10);
        color: #3A80CE;

      }

      .hui {
        .fz(10);
        color: #999999;
      }
    }

    .active {
      border: 1px solid #3A80CE;
      .w(108);
      .h(60);
      overflow: hidden;
      .br(5);
      .mb(15);
      .mr(8);
      position: relative;

      .image {
        position: absolute;
        .left(88);
        .top(38);
        .w(22);
        .h(22);

        img {
          .w(22);
          .h(22);
        }
      }

      text-align: center;

      .big {
        .fz(16px);
        .mt(15);
        .mb(5);
      }

      .small {
        .fz(10);
        color: #a5a4a4;
      }
    }
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

  .zhui {
    background: #c3c3c3 !important;
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
