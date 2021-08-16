<style scoped>
.content{padding: 25px 70px;}
.content ul li{
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
  background: white;
  padding: 10px 10px;
  color: #000000;
  font-size: 13px;
  line-height: 30px;
  word-wrap:break-word;
  margin-top: 10px;
}
.content ul li img{cursor: pointer;}
.font1{color: #0071E3;}
.font2{font-size: 30px;}
.make{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}
.make .el-button{margin-top: 20px;color:#0071E3;border-color: #0071E3;box-shadow: 0px 3px 3px rgba(0, 113, 227, 0.25);}
</style>
<template>
  <div class="content">
    <div>
      <el-date-picker
        v-model="queryList.start_time"
        type="date"
        size="small"
        value-format="yyyy-MM-dd"
        placeholder="开始日期">
      </el-date-picker>
      <el-date-picker
        v-model="queryList.end_time"
        type="date"
        size="small"
        value-format="yyyy-MM-dd"
        placeholder="结束日期">
      </el-date-picker>
      <el-button size="small" class="button_primary" type="primary" :loading="search_loading" @click="search()">搜索</el-button>
      <a hidden="hidden" target="_blank" :href="image_url" ref="image_url"></a>
    </div>
    <ul>
      <li v-for="item in list.data">
        <el-row type="flex">
          <el-col :span="6"><img :src="item.file_path" width="238" height="155" @click="bill(item.id)"></el-col>
          <el-col :span="4">
            <div>关联订单：</div>
            <div v-for="(i,index_i) in item.invoice_file">{{i.member_id.order_no}}</div>
            <!-- <span v-if="item.invoice_file.length>3" class="font1">更多</span> -->
          </el-col>
          <el-col :span="9">
            <div>金额明细：</div>
            <div v-for="(i,index_i) in item.invoice_file">
              运费：{{i.freight_fee}}&nbsp;过港：{{i.crossing_fee}}&nbsp;报关：{{i.cstoms_fee}}&nbsp;操作：{{i.operating_fee}}&nbsp;保险：{{i.insurance_fee}}
            </div>
          </el-col>
          <el-col :span="2" class="font1">
            <div>金额总计：</div>
            <div v-for="(i,index_i) in item.invoice_file">{{i.total_fee}}</div>
          </el-col>
          <el-col :span="3" class="make">
              <div>
                <div><el-button size="small" @click="download(item.file_path,item.file_name)">下载到电脑</el-button></div>
                <!-- <div><el-button size="small">发送到邮箱</el-button></div> -->
                <a href="mailto:sample@fly63.com?subject=test&cc=sample@hotmail.com&subject=主题&body=内容123">
                   <div><el-button size="small">发送到邮箱</el-button></div>
                </a>
              </div>
              <div>
                <span>合计：</span>
                <span class="font2">{{item.total_fee}}</span>
              </div>
          </el-col>
        </el-row>
      </li>
    </ul>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :total="list.count">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: "bill",
  data() {
    return {
      list:{},
      queryList:{
        start_time:'',
        end_time:'',
        page:1
      },
      currentPage:1,
      image_url:'',
      search_loading:false
    };
  },
  created () {
    this.fetach()
  },
  methods: {
    fetach(){
      this.$get('api/orders/invoicelist/',this.queryList).then(res=>{
        if(res.code===0){
          if(this.search_loading){
            this.$message.success('搜索成功')
            this.search_loading = false
          }
          res.data.forEach(i=>{
            i.file_path =process.env.API_BASEURL+i.file_path.replace('/var/www/shipchem/upload/','api/shows/')
          })
          this.list = res
        }else{
          this.$message.error(res.msg)
          this.search_loading = false
        }
      }).catch(err=>{this.search_loading = false})
    },
    handleCurrentChange(page){
      this.queryList.page = this.currentPage = page
      this.fetach()
    },
    search(){
      this.search_loading = true
      this.fetach()
    },
    bill(id){
      this.$router.push({
        path: '/order_bill',
        name:'order_bill',
        query:{
          id
        }
      });
    },
    download(data,name){
      // this.image_url = data
      // setTimeout(()=>{
      //   this.$refs.image_url.click()
      // },200)
      this.getUrlBase64(data).then(base64 => {
        let a = document.createElement("a");
        a.style.display = "none";
        a.download = name;
        a.href = base64;
        document.body.appendChild(a);
        a.click();
      })
    },
    getUrlBase64(url) {
      return new Promise(resolve => {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        let img = new Image();
        img.crossOrigin = "Anonymous"; //允许跨域
        img.src = url;
        img.onload = function() {
          canvas.height = img.height;
          canvas.width = img.width;
          ctx.drawImage(img, 0, 0, img.width, img.height);
          let dataURL = canvas.toDataURL("image/png");
          canvas = null;
          resolve(dataURL);
        };
      });
    }
  }
}
</script>
