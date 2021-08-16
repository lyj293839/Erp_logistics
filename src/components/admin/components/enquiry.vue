<style scoped>
.content{padding: 25px 30px;text-align: center;}
.el-table /deep/ td{padding: 5px 0px;}
.list{background: white;padding-bottom: 10px;}
.list .el-pagination{text-align: center;}
</style>
<template>
  <div class="content">
    <div class="list">
      <el-table
        :data="list.data"
        stripe
        size="small"
      >
        <el-table-column label="时间" align="left" width="200">
          <template slot-scope="scope">
            <span>{{$All.getDate(scope.row.create_time,true)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="原寄地" align="center">
          <template slot-scope="scope">{{scope.row.send_address}}</template>
        </el-table-column>
        <el-table-column label="目的地" align="center">
          <template slot-scope="scope">{{scope.row.destination}}</template>
        </el-table-column>
        <el-table-column label="货物信息" align="center">
          <template slot-scope="scope">{{scope.row.goods_info}}</template>
        </el-table-column>
        <el-table-column label="电话" align="center" width="200">
          <template slot-scope="scope">{{scope.row.phone}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="100">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status==0" type="primary" class="button_primary" size="mini" @click="content(scope.row)">未联系</el-button>
            <span v-else>
              <font color='#0071E3'>已联系</font>
            </span>
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
  name: "ad_enquiry",
  data() {
    return {
      list:{},
      queryList:{page:1},
      currentPage:1,
    };
  },
  created () {
    this.fetach()
  },
  methods: {
    fetach(){
      this.$get('api/info/inquires/',this.queryList).then(res=>{
        if(res&&res.code===0){
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
    content(item){
      this.$confirm('是否确定已联系该询价?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$get('api/info/inquire/'+item.id).then(res=>{
            if(res&&res.code===0){
              this.$message.success('成功')
              this.fetach()
              this.$parent.$parent.$parent.update_enquiry()
            }else{
              this.$message.error(res.msg)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
      });
    }
  }
};
</script>