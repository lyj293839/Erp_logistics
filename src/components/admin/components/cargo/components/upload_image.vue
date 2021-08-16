<style scoped>
.body{display: flex;justify-content:center;align-items: center;margin-bottom: 20px;}
.avatar-uploader /deep/ .el-upload {
    border: 1px dashed #8c939d;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader /deep/ .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 300px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 300px;
    height: auto;
    display: block;
    margin: 0px auto;
    border: 1px dashed #8c939d;
  }
</style>
<template>
  <div style="text-align:center;">
      <div class="body">
        <div id="tar_box" contenteditable></div>
        <el-upload
            class="avatar-uploader"
            v-show="!imageUrl"
            ref="upload"
            :data="{file_type:1}"
            :headers="myHeaders"
            name='myfile'
            :action="$All.URL+'api/orders/upfile/'+cargo_id"
            :show-file-list="false"
            :on-success="handleAvatarSuccess">
                <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-image v-show='imageUrl'
                  class="avatar"
                  :src="imageUrl" 
                  :z-index='3333'
                  :preview-src-list="[imageUrl]">
                </el-image>
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
      imageUrl: '',
      b:'',
      myHeaders: {userToken: JSON.parse(localStorage.getItem('loginForm')).token}
    };
  },
  mounted() {
        this.AddEventlist()
    },
  methods: {
    submitUpload() {
        const upload = this.$refs.upload
        upload.handleStart(this.b);
        this.CloseEventlist()
        setTimeout(()=>{
            upload.submit();
            this.$parent.$parent.close_image()
        })
    },
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!');
        // }
        this.imageUrl = URL.createObjectURL(file.raw);
        return isJPG && isLt2M;
    },
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.$message.success('上传成功')
        this.b=''
        document.getElementById('tar_box').innerHTML='';
        this.$parent.$parent.fetach()
    },
    AddEventlist(){
        document.addEventListener('paste',this.paste)
    },
    CloseEventlist(){
        document.removeEventListener('paste', this.paste)
    },
    paste (event) {
        let isChrome = false;
        let _this = this
        if (event.clipboardData || event.originalEvent) {
            let clipboardData = (event.clipboardData || event.originalEvent.clipboardData);
            if (clipboardData.items) {
                let items = clipboardData.items,
                    len = items.length,
                    blob = null;
                isChrome = true;
                event.preventDefault();
                for (let i = 0; i < len; i++) {
                    if (items[i].type.indexOf("image") !== -1) {
                        blob = items[i].getAsFile();
                    }
                }
                if (blob !== null) {
                    let reader = new FileReader();
                    reader.onload = function (event) {
                        let base64_str = event.target.result
                        _this.uploadImgFromPaste(base64_str, 'paste', isChrome);
                    }
                    reader.readAsDataURL(blob);
                }
            } else {
                //for firefox
                setTimeout(function () {
                    let imgList = document.querySelectorAll('#tar_box img'),
                        len = imgList.length,
                        src_str = '',
                        i;
                    for (i = 0; i < len; i++) {
                        if (imgList[i].className !== 'my_img') {
                            src_str = imgList[i].src;
                        }
                    }
                    _this.uploadImgFromPaste(src_str, 'paste', isChrome);
                }, 1);
            }
        } else {
            //for ie11
            setTimeout(function () {
                let imgList = document.querySelectorAll('#tar_box img'),
                    len = imgList.length,
                    src_str = '',
                    i;
                for (i = 0; i < len; i++) {
                    if (imgList[i].className !== 'my_img') {
                        src_str = imgList[i].src;
                    }
                }
                _this.uploadImgFromPaste(src_str, 'paste', isChrome);
            }, 1);
        }
    },
    /**调用element的上传方法 需要把base64转换成file上传**/
    uploadImgFromPaste(file, type, isChrome) {
            let a=this.dataURLtoBlob(file);
            this.b=this.blobToFile(a);
    		// const upload = this.$refs.upload
    		// upload.handleStart(b);
    		// setTimeout(()=>{
        	// 	upload.submit();
            // })
            this.imageUrl = URL.createObjectURL(this.b);
    },
    /**
     * 将base64转换为blob
     */
    dataURLtoBlob (dataurl) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
       		 while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        	}
        	return new Blob([u8arr], { type: mime });
    },
    /**
 * 将blob转换为file
 */
    blobToFile  (theBlob, fileName = 'ocr1.jpeg') {
        theBlob.lastModifiedDate = new Date();
        theBlob.name = fileName;
        return theBlob;
    },

  }
};
</script>
