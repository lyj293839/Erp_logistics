<style scoped>
.content {
  padding: 15px 30px;
}
.heard_a {
  font-size: 17px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.heard_a span {
  color: #0071e3;
}
.el-col {
  margin-top: 15px;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  color: #828282;
  background: white;
}
table th,
td {
  padding: 5px 5px;
}
table th {
  width: 55px;
  font-weight: normal;
  color: #333333;
  height: 30px;
}
table .heard {
  background: #3d3d49;
  color: white;
}
table .icon {
  width: 70px;
  height: 70px;
  font-size: 21px;
  color: white;
  line-height: 70px;
  text-align: center;
  border-radius: 50%;
  margin: 0px auto;
}
.icon_j {
  background: #334d6e;
}
.icon_sho {
  background: #c2cfe0;
}
table /deep/ .el-input__inner {
  border: none;
  padding: 0px;
}
table .el-select {
  border-bottom: 1px solid #dcdfe6;
}
.j_address /deep/ .el-textarea__inner {
  padding: 0px;
  border: none;
  height: 80px;
}
.s_adress /deep/ .el-textarea__inner {
  padding: 0px;
  border: none;
  height: 40px;
}
table .chicun .el-input {
  width: 50px;
}
table .chicun .el-select {
  border-bottom: none;
}
table .chicun /deep/ .el-input__inner {
  padding: 0px 5px;
  border: 1px solid #dcdfe6;
}
table .other {
  display: flex;
  align-items: center;
}
table .other /deep/ .el-radio__label {
  font-size: 13px;
  padding-left: 5px;
}
table .other .el-radio {
  color: #828282;
  margin-right: 10px;
}
table .other div {
  margin-right: 10px;
}
table .msds {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
table .msds .el-button {
  font-size: 12px;
  margin-left: 0px;
}
.image_list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
</style>
<template>
  <div class="content">
    <div class="heard_a">
      <div>
        货物操作-
        <span>订单详情</span>
      </div>
      <el-button type="primary" size="small" class="button_primary" @click="toup()">上一步</el-button>
    </div>
    <el-row :gutter="15">
      <el-col :span="12">
        <table border="1" bordercolor="#BEBEBE">
          <tr>
            <td colspan="7" class="heard">寄件信息</td>
          </tr>
          <tr>
            <td rowspan="8" width="80">
              <div class="icon icon_j">寄</div>
            </td>
            <th>发货人</th>
            <td colspan="5">
              <el-input size="mini" v-model="data.d_name"></el-input>
            </td>
          </tr>
          <tr>
            <th>电话</th>
            <td colspan="5">
              <el-input size="mini" v-model="data.d_phone"></el-input>
            </td>
          </tr>
          <tr>
            <th>公司</th>
            <td colspan="5">
              <el-input size="mini" v-model="data.d_company"></el-input>
            </td>
          </tr>
          <tr>
            <th>邮箱</th>
            <td colspan="5">
              <el-input size="mini" v-model="data.d_email"></el-input>
            </td>
          </tr>
          <tr>
            <th>邮编</th>
            <td width="80">
              <el-input size="mini" v-model="data.d_zipcode"></el-input>
            </td>
            <th>物流 <br>(国内)</th>
            <td colspan="3">
              <el-input
                v-model="data.goods_member.tracking_number"
                size="mini"
              ></el-input>
            </td>
          </tr>
          <tr>
            <th>国家</th>
            <td>
              <!-- <el-input size="mini" v-model="data.d_country"></el-input> -->
              <el-select v-model="data.d_country" filterable :filter-method="filter_method_r" placeholder="请选择" size="small">
                <el-option
                  v-for="item in countryList_r"
                  :key="item.id"
                  :label="item.en_name"
                  :value="item.en_name">
                  <span style="float: left">{{ item.en_name }}</span>
                  <span style="float: right; color: #8492a6;">{{ item.zh_name }}</span>
                </el-option>
              </el-select>
            </td>
            <th>省/州</th>
            <td>
              <el-input size="mini" v-model="data.d_provice"></el-input>
            </td>
            <th>城市</th>
            <td>
              <el-input size="mini" v-model="data.d_city"></el-input>
            </td>
          </tr>
          <tr>
            <th rowspan="2" style="height:70px;">地址</th>
            <td colspan="5" class="j_address">
              <el-input type="textarea" size="mini" v-model="data.d_address"></el-input>
            </td>
          </tr>
        </table>
      </el-col>
      <el-col :span="12">
        <table border="1" bordercolor="#BEBEBE">
          <tr>
            <td colspan="7" class="heard">收件信息</td>
          </tr>
          <tr>
            <td rowspan="8" width="80">
              <div class="icon icon_sho">收</div>
            </td>
            <th>收货人</th>
            <td colspan="5">
              <el-input size="mini" v-model="data.r_name"></el-input>
            </td>
          </tr>
          <tr>
            <th>电话</th>
            <td colspan="5">
              <el-input size="mini" v-model="data.r_phone"></el-input>
            </td>
          </tr>
          <tr>
            <th>公司</th>
            <td colspan="5">
              <el-input size="mini" v-model="data.r_company"></el-input>
            </td>
          </tr>
          <tr>
            <th>邮箱</th>
            <td colspan="5">
              <el-input size="mini" v-model="data.r_email"></el-input>
            </td>
          </tr>
          <tr>
            <th>邮编</th>
            <td width="90">
              <el-input size="mini" v-model="data.r_zipcode"></el-input>
            </td>
            <th>物流<br>(国外)</th>
            <td colspan="3">
              <el-select v-model="data.goods_member.abroad_express" size="mini" style="width:25%;">
                <el-option
                  v-for="item in $Enum.ABROADEXPREE"
                  :key="item.pid"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
              <el-input
                v-model="data.goods_member.abroad_tracking"
                size="mini"
                style="width:65%;"
              ></el-input>
            </td>
          </tr>
          <tr>
            <th>国家</th>
            <td>
              <!-- <el-input size="mini" v-model="data.r_country"></el-input> -->
              <el-select v-model="data.r_country" filterable :filter-method="filter_method_r" placeholder="请选择" size="small">
                <el-option
                  v-for="item in countryList_r"
                  :key="item.id"
                  :label="item.en_name"
                  :value="item.en_name">
                  <span style="float: left">{{ item.en_name }}</span>
                  <span style="float: right; color: #8492a6;">{{ item.zh_name }}</span>
                </el-option>
              </el-select>
            </td>
            <th>省/州</th>
            <td>
              <el-input size="mini" v-model="data.r_provice"></el-input>
            </td>
            <th>城市</th>
            <td>
              <el-input size="mini" v-model="data.r_city"></el-input>
            </td>
          </tr>
          <tr>
            <th>地址</th>
            <td colspan="5" class="s_adress">
              <el-input placeholder="请输入内容" type="textarea" size="mini" v-model="data.r_address"></el-input>
            </td>
          </tr>
          <tr>
            <th>清关代理</th>
            <td colspan="5">
              <el-input placeholder="请输入内容" size="mini" v-model="data.r_custom_broker"></el-input>
            </td>
          </tr>
        </table>
      </el-col>
      <el-col :span="12">
        <table border="1" bordercolor="#BEBEBE">
          <tr>
            <td colspan="5" class="heard">货物信息</td>
          </tr>
          <tr>
            <th>尺寸</th>
            <td colspan="3" class="chicun">
              <el-input v-model="data.goods_member.g_length" size="mini"></el-input>x
              <el-input v-model="data.goods_member.g_width" size="mini"></el-input>x
              <el-input v-model="data.goods_member.g_height" size="mini"></el-input>cm
            </td>
          </tr>
          <tr>
            <th>重量</th>
            <td colspan="3">
              <el-input v-model="data.goods_member.gross_weight" size="small" style="width:80%;"></el-input>
              <el-select
                v-model="data.goods_member.weight_unit"
                size="small"
                style="width:19%;"
                clearable
              >
                <el-option v-for="item in options_unit" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <th>数量</th>
            <td colspan="3" class="chicun">
              <span>
                p：
                <el-input v-model="data.goods_member.non_danger_number" size="mini"></el-input>
              </span>
              <span>
                EQ：
                <el-input v-model="data.goods_member.limited_number" size="mini"></el-input>
              </span>
              <span>
                DG：
                <el-input v-model="data.goods_member.danger_number" size="mini"></el-input>
              </span>
              <span>
                估值：
                <el-input v-model="data.goods_member.declared_value" size="mini"></el-input>
                <el-select v-model="data.goods_member.currency" placeholder="单位" style="width:80px;" size="mini">
                  <el-option
                    v-for="item in $Enum.CURRENCY"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </span>
            </td>
          </tr>
          <tr>
            <th>其他</th>
            <td colspan="3">
              <div class="other">
                <div>
                  报关：
                  <el-radio-group v-model="data.goods_member.is_customs">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </div>
                <div>
                  保险：
                  <el-radio-group v-model="data.goods_member.is_insurance">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </div>
                <div>
                  DDP:
                  <el-radio-group v-model="data.goods_member.is_ddp">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </div>
              </div>
              <div class="other chicun">
                <div>
                  到付：
                  <el-radio-group v-model="data.goods_member.is_pay">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </div>
                <div v-if="data.goods_member.is_pay==1" style="width:60%;">
                  <span style="color:red;">*</span>
                  <el-input 
                    placeholder="请输入发货账号" 
                    v-model="data.goods_member.shipping_account"
                    style="width:90%;"
                    size="mini"></el-input>
                </div>
                
              </div>
            </td>
          </tr>
          <tr>
            <th>备注</th>
            <td colspan="3">
              <el-input placeholder="请输入内容" size="mini" v-model="data.goods_member.remark"></el-input>
            </td>
          </tr>
          <tr>
            <th>客户文件</th>
            <td colspan="3">
              <PDF ref="pdf"></PDF>
              <a hidden="hidden" target="_blank" :href="file_url" ref="file_url"></a>
              <div class="msds" v-for="i in data.order_files" v-if="i.type===0">
                <div style="width:80%;word-wrap:break-word">{{i.file_name}}</div>
                <div>
                  <!-- <el-button type="text" @click="previewWeekly_pdf(i.file_path)">预览</el-button> -->
                  <el-button type="text" @click="downloadWeekly(i.id,i.file_name)">下载</el-button>
                  <el-button type="text" style="color:red;" @click="cancel_pdf(i.id)">删除</el-button>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </el-col>
      <el-col :span="12">
        <table border="1" bordercolor="#BEBEBE">
          <tr>
            <td colspan="5" class="heard">其他信息</td>
          </tr>
          <tr>
            <th>随货文件</th>
            <td>
              <PDF ref="pdf_s"></PDF>
              <div class="msds" v-for="i in data.order_files" v-if="i.type===2">
                <div style="width:80%;word-wrap:break-word">{{i.file_name}}</div>
                <div>
                  <!-- <el-button type="text" @click="previewWeekly_pdf(i.file_path)">预览</el-button> -->
                  <el-button type="text" @click="downloadWeekly_s(i.id,i.file_name)">下载</el-button>
                  <el-button type="text" style="color:red;" @click="cancel_pdf(i.id)">删除</el-button>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th>偏好物流</th>
            <td>{{data.goods_member.express_like}}</td>
          </tr>
          <tr>
            <th style="height:158px;">单号截图</th>
            <td>
              <div class="image_list">
                <div v-for="i in data.order_files">
                  <span v-if="i.type==1">
                    <el-image
                      style="width: 150px; height: 150px;"
                      :src="API_BASEURL+i.file_path.replace('/var/www/shipchem/upload/','api/shows/')"
                      :preview-src-list="[(API_BASEURL+i.file_path.replace('/var/www/shipchem/upload/','api/shows/'))]"
                    ></el-image>
                    <div style="text-align:center;">
                      <el-button type="text" style="color:red;" @click="cancel_pdf(i.id)">删除</el-button>
                    </div>
                  </span>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </el-col>
    </el-row>
    <div style="text-align:center;margin-top:30px;">
      <el-button type="info" size="small" @click="toup()">取消修改</el-button>
      <el-button
        type="primary"
        size="small"
        class="button_primary"
        :loading="loading"
        @click="save()"
      >保存运单</el-button>
    </div>
  </div>
</template>
<script>
import PDF from "../../../../heard_foot/pdf";
export default {
  name: "ad_order_detail",
  components: {
    PDF
  },
  data() {
    return {
      data: { goods_member: {} },
      file_url: "",
      API_BASEURL: process.env.API_BASEURL,
      loading: false,
      options_unit:['kg'],
      countryList_r:[],
      countryList:[]
    };
  },
  created() {
    this.fetach();
    this.$get('api/orders/countries/').then(res=>{
      this.countryList = res.data
      this.countryList_r = res.data
    })
  },
  methods: {
    fetach() {
      this.$get("api/orders/orders/" + this.$route.query.id).then(res => {
        if (res.code === 0) {
          this.data = res.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    filter_method_r(val){
      if(val){
        this.countryList_r = this.countryList.filter((item) => {
          if (item.en_name.toLowerCase().indexOf(val.toLowerCase())===0) {
            return true
          }
        })
      }else{
        this.countryList_r = this.countryList
      }
    },
    previewWeekly_pdf(file_path) {
      var path = file_path.replace("/var/www/shipchem/upload/", "api/shows/");
      this.file_url = this.API_BASEURL + path;
      setTimeout(() => {
        this.$refs.file_url.click();
      }, 200);
    },
    downloadWeekly(id, fileName) {
      //调用子组件的下载方法
      this.$refs.pdf.downloadPDF(
        this.API_BASEURL + "api/orders/downfile/" + id,
        fileName
      );
    },
    downloadWeekly_s(id, fileName) {
      //调用子组件的下载方法
      this.$refs.pdf_s.downloadPDF(
        this.API_BASEURL + "api/orders/downfile/" + id,
        fileName
      );
    },
    save() {
      this.loading = true;
      var obj = {
        g_length: this.data.goods_member.g_length,
        g_width: this.data.goods_member.g_width,
        g_height: this.data.goods_member.g_height,
        gross_weight: this.data.goods_member.gross_weight,
        weight_unit: this.data.goods_member.weight_unit,
        non_danger_number: this.data.goods_member.non_danger_number,
        limited_number: this.data.goods_member.limited_number,
        danger_number: this.data.goods_member.danger_number,
        declared_value: this.data.goods_member.declared_value,
        is_customs: this.data.goods_member.is_customs,
        is_insurance: this.data.goods_member.is_insurance,
        is_pay: this.data.goods_member.is_pay,
        is_ddp:this.data.goods_member.is_ddp,
        remark: this.data.goods_member.remark,
        express_type: this.data.goods_member.express_type,
        tracking_number: this.data.goods_member.tracking_number,
        abroad_tracking: this.data.goods_member.abroad_tracking,
        abroad_express:this.data.goods_member.abroad_express,
        declared_value:this.data.goods_member.declared_value,
        currency:this.data.goods_member.currency,

        d_name: this.data.d_name,
        d_phone: this.data.d_phone,
        d_company: this.data.d_company,
        d_email: this.data.d_email,
        d_country: this.data.d_country,
        d_provice: this.data.d_provice,
        d_city: this.data.d_city,
        d_zipcode: this.data.d_zipcode,
        d_address: this.data.d_address,

        r_name: this.data.r_name,
        r_phone: this.data.r_phone,
        r_company: this.data.r_company,
        r_email: this.data.r_email,
        r_zipcode: this.data.r_zipcode,
        r_country: this.data.r_country,
        r_provice: this.data.r_provice,
        r_city: this.data.r_city,
        r_address: this.data.r_address,
        r_custom_broker: this.data.r_custom_broker
      };
      this.$post("api/orders/orders/" + this.data.id, obj)
        .then(res => {
          if (res.code === 0) {
            this.$message.success("成功");
            this.loading = false;
            this.fetach();
          } else {
            this.$message.error(res.msg);
            this.loading = false;
          }
        })
        .catch(err => {
          this.loading = false;
        });
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
    },
    toup() {
      // this.$router.push({
      //   path: '/ad_cargo',
      //   name:'ad_cargo'
      // });
      this.$router.back(-1);
    }
  }
};
</script>
