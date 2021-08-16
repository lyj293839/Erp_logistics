<style scoped>
.content{padding: 20px 30px;}
.list{box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.16);background: white;padding: 21px 28px;font-size: 14px;color: #333333;min-height: 80vh;}
.list .el-row{margin: 20px 0px;padding: 0px 10px;}
.list .el-col{margin-bottom: 20px;}
.card{
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.16);
  font-size: 12px;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  position: relative;
  height: 70px;
}
.card_add{
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.16);
  font-size: 12px;
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  background: #0071E3;
  color: white;
  font-size: 12px;
  height: 70px;
}
.card .index{
  position: absolute;
  top: 5px;
  left: 5px;
  color: #707070;
  font-size: 12px;
}
.card i{
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-size: 12px;
  color: #0071E3;
}
.button{color: #0071E3;border: 1px solid #0071E3;width: 100px;height: 24px;line-height: 24px;border-radius: 12px;margin: 0px auto;margin-top: 5px;}
.dialog {text-align: center;}
.dialog .el-form{text-align: left;width: 90%;margin: 0px auto;}
.dialog /deep/ .el-form-item__label{padding-bottom: 0px;line-height:20px;}
.dialog /deep/ .el-dialog__footer{text-align: center;}
</style>
<template>
  <div class="content">
    <div class="list">
      <div>用户列表</div> 
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="card_add" @click="innerVisible = true">
            <div style="text-align: center;width:100%;">
              <i class="el-icon-circle-plus-outline" style="font-size:30px;"></i>
              <div>添加角色</div>
            </div>
          </div>
        </el-col>
        <el-col :span="4" v-for="(item,index) in list.data">
          <div class="card" @click="Edit(item)">
            <div>{{item.userinfo?item.userinfo.username:'null'}}</div>
            <div><b>{{item.iphone}}</b></div>
            <div class="button">{{item.role_type}}</div>
            <div class="index"><b>{{index+1}}.</b></div>
            <i class="el-icon-delete" @click.stop="cancel(item.id)"></i>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      width="900px"
      class="dialog"
      title="添加角色"
      @close="closeDialog()"
      :visible.sync="innerVisible">
      <div>
        <el-form label-position="top" :model="formData" :rules="rules" ref="ruleForm">
          <el-row :gutter="10" type="flex" align="middle" justify="center">
            <el-col :span="5">
              <el-form-item label="名称" prop="username">
                <el-input size="small" v-model="formData.username"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="角色名称" prop="role_type">
                <el-input size="small" v-model="formData.role_type"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="角色账号" prop="iphone">
                <el-input size="small" v-model="formData.iphone" :disabled="formData.id?true:false"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="角色密码" prop="password" v-if="!formData.id">
                <el-input size="small" show-password v-model="formData.password"></el-input>
              </el-form-item>
              <el-form-item label="重置密码" v-else>
                <el-input size="small" show-password v-model="formData.password"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="确认密码" prop="checkPass">
                <el-input size="small" show-password v-model="formData.checkPass"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" plain class='button_plain' @click="innerVisible = false">取消</el-button>
        <el-button size="small" type="primary" class="button_primary" :loading="Add_loading" @click="Add_sure()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "ad_permission",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if(this.formData.id){
        if (value === ''&&this.formData.password) {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formData.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }else{
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formData.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
    }
    return {
      formData:{
        username:'',
        role_type:'',
        iphone:'',
        password:'',
        checkPass:''
      },
      list:{},
      Add_loading:false,
      innerVisible:false,
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
        role_type: [
          { required: true, message: '请选择角色名称', trigger: 'blur' }
        ]
      }
    };
  },
  created () {
    this.fetach()
  },
  methods: {
    fetach(){
      this.$get('api/users/userlist',{type:1}).then(res=>{
        if(res.code===0){
          this.list = res
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    Edit(item){
      this.formData={
        id:item.id,
        username:item.userinfo?item.userinfo.username:'',
        role_type:item.role_type,
        iphone:item.iphone,
        password:'',
        checkPass:''
      }
      this.innerVisible = true
    },
    Add_sure(){
      this.$refs['ruleForm'].validate((valid)=>{
        if(valid){
          this.Add_loading = true
          this.$post(this.formData.id?("api/users/userapi/"+this.formData.id):'api/users/userlist',this.formData).then(res=>{
            if(res.code==0){
              this.fetach()
              this.closeDialog()
            }else{
              this.$message.error(res.msg)
              this.Add_loading = false
            }
          }).catch(err=>{this.Add_loading = false})
        }else{
          console.log('error submit!!');
          return false;
        }
      })
    },
    cancel(id){
      this.$confirm('此操作将删除该人员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$get('api/users/usercancel/'+id).then(res=>{
              if (res.code ===0){
                this.$message.success(res.msg);
                this.fetach()
              }else{
                this.$message.error(res.msg);
              }
          }).catch(function(error) {
              console.log(error)
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    closeDialog(){
      this.Add_loading = false
      this.formData={
        username:'',
        role_type:'',
        iphone:'',
        password:'',
        checkPass:''
      }
      this.$refs['ruleForm'].clearValidate();
      this.innerVisible = false
    },
  }
};
</script>