<style scoped>
h1{color: #0071E3;font-size: 17px;font-weight: 'msyhbd';}
.h2{font-size: 12px;font-weight: normal;color: #0071E3;margin-left: 5px;}
.from_body{background: white;padding: 10px 33px;margin-bottom: 10px;}
.from_body .el-select{width: 100%;}
.from_body .el-form-item{margin-bottom: 15px;}
.from_body .el-form-item /deep/ .el-form-item__label{line-height: 25px;padding: 0px;color: #333333;font-size: 13px;}
.title{display: flex;align-items: center;}
.title .img{width: 33px;height: 33px;background: #0071E3;border-radius: 2px;display: flex;align-items: center;justify-content: center;margin-right: 10px;}
.teep{text-align: center;margin-top: 26px;}
.teep .el-button{background: #0071E3;width: 214px;}
</style>
<template>
  <div>
    <h1>寄/收件信息 <span class="h2">带*为必填项</span></h1>
    <div class="from_body">
      <div class="title">
        <div class="img">
          <!-- <img src="@/assets/image/寄@2x.png" width='22' height="30"> -->
          <span style="font-weight:blod;font-size:22px;color:white;">寄</span>
        </div>
        <h1>发货人信息</h1>
      </div>
      <el-form label-position="top" label-width="80px" :model="formLabelAlign" :rules="rules" ref="ruleForm_d">
        <el-row :gutter="15">
          <el-col :span="6">
            <el-form-item label="国家/Country" prop="d_country">
              <el-select v-model="formLabelAlign.d_country" filterable :filter-method="filter_method_d" placeholder="请选择" size="small" @change="country_change()">
                <el-option
                  v-for="item in countryList_d"
                  :key="item.id"
                  :label="item.en_name"
                  :value="item.en_name">
                  <span style="float: left">{{item.en_name}}</span>
                  <span style="float: right; color: #8492a6;">{{ item.zh_name }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="省/州/State/Province" prop="d_provice" v-if="formLabelAlign.d_country!='China'">
              <el-input v-model="formLabelAlign.d_provice" size="small"></el-input>
            </el-form-item>
            <div v-else>&nbsp;</div>
          </el-col>
          <el-col :span="6">
            <el-form-item label="城市/City" prop="d_city" v-if="formLabelAlign.d_country!='China'">
              <el-input v-model="formLabelAlign.d_city" size="small"></el-input>
            </el-form-item>
            <div v-else>&nbsp;</div>
          </el-col>
          <el-col :span="6">
            <el-form-item label="邮编/Zip Code" prop="d_zipcode">
              <el-input v-model="formLabelAlign.d_zipcode" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="公司名称/Company Name" prop="d_company">
              <el-input v-model="formLabelAlign.d_company" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发货人姓名/Consigner Name" prop="d_name">
              <el-input v-model="formLabelAlign.d_name" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系电话/Phone Number" prop="d_phone">
              <el-input v-model="formLabelAlign.d_phone" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="电子邮箱/Email" prop="d_email">
              <el-input v-model="formLabelAlign.d_email" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="详细地址/Address" prop="d_address">
              <el-input v-model="formLabelAlign.d_address" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="from_body">
      <div class="title">
        <div class="img" style="background:#FF2C2C;">
          <span style="font-weight:blod;font-size:22px;color:white;">收</span>
        </div>
        <h1 style="color:#FF2C2C;">收货人信息</h1>
      </div>
      <el-form label-position="top" label-width="80px" :model="formLabelAlign" :rules="rules" ref="ruleForm_r">
        <el-row :gutter="15">
          <el-col :span="6">
            <el-form-item label="国家/Country" prop="r_country">
              <el-select v-model="formLabelAlign.r_country" filterable :filter-method="filter_method_r" placeholder="请选择" size="small">
                <el-option
                  v-for="item in countryList_r"
                  :key="item.id"
                  :label="item.en_name"
                  :value="item.en_name">
                  <span style="float: left">{{ item.en_name }}</span>
                  <span style="float: right; color: #8492a6;">{{ item.zh_name }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="省/州/State/Province" prop="r_provice">
              <el-input v-model="formLabelAlign.r_provice" size="small"></el-input>
              <!-- <el-select v-model="formLabelAlign.r_provice" placeholder="请选择" size="small">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select> -->
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="城市/City" prop="r_city">
              <el-input v-model="formLabelAlign.r_city" size="small"></el-input>
              <!-- <el-select v-model="formLabelAlign.r_city" placeholder="请选择" size="small">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select> -->
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="邮编/Zip Code" prop="r_zipcode">
              <el-input v-model="formLabelAlign.r_zipcode" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="收货人姓名/Consignee Name" prop="r_name">
              <el-input v-model="formLabelAlign.r_name" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系电话/Phone Number" prop="r_phone">
              <el-input v-model="formLabelAlign.r_phone" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="公司名称/Company Name" prop="r_company">
              <el-input v-model="formLabelAlign.r_company" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="电子邮箱/Email" prop="r_email">
              <el-input v-model="formLabelAlign.r_email" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="详细地址/Address" prop="r_address">
              <el-input v-model="formLabelAlign.r_address" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="是否清关代理">
                <el-switch v-model="is_r_custom_broker" @change="custom_broker_change()"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="21" v-if="is_r_custom_broker">
            <el-form-item label="清关代理公司/Custom Broker" prop="r_custom_broker">
              <el-input v-model="formLabelAlign.r_custom_broker" size="small"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="收货人物流账号/Consignee Account Number" prop="r_account_number">
              <el-input v-model="formLabelAlign.r_account_number" size="small"></el-input>
            </el-form-item>
          </el-col> -->
        </el-row>
      </el-form>
    </div>
    <div class="teep">
      <el-button type="primary" @click="next()">下一步</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: ['formLabelAlign'],
  data() {
    return {
      countryList:[],
      countryList_d:[],
      countryList_r:[],
      is_r_custom_broker:false,
      rules: {
        d_name: [
          {  message: '请输入姓名', trigger: 'blur' }
        ],
        r_name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        d_phone: [
          {  message: '请输入手机号', trigger: 'blur' }
        ],
        r_phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        d_email: [
          {  message: '请输入邮箱', trigger: 'blur' }
        ],
        r_email: [
          {  message: '请输入邮箱', trigger: 'blur' }
        ],
        d_company: [
          { required: true, message: '请输入公司', trigger: 'blur' }
        ],
        r_company: [
          { required: true, message: '请输入公司', trigger: 'blur' }
        ],
        d_country: [
          { required: true, message: '请选择国家', trigger: 'blur' }
        ],
        r_country: [
          { required: true, message: '请选择国家', trigger: 'blur' }
        ],
        d_provice: [
          {  message: '请选择省/州', trigger: 'blur' }
        ],
        r_provice: [
          { message: '请选择省/州', trigger: 'blur' }
        ],
        d_city: [
          {  message: '请选择城市', trigger: 'blur' }
        ],
        r_city: [
          { required: true, message: '请选择城市', trigger: 'blur' }
        ],
        d_zipcode: [
          { message: '请输入邮编', trigger: 'blur' }
        ],
        r_zipcode: [
          {  message: '请输入邮编', trigger: 'blur' }
        ],
        d_address: [
          {  message: '请输入详细地址', trigger: 'blur' }
        ],
        r_address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        r_custom_broker: [
          { required: true,message: '请输入清关代理公司', trigger: 'blur' }
        ],
        r_account_number: [
          { required: true, message: '请输入收货人物流账号', trigger: 'blur' }
        ]
      }
    };
  },
  created () {
    this.$get('api/orders/countries/').then(res=>{
      this.countryList = res.data
      this.countryList_d = res.data
      this.countryList_r = res.data
    })
  },
  methods: {
    country_change(){
      if(this.formLabelAlign.d_country=='China'){
        this.formLabelAlign.d_provice = ''
        this.formLabelAlign.d_city = ''
      }
    },
    custom_broker_change(){
      if(!this.is_r_custom_broker){
        this.formLabelAlign.r_custom_broker = ''
      }
    },
    filter_method_d(val){
      if(val){
        this.countryList_d = this.countryList.filter((item) => {
          if (item.en_name.toLowerCase().indexOf(val.toLowerCase())===0) {
            return true
          }
        })
      }else{
        this.countryList_d = this.countryList
      }
    },
    filter_method_r(val){
      if(val){
        this.countryList_r = this.countryList.filter((item) => {
          if (item.en_name.toLowerCase().indexOf(val.toLowerCase())===0) {
            return true
          }
        })
      }else{
        this.countryList_r = this.countryList
      }
    },
    next(){
      this.$refs['ruleForm_d'].validate((valid) => {
        if(valid){
          this.$refs['ruleForm_r'].validate((valid_a) => {
            if(valid_a){
              this.$emit('func',this.formLabelAlign)
            }else{
              console.log('error submit!!');
              return false;
            }
          })
        }else{
          console.log('error submit!!');
          return false;
        }
      })
    }
  }
};
</script>
