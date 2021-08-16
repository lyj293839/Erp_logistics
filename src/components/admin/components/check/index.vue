<style scoped>
.content{padding: 16px;}
.search{display: flex;align-items: center;justify-content:flex-end;}
.make{display: flex;align-items: center;justify-content: space-between;margin: 10px 0px;}
.make .el-button{margin-left: 10px;}
.search .el-date-editor{margin: 5px;}
.search /deep/ .el-select__tags{max-width: 100% !important;}
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
.search .el-checkbox{margin: 0px;}
.list li{background: white;border: 1px solid #E4E4E4;font-size: 12px;color: #888888;margin:5px 0px;}
.list li .heard{padding:10px 15px 10px 5px;border-bottom: 1px solid #EBEBED;}
.list li .heard .el-button{border-color:#000000;color: #000000;font-size: 12px;line-height: normal;padding: 3px 5px;}
.list .font1{color: #0071E3;}
.list .body .body_a .el-col{margin: 5px 0px;padding-left: 10px;}
.list .body .body_b .el-col{margin: 5px 0px;}
.list .body .body_a .el-col li{border: none !important;margin: 0px;}
.list .body .body_b .el-col div{border: 1px solid #C2CFE0;}
.list .body .body_b .el-col /deep/ .el-input__prefix{line-height: 26px;font-size: 12px;}
.list .body .body_b .el-col /deep/ .el-input--prefix .el-input__inner{padding-left: 35px;}
.list .body .body_b .font2{display:flex;justify-content: space-between;align-items: flex-end;}
.list .body .body_b .font2 span{color: #333333;font-size: 13px;}
.list .body .body_b /deep/ .el-input__inner{border: none;}
.list .body .body_c{font-size: 13px;text-align: center;line-height: 40px;}
.list .body .body_c span{color: #0071E3;}
.list .body .body_d {padding-right: 15px;flex-wrap: wrap;}
.list .body .body_d .el-button{width:100%;margin: 7px 0px;}
.popover li span{width: 55px;}
.popover li p{margin: 0px;width: 100px;line-height: 28px;}
.popover li{display: flex;align-items: center;border-bottom: 1px solid #C2CFE0;padding: 2px 0px;}
.popover_foot{display: flex;justify-content: space-between;align-items: center;margin-top: 5px;}
.popover /deep/ .el-input__inner{border: none;padding: 0px;}

.dialog /deep/ .el-dialog__header{display: none;}
.dialog /deep/ .el-dialog__body{padding: 0px;}
</style>
<template>
  <div class="content">
    <div class="search">
      <!-- <ul>
        <li v-for="item in $Enum.ORDERSTATUS" v-if="item.pid>=4" :class="queryList.status==item.pid?'cur':''" @click="search_type(item)">{{item.name}}</li>
        <li :class="queryList.invoice_status===0?'cur':''" @click="search_invoice(0)">未开票</li>
        <li :class="queryList.invoice_status==1?'cur':''" @click="search_invoice(1)">已开票</li>
      </ul> -->
      <div>
        <el-date-picker
          v-model="queryList.start_time"
          type="date"
          size="small"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
        <el-date-picker
          v-model="queryList.end_time"
          type="date"
          size="small"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
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
        <el-select v-model="queryList.invoice_status" size="small" multiple placeholder='开票状态' style="width:100px;" clearable>
          <el-option
            v-for="item in $Enum.INVOICESTATUS"
            :key="item.pid"
            :label="item.name"
            :value="item.pid">
          </el-option>
        </el-select>
        <el-button size="small" type="primary" style="width:80px;" class="button_primary" :loading="search_loading" @click="search()">搜索</el-button>
      </div>
    </div>
    <div class="make">
      <el-checkbox v-model="checkAll" @change="handleCheckAllChange()">全选</el-checkbox>
      <div>
        <el-button size="small" plain class="button_plain" :loading="loading_pushprice" @click="pushprice_All()">批量推送</el-button>
        <el-button size="small" plain class="button_plain" :loading="loading_paymentdeal" @click="paymentdeal()">支付完成</el-button>
        <el-button size="small" plain class="button_plain" :loading="loading_checkmoney" @click="checkmoney()">批量核算</el-button>
        <el-button size="small" plain class="button_plain" :loading="loading_upload" @click="to_upload()">批量开票</el-button>
        <el-dropdown trigger='click'>
          <el-button size="small" plain class="button_plain">导出</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>导出收款记录</el-dropdown-item>
            <el-dropdown-item>导出发票信息</el-dropdown-item>
            <el-dropdown-item>导出核算信息</el-dropdown-item>
            <el-dropdown-item>导出财务数据</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <ul class="list">
      <li v-for="item in list.data">
        <el-row class="heard" type="flex" align="middle">
          <el-col :span="5">
            <el-checkbox v-model="item.check" @change="checkChange()"></el-checkbox>
            订单号：{{item.order_no}}
          </el-col>
          <el-col :span="5">
            发货单号（国外）：
            {{item.goods_member.abroad_express}}
            {{item.goods_member.abroad_tracking}}
          </el-col>
          <el-col :span="2" class="font1">共下单：{{item.order_num}}次</el-col>
          <el-col :span="3" class="font1">总共支付金额：{{item.total_money}}元</el-col>
          <el-col :span="3" class="font1">总创造利润：{{item.profit_money}}元</el-col>
          <el-col :span="2" class="font1" style="text-align:center;">{{$All.getEnumValue($Enum.ORDERSTATUS,item.status)}}</el-col>
          <el-col :span="4" style="text-align:right;">
            下单日期：{{$All.getDate(item.create_time)}}
            <el-button plain size="mini" @click="to_detail(item.id)">运单详情</el-button>
          </el-col>
        </el-row>
        <el-row class="body" type="flex" align="middle">
          <el-col :span="8">
            <el-row class="body_a">
              <!-- <el-col :span="12">
                <div>
                  <span>客户经理</span><br>
                  <span>{{item.user.userinfo.saler_id}}</span>
                </div>
              </el-col> -->
              <el-col :span="12">
                <div>
                  <span>客户名称</span><br>
                  <span>{{item.user.userinfo.username}}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div>
                  <span>货品信息</span><br>
                  <span>国家：{{item.d_country}}--->{{item.r_country}}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div>
                  <span>联系方式</span><br>
                  <span>{{item.user.iphone}}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div>
                  <span>毛重：{{item.goods_member.gross_weight}}{{item.goods_member.weight_unit}}</span>,
                  <span>实重：{{item.goods_member.actual_gross_weight?item.goods_member.actual_gross_weight:0}}{{item.goods_member.weight_unit}}</span>
                  <br>
                  <span>P:{{item.goods_member.non_danger_number}}件&nbsp;EQ:{{item.goods_member.limited_number}}件&nbsp;DG:{{item.goods_member.danger_number}}件</span>
                  <br>
                  <span>估值：{{item.goods_member.declared_value}}{{item.goods_member.currency}}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div>
                  清关代理
                  <div>{{item.r_custom_broker?r_custom_broker:'无'}}</div>
                </div>
              </el-col>
              <el-col :span="12">
                <ul style="display:flex;border:none;">
                  <li>报关:{{item.goods_member.is_customs==1?'是':'否'}}；</li>
                  <li>保险:{{item.goods_member.is_insurance==1?'是':'否'}}；</li>
                  <li>DDP:{{item.goods_member.is_ddp==1?'是':'否'}}；</li>
                </ul>
                <div>
                  到付:{{item.goods_member.is_pay==1?'是':'否'}}
                  <span>{{item.goods_member.shipping_account}}</span>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row :gutter="15" class="body_b">
              <el-col :span="12">
                <el-popover
                  placement="bottom-start"
                  :width="250"
                  trigger="click"
                  :disabled="item.goods_member.is_pay==1?true:false"
                >
                  <ul class="popover">
                    <li>
                      <p>国外快递：</p>
                      <el-select v-model="freight_fee.express_name" size="mini" style="width:100%;">
                        <el-option
                          v-for="item in $Enum.ABROADEXPREE"
                          :key="item.pid"
                          :label="item.name"
                          :value="item.name">
                        </el-option>
                      </el-select>
                    </li>
                    <li>
                      <p>收件国家：</p>
                      <!-- <el-input v-model="freight_fee.country" size="mini" placeholder="请输入内容"></el-input> -->
                      <el-select v-model="freight_fee.country" filterable :filter-method="filter_method_r" style="width:100%;" size="mini">
                        <el-option
                          v-for="item in countryList_r"
                          :key="item.id"
                          :label="item.en_name"
                          :value="item.en_name">
                          <span style="float: left">{{ item.en_name }}</span>
                          <span style="float: right; color: #8492a6;">{{ item.zh_name }}</span>
                        </el-option>
                      </el-select>
                    </li>
                    <li>
                      <p>毛重：</p>
                      <el-input v-model="freight_fee.weight" size="mini" placeholder="请输入内容" ></el-input>
                    </li>
                    <li>
                      <p>P：</p>
                      <el-input v-model="freight_fee.P" size="mini" placeholder="请输入内容"></el-input>
                    </li>
                    <li>
                      <p>EQ：</p>
                      <el-input v-model="freight_fee.EQ" size="mini" placeholder="请输入内容"></el-input>
                    </li>
                    <li>
                      <p>DG：</p>
                      <el-input v-model="freight_fee.DG" size="mini" placeholder="请输入内容"></el-input>
                    </li>
                  </ul>
                  <div class="popover_foot">
                    <span></span>
                    <el-button type="primary" size="mini" class="button_primary" @click="fee_js(item,'freight_fee')">计算</el-button>
                  </div>
                  <template #reference>
                    <el-input placeholder="请输入内容" size="mini" 
                      v-model="item.order_price.freight_fee"
                     @input="price_change(item)"
                     @focus="yun_fee(item,'freight_fee')"
                     :disabled="item.goods_member.is_pay==1?true:false"
                    >
                      <span slot="prefix">运费：</span>
                    </el-input> 
                  </template>
                </el-popover>
              </el-col>
              <el-col :span="12">
                <el-popover
                  placement="bottom-start"
                  :width="200"
                  trigger="click"
                  :disabled="item.goods_member.is_insurance==1?false:true"
                >
                  <ul class="popover">
                    <li>
                      <p style="width:60px;">估值：</p>
                      <el-input v-model="declared_value" size="mini" placeholder="请输入内容"></el-input>
                    </li>
                  </ul>
                  <div class="popover_foot">
                    <span></span>
                    <el-button type="primary" size="mini" class="button_primary" @click="insurance_js(item)">计算</el-button>
                  </div>
                  <template #reference>
                    <el-input placeholder="请输入内容" size="mini" 
                      v-model="item.order_price.insurance_fee" 
                      @input="price_change(item)"
                      @focus="declared_value=item.goods_member.declared_value?item.goods_member.declared_value:0"
                      :disabled="item.goods_member.is_insurance==1?false:true"
                    >
                      <span slot="prefix">保险：</span>
                    </el-input>
                  </template>
                </el-popover>
              </el-col>
              <el-col :span="12">
                <el-popover
                  placement="bottom-start"
                  :width="200"
                  trigger="click"
                  :disabled="item.goods_member.is_customs==1?false:true"
                >
                  <ul class="popover">
                    <li>
                      <p style="width:60px;">P：</p>
                      <el-input v-model="cstoms.P" size="mini" placeholder="请输入内容"></el-input>
                    </li>
                    <li>
                      <p style="width:60px;">EQ：</p>
                      <el-input v-model="cstoms.EQ" size="mini" placeholder="请输入内容"></el-input>
                    </li>
                    <li>
                      <p style="width:60px;">DG：</p>
                      <el-input v-model="cstoms.DG" size="mini" placeholder="请输入内容"></el-input>
                    </li>
                  </ul>
                  <div class="popover_foot">
                    <span></span>
                    <el-button type="primary" size="mini" class="button_primary" @click="cstoms_js(item)">计算</el-button>
                  </div>
                  <template #reference>
                    <el-input placeholder="请输入内容" size="mini" 
                      v-model="item.order_price.cstoms_fee" 
                      @input="price_change(item)"
                      @focus="cstoms_focus(item)"
                      :disabled="item.goods_member.is_customs==1?false:true"
                    >
                      <span slot="prefix">报关：</span>
                    </el-input>
                  </template>
                </el-popover>
              </el-col>
              <el-col :span="12">
                <el-popover
                  placement="bottom-start"
                  :width="250"
                  trigger="click"
                >
                  <ul class="popover">
                    <li>
                      <p>毛重：</p>
                      <el-input v-model="freight_fee.weight" size="mini" placeholder="请输入内容" ></el-input>
                    </li>
                    <li>
                      <p>P：</p>
                      <el-input v-model="freight_fee.P" size="mini" placeholder="请输入内容"></el-input>
                    </li>
                    <li>
                      <p>EQ：</p>
                      <el-input v-model="freight_fee.EQ" size="mini" placeholder="请输入内容"></el-input>
                    </li>
                    <li>
                      <p>DG：</p>
                      <el-input v-model="freight_fee.DG" size="mini" placeholder="请输入内容"></el-input>
                    </li>
                    <li style="text-align:left;">
                      <p>到付:</p>
                      <el-switch style="width:100%;" v-model="freight_fee.is_pay" :active-value='1' :inactive-value='0'></el-switch>
                    </li>
                  </ul>
                  <div class="popover_foot">
                    <span></span>
                    <el-button type="primary" size="mini" class="button_primary" @click="fee_js(item,'operating_fee')">计算</el-button>
                  </div>
                  <template #reference>
                    <el-input placeholder="请输入内容" size="mini" 
                      v-model="item.order_price.operating_fee"
                     @input="price_change(item)"
                     @focus="yun_fee(item,'operating_fee')"
                    >
                      <span slot="prefix">操作：</span>
                    </el-input> 
                  </template>
                </el-popover>
                <!-- <el-input placeholder="请输入内容" size="mini" v-model="item.order_price.operating_fee" @input="price_change(item)">
                  <span slot="prefix">操作：</span>
                </el-input> -->
              </el-col>
              <el-col :span="12">
                <el-popover
                  placement="bottom-start"
                  :width="200"
                  trigger="click"
                >
                  <ul class="popover">
                    <li>
                      <p style="width:60px;">P：</p>
                      <el-input v-model="crossing.P" size="mini" placeholder="请输入内容"></el-input>
                    </li>
                    <li>
                      <p style="width:60px;">EQ：</p>
                      <el-input v-model="crossing.EQ" size="mini" placeholder="请输入内容"></el-input>
                    </li>
                    <li>
                      <p style="width:60px;">DG：</p>
                      <el-input v-model="crossing.DG" size="mini" placeholder="请输入内容"></el-input>
                    </li>
                    <li>
                      <p style="width:60px;">实重：</p>
                      <el-input v-model="crossing.actual_gross_weight" size="mini" placeholder="请输入内容"></el-input>
                    </li>
                  </ul>
                  <div class="popover_foot">
                    <span></span>
                    <el-button type="primary" size="mini" class="button_primary" @click="crossing_js(item)">计算</el-button>
                  </div>
                  <template #reference>
                    <el-input placeholder="请输入内容" size="mini" 
                      v-model="item.order_price.crossing_fee" 
                      @input="price_change(item,item.order_price.crossing_fee)"
                      @focus="crossing_focus(item)"
                    >
                      <span slot="prefix">过港：</span>
                    </el-input>
                  </template>
                </el-popover>
              </el-col>
              <el-col :span="12">
                <el-input placeholder="请输入内容" size="mini" v-model="item.order_price.sundry_fee" @input="price_change(item)">
                  <span slot="prefix">杂费：</span>
                </el-input>
              </el-col>
              <el-col :span="12">
                <el-popover
                  placement="bottom-start"
                  :width="250"
                  trigger="click"
                  :disabled="item.goods_member.is_pay==1?true:false"
                >
                  <ul class="popover">
                    <li>
                      <p>国外快递：</p>
                      <el-select v-model="freight_fee.express_name" size="mini" style="width:100%;">
                        <el-option
                          v-for="item in $Enum.ABROADEXPREE"
                          :key="item.pid"
                          :label="item.name"
                          :value="item.name">
                        </el-option>
                      </el-select>
                    </li>
                    <li>
                      <p>收件国家：</p>
                      <el-select v-model="freight_fee.country" filterable :filter-method="filter_method_r" style="width:100%;" size="mini">
                        <el-option
                          v-for="item in countryList_r"
                          :key="item.id"
                          :label="item.en_name"
                          :value="item.en_name">
                          <span style="float: left">{{ item.en_name }}</span>
                          <span style="float: right; color: #8492a6;">{{ item.zh_name }}</span>
                        </el-option>
                      </el-select>
                    </li>
                    <li>
                      <p>毛重：</p>
                      <el-input v-model="freight_fee.weight" size="mini" placeholder="请输入内容" ></el-input>
                    </li>
                  </ul>
                  <div class="popover_foot">
                    <span></span>
                    <el-button type="primary" size="mini" class="button_primary" @click="fee_js(item,'yiqing_fee')">计算</el-button>
                  </div>
                  <template #reference>
                    <el-input placeholder="请输入内容" size="mini" 
                      v-model="item.order_price.yiqing_fee"
                     @input="price_change(item)"
                     @focus="yun_fee(item,'yiqing_fee')"
                     :disabled="item.goods_member.is_pay==1?true:false"
                    >
                      <span slot="prefix">疫情：</span>
                    </el-input> 
                  </template>
                </el-popover>
              </el-col>
              <el-col :span="12" class="font2">
                <span>总计：{{item.order_price.total_fee!==''?item.order_price.total_fee:0}}</span>
                <el-button type="primary" size="mini" class="button_primary" v-if="parseInt(item.status)<6" :loading="item.loading_price" @click="addprice(item)">保存</el-button>
              </el-col>
              <el-col :span="24" style="text-align:right;">
                <el-popover
                  placement="left"
                  width="200"
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
                  <el-button slot="reference" plain size="mini" class="button_plain" style="width:100%;">前台总计：{{item.goods_member.total_fee}}</el-button>
                </el-popover>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="3">
            <div class="body_c">
              <div>货物成本：{{item.order_price.total_cost?item.order_price.total_cost:'****'}}</div>
              <div>货物收费：{{item.status>=6?item.goods_member.total_fee:'****'}}</div>
              <span>货物利润：
                {{item.status>=6&&item.order_price.total_cost?(Number(item.goods_member.total_fee)-Number(item.order_price.total_cost)).toFixed(2):'****'}}
              </span>
            </div>
          </el-col>
          <el-col :span="7">
            <el-row :gutter="15" class="body_d" type="flex" align="middle">
              <el-col :span="12">
                <el-button v-if="item.status<6" plain size="small" class="button_plain">未支付</el-button>
                <el-button v-else type="primary" size="small" class="button_primary">已支付</el-button>
              </el-col>
              <el-col :span="12">
                <el-button v-if="!item.invoice_status||item.invoice_status==0" plain size="small" class="button_plain">未开票</el-button>
                <el-button v-else type="primary" size="small" class="button_primary" @click="look_img(item.goods_member.invoice_file)">已开发票</el-button>
              </el-col>
              <el-col :span="12">
                <el-button v-if="item.order_price.total_fee" type="primary" size="small" class="button_primary" :loading="item.loading_push" @click="pushprice(item)">
                  {{item.status==5?'重新推送':'推送价位'}}
                </el-button>
                <el-button v-else plain size="small" class="button_plain" disabled>价位未编辑</el-button>
              </el-col>
              <el-col :span="12">
                <el-popover
                  placement="bottom"
                  width="300"
                  trigger="click">
                  <ul class="popover">
                    <li>
                      <span>实重：</span>
                      <el-input v-model="item.goods_member.actual_gross_weight" size="mini" placeholder="请输入内容"></el-input>
                    </li>
                    <li>
                      <span>运费：</span>
                      <el-input v-model="item.order_price.freight_cost" size="mini" placeholder="请输入内容" @input="cost_change(item)"></el-input>
                    </li>
                    <li>
                      <span>报关：</span>
                      <el-input v-model="item.order_price.cstoms_cost" size="mini" placeholder="请输入内容" @input="cost_change(item)"></el-input>
                    </li>
                    <li>
                      <span>过港：</span>
                      <el-input v-model="item.order_price.crossing_cost" size="mini" placeholder="请输入内容" @input="cost_change(item)"></el-input>
                    </li>
                    <li>
                      <span>保险：</span>
                      <el-input v-model="item.order_price.insurance_cost" size="mini" placeholder="请输入内容" @input="cost_change(item)"></el-input>
                    </li>
                    <li>
                      <span>操作：</span>
                      <el-input v-model="item.order_price.operating_cost" size="mini" placeholder="请输入内容" @input="cost_change(item)"></el-input>
                    </li>
                  </ul>
                  <div class="popover_foot">
                    <span>总计：{{item.order_price.total_cost!==''?item.order_price.total_cost:0}}</span>
                    <el-button type="primary" size="mini" class="button_primary" v-if="parseInt(item.status)<7" :loading="item.loading_cost" @click="addcost(item)">保存</el-button>
                  </div>
                  <el-button v-if="!item.order_price.total_cost" slot="reference" plain size="small" class="button_plain">成本未登记</el-button>
                  <el-button v-else slot="reference" size="small" type="primary" class="button_primary">成本:{{item.order_price.total_cost}}</el-button>
                </el-popover>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </li>
      <!-- <li>
        <el-row class="heard" type="flex" align="middle">
          <el-col :span="5">
            <el-checkbox></el-checkbox>
            订单号：AIKANG1518181818261
          </el-col>
          <el-col :span="5">
            发货单号（国外）：USP151616481665
          </el-col>
          <el-col :span="2" class="font1">共下单：18次</el-col>
          <el-col :span="3" class="font1">总共支付金额：16465元</el-col>
          <el-col :span="3" class="font1">总创造利润：8004元</el-col>
          <el-col :span="1" class="font1" style="text-align:center;">未核算</el-col>
          <el-col :span="5" style="text-align:right;">
            下单日期：2020年02月02日
            <el-button plain size="mini">运单详情</el-button>
          </el-col>
        </el-row>
        <el-row class="body" type="flex" align="middle">
          <el-col :span="8">
            <el-row class="body_a">
              <el-col :span="12">
                <div>
                  <span>客户经理</span><br>
                  <span>刘建国</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div>
                  <span>货品信息</span><br>
                  <span>国家：中国---USA</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div>
                  <span>客户名称</span><br>
                  <span>南京三二一科技</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div>
                  <span>毛重：5kg</span><br>
                  <span>P：5件   EQ：5件  DG：5件</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div>
                  <span>联系方式</span><br>
                  <span>15518004101</span>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row :gutter="15" class="body_b">
              <el-col :span="12">
                <div>运费：1160</div>
              </el-col>
              <el-col :span="12">
                <div>保险：80</div>
              </el-col>
              <el-col :span="12">
               <div>报关：500</div>
              </el-col>
              <el-col :span="12">
                <div>操作：300</div>
              </el-col>
              <el-col :span="12">
                <div>过港：400</div>
              </el-col>
              <el-col :span="12" class="font2">
                <span>总计：2440</span>
                <el-button type="primary" size="mini" class="button_primary">保存</el-button>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="3">
            <div class="body_c">
              <div>货物成本：****</div>
              <div>货物收费：2440</div>
              <span>货物利润：***</span>
            </div>
          </el-col>
          <el-col :span="7">
            <el-row :gutter="15" class="body_d" type="flex" align="middle">
              <el-col :span="12">
                <el-button type="primary" size="small" class="button_primary">已支付</el-button>
              </el-col>
              <el-col :span="12">
                <el-button type="primary" size="small" class="button_primary">查看发票</el-button>
              </el-col>
              <el-col :span="12">
                <el-button type="primary" size="small" class="button_primary" style="background:#C2CFE0 !important;border-color:#C2CFE0 !important;">重新推送</el-button>
              </el-col>
              <el-col :span="12">
                <el-popover
                  placement="bottom"
                  width="300"
                  trigger="click">
                  <ul class="popover">
                    <li>
                      <span>运费：</span>
                      <el-input v-model="input" size="mini" placeholder="请输入内容"></el-input>
                    </li>
                    <li>
                      <span>报关：</span>
                      <el-input v-model="input" size="mini" placeholder="请输入内容"></el-input>
                    </li>
                    <li>
                      <span>过港：</span>
                      <el-input v-model="input" size="mini" placeholder="请输入内容"></el-input>
                    </li>
                    <li>
                      <span>保险：</span>
                      <el-input v-model="input" size="mini" placeholder="请输入内容"></el-input>
                    </li>
                    <li>
                      <span>操作：</span>
                      <el-input v-model="input" size="mini" placeholder="请输入内容"></el-input>
                    </li>
                  </ul>
                  <div class="popover_foot">
                    <span>总计：</span>
                    <el-button type="primary" size="mini" class="button_primary">保存</el-button>
                  </div>
                  <el-button slot="reference" type="primary" size="small" class="button_primary">成本：450</el-button>
                </el-popover>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </li>
      <li>
        <el-row class="heard" type="flex" align="middle">
          <el-col :span="5">
            <el-checkbox></el-checkbox>
            订单号：AIKANG1518181818261
          </el-col>
          <el-col :span="5">
            发货单号（国外）：USP151616481665
          </el-col>
          <el-col :span="2" class="font1">共下单：18次</el-col>
          <el-col :span="3" class="font1">总共支付金额：16465元</el-col>
          <el-col :span="3" class="font1">总创造利润：8004元</el-col>
          <el-col :span="1" class="font1" style="text-align:center;">未核算</el-col>
          <el-col :span="5" style="text-align:right;">
            下单日期：2020年02月02日
            <el-button plain size="mini">运单详情</el-button>
          </el-col>
        </el-row>
        <el-row class="body" type="flex" align="middle">
          <el-col :span="8">
            <el-row class="body_a">
              <el-col :span="12">
                <div>
                  <span>客户经理</span><br>
                  <span>刘建国</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div>
                  <span>货品信息</span><br>
                  <span>国家：中国---USA</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div>
                  <span>客户名称</span><br>
                  <span>南京三二一科技</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div>
                  <span>毛重：5kg</span><br>
                  <span>P：5件   EQ：5件  DG：5件</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div>
                  <span>联系方式</span><br>
                  <span>15518004101</span>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row :gutter="15" class="body_b">
              <el-col :span="12">
                <div>运费：1160</div>
              </el-col>
              <el-col :span="12">
                <div>保险：80</div>
              </el-col>
              <el-col :span="12">
               <div>报关：500</div>
              </el-col>
              <el-col :span="12">
                <div>操作：300</div>
              </el-col>
              <el-col :span="12">
                <div>过港：400</div>
              </el-col>
              <el-col :span="12" class="font2">
                <span>总计：2440</span>
                <el-button type="primary" size="mini" class="button_primary">保存</el-button>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="3">
            <div class="body_c">
              <div>货物成本：****</div>
              <div>货物收费：2440</div>
              <span>货物利润：***</span>
            </div>
          </el-col>
          <el-col :span="7">
            <el-row :gutter="15" class="body_d" type="flex" align="middle">
              <el-col :span="12">
                <el-button plain size="small" class="button_plain">未支付</el-button>
              </el-col>
              <el-col :span="12">
                <el-button plain size="small" class="button_plain">未开票</el-button>
              </el-col>
              <el-col :span="12">
                <el-button plain size="small" class="button_plain">价位未编辑</el-button>
              </el-col>
              <el-col :span="12">
                <el-popover
                  placement="bottom"
                  width="300"
                  trigger="click">
                  <ul class="popover">
                    <li>
                      <span>运费：</span>
                      <el-input v-model="input" size="mini" placeholder="请输入内容"></el-input>
                    </li>
                    <li>
                      <span>报关：</span>
                      <el-input v-model="input" size="mini" placeholder="请输入内容"></el-input>
                    </li>
                    <li>
                      <span>过港：</span>
                      <el-input v-model="input" size="mini" placeholder="请输入内容"></el-input>
                    </li>
                    <li>
                      <span>保险：</span>
                      <el-input v-model="input" size="mini" placeholder="请输入内容"></el-input>
                    </li>
                    <li>
                      <span>操作：</span>
                      <el-input v-model="input" size="mini" placeholder="请输入内容"></el-input>
                    </li>
                  </ul>
                  <div class="popover_foot">
                    <span>总计：</span>
                    <el-button type="primary" size="mini" class="button_primary">保存</el-button>
                  </div>
                  <el-button slot="reference" plain size="small" class="button_plain">成本未登记</el-button>
                </el-popover>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </li> -->
    </ul>
    <div class="null_dom" v-if="!list.data||list.data.length==0">
      <i class="el-icon-search"></i>
      查无数据
    </div>

    <el-dialog class="dialog" width="500px" :visible.sync="dialog_img">
      <div>
        <el-image 
          style="width: 500px; height: auto;"
          :src="baseURL_img"
          :z-index='3333'
          :preview-src-list="[baseURL_img]">
        </el-image>
      </div>
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
export default {
  name: "ad_check",
  data() {
    return {
      list:{},
      queryList:{
        status:[],
        invoice_status:[],
        start_time:'',
        end_time:'',
        customer_id:'',
        page:1
      },
      currentPage:1,
      ids:[],
      baseURL_img:'',
      declared_value:'',
      cstoms:{
        p:'',
        EQ:'',
        DG:''
      },
      crossing:{
        p:'',
        EQ:'',
        DG:'',
        actual_gross_weight:''
      },
      freight_fee:{},
      checkAll:false,
      dialog_img:false,
      search_loading:false,
      loading_upload:false,
      loading_pushprice:false,
      loading_paymentdeal:false,
      loading_checkmoney:false,
      input:'',
      checked:'',
      customerAll:[],
      countryList:[],
      countryList_r:[],
      option_status:[
        {id:4,name:'已发货(国外)'},
        {id:5,name:'待支付'},
        {id:6,name:'已支付'},
        {id:7,name:'已核算'},
      ],
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
      // this.queryList.status = JSON.stringify(this.queryList.status)
      var queryList = JSON.parse(JSON.stringify(this.queryList))
      queryList.status = JSON.stringify(queryList.status)
      queryList.invoice_status = JSON.stringify(queryList.invoice_status)
      this.$get('api/orders/pricelist/',queryList).then(res=>{
        if(res.code===0){
          if(this.search_loading){
            this.$message.success('搜索成功')
            this.search_loading = false
          }
          res.data.forEach(item=>{
            item['check']=false
            item['loading_price']=false
            item['loading_cost']=false
            item['loading_push']=false
            if(!item.order_price){
              item.order_price = {
                freight_fee:'',
                insurance_fee:'',
                cstoms_fee:'',
                operating_fee:'',
                crossing_fee:'',
                total_fee:'',
                freight_cost:'',
                insurance_cost:'',
                cstoms_cost:'',
                operating_cost:'',
                crossing_cost:'',
                total_cost:''
              }
            }
          })
          this.list = res
          this.checkAll = false
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
        if(this.checkAll){
          this.ids.push(i)
        }else{
          this.ids = []
        }
      })
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
    yun_fee(item,a){
      this.freight_fee = {
        fee_type:a,
        express_name:item.goods_member.abroad_express?item.goods_member.abroad_express:this.$Enum.ABROADEXPREE[0].name,
        country:item.r_country,
        weight:item.goods_member.actual_gross_weight,
        P:item.goods_member.non_danger_number,
        EQ:item.goods_member.limited_number,
        DG:item.goods_member.danger_number,
        customer_id:item.user.id,
        is_pay:item.goods_member.is_pay
      }
      this.$get('api/orders/countries/').then(res=>{
        this.countryList = res.data
        this.countryList_r = res.data
      })
    },
    crossing_focus(item){
      this.crossing={
        P:item.goods_member.non_danger_number,
        EQ:item.goods_member.limited_number,
        DG:item.goods_member.danger_number,
        actual_gross_weight:item.goods_member.actual_gross_weight
      }
    },
    cstoms_focus(item){
      this.cstoms={
        P:item.goods_member.non_danger_number,
        EQ:item.goods_member.limited_number,
        DG:item.goods_member.danger_number
      }
    },
    crossing_js(item){
      if(this.crossing.EQ!=0||this.crossing.DG!=0){
        item.order_price.crossing_fee = Number(this.crossing.actual_gross_weight)-10<=0?200:Math.round(Number(this.crossing.actual_gross_weight)-10)*10+200
      }else{
        if(this.crossing.P!=0){
          item.order_price.crossing_fee = Number(this.crossing.actual_gross_weight)-10<=0?150:Math.round(Number(this.crossing.actual_gross_weight)-10)*10+150
        }else{
          item.order_price.crossing_fee = 0
        }
      }
      this.price_change(item)
    },
    cstoms_js(item){
      var a = parseInt(this.cstoms.P)+parseInt(this.cstoms.EQ)+parseInt(this.cstoms.DG)
      if(a<=6){
        item.order_price.cstoms_fee = 200
      }else if(a<=14){
        item.order_price.cstoms_fee = 300
      }else if(a<=50){
        item.order_price.cstoms_fee = 400+(parseInt(a/7)-2)*100
      }else{
        item.order_price.cstoms_fee = 400+(parseInt(50/7)-2)*100
      }
      this.price_change(item)
    },
    fee_js(item,a){
      this.$post('api/orders/computefee/',this.freight_fee).then(res=>{
        if(res.code===0){
          item.order_price[a] = res.fee?res.fee:0
          this.$forceUpdate()
          this.$message.success(res.msg)
          this.price_change(item)
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    insurance_js(item){
      if(Number(this.declared_value)*0.003<150){
        item.order_price.insurance_fee = 150
      }else{
        item.order_price.insurance_fee = (Number(this.declared_value)*0.003).toFixed(2)
      }
      setTimeout(()=>{
        this.price_change(item)
      })
    },
    look_img(file){
      // this.baseURL_img = process.env.API_BASEURL+file.file_path.replace('/var/www/shipchem/upload/','api/shows/')
      // this.dialog_img = true
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
    price_change(item){
      item.order_price.freight_fee = this.$All.tofixed(item.order_price.freight_fee)
      item.order_price.insurance_fee = this.$All.tofixed(item.order_price.insurance_fee)
      item.order_price.cstoms_fee = this.$All.tofixed(item.order_price.cstoms_fee)
      item.order_price.operating_fee = this.$All.tofixed(item.order_price.operating_fee)
      item.order_price.crossing_fee = this.$All.tofixed(item.order_price.crossing_fee)
      item.order_price.yiqing_fee = this.$All.tofixed(item.order_price.yiqing_fee)
      item.order_price.sundry_fee = this.$All.tofixed(item.order_price.sundry_fee)
      item.order_price.total_fee = 
      (Number(item.order_price.freight_fee)+Number(item.order_price.insurance_fee)+
      Number(item.order_price.cstoms_fee)+Number(item.order_price.operating_fee)+
      Number(item.order_price.crossing_fee)+Number(item.order_price.sundry_fee)+Number(item.order_price.yiqing_fee)).toFixed(2)
    },
    cost_change(item){
      item.order_price.freight_cost = this.$All.tofixed(item.order_price.freight_cost)
      item.order_price.insurance_cost = this.$All.tofixed(item.order_price.insurance_cost)
      item.order_price.cstoms_cost = this.$All.tofixed(item.order_price.cstoms_cost)
      item.order_price.operating_cost = this.$All.tofixed(item.order_price.operating_cost)
      item.order_price.crossing_cost = this.$All.tofixed(item.order_price.crossing_cost)
      item.order_price.total_cost = 
      (Number(item.order_price.freight_cost)+Number(item.order_price.insurance_cost)+
      Number(item.order_price.cstoms_cost)+Number(item.order_price.operating_cost)+
      Number(item.order_price.crossing_cost)).toFixed(2)
    },
    addprice(item){
      item.loading_price = true
      var obj = {
        freight_fee:item.order_price.freight_fee?item.order_price.freight_fee:0,
        insurance_fee:item.order_price.insurance_fee?item.order_price.insurance_fee:0,
        cstoms_fee:item.order_price.cstoms_fee?item.order_price.cstoms_fee:0,
        operating_fee:item.order_price.operating_fee?item.order_price.operating_fee:0,
        crossing_fee:item.order_price.crossing_fee?item.order_price.crossing_fee:0,
        yiqing_fee:item.order_price.yiqing_fee?item.order_price.yiqing_fee:0,
        sundry_fee:item.order_price.sundry_fee?item.order_price.sundry_fee:0,
        total_fee:item.order_price.total_fee
      }
      this.$post('api/orders/addprice/'+item.id,obj).then(res=>{
        if(res.code===0){
          this.$message.success(res.msg)
          item.loading_price = false
          this.fetach()
        }else{
          this.$message.error(res.msg)
          item.loading_price = false
        }
      }).catch(err=>{item.loading_price = false})
    },
    checkmoney(){
      if(this.ids.length>0){
        if(this.ids.filter(i=>{return i.status!=6}).length>0){
          this.$message.error('请选择已完成支付订单')
        }else{
          var arr = []
          this.ids.forEach(i=>{
            arr.push(i.id)
          })
          var obj = {
            id_list:JSON.stringify(arr)
          }
          this.loading_checkmoney = true
          this.$post('api/orders/checkmoney/',obj).then(res=>{
            if(res.code===0){
              this.$message.success('成功')
              this.fetach()
              this.loading_checkmoney = false
            }else{
              this.$message.error(res.msg)
              this.loading_checkmoney = false
            }
          }).catch(err=>{this.loading_checkmoney = false})
        }
      }else{
        this.$message.error('请选择需要核算的订单')
      }
    },
    paymentdeal(){
      if(this.ids.length>0){
        if(this.ids.filter(i=>{return i.status!=5}).length>0){
          this.$message.error('请选择待支付状态订单')
        }else{
          var arr = []
          this.ids.forEach(i=>{
            arr.push(i.id)
          })
          var obj = {
            id_list:JSON.stringify(arr)
          }
          this.loading_paymentdeal = true
          this.$post('api/orders/paymentdeal/',obj).then(res=>{
            if(res.code===0){
              this.$message.success('成功')
              this.fetach()
              this.loading_paymentdeal = false
            }else{
              this.$message.error(res.msg)
              this.loading_paymentdeal = false
            }
          }).catch(err=>{this.loading_paymentdeal = false})
        }
      }else{
        this.$message.error('请选择完成支付的订单')
      }
    },
    pushprice(item){
        item.loading_push = true
        this.$get('api/orders/addprice/'+item.id).then(res=>{
          if(res.code===0){
            this.$message.success(res.msg)
            item.loading_push = false
            this.fetach()
          }else{
            this.$message.error(res.msg)
            item.loading_push = false
          }
        }).catch(err=>{item.loading_push = false})
    },
    pushprice_All(){
      if(this.ids.length>0){
        if(this.ids.filter(i=>{return i.status==6}).length>0){
          this.$message.error('含有已支付的订单，无法推送')
        }else{
          var arr = []
          this.ids.forEach(i=>{
            arr.push(i.id)
          })
          var obj = {
            id_list:JSON.stringify(arr)
          }
          this.loading_pushprice = true
          this.$post('api/orders/pushprice/',obj).then(res=>{
            if(res.code===0){
              this.$message.success('成功')
              this.fetach()
              this.loading_pushprice = false
            }else{
              this.$message.error(res.msg)
              this.loading_pushprice = false
            }
          }).catch(err=>{this.loading_pushprice = false})
        }
      }else{
        this.$message.error('请选择需要推送的订单')
      }
    },
    addcost(item){
      item.loading_cost = true
      var obj = {
        freight_cost:item.order_price.freight_cost,
        insurance_cost:item.order_price.insurance_cost,
        cstoms_cost:item.order_price.cstoms_cost,
        operating_cost:item.order_price.operating_cost,
        crossing_cost:item.order_price.crossing_cost,
        total_cost:item.order_price.total_cost,
        actual_gross_weight:item.goods_member.actual_gross_weight
      }
      this.$post('api/orders/addcost/'+item.id,obj).then(res=>{
        if(res.code===0){
          this.$message.success(res.msg)
          item.loading_cost = false
          this.fetach()
        }else{
          this.$message.error(res.msg)
          item.loading_cost = false
        }
      }).catch(err=>{item.loading_cost = false})
    },
    search_type(item){
      this.queryList.status=item.pid
      this.search()
    },
    search_invoice(a){
      this.queryList.invoice_status=a
      this.search()
    },
    search(){
      this.search_loading = true
      this.fetach()
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
    to_upload(){
      if(this.ids.length>0){
        // this.loading_upload = true
        // this.$post('api/orders/addcost/'+item.id,obj).then(res=>{
        //   if(res.code===0){
        //     this.$message.success(res.msg)
        //     this.loading_upload = false
        //     this.fetach()
        //   }else{
        //     this.$message.error(res.msg)
        //     this.loading_upload = false
        //   }
        // }).catch(err=>{this.loading_upload = false})
        if(this.ids.filter(i=>{return i.invoice_status==1}).length>0){
          this.$message.error('请选择未开票的订单')
        }else{
          var arr = []
          this.ids.forEach(i=>{
            arr.push(i.id)
          })
          var obj = {
            id_list:JSON.stringify(arr)
          }
          this.loading_upload = true
          this.$post('api/orders/makeinvoice/',obj).then(res=>{
            if(res.code===0){
              this.$message.success('成功')
              this.fetach()
              this.loading_upload = false
            }else{
              this.$message.error(res.msg)
              this.loading_upload = false
            }
          }).catch(err=>{this.loading_upload = false})
        }
      }else{
        this.$message.error('请选择需要开票的订单')
      }
      // this.$router.push({
      //   path: '/ad_upload',
      //   name:'ad_upload'
      // });
    }
  }
};
</script>