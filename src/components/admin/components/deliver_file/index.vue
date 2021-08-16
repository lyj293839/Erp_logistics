<style scoped>
.content{padding: 30px 80px;position: relative;}
.content .el-steps{position: absolute;top: 10px;width: 50%;left: 50%;transform: translateX(-50%);}
.content .el-steps /deep/ .el-step__title{font-size: 12px;line-height: 20px;}
.content .el-steps /deep/ .el-step__line{top: 16px !important;}
.content .el-steps /deep/ .el-step__icon{background: #A7A7A7;border-color: white;border-width: 5px;}
.content .el-steps /deep/ .is-finish .el-step__icon{background: #0071E3;border-color: #ACD5F3;border-width: 5px;}
</style>
<template>
  <div class="content">
    <el-steps v-if="active!=4" :active="active" align-center process-status="wait">
      <el-step title="寄/收件信息"><i slot="icon"></i></el-step>
      <el-step title="货品信息"><i slot="icon"></i></el-step>
      <el-step title="完成订单"><i slot="icon"></i></el-step>
    </el-steps>
    <mailing v-show="active==1" @func="getMsgMailling" :formLabelAlign='formLabelAlign'></mailing>
    <goods v-show="active==2" @func='getMsgGoods' :formLabelAlign='formLabelAlign'></goods>
    <order v-show="active==3" :formLabelAlign='formLabelAlign'></order>
    <success v-show='active==4'></success>
  </div>
</template>
<script>
import mailing from "./mailing_information";
import goods from "./goods_information";
import order from "./grenter_order";
import success from "./success_order";
export default {
  name: "deliver_file",
  components: {
    mailing,
    goods,
    order,
    success
  },
  data() {
    return {
      // personal_message: {},
      // goods_message:{},
      formLabelAlign:{
        customer_id:'',
        d_name:'',
        d_phone:'',
        d_email:'',
        d_company:'',
        d_country:'China',
        d_provice:'',
        d_city:'',
        d_zipcode:'',
        d_address:'',
        //收
        r_name:'',
        r_phone:'',
        r_email:'',
        r_company:'',
        r_country:'',
        r_provice:'',
        r_city:'',
        r_zipcode:'',
        r_address:'',
        r_custom_broker:'',
        r_account_number:'',
        //
        g_length:'',
        g_width:'',
        g_height:'',
        gross_weight:'',
        weight_unit:'kg',
        non_danger_number:'',
        limited_number:'',
        danger_number:'',
        declared_value:'',
        remark:'',
        tracking_number:'',
        shipping_express:"",
        shipping_account:'',
        express_like:'',
        is_customs:0,
        is_insurance:0,
        is_pay:0,
        is_ddp:0,
        file_type:0,
        prodlist:[{category:'P',prodname:'',number:'',price:''}],
        currency:'USD',
        fileList:[]
      },
      active:1
    };
  },
  methods: {
    active_up(){
      this.active--
    },
    getMsgMailling(data){
      this.active++
      // this.personal_message = data
    },
    getMsgGoods(data){
      // this.goods_message = data
      // this.formLabelAlign = Object.assign(this.personal_message,this.goods_message);
      this.active++
    },
    getorder(){
      this.active++
      this.formLabelAlign = {
        customer_id:'',
        d_name:'',
        d_phone:'',
        d_email:'',
        d_company:'',
        d_country:'China',
        d_provice:'',
        d_city:'',
        d_zipcode:'',
        d_address:'',
        //收
        r_name:'',
        r_phone:'',
        r_email:'',
        r_company:'',
        r_country:'',
        r_provice:'',
        r_city:'',
        r_zipcode:'',
        r_address:'',
        r_custom_broker:'',
        r_account_number:'',
        //
        g_length:'',
        g_width:'',
        g_height:'',
        gross_weight:'',
        weight_unit:'kg',
        non_danger_number:'',
        limited_number:'',
        danger_number:'',
        declared_value:'',
        remark:'',
        tracking_number:'',
        shipping_express:"",
        shipping_account:'',
        express_like:'',
        is_customs:0,
        is_insurance:0,
        is_pay:0,
        is_ddp:0,
        file_type:1,
        prodlist:[{category:'P',prodname:'',number:'',price:''}],
        currency:'USD',
        fileList:[]
      }
    },
    again(){
      this.active=1
      this.formLabelAlign = {
        customer_id:'',
        d_name:'',
        d_phone:'',
        d_email:'',
        d_company:'',
        d_country:'China',
        d_provice:'',
        d_city:'',
        d_zipcode:'',
        d_address:'',
        //收
        r_name:'',
        r_phone:'',
        r_email:'',
        r_company:'',
        r_country:'',
        r_provice:'',
        r_city:'',
        r_zipcode:'',
        r_address:'',
        r_custom_broker:'',
        r_account_number:'',
        //
        g_length:'',
        g_width:'',
        g_height:'',
        gross_weight:'',
        weight_unit:'kg',
        non_danger_number:'',
        limited_number:'',
        danger_number:'',
        declared_value:'',
        remark:'',
        tracking_number:'',
        shipping_express:"",
        shipping_account:'',
        express_like:'',
        is_customs:0,
        is_insurance:0,
        is_pay:0,
        is_ddp:0,
        file_type:1,
        prodlist:[{category:'P',prodname:'',number:'',price:''}],
        currency:'USD',
        fileList:[]
      }
    },
    toOrder(){
      this.active=1
      this.$router.push({
        path: '/ad_cargo',
        name:'ad_cargo',
        params:{
          loading:true
        }
      });
    }
  }
};
</script>
