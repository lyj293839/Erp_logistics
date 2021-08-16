<style scoped>
.content{padding: 25px 30px;text-align: center;}
.content .el-input{width: 500px;margin: 0px auto;margin-bottom: 25px;}
.content .el-input /deep/ .el-input-group__append{background: #0071E3;color: white;border-color: #0071E3;}
.el-table /deep/ td{padding: 0px;}
.el-table .el-button{color: #0071E3;}
.list{background: white;padding-bottom: 10px;}
.list .el-pagination{text-align: center;}
</style>
<template>
  <div class="content">
    <el-input placeholder="请输入内容" size="small" v-model="express_number">
      <el-button slot="append" type="primary" :loading="loading_add" @click="add()">添加</el-button>
    </el-input>
    <div class="list">
      <el-table
        :data="list.data"
        stripe
        size="small"
      >
        <el-table-column label="快递号码" align="left">
          <template slot-scope="scope">
            <span>{{scope.row.express_number}}</span>
          </template>
        </el-table-column>
        <el-table-column label="快递公司" align="center">
          <template slot-scope="scope">{{scope.row.express_company}}</template>
        </el-table-column>
        <el-table-column label="接收时间" align="center">
          <template slot-scope="scope">{{$All.getDate(scope.row.create_time)}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="cancel(scope.row)">撤销</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :total="list.count">
      </el-pagination>
    </div>
    
  </div>
</template>
<script>
export default {
  name: "express",
  data() {
    return {
      list:{},
      queryList:{page:1},
      express_number:'',
      currentPage:1,
      loading_add:false
    };
  },
  created () {
    this.fetach()
  },
  methods: {
    fetach(){
      this.$get('api/info/expresslist/',this.queryList).then(res=>{
        if(res&&res.code===0){
          this.list = res
        }else{this.$message.error(res.msg)}
      })
    },
    handleCurrentChange(page){
      this.queryList.page = this.currentPage = page
      this.fetach()
    },
    add(){
      var obj = {
        express_number:this.express_number
      }
      this.loading_add = true
      this.$post('api/info/expresslist/',obj).then(res=>{
        if(res&&res.code===0){
          this.$message.success('成功')
          this.fetach()
          this.loading_add = false
          this.express_number = ''
        }else{
          this.$message.error(res.msg)
          this.loading_add = false
        }
      }).catch(err=>{this.loading_add = false})
    },
    cancel(item){
      this.$confirm('此操作将撤销该快件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$get('api/info/express/'+item.id).then(res=>{
          if(res&&res.code===0){
            this.$message.success('成功')
            this.fetach()
          }else{this.$message.error(res.msg)}
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
      
    }
  }
};
</script>