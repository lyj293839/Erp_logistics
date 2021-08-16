<style scoped>
.banner {
  width: 100%;
  height: 300px;
  background: #F4F8FB;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
}
.banner img{
  position: absolute;
  top: 0px;
}
.banner .el-input{margin: 16px 0px 10px 0px;width: 500px;}
.h1{font-size: 28px;line-height: 37px;}
.h2{font-size: 18px;}
.h3{font-size: 12px;margin-left: 10px;text-align: left;}
</style>
<template>
  <div>
    <div class="banner">
      <div style="z-index:1;">
        <div>
          <span class="h1">海关编码&进出口信息</span>
          <span class="h2">一站式查询</span>
        </div>
        <div>
          <el-input v-model="input" placeholder="请输入HS编码、产品名称、英文名称、CAS或MDL"></el-input>
          <div class="h3">热门关键词：293390099、2942000000、2933290090、3204909000</div>
        </div>
      </div>
      <img src="@/assets/image/164641507@2x.png" width="100%" style="min-height:300px;">
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input:''
    };
  },
  created () {
    this.input = this.$route.query.search_info?this.$route.query.search_info:''
    let that=this
    document.onkeydown = function(e) {
      var key = window.event.keyCode;
      if ((that.$route.path.indexOf('chemical')>-1||that.$route.path.indexOf('hs')>-1)&&key == 13) {
        that.searchHS()
      }
    }
  },
  watch: {
    $route(to,from){
      if(from.name=='chemical_list'&&to.query!=from.query){
        location.reload()
      }
    }
  },
  methods: {
    searchHS(){
      this.$router.push({
          path: "/chemical_list",
          name: "chemical_list",
          query:{
            search_info:this.input
          }
      });
    }
  }
};
</script>
