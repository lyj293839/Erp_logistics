<style scoped>
.top {
  width: 100%;
  background: rgba(0,0,0,0.6);
  position: fixed;
  top: 0px;
  z-index: 999;
  transition: 0.3s;
  box-shadow: 0px 5px 5px rgba(0, 0, 0,0.1);
}
.top .heard {
  width: 1200px;
  margin: 0px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}
.top .heard .hy {
  background: #0071e3;
  width: 150px;
  margin-left: 50px;
  border-radius: 4px;
  font-size: 16px;
  border-color: #0071e3;
}
.top .heard div {
  display: flex;
  align-items: center;
}
.top /deep/ .el-menu--horizontal {
  border: none;
  background-color: transparent !important;
}
.top .el-menu-item{height: 70px;line-height: 70px;background-color: transparent !important;font-size: 16px;}
.no_hy{
  margin-left: 50px;
}
.no_hy .el-button{width: 74px;border-radius: 4px;font-size: 16px;width: 150px;}
.dialog /deep/ .el-dialog{border-radius: 10px;}
.dialog /deep/ .el-dialog__header{display: none;padding: 0px;}
.dialog /deep/ .el-dialog__body{padding: 0px;}
</style>
<template>
  <div>
    <div class="top" :style="nav?'':'background:white;opacity: 1;'">
      <div class="heard" :style="nav?'':'color:#0071E3;'">
        <img v-if="nav" src="@/assets/image/图像 20@2x.png" height="60px">
        <img v-else src="@/assets/image/logo_lan.png" height="60px">
        <div class="heard_a">
          <el-menu
            :default-active="path"
            :background-color="nav?'#000000':'white'"
            :text-color="nav?'white':'#0071E3'"
            :active-text-color="nav?'white':'#0071E3'"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item index="/home">首页</el-menu-item>
            <!-- <el-menu-item index="/chemical">化学性质及海关编码</el-menu-item> -->
            <!-- <el-menu-item index="/hs">海关编码</el-menu-item> -->
          </el-menu>
          <el-button v-if="is_login" type="primary" class='hy' @click="to_personalCenter()">会员中心</el-button>
          <div class="no_hy" v-else>
            <el-button type="primary" size="small" class="button_primary" @click="dialogLogin=true">登录</el-button>
            <!-- <el-button size="small">注册</el-button> -->
          </div>
        </div>
      </div>
    </div>
    <!-- 登录 -->
    <el-dialog
      :visible.sync="dialogLogin"
      class="dialog"
      @close='close_login()'
      width="680px">
      <Login ref="login"></Login>
    </el-dialog>
    
  </div>
</template>
<script>
import Login from "./login/password";
export default {
  components:{
    Login
  },
  data() {
    return {
      path: "/home",
      nav: true,
      dialogLogin:false,
      is_login:false,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  watch:{
    $route(to,from){
      this.getCurrentMenu()
    }
  },
  created () {
    this.getCurrentMenu()
    if(JSON.parse(localStorage.getItem('loginForm'))){
      this.is_login = true
    }else{
      this.is_login = false
    }
  },
  methods: {
    to_personalCenter(){
      if(JSON.parse(localStorage.getItem('loginForm')).role_type==1||JSON.parse(localStorage.getItem('loginForm')).role_type==2){
        this.$router.push({
          path: "/admin",
          name: "admin",
        });
      }else if(JSON.parse(localStorage.getItem('loginForm')).role_type==0){
        this.$router.push({
          path: "/customer",
          name: "customer",
        });
      }else{
        this.dialogLogin=true
      }
    },
    close_login(){
      this.$refs.login.resetForm()
      if(JSON.parse(localStorage.getItem('loginForm'))){
        this.is_login = true
      }else{
        this.is_login = false
      }
      this.dialogLogin = false
    },
    getCurrentMenu() {
      // 获取当前页面 菜单刷新后能自动选中
      let that = this;
      let currentUrl = window.location.href;
      let currentPage = currentUrl.split("#")[1];
      if(currentPage.indexOf('chemical')>-1){
        that.path = '/chemical'
      }else if(currentPage.indexOf('hs')>-1){
        that.path = '/chemical'
      }else if(currentPage.indexOf('home')>-1){
        that.path = '/home'
      }else{
        that.path = currentPage;
      }
    },
    handleSelect(key, keyPath) {
      this.$router.push({
        path: key
      });
    },
    handleScroll() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (parseInt(scrollTop) < 500) {
          this.nav = true;
          return;
        } else {
          this.nav = false
        }
    }
  }
};
</script>
