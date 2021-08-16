<style scoped>
.login_right{padding: 41px 41px 50px 41px;text-align: left;}
.login_right img{margin-bottom: 30px;}
.login_right .el-button{width: 100%;background: #0071E3;line-height: 28px;}
.font1{font-size: 12px;color: #0071E3;cursor: pointer;display: flex;justify-content: space-between;}
.login_right .bottom{margin-bottom: 10px;}
.dialog /deep/ .el-dialog__header{display: none;padding: 0px;}
</style>
<template>
  <div>
    <el-row type="flex" justify="space-between">
      <el-col :span="10">
        <img src="@/assets/image/组 3357@2x.png" width="100%" height="100%">
      </el-col>
      <el-col :span="14" class="login_right">
        <img src="@/assets/image/logo_lan.png" width="140" >
        <el-form :model="dataForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item prop="iphone">
            <el-input v-model="dataForm.iphone">
              <i
                class="el-icon-mobile-phone el-input__icon"
                slot="prefix">
              </i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" class="bottom" v-if="type_a==1">
            <el-input v-model="dataForm.password" show-password >
              <i
                class="el-icon-lock el-input__icon"
                slot="prefix">
              </i>
            </el-input>
          </el-form-item>
          <el-form-item prop="message" class="bottom" v-else>
            <el-input v-model="dataForm.message">
              <i
                class="el-icon-lock el-input__icon"
                slot="prefix">
              </i>
              <template slot="append">
                <span @click="sendMsgDisabled?'':requireMessage()" style="cursor: pointer;">
                  <span v-if="!sendMsgDisabled">获取验证码</span>
                  <span v-else>{{codeTime}}s后重新获取</span>
                </span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item class="bottom">
            <div class="font1">
              <span v-if="type_a==1" @click="change(2)">验证码登录</span>
              <span v-else @click="change(1)">密码登录</span>
              <span @click="innerVisible = true">忘记密码?</span>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="submitForm_loading" @click="submitForm('ruleForm')">立即登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-dialog
      width="500px"
      class="dialog"
      top="20vh"
      :visible.sync="innerVisible"
      @close='foget_close()'
      append-to-body>
      <forgetPossword ref="forget"></forgetPossword>
    </el-dialog>
  </div>
</template>
<script>
import forgetPossword from "./forgetPossword";
export default {
  components:{forgetPossword},
  data() {
    return {
      type_a:1,
      codeTime:59,
      dataForm:{
        iphone:'',
        password:'',
        message:''
      },
      sendMsgDisabled:false,
      innerVisible:false,
      submitForm_loading:false,
      rules: {
        iphone: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        message: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    };
  },
  created () {
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.type_a==1){
            var obj={
              iphone:this.dataForm.iphone,
              password:this.dataForm.password
            }
            this.submitForm_loading = true
            this.$post('api/users/login',obj).then(res=>{
              if(res.code==0){
                localStorage.setItem('loginForm',JSON.stringify(res))
                this.$parent.$parent.close_login()
                this.submitForm_loading = false
                this.$message.success('登录成功')
                if(res.role_type==1||res.role_type==2){
                  this.$router.push({
                    path: "/admin",
                    name: "admin",
                  });
                }else{
                  this.$router.push({
                    path: "/customer",
                    name: "customer",
                  });
                }
              }else{
                this.$message.error(res.msg)
                this.submitForm_loading = false
              }
            }).catch(err=>{this.submitForm_loading = false})
          }else{
            var obj={
              iphone:this.dataForm.iphone,
              code:this.dataForm.message
            }
            this.submitForm_loading = true
            this.$post('api/users/smsdeng',obj).then(res=>{
              if(res.code==0){
                localStorage.setItem('loginForm',JSON.stringify(res))
                this.$parent.$parent.close_login()
                this.submitForm_loading = false
                this.$message.success('登录成功')
              }else{
                this.$message.error(res.msg)
                this.submitForm_loading = false
              }
            }).catch(err=>{this.submitForm_loading = false})
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      this.type_a=1
      this.$refs['ruleForm'].resetFields();
    },
    change(a){
      this.type_a = a
      this.dataForm.password = ''
      this.dataForm.message = ''
      this.$refs['ruleForm'].clearValidate();
    },
    foget_close(){
      this.$refs.forget.resetForm()
      this.innerVisible = false
      this.resetForm()
    },
    requireMessage(){
      if(this.dataForm.iphone){
        this.get_Verification()
      }else{
        this.$message.error('请输入手机号')
      }
    },
    get_Verification(){
      let me = this;
      let obj = {
        iphone:this.dataForm.iphone
      }
      // me.sendMsgDisabled = true;
      // let codeInterval = window.setInterval(function() {
      //     if ((me.codeTime--) <= 0) {
      //           me.codeTime = 59;
      //           me.sendMsgDisabled = false;
      //           window.clearInterval(codeInterval);
      //       }
      // }, 1000);
      this.$get('api/users/smssend',obj).then(res=>{
        if(res.code==0){
          me.sendMsgDisabled = true;
          let codeInterval = window.setInterval(function() {
            if ((me.codeTime--) <= 0) {
              me.codeTime = 59;
              me.sendMsgDisabled = false;
              window.clearInterval(codeInterval);
            }
          }, 1000);
        }
      })
    },
  }
};
</script>
