<style scoped>
.h1{font-weight: bold;font-size: 18px;line-height: 80px;}
.content{background: #F4F8FB;color: #333333;padding-bottom: 70px;}
.menu{background: white;padding: 20px 18px;font-size: 12px;text-align: left;}
.h2{font-size: 13px;color: white;padding: 10px 0px;width:144px;margin: 0px auto;margin-bottom: 20px;text-align: center;}
.el-col{margin-top: 20px;cursor: pointer;}
.body_dom{height: 50px;overflow:hidden;}
</style>
<template>
  <div>
    <searchHS></searchHS>
    <router-view v-if="!$route.meta.keepAlive||$route.params.loading"></router-view>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive&&!$route.params.loading"></router-view>
    </keep-alive>
  </div>
</template>
<script>
import searchHS from "../search_hs";
export default {
  components: {
    searchHS
  },
  data() {
    return {
    };
  },
};
</script>
