<style scoped>
.content{padding: 10px 0px 40px 0px;}
.body{width: 1000px;margin: 0px auto;background: white;padding: 0px 35px 20px 35px;text-align: center;}
.body .el-button{width: 214px;}
.body li{
  border-bottom: 1px solid #707070;
  padding: 10px 0px;
  display: flex;
  align-items: center;
  text-align: left;
  justify-content: space-between;
  font-size: 14px;
}
.body li /deep/ .el-form-item{margin-bottom: 0px;width: 100%;}
.body li /deep/ .el-input__inner{border: none;border-bottom: 1px solid #DCDFE6;}
/* .body li div{width: 100%;display: flex;align-items: center;} */
.body .el-button{margin-top: 10px;}
.text{align-items: flex-end;font-size: 13px;color: #333333;text-align: left;justify-content: flex-start !important;}
.text div{display: block !important;}
.font1{font-size: 22px;line-height: 40px;}
.font2{font-size: 16px;line-height: 40px;}
</style>
<template>
  <div class="content">
    <div class="body">
      <el-form label-position="left" label-width="100px" :model="userinfo" :rules="rules" ref="ruleForm">
      <ul>
        <li class="text">
          <img src="@/assets/image/NoPath - 副本@2x.png" width="91" height="91" style="margin-right:20px;">
          <div>
            <div>会员账号</div>
            <div class="font1">{{loginForm.iphone}}</div>
            <div>用户登录和验证身份，同时也是您个人信息的一部分</div>
          </div>
        </li>
        <li>
          <el-form-item label="姓名：" prop="username">
            <el-input size="small" v-model="userinfo.username"></el-input>
          </el-form-item>
        </li>
        <li>
          <el-form-item label="企业名称：" prop='company_name'>
            <el-input size="small" v-model="userinfo.company_name"></el-input>
          </el-form-item>
        </li>
        <li>
          <el-form-item label="新密码：">
            <el-input size="small" v-model="userinfo.password" show-password></el-input>
          </el-form-item>
        </li>
        <li>
          <el-form-item label="确认密码：" prop='checkPass'>
            <el-input size="small" v-model="userinfo.checkPass" show-password></el-input>
          </el-form-item>
        </li>
        <li><span class="font2"><b>发票设置</b></span></li>
        <li>
          <el-form-item label="发票抬头：" prop='invoice_title'>
            <el-input size="small" v-model="userinfo.invoice_title"></el-input>
          </el-form-item>
        </li>
        <li>
          <el-form-item label="发票税号：" prop='tax_number'>
            <el-input size="small" v-model="userinfo.tax_number"></el-input>
          </el-form-item>
        </li>
        <li>
          <el-form-item label="发票账号：" prop='account'>
            <el-input size="small" v-model="userinfo.account"></el-input>
          </el-form-item>
        </li>
        <li>
          <el-form-item label="开户行：" prop='bank'>
            <el-input size="small" v-model="userinfo.bank"></el-input>
          </el-form-item>
        </li>
        <li>
          <el-form-item label="接收邮箱：" prop='email'>
            <el-input size="small" v-model="userinfo.email"></el-input>
          </el-form-item>
        </li>
        <li>
          <el-form-item label="地址：" prop='address'>
            <el-input size="small" v-model="userinfo.address"></el-input>
          </el-form-item>
        </li>
      </ul>
      </el-form>
      <el-button type="primary" class="button_primary" :loading="loading_save" @click="save()">保存</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "customer_personal",
  data() {
    var validatePass = (rule, value, callback) => {
      if(this.userinfo.password){
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.userinfo.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }else{
        callback();
      }
    }
    return {
      input: "",
      userinfo:{},
      loginForm:JSON.parse(localStorage.getItem('loginForm')),
      loading_save:false,
      rules: {
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass, trigger: 'blur' }
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
        email: [
          { required: true, message: '请选择邮箱', trigger: 'blur' }
        ]
      }
    };
  },
  created () {
    this.fetach()
  },
  methods: {
    fetach(){
      this.$get('api/users/userinfo/').then(res=>{
        if(res&&res.code===0){
          this.userinfo = res.data.userinfo
        }else{this.$message.error(res.msg)}
      })
    },
    save(){
      this.$refs['ruleForm'].validate((valid)=>{
        if(valid){
          this.loading_save = true
          this.$post('api/users/userapi/'+this.userinfo.user_id,this.userinfo).then(res=>{
            if(res&&res.code===0){
              this.$message.success('成功')
              this.fetach()
              this.loading_save = false

              this.loginForm.company_name = this.userinfo.company_name
              this.$parent.$parent.$parent.loginForm = this.loginForm
              localStorage.setItem('loginForm',JSON.stringify(this.loginForm))
            }else{
              this.$message.error(res.msg)
              this.loading_save = false
            }
          }).catch(err=>{this.loading_save = false})
        }else{
          console.log('error submit!!');
          return false;
        }
      })
    }
  }
};
</script>
