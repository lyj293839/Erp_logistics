<style scoped>
.content{
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333333;
    font-size: 17px;
    text-align: center;
}
.el-button{width: 214px;margin: 30px 20px;}
.is_true{border: 1px solid red;color: red;font-size: 17px;margin-top: 30px;}
</style>
<template>
  <div class="content">
      <div>
          <img src="@/assets/image/图像 18@2x.png" width="204" height="169">
          <div>订单提交成功</div>
          <div class="is_true">
            请尽快将您的货物寄往 <br>
            收转库：深圳市罗湖区清水河一路8号2栋103-3 荣达昌物流<br>
            王龙   18688744470
          </div>
          <div>
            <el-button class="button_border" @click="toOrder()">查看订单</el-button>
            <el-button class="button_primary" type="primary" @click="again()">继续下单</el-button>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    toOrder(){
      this.$parent.toOrder()
    },
    again(){
      this.$parent.again()
    }
  }
};
</script>
