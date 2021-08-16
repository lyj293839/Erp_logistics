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
    <div class="content">
        <div class="wind">
            <div class="h1">产品分类</div>
            <div>
              <el-row :gutter="20">
                <el-col :span="6" v-for="item in list">
                  <div class="menu" @click="to_list(item.cate_name)">
                    <div class="h2" :style="$All.randomRgb(item)">{{item.name}}</div>
                    <div class="body_dom">
                      <span v-for="i in item.prods">{{i.name}}&nbsp;</span>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import searchHS from "../search_hs";
export default {
  name: "chemical_class",
  components: {
    searchHS
  },
  data() {
    return {
      list: []
    };
  },
  created () {
    this.fetach()
  },
  methods: {
    fetach(){
      this.$get('api/prods/catelist').then(res=>{
        if(res&&res.code===0){
          this.list = res.data
        }else{this.$message.error(res.msg)}
      })
    },
    to_list(cate_name){
      this.$router.push({
        path: "/chemical_list",
        name: "chemical_list",
        query:{
          cate_name
        }
      });
    }
  }
};
</script>
