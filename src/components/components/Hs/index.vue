<style scoped>
.h1{font-weight: bold;font-size: 18px;line-height: 80px;}
.content{background: #F4F8FB;color: #333333;padding-bottom: 70px;}
.menu{padding: 20px 10px;padding-top: 0px; font-size: 12px;text-align: left;border-bottom: 1px solid #ACACAC;}
.menu:hover{border-color: #0071E3;}
.h2{color: white;padding: 10px 10px;font-weight: bold;border-radius: 4px;}
.el-col{margin-top: 20px;cursor: pointer;}
.font1{font-size: 11px;}
.font2{font-size: 13px;}
.font3{color: #303030;font-size: 12px;font-weight: bold;margin: 16px 0px 19px 0px;}
.button{font-size: 12px;color: #0071E3;cursor: pointer;margin-top: 20px;}
.body_dom{height: 110px;overflow:hidden;}
</style>
<template>
  <div>
    <searchHS></searchHS>
    <div class="content">
        <div class="wind">
            <div class="h1">常用HS编码</div>
            <div>
              <el-row>
                <el-col :span="4" v-for="item in list">
                  <div class="menu" @click="to_list(item.hs_code)">
                    <div class="h2" style="background: #EB0018;">
                      <div class="font1">HS编码</div>
                      <div class="font2">{{item.hs_code}}</div>
                    </div>
                    <div class="font3">其他有机化合物</div>
                    <div class="body_dom">
                      吡啶 I 纯吡啶 I 吡啶盐 I 吡啶甲酸 
                      I 2.2联吡二氢吡啶 I 2-2’-联吡啶 
                      ’-联吡啶 I 2.3-二氯吡啶 I 二氧吡
                      啶 I 4-甲氧基吡啶
                    </div>
                    <div class="button">查看详情 <i class="el-icon-caret-right" style="margin-left:10px;"></i></div>
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
  name: "hs",
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
      this.$get('api/prods/hscodecom').then(res=>{
        if(res&&res.code===0){
          this.list = res.data
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    to_list(hscod){
      this.$router.push({
        path: "/hs_detail",
        name: "hs_detail",
        query:{
          hscod
        }
      });
    }
  }
};
</script>
