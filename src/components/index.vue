<style scoped>
.el-main{padding: 0px;}
.contact{
  position: fixed;
  top: 0px;
  right: 10px; 
  top: 50%;
  margin-top: -45px;
  width: 90px;
  height: 90px;
  background: linear-gradient(133deg, #0071E3 0%, #42A0FF 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
}
.contact:hover{
  width: 150px;
  height: 150px;
  margin-top: -100px;
}
.contact:hover .bef_hover{display: none;}
.contact:hover .aft_hover{display: block;}
.icon{margin: 0px auto;margin-bottom: 10px;line-height: 30px;font-size: 40px;text-align: center;}
.bef_hover{display: block;}
.aft_hover{display: none;}
.font1{font-size: 14px;}
.font2{font-size: 12px;}
.font3{font-size: 20px;}
</style>
<template>
  <div>
    <heard ref="heard"></heard>
    <!-- <el-main> -->
      <router-view v-if="!$route.meta.keepAlive"></router-view>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <div class="contact">
        <div class="bef_hover">
          <div class="icon">
            <i class="el-icon-phone-outline"></i>
          </div>
          <span>联系我们</span>
        </div>
        <div class="aft_hover">
          <div class="font1">请拨打官方热线</div>
          <div class="font2">中国</div>
          <div class="font3">13605188562</div>
        </div>
      </div>
    <!-- </el-main> -->
    <foot></foot>
  </div>
</template>

<script>
import heard from "@/heard_foot/heard";
import foot from "@/heard_foot/foot";
export default {
  name: 'index',
  components: {
    heard,
    foot
  },
  watch: {
    $route(to,from){
      this.$All.goTop()
      if(to.query.no_login&&!JSON.parse(localStorage.getItem('loginForm'))){
        this.$refs.heard.dialogLogin=true
        delete to.query.no_login
      }
    }
  },
  data () {
    return {
    }
  },
  created () {
    delete this.$route.query.no_login
  },
  methods: {
    
  }
}
</script>
