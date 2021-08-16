<style scoped>
.content{padding: 25px 70px;}
.content /deep/ .el-date-editor{width: 190px;margin: 5px 0px;}
.content .el-card{margin-bottom: 15px;}
.content .el-card /deep/ .el-card__body{padding: 0px 20px;}
.heard{font-size: 13px;color: #888888;border-bottom: 1px solid #D7E0EE;padding: 5px 0px;}
.heard .font1{display: flex;align-items: center;justify-content: flex-end;font-size: 12px;}
.heard .font1 .el-button{margin-left: 10px;}
.heard .font2{color: #F7685B;}
.el-icon-document-copy{color: #0071E3;cursor: pointer;}
.body{font-size: 14px;padding: 20px 0px;}
.body .tip{display: flex;}
.body .icon_img{
  width: 70px;
  height: 70px;
  border-radius: 50%;
  color: white;
  text-align: center;
  line-height: 70px;
  font-size: 21px;
  margin-right: 10px;
}
.body .icon_sho{background: #C2CFE0;}
.body .icon_j{background: #334D6E;}
.body .font1{color: #D8D8D8;line-height: 40px;margin-top: -20px;}
.body .font2{color: #000;}
.body .font3{color: #0071E3;margin-bottom: 10px;}
.body .dian{display: flex;align-items: center;}
.body .dian li{width: 8px;height: 8px;background: #C3C3C3;margin: 0px 5px;}
.body .data_num div{color: #333;margin: 5px 0px;}
.body .mark{min-height: 70px;vertical-align: top;text-align: right;}
.body .mark .el-button{width: 100px;}
.body .button1{background: #334D6E;color: white;border-color: #334D6E;}
.body .button2{background: #E6E6E6;color: #222222;border-color: #E6E6E6;}
.body .button3{background: #0071E3;color: white;border-color: #0071E3;}
.el-popover .font4{line-height: 30px;font-size: 12px;}
.el-popover .font5{font-size: 14px;color: #333;line-height: 30px;border-bottom: 1px solid #E1E1E1;}
.el-popover ul li{font-size: 12px;margin-bottom: 20px;}
.el-popover .bottom{display: flex;justify-content: space-between;color: #C2CFE0;font-size: 12px;margin-top: 10px;}
.input_heard /deep/ .el-input-group__prepend{background: white;}
.input_heard .el-select{width:110px;}
.popover li span{width: 50px;}
.popover li{display: flex;align-items: center;border-bottom: 1px solid #C2CFE0;padding: 2px 0px;}
.popover_foot{display: flex;justify-content: space-between;align-items: center;margin-top: 5px;}
</style>
<template>
  <div class="content">
      <div style="text-align:right;">
          <el-input v-model="queryList.search_info" style="width:400px;" size="small" placeholder="输入单号\姓名\手机号关键字检索"></el-input>
          <el-date-picker
            v-model="queryList.start_time"
            type="date"
            size="small"
            value-format="yyyy-MM-dd"
            placeholder="选择开始日期">
          </el-date-picker>
          <el-date-picker
            v-model="queryList.end_time"
            type="date"
            size="small"
            value-format="yyyy-MM-dd"
            placeholder="选择结束日期">
          </el-date-picker>
          <el-button size="small" class="button_primary" type="primary" @click="search()" :loading="search_loading">搜索</el-button>
          <!-- <el-button size="small" class="button_primary" type="primary" @click="pay(ids)">批量付款</el-button> -->
      </div>
      <el-checkbox v-model="checkAll" style="margin-bottom:5px;" @change="handleCheckAllChange()">全选</el-checkbox>
      <el-card shadow="never" v-for="item in list.data">
        <el-row class="heard" type="flex" align="middle">
          <el-col :span="4">
            <el-checkbox v-if="item.status==5" v-model="item.check" @change="checkChange()" style="margin-left:-16px;"></el-checkbox>
            订单号：{{item.order_no}}
          </el-col>
          <el-col :span="8"><span class="font2">收转库：深圳市罗湖区清水河一路8号2栋103-3 荣达昌物流</span></el-col>
          <el-col :span="6"><span class="font2">收件人:{{item.r_name}}&nbsp;&nbsp;TLE:{{item.r_phone}}</span></el-col>
          <el-col :span="6" class="font1">
            <span>下单日期：{{new Date(item.create_time).getFullYear()}}年{{new Date(item.create_time).getMonth()+1}}月{{new Date(item.create_time).getDate()}}日</span>
            <el-button size="mini" plain  @click="detail(item)">运单详情</el-button>
          </el-col>
        </el-row>
        <el-row class="body" type="flex" align="middle">
          <el-col :span="6" class="tip">
            <div class="icon_img icon_j">寄</div>
            <div>
              <div class="font1">{{item.d_country}}</div>
              <div class="font2">
                <span>{{item.d_name}}</span><br>
                <span>{{item.d_company}}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="2">
            <ul class="dian">
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </el-col>
          <el-col :span="6" class="tip">
            <div class="icon_img icon_sho">收</div>
            <div>
              <div class="font1">{{item.r_city}}</div>
              <div class="font2">
                <span>{{item.r_name}}</span><br>
                <span>{{item.r_company}}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="5" class="data_num">
            <div>国家：{{item.r_country}}</div>
            <div>毛重：{{item.goods_member.gross_weight}}{{item.goods_member.weight_unit}}</div>
            <div>实际毛重：{{item.goods_member.actual_gross_weight}}{{item.goods_member.actual_gross_weight?item.goods_member.weight_unit:''}}</div>
            <div>P:{{item.goods_member.non_danger_number}}件&nbsp;   EQ:{{item.goods_member.limited_number}}件&nbsp;  DG:{{item.goods_member.danger_number}}件</div>
          </el-col>
          <el-col :span="5" class="mark">
            <div class="font3">订单状态：{{$All.getEnumValue($Enum.ORDERSTATUS,item.status)}}</div>
            <div v-if="item.status===0">
              <el-popover
                placement="bottom"
                width="400"
                v-model="item.visible">
                <div>
                  <div class="font4">请填写物流公司和货运单号</div>
                  <el-input class="input_heard" v-model="add_trackingForm.tracking_number" size="small"></el-input>
                  <div class="bottom">
                    <div>请填写发往总转库的物流账号</div>
                    <el-button type="primary" class="button_primary" size="mini" @click="addtracking(item)">确定</el-button>
                  </div>
                </div>
                <el-button slot="reference" round size="small" class="button1">填写发出单号</el-button>
              </el-popover>
            </div>
            <!-- <el-button v-if="item.status==5" round size="small" class="button3" @click="pay([item.id])">去支付</el-button> -->
            <div v-if="item.status>=5">
              <!-- <el-button round size="small" class="button2" @click="bill(item.goods_member.invoice_file.id)">查看发票</el-button> -->
              <el-popover
                placement="bottom"
                width="100"
                trigger="click">
                <ul class="popover">
                  <li>
                    <span>运费：</span>{{item.goods_member.freight_fee}}
                  </li>
                  <li>
                    <span>报关：</span>{{item.goods_member.cstoms_fee}}
                  </li>
                  <li>
                    <span>过港：</span>{{item.goods_member.crossing_fee}}
                  </li>
                  <li>
                    <span>保险：</span>{{item.goods_member.insurance_fee}}
                  </li>
                  <li>
                    <span>操作：</span>{{item.goods_member.operating_fee}}
                  </li>
                  <li>
                    <span>杂费：</span>{{item.goods_member.sundry_fee}}
                  </li>
                  <li>
                    <span>疫情：</span>{{item.goods_member.yiqing_fee}}
                  </li>
                </ul>
                <div class="popover_foot">
                  <span>总计：{{item.goods_member.total_fee}}</span>
                </div>
                <el-button slot="reference" round size="small" style="margin-top:5px;" type="info">查看价格</el-button>
              </el-popover>
            </div>
            
            <!-- <div v-if="item.status==1">
              <el-popover
                placement="bottom"
                width="400"
                trigger="click">
                <div>
                  <div class="font5">顺丰快运：2628199999999999999999999999999</div>
                  <ul>
                    <li>
                      2020-11-20 16:39 <br>
                      快件在【南京江宁集散中心】已装车,准备发往 【漯河东城中转场】<br>
                      运送中
                    </li>
                    <li>
                      2020-11-20 14:36 <br>
                      快件到达 【南京江宁集散中心】<br>
                      运送中
                    </li>
                    <li>
                      2020-11-20 13:14 <br>
                      快件已发车 <br>
                      运送中
                    </li>
                    <li>
                      2020-11-20 13:14 <br>
                      快件在【南京浦口高新营业点】已装车,准备发往 【南京江宁集散中心】<br>
                      已取件
                    </li>
                  </ul>
                </div>
                <el-button slot="reference" round size="small" class="button1">查看</el-button>
              </el-popover>
            </div> -->
          </el-col>
        </el-row>
      </el-card>

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
  name: "order",
  data() {
    return {
      checkAll: false,
      visible:false,
      search_loading:false,
      list:[],
      ids:[],
      add_trackingForm:{
        express_type:'',
        tracking_number:''
      },
      queryList:{
        search_info:'',
        start_time:'',
        end_time:'',
        page:1
      },
      currentPage:1,
      value1:'',
      select:''
    };
  },
  created () {
    this.fetach()
  },
  methods: {
    fetach(){
      this.$get('api/orders/orderlist/',this.queryList).then(res=>{
        if(res.code===0){
          if(this.search_loading){
            this.$message.success('搜索成功')
            this.search_loading = false
          }
          res.data.forEach(item=>{
            item['visible']=false
            item['check']=false
          })
          this.checkAll = false
          this.ids = []
          this.list = res
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    handleCurrentChange(page){
      this.queryList.page = this.currentPage = page
      this.fetach()
    },
    addtracking(item){
      this.$post('api/orders/addtracking/'+item.id,this.add_trackingForm).then(res=>{
        if(res.code===0){
          this.$message.success('成功')
          item.visible = false
          this.add_trackingForm = {
            express_type:'',
            tracking_number:''
          }
          this.fetach()
        }else{this.$message.error(res.msg)}
      })
    },
    handleCheckAllChange(){
      this.ids = []
      this.list.data.forEach(i=>{
        i.check = this.checkAll
        if(this.checkAll){
          if(i.status==5){
            this.ids.push(i.id)
          }
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
          if(i.status==5){
            this.ids.push(i.id)
          }
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
      this.search_loading = true
      this.fetach()
    },
    detail(item){
      this.$router.push({
        path: '/order_detail',
        name:'order_detail',
        query:{
          id:item.id
        }
      });
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
    pay(arr){
      if(arr&&arr.length>0){
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
    }
  }
};
</script>
