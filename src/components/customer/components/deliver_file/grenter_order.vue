<style scoped>
h1{color: #0071E3;font-size: 17px;font-weight: 'msyhbd';}
.h2{font-size: 12px;font-weight: normal;color: #0071E3;margin-left: 5px;}
.from_body{background: white;padding: 10px 33px;margin-bottom: 10px;}
.from_body .el-form-item{margin-bottom: 10px;}
.from_body .el-form-item /deep/ .el-form-item__label{line-height: 30px;padding: 0px;color: #333333;font-size: 13px;}
.from_body .el-select{width: 100%;}
.title{display: flex;align-items: center;}
.title .img{width: 33px;height: 33px;background: #0071E3;border-radius: 2px;display: flex;align-items: center;justify-content: center;margin-right: 10px;}
.teep{text-align: center;margin-top: 26px;}
.teep .el-button{background: #0071E3;width: 214px;}
.order_body{border: 1px solid #C2CFE0; padding: 15px 10px;color: #333333;font-size: 13px;margin-bottom: 10px;}
.order_body .tip{display: flex;align-items: center;}
.order_body .tip_img{
    border: 1px solid #C2CFE0;
    color: #0071E3;
    font-size: 23px;
    width: 33px;
    height: 33px;
    text-align: center;
    margin-right: 10px;
}
.order_body .el-row{flex-wrap: wrap;}
.order_body .el-row .el-col{margin: 5px 0px;}
.font1{font-size: 15px;}
table{width: 100%;border-collapse: collapse;text-align: center;font-size: 14px;margin-top: 10px;}
table td /deep/ .el-input__inner{border: none;padding: 0px;}
table th,td{padding: 5px;}
</style>
<template>
  <div>
    <h1>确认信息</h1>
    <div class="from_body">
      <div class="title">
        <div class="img">
          <!-- <img src="@/assets/image/寄@2x.png" width='22' height="30"> -->
          <span style="font-weight:blod;font-size:22px;color:white;">订</span>
        </div>
        <h1>确认订单</h1>
      </div>
      <div class="order_body">
          <el-row type="flex" align="middle">
              <el-col :span="6">
                  <div class="tip">
                      <div class="tip_img">发</div>
                      <span>姓名：{{formLabelAlign.d_name}}</span>
                  </div>
              </el-col>
              <el-col :span="6">联系电话：{{formLabelAlign.d_phone}}</el-col>
              <el-col :span="6">电子邮箱：{{formLabelAlign.d_email}}</el-col>
              <el-col :span="6">公司名称：{{formLabelAlign.d_company}}</el-col>
              <el-col :span="24" class='font1'>详细地址：{{formLabelAlign.d_address}}</el-col>
          </el-row>
      </div>
      <div class="order_body">
          <el-row type="flex" align="middle">
              <el-col :span="6">
                  <div class="tip">
                      <div class="tip_img">收</div>
                      <span>姓名：{{formLabelAlign.r_name}}</span>
                  </div>
              </el-col>
              <el-col :span="6">联系电话：{{formLabelAlign.r_phone}}</el-col>
              <el-col :span="6">电子邮箱：{{formLabelAlign.r_email}}</el-col>
              <el-col :span="6">公司名称：{{formLabelAlign.r_company}}</el-col>
              <el-col :span="24" class='font1'>详细地址：{{formLabelAlign.r_address}}</el-col>
              <el-col :span="24" class='font1'>清关代理信息：{{formLabelAlign.r_account_number}}</el-col>
          </el-row>
      </div>
      


      <div class="title" style="margin-top:50px;">
        <div class="img">
          <span style="font-weight:blod;font-size:22px;color:white;">货</span>
        </div>
        <h1>货品信息</h1>
      </div>
      <el-form label-position="top" label-width="80px" :model="formLabelAlign">
        <el-row :gutter="15">
          <el-col :span="5">
            <el-form-item label="尺寸（长/宽/高）" class="ckg">
              <el-input v-model="formLabelAlign.g_length" placeholder="长" style="width:45px;" size="small" disabled></el-input>
              <span>X</span>
              <el-input v-model="formLabelAlign.g_width" placeholder="宽" style="width:45px;" size="small" disabled></el-input>
              <span>X</span>
              <el-input v-model="formLabelAlign.g_height" placeholder="高" style="width:45px;" size="small" disabled></el-input>
              <span>厘米</span>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="毛重">
              <el-input v-model="formLabelAlign.gross_weight" size="small" style="width:55%;" disabled></el-input>
              <el-select v-model="formLabelAlign.weight_unit" size="small" style="width:40%;" placeholder='' disabled clearable>
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
                <el-switch v-model="formLabelAlign.is_customs" :active-value='1' :inactive-value='0' disabled></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="是否到付">
              <el-switch v-model="formLabelAlign.is_pay" :active-value='1' :inactive-value='0' disabled></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="是否保险">
              <el-switch v-model="formLabelAlign.is_insurance" :active-value='1' :inactive-value='0' disabled></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="DDP">
              <el-switch v-model="formLabelAlign.is_ddp" :active-value='1' :inactive-value='0' disabled></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="formLabelAlign.is_pay==1">
            <el-form-item label="请输入发货账号">
              <el-input v-model="formLabelAlign.shipping_account" disabled size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <!-- <el-col :span="5">
            <el-form-item label="产品数量（有限包装危险品）">
              <el-input v-model="formLabelAlign.limited_number" size="small" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="产品数量（非危险品）">
              <el-input v-model="formLabelAlign.non_danger_number" size="small" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="产品数量（危险品）">
              <el-input v-model="formLabelAlign.danger_number" size="small" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="申报货值">
              <el-input v-model="formLabelAlign.declared_value" size="small" style="width:55%;" disabled></el-input>
              <el-select v-model="formLabelAlign.currency" placeholder="单位" style="width:40%;" size="small" disabled clearable>
                <el-option
                  v-for="item in $Enum.CURRENCY"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :span="20">
            <table border="1" bordercolor="#BEBEBE">
              <tr>
                <th width='100'>类别</th>
                <th>品名</th>
                <th width='120'>数量</th>
                <th width='150'>
                  价格
                  <el-select v-model="formLabelAlign.currency" placeholder="单位" style="width:80px;" size="mini" disabled>
                    <el-option
                      v-for="item in $Enum.CURRENCY"
                      :key="item.name"
                      :label="item.name"
                      :value="item.name">
                    </el-option>
                  </el-select>
                </th>
              </tr>
              <tr v-for="(item,index) in formLabelAlign.prodlist">
                <td>
                  <el-select v-model="item.category" size="mini" disabled>
                    <el-option
                      v-for="item in $Enum.typeList"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </td>
                <td>
                  <el-input v-model="item.prodname" size="mini" disabled></el-input>
                </td>
                <td>
                  <el-input v-model="item.number" size="mini" disabled></el-input>
                </td>
                <td>
                  <el-input v-model="item.price" size="mini" disabled></el-input>
                </td>
              </tr>
              <tr>
                <td colspan="3"></td>
                <td align='left'>{{formLabelAlign.declared_value?formLabelAlign.declared_value:0}}</td>
              </tr>
            </table>
          </el-col>
          <el-col :span="4">
            <el-form-item label="上传发货文件">
              <!-- <div v-for="i in formLabelAlign.myfile">{{i.name}}</div> -->
              <el-upload
                ref="upload"
                class="upload-demo"
                :data="formLabelAlign_data"
                :action="hre"
                :file-list="formLabelAlign.fileList"
                :headers="myHeaders"
                :on-success="handleAvatarSuccess"
                name='myfile'
                :multiple='true'
                disabled
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary" class="button_primary" disabled>选取文件</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="订单备注">
              <el-input type="textarea" :rows="4" v-model="formLabelAlign.remark" disabled placeholder="您是否有订单备注信息，如有请在此点击填写，如您没有忽略此消息，点击下方立即生成订单"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="teep">
      <el-button type="primary"  @click="$parent.active--">上一步</el-button>
      <el-button type="primary" :loading="sure_loading" @click="next()">确定</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: ['formLabelAlign'],
  data() {
    return {
      // formLabelAlign: {},
      hre:process.env.API_BASEURL+'api/orders/orderlist/',
      value:'',
      options_unit:['kg'],
      myHeaders: {userToken: JSON.parse(localStorage.getItem('loginForm')).token},
      formLabelAlign_data:{},
      sure_loading:false
    };
  },
  created () {
    // this.formLabelAlign = Object.assign(this.$parent.personal_message,this.$parent.goods_message);
    // this.$forceUpdate()
  },
  methods: {
    next(){
      this.sure_loading = true
      if(!this.formLabelAlign.d_zipcode){this.formLabelAlign.d_zipcode=999077}
      
      this.formLabelAlign_data = JSON.parse(JSON.stringify(this.formLabelAlign))
      this.formLabelAlign_data.prodlist = JSON.stringify(this.formLabelAlign.prodlist)
      if(this.formLabelAlign_data.fileList&&this.formLabelAlign_data.fileList.length>0){
        this.$nextTick(()=>{
          this.$refs.upload.submit();
        })
      }else{
        this.$post('api/orders/orderlist/',this.formLabelAlign_data).then(res=>{
          if(res.code===0){
            this.$message.success('成功')
            this.$parent.getorder()
            this.sure_loading = false
          }else{
            this.$message.error(res.msg)
            this.sure_loading = false
          }
        }).catch(err=>{this.sure_loading = false})
      }
    },
    handleAvatarSuccess(res, file, fileList) {
        if (file.response.code === 0) {
            this.$message({
                message: '成功',
                type: 'success'
            })
            this.sure_loading = false
            this.$parent.getorder()
        } else {
            this.$message.error(file.response.msg)
            this.sure_loading = false
        }
    },
  }
};
</script>
