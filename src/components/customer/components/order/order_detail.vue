<style scoped>
.content{padding: 25px 70px;font-size: 13px;color: #333;}
.top{display: flex;justify-content: space-between;align-items: center;padding-left: 10px;}
table{width: 100%;border-collapse: collapse;background: white;margin-top: 20px;}
table th{color: #333333;padding: 5px 10px;font-weight: normal;width: 60px;line-height: 30px;}
table td{color: #828282;padding: 5px 10px;min-width: 100px;}
table .icon{width: 70px;height: 70px;font-size: 21px;color: white;line-height: 70px;text-align: center;border-radius: 50%;margin: 0px auto;}
table .chicun .el-input {
  width: 50px;
}
table .chicun /deep/ .el-input__inner {
  padding: 0px 5px;
  border: 1px solid #dcdfe6;
}
.icon_j{background: #334D6E;}
.icon_sho{background: #C2CFE0;}
.goods th{width: 150px;text-align: center;}
.el-steps{margin-top: 30px;}
.el-steps /deep/ .el-step__icon{width: 50px;height: 50px;}
.el-steps /deep/ .el-step__line{top: 25px !important;}
.el-steps /deep/ .el-step__icon{background: #A7A7A7;border-color: #A7A7A7;}
.el-steps /deep/ .is-finish .el-step__icon{background: #0071E3;border-color: #0071E3;}
.el-steps /deep/ .is-finish {color: #0071E3;}
.el-steps i{font-size: 25px;color: white;}
table .msds{display: flex;justify-content: space-between;align-items: center;}
table .msds .el-button{font-size: 12px;margin-left: 0px;}
.table_a {margin:10px 10px 10px 0px;text-align:center;}
.table_a td,th{padding: 5px;min-width: 50px;}
.image_list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
</style>
<template>
  <div class="content">
    <div class="top">
        <span>我的位置：我要查件- <font color='#0071E3'>订单详情</font></span>
        <el-button type="primary" class="button_primary" size="mini" @click="toOrder()">上一步</el-button>
    </div>
    <table border="1" bordercolor="#BEBEBE">
        <tr>
          <th colspan="10" style="background:#E3E3E3;">收发信息</th>
        </tr>
        <tr>
          <th rowspan="7" width='70'>
            <div class="icon icon_j">寄</div>
          </th>
          <th>发货人</th>
          <td colspan="3">{{data.d_name}}</td>
          <th rowspan="7" width='80'>
            <div class="icon icon_sho">收</div>
          </th>
          <th>收货人</th>
          <td colspan="3">{{data.r_name}}</td>
        </tr>
        <tr>
          <th>电话</th>
          <td colspan="3">{{data.d_phone}}</td>
          <th>电话</th>
          <td colspan="3">{{data.r_phone}}</td>
        </tr>
        <tr>
          <th>公司</th>
          <td colspan="3">{{data.d_company}}</td>
          <th>公司</th>
          <td colspan="3">{{data.r_company}}</td>
        </tr>
         <tr>
          <th>邮箱</th>
          <td colspan="3">{{data.d_email}}</td>
          <th>邮箱</th>
          <td colspan="3">{{data.r_email}}</td>
        </tr>
        <tr>
          <th>邮编</th>
          <td>{{data.d_zipcode}}</td>
          <th>物流</th>
          <td>{{data.goods_member?data.goods_member.express_type:''}}&nbsp;{{data.goods_member?data.goods_member.tracking_number:''}}</td>
          <th>邮编</th>
          <td>{{data.r_zipcode}}</td>
          <th>物流</th>
          <td>
            {{data.goods_member?data.goods_member.abroad_express:''}}
            {{data.goods_member?data.goods_member.abroad_tracking:''}}
          </td>
        </tr>
        <tr>
          <th rowspan="2">地址</th>
          <td colspan="3" rowspan="2">
            {{data.d_country}}{{data.d_provice}}{{data.d_city}}-{{data.d_address}}
          </td>
          <th>地址</th>
          <td colspan="3">
            {{data.r_country}}{{data.r_provice}}{{data.r_city}}-{{data.r_address}}
          </td>
        </tr>
        <tr>
          <th>清关代理</th>
          <td colspan="3">{{data.r_custom_broker}}</td>
        </tr>
    </table>
    <table border="1" class="goods" bordercolor="#BEBEBE">
      <tr style="background:#E3E3E3;">
        <th colspan="6" style="text-align:left;">货物信息</th>
      </tr>
      <tr>
        <th>货品尺寸</th>
        <td colspan="3" class="chicun">
          <el-input v-model="data.goods_member.g_length" size="mini"></el-input>x
          <el-input v-model="data.goods_member.g_width" size="mini"></el-input>x
          <el-input v-model="data.goods_member.g_height" size="mini"></el-input>cm
        </td>
        <th>发货文件</th>
        <td>
          <PDF ref="pdf_s"></PDF>
          <a hidden="hidden" target="_blank" :href="file_url" ref="file_url"></a>
          <div class="msds" v-for="i in data.order_files" v-if="i.type===0">
              <div style="width:80%;word-wrap:break-word">{{i.file_name}}</div>
              <div>
                <el-button type="text" @click="previewWeekly_pdf(i.file_path)">预览</el-button>
                <el-button type="text" @click="downloadWeekly_s(i.id,i.file_name)">下载</el-button>
              </div>
          </div>
        </td>
      </tr>
      <tr>
        <th>货品重量</th>
        <td>
          {{data.goods_member.gross_weight}}{{data.goods_member.weight_unit}}
        </td>
        <th width='100'>实际毛重</th>
        <td>{{data.goods_member.actual_gross_weight}}{{data.goods_member.actual_gross_weight?data.goods_member.weight_unit:''}}</td>
        <th rowspan="4">单号截图</th>
        <td rowspan="4" style="width:350px;">
          <div class="image_list">
            <div v-for="i in data.order_files">
              <el-image
                v-if="i.type==1"
                style="width: 150px; height: 150px;"
                :src="API_BASEURL+i.file_path.replace('/var/www/shipchem/upload/','api/shows/')"
                :preview-src-list="[(API_BASEURL+i.file_path.replace('/var/www/shipchem/upload/','api/shows/'))]"
              ></el-image>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <th>产品数量</th>
        <td colspan="3">
          <table class="table_a" border="1" bordercolor="#BEBEBE">
              <tr>
                <th style="width:30px;">类别</th>
                <th>品名</th>
                <th style="width:60px;">数量</th>
                <th style="width:60px;">
                  价格{{data.goods_member.currency}}
                </th>
              </tr>
              <tr v-for="(item,index) in data.order_prods">
                <td>{{item.category}}</td>
                <td>{{item.prodname}}</td>
                <td>{{item.number}}</td>
                <td>{{item.price}}</td>
              </tr>
              <tr>
                <td colspan="3"></td>
                <td>{{data.goods_member.declared_value?data.goods_member.declared_value:0}}</td>
              </tr>
            </table>
          <!-- P:{{data.goods_member.non_danger_number}}件&nbsp;EQ:{{data.goods_member.limited_number}}件&nbsp;DG:{{data.goods_member.danger_number}}件 -->
        </td>
      </tr>
      <tr>
        <th>其他</th>
        <td colspan="3">
          <font color='#0071E3'>
            报关:{{data.goods_member.is_customs==1?'是':'否'}}&nbsp;
            保险:{{data.goods_member.is_insurance==1?'是':'否'}}&nbsp;
            到付:{{data.goods_member.is_pay==1?'是':'否'}}&nbsp;
            DDP:{{data.goods_member.is_ddp==1?'是':'否'}}
          </font>
        </td>
      </tr>
      <tr>
        <th>订单备注</th>
        <td colspan="3">{{data.goods_member.remark}}</td>
      </tr>
    </table>
    <el-steps :active="active" align-center process-status="wait">
      <el-step title="未发货">
        <i class="el-icon-takeaway-box" slot="icon"></i>
      </el-step>
      <el-step title="发货">
        <i class="el-icon-shopping-cart-1" slot="icon"></i>
      </el-step>
      <el-step title="入库中">
        <i class="el-icon-box" slot="icon"></i>
      </el-step>
      <el-step title="中转中">
        <i class="el-icon-guide" slot="icon"></i>
      </el-step>
      <el-step title="已发货(国外)">
        <i class="el-icon-truck" slot="icon"></i>
        <template slot='description' v-if="active==4">
          <el-button round size="mini" class="button_plain">下载运单</el-button>
        </template>
      </el-step>
      <el-step title="待支付">
        <i class="el-icon-bank-card" slot="icon"></i>
      </el-step>
      <el-step title="已支付">
        <i class="el-icon-s-finance" slot="icon"></i>
      </el-step>
    </el-steps>
  </div>
</template>
<script>
import PDF from '../../../../heard_foot/pdf'
export default {
  name: "order_detail",
  components: {
    PDF
  },
  data() {
    return {
      active: 1,
      data:{goods_member:{}},
      file_url:'',
      API_BASEURL:process.env.API_BASEURL,
    };
  },
  created () {
    this.fetach()
  },
  methods: {
    fetach(){
      this.$get('api/orders/orders/'+this.$route.query.id).then(res=>{
        if(res.code===0){
          this.data = res.data
          this.active = res.data.status+1
        }else{this.$message.error(res.msg)}
      })
    },
    previewWeekly_pdf(file_path){
      var path = file_path.replace('/var/www/shipchem/upload/','api/shows/')
      this.file_url = this.API_BASEURL+path
      setTimeout(()=>{
        this.$refs.file_url.click()
      },200)
    },
    downloadWeekly_s(id,fileName){
      //调用子组件的下载方法
        this.$refs.pdf_s.downloadPDF(this.API_BASEURL+'api/orders/downfile/'+id,fileName)
    },
    toOrder(){
      this.$router.push({
        path: '/order',
        name:'order'
      });
    }
  }
};
</script>
