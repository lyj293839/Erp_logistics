<style scoped>
.body{display: flex;justify-content:center;align-items: center;margin-bottom: 20px;}
</style>
<template>
  <div style="text-align:center;">
      <div class="body">
        <el-upload
            class="upload-demo"
            ref="upload"
            :auto-upload="false"
            drag
            :data="{file_type:0}"
            :headers="myHeaders"
            :action="$All.URL+'api/orders/upfile/'+cargo_id"
            :before-remove="beforeRemove"
            :on-success="handleAvatarSuccess"
            :file-list="fileList"
            name='myfile'
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </div>
      <div>
        <el-button type="primary" class="button_primary" @click="submitUpload" round>完成</el-button>
      </div>
  </div>
</template>
<script>
export default {
  props: ['cargo_id'],
  data() {
    return {
      fileList: [],
      Id:'',
      myHeaders: {userToken: JSON.parse(localStorage.getItem('loginForm')).token}
    };
  },
  methods: {
    submitUpload() {
        this.$refs.upload.submit();
        setTimeout(()=>{
            this.fileList = []
            this.$parent.$parent.close_file()
        },1000)
    },
    handleAvatarSuccess(res, file, fileList) {
        if (res.code === 0) {
            this.$message({
                message: 'success',
                type: 'success'
            })
            this.fileList = []
            this.$parent.$parent.close_file()
            this.$parent.$parent.fetach()
        } else {
            this.$message.error(res.msg)
        }
    },
    beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
};
</script>
