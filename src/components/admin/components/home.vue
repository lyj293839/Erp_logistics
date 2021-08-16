<style scoped>
.content{padding: 25px 27px 0px 50px;color: #333333;}
.font1{font-size: 18px;margin-bottom: 15px;}
.font2{font-size: 15px;text-align: center;color: #0071E3;margin-bottom: 10px;}
.exit{background: white;display: flex;align-items: flex-end;padding: 10px;}
.exit .el-button{width: 102px;margin-left: 10px;}
.list{background: white;padding: 10px 16px 10px 16px;}
.list ul li{margin-bottom: 20px;font-size: 13px;word-wrap:break-word;word-break:break-all;}
.list ul li .el-button{color:#0071E3;font-size: 13px;}
</style>
<template>
  <div class='content'>
    <div class="font1">C端平台公告</div>
    <el-row :gutter="17">
      <el-col :span='17'>
        <div class="exit">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            maxlength="60"
            show-word-limit
            v-model="textarea">
          </el-input>
          <el-button type="primary" size="small" class="button_primary" :loading="loading_add" @click="add()">发布</el-button>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="list">
          <div class="font2">当前发布</div>
          <ul>
            <li v-for="(item,index) in list.data">
              {{index+1}}、{{item.content}}
              <el-button type="text" @click="cancel(item)">删除</el-button>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "ad_home",
  data() {
    return {
      list:{},
      textarea:'',
      loading_add:false
    };
  },
  created () {
    this.fetach()
  },
  methods: {
    fetach(){
      this.$get('api/info/noticelist/').then(res=>{
        if(res&&res.code===0){
          this.list = res
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    add(){
      var obj={
        content:this.textarea
      }
      this.loading_add=true
      this.$post('api/info/noticelist/',obj).then(res=>{
        if(res&&res.code===0){
          this.$message.success('成功')
          this.loading_add=false
          this.textarea = ''
          this.fetach()
        }else{
          this.$message.error(res.msg)
          this.loading_add=false
        }
      }).catch(err=>{this.loading_add=false})
    },
    cancel(item){
      this.$confirm('此操作将撤销该快件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$get('api/info/notices/'+item.id).then(res=>{
          if(res&&res.code===0){
            this.$message.success('撤销成功')
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
