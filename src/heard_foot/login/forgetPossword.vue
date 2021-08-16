<style scoped>
.el-step {
  font-size: 14px;
  color: #999999;
}
.el-form {
  width: 300px;
  margin: 0px auto;
}
.el-form-item {
  text-align: center;
}
.el-button {
  width: 300px;
  background: #0071E3;
}
.font1 {
  color: #1784fc;
  font-size: 12px;
  line-height: 22px;
  background: #d8ebff;
  border: 1px solid #0091ea;
  text-align: left;
  padding: 0px 10px;
  border-radius: 5px;
}
.el_steps /deep/ .is-finish .el-step__icon {
  background: #0071e3;
  border-color: #0071e3;
}
.el_steps /deep/ .is-finish .el-step__icon-inner {
  color: white;
}
.el_steps /deep/ .el-step__title {
  color: #999999;
  font-size: 14px;
}
.active3{
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
</style>
<template>
  <div>
    <el-steps class="el_steps" :active="active" align-center process-status="wait" finish-status="finish">
      <el-step title="账号信息"></el-step>
      <el-step title="重置密码"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
    <el-form v-if="active==1" :model="dataForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <el-form-item prop="iphone">
        <el-input v-model="dataForm.iphone"></el-input>
      </el-form-item>
      <el-form-item prop="message">
        <el-input v-model="dataForm.message">
          <template slot="append">
            <span @click="sendMsgDisabled?'':requireMessage()">
              <span v-if="!sendMsgDisabled">获取验证码</span>
              <span v-else>{{codeTime}}s后重新获取</span>
            </span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="submitForm_loading" @click="submitForm('ruleForm')">下一步</el-button>
      </el-form-item>
      <el-form-item>
        <div class="font1">
          忘记登录账号？
          <br />请联系物流客服：13605188562 人工申述
        </div>
      </el-form-item>
    </el-form>
    <el-form
      v-if="active==2"
      :model="dataForm_next"
      :rules="rules_next"
      ref="ruleForm_next"
      class="demo-ruleForm"
    >
      <el-form-item prop="pass">
        <el-input type="password" placeholder="密码" v-model="dataForm_next.pass" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input
          type="password"
          placeholder="确认密码"
          v-model="dataForm_next.checkPass"
          show-password
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="submitForm_next_loading" @click="submitForm_next('ruleForm_next')">下一步</el-button>
      </el-form-item>
    </el-form>
    <div v-if="active==3" class="active3">
        <div style="width:300px;height:100px;background:#C5C5C5;margin:30px 0px;"></div>
        <el-button type="primary" @click="toLogin()">去登陆</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.dataForm_next.checkPass !== "") {
          this.$refs.ruleForm_next.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.dataForm_next.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      active: 1,
      codeTime: 59,
      dataForm: {
        iphone: "",
        message: ""
      },
      dataForm_next: {
        pass: "",
        checkPass: ""
      },
      token:'',
      sendMsgDisabled: false,
      submitForm_loading:false,
      submitForm_next_loading:false,
      rules: {
        iphone: [{required: true, message: '请输入电话', trigger: "blur" }],
        message: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      rules_next: {
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [{ required: true, validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  created() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitForm_loading = true
          var obj={
            iphone:this.dataForm.iphone,
            code:this.dataForm.message
          }
          this.$post('api/users/smsdeng',obj).then(res=>{
            if(res.code==0){
              this.token = res.token
              this.submitForm_loading = false
              this.active++;
              this.$refs["ruleForm"].resetFields()
            }else{
              this.$message.error(res.msg)
              this.submitForm_loading = false
            }
          }).catch(err=>{this.submitForm_loading = false})
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitForm_next(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitForm_next_loading = true
          var obj = {
            token:this.token,
            password:this.dataForm_next.pass,
          }
          this.$post('api/users/smsforget',obj).then(res=>{
            if(res.code==0){
              this.token = res.token
              this.submitForm_next_loading = false
              this.active++;
              this.$refs["ruleForm_next"].resetFields()
            }else{
              this.$message.error(res.msg)
              this.submitForm_next_loading = false
            }
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    toLogin(){
      this.$parent.$parent.foget_close()
    },
    requireMessage() {
      if (this.dataForm.iphone) {
        this.get_Verification();
      } else {
        this.$message.error("请输入手机号");
      }
    },
    resetForm() {
        this.active = 1
      this.$refs["ruleForm"]?this.$refs["ruleForm"].resetFields():'';
      this.$refs["ruleForm_next"]?this.$refs["ruleForm_next"].resetFields():'';
    },
    get_Verification() {
      let me = this;
      let obj = {
        iphone:this.dataForm.iphone
      }
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
    }
  }
};
</script>
