<style scoped>
.content {
  padding: 14px 27px;
  text-align: center;
}
.heard {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.heard span {
  color: #000000;
  font-size: 17px;
}
.body {
  padding: 20px;
  margin-bottom: 40px;
  text-align: left;
  color: #333333;
}
.body .el-form-item {
  margin-bottom: 10px;
}
.body .el-form-item /deep/ .el-form-item__label {
  padding-bottom: 0px;
}
.body /deep/ .is-disabled .el-input__inner {
  background-color: #c2cfe0;
  border-color: #c2cfe0;
  /* cursor: text; */
  color: #333333;
}
</style>
<template>
  <div class="content">
    <div class="heard">
      <span>单个添加</span>
      <el-button type="primary" class="button_primary" size="mini" @click="toOrder()">上一步</el-button>
    </div>
    <div class="body">
      <el-form label-position="top" label-width="80px" :model="formLabelAlign" :rules="rules" ref="ruleForm">
        <el-row :gutter="47">
          <el-col :span="6">
            <el-form-item label="用户名称" prop="username">
              <el-input v-model="formLabelAlign.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户手机号" prop="iphone">
              <el-input v-model="formLabelAlign.iphone" :disabled="formLabelAlign.id?true:false"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="formLabelAlign.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系公司" prop="company_name">
              <el-input v-model="formLabelAlign.company_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发票抬头" prop="invoice_title">
              <el-input v-model="formLabelAlign.invoice_title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发票税号" prop="tax_number">
              <el-input v-model="formLabelAlign.tax_number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="地址开户行" prop="bank">
              <el-input v-model="formLabelAlign.bank"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发票账号" prop="account">
              <el-input v-model="formLabelAlign.account"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地址" prop="address">
              <el-input v-model="formLabelAlign.address"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="登陆密码" prop="password" v-if="!formLabelAlign.id">
              <el-input v-model="formLabelAlign.password" show-password></el-input>
            </el-form-item>
            <el-form-item label="重置密码" v-else>
              <el-input v-model="formLabelAlign.password" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="确认密码" prop="checkPass">
              <el-input v-model="formLabelAlign.checkPass" show-password></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客户经理" prop="saler_id">
              <el-select v-model="formLabelAlign.saler_id" placeholder="请选择" clearable>
                <el-option
                  v-for="item in adminList"
                  :key="item.id"
                  :label="item.userinfo.username"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="47">
          <el-col :span="6">
            <el-form-item label="P操作费首个费用" prop="operate_p_first">
              <el-input v-model="formLabelAlign.operate_p_first" @input="formLabelAlign.operate_p_first=$All.tofixed(formLabelAlign.operate_p_first)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="P操作费增加费用" prop="operate_p_add">
              <el-input v-model="formLabelAlign.operate_p_add" @input="formLabelAlign.operate_p_add=$All.tofixed(formLabelAlign.operate_p_add)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="P操作费到付首个费用" prop="operate_p_add">
              <el-input v-model="formLabelAlign.operate_p_pay" @input="formLabelAlign.operate_p_pay=$All.tofixed(formLabelAlign.operate_p_pay)"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="47">
          <el-col :span="6">
            <el-form-item label="DG操作费首个费用" prop="operate_dg_first">
              <el-input v-model="formLabelAlign.operate_dg_first" @input="formLabelAlign.operate_dg_first=$All.tofixed(formLabelAlign.operate_dg_first)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="DG操作费增加费用" prop="operate_dg_add">
              <el-input v-model="formLabelAlign.operate_dg_add" @input="formLabelAlign.operate_dg_add=$All.tofixed(formLabelAlign.operate_dg_add)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="DG操作费超重费用" prop="operate_dg_weight">
              <el-input v-model="formLabelAlign.operate_dg_weight" @input="formLabelAlign.operate_dg_weight=$All.tofixed(formLabelAlign.operate_dg_weight)"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="47">
          <el-col :span="6">
            <el-form-item label="EQ操作费首个费用" prop="operate_eq_first">
              <el-input v-model="formLabelAlign.operate_eq_first" @input="formLabelAlign.operate_eq_first=$All.tofixed(formLabelAlign.operate_eq_first)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="EQ操作费增加费用" prop="operate_eq_add">
              <el-input v-model="formLabelAlign.operate_eq_add" @input="formLabelAlign.operate_eq_add=$All.tofixed(formLabelAlign.operate_eq_add)"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-button type="primary" class="button_primary" style="width:243px;" :loading="loading" @click="save()">确认上传</el-button>
  </div>
</template>
<script>
export default {
  name: "ad_customer_add",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if(this.formLabelAlign.id){
        if (value === ''&&this.formLabelAlign.password) {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formLabelAlign.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }else{
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formLabelAlign.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
    }
    return {
      formLabelAlign: {
        iphone: "",
        password: "",
        checkPass:'',
        username: "",
        company_name: "",
        invoice_title: "",
        tax_number: "",
        bank: "",
        account: "",
        address: "",
        email:'',
        saler_id: '',
        role_type:0,
        operate_dg_first:1500,
        operate_dg_add:150,
        operate_dg_weight:15,
        operate_eq_first:500,
        operate_eq_add:50,
        operate_p_first:100,
        operate_p_add:10,
        operate_p_pay:150
      },
      loading:false,
      adminList:[],
      rules: {
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        iphone: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        checkPass: [
          {required: true, validator: validatePass2, trigger: 'blur' }
        ],
        company_name: [
          { required: true, message: '请输入联系公司', trigger: 'blur' }
        ],
        invoice_title: [
          { required: true, message: '请输入发票抬头', trigger: 'blur' }
        ],
        tax_number: [
          { required: true, message: '请输入税号', trigger: 'blur' }
        ],
        bank: [
          { required: true, message: '请输入开户行', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入发票账号', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        saler_id: [
          { required: true, message: '请选择客户经理', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请选择邮箱', trigger: 'blur' }
        ],
        operate_dg_first: [
          { required: true, message: '请填写', trigger: 'blur' }
        ],
        operate_dg_add: [
          { required: true, message: '请填写', trigger: 'blur' }
        ],
        operate_dg_weight: [
          { required: true, message: '请填写', trigger: 'blur' }
        ],
        operate_eq_first: [
          { required: true, message: '请填写', trigger: 'blur' }
        ],
        operate_eq_add: [
          { required: true, message: '请填写', trigger: 'blur' }
        ],
        operate_p_first: [
          { required: true, message: '请填写', trigger: 'blur' }
        ],
        operate_p_add: [
          { required: true, message: '请填写', trigger: 'blur' }
        ],
        operate_p_pay: [
          { required: true, message: '请填写', trigger: 'blur' }
        ],
      }
    };
  },
  created () {
    this.$get('api/users/userlist',{type:1}).then(res=>{
      if(res.code===0){
        this.adminList = res.data
      }else{
        this.$message.error(res.msg)
      }
    })
    if(this.$route.query.id){
      this.fetach(this.$route.query.id)
    }
  },
  methods: {
    fetach(id){
      this.$get('api/users/userapi/'+id).then(res=>{
        if(res.code===0){
          this.formLabelAlign = {
            id:res.data.id,
            iphone: res.data.iphone,
            password: "",
            checkPass:'',
            username: res.data.userinfo.username,
            company_name: res.data.userinfo.company_name,
            invoice_title: res.data.userinfo.invoice_title,
            tax_number: res.data.userinfo.tax_number,
            bank: res.data.userinfo.bank,
            account: res.data.userinfo.account,
            address: res.data.userinfo.address,
            email:res.data.userinfo.email,
            saler_id: res.data.userinfo.saler_id,
            role_type:0,
            operate_dg_first:res.data.userinfo.operate_dg_first,
            operate_dg_add:res.data.userinfo.operate_dg_add,
            operate_dg_weight:res.data.userinfo.operate_dg_weight,
            operate_eq_first:res.data.userinfo.operate_eq_first,
            operate_eq_add:res.data.userinfo.operate_eq_add,
            operate_p_first:res.data.userinfo.operate_p_first,
            operate_p_add:res.data.userinfo.operate_p_add,
            operate_p_pay:res.data.userinfo.operate_p_pay,
          }
        }else{this.$message.error(res.msg)}
      })
    },
    save(){
      this.$refs['ruleForm'].validate((valid)=>{
        if(valid){
          this.loading = true
          this.$post(this.formLabelAlign.id?("api/users/userapi/"+this.formLabelAlign.id):'api/users/userlist',this.formLabelAlign).then(res=>{
            if(res.code==0){
              this.$message.success(this.formLabelAlign.id?'修改成功':'添加成功')
              this.formLabelAlign = {
                iphone: "",
                password: "",
                checkPass:'',
                username: "",
                company_name: "",
                invoice_title: "",
                tax_number: "",
                bank: "",
                account: "",
                address: "",
                email:'',
                saler_id: '',
                role_type:0
              }
              this.$refs['ruleForm'].clearValidate();
              this.loading = false
              this.toOrder()
            }else{
              this.$message.error(res.msg)
              this.loading = false
            }
          }).catch(err=>{this.loading = false})
        }else{
          console.log('error submit!!');
          return false;
        }
      })
    },
    toOrder() {
      this.$router.push({
        path: "/ad_service",
        name: "ad_service"
      });
    }
  }
};
</script>