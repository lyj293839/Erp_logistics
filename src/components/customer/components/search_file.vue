<style scoped>
.content{
  padding-top: 150px;
}
.el-card{
  width: 1000px;
  margin: 0px auto;
  margin-bottom: 44px;
}
.el-card /deep/ .el-card__body{padding-top: 10px;}
.el-card .el-steps{padding-top: 20px;}
.el-input__icon{
  padding: 0px 20px;
  border-left: 1px solid #0071E3;
  color: #0071E3;
  font-size: 16px;
  cursor: pointer;
}
h1{color: #0071E3;font-size: 18px;}
h3{color: #0071E3;font-size: 12px;font-weight: normal;}
.title1{display: flex;justify-content: space-between;}
.tip{
  color: #C2CFE0;
  width: 20px;
  font-size: 11px;
  padding: 0px 5px;
  background: white;
}
.content /deep/ .el-input__inner{padding-left: 15px;}
.content .el-select,.el-input{width: 100%;}
.el-input /deep/ .el-input__prefix{top: -10px;left: 20px;}
.el-select /deep/ .el-input__prefix{top: -10px;left: 20px;}
.el-col{margin-bottom: 20px;}
.el-col .el-button{width: 214px;background: #0071E3;}
.el-steps /deep/ .el-step__icon{width: 50px;height: 50px;}
.el-steps /deep/ .el-step__line{top: 25px !important;}
.el-steps /deep/ .el-step__icon{background: #A7A7A7;border-color: #A7A7A7;}
.el-steps /deep/ .is-finish .el-step__icon{background: #0071E3;border-color: #0071E3;}
.el-steps /deep/ .is-finish {color: #0071E3;}
.el-steps i{font-size: 25px;color: white;}
</style>
<template>
  <div class="content">
    <el-card>
      <div class="title1">
        <h1>运单号查询</h1>
        <h3>查询记录</h3>
      </div>
      <el-input v-model="tracking_number" placeholder="请输入内容">
        <span slot="suffix" class="el-input__icon" @click="track_search()">查询</span>
        <span slot="prefix" class="tip">运单号</span>
      </el-input>
    </el-card>
    <el-card v-if="is_status">
      <div style="display:flex;justify-content: space-between;align-items: center;">
        <h1>当前状态</h1>
        <el-button plain size="small" @click="is_status=false">返回</el-button>
      </div>
      <el-steps :active="track_active" align-center process-status="wait">
        <el-step title="未发货">
          <i class="el-icon-takeaway-box" slot="icon"></i>
        </el-step>
        <el-step title="发货">
          <!-- <img slot="icon" src="@/assets/image/组 171@2x.png" width="60" height="60"> -->
          <i class="el-icon-shopping-cart-1" slot="icon"></i>
        </el-step>
        <el-step title="入库中">
          <i class="el-icon-box" slot="icon"></i>
        </el-step>
        <el-step title="中转中">
          <i class="el-icon-guide" slot="icon"></i>
        </el-step>
        <el-step title="已发货(国外)">
          <i class="el-icon-truck" slot="icon"></i>
        </el-step>
        <el-step title="待支付">
          <i class="el-icon-bank-card" slot="icon"></i>
        </el-step>
        <el-step title="已支付">
          <i class="el-icon-s-finance" slot="icon"></i>
        </el-step>
      </el-steps>
    </el-card>
    <el-card v-else>
      <h1>运费查询</h1>
      <el-row :gutter="40">
        <el-col :span="12">
          <el-select v-model="inquire_date.send_address" placeholder="请选择" filterable clearable>
            <el-option
              v-for="item in countryList"
              :key="item.id"
              :label="item.zh_name"
              :value="item.zh_name">
            </el-option>
            <span slot="prefix" class="tip">请选择您的出发地</span>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-select v-model="inquire_date.destination" placeholder="请选择" filterable clearable>
            <el-option
              v-for="item in countryList"
              :key="item.id"
              :label="item.zh_name"
              :value="item.zh_name">
            </el-option>
            <span slot="prefix" class="tip">请选择您的目的地</span>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-select v-model="inquire_date.goods_info" placeholder="请选择" clearable>
            <el-option
              v-for="item in goodsType"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
            <span slot="prefix" class="tip">您的物品类型</span>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-input v-model="inquire_date.package" placeholder="请输入内容">
            <span slot="prefix" class="tip">请输入重量</span>
          </el-input>
        </el-col>
        <el-col :span="8" style="text-align:right;"><el-button type="primary" :loading="loading_upSearch" @click="up_search()">提交查询</el-button></el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "search_file",
  data() {
    return {
      inquire_date:{
        send_address:'',
        destination:'',
        goods_info:'',
        package:'',
        phone:'',
      },
      track_active:1,
      countryList: [],
      goodsType:['普货'],
      tracking_number:'',
      is_status:false,
      loading_upSearch:false
    };
  },
  created () {
    this.inquire_date.phone = JSON.parse(localStorage.getItem('loginForm')).iphone
    this.fetach()
  },
  methods: {
    fetach(){
      this.$get('api/orders/countries/').then(res=>{
        this.countryList = res.data
      })
    },
    track_search(){
      var obj = {tracking_number:this.tracking_number}
      this.$get('api/orders/trackingsearch/',obj).then(res=>{
        if(res&&res.code===0){
          if(res.data&&res.data.length>0){
            this.track_active = res.data[0].status+1
            this.is_status = true
          }else{
            this.$message.error('未查询到该运单状态')
          }
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    up_search(){
      if(!this.inquire_date.send_address||!this.inquire_date.destination){
        this.$message.error('请完整填写出发地和目的地')
      }else{
        this.loading_upSearch = true
        this.$post('api/info/inquireadd/',this.inquire_date).then(res=>{
          if(res&&res.code===0){
            this.$message.success('成功')
            this.inquire_date.send_address = ''
            this.inquire_date.destination = ''
            this.inquire_date.goods_info = ''
            this.inquire_date.package = ''
            this.loading_upSearch = false
          }else{
            this.$message.error(res.msg)
            this.loading_upSearch = false
          }
        }).catch(err=>{this.loading_upSearch = false})
      }
    },
  }
};
</script>
