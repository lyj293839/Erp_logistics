<style scoped>
.content{background: #F4F8FB;color: #333333;padding-bottom: 70px;padding-top: 34px;}
.el-card{margin: 0px auto;text-align: left;font-size: 12px;margin-bottom: 20px;}
.img_dom{text-align: center;}
.message_dom{padding-left: 20px;border-left: 1px solid #707070;}
.el-form-item{text-align: left;margin-bottom: 0px;}
.el-form-item /deep/ .el-form-item__label{line-height: 25px;}
.el-form-item /deep/ .el-form-item__content{line-height: 25px;}
.make_dom .el-button{margin: 10px 0px;width: 139px;border-radius: 4px;box-shadow: 0px 3px 6px rgba(0, 113, 227, 0.3);}
.wind{width: 1100px;}
.el-pagination /deep/ .el-pager li{min-width: 40px;height: 40px;line-height: 40px;font-size: 14px;}
.el-pagination /deep/ button{min-width: 40px !important;height: 40px;line-height: 40px;font-size: 16px;}
</style>
<template>
  <div>
    <div class="content">
        <div class="wind">
            <el-card class="box-card" v-for="item in list.data">
                <el-row type="flex" align="middle">
                    <el-col :span="7" class="img_dom">
                        <img :src="item.img_path" height="100">
                    </el-col>
                    <el-col :span="12">
                        <div class="message_dom">
                            <div>
                                <el-tag type="danger" size="small" v-if="item.packing_group">{{item.packing_group}}</el-tag>
                                <el-tag size="small" v-if="item.category">{{item.category}}</el-tag>
                                <el-tag type="info" size="small" v-if="item.customs_code">{{item.customs_code}}</el-tag>
                            </div>
                            <el-form label-width="150" label-position="left">
                                <el-form-item label="中文名称：">{{item.name_cn}}</el-form-item>
                                <el-form-item label="英文名称：">{{item.name}}</el-form-item>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="分子式：">{{item.mf}}</el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="CAS:">{{item.cas}}</el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="分子量：">{{item.mw}}</el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="MDL:">{{item.mdl}}</el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </div>
                    </el-col>
                    <el-col :span="5" class="make_dom img_dom">
                        <el-button type="primary" class="button_primary" @click="to_detail(item.cas)">查看化学性质</el-button><br>
                        <el-button plain @click="to_hs(item.customs_code)">查看出口信息</el-button>
                    </el-col>
                </el-row>
            </el-card>
            <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                layout="prev, pager, next"
                :total="list.count">
            </el-pagination>
        </div>
    </div>
  </div>
</template>
<script>
import searchHS from "../search_hs";
export default {
  name: "chemical_list",
  components: {
    searchHS
  },
  data() {
    return {
      list: [],
      queryList:{
        page:1,
        classify:'',
        search_info:''
    },
      currentPage:1,
    };
  },
  created () {
    this.fetach()
  },
  methods: {
    fetach(){
        this.queryList.classify = this.$route.query.cate_name?this.$route.query.cate_name:''
        this.queryList.search_info = this.$route.query.search_info?this.$route.query.search_info:''
        this.$get('api/prods/prodcate/',this.queryList).then(res=>{
            if(res&&res.code===0){
                res.data.forEach(i=>{
                    i.img_path = process.env.API_BASEURL+i.img_path.replace('upload/','api/shows/')
                })
                this.list = res
            }else{this.$message.error(res.msg)}
        })
    },
    handleCurrentChange(page){
        this.queryList.page = this.currentPage = page
        this.fetach()
    },
    to_hs(hscod){
        this.$router.push({
            path: "/hs_detail",
            name: "hs_detail",
            query:{
                hscod
            }
        });
    },
    to_detail(cas){
        this.$router.push({
            path: "/chemical_detail",
            name: "chemical_detail",
            query:{
                cas
            }
        });
    },
  }
};
</script>
