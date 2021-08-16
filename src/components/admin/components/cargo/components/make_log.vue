<style scoped>
.el-row div{display: flex;align-items: center;}
.el-row .font1{font-size: 18px;color: #0071E3;justify-content: center;}
.el-table{color: #333;}
</style>
<template>
  <div>
    <el-row>
        <el-col :span="8">
            <div>
                <el-input v-model="queryList.search_info" size="small" placeholder="请输入单号/发件单号"></el-input>
                <el-button type="primary" size="small" class="button_primary" :loading="loading" @click="search()">搜索</el-button>
            </div>
        </el-col>
        <el-col :span="8" class='font1'><div>操作记录</div></el-col>
        <el-col :span="8"></el-col>
    </el-row>
    <el-table
        :data="list.data"
        size="small"
      >
        <el-table-column label="时间" align="left">
          <template slot-scope="scope">
            <span>{{$All.getDate(scope.row.transfer_time,true)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="发货单号" align="center">
          <template slot-scope="scope">{{scope.row.goods_member.tracking_number}}</template>
        </el-table-column>
        <el-table-column label="订单号" align="center">
          <template slot-scope="scope">{{scope.row.order_no}}</template>
        </el-table-column>
        <el-table-column label="状态" align="center" width="100">
          <template slot-scope="scope">
              {{$All.getEnumValue($Enum.ORDERSTATUS,scope.row.status)}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="right" width="100">
          <template slot-scope="scope">
            <el-button style="color:#0071E3;" size="mini" type="text" @click="cancel_log(scope.row.id)">撤销</el-button>
          </template>
        </el-table-column>
    </el-table>
    <el-pagination
      background
      style="text-align:center;"
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :total="list.count">
    </el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list:{},
      queryList:{
        search_info:'',
        page:1
      },
      currentPage:1,
      loading:false
    };
  },
  created () {
    this.fetach()
  },
  methods: {
    fetach(){
      this.$get('api/orders/transferlist/',this.queryList).then(res=>{
        if(res.code===0){
          if(this.loading){
            this.loading = false
            this.$message.success('搜索成功')
          }
          this.list = res
        }else{
          this.$message.error(res.msg)
          this.loading = false
        }
      }).catch(err=>{this.loading = false})
    },
    search(){
      this.loading = true
      this.queryList.page = this.currentPage = 1
      this.fetach()
    },
    handleCurrentChange(page){
      this.queryList.page = this.currentPage = page
      this.fetach()
    },
    cancel_log(id){
      this.$confirm('此操作将撤销订单中转状态, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$get('api/orders/transferapi/'+id).then(res=>{
            if(res.code===0){
              this.$message.success('撤销成功')
              this.fetach()
              this.$parent.$parent.fetach()
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
