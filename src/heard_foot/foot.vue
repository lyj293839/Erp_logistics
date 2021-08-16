<style scoped>
.foot{width: 100%;background: #3D3D49;}
.foot_a{
  width: 1200px;
  margin: 0px auto;
  padding: 20px 0px;
}
.foot_a .div1{
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
}
.foot_a .div2{margin-top: 60px;}
.foot_a .div2 a{
  color: white;
  font-size: 12px;
  text-decoration:none;
}
.foot_a ul{display: flex;}
.foot_a .ul1 li{margin-right: 70px;cursor: pointer;}
.foot_a .ul2 li{width: 44px;height: 44px;border-radius: 50%;margin-left: 40px;cursor: pointer;}
</style>
<template>
  <div>
    <div class="foot">
      <div class="foot_a">
        <div class="div1">
          <img src="@/assets/image/图像 20@2x.png" style="margin-right:120px;width: 150px;">
          <ul class="ul1">
            <li @click="to_route('home')">首页</li>
            <!-- <li @click="to_route('chemical')">化学性质及海关编码</li> -->
            <li>隐私协议</li>
            <li>支付条款</li>
          </ul>
          <ul class="ul2">
            <el-tooltip class="item" effect="dark" content="邮箱：2029180575@qq.com" placement="top-start">
              <li>
                <img src="@/assets/image/组 3542.png" width="100%">
              </li>
            </el-tooltip>
            <a href="http://wpa.qq.com/msgrd?v=3&uin=2029180575&site=qq&menu=yes" target="_blank">
              <el-tooltip class="item" effect="dark" content="QQ：2029180575" placement="top-start">
                <li>
                  <img src="@/assets/image/组 3543.png" width="100%">
                </li>
              </el-tooltip>
            </a>
            <el-tooltip class="item" effect="dark" content="电话：13605188562" placement="top-start">
              <li>
                <img src="@/assets/image/组 3544.png" width="100%">
              </li>
            </el-tooltip>
          </ul>
        </div>
        <div class="div2">
          <a href="https://beian.miit.gov.cn" target="_blank">版权所有：深圳市荣达昌货运代理有限公司  Copyright©2020-2021 版权所有 粤ICP备19078780号</a> 
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    to_route(a){
      this.$router.push({
        path: "/"+a,
        name: a,
      });
    }
  }
}
</script>
