<style scoped>
.content{padding: 25px 30px;font-size: 13px;color: #333;}
.top{display: flex;justify-content: space-between;align-items: center;padding-left: 10px;margin-bottom: 20px;}
.right_table{background: white;height: 350px;text-align: center;padding: 10px;margin-right: 10px;}
.right_table .total_money{font-size: 22px;color: #E90000;text-align: right;margin-top: 5px;}
.make{text-align: center;margin-top: 50px;}
.make .el-button{width:214px;border-color: #0071E3;}
</style>
<template>
  <div class="content">
    <div class="top">
        <span>我的位置：我的订单- <font color='#0071E3'>查看发票</font></span>
        <el-button type="primary" class="button_primary" size="mini" @click="toOrder()">上一步</el-button>
    </div>
    <div style="display:flex;justify-content: center;flex-wrap: wrap;">
      <div><img :src="data.file_path" width="550" height="370" style="margin:0px 10px 30px 0px;"></div>
      <div style="width:50%;">
        <div class='right_table'>
            <span>当前发票关联订单</span>
            <el-table
              :data="data.invoice_file"
              height="300"
              size="mini"
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                type="selection"
                :selectable="checkboxT"
                width="50">
              </el-table-column>
              <el-table-column label="订单编号" align="center" width="130px">
                <template slot-scope="scope">
                  <span style="color:#0071E3;">{{scope.row.member_id.order_no}}</span>
                </template>
              </el-table-column>
              <el-table-column label="金额详情" align="center">
                <template slot-scope="scope">
                  运费：{{scope.row.freight_fee}}&nbsp;
                  过港：{{scope.row.crossing_fee}}&nbsp;
                  报关：{{scope.row.cstoms_fee}}&nbsp;
                  操作：{{scope.row.operating_fee}}&nbsp;
                  保险：{{scope.row.insurance_fee}}
                </template>
              </el-table-column>
              <el-table-column label="总金额" align="center" width="100px">
                <template slot-scope="scope">
                  {{scope.row.total_fee}}
                  <div :style="scope.row.member_id.status==5?'color:#0071E3;':'color:red;'">
                    {{$All.getEnumValue($Enum.ORDERSTATUS,scope.row.member_id.status)}}
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="total_money">
              总计：{{data.total_fee}}
            </div>
          </div>
      </div>
    </div>
    <div class="make">
      <el-button plain class="button_plain" @click="download(data.file_path,data.file_name)">下载到电脑</el-button>
      <el-button plain class="button_plain">发送到邮箱</el-button>
      <el-button type="primary" class="button_primary" @click="to_pay()">去支付</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "order_bill",
  data() {
    return {
      data:{},
      ids:[]
    };
  },
  created () {
    this.fetach()
  },
  methods: {
    fetach(){
      this.$get('api/orders/invoiceapi/'+this.$route.query.id).then(res=>{
        if(res&&res.code===0){
          res.data.file_path = process.env.API_BASEURL + res.data.file_path.replace('/var/www/shipchem/upload/','api/shows/')
          this.data = res.data
        }else{this.$message.error(res.msg)}
      })
    },
    handleSelectionChange(val) {
      this.ids = val;
    },
    checkboxT(row,index){
      if (row.member_id.status==5) {
          return true
      }else{
          return false
      }
    },
    toOrder(){
      this.$router.back(-1)
    },
    to_pay(){
      if(this.ids&&this.ids.length>0){
        var arr = []
        this.ids.forEach(i=>{
          arr.push(i.member_id.id)
        })
        this.$router.push({
          path: '/select_pay',
          name:'select_pay',
          query:{
            ids:JSON.stringify(arr)
          }
        });
      }else{
        this.$message.error('请选择需要付款的订单')
      }
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
};
</script>
