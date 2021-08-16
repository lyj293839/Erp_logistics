<style scoped>
.title {
  color: #333333;
  font-size: 15px;
  line-height: 50px;
  background: #eeefef;
  padding-left: 17px;
  border-left: 3px solid #0071E3;
  text-align: left;
  font-weight: bold;
}
.left_body{margin-bottom: 10px;}
.content{background: white;padding: 15px;}
.content table th,td{text-align: left;vertical-align: text-top;padding: 5px 0px;font-size: 15px;}
.content table th{width: 110px;color: #333333;font-weight: normal;}
.content table td{color: #666666;}
.content .table_a th{width: 150px;}
.right_body{background: #EEEFEF;padding:5px 15px;}
.right_body table th,td{text-align: left;vertical-align: text-top;padding: 5px 0px;font-size: 15px;color: #333333;}
.right_body table th{width: 100px;}
.right_title{font-size: 16px;color:#333333;margin-top: 35px;text-align: left;font-weight: bold;}
.right ul{text-align: left;padding-left: 0px;color: #333333;font-size: 16px;line-height: 24px;margin-top: 20px;}
</style>
<template>
  <div>
    <div style="background:#F4F8FB;">
        <div class="wind" style="padding:20px 0px 60px 0px;">
            <el-row :gutter="24">
                <el-col :span="16">
                    <div class="left_body">
                    <div class="title">HS编码&nbsp;{{data.hs_code}}&nbsp;基本信息</div>
                    <div class="content">
                        <table>
                            <tr>
                                <th>HS编码</th>
                                <td>{{data.hs_code}}
                                    <!-- [类注]I[章注]I[子目注释] -->
                                </td>
                            </tr>
                            <tr>
                                <th>中文描述</th>
                                <td>{{data.description_cn}}</td>
                            </tr>
                            <tr>
                                <th>CIQ代码</th>
                                <td>{{data.ciq_code}}</td>
                            </tr>
                            <tr>
                                <th>英文描述</th>
                                <td>{{data.description_en}}</td>
                            </tr>
                            <tr>
                                <th>申报要素</th>
                                <td>{{data.declaration}}</td>
                            </tr>
                            <tr>
                                <th>申报要素举例</th>
                                <td>{{data.declaration_example}}</td>
                            </tr>
                            <tr>
                                <th>单位</th>
                                <td>{{data.unit}}</td>
                            </tr>
                            <tr>
                                <th>监管条件</th>
                                <td>
                                    <span>{{data.regulatory}}</span>
                                </td>
                            </tr>
                            <tr>
                                <th>检疫条件</th>
                                <td>
                                    <span>{{data.quarantine}}</span>
                                </td>
                            </tr>
                        </table>
                    </div>
                    </div>
                    <div class="left_body">
                    <div class="title">HS编码&nbsp;{{data.hs_code}}&nbsp;出口费率</div>
                    <div class="content">
                        <table class="table_a">
                            <tr>
                                <th>出口退税</th>
                                <td>{{data.export_rebate}}</td>
                            </tr>
                            <tr>
                                <th>出口关税</th>
                                <td>{{data.export_tariff}}</td>
                            </tr>
                            <tr>
                                <th>出口增值税</th>
                                <td>{{data.export_vat}}</td>
                            </tr>
                            <tr>
                                <th>临时税率</th>
                                <td>{{data.tax_rate}}</td>
                            </tr>
                            <tr>
                                <th>备注</th>
                                <td>{{data.export_remark}}</td>
                            </tr>
                        </table>
                    </div>
                    </div>
                    <div class="left_body">
                    <div class="title">HS编码&nbsp;{{data.hs_code}}&nbsp;出口费率</div>
                    <div class="content">
                        <table class="table_a">
                            <tr>
                                <th>最惠国进口税率</th>
                                <td>{{data.pre_import_tax}}</td>
                            </tr>
                            <tr>
                                <th>普通进口税率</th>
                                <td>{{data.com_import_tax}}</td>
                            </tr>
                            <tr>
                                <th>暂定进口税率</th>
                                <td>{{data.pro_import_tax}}</td>
                            </tr>
                            <tr>
                                <th>进口消费税</th>
                                <td>{{data.excise_import_tax}}</td>
                            </tr>
                            <tr>
                                <th>进口增值税</th>
                                <td>{{data.added_import_tax}}</td>
                            </tr>
                            <tr>
                                <th>进口其他税</th>
                                <td>{{data.other_import_tax}}</td>
                            </tr>
                            <tr>
                                <th>美国进口关税</th>
                                <td>{{data.tariff_import_tax}}</td>
                            </tr>
                            <tr>
                                <th>备注</th>
                                <td>{{data.import_remark}}</td>
                            </tr>
                        </table>
                    </div>
                    </div>
                    <div class="left_body">
                    <div class="title">HS编码&nbsp;{{data.hs_code}}&nbsp;申报实例</div>
                    <div class="content">
                        <table class="table_b">
                            <tr>
                                <th>HS Code</th>
                                <th>申报名称</th>
                                <th style="widtha:auto;">申报要素</th>
                            </tr>
                            <tr v-for="item in data.hscode_de">
                                <td>{{item.hs_code}}</td>
                                <td>{{item.name}}</td>
                                <td>{{item.declare_element}}</td>
                            </tr>
                        </table>
                    </div>
                    </div>
                </el-col>
                <el-col :span="8" class="right">
                    <div class="right_body">
                        <table>
                            <tr>
                                <th>HS编码</th>
                                <td>{{data.hs_code}}</td>
                            </tr>
                            <tr>
                                <th>中文描述</th>
                                <td>{{data.description_cn}}</td>
                            </tr>
                            <tr>
                                <th>英文描述</th>
                                <td>{{data.description_en}}</td>
                            </tr>
                            <tr>
                                <th>监管条件</th>
                                <td>
                                    <span>{{data.regulatory}}</span>
                                </td>
                            </tr>
                            <tr>
                                <th>检疫条件</th>
                                <td>
                                    <span>{{data.quarantine}}</span>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <!-- <div class="right_title">HS编号&nbsp;{{data.hs_code}}&nbsp;相关产品</div>
                    <ul>
                        <li>红藻氨酸</li>
                        <li>紫外线吸收剂UV-P</li>
                        <li>紫外线吸收剂</li>
                        <li>硬化剂</li>
                        <li>红藻氨酸</li>
                        <li>紫外线吸收剂UV-P</li>
                        <li>紫外线吸收剂</li>
                        <li>硬化剂</li>
                    </ul> -->
                </el-col>
            </el-row>
        </div>
    </div>
  </div>
</template>
<script>
import searchHS from "../search_hs";
export default {
  name: "hs_detail",
  components: {
    searchHS
  },
  data() {
    return {
      data: {}
    };
  },
  created () {
    this.fetach()
  },
  methods: {
    fetach(){
        this.$get('api/prods/hscod/'+this.$route.query.hscod).then(res=>{
            if(res&&res.code===0){
                this.data = res.data
            }else{this.$message.error(res.msg)}
        })
    }
  }
};
</script>
