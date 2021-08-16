<style scoped>
.title {
  color: #333333;
  font-size: 14px;
  line-height: 50px;
  background: #eeefef;
  padding-left: 17px;
  border-left: 3px solid #0071E3;
  text-align: left;
  font-weight: bold;
}
.left_body{margin-bottom: 10px;}
.left_body .content{background: white;padding: 15px;}
.left_body table th,td{text-align: left;vertical-align: text-top;padding: 5px 0px;font-size: 15px;}
.left_body .content table th{width: 110px;color: #333333;font-weight: normal;}
.left_body .content table td{color: #666666;}
.left_body .content .table_a th{width: 150px;}
.right_body{background: #EEEFEF;padding:5px 10px;}
.right_body img{border-bottom: 1px solid #707070;}
.right_body .el-button{box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.11);margin: 5px 0px;}
.right_title{font-size: 16px;color:#333333;margin-top: 35px;text-align: left;font-weight: bold;}
.right ul{text-align: left;padding-left: 0px;color: #333333;font-size: 16px;line-height: 25px;margin-top: 20px;}
.right ul li{display: flex;justify-content: space-between;align-items: center;}
.right ul li .el-button{font-size: 16px;margin-left: 25px;padding: 0px;color: #0071E3;}
</style>
<template>
  <div>
    <!-- <searchHS></searchHS> -->
    <div style="background:#F4F8FB;">
        <div class="wind" style="padding:20px 0px 60px 0px;">
            <el-row :gutter="24">
                <el-col :span="16">
                    <div class="left_body">
                        <div class="title">{{data.name_cn}}&nbsp;&nbsp;基础信息</div>
                        <div class="content">
                            <table>
                                <tr>
                                    <th>中文名称</th>
                                    <td>{{data.name_cn}}</td>
                                </tr>
                                <tr>
                                    <th>中文同义词</th>
                                    <td>{{data.name_cn}}</td>
                                </tr>
                                <tr>
                                    <th>英文描述</th>
                                    <td>{{data.name}}</td>
                                </tr>
                                <tr>
                                    <th>英文同义词</th>
                                    <td>{{data.name}}</td>
                                </tr>
                                <tr>
                                    <th>CAS号</th>
                                    <td>{{data.cas}}</td>
                                </tr>
                                <tr>
                                    <th>MDL号</th>
                                    <td>{{data.mdl}}</td>
                                </tr>
                                <tr>
                                    <th>分子式</th>
                                    <td>{{data.mf}}</td>
                                </tr>
                                <tr>
                                    <th>分子量</th>
                                    <td>
                                        {{data.mw}}
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div class="left_body">
                        <div class="title">{{data.name_cn}}&nbsp;&nbsp;化学性质</div>
                        <div class="content">
                            <table class="table_a">
                                <tr>
                                    <th>熔点</th>
                                    <td>{{data.mp}}</td>
                                </tr>
                                <tr>
                                    <th>沸点</th>
                                    <td>{{data.bp}}</td>
                                </tr>
                                <tr>
                                    <th>密度</th>
                                    <td>{{data.density}}</td>
                                </tr>
                                <tr>
                                    <th>折射率</th>
                                    <td>{{data.refractive}}</td>
                                </tr>
                                <tr>
                                    <th>闪点</th>
                                    <td>{{data.flashpoint}}</td>
                                </tr>
                                <tr>
                                    <th>储存条件</th>
                                    <td>{{data.storage_condition}}</td>
                                </tr>
                                <tr>
                                    <th>溶解度</th>
                                    <td>{{data.solubility}}</td>
                                </tr>
                                <tr>
                                    <th>酸度系数(pKa)</th>
                                    <td>{{data.acidity}}</td>
                                </tr>
                                <tr>
                                    <th>形态</th>
                                    <td>{{data.shape}}</td>
                                </tr>
                                <tr>
                                    <th>颜色</th>
                                    <td>{{data.colour}}</td>
                                </tr>
                                <tr>
                                    <th>比重</th>
                                    <td>{{data.proportion}}</td>
                                </tr>
                                <tr>
                                    <th>水溶解性</th>
                                    <td>{{data.watersolubility}}</td>
                                </tr>
                                <tr>
                                    <th>BRN</th>
                                    <td>{{data.brn}}</td>
                                </tr>
                                <tr>
                                    <th>InChIKey</th>
                                    <td>{{data.inchikey}}</td>
                                </tr>
                                <tr>
                                    <th>CAS 数据库</th>
                                    <td>{{data.cas_database}}</td>
                                </tr>
                                <tr>
                                    <th>NIST化学物质信息</th>
                                    <td>{{data.nist}}</td>
                                </tr>
                                <tr>
                                    <th>EPA化学物质信息</th>
                                    <td>{{data.epa}}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div class="left_body">
                        <div class="title">{{data.name_cn}}&nbsp;&nbsp;用途与合成方法</div>
                        <div class="content">
                            <table class="table_a">
                                <tr>
                                    <th>应用</th>
                                    <td>{{data.application}}</td>
                                </tr>
                                <tr>
                                    <th>合成方法</th>
                                    <td>{{data.synthetic}}</td>
                                </tr>
                                <tr>
                                    <th>化学性质 </th>
                                    <td>{{data.chemical_property}}</td>
                                </tr>
                                <tr>
                                    <th>用途</th>
                                    <td>{{data.purpose}}</td>
                                </tr>
                                <tr>
                                    <th>类别</th>
                                    <td>{{data.category}}</td>
                                </tr>
                                <tr>
                                    <th>爆炸物危险特性</th>
                                    <td>{{data.explosive}}</td>
                                </tr>
                                <tr>
                                    <th>可燃性危险特性</th>
                                    <td>{{data.flammability}}</td>
                                </tr>
                                <tr>
                                    <th>储运特性</th>
                                    <td>{{data.storage}}</td>
                                </tr>
                                <tr>
                                    <th>灭火剂</th>
                                    <td>{{data.fire_fighting}}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div class="left_body">
                        <div class="title">{{data.name_cn}}&nbsp;&nbsp;安全信息</div>
                        <div class="content">
                            <table class="table_a">
                                <tr>
                                    <th>危险品标志</th>
                                    <td>{{data.dangerous_sign}}</td>
                                </tr>
                                <tr>
                                    <th>危险品类别码</th>
                                    <td>{{data.dangerous_category}}</td>
                                </tr>
                                <tr>
                                    <th>安全说明</th>
                                    <td>{{data.safety}}</td>
                                </tr>
                                <tr>
                                    <th>危险品运输编号</th>
                                    <td>{{data.dangerous_transport}}</td>
                                </tr>
                                <tr>
                                    <th>WGK Germany</th>
                                    <td>{{data.wgk}}</td>
                                </tr>
                                <tr>
                                    <th>F</th>
                                    <td>{{data.f_info}}</td>
                                </tr>
                                <tr>
                                    <th>Hazard Note </th>
                                    <td>{{data.hazard}}</td>
                                </tr>
                                <tr>
                                    <th>TSCA </th>
                                    <td>{{data.tsca}}</td>
                                </tr>
                                <tr>
                                    <th>HazardClass</th>
                                    <td>{{data.hazardclass}}</td>
                                </tr>
                                <tr>
                                    <th>PackingGroup </th>
                                    <td>{{data.packing_group}}</td>
                                </tr>
                                <tr>
                                    <th>海关编码</th>
                                    <td>{{data.customs_code}}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </el-col>
                <el-col :span="8" class="right">
                    <div class="right_body">
                        <img :src="data.img_path" width="100%">
                        <el-button plain size="small" @click="to_hs_detail(data.prods.hs_code)">查看关编码及详细出口信息</el-button>
                    </div>
                    <div class="right_title">MSDS下载</div>
                    <ul>
                        <li v-for="item in data.prod_msds">
                            <span>{{item.provider}}</span>
                            <span>
                                <span>{{item.language_type}}</span>
                                <el-button type="text">下载</el-button>
                            </span>
                        </li>
                    </ul>
                </el-col>
            </el-row>
        </div>
    </div>
  </div>
</template>
<script>
import searchHS from "../search_hs";
export default {
  name: "chemical_detail",
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
        this.$get('api/prods/prod/'+this.$route.query.cas).then(res=>{
            if(res&&res.code===0){
                res.data.img_path = process.env.API_BASEURL+res.data.img_path.replace('upload/','api/shows/')
                this.data = res.data
            }else{this.$message.error(res.msg)}
        })
    },
    to_hs_detail(hscod){
        this.$router.push({
            path: "/hs_detail",
            name: "hs_detail",
            query:{
                hscod
            }
        });
    }
  }
};
</script>
