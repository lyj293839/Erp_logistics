<style scoped>
.content{padding: 14px 26px;}
.content .font1{font-size: 16px;color: #000000;margin-bottom: 14px;}
.content .font1 span{color: #0071E3;}
.form{display: flex;align-items: flex-end;justify-content: space-between;margin-bottom: 10px;}
.el-row{height: auto;}
.form .el-form-item{margin-bottom: 0px;}
.form /deep/ .el-form-item__label{line-height: 20px;color: #333333;font-size: 12px;padding: 0px;}
.form .el-form{margin-left: 15px;}
.form .el-button{width: 243px;}
.form .image_div{
    width: 300px;
    height: 175px;
    border: 1px dashed #d9d9d9;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
}
.form .image_div i{font-size: 60px;}
.form .image_div /deep/ .upload-demo:hover{color: #0071E3;}
.list li{background: white;padding: 0px 20px;border: 1px solid #E4E4E4;font-size: 13px;margin-top: 10px;}
.list .row_a{padding: 5px 0px;border-bottom: 1px solid #EBEBED;color: #333333;font-size: 12px;}
.list .row_a .status_button{border:1px solid #0071E3;color: #0071E3;padding: 5px 0px;text-align: center;width: 100px;}
.list .el-checkbox{margin-left: -15px;}
.list li .font2{font-size: 16px;display: flex;align-items: flex-end;justify-content: flex-end;}
.list li .font3{display: flex;align-items:center;}
.avatar{height: 100%;width: 100%;}
</style>
<template>
    <div class="content">
        <div class="font1">核算开票-<span>发票上传</span></div>
        <div class="form">
            <div style="display: flex;">
                <div id="tar_box" contenteditable></div>
                <div>
                    <div class="image_div">
                        <el-upload
                            class="upload-demo"
                            v-show="!imageUrl"
                            ref="upload"
                            :headers="myHeaders"
                            name='myfile'
                            :data="upload_form"
                            :show-file-list='false'
                            :action="baseURL+'api/orders/upinvoice/'"
                            :on-success="handleAvatarSuccess"
                            :on-change='change_img'
                            :auto-upload="false">
                                <i class="el-icon-upload"></i>
                                <div>点击电子发票上传</div>
                        </el-upload>
                        <el-image v-show="imageUrl"
                            class="avatar"
                            :src="imageUrl"
                            :preview-src-list="[imageUrl]">
                        </el-image>
                    </div>
                    <el-button plain class="button_plain" style="width:100px;" size="mini" @click="imageUrl = ''">清空发票</el-button>
                </div>
                <el-form :model="formLabelAlign">
                    <el-row :gutter="45">
                        <el-col :span="12">
                           <el-form-item label="关联电话">
                                <el-input size="small" v-model="formLabelAlign.iphone"></el-input>
                            </el-form-item> 
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="开始日期">
                                <el-date-picker
                                    v-model="formLabelAlign.start_time"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    style="width:100%;"
                                    size="small">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="45">
                        <el-col :span="12">
                            <el-form-item label="关联邮箱">
                                <el-input size="small" v-model="formLabelAlign.email"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="结束日期">
                                <el-date-picker
                                    v-model="formLabelAlign.end_time"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    style="width:100%;"
                                    size="small">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="45">
                        <el-col :span="12">
                            <el-form-item label="关联公司">
                                <el-input size="small" v-model="formLabelAlign.company_name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label=" " required style="text-align:right;">
                                <el-button type="primary" size="small" style="width:100%" class="button_primary" :loading="loading_search" @click="search()">搜索</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="upload_form">
                <el-form label-position="top">
                    <el-form-item label="核实金额" required>
                        <el-input size="small" v-model="upload_form.total_money"></el-input>
                    </el-form-item>
                    <el-form-item style="margin-top:10px;">
                        <el-button type="primary" class="button_primary" @click="submitUpload">确认上传</el-button>
                    </el-form-item>
                </el-form>
                
            </div>
        </div>
        <el-checkbox v-if="list.data&&list.data.length>0" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <ul class="list">
            <li v-for="item in list.data">
                <el-row class="row_a" type="flex" align="middle">
                    <el-col :span="6">
                        <el-checkbox v-model="item.check" @change="checkChange()"></el-checkbox>
                        <span>订单号：{{item.order_no}}</span>
                    </el-col>
                    <el-col :span="4">
                        <span>联系方式：{{item.user.iphone}}</span>
                    </el-col>
                    <el-col :span="6">
                        <span>预留邮箱：{{item.user.userinfo.email}}</span>
                    </el-col>
                    <el-col :span="6">
                        <span>下单日期：{{$All.getDate(item.create_time)}}</span>
                    </el-col>
                    <el-col :span="2" style="text-align:right;">
                        <div class="status_button">{{$All.getEnumValue($Enum.ORDERSTATUS,item.status)}}</div>
                    </el-col>
                </el-row>
                <el-row type="flex" style="padding:5px 0px;">
                    <el-col :span="2" style="vertical-align: text-top;">
                        <span style="font-size:12px;color:#888888;">客户</span><br>
                        {{item.user.userinfo.username}}
                    </el-col>
                    <el-col :span="7" style="line-height:30px;">
                        <span>发票抬头：{{item.user.userinfo.invoice_title}}</span><br>
                        <span>发票税号：{{item.user.userinfo.tax_number}}</span>
                    </el-col>
                    <el-col :span="9" style="line-height:30px;">
                        <span>地址/电话：{{item.user.userinfo.address}}&nbsp;&nbsp;{{item.user.iphone}}</span><br>
                        <span>开户行/账号：{{item.user.userinfo.bank}}&nbsp;&nbsp;{{item.user.userinfo.account}}</span>
                    </el-col>
                    <el-col :span="4" class="font3">
                        <el-row>
                            <el-col :span="12">运费：{{item.goods_member.freight_fee}}</el-col>
                            <el-col :span="12">报关：{{item.goods_member.cstoms_fee}}</el-col>
                            <el-col :span="12">过港：{{item.goods_member.crossing_fee}}</el-col>
                            <el-col :span="12">保险：{{item.goods_member.insurance_fee}}</el-col>
                            <el-col :span="12">操作：{{item.goods_member.operating_fee}}</el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="2" class="font2">
                        总计：{{item.goods_member.total_fee}}
                    </el-col>
                </el-row>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  name: "ad_upload",
  data() {
    return {
      formLabelAlign:{
        iphone:'',
        email:'',
        company_name:'',
        start_time:'',
        end_time:'',
      },
      list:{},
      myHeaders: {userToken: JSON.parse(localStorage.getItem('loginForm')).token},
      imageUrl:'',
      ids:[],
      upload_form:{
        id_list:[],
        total_money:'',
        user_id:''
      },
      baseURL:process.env.API_BASEURL,
      checkAll:false,
      loading_search:false
    };
  },
  created () {
    // this.fetach()
  },
  mounted() {
        let _this = this;
        document.addEventListener('paste', function (event) {
            let isChrome = false;
            if (event.clipboardData || event.originalEvent) {
                //not for ie11  某些chrome版本使用的是event.originalEvent
                let clipboardData = (event.clipboardData || event.originalEvent.clipboardData);
                if (clipboardData.items) {
                    // for chrome
                    let items = clipboardData.items,
                        len = items.length,
                        blob = null;
                    isChrome = true;
                    //items.length比较有意思，初步判断是根据mime类型来的，即有几种mime类型，长度就是几（待验证）
                    //如果粘贴纯文本，那么len=1，如果粘贴网页图片，len=2, items[0].type = 'text/plain', items[1].type = 'image/*'
                    //如果使用截图工具粘贴图片，len=1, items[0].type = 'image/png'
                    //如果粘贴纯文本+HTML，len=2, items[0].type = 'text/plain', items[1].type = 'text/html'
                    //阻止默认行为即不让剪贴板内容在div中显示出来
                    event.preventDefault();
                    //在items里找粘贴的image,据上面分析,需要循环
                    for (let i = 0; i < len; i++) {
                        if (items[i].type.indexOf("image") !== -1) {
                            blob = items[i].getAsFile();
                        }
                    }
                    if (blob !== null) {
                        let reader = new FileReader();
                        reader.onload = function (event) {
                            // event.target.result 即为图片的Base64编码字符串
                            let base64_str = event.target.result
                            //可以在这里写上传逻辑 直接将base64编码的字符串上传（可以尝试传入blob对象，看看后台程序能否解析）
                            _this.uploadImgFromPaste(base64_str, 'paste', isChrome);
                        }
                        reader.readAsDataURL(blob);
                    }
                } else {
                    //for firefox
                    setTimeout(function () {
                        //设置setTimeout的原因是为了保证图片先插入到div里，然后去获取值
                        let imgList = document.querySelectorAll('#tar_box img'),
                            len = imgList.length,
                            src_str = '',
                            i;
                        for (i = 0; i < len; i++) {
                            if (imgList[i].className !== 'my_img') {
                                //如果是截图那么src_str就是base64 如果是复制的其他网页图片那么src_str就是此图片在别人服务器的地址
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
                    //调用上传方法
                    _this.uploadImgFromPaste(src_str, 'paste', isChrome);
                }, 1);
            }
        })
    },
  methods: {
    fetach(){
        this.$get('api/orders/upinvoice/',this.formLabelAlign).then(res=>{
            if(res&&res.code===0){
                if(this.loading_search){
                    this.$message.success('搜索成功')
                    this.loading_search = false
                }
                res.data.forEach(i=>{
                    i['check']=false
                })
                this.list = res
                this.checkAll = false
                this.ids = []
            }else{
                this.$message.error(res.msg)
                this.loading_search = false
            }
        }).catch(err=>{this.loading_search = false})
    },
    handleAvatarSuccess(res, file) {
        if(res&&res.code===0){
            this.$message.success('上传成功')
            this.fetach()
            this.upload_form={
                id_list:[],
                total_money:'',
                user_id:''
            }
            setTimeout(()=>{
                this.imageUrl = ''
            },200)
        }else{
            this.$message.error(res.msg)
        }
        document.getElementById('tar_box').innerHTML='';
    },
    change_img(file, fileList){
        this.imageUrl = URL.createObjectURL(file.raw);
    },
    submitUpload() {
        if(this.imageUrl&&this.ids.length>0&&this.upload_form.total_money){
            var a = 0
            this.upload_form.id_list = []
            this.upload_form.user_id = this.ids[0].user.id
            this.ids.forEach(i=>{
                if(i.user.id!=this.ids[0].user.id){
                    a++
                }
                this.upload_form.id_list.push(i.id)
            })
            if(a>0){
                this.$message.error('上传的订单发票需同一客户')
            }else{
                this.upload_form.id_list = JSON.stringify(this.upload_form.id_list)
                setTimeout(()=>{
                    this.$refs.upload.submit();
                },200)
            }
        }else{
            this.$message.error('请选择电子发票和需上传的订单,并输入核实金额')
        }
    },
    handleCheckAllChange(){
      this.ids = []
      this.list.data.forEach(i=>{
        i.check = this.checkAll
        if(this.checkAll){
          this.ids.push(i)
        }else{
          this.ids = []
        }
      })
    },
    checkChange(){
      this.ids = []
      var a = 0
      this.list.data.forEach(i=>{
        if(i.check){
          this.ids.push(i)
          a++
        }
      })
      if(a==this.list.data.length){
        this.checkAll = true
      }else{
        this.checkAll = false
      }
    },
    search(){
        if(!this.formLabelAlign.start_time&&
           !this.formLabelAlign.end_time&&
           !this.formLabelAlign.iphone&&
           !this.formLabelAlign.email&&
           !this.formLabelAlign.company_name){
               this.$message.error('搜索条件不能为空')
        }else{
            this.loading_search = true
            this.fetach()
        }
    },
    /**调用element的上传方法 需要把base64转换成file上传**/
    uploadImgFromPaste(file, type, isChrome) {
        const upload = this.$refs.upload
            let a=this.dataURLtoBlob(file);
            let b=this.blobToFile(a);
    		upload.handleStart(b);
    	// 	setTimeout(()=>{
        // 		upload.submit();
        // })
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