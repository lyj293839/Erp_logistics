<style scoped>
.content{padding: 16px;}
.search{display: flex;align-items: center;justify-content: space-between;}
.search .el-date-editor,.el-select{margin: 5px;}
/* .search ul{display: flex;align-items: center;}
.search ul li{
  font-size: 13px;
  color: #C2CFE0;
  border: 1px solid #C2CFE0;
  height: 30px;
  line-height: 30px;
  padding: 0px 20px;
  border-radius: 15px;
  cursor: pointer;
  margin: 0px 5px;
}
.search ul .cur{border-color:#0071E3;color: #0071E3;} */
.list li{background: white;border: 1px solid #E4E4E4;margin-top: 10px;font-size: 12px;color: #333333;}
.list .row_a{padding:5px 10px 5px 5px;border-bottom: 1px solid #EBEBED;}
.list li .row_a .el-button{border-color:#000000;color: #000000;font-size: 12px;line-height: normal;padding: 3px 5px;}
.list li .row_a .font1{color: #0071E3;}
.list li .row_b{font-size: 12px;padding: 20px 10px;}
.list li .row_b .tip{display: flex;}
.list li .row_b .icon_img{
  min-width: 60px;
  height: 60px;
  border-radius: 50%;
  color: white;
  text-align: center;
  line-height: 60px;
  font-size: 16px;
  margin-right: 5px;
}
.list li .row_b .icon_sho{background: #C2CFE0;}
.list li .row_b .icon_j{background: #334D6E;}
.list li .row_b .font1{color: rgb(148, 145, 145);line-height: 40px;margin-top: -20px;word-break:break-all;}
.list li .row_b .font2{color: #000;word-break:break-all;}
.list li .row_b .dian{display: flex;align-items: center;}
.list li .row_b .dian li{width: 6px;height: 6px;background: #C3C3C3;margin: 0px 5px;border-radius: 50%;}
.list li .row_b .data_num div{color: #333;margin: 5px 0px;}
.list li .row_b .stip {display: flex;flex-wrap: wrap;text-align: center;align-items: center;}
.list li .row_b .stip .el-button{width: 80px;padding: 5px;border-color: #334D6E;color: #334D6E;margin: 5px;}
.list li .row_b .stip_s .el-button{background:#334D6E;color: white;}
.list li .row_b .stip_s .el-button:hover{color: white !important;border-color: #334D6E !important;}
.list li .row_b .make .el-button{width: 100%;padding: 10px 5px;margin-top: 5px;white-space:normal;border-color: #000000;color: #000000;font-size: 12px;}
.list li .row_b .make .danger{border: none;color: white;}
.list li .row_b .make_s .el-button{border-color: #C2CFE0;color: #0071E3;}
.list table{width: 100%;border-collapse: collapse;font-size: 13px;color: #888888;}
.list table /deep/ .el-input__inner{padding: 0px 5px;border: none;}
.list table th,td{padding: 5px 10px;}
.list table th{color: #333333;width: 90px;text-align: center;font-weight: normal;}
.list table .chicun{text-align: center;}
.list table .chicun .el-input{width: 50px;}
.list table .chicun /deep/ .el-input__inner{padding: 0px 5px;border: 1px solid #DCDFE6;}
.list table .msds{display: flex;justify-content: space-between;align-items: center;font-size: 12px;}
.list table .msds .el-button{font-size: 12px;margin-left: 0px;}
.list table .other{display: flex;align-items: center;justify-content: space-between;line-height: 30px;}
.list table .other div{display: flex;align-items: center;}
.list table .other .el-radio{color: #888888;margin-right: 10px;}
.list table .other /deep/ .el-radio__label{font-size: 13px;padding-left: 5px;}
.list .s_file{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #0071E3;cursor: pointer;text-align: center;}
.list .warehouse_i{cursor: pointer;font-size: 16px;}
.list .warehouse_i:hover{color:#0071E3;}
.dialogFile /deep/ .el-dialog__header{text-align: center;font-size: 16px;color: #333333;}
.dialogFile /deep/ .el-dialog__header .el-dialog__headerbtn{display: none;}
.dialogLog /deep/ .el-dialog__header{display: none;}
</style>
<template>
  <div class="content">
    <div class="search">
      <div class="search">
        <el-button size="small" type="primary" style="width:80px;" class="button_primary" :loading="search_loading" @click="search()">搜索</el-button>
        <el-date-picker
          v-model="queryList.start_time"
          type="date"
          value-format="yyyy-MM-dd"
          size="small"
          placeholder="选择开始日期">
        </el-date-picker>
        <el-date-picker
          v-model="queryList.end_time"
          type="date"
          value-format="yyyy-MM-dd"
          size="small"
          placeholder="选择结束日期">
        </el-date-picker>
        <a hidden="hidden" target="_blank" :href="file_url" ref="file_url"></a>
        <a hidden="hidden" :href="file_url_s" ref="file_url_s"></a>
        <el-select v-model="queryList.customer_id" size="small" filterable placeholder='选择客户' clearable>
          <el-option
            v-for="item in customerAll"
            :key="item.id"
            :label="item.userinfo.username"
            :value="item.id">
            <span style="float: left">{{item.userinfo.username}}</span>
            <span style="float: right; color: #8492a6;">{{ item.iphone }}</span>
          </el-option>
        </el-select>
        <el-select v-model="queryList.status" size="small" multiple placeholder='选择状态' clearable>
          <el-option
            v-for="item in option_status"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <PDF ref="pdf"></PDF>
        <!-- <ul>
          <li :class="queryList.status===''?'cur':''" @click="search_type()">全部</li>
          <li v-for="item in $Enum.ORDERSTATUS" v-if="item.pid<=4&&item.pid!=-1" :class="queryList.status===item.pid?'cur':''" @click="search_type(item)">{{item.name}}</li>
        </ul> -->
      </div>
    </div>
    <div style="display:flex;align-items:center;justify-content: space-between;margin:10px 0px;">
      <div>
        <el-checkbox v-model="checkAll" @change="handleCheckAllChange()" v-if="list.data&&list.data.length>0">全选</el-checkbox>
      </div>
      <div>
        <el-button size="small" plain class="button_plain" @click="transfer()">中转</el-button>
        <el-button size="small" plain class="button_plain" @click="track_abroad()">发货（国外）</el-button>
        <el-button size="small" plain class="button_plain" @click="open_log()">操作记录</el-button>
      </div>
    </div>
    <ul class="list">
      <li v-for="item in list.data">
        <el-row type="flex" align="middle" class="row_a" :gutter="10">
          <el-col :span="4">
            <div style="display:flex;align-items:center;">
              <el-checkbox v-model="item.check" @change="handleCheckChange()" v-if="item.status>=2"></el-checkbox>
              <div style="margin-left:5px;">
                客户：{{item.user.userinfo.username}}<br>
                订单号：{{item.order_no}}
              </div>
            </div>
          </el-col>
          <el-col :span="6" class="font1">收转库：<br> 深圳市罗湖区清水河一路8号2栋103-3 荣达昌物流</el-col>
          <el-col :span="7">备注：<span style="color:red;">{{item.goods_member.remark}}</span></el-col>
          <el-col :span="3" style="text-align:center;">
            <el-popover
              v-if="!item.order_files.filter(i=>{return i.type==2})[0]"
              placement="top"
              width="300"
              trigger="click">
                <div style="position: relative;">
                  <el-upload
                    :ref="item.order_no"
                    class="upload-demo"
                    :action="API_BASEURL+'api/orders/upfile/'+item.id"
                    :file-list="item.fileList"
                    :headers="myHeaders"
                    :on-change='change_file'
                    :on-success='success_shuFile'
                    name='myfile'
                    :multiple='true'
                    :auto-upload="false">
                    <el-button slot="trigger" size="mini" type="primary" class="button_primary">选取文件</el-button>
                  </el-upload>
                  <div style="position: absolute;top:0px;right:0px;">
                    <el-button size="mini" type="primary" class="button_primary"  @click="upload_s_file(item)">保存</el-button>
                  </div>
                </div>
                <el-button slot="reference" size="small" type="primary" class="button_primary">随货文件</el-button>
            </el-popover>
            <div v-else >
              <el-tooltip class="item" effect="dark" :content="item.order_files.filter(i=>{return i.type==2})[0].file_name" placement="top">
                <div class="s_file" @click="download_file_s(item.order_files.filter(i=>{return i.type==2})[0])">
                  {{item.order_files.filter(i=>{return i.type==2})[0].file_name}}
                </div>
              </el-tooltip>
            </div>
          </el-col>
          <el-col :span="2">
            下单日期：<br>
            {{$All.getDate(item.create_time)}}
          </el-col>
          <el-col :span="2" style="text-align:right;">
            <i  class="el-icon-view warehouse_i" @click="item.show_ku = !item.show_ku"></i>
            <el-button plain size="mini" @click="to_detail(item.id)">运单详情</el-button>
          </el-col>
        </el-row>
        <el-row class="row_b" type="flex" align="middle">
          <el-col :span="4" class="tip">
            <div class="icon_img icon_j">寄</div>
            <div>
              <div class="font1">{{item.d_country}}</div>
              <div class="font2">
                <span>{{item.d_name}}</span><br>
                <span>{{item.d_company}}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="2" style="display:flex;justify-content: center;">
            <ul class="dian">
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </el-col>
          <el-col :span="5" class="tip">
            <div class="icon_img icon_sho">收</div>
            <div>
              <div class="font1">{{item.r_city}}</div>
              <div class="font2">
                <span>{{item.r_name}}</span><br>
                <span>{{item.r_company}}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="3" class="data_num">
            <div>国家：{{item.r_country}}</div>
            <div>毛重：{{item.goods_member.gross_weight}}{{item.goods_member.weight_unit}}</div>
            <div>P:{{item.goods_member.non_danger_number}}件&nbsp;EQ:{{item.goods_member.limited_number}}件&nbsp;DG:{{item.goods_member.danger_number}}件</div>
          </el-col>
          <el-col :span="4" class="stip">
            <div :class="item.status>=1?'stip_s':''">
              <el-button plain size="mini">发货</el-button><br>
              <span v-if='item.deliver_time'>{{$All.getDate(item.deliver_time)}}</span>
              <span v-else>**年**月**日</span>
            </div>
            <div :class="item.status>=2?'stip_s':''">
              <el-button plain size="mini" @click="warehouse_into(item)">入库</el-button><br>
              <span v-if='item.warehouse_time'>{{$All.getDate(item.warehouse_time)}}</span>
              <span v-else>**年**月**日</span>
            </div>
            <div :class="item.status>=3?'stip_s':''">
              <el-button plain size="mini" @click="transfer_a(item)">中转</el-button><br>
              <span v-if='item.transfer_time'>{{$All.getDate(item.transfer_time)}}</span>
              <span v-else>**年**月**日</span>
            </div>
            <div :class="item.status>=4?'stip_s':''">
              <el-button plain size="mini" @click="track_abroad_a(item)">发货（国际）</el-button><br>
              <span v-if='item.abroad_time'>{{$All.getDate(item.abroad_time)}}</span>
              <span v-else>**年**月**日</span>
            </div>
          </el-col>
          <el-col :span="6" style="text-align:right;">
            <el-row :gutter="10" class="make" type="flex" align="middle" style="flex-wrap: wrap;">
              <el-col :span="12">
                <el-button plain @click="upload_file(item.id)">上传发货文件</el-button>
              </el-col>
              <el-col :span="12">
                <div v-if="item.goods_member.tracking_number">
                  <el-button plain @click="$All.Copy(item.goods_member.tracking_number)">{{item.goods_member.tracking_number}}</el-button>
                </div>
                <el-popover
                  v-else
                  placement="top"
                  width="300"
                  trigger="click">
                    <div style="display:flex;">
                      <el-input v-model="trackForm.tracking_number" size="mini" placeholder="填写发出单号"></el-input>
                      <el-button type="primary" size="mini" class="button_primary" @click="border_tracking(item)">保存</el-button>
                    </div>
                  <el-button slot="reference" plain @click="trackForm.tracking_number=''">填写发出单号</el-button>
                </el-popover>
              </el-col>
              <el-col :span="12">
                <el-button plain @click="upload_image(item.id)">上传发货截图</el-button>
              </el-col>
              <el-col :span="12">
                <div v-if="item.goods_member.abroad_tracking">
                  <el-button plain @click="$All.Copy(item.goods_member.abroad_tracking)">{{item.goods_member.abroad_tracking}}</el-button>
                </div>
                <el-popover
                  v-else
                  placement="bottom"
                  width="400"
                  trigger="click">
                    <div style="display:flex;align-items: center;">
                      <el-select v-model="trackForm.abroad_express" placeholder="请选择快递" size="mini">
                        <el-option
                          v-for="item in $Enum.ABROADEXPREE"
                          :key="item.pid"
                          :label="item.name"
                          :value="item.name">
                        </el-option>
                      </el-select>
                      <el-input v-model="trackForm.tracking_number" size="mini" placeholder="填写发货单号（国外）"></el-input>
                      <el-button type="primary" size="mini" class="button_primary" @click="addabroad(item)">保存</el-button>
                    </div>
                  <el-button slot="reference" plain @click="trackForm.tracking_number=trackForm.abroad_express=''">填写发货单号（国外）</el-button>
                </el-popover>
              </el-col>
              <el-col :span="12">
                &nbsp;
              </el-col>
              <el-col :span="12">
                <el-button type="danger" class="danger" @click="cancel_order(item)">取消订单</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        
        <div style="padding:20px;" v-if='item.show_ku'>
          <table border="1" bordercolor="#BEBEBE">
            <tr>
              <th>货品尺寸</th>
              <td width='300' class="chicun">
                <el-input v-model="item.goods_member.g_length" size="mini" ></el-input>x
                <el-input v-model="item.goods_member.g_width" size="mini" ></el-input>x
                <el-input v-model="item.goods_member.g_height" size="mini" ></el-input>cm
              </td>
              <th>客户文件</th>
              <td style="width:300px;" colspan="3">
                <div class="msds" v-for="i in item.order_files" v-if="i.type===0">
                    <div style="width:200px;word-wrap:break-word">{{i.file_name}}</div>
                    <div>
                      <!-- <el-button type="text" @click="previewWeekly_pdf(i.file_path)">预览</el-button> -->
                      <el-button type="text" @click="downloadWeekly(i.id,i.file_name)">下载</el-button>
                      <el-button type="text" style="color:red;" @click="cancel_pdf(i.id)">删除</el-button>
                    </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>货品重量</th>
              <td class="chicun"><el-input v-model="item.goods_member.gross_weight" size="mini" ></el-input>{{item.goods_member.weight_unit}}</td>
              <th>货品估值</th>
              <td>
                <el-input v-model="item.goods_member.declared_value" size="mini" style="width:60%;" placeholder="请输入"></el-input>
                <el-select v-model="item.goods_member.currency" placeholder="单位" style="width:30%;" size="mini" clearable>
                  <el-option
                    v-for="item in $Enum.CURRENCY"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </td>
              <th>单号图片</th>
              <td align='center'>
                <div v-for="i in item.order_files" >
                  <span v-if="i.type==1" style="display:flex;">
                    <el-image 
                      style="width: 150px; height: 30px;"
                      :src="API_BASEURL+i.file_path" 
                      :preview-src-list="[(API_BASEURL+i.file_path)]">
                    </el-image>
                    <el-button type="text" style="color:red;" @click="cancel_pdf(i.id)">删除</el-button>
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <th>产品数量</th>
              <td class="chicun">
                <span>p：<el-input v-model="item.goods_member.non_danger_number" size="mini" disabled></el-input></span>
                <span>EQ：<el-input v-model="item.goods_member.limited_number" size="mini" disabled></el-input></span>
                <span>DG：<el-input v-model="item.goods_member.danger_number" size="mini" disabled></el-input></span>
              </td>
              <th>收货快递</th>
              <td><el-input v-model="item.goods_member.tracking_number" size="mini" disabled></el-input></td>
              <th>发货快递</th>
              <td>
                 <el-select v-model="item.goods_member.abroad_express" style="width:30%;" size="mini" disabled>
                  <el-option
                    v-for="item in $Enum.ABROADEXPREE"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
                <el-input v-model="item.goods_member.abroad_tracking" size="mini" style="width:60%;" disabled></el-input>
              </td>
            </tr>
            <tr>
              <th>到付</th>
              <td >
                <div  class="other">
                  <el-radio-group v-model="item.goods_member.is_pay" style="margin-right:10px;">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                  <div style="width:100%;">账号：{{item.goods_member.shipping_express}}{{item.goods_member.shipping_account}}</div>
                </div>
              </td>
              <th>其他</th>
              <td colspan="3">
                <div class="other" style="justify-content: flex-start;">
                  <div>报关：
                    <el-radio-group v-model="item.goods_member.is_customs">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </div>
                  <div style="margin:0px 20px;">保险：
                    <el-radio-group v-model="item.goods_member.is_insurance">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </div>
                  <div>DDP：
                    <el-radio-group v-model="item.goods_member.is_ddp">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </div>
                </div>
              </td>
              
            </tr>
            <tr>
              <th>订单备注</th>
              <td colspan="5">
                <div class="other">
                  <el-input v-model="item.goods_member.remark" size="mini" placeholder="请输入"></el-input>
                  <el-button type="primary" size="mini" class="button_primary" style="width:150px;" v-if="item.status==1" @click="warehouseSave(item)">保存</el-button>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </li>
    </ul>
    <div class="null_dom" v-if="!list.data||list.data.length==0">
      <i class="el-icon-search"></i>
      查无数据
    </div>

    <el-dialog class="dialogFile" title="发货截图上传" width="600px" :visible.sync="dialog_image" @close='close_image()'>
      <uploadImage ref="uploadImage" :cargo_id='cargo_id' id="uploadImage"></uploadImage>
    </el-dialog>

    <el-dialog class="dialogFile" title="发货文件上传" width="600px" :visible.sync="dialog_file" @close='close_file()'>
      <uploadFile ref="uploadFile" :cargo_id='cargo_id'></uploadFile>
    </el-dialog>

    <el-dialog class="dialogLog" width="1000px" :visible.sync="dialog_log" @close='log_close()'>
      <makeLog ref="makeLog"></makeLog>
    </el-dialog>


    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      layout="prev, pager, next"
      :total="list.count">
    </el-pagination>
  </div>
</template>
<script>
import uploadFile from "./components/upload";
import uploadImage from "./components/upload_image";
import makeLog from "./components/make_log";
import PDF from '../../../../heard_foot/pdf'
export default {
  name: "ad_cargo",
  components: {
    uploadFile,
    makeLog,
    uploadImage,
    PDF
  },
  data() {
    return {
      checkAll:false,
      myHeaders: {userToken: JSON.parse(localStorage.getItem('loginForm')).token},
      API_BASEURL:process.env.API_BASEURL,
      list:{},
      index:'',
      ids:[],
      trackForm:{
        tracking_number:'',
        abroad_express:''
      },
      queryList:{
        status:[],
        customer_id:'',
        start_time:'',
        end_time:'',
        search_info:'',
        page:1
      },
      currentPage:1,
      input:'',
      radio:'',
      cargo_id:'',
      file_url:'',
      file_url_s:'',
      show_ku:false,
      search_loading:false,
      dialog_log:false,
      dialog_image:false,
      dialog_file:false,
      customerAll:[],
      option_status:[
        {id:0,name:'未发货'},
        {id:1,name:'已发货'},
        {id:2,name:'已入库'},
        {id:3,name:'已中转'},
        {id:4,name:'已发货(国外)'},
      ]
    };
  },
  created () {
    this.fetach()
    this.$get('api/users/userall',{type:0}).then(res=>{
      this.customerAll = res.data
    })
  },
  methods: {
    fetach(){
      this.queryList.search_info = sessionStorage.getItem('search_info')?sessionStorage.getItem('search_info'):''
      sessionStorage.removeItem('search_info')
      var queryList = JSON.parse(JSON.stringify(this.queryList))
      queryList.status = JSON.stringify(queryList.status)
      this.$get('api/orders/orderlist/',queryList).then(res=>{
        if(res.code===0){
          if(this.search_loading){
            this.$message.success('搜索完成')
            this.search_loading = false
          }
          res.data.forEach(item=>{
            item['check']=false
            item['show_ku'] = false
            item['fileList'] = []
            item.order_files.forEach(i=>{
              i.file_path = i.file_path.replace('/var/www/shipchem/upload/','api/shows/')
              // i.file_path = 'api/orders/downfile/'+i.file_name
            })
          })
          this.checkAll = false
          this.list = res
          this.index = ''
          this.ids = []
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
    handleCheckAllChange(){
      this.ids = []
      this.list.data.forEach(i=>{
        i.check = this.checkAll
        if(this.checkAll&&i.status>=2){
          this.ids.push(i.id)
        }else{
          this.ids = []
        }
      })
    },
    handleCheckChange(){
      var a = 0
      this.ids = []
      this.list.data.forEach(i=>{
        if(i.check){
          a++
          if(i.status>=2){this.ids.push(i.id)}
        }
      })
      if(a==this.list.data.length){
        this.checkAll = true
      }else{
        this.checkAll = false
      }
    },
    track_abroad_a(item){
      if(!item.abroad_time){
        var obj = {
          status:4
        }
        this.$post('api/orders/changestatus/'+item.id,obj).then(res=>{
          if(res.code===0){
            this.$message.success('成功')
            this.fetach()
          }else{this.$message.error(res.msg)}
        })
      }else{
        this.cancelstatus(item.id,4)
      }
    },
    track_abroad(){
      if(this.ids.length==0){
        this.$message.error('请选择已中转，需要发货的订单')
      }else{
        var obj = {
          id_list:JSON.stringify(this.ids)
        }
        this.$post('api/orders/sendabroad/',obj).then(res=>{
          if(res.code===0){
            this.$message.success('成功')
            this.fetach()
          }else{this.$message.error(res.msg)}
        })
      }
    },
    transfer_a(item){
      if(!item.transfer_time){
        var obj = {
          status:3
        }
        this.$post('api/orders/changestatus/'+item.id,obj).then(res=>{
          if(res.code===0){
            this.$message.success('成功')
            this.fetach()
          }else{this.$message.error(res.msg)}
        })
      }else{
        this.cancelstatus(item.id,3)
      }
    },
    transfer(){
      if(this.ids.length==0){
        this.$message.error('请选择已入库，需要中转的订单')
      }else{
        var obj = {
          id_list:JSON.stringify(this.ids)
        }
        this.$post('api/orders/transfer/',obj).then(res=>{
          if(res.code===0){
            this.$message.success('成功')
            this.fetach()
          }else{this.$message.error(res.msg)}
        })
      }
    },
    search_type(item){
      this.queryList.status=item?item.pid:''
      this.search()
    },
    search(){
      this.search_loading = true
      this.fetach()
    },
    border_tracking(item){
      this.$post('api/orders/addtracking/'+item.id,this.trackForm).then(res=>{
        if(res.code===0){
          this.$message.success('成功')
          this.trackForm.tracking_number = ''
          this.fetach()
        }else{this.$message.error(res.msg)}
      })
    },
    addabroad(item){
      if(this.trackForm.tracking_number&&this.trackForm.abroad_express){
        var obj = {
          abroad_tracking:this.trackForm.tracking_number,
          abroad_express:this.trackForm.abroad_express
        }
        this.$post('api/orders/addabroad/'+item.id,obj).then(res=>{
          if(res.code===0){
            this.$message.success('成功')
            this.trackForm.tracking_number = ''
            this.trackForm.abroad_express = ''
            this.fetach()
          }else{this.$message.error(res.msg)}
        })
      }else{
        this.$message.error("请填写全发货单号和发货快递")
      }
    },
    change_file(file, fileList){
      this.list.data.filter(item=>{return item.id==this.index})[0].fileList = fileList
    },
    cancelstatus(id,status){
      this.$confirm('此操作将取消该状态, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var obj = {
            status
          }
          this.$post('api/orders/cancelstatus/'+id,obj).then(res=>{
            if(res.code===0){
              this.$message.success('成功')
              this.fetach()
            }else{this.$message.error(res.msg)}
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
      });
    },
    warehouse_into(item){
      if(!item.warehouse_time&&item.status==1){
        item.show_ku = !item.show_ku
        item.fileList = []
      }else if(item.warehouse_time){
        this.cancelstatus(item.id,2)
      }else{
        this.$message.error('请先发货')
      }
    },
    upload_s_file(item){
      this.$refs[item.order_no][0].data = {file_type:2}
      setTimeout(()=>{
        this.$refs[item.order_no][0].submit();
      },200)
    },
    warehouseSave(item){
      let obj = {
        g_length:item.goods_member.g_length,
        g_width:item.goods_member.g_width,
        g_height:item.goods_member.g_height,
        gross_weight:item.goods_member.gross_weight,
        non_danger_number:item.goods_member.non_danger_number,
        limited_number:item.goods_member.limited_number,
        danger_number:item.goods_member.danger_number,
        declared_value:item.goods_member.declared_value,
        is_customs:item.goods_member.is_customs,
        is_insurance:item.goods_member.is_insurance,
        is_pay:item.goods_member.is_pay,
        is_ddp:item.goods_member.is_ddp,
        abroad_express:item.goods_member.abroad_express,
        remark:item.goods_member.remark,
        currency:item.goods_member.currency
      }
      // if(item.fileList&&item.fileList.length>0){
      //   obj.file_type = 2
      //   this.$refs[item.order_no][0].data = obj
      //   setTimeout(()=>{
      //     this.$refs[item.order_no][0].submit();
      //   },200)
      // }else{
        this.$post('api/orders/warehouse/'+item.id,obj).then(res=>{
          if(res.code===0){
            this.$message.success('成功')
            item.fileList = []
            this.fetach()
          }else{
            this.$message.error(res.msg)
          }
        })
      // }
    },
    success_shuFile(response, file, fileList){
      if(response.code===0){
        this.$message.success('成功')
        this.fetach()
      }else{this.$message.error(response.msg)}
    },
    upload_file(id){
      this.cargo_id = id
      this.dialog_file = true
    },
    close_file(){
      this.$refs.uploadFile.fileList=[]
      this.dialog_file = false
    },
    upload_image(id){
      this.cargo_id = id
      this.dialog_image = true
      this.$nextTick(()=>{
        this.$refs.uploadImage.AddEventlist()
      })
    },
    open_log(){
      this.dialog_log = true
      this.$refs.makeLog.fetach()
    },
    log_close(){
      this.$refs.makeLog.queryList.search_info = ''
      this.dialog_log = false
    },
    close_image(){
      this.$refs.uploadImage.imageUrl = ''
      this.$refs.uploadImage.CloseEventlist()
      this.dialog_image = false
    },
    to_detail(id){
      this.$router.push({
        path: '/ad_order_detail',
        name:'ad_order_detail',
        query:{
          id
        }
      });
    },
    cancel_order(item){
      this.$confirm('此操作将取消该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$get('api/orders/cancel/'+item.id).then(res=>{
            if(res.code===0){
              this.$message.success('成功')
              this.fetach()
            }else{this.$message.error(res.msg)}
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
      });
    },
    download_file_s(i){
      // this.file_url_s = this.API_BASEURL+i.file_path
      // setTimeout(()=>{
      //   this.$refs.file_url_s.click()
      // },200)
      this.$refs.pdf.downloadPDF(this.API_BASEURL+'api/orders/downfile/'+i.id,i.file_name)
    },
    previewWeekly_pdf(file_path){
      this.file_url = this.API_BASEURL+file_path
      setTimeout(()=>{
        this.$refs.file_url.click()
      },200)
    },
    //预览
    previewWeekly(file_path){
      //调用子组件的预览方法
      //完整的地址应该是发布到服务器的地址，不应该是localhost:8080这样的
      //Vue.prototype.ApiUrl 用来读取服务器地址 比如:
      //http://192.168.8.152:8080/MixShowView-Web/reports/preview/1
        this.$refs.pdf[0].previewPDF(this.API_BASEURL+file_path)
    },
    //下载
    downloadWeekly(id,fileName){
      //调用子组件的下载方法
        this.$refs.pdf.downloadPDF(this.API_BASEURL+'api/orders/downfile/'+id,fileName)
    },
    cancel_pdf(id){
      this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$get('api/orders/upfile/'+id).then(res=>{
            if(res.code===0){
              this.$message.success('成功')
              this.fetach()
            }else{this.$message.error(res.msg)}
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
      });
    }
  }
};
</script>