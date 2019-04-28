<template>
  <div id="sign">
    <mt-header title="个人上网账号注册">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="sign-box">
      <div class="top">
        <div class="storng ht">当前服务所在的小站</div>
        <div class="ht"><span class="fontsize">小站名称</span> <span class="storng">{{small}}</span></div>
        <div class="storng ht">根据国家实名制要求，请提供身份证信息</div>
      </div>
      <div class="center">
        <div class="ht layout">
          <div class="left"><span class="red">*</span><span>姓名</span></div>
          <div class="right"><input type="text" v-model="username" @input="nameOnChange" :maxlength="maxLength" placeholder="请输入证件姓名">
          </div>
        </div>
        <div class="ht layout">
          <div class="left"><span class="red">*</span><span class="hui">身份证</span></div>
          <div class="right">
            <input type="text" v-model="userNumber" @input="numberOnChange" :maxlength="maxLength" placeholder="请输入证件号码">
          </div>
        </div>
        <div class="ht layout">
          <div class="left"><span class="red">*</span><span class="hui">手机号码</span></div>
          <div class="right"><input type="text" v-model="tel" @blur="telone" maxlength="11" placeholder="请输入11位手机号码">
          </div>
        </div>
        <div class="ht layout">
          <div class="left"><span class="red">*</span><span class="hui">居住地址</span>
          </div>
          <div class="right"><input type="text" v-model="address" @input="addressOnChange" :maxlength="maxLength"  placeholder="请输入居住地址">
          </div>
        </div>
      </div>
      <div class="hui-bg storng">套餐信息</div>
      <div class="write">
        <div class="ht layout back " @click="choice">
          <div class="left"><span class="red">*</span><span class="hui">选择套餐</span>
          </div>
          <div class="right">
            <div class=" storng  name">{{name}}</div>
          </div>
        </div>
      </div>
      <div class="hui-bg storng">账号密码登录</div>
      <div class="write">
        <div class="ht layout">
          <div class="left"><span class="red">*</span><span class="hui">登录账号</span>
          </div>
          <div class="right"><input type="text" v-model="userId" maxlength="16" placeholder="登录账号支持6-16位英文、数字、_组合">
          </div>
        </div>
        <div class="ht layout">
          <div class="left"><span class="red">*</span><span class="hui">登录密码</span>
          </div>
          <div class="right"><input type="password" v-model="password" maxlength="16" placeholder="登录密码支持6-16位英文、数字、_组合">
          </div>
        </div>
        <div class="ht layout">
          <div class="left"><span class="red">*</span><span class="hui">确认密码</span>
          </div>
          <div class="right"><input type="password" v-model="password1" maxlength="16" placeholder="请再次输入登录密码">
          </div>
        </div>
      </div>

    </div>

    <div class="btn">
      <div @click="signIn">注册</div>
    </div>
    <div class="bto">
      <div class="blue">温馨提示</div>
      <div class="hui">1、本页仅支持您已连接卫星链路WIFI情况下注册个人上网账号。</div>
      <div class="hui">2、个人上网账号仅在您登陆的卫星终端使用，若超出使用范围，有可能无法登陆。若出现问题，请联系我司客服人员，联系电话：400-838-9900。</div>
    </div>
  </div>
</template>

<script>
import { Header } from 'mint-ui'
import { Cell } from 'mint-ui'
import { MessageBox } from 'mint-ui'
import { addPerAccount } from '../../api/means'
import { Indicator } from 'mint-ui';
import { userInfoDetail } from '../../api/means'

import { getPaymentDetail } from '../../api/means'
export default {
  name: 'index',
  components: {
    Header,
    Cell
  },
  data () {
    return {
      small:'',
      name: '套餐名称',
      username: '',
      userNumber: '',
      address: '',
      wangluo:true,
      tel: '',
      userId:'',
      mvnoBusinessMark:'',
      password: '',
      password1: '',
      vsat_id:'',
      maxLength: null
    }
  },
  methods: {
    choice() {
      let data = {
        userId:this.userId,
        username: this.username,
        userNumber: this.userNumber,
        address: this.address,
        tel: this.tel,
        password: this.password,
        password1: this.password1

      }
      this.$store.state.sign = data
      this.$router.replace({ path: '/choice', query: { type: 2} })
    },
    nameOnChange () {
      if (!this.username) return false;
      let object = this.$filterNote(this.username,32)
      this.maxLength = object.maxLength
      this.username = object.content
    },
    numberOnChange(){
      if (!this.userNumber) return false;
      let object = this.$filterNote(this.userNumber,20)
      this.maxLength = object.maxLength
      this.userNumber = object.content
    },
    //余额查询
    getPaymentDetail (acctId) {
      getPaymentDetail({ acctId }).then(res => {
        if (res.data.respCode === '0000') {
          let money = res.data.data.generalBalance
          // console.log(money,'钱钱钱')
          if(money<0){
            this.arrearage=false
            // console.log('没钱了')
          }else {
            this.arrearage=true
            // console.log('有钱')
          }
        }
      }).catch((err)=>{
        Indicator.close()
      })
    },
    //用户信息详情查询
    userInfo(){
      let data={
        userId:this.vsat_id,
        userType:2,
        mvnoBusinessMark:this.mvnoBusinessMark
      }
      userInfoDetail(data).then((res)=>{
        // console.log(res,'用户信息')
        if(res.data.respCode==='0000'){
            // this.small=res.data.data[0].userName
          this.acctId=res.data.data[0].accouts[0].accoutId
          this.$store.state.acctId=res.data.data[0].accouts[0].accoutId
          this.getPaymentDetail (this.acctId)
        }
      }).catch((err)=>{
        Indicator.close()
      })
    },
    addressOnChange(){
      if (!this.address) return false;
      let object = this.$filterNote(this.address, 256)
      this.maxLength = object.maxLength
      this.address = object.content
    },

    telone(){
      this.userId=this.tel
    },
    xiaozhanID(){



      let url='http://218.249.69.213:60024/rest/user/userInfo'
        // let url='http://10.129.102.188:8051/rest/user/userInfo'
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
          this.small=res.data.user_name
         this.mvnoBusinessMark=res.data.vno_id
         this.vsat_id=res.data.vsat_id
         this.$store.state.mvnoBusinessMark=res.data.vno_id
         this.$store.state.userId=res.data.vsat_id

         this.userInfo()
       }else {
         // console.log('请求失败1')
       }
     }).catch((err)=>{
       // console.log(err,'请求失败2')
      //写死数据
       Indicator.close();
       this.small='aa0409'
       this.mvnoBusinessMark='ZQ001'
       this.vsat_id=100002177
       this.$store.state.mvnoBusinessMark='ZQ001'
       this.$store.state.userId=100002177

/*
       this.wangluo=false
       Indicator.close();
       MessageBox('提示', '当前网络不支持此功能')
       return*/

     })
    },
    signIn() {
      if(!this.wangluo){
        MessageBox('提示', '当前网络不支持此功能')
        return
      }
      if (!this.username) {
        MessageBox('提示', '请输入证件姓名')
        return
      }
      if (!this.userNumber) {
        MessageBox('提示', '请输入证件号码')
        return
      }
      var reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
      if (!reg.test(this.userNumber)) {
        MessageBox('提示', '请输入正确证件号码')
        return
      }
      if (!(/^1[34578]\d{9}$/.test(this.tel))) {
        MessageBox('提示', '请输入11位手机号')
        return
      }
      if (!this.address) {
        MessageBox('提示', '请输入居住地址')
        return
      }
      if (!this.userId) {
        MessageBox('提示', '请输入登陆账号')
        return
      }
      if (!this.name) {
        MessageBox('提示', '请选择套餐')
        return
      }
      if (!this.password) {
        MessageBox('提示', '请输入登录密码')
        return
      }
      if (!this.password1) {
        MessageBox('提示', '请再次输入登录密码')
        return
      }
      if (this.password !== this.password1) {
        MessageBox('提示', '两次密码输入不一致')
        return
      }
      if (!/^[a-zA-Z0-9_]{6,16}$/.test(this.password1)) {

        MessageBox('提示', '长度支持6-16位，请使用字母、数字、下划线')
        return
      }
      if (!/^[a-zA-Z0-9_]{6,16}$/.test(this.userId)) {
        MessageBox('提示', '长度支持6-16位，请使用字母、数字、下划线')
        return
      }
      let obj = {
        userId:this.userId,
        username: this.username,
        userNumber: this.userNumber,
        address: this.address,
        tel: this.tel,
        password: this.password,
        password1: this.password1

      }
      this.$store.state.sign = obj
      this.register()
    },
    register() {
      let data = {
        busiType: 'servyt10',
        source: '3',
        mvnoBusinessMark: this.mvnoBusinessMark,
        // loginUserId: JSON.parse(sessionStorage.getItem('objj')).loginUserId,
        customerName: this.username,
        customerAddr: this.address,
        certType: '01',
        certNo: this.userNumber,
        contactPerson: this.username,
        telephone: this.tel,
        loginName: this.userId,
        loginPassword: this.password1,
        productInfo: [{
          productId: this.$store.state.prodList.prodInfo.productId,
          productName: this.$store.state.prodList.prodInfo.productName,
          productType: this.$store.state.prodList.prodInfo.productType,
          productDesc: this.$store.state.prodList.prodInfo.productDesc,
          effDate: '',
          expDate: ''
        }],
        packageInfo: [{
          productId: this.$store.state.prodList.prodInfo.productId,
          packageId: this.$store.state.prodList.prodPackageId,
          packageName: this.$store.state.prodList.prodPackageName,
          rateId: this.$store.state.prodList.rateId,
          packageDesc:this.$store.state.prodList.prodPackageDesc,
          packageType: this.$store.state.prodList.prodPackageType,
          effDate: '',
          expDate: ''
        }],
        elementInfo: [{
          packageId: this.$store.state.prodList.prodPackageId,
          elementId: this.$store.state.prodList.pkgElementId,
          discntId: this.$store.state.prodList.discntId,
          elementName: this.$store.state.prodList.pkgElementName,
          elementType: this.$store.state.prodList.pkgElementType,
          elementDesc: this.$store.state.prodList.prodElementDesc,
          effDate: '',
          expDate: ''
        }],
        smallStationInfo: [{
          userId: this.vsat_id,
          smallStationName: 'sss',
          customerName: this.username,
          networkType: '01',
          createTime: '2018-02-20 22:22:22',
          status: 0
        }]
      }
      Indicator.open();
      addPerAccount(data).then((res) => {
        Indicator.close();
        if (res.data.respCode === '0000') {
          this.$store.state.successNum=res.data.data
          this.$store.state.successName=this.name
          this.$store.state.small=this.small
          this.$router.replace({path:'/regsuccess'})
        }else  {
          this.$store.state.defeated=res.data.respDesc
          this.$router.replace({path:'/regfailure'})
        }
      }).catch((err)=>{
        Indicator.close()
      })
    }
  },

  created() {
    let data = this.$store.state.sign
    this.userId=data.userId
    this.name = this.$store.state.name
    this.username = data.username
    this.userNumber = data.userNumber
    this.address = data.address
    this.tel = data.tel
    this.password = data.password
    this.password1 = data.password1

  },
  mounted() {

    this.xiaozhanID()
  }
}

</script>

<style scoped lang="less">
  @import url('../../style/main.less');
  .bto {
    .w(350);
    margin: 0 auto;
    .mt(20);

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
    /*height: 100vh;*/
    background: @bgcolor;
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
      .h(120);
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
    .name {
      .fz(14)
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
          .w(250);
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
  }
</style>
