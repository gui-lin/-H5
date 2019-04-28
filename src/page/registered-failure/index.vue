<template>
  <div class="success">
    <mt-header title="注册失败">
      <router-link to="/sign" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="succes-box">
      <div class="succes-top">
        <img src="../../../static/image/wro_02.png" alt="">
        <div class="red-font">业务受理失败！</div>
        <div class="fail">
          <div class="cause">失败原因：</div>
          <div class="causess" >
            {{cause}}
          </div>
        </div>

      </div>

    </div>

    <div class="btn">
      <div @click="gohome">跳转至首页</div>

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
      cause:''
    }
  },
  methods:{
    gohome(){
      this.$router.replace({path:'/'})
    }
  },
  mounted(){
    this.cause=this.$store.state.defeated
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
