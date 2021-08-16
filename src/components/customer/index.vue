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
.Voglio{
  display: flex;
  align-items: center;
  /* justify-content: flex-start; */
  padding: 34px 0px;
  padding-left: 40px;
}
.Voglio img{margin-right: 20px;}
.Voglio .font1{color:#333333;font-size: 18px;line-height: 26px;}
.Voglio .font2{color:#666666;font-size: 14px;line-height: 19px;}
.el-menu-item{padding-left: 60px !important;color: #334D6E;}
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
  justify-content: center;
  align-items: center;
}
.top_search .notice{
  width: 80%;
  background: #F8F8F8;
  height: 48px;
  border-radius: 24px;
  line-height: 48px;
  /* color: #333333;
  font-size: 18px; */
  text-align: right;
  padding-left: 50px;
  position: relative;
}
.top_search .notice img{
  position: absolute;
  left: 10px;
  top: 50%;
  transform:translateY(-50%);
  }
  .el-main{margin: 0px;padding: 0px;}
  .out{
    position: absolute;
    bottom: 0px;
    width: 100%;
  }
  /* .el-row{min-height: 100vh;} */
</style>
<template>
  <div>
    <!-- <el-row type="flex">
      <el-col :span="5" style="box-shadow: 3px 0px 20px rgba(0, 0, 0, 0.1);background:white;z-index:9999;">
        <el-menu
          @select="handleSelect"
          :default-active="path">
          <div class="banner">
            <div style="width:235px;height:58px;background:#385FC4;"></div>
          </div>
          <div class="Voglio">
            <div class="potoh"></div>
            <div>
              <div class="font1">15518004101</div>
              <div class="font2">南京三二一科技有限公司</div>
            </div>
          </div>
          <el-menu-item index="/search_file">
            <i class="el-icon-search"></i>
            <span slot="title">我要查件</span>
          </el-menu-item>
          <el-menu-item index="/deliver_file">
            <i class="el-icon-truck"></i>
            <span slot="title">我要发货</span>
          </el-menu-item>
          <el-menu-item index="/bill">
            <i class="el-icon-document"></i>
            <span slot="title">我的发票</span>
          </el-menu-item>
          <el-menu-item index="/order">
            <i class="el-icon-printer"></i>
            <span slot="title">我的订单</span>
          </el-menu-item>
          <el-menu-item index="/express">
            <i class="el-icon-discount"></i>
            <span slot="title">快件公示</span>
          </el-menu-item>
          <el-divider style="border: 2px solid #EBEFF2;"></el-divider>
          <el-menu-item index="/customer_personal">
            <i class="el-icon-s-custom"></i>
            <span slot="title">我的资料</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="19" style="background:#F5F6F8;">
        <div class="top_search">
            <div class="notice">
              <img src="@/assets/image/组 3162@2x.png" width="22px" height="22px">
              公告：即日起高危地区停止收货（广西北海、新疆、西藏）
            </div>
          </div>
          <router-view></router-view>
      </el-col>
    </el-row> -->


    <el-container style="background:#F5F6F8;height: 100vh;text-align: left;">
      <el-aside width='20%' style="z-index:1000;box-shadow: 3px 0px 20px rgba(0, 0, 0, 0.1);">
        <el-menu
          style="height: 100vh"
          @select="handleSelect"
          :default-active="path">
          <div class="banner">
            <img src="@/assets/image/logo_lan.png" width="235" @click="to_home()">
          </div>
          <div class="Voglio">
            <!-- <div class="potoh"></div> -->
            <img src="@/assets/image/NoPath - 副本@2x.png" width="60" height="60">
            <div>
              <div class="font1">{{loginForm.iphone}}</div>
              <div class="font2">{{loginForm.company_name}}</div>
            </div>
          </div>
          <el-menu-item index="/search_file">
            <i class="el-icon-search"></i>
            <span slot="title">我要查件</span>
          </el-menu-item>
          <el-menu-item index="/deliver_file">
            <i class="el-icon-truck"></i>
            <span slot="title">我要发货</span>
          </el-menu-item>
          <!-- <el-menu-item index="/bill">
            <i class="el-icon-document"></i>
            <span slot="title">我的发票</span>
          </el-menu-item> -->
          <el-menu-item index="/order">
            <i class="el-icon-printer"></i>
            <span slot="title">我的订单</span>
          </el-menu-item>
          <el-menu-item index="/express">
            <i class="el-icon-discount"></i>
            <span slot="title">快件公示</span>
          </el-menu-item>
          <el-divider style="border: 2px solid #EBEFF2;"></el-divider>
          <el-menu-item index="/customer_personal">
            <i class="el-icon-s-custom"></i>
            <span slot="title">我的资料</span>
          </el-menu-item>
          <el-menu-item index="/customer_out" class="out">
            <i class="el-icon-switch-button"></i>
            <span slot="title">退出</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
       <el-main>
         <div class="top_search">
            <div class="notice">
              <img src="@/assets/image/组 3162@2x.png" width="22px" height="22px">
              <marqueeLeft v-if="newsList.length>0" :sendVal="newsList"></marqueeLeft>
            </div>
          </div>
          <router-view v-if="!$route.meta.keepAlive||$route.params.loading"></router-view>
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive&&!$route.params.loading"></router-view>
          </keep-alive>
          <!-- <keep-alive v-else>
            <router-view></router-view>
          </keep-alive> -->
       </el-main>
    </el-container>
  </div>
</template>

<script>
import marqueeLeft from "../../heard_foot/marqueex";
export default {
  name: 'customer',
  components: {
    marqueeLeft,
  },
  data () {
    return {
      path:'/search_file',
      input:'',
      loginForm:JSON.parse(localStorage.getItem('loginForm')),
      newsList:[]
    }
  },
  watch:{
    $router(to,from){
      this.getCurrentMenu()
    }
  },
  created () {
    this.getCurrentMenu()
    this.fetach()
  },
  methods: {
    fetach(){
      this.$get('api/info/noticelist/').then(res=>{
        if(res&&res.code===0){
          this.newsList = res.data
          if(this.newsList.length==1){
            this.newsList.push(this.newsList[0])
          }
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    to_home(){
      this.$router.push({
        path: '/home',
        name:'home'
      });
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
      if(key!='/customer_out'){
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
      if(currentPage.indexOf('order_detail')>-1||currentPage.indexOf('select_pay')>-1||currentPage.indexOf('bank_pay')>-1){
        that.path = '/order'
      }else if(currentPage=='/customer'){
        that.path = '/search_file'
        that.handleSelect(that.path)
      }else{
        that.path = currentPage;
      }
    },
  }
}
</script>
