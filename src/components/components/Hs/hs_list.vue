<style scoped>
.content{background: #F4F8FB;color: #333333;padding-bottom: 70px;padding-top: 34px;}
.el-card{margin: 0px auto;text-align: left;font-size: 13px;margin-bottom: 20px;line-height: 25px;}
.wind{width: 1100px;}
.el-form-item{text-align: left;margin-bottom: 0px;color: #333333;}
.el-form-item span{margin-right: 10px;}
.el-form-item /deep/ .el-form-item__label{line-height: 25px;font-weight: bold;color: #333333;}
.el-form-item /deep/ .el-form-item__content{line-height: 25px;}
.el-pagination /deep/ .el-pager li{min-width: 40px;height: 40px;line-height: 40px;font-size: 14px;}
.el-pagination /deep/ button{min-width: 40px !important;height: 40px;line-height: 40px;font-size: 16px;}
.make_dom{text-align: center;}
.make_dom .el-button{width: 139px;border-radius: 4px;box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.11);}
</style>
<template>
  <div>
    <searchHS></searchHS>
    <div class="content">
        <div class="wind">
            <el-card class="box-card">
                <el-row type="flex" align="middle">
                    <el-col :span="9">
                        <el-form label-width="80px" label-position="left">
                            <el-form-item label="HS编码">2933310010</el-form-item>
                            <el-form-item label="中文描述">吡啶</el-form-item>
                            <el-form-item label="英文描述">PYRIDINE</el-form-item>
                            <el-form-item label="监管条件">
                                <span>A 入境货物通关单</span>
                                B 出境货物通关单
                            </el-form-item>
                            <el-form-item label="检疫条件">
                                <span>M 进口商品检验</span>
                                N 出口商品检验
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="10">
                        <b>归类实例&nbsp;</b>吡啶 I 纯吡啶 I 吡啶盐 I 吡啶甲酸 I 2.2联吡
                        二氢吡啶 I 2-2’-联吡啶 I 吡啶PYRIDINE I 2.吡啶甲醇
                        4-氨基吡啶 I 吡啶甲酸镁 I 吡啶甲酸铬 I 吡啶盐酸盐 I 
                        吡啶硫酮锌 I 2.2’-联吡啶 I 2.3-二氯吡啶 I 4-甲氧基吡
                        啶 I 2-乙酰基吡啶 I 吡啶-1-氧化物 I 三氧化硫吡啶...
                    </el-col>
                    <el-col :span="5" class="make_dom">
                        <el-button plain @click="to_hs()" size="small">查看出口信息</el-button>
                    </el-col>
                </el-row>
            </el-card>
            
            <el-pagination
                background
                
                layout="prev, pager, next"
                :total="1000">
            </el-pagination>
        </div>
    </div>
  </div>
</template>
<script>
import searchHS from "../search_hs";
export default {
  name: "hs_list",
  components: {
    searchHS
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
      to_hs(){
        this.$router.push({
            path: "/hs_detail",
            name: "hs_detail",
        });
      },
      to_detail(){
        this.$router.push({
            path: "/hs_detail",
            name: "hs_detail",
        });
      },
  }
};
</script>
