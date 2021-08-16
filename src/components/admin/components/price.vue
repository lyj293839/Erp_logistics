<style scoped>
.content{padding: 25px 30px;}
.content /deep/ .el-table .warning {
 background: oldlace;
}
</style>
<template>
  <div class="content">
    <el-tabs v-model="queryList.express_name" @tab-click="handleClick">
        <el-tab-pane label="Fedex" name="Fedex"></el-tab-pane>
        <el-tab-pane label="DHL" name="DHL"></el-tab-pane>
    </el-tabs>
    <el-table
        :data="weightList"
        size="small"
        :row-class-name="tableRowClassName"
        v-loading="table_loading"
      >
        <el-table-column label="重量\区域" align="center" width="100">
          <template slot-scope="scope">
            {{scope.row.weight}}
            <span v-if="scope.row.weight==weightList[0].weight">{{scope.row.package==1?'-有包装':'-无包装'}}</span>
            <span>{{scope.row.type==1?'/KG':''}}</span>
         </template>
        </el-table-column>
        <el-table-column v-for="item in title_list" :label="item.name" align="center">
          <template slot-scope="scope">
            <el-popover
                placement="top"
                width="100"
                trigger="click">
                <div style="display:flex;align-items: center;">
                    <el-input v-model="input" size="mini" placeholder="填写价格" clearable></el-input>
                    <el-button type="primary" size="mini" class="button_primary" :loading="loading" @click="sure_price(item,scope.row)">保存</el-button>
                </div>
                <span slot="reference" 
                @click="input=list.filter(i=>{return i.weight==scope.row.weight&&i.area==item.name&&i.package==scope.row.package})[0].price"
                style="cursor: pointer;"
                >
                    {{list.filter(i=>{return i.weight==scope.row.weight&&i.area==item.name&&i.package==scope.row.package})[0]?
                    list.filter(i=>{return i.weight==scope.row.weight&&i.area==item.name&&i.package==scope.row.package})[0].price:''}}
                </span>
            </el-popover>
          </template>
        </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "ad_price",
  data() {
    return {
      list: {},
      weightList:[],
      input:'',
      title_list:[],
      loading:false,
      table_loading:false,
      queryList:{
        express_name:'Fedex'
      },
    };
  },
  created () {
    if(this.queryList.express_name=='Fedex'){
      this.title_list = this.$Enum.FEDEXAREA
    }else{
      this.title_list = this.$Enum.DHLAREA
    }
    this.table_loading = true
    this.fetach()
  },
  methods: {
    fetach(){
      if(this.queryList.express_name=='Fedex'){
        this.title_list = this.$Enum.FEDEXAREA
      }else{
        this.title_list = this.$Enum.DHLAREA
      }
      this.$get('api/orders/packlist/',this.queryList).then(res=>{
        if(res.code===0){
          this.list = res.data
          this.weightList = []
          res.data.forEach(i=>{
            if(!this.weightList.filter(j=>{return i.weight==j.weight&&i.package==j.package})[0]){
             var obj = {
               weight:i.weight,
               package:i.package,
               type:i.type
             }
             this.weightList.push(obj)
            }
          })
          this.table_loading = false
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    handleClick(tab, event) {
      this.table_loading = true
      setTimeout(()=>{
        this.fetach()
      })
    },
    sure_price(item,row){
      this.loading = true
      var obj = this.list.filter(i=>{return i.weight==row.weight&&i.area==item.name&&i.package==row.package})[0]?
              this.list.filter(i=>{return i.weight==row.weight&&i.area==item.name&&i.package==row.package})[0]:''
      this.$post('api/orders/packapi/'+obj.id,{price:this.input}).then(res=>{
        if(res.code===0){
          this.$message.success(res.msg)
          this.fetach()
          this.loading = false
        }else{
          this.$message.error(res.msg)
          this.loading = false
        }
      }).catch(err=>{this.loading = false})
    },
    tableRowClassName({row, rowIndex}){
     if(row.weight==this.weightList[0].weight){
        return 'warning'
     }
     return ''
    }
  }
};
</script>