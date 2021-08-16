<style scoped>
.content{padding: 25px 30px;}
.heard{text-align: left;margin-bottom: 10px;display: flex;justify-content: space-between;}
.heard .el-input{width: 200px;}
.el-table .el-button{color: #0071E3;}
.list{background: white;padding-bottom: 10px;}
.list .el-pagination{text-align: center;}
.img{display: flex;align-items: center;}
.img .el-avatar{margin-right: 10px;}
/* .dialogLog /deep/ .el-dialog__header{display: none;} */
</style>
<template>
  <div class="content">
    <div class="heard">
      <el-button class="button_primary" icon="el-icon-plus" type="primary" size="small" @click="Add()">新增国家</el-button>
      <div>
        <el-input size="small" v-model="queryList.en_name" placeholder="请输入国家" clearable></el-input>
        <el-button class="button_primary" type="primary" size="small" :loading="search_loading" @click="Search()">搜索</el-button>
      </div>
    </div>
    <div class="list">
      <el-table
        :data="list.data"
        stripe
        size="small"
      >
        <el-table-column label="id" align="center" width="100">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="国家" align="center">
          <template slot-scope="scope">{{scope.row.zh_name}}</template>
        </el-table-column>
        <el-table-column label="英文名" align="center">
          <template slot-scope="scope">{{scope.row.en_name}}</template>
        </el-table-column>
        <el-table-column label="FEDEX-area" align="center">
          <template slot-scope="scope">{{scope.row.fedex_area}}</template>
        </el-table-column>
        <el-table-column label="fedex疫情费/kg" align="center">
          <template slot-scope="scope">{{scope.row.fedex_yiqing}}</template>
        </el-table-column>
        <el-table-column label="DHL-area" align="center">
          <template slot-scope="scope">{{scope.row.dhl_area}}</template>
        </el-table-column>
        <el-table-column label="DHL疫情费/kg" align="center">
          <template slot-scope="scope">{{scope.row.dhl_yiqing}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="140">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" style="color:red;" @click="cancel(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        layout="prev, pager, next"
        :page-size="10"
        :total="list.count">
      </el-pagination>
    </div>

    <el-dialog class="dialogLog" width="550px" :visible.sync="dialog" title="国家管理">
      <el-form ref="form" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="中文名">
          <el-input v-model="form.zh_name" placeholder="请输入内容" size="small"></el-input>
        </el-form-item>
        <el-form-item label="英文名" prop="en_name">
          <el-input v-model="form.en_name" placeholder="请输入内容" size="small"></el-input>
        </el-form-item>
        <el-form-item label="FEDEX-area">
          <el-select v-model="form.fedex_area" size="small" style="width:100%;" filterable clearable>
            <el-option
              v-for="item in $Enum.FEDEXAREA"
              :key="item.pid"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="fedex疫情费/kg">
          <el-input v-model="form.fedex_yiqing" placeholder="请输入内容" size="small"></el-input>
        </el-form-item>
        <el-form-item label="DHL-area">
          <el-select v-model="form.dhl_area" size="small" style="width:100%;" filterable clearable>
            <el-option
              v-for="item in $Enum.DHLAREA"
              :key="item.pid"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="DHL疫情费/kg">
          <el-input v-model="form.dhl_yiqing" placeholder="请输入内容" size="small"></el-input>
        </el-form-item>
      </el-form>
        <div class="dialog-footer" style="text-align:right;">
            <el-button @click="dialog = false" size="small" plain class='button_plain'>取 消</el-button>
            <el-button type="primary" class="button_primary" @click="submint()" size="small" :loading="loading">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "ad_country",
  data() {
    return {
      list: {},
      form:{
        zh_name:'',
        en_name:'',
        fedex_area:'',
        dhl_area:'',
        fedex_yiqing:'',
        dhl_yiqing:''
      },
      dialog:false,
      loading:false,
      search_loading:false,
      currentPage:1,
      queryList:{
        page:1,
        en_name:''
      },
      rules: {
        en_name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      }
    };
  },
  created () {
    this.fetach()
  },
  methods: {
    fetach(){
      this.$get('api/orders/countries/',this.queryList).then(res=>{
        if(res.code===0){
          if(this.search_loading){
            this.search_loading = false
            this.$message.success('搜索成功')
          }
          this.list = res
          this.list.data = res.data.slice((parseInt(this.queryList.page)-1)*10,parseInt(this.queryList.page)*10)
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    handleCurrentChange(page){
      this.queryList.page = this.currentPage = page
      this.fetach()
    },
    Search(){
      this.search_loading = true
      this.queryList.page = 1
      this.fetach()
    },
    Add(){
      this.form={
        zh_name:'',
        en_name:'',
        fedex_area:'',
        dhl_area:''
      }
      this.dialog = true
    },
    edit(item){
      this.form = JSON.parse(JSON.stringify(item))
      this.dialog = true
    },
    submint(){
      this.$refs['form'].validate((val)=>{
        if(val){
          this.sure()
        }else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    sure(){
      this.loading = true
      this.$refs['form'].clearValidate();
      if(this.form.id){
        this.$post('api/orders/countryapi/'+this.form.id,this.form).then(res=>{
            if (res.code===0){
                this.$message.success(res.msg);
                this.dialog = false
                this.loading = false
                this.fetach()
            }else{
                this.$message.error(res.msg);
                this.loading = false
            }
        }).catch(err=>{this.loading = false})
      }else{
        this.$post('api/orders/countries/',this.form).then(res=>{
            if (res.code ===0){
                this.$message.success(res.msg);
                this.dialog = false
                this.loading = false
                this.fetach()
            }else{
                this.$message.error(res.msg);
                this.loading = false
            }
        }).catch(err=>{this.loading = false})
      }
    },
    cancel(id){
      this.$confirm('此操作将删除该人员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$get('api/orders/countryapi/'+id).then(res=>{
              if (res.code ===0){
                this.$message.success(res.msg);
                this.fetach()
              }else{
                this.$message.error(res.msg);
              }
          }).catch(function(error) {
              console.log(error)
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
  }
};
</script>