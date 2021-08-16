<style scoped>
.content{padding: 10px;}
.content_a{padding: 50px 90px;background: white;}
</style>
<template>
  <div class="content">
    <div class="content_a">
      <el-table
        :data="list.data"
        size="small"
      >
        <el-table-column label="快递号码" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.express_number}}</span>
          </template>
        </el-table-column>
        <el-table-column label="快递公司" align="center">
          <template slot-scope="scope">{{scope.row.express_company}}</template>
        </el-table-column>
        <el-table-column label="接收时间" align="right">
          <template slot-scope="scope">{{$All.getDate(scope.row.create_time,true)}}</template>
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
      currentPage:1
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
    }
  }
};
</script>
