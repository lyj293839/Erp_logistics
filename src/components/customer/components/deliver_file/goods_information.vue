<style scoped>
h1{color: #0071E3;font-size: 17px;font-weight: 'msyhbd';}
.h2{font-size: 12px;font-weight: normal;color: #0071E3;margin-left: 5px;}
.from_body{background: white;padding: 10px 33px;margin-bottom: 10px;}
.from_body .el-form-item{margin-bottom: 15px;}
/* .from_body /deep/ .upload-demo{display: flex !important;}
.from_body /deep/ .upload-demo .el-upload-list__item:first-child{margin-top: 0px !important;} */
.from_body /deep/ .el-switch{height: 32px !important;line-height: 32px !important;}
.from_body /deep/ .el-form-item__content{line-height: normal !important;}
.from_body .el-form-item /deep/ .el-form-item__label{line-height: 30px;padding: 0px;color: #333333;font-size: 13px;}
.title{display: flex;align-items: center;}
.title .img{width: 33px;height: 33px;background: #0071E3;border-radius: 2px;display: flex;align-items: center;justify-content: center;margin-right: 10px;}
.teep{text-align: center;margin-top: 26px;}
.teep .el-button{background: #0071E3;width: 214px;}
.ckg{font-size: 12px;}
.ckg /deep/ .el-input__inner{padding: 0px 5px;}
.from_body .radio .el-radio{padding: 0px;text-align: center;width: 80px;line-height: 24px;margin: 0px 10px 5px 0px;}
.from_body .radio /deep/ .el-radio__input{display: none;}
.from_body .radio /deep/ .el-radio__label{color: #BDBDBD;padding: 0px;text-align: center;}
.from_body .radio /deep/ .is-checked{border-color: #0071E3;background: #0071E3;}
.from_body .radio /deep/ .is-checked .el-radio__label{color: white;}
.from_body /deep/ .input-with-select .el-input-group__prepend{background: white;}
.input-with-select .el-select{width: 110px;}
table{width: 100%;border-collapse: collapse;text-align: center;font-size: 14px;margin-top: 10px;}
table td /deep/ .el-input__inner{border: none;padding: 0px;}
table th,td{padding: 5px;}
</style>
<template>
  <div>
    <h1>货品信息 <span class="h2">带*为必填项</span></h1>
    <div class="from_body">
      <div class="title">
        <div class="img">
          <span style="font-weight:blod;font-size:22px;color:white;">货</span>
        </div>
        <h1>货品信息</h1>
      </div>
      <el-form label-position="top" label-width="80px" :model="formLabelAlign" :rules="rules" ref="ruleForm_g">
        <el-row :gutter="15">
          <el-col :span="5">
            <el-form-item label="尺寸（长/宽/高）" class="ckg" prop="g_length">
              <el-input v-model="formLabelAlign.g_length " placeholder="长" style="width:45px;" size="small"></el-input>
              <span>X</span>
              <el-input v-model="formLabelAlign.g_width" placeholder="宽" style="width:45px;" size="small"></el-input>
              <span>X</span>
              <el-input v-model="formLabelAlign.g_height" placeholder="高" style="width:45px;" size="small"></el-input>
              <span>厘米</span>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="毛重" prop="gross_weight">
              <el-input v-model="formLabelAlign.gross_weight" size="small" style="width:55%;"></el-input>
              <el-select v-model="formLabelAlign.weight_unit" size="small" style="width:40%;" placeholder='' clearable>
                <el-option
                  v-for="item in options_unit"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="是否报关">
                <el-switch v-model="formLabelAlign.is_customs" :active-value='1' :inactive-value='0'></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="是否到付">
              <el-switch v-model="formLabelAlign.is_pay" :active-value='1' :inactive-value='0' @change="is_pay_change()"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item>
              <span slot="label">是否保险
                <el-popover
                  placement="top"
                  width="150"
                  trigger="hover">
                  <span style="font-size:12px;color:#0071E3;">如果不购买保险   货物丢失按照国际快递政策赔偿 100美金</span>
                  <i slot="reference" class="el-icon-warning-outline" style="color:red;font-size:16px;"></i>
                </el-popover>
              </span>
              <el-switch v-model="formLabelAlign.is_insurance" :active-value='1' :inactive-value='0'></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="DDP">
              <el-switch v-model="formLabelAlign.is_ddp" :active-value='1' :inactive-value='0'></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="formLabelAlign.is_pay==1">
            <el-form-item label="请输入发货账号" prop="shipping_account">
              <el-input v-model="formLabelAlign.shipping_account" class="input-with-select" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="20">
            <table border="1" bordercolor="#BEBEBE">
              <tr>
                <th width='100'>类别</th>
                <th>品名</th>
                <th width='120'>数量</th>
                <th width='150'>
                  价格
                  <el-select v-model="formLabelAlign.currency" placeholder="单位" style="width:80px;" size="mini">
                    <el-option
                      v-for="item in $Enum.CURRENCY"
                      :key="item.name"
                      :label="item.name"
                      :value="item.name">
                    </el-option>
                  </el-select>
                </th>
                <th><el-button type="primary" icon="el-icon-plus" size="mini" class="button_primary" @click="add_prod()"></el-button></th>
              </tr>
              <tr v-for="(item,index) in formLabelAlign.prodlist">
                <td>
                  <el-select v-model="item.category" size="mini">
                    <el-option
                      v-for="item in typeList"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </td>
                <td>
                  <el-input v-model="item.prodname" size="mini"></el-input>
                </td>
                <td>
                  <el-input v-model="item.number" size="mini"></el-input>
                </td>
                <td>
                  <el-input v-model="item.price" size="mini" @input="change_price()"></el-input>
                </td>
                <td><el-button type="danger" icon="el-icon-minus" size="mini" @click="cancel_prod(index)"></el-button></td>
              </tr>
              <tr>
                <td colspan="3"></td>
                <td align='left'>{{formLabelAlign.declared_value?formLabelAlign.declared_value:0}}</td>
                <td></td>
              </tr>
            </table>
          </el-col>
          <el-col :span="4">
            <el-form-item label="上传发货文件">
              <el-upload
                class="upload-demo"
                :action="hre"
                :file-list="formLabelAlign.fileList"
                name='myfile'
                :multiple='true'
                :on-change="handlePreview"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary" class="button_primary">选取文件</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="订单备注">
              <el-input type="textarea" :rows="4" v-model="formLabelAlign.remark" placeholder="您是否有订单备注信息，如有请在此点击填写，如您没有忽略此消息，点击下方立即生成订单"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <h1>快递偏好 <span class="h2">请选择</span></h1>
    <div class="from_body">
      <el-form label-position="top" label-width="80px" :model="formLabelAlign">
        <el-row >
          <el-col :span="24">
            <el-form-item label=" " class="radio">
                <el-radio-group size="mini" v-model="formLabelAlign.express_like">
                  <el-radio label="" border>无</el-radio>
                  <el-radio label="Fedex" border>Fedex</el-radio>
                  <el-radio label="Dhl" border>Dhl</el-radio>
                  <el-radio label="USP" border>USP</el-radio>
                  <el-radio label="空运" border>空运</el-radio>
                  <el-radio label="海运" border>海运</el-radio>
                  <el-radio label="SF" border>SF</el-radio>
                </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <h1>发货单号 <span class="h2">请输入选项</span></h1>
    <div class="from_body">
      <el-form label-position="top" label-width="80px" :model="formLabelAlign">
        <el-row :gutter="15" type="flex" align="middle">
          <el-col :span="24">
            <el-form-item label="请输入发往深圳单号">
              <el-input v-model="formLabelAlign.tracking_number" class="input-with-select" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="teep">
      <el-button type="primary"  @click="up()">上一步</el-button>
      <el-button type="primary"  @click="next()">下一步</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: ['formLabelAlign'],
  data() {
    var validate_length = (rule, value, callback) => {
      if (value === ''||this.formLabelAlign.g_width===''||this.formLabelAlign.g_height==='') {
        // callback(new Error('请输入具体尺寸'));
        callback()
      } else {
        callback()
      }
    }
    var validate_weight = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入毛重'));
      } else {
        if(this.formLabelAlign.weight_unit===''){
          callback(new Error('请选择单位'));
        }else{
          callback()
        }
      }
    }
    var validate_declared = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入申报货值'));
      } else {
        if(this.formLabelAlign.currency===''){
          callback(new Error('请选择单位'));
        }else{
          callback()
        }
      }
    }
    var validate_shipping = (rule, value, callback) => {
      if(this.formLabelAlign.is_pay==1){
        if (value === '') {
          callback(new Error('请输入发货账号'));
        } else {
          callback()
        }
      }else{
        callback()
      }
    }
    return {
      hre:process.env.API_BASEURL+'api/orders/orderlist/',
      options_unit:['kg'],
      typeList:['EQ','P',"DG"],
      rules: {
        g_length: [
          {  validator: validate_length, trigger: 'blur' }
        ],
        gross_weight: [
          { required: true, validator: validate_weight, trigger: 'blur' }
        ],
        non_danger_number: [
          {  message: '请输入产品数量', trigger: 'blur' }
        ],
        limited_number: [
          { required: true, message: '请输入产品数量', trigger: 'blur' }
        ],
        danger_number: [
          {  message: '请输入产品数量', trigger: 'blur' }
        ],
        declared_value: [
          { required: true, validator: validate_declared, trigger: 'blur' }
        ],
        shipping_account: [
          { required: true, validator: validate_shipping, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    change_price(){
      var a = 0
      this.formLabelAlign.prodlist.forEach(item=>{
        a += Number(item.price)
      })
      this.formLabelAlign.declared_value = Number(a).toFixed(2)
    },
    add_prod(){
      this.formLabelAlign.prodlist.push({category:'P',prodname:'',number:'',price:''})
    },
    cancel_prod(index){
      if(this.formLabelAlign.prodlist.length>1){
        this.formLabelAlign.prodlist.splice(index,1)
      }else{
        this.$message.error('产品不能为空')
      }
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handlePreview(file,fileList) {
      this.formLabelAlign.fileList = fileList
      // fileList.forEach()
    },
    qq(e){
      console.log(e)
    },
    up(){
      this.$parent.active--
    },
    is_pay_change(){
      if(!this.formLabelAlign.is_pay||this.formLabelAlign.is_pay==0){
        this.formLabelAlign.shipping_account = ''
      }
    },
    next(){
      this.$refs['ruleForm_g'].validate((valid) => {
        if(valid){
          var arr = []
          this.formLabelAlign.prodlist.forEach((item,index)=>{
            if(item.prodname&&item.number&&item.price){
              arr.push(item)
            }
          })
            this.formLabelAlign.prodlist = arr
            this.$emit('func',this.formLabelAlign)
        }else{
          console.log('error submit!!');
          return false;
        }
      })
    }
  }
};
</script>
