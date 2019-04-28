<template>
  <div id="choice">
    <mt-header :title=type>
      <router-link :to="this.$route.query.type === 1?'/myorder':'/sign'" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="box">
      <div v-for="(item,index) in choicelist"
           :key="index"
           :class="arry_now1[index]==1?'active':'son'"
           @click="selectItem(item,index)">
        <div>{{item.prodPackageName}}</div>
      </div>

    </div>
    <div class="boo">{{choice}}</div>
    <div class="btn">
      <div @click="back">确定</div>
    </div>
  </div>
</template>

<script>
import { Header } from 'mint-ui'
import { qryPackageInfoList } from '../../api/means'
import { Indicator } from 'mint-ui';
export default {
  name: 'index',
  components: {
    Header
  },
  data() {
    return {
      choicelist: [],
      type:'',
      choice: '',
      name: '',

      prodList:[],
      arry_now1: []
    }

  },
  methods: {
    getList() {

      // let { mvnoBusinessMark } = JSON.parse(sessionStorage.getItem('objj'))
      if(this.$route.query.type === 1){
        var data = {
          packageType: '02',
          productModel: '01',
          // mvnoBusinessMark: mvnoBusinessMark,
          mvnoBusinessMark:this.$store.state. mvnoBusinessMark,

          pageNo: 1,
          pageSize: 20
        }
      }else if(this.$route.query.type === 2){
        var data = {
          packageType: '00',
          productModel: '01',
          // mvnoBusinessMark: mvnoBusinessMark,
          mvnoBusinessMark:this.$store.state. mvnoBusinessMark,
          pageNo: 1,
          pageSize: 20
        }
      }
      Indicator.open();
      qryPackageInfoList(data).then((res) => {
        Indicator.close();
        if (res.data.respCode === '0000') {
          this.choicelist = res.data.data.rows
          var arry_now1 = []
          for (var i = 0; i < this.choicelist.length; i++) {
            arry_now1.push(0)
          }
          arry_now1[0] = 1
          this.choice = `${this.choicelist[0].prodPackageName} : ${this.choicelist[0].pkgElementName}; ${this.choicelist[0].prodPackageDesc}`
          this.name = this.choicelist[0].prodPackageName
          this.prodList=this.choicelist[0]
          this.arry_now1 = arry_now1
        }
      }).catch((err)=>{
        Indicator.close()
      })

    },
    selectItem(i, e) {
      for (var k = 0; k < this.arry_now1.length; k++) {
        if (e === k) {
          this.arry_now1[k] = 1
        } else {
          this.arry_now1[k] = 0
        }
      }
      this.choice = i.prodPackageName + ' : ' + i.pkgElementName + '; ' + i.prodPackageDesc
      this.name = i.prodPackageName
      this.prodList=i
    },
    back() {
      this.$store.state.name = this.name
      this.$store.state.prodList = this.prodList
      if (this.$route.query.type === 1) {
        this.$router.push({ path: '/myorder'})
      } else if(this.$route.query.type === 2) {
        this.$router.push({ path: '/sign' })
      }

    }

  },
  mounted() {
    this.getList()
    console.log(this.$store.state.mvnoBusinessMark,this.$store.state.userId,11111)
    if(this.$route.query.type === 1){this.type='选择流量包'}else if(this.$route.query.type === 2){
      this.type='选择套餐'
    }

  }
}
</script>

<style scoped lang="less">
  @import url('../../style/main.less');

  .mint-header {
    background: @themecolor;
  }

  .box {
    .w(340);
    margin: 0 auto;
    .mt(30);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .son {
      .w(160);
      text-align: center;
      overflow: hidden;
      .h(40);
      .lh(40);
      .fz(16);
      color: #3A80CE;
      border: 1px solid #3A80CE;
      .br(5);
      .margin(0, 0, 15, 0)
    }
    .active {
      .w(160);
      text-align: center;
      overflow: hidden;
      .h(40);
      .lh(40);
      color: white !important;
      background: #3A80CE !important;
      .fz(16);
      border: 1px solid #3A80CE;
      .br(5);
      .margin(0, 0, 15, 0)
    }
    .opt {
      background: #3A80CE;
    }

    border-bottom: 1px solid #F1F1F1;
  }

  .boo {
    .fz(14);
    .w(340);
    margin: 0 auto;
    .padding(20, 0, 0, 0)
  }

  .btn {
    background: white;
    position: fixed;
    left: 0;
    bottom: 0;
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
</style>
