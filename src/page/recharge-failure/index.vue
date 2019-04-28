<template>
  <div class="success">
    <mt-header title="充值失败">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="succes-box">
      <div class="succes-top">
        <img src="../../../static/image/wro_02.png" alt="">
        <div class="red-font">充值失败！</div>
        <div class="fail">
          <div class="cause">失败原因：</div>
          <div class="causess" v-for="(item,index) in cause">
            {{item.title}}
          </div>
        </div>

      </div>

    </div>

    <div class="btn">
      <div>跳转至首页</div>

    </div>
  </div>

</template>

<script>
import { Header } from 'mint-ui'

export default {
  name: 'index',
  components: {
    Header,
  },
  data(){
    return{
      cause:[]
    }
  },
  methods:{
    getCause(){
      this.cause=[
        {title:'这里是失败原因，这里是失败原因'},
        {title:'这里是失败原因，这里是失败原因,这里是失败原因'}
      ]
    }
  },
  mounted(){
    this.getCause()
  }
}
</script>

<style scoped lang="less">
  @import url('../../style/main.less');
  .mint-header {
    background: @themecolor;
  }
  .succes-top{
    display: flex;
    flex-direction: column;
    align-items: center;
    .w(230);
    margin: 0 auto;
    .mt(100);
    img{
      .w(85);
      .h(85);
      .mb(15)
    }
    .red-font{
      color:red ;
      font-weight: 600;
      .fz(16);
      .mb(15)
    }
    .cause{
      .fz(16);
      color:#666666 ;
      .mb(15)
    }
    .causess{
      .fz(12);
      color:#666666 ;
    }
    .number1{
      .fz(12);
      color: #565061;
      .mb(15)
    }

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
