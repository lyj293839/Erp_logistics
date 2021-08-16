<style scoped>
.content{padding: 25px 70px;font-size: 13px;color: #333;}
.top{display: flex;justify-content: space-between;align-items: center;padding-left: 10px;}
.card{width: 320px;background: white;padding: 0px 25px;margin:10px 10px 0px 0px;}
.card .font1{color:#383838;font-size: 14px;line-height: 30px;}
.card .font2{color: #333333;line-height: 20px;}
.card .font3{line-height: 30px;color: #0071E3;}
.card ul{display: flex;justify-content: space-between;}
.card_body{display: flex;flex-wrap: wrap;}
.play{display: flex;justify-content: space-between;align-items: center;margin-top: 20px;}
.play .el-radio-group{display: flex;}
.play .el-radio{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.play .el-radio /deep/ .el-radio__label{padding: 0px;margin-top: 5px;}
.play .total_money{color: #383838;font-size: 21px;line-height: 40px;text-align: right;}
.play .total_money span{font-size: 40px;}
.play_button{text-align: right;}
.play_button .el-button{width: 200px;margin-top: 30px;}
</style>
<template>
  <div class="content">
    <div class="top">
        <span>我的位置：我的订单- <font color='#0071E3'>批量支付</font></span>
        <el-button type="primary" class="button_primary" size="mini" @click="toOrder()">上一步</el-button>
    </div>
    <div class="card_body">
        <div class="card" v-for="item in list.data">
            <div class="font1">订单编号：{{item.order_no}}</div>
            <div class="font2">
                <span>{{item.d_country}}-->{{item.r_country}}</span><br>
                <span>毛重：{{item.goods_member.gross_weight}}{{item.goods_member.weight_unit}}</span><br>
                <span>P:{{item.goods_member.non_danger_number}}件&nbsp;EQ:{{item.goods_member.limited_number}}件&nbsp;DG:{{item.goods_member.danger_number}}件</span>
            </div>
            <div>
                <ul class="font3">
                    <li>运费：{{item.goods_member.freight_fee}}</li>
                    <li>报关：{{item.goods_member.cstoms_fee}}</li>
                    <li>保险：{{item.goods_member.insurance_fee}}</li>
                    <li>过港：{{item.goods_member.crossing_fee}}</li>
                    <li>操作：{{item.goods_member.operating_fee}}</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="play">
        <el-radio-group v-model="radio">
            <el-radio :label="3">
                <img src="@/assets/image/路径 144@2x.png" width="44" height="44">
            </el-radio>
            <el-radio :label="6"><img src="@/assets/image/路径 144@2x.png" width="44" height="44"></el-radio>
            <el-radio :label="9"><img src="@/assets/image/路径 144@2x.png" width="44" height="44"></el-radio>
        </el-radio-group>
        <div class="total_money">
            总计金额<br>
            <span>{{total_money}}</span> 
        </div>
    </div>
     <div class="play_button">
       <a hidden="hidden" target="_blank" :href="play_url" ref="play_url"></a>
        <!-- <el-button type="primary" class="button_primary" :loading="loading_play" @click='zfb_play()'>去支付</el-button> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "select_pay",
  data() {
    return {
      radio: 3,
      list:{},
      goods_ids:[],
      play_url:'',
      total_money:0,
      loading_play:false,
    };
  },
  created () {
    this.fetach()
  },
  methods: {
    fetach(){
        var obj = {
            id_list:this.$route.query.ids
        }
        this.goods_ids = []
        this.$post('api/orders/searchlist/',obj).then(res=>{
            if(res.code===0){
                res.data.forEach(i=>{
                  this.total_money = (Number(this.total_money)+Number(i.goods_member.total_fee)).toFixed(2)
                  this.goods_ids.push(i.goods_member.id)
                })
                this.list = res
            }else{
                this.$message.error(res.msg)
            }
      })
    },
    toOrder(){
      this.$router.back(-1)
    },
    zfb_play(){
      var obj = {
        id_list:JSON.stringify(this.goods_ids),
        total_money:this.total_money   
      }
      this.loading_play = true
      this.$post('api/pays/alipayment/',obj).then(res=>{
          if(res.code===0){
            this.play_url = res.pay_url
            setTimeout(()=>{
              this.$refs.play_url.click()
            },200)
            this.loading_play = false
          }else{
            this.$message.error(res.msg)
            this.loading_play = false
          }
      }).catch(err=>{this.loading_play = false})
    },
    blank_play(){
      this.$router.push({
        path: '/bank_pay',
        name:'bank_pay'
      });
    }
  }
};
</script>
