<template>
  <div id="app" style="min-height:100vh;">
    <router-view style="whidth:100%;min-height:100vh;"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    this.$get('api/info/enumlist/').then(res=>{
      if(res.code==0){
        res.data.typeList=['EQ','P',"DG"],
        localStorage.setItem('enum',JSON.stringify(res.data))
        this.$Enum = JSON.parse(JSON.stringify(res.data))
      }else{
        this.$message.error(res.msg)
      }
    })
  }
}
</script>

<style>
#app {
  font-family:'Microsoft YaHei','苹方';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  /* height: auto; */
  /* position: absolute;
  width: 100%;
  left: 0px;
  right: 0px;
  bottom: 0px;
  top: 0px; */
}
.el-row{
  height: 100%;
}
.el-input__inner,.el-button,.el-input-group__append{border-radius: 0px !important;}
.el-button.is-round {border-radius: 20px !important;}
ul{list-style: none;padding: 0px;margin: 0px;}
.wind{width: 1200px;margin: 0px auto;}
.button_border{color:#0071E3 !important;border-color: #0071E3 !important;}
.button_primary{background: #0071E3 !important;border-color: #0071E3 !important;color: white !important;}
.button_plain{background: transparent !important;color:#0071E3 !important;border-color: #0071E3 !important;}
.is-plain:hover{border-color: #0071E3 !important;color:#0071E3 !important;}
.el-pagination{text-align: right;margin-top: 20px;}
.el-pagination li{background: white !important;}
.el-pagination button{background: white !important;}
.el-pagination li.active{background: #0071E3 !important;}
.null_dom{background: white;display: flex;align-items: center;justify-content: center; margin: 20px 0px;height: 400px;font-size: 25px;color: #b9b9b9;}
</style>
