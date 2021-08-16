<style scoped>
.el-col{text-align: left;}
.banner{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  border-bottom: 2px solid #EBEFF2;
  cursor: pointer;
}
.el-menu-item{padding-left: 60px !important;color: #334D6E;}
.el-menu-item .el-tag{background: #0071E3;margin-left: 20px;text-align: center;}
.el-menu {border-right:none;}
.el-menu /deep/ .el-menu-item i{margin-right: 23px;}
.el-menu /deep/ .is-active{color: #0071E3;}
.top_search{
  width: 100%;
  position: sticky;
  z-index: 900;
  top: 0px;
  height: 80px;
  background: white;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.top_search .el-input{width: 100%;margin:0px 20px;}
.top_search .el-input__icon{cursor: pointer;}
.top_search /deep/ .el-input__suffix{display: flex;align-items: center;right: 20px;}
.el-main{margin: 0px;padding: 0px;}
.out{
  position: absolute;
  bottom: 0px;
  width: 100%;
}
</style>
<template>
  <div>
    <el-container style="background:#F5F6F8;height: 100vh;text-align: left;">
      <el-aside width='20%' style="z-index:1000;box-shadow: 3px 0px 20px rgba(0, 0, 0, 0.1);">
        <el-menu
          style="height: 100vh"
          @select="handleSelect"
          :default-active="path">
          <div class="banner">
            <img src="@/assets/image/logo_lan.png" width="235" @click="to_home()">
          </div>
          <el-menu-item index="/ad_home">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/ad_cargo">
            <i class="el-icon-menu"></i>
            <span slot="title">货物操作</span>
          </el-menu-item>
          <el-menu-item index="/ad_deliver">
            <i class="el-icon-truck"></i>
            <span slot="title">发货操作</span>
          </el-menu-item>
          <el-menu-item index="/ad_express">
            <i class="el-icon-baseball"></i>
            <span slot="title">快件公示</span>
          </el-menu-item>
          <el-menu-item index="/ad_check">
            <i class="el-icon-s-ticket"></i>
            <span slot="title">核算/开票</span>
          </el-menu-item>
          <el-menu-item index="/ad_service">
            <i class="el-icon-service"></i>
            <span slot="title">客户服务</span>
          </el-menu-item>
          <el-menu-item index="/ad_enquiry">
            <i class="el-icon-s-comment"></i>
            <span slot="title">客户询价<el-tag v-if="expresscount&&expresscount>0" effect='dark' size="mini">{{expresscount}}</el-tag></span>
          </el-menu-item>
          <el-menu-item index="/ad_country">
            <i class="el-icon-s-grid"></i>
            <span slot="title">国家管理</span>
          </el-menu-item>
          <el-menu-item index="/ad_price">
            <i class="el-icon-s-finance"></i>
            <span slot="title">价格管理</span>
          </el-menu-item>
          <el-menu-item index="/ad_permission">
            <i class="el-icon-data-line"></i>
            <span slot="title">权限管理</span>
          </el-menu-item>
          <el-menu-item index="/out" class="out">
            <i class="el-icon-switch-button"></i>
            <span slot="title">退出</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
       <el-main>
         <div class="top_search">
            <el-input
                placeholder="请输入或者扫描来货单号、发货单号、用户名、订单号任一即可"
                @change="change_input()"
                v-model="input">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                <el-button 
                  slot="suffix" 
                  size="small" 
                  class="button_primary" 
                  style="width:100px;" 
                  @click="to_cargo()"
                  type="primary" round>
                    查询
                </el-button>
            </el-input>
          </div>
          <router-view v-if="!$route.meta.keepAlive||$route.params.loading"></router-view>
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive&&!$route.params.loading"></router-view>
          </keep-alive>
       </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'admin',
  data () {
    return {
      path:'/ad_home',
      input:'',
      timer:'',
      expresscount:''
    }
  },
  watch:{
    $route(to,from){
      this.getCurrentMenu()
    }
  },
  created () {
    this.getCurrentMenu()
    this.input = sessionStorage.getItem('search_info')?sessionStorage.getItem('search_info'):''
  },
  beforeDestroy(){
    clearInterval(this.timer);        
    this.timer = null;
  },
  mounted(){
    if(localStorage.getItem('loginForm')){
      this.update_enquiry();
      // this.timer = setInterval(() => {
          setTimeout(this.update_enquiry(), 0)
      // }, 60000)
    }else{
      clearInterval(this.timer);        
      this.timer = null;
    }
  },
  methods: {
    update_enquiry(){
      this.$get('api/info/expresscount/').then(res=>{
        this.expresscount = res.count
      })
    },
    change_input(){
      sessionStorage.setItem('search_info',this.input)
    },
    to_home(){
      this.$router.push({
        path: '/home',
        name:'home'
      });
    },
    to_cargo(){
      sessionStorage.setItem('search_info',this.input)
      if(this.path.indexOf('cargo')>-1){
        location.reload()
      }else{
        this.$router.push({
          path: '/ad_cargo',
          name:'ad_cargo',
          params:{
            loading:true
          }
        });
      }
    },
    login_out(){
      this.$confirm('此操作将退出系统, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.commit('logout')
          // setTimeout(() => {
          //   location.reload() // 强制刷新 
          // }, 500)
          this.$message('退出成功')
          this.$router.push({
            path: '/home',
            name:'home'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
      });
    },
    handleSelect(key, keyPath) {
      if(key!='/out'){
        this.$router.push({
          path: key
        });
      }else{
        this.login_out()
      }
    },
    getCurrentMenu() {
      // 获取当前页面 菜单刷新后能自动选中
      let that = this;
      let currentUrl = window.location.href;
      let currentPage = currentUrl.split("#")[1];
      if(currentPage=='/admin'){
        that.path = '/ad_home'
        that.handleSelect(that.path)
      }else if(currentPage.indexOf('ad_customer_add')>-1){
        that.path = '/ad_service'
      }else if(currentPage.indexOf('cargo')>-1){
        that.path = '/ad_cargo'
      }else if(currentPage.indexOf('ad_order_detail')>-1){
        that.path = '/ad_cargo'
      }else if(currentPage.indexOf('ad_upload')>-1){
        that.path = '/ad_check'
      }else{
        that.path = currentPage;
      }
    },
  }
}
</script>
