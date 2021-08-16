<style scoped>
.content{padding: 25px 30px;}
.heard{text-align: left;margin-bottom: 10px;}
.el-table .el-button{color: #0071E3;}
.list{background: white;padding-bottom: 10px;}
.list .el-pagination{text-align: center;}
.img{display: flex;align-items: center;}
.img .el-avatar{margin-right: 10px;}
</style>
<template>
  <div class="content">
    <div class="heard">
      <el-button class="button_plain" icon="el-icon-plus" plain size="small" @click="Add()">新建客户</el-button>
    </div>
    <div class="list">
      <el-table
        :data="list.data"
        stripe
        size="small"
      >
        <el-table-column label="姓名" align="center" width="150">
          <template slot-scope="scope">
            <div class="img">
              <el-avatar icon="el-icon-user-solid"></el-avatar>
              <span>{{scope.row.userinfo.username}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="id" align="center" width="100">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="客户经理" align="center" width="100">
          <template slot-scope="scope">{{scope.row.userinfo.saler_id}}</template>
        </el-table-column>
        <el-table-column label="公司" align="center">
          <template slot-scope="scope">{{scope.row.userinfo.company_name}}</template>
        </el-table-column>
        <el-table-column label="邮箱" align="center">
          <template slot-scope="scope">{{scope.row.userinfo.email}}</template>
        </el-table-column>
        <el-table-column label="手机" align="center" width="100">
          <template slot-scope="scope">{{scope.row.iphone}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="140">
          <template slot-scope="scope">
            <el-button type="text" @click="detail(scope.row.id)">详细资料</el-button>
            <el-button type="text" style="color:red;" @click="cancel(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        layout="prev, pager, next"
        :total="list.count">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "ad_service",
  data() {
    return {
      list: {},
      currentPage:1,
      queryList:{page:1,type:0},
    };
  },
  created () {
    this.fetach()
  },
  methods: {
    fetach(){
      this.$get('api/users/userlist',this.queryList).then(res=>{
        if(res.code===0){
          this.list = res
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    handleCurrentChange(page){
      this.queryList.page = this.currentPage = page
      this.fetach()
    },
    Add(){
      this.$router.push({
        path: '/ad_customer_add',
        name:'ad_customer_add'
      });
    },
    detail(id){
      this.$router.push({
        path: '/ad_customer_add',
        name:'ad_customer_add',
        query:{
          id
        }
      });
    },
    cancel(id){
      this.$confirm('此操作将删除该人员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$get('api/users/usercancel/'+id).then(res=>{
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