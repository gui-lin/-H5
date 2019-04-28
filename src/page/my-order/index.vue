<template>
  <div id="sign">
    <mt-header title="个人流量包订购">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="sign-box">
      <div class="top storng">
        请输入账号密码
      </div>
      <div class="center">
        <div class="ht layout">
          <div class="left"><span class="red">*</span><span class="hui">登录账号</span></div>
          <div class="right"><input type="text" v-model="username" placeholder="请输入上网账号" maxlength="16">
          </div>
        </div>
        <div class="ht layout">
          <div class="left"><span class="red">*</span><span class="hui" >登录密码</span></div>
          <div class="right">
            <input type="password" v-model="password" maxlength="16" placeholder="请输入登录密码(账号注册时填写)">
          </div>
        </div>

      </div>
      <div class="hui-bg storng ">流量包订购</div>
      <div class="write">
        <div class="ht layout back" @click="goChoice">
          <div class="left"><span class="red">*</span><span class="hui">选择流量包</span>
          </div>
          <div class="right">
            <div class=" storng small sss">{{name}}</div>
          </div>
        </div>
      </div>

    </div>

    <div class="btn">
      <div @click="buy">订购</div>

    </div>
    <div class="bto">
      <div class="blue">温馨提示</div>
      <div class="hui">1、本页仅支持您通过移动端（手机、PAD等可支持微信支付功能的终端）订购个人流量包。</div>
      <div class="hui">2、充值前，请确认：</div>
      <div class="hui">&nbsp;&nbsp;&nbsp;&nbsp;1）您使用的终端已安装微信APP、且微信APP开通了支付功能。</div>
      <div class="hui">&nbsp;&nbsp;&nbsp;&nbsp;2）微信APP已在后台运行。</div>
      <div class="hui">3、订购后立即生效，若订购失败且系统已扣费，将于48小时内发起退款。</div>
    </div>
  </div>
</template>

<script>
import { Header } from 'mint-ui'
import { Cell } from 'mint-ui'
import { MessageBox } from 'mint-ui'
import { checkAccountPassword } from '../../api/means'
import { addPersonalPackage } from '../../api/means'
import { userInfoDetail } from '../../api/means'
import { qryUserInfoByAcct } from '../../api/means'
import { getPaymentDetail } from '../../api/means'
import { Indicator} from 'mint-ui';
export default {
  name: 'index',
  components: {
    Header,
    Cell
  },
  data() {
    return {
      name: '',
      arrearage:true,
      userId:'',
      mvnoBusinessMark: '',
      status:'',
      wangluo:true,
      acctId:'',//账户id
      username: '',
      accoutId:'',
      password: ''
    }
  },
  methods: {
    goChoice() {
      this.$store.state.user.username = this.username
      this.$store.state.user.password = this.password
      this.$router.replace({ path: '/choice', query: { type: 1 } })
    },
    buy() {
      console.log(this.status,"-------------")
      if(!this.wangluo){
        MessageBox('提示', '当前网络不支持此功能')
        return
      }
      if(!this.arrearage){
        MessageBox('提示', '当前账户余额不足')
        return
      }

        this.$store.state.user.username = this.username
        this.$store.state.user.password = this.password
        if (!this.username) {
          MessageBox('提示', '请输入上网账号')
        } else if (!this.password) {
          MessageBox('提示', '请输入正确登录密码')
        } else if (!this.name) {
          MessageBox('提示', '请选择流量包')
        } else {
          MessageBox.confirm(`确认订购${this.name}?`).then(action => {
            let data = {
              account: this.username,
              password: this.password,
              // mvnoBusinessMark: mvnoBusinessMark,
              mvnoBusinessMark:this.mvnoBusinessMark,
            }
            checkAccountPassword(data).then((res) => {
              if (!res.data.data.isSuccess) {
                MessageBox('提示', '用户账号密码不匹配')
              } else {
                this.order()
              }
            }).catch((err)=>{
              Indicator.close()
            })
          })
          // let { loginUserId } = JSON.parse(sessionStorage.getItem('objj'))
          // let { mvnoBusinessMark } = JSON.parse(sessionStorage.getItem('objj'))

        }
      ;


    },
    order() {
      // let { loginUserId } = JSON.parse(sessionStorage.getItem('objj'))
      // let { mvnoBusinessMark } = JSON.parse(sessionStorage.getItem('objj'))
      let data = {
        busiType: 'servyt12',
        source: 3,
        // loginUserId:loginUserId,
        // mvnoBusinessMark: mvnoBusinessMark,
        mvnoBusinessMark:this. mvnoBusinessMark,
        loginName: this.username,
        productInfo: [{
            productId: this.$store.state.prodList.prodInfo.productId,
            productName: this.$store.state.prodList.prodInfo.productName,
            productType: this.$store.state.prodList.prodInfo.productType,
          productDesc: this.$store.state.prodList.prodInfo.productDesc
          }],
        packageInfo: [{
          productId: this.$store.state.prodList.prodInfo.productId,
          packageId: this.$store.state.prodList.prodPackageId,
          packageName: this.$store.state.prodList.prodPackageName,
          rateId:this.$store.state.prodList.rateId,
          packageType: this.$store.state.prodList.prodPackageType,
          packageDesc:this.$store.state.prodList.prodPackageDesc,
        }],
        elementInfo: [{
          packageId: this.$store.state.prodList.prodPackageId,
          elementId: this.$store.state.prodList.pkgElementId,
          discntId: this.$store.state.prodList.discntId,
          elementName: this.$store.state.prodList.pkgElementName,
          elementType: this.$store.state.prodList.pkgElementType,
          elementDesc: this.$store.state.prodList.prodElementDesc
        }],
        userInfo:[{
          // userId:JSON.parse(sessionStorage.getItem('objj')).userId,
          userId:this.userId,
          userName:'ss',
          networkType:'01',
          userType:'02',
          customerName:'22',
          createTime:'2018-02-20 22:22:22',
          basebandNo:'111'
        }],
        loginPassword: this.password
      }
      Indicator.open();
      addPersonalPackage(data).then((res) => {
        Indicator.close();
        if(res.data.respCode==='0000'){
          this.$store.state.orderNo=res.data.data.orderNo
          this.$store.state.packageName=res.data.data.packageName
          this.$router.replace({path:'/ordersuccess'})
        }else {
          this.$store.state.defeated=res.data.respDesc
          this.$router.replace({path:'/orderfailure'})
        }
      }).catch((err)=>{
        Indicator.close()
      })
    },
    //用户信息详情查询
    userInfo(){
     /* let data={
        // userId:JSON.parse(sessionStorage.getItem('objj')).userId,
        userId:this.userId,
        userType:2,
        // mvnoBusinessMark:JSON.parse(sessionStorage.getItem('objj')).mvnoBusinessMark
        mvnoBusinessMark:this.mvnoBusinessMark
      }
      userInfoDetail(data).then((res)=>{
        // console.log(res,'用户信息')
        if(res.data.respCode==='0000'){
          // console.log(res.data.data[0].accouts[0].accoutId,'2222222222')
          this.acctId=res.data.data[0].accouts[0].accoutId
          this.$store.state.acctId=res.data.data[0].accouts[0].accoutId
          this.getPaymentDetail (this.acctId)
        }
      }).catch((err)=>{
        Indicator.close()
      })*/
      qryUserInfoByAcct({ account: this.username }).then((res) => {
        Indicator.close()
        if (res.data.respCode === '0000') {
          this.mvnoBusinessMark=res.data.data.mvnoBusinessMark
          this.accoutId = res.data.data.accoutId
          this.status=res.data.data.status
          this.$store.state.acctId=res.data.data.accoutId
          this.getPaymentDetail(res.data.data.accoutId)
        }

      }).catch((err)=>{
        Indicator.close()
      })
    },
    //获取小站id
    xiaozhanID(){
      // let url='http://218.249.69.213:60024/rest/user/userInfo'
      let url='http://10.129.102.188:8051/rest/user/userInfo'
      let data={
        "serial_number":"10001"
      }
      Indicator.open();
      this.$axios.defaults.timeout =  500;
      this.$axios.post(url,data).then((res)=>{
        console.log(res,'成功了')
        this.wangluo=true
        Indicator.close();
        if(res.status===200){

          this.mvnoBusinessMark=res.data.vno_id
          this.userId=res.data.vsat_id
          this.$store.state.mvnoBusinessMark=res.data.vno_id
          this.$store.state.userId=res.data.vsat_id
          this.userInfo()
        }else {
          // console.log('请求失败1')
        }
      }).catch((err)=>{
        // console.log(err,'请求失败2')
        Indicator.close();
        this.mvnoBusinessMark='ZQ001'
        this.userId=100002177
        this.$store.state.mvnoBusinessMark='ZQ001'
        this.$store.state.userId=100002177

   /*     Indicator.close();
        this.wangluo=false
        MessageBox('提示', '当前网络不支持此功能')
        return*/
      })
    },
    //余额查询
    getPaymentDetail (acctId) {
      getPaymentDetail({ acctId }).then(res => {
        if (res.data.respCode === '0000') {
          let money = res.data.data.generalBalance
          console.log(money,'钱钱钱')
          if(money<0){
            this.arrearage=false
            console.log('没钱了')
          }else {
            this.arrearage=true
            console.log('有钱')
          }
        }
      }).catch((err)=>{
        Indicator.close()
      })
    },

  },
  mounted() {
    this.name = this.$store.state.name
    let obj = this.$store.state.user
    this.username = obj.username
    this.password = obj.password
    this.xiaozhanID()
  }
}
</script>

<style scoped lang="less">
  @import url('../../style/main.less');
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
  #sign {
    height: 100vh;
    background: @bgcolor;
    .mint-msgbox-btns{
      height: 50px !important;
    }
    .mint-msgbox-btn{
      font-size: 20px;
    }
    .mint-header {
      background: @themecolor;
    }
    .sign-box {
      .mb(60)
    }
    .fontsize {
      .fz(16)
    }
    .top {
      .padding(0, 5, 0, 5);
      .h(50);
      .lh(50);
      display: flex;
      flex-direction: column;
      justify-content: space-between;

    }
    .ht {
      .h(39);
      border-bottom: 1px solid #eaeaea;
      .lh(39)
    }
    .center {
      .padding(0, 5, 0, 5);
      background: white;
    }
    .hui-bg {
      .h(40);
      background: @bgcolor;
      .lh(40)
    }
    .storng {
      font-weight: 600;
      .fz(16)
    }
    .small {
      .fz(14);
    }
    .layout {
      display: flex;
      .left {
        .fz(14);
        .w(80);
        .red {
          color: red;
        }
        .hui {
          color: #4b576e;
        }
      }
      .right {
        flex: 1;
        display: flex;
        input {
          .margin(10, 0, 0, 0);
          border: none;
          .h(20);
          .w(200);
          .fz(12)
        }
        .warning {
          color: red;
          .fz(10);
          display: flex;
          img {
            .h(12);
            .w(12);
            .margin(14, 0, 0, 0);
          }
        }
      }
    }
    .write {
      .padding(0, 5, 0, 5);
      background: white;
    }
    .btn {
      /*background: white;*/
      /*position: fixed;*/
      /*left: 0;*/
      /*bottom: 0;*/
      .mt(50);
      width: 100%;
      .h(50);
      div {

        margin: 0 auto;
        text-align: center;
        color: white;
        .w(320);
        .h(40);
        .lh(40);
        .br(5);
        background: #3A80CE;
      }
    }
    .back {
      background: url("../../../static/image/bank.png") no-repeat right center;
    }
    .sss {
      .padding(0, 0, 0, 10)
    }
  }
</style>
