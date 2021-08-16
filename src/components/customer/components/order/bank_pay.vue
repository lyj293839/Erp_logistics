<style scoped>
.content{padding: 25px 70px;font-size: 13px;color: #333;}
.top{display: flex;justify-content: space-between;align-items: center;padding-left: 10px;}
.body{width: 1000px;margin: 0px auto;font-size: 14px;color: #383838;text-align: left;}
.font1{font-size: 26px;line-height: 80px;text-align: center;}
.font2{text-align: left;}
.text{margin-top: 48px;padding-bottom: 30px;border-bottom: 1px solid #707070;display: flex;justify-content: space-between;align-items: flex-end;}
.text ul{text-align: left;line-height: 30px;}
.text_right{text-align: right;}
.font3{font-size: 28px;}
.font4{color: #FF0000;margin: 16px 0px 25px 0px;text-align: left;}
</style>
<template>
  <div class="content">
    <div class="top">
        <span>我的位置：我的订单-批量支付- <font color='#0071E3'>银联支付</font></span>
        <el-button type="primary" class="button_primary" size="mini" @click="toOrder()">上一步</el-button>
    </div>
    <div class="body">
      <div class="font1">请向指定银行账号转账</div>
      <div class="font2">以下是信息请您仔细审核，以免发生错误</div>
      <div class="text">
        <ul>
          <li>公司名称：深圳荣达昌货运代理有限公司</li> 
          <li>注册地址：深圳市福田区福田街道福山社区福华三路与金田路交界处东南侧卓越世纪中心、皇岗商务中心1号楼1102室</li>
          <li>税号：91440300MA5FC44448</li>
          <li>账号：496272946605</li>
          <li>开户行：中国银行南京高新技术开发区支行</li>
          <li>电话：025-66099260</li>
        </ul>
        <div class="text_right">
          <div>总计金额</div>
          <div class="font3">12600.00</div>
        </div>
      </div>
      <div class="font4"> 
        请务必提供<br>
        转账截图或直接联系财务人员核实
      </div>
      <div class="font5">业务电话：13605188562</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "bank_pay",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    toOrder(){
      this.$router.push({
        path: '/select_pay',
        name:'select_pay'
      });
    },
  }
};
</script>
