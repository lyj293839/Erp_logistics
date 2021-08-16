<style scoped>
.banner{
  width: 100%;
  height: 565px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.banner img{position: absolute;top: 0px;z-index: -1;}
.banner .banner_a{
  width: 878px;
  background: rgba(0,0,0,0.5);
  padding: 28px 56px;
}
.banner_a .el-tabs /deep/ .el-input-group__append{background: #0071E3;color: white;border-color: #0071E3;}
.banner_a .el-tabs .el-input,.el-select{width: 100%;}
.banner_a .el-tabs .el-col{margin-bottom: 10px;}
.banner_a .el-tabs .el-button{background: #0071E3;}
.banner_a /deep/ .el-tabs--border-card{background: transparent;border: none;-webkit-box-shadow:none;box-shadow:none;}
.banner_a /deep/ .el-tabs__content{padding: 0px;}
.banner_a /deep/ .el-tabs__header{background: none;border: none;}
.banner_a /deep/ .el-tabs__item{background: #0071E3;color: white !important;margin-right: 5px;}
.banner_a /deep/ .is-active{color: #0071E3 !important;}
/* .banner_a /deep/ .el-tabs__item:hover{color: white !important;margin-right: 5px;} */
h1{color: #323463;font-size: 24px;line-height: 68px;}
h2{color: #323463;font-size: 15px;line-height: 32px;font-weight: normal;}
h3{color: #323463;font-size: 18px;line-height: 42px;font-weight: normal;}
h4{color: #334D6E;font-size: 15px;line-height: 26px;font-weight: normal;}
.h5{color: #334D6E;font-size: 28px;line-height: 68px;}
.h6{color: #1E2046;font-size: 15px;line-height: 40px;font-weight: normal;}
.h7{color: #1E2046;font-size: 14px;line-height: 30px;font-weight: normal;}
.h8{color: #1E2046;font-size: 14px;line-height: 30px;font-weight: normal;}
.icon{
  width: 68px;
  height: 68px;
  border-radius: 13px;
}
.icon_b{
  width: 40px;
  height: 40px;
  margin: 0px auto;
}
.icon_c{width: 28px;height: 19px;background: #647CFF;margin-right: 10px;}
.moudle{width: 1200px;margin: 0px auto;padding-bottom: 58px;}
.el-row{flex-wrap: wrap;}
.moudle .el-row .el-col{margin-top: 34px;}
.moudle_div{
  background: #FFFFFF;
  border-radius: 8px;
  padding: 36px 45px;
  border: 1px solid #C2CFE0;
  text-align: left;
  height: 230px;
}
.moudle_div:hover{box-shadow: 0px 0px 25px rgba(0, 79, 156, 0.14);}
.you{width: 100%;position: relative;}
.background_img{position: absolute;top: 0px;left: 0px;z-index: -1;}
.you .you_a{margin: 0px auto;width: 1200px;padding: 20px 0px 66px 0px;}
.you_a .el-row .el-col{background: white;padding: 14px 32px;box-shadow: 0px 0px 30px rgba(128, 70, 70, 0.08);height: 200px;}
.logistics{position: relative;height: 780px;}
.logistics_a{margin: 0px auto;width: 1200px;padding: 20px 0px 100px 0px;}
.logistics_a .country{
  display: flex;
  align-items: center;
  background: white;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.16);
  padding: 20px 20px;
}
.logistics_a .el-row{margin-top: 300PX;}
.logistics_a .el-col{margin-top: 25px;}
.el-steps /deep/ .el-step__icon{width: 30px;height: 30px;}
.el-steps /deep/ .el-step__line{top: 15px !important;}
.el-steps /deep/ .el-step__icon{background: #A7A7A7;border-color: #A7A7A7;}
.el-steps /deep/ .is-finish .el-step__icon{background: #0071E3;border-color: #0071E3;}
.el-steps /deep/ .is-finish {color: #0071E3;}
.el-steps i{font-size: 13px;color: white;}
</style>
<template>
  <div>
    <div class="banner">
      <img src="@/assets/image/组 3546.png" width="100%">
      <div class="banner_a">
        <el-tabs type="border-card">
          <!-- <el-tab-pane label="运单号查询">
            <el-input placeholder="请输入内容" v-model="tracking_number">
              <el-button slot="append" type="primary" @click="track_search()">查询</el-button>
            </el-input>
             <el-card style="margin-top:10px;" v-if="is_steps">
                <el-steps :active="track_active" align-center process-status="wait">
                  <el-step title="未发货">
                    <i class="el-icon-takeaway-box" slot="icon"></i>
                  </el-step>
                  <el-step title="发货">
                    <i class="el-icon-shopping-cart-1" slot="icon"></i>
                  </el-step>
                  <el-step title="入库中">
                    <i class="el-icon-box" slot="icon"></i>
                  </el-step>
                  <el-step title="中转中">
                    <i class="el-icon-guide" slot="icon"></i>
                  </el-step>
                  <el-step title="已发货(国外)">
                    <i class="el-icon-truck" slot="icon"></i>
                  </el-step>
                  <el-step title="待支付">
                    <i class="el-icon-bank-card" slot="icon"></i>
                  </el-step>
                  <el-step title="已支付">
                    <i class="el-icon-s-finance" slot="icon"></i>
                  </el-step>
                </el-steps>
              </el-card>
          </el-tab-pane> -->
          <el-tab-pane label="运费查询">
            <el-row :gutter="10">
              <el-col :span="12">
                <el-select v-model="inquire_date.send_address" filterable placeholder="请选择出发地" clearable>
                  <el-option
                    v-for="item in countryList"
                    :key="item.id"
                    :label="item.zh_name"
                    :value="item.zh_name">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="4">
                <el-select v-model="inquire_date.destination" filterable placeholder="请选择目的地" clearable>
                  <el-option
                    v-for="item in countryList"
                    :key="item.id"
                    :label="item.zh_name"
                    :value="item.zh_name">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-input placeholder="请输入电话号码" v-model="inquire_date.phone"></el-input>
              </el-col>
              <el-col :span="12">
                <el-select v-model="inquire_date.goods_info" placeholder="请选择物品类型" clearable>
                  <el-option
                    v-for="item in goodsType"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-input v-model="inquire_date.package" placeholder="请输入重量"></el-input>
              </el-col>
              <el-col :span="4">
                <el-button type="primary" style="width:100%;" class="button_primary" :loading="loading_upSearch" @click="up_search()">提交查询</el-button>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="moudle">
      <h1>使命必达</h1>
      <h2>
        <span>我们依靠点点滴滴，坚持不懈的努力，不断迭代进步，为事业持续经营创造更好条件，在产业领域创造更大的发展空间和价值</span> <br>
        <span>空间，最终实现安能的健康发展、持续增长和基业长青。</span>
      </h2>
      <el-row type="flex" justify="center" :gutter="34">
        <el-col :span="11">
          <div class="moudle_div">
            <div class="icon">
              <img src="@/assets/image/组 3538@2x.png" width="100%">
            </div>
            <h3>价格精确透明</h3>
            <h4>荣达昌具有多年行业经验，在报价询价严格遵循海关物流等相关规定，做到您的每一分钱都物超所值。</h4>
          </div>
        </el-col>
        <el-col :span="11">
          <div class="moudle_div">
            <div class="icon">
              <img src="@/assets/image/组 3539@2x.png" width="100%">
            </div>
            <h3>实时跟踪</h3>
            <h4>当货物从您手中发出的一刻，货物实时信息即可在系统内实时跟踪货物状态。</h4>
          </div>
        </el-col>
        <el-col :span="11">
          <div class="moudle_div">
            <div class="icon">
              <img src="@/assets/image/组 3541@2x.png" width="100%">
            </div>
            <h3>急速清关</h3>
            <h4>荣达昌海运双清关服务开创DDU/DDP服务新纪元.解决中小企业清关派送难题.让国际物流变得更简单!</h4>
          </div>
        </el-col>
        <el-col :span="11">
          <div class="moudle_div">
            <div class="icon">
              <img src="@/assets/image/组 3540@2x.png" width="100%">
            </div>
            <h3>7*24服务</h3>
            <h4>24小时客服系统随时待命</h4>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="you">
      <img class="background_img" src="@/assets/image/lisence-bg@2x.png" width="100%" height="100%">
      <div class="you_a">
        <div class="h5">八大优势</div>
        <h2>
          <span>我们致力用物流的力量，让货物的流通更高效，让人与人的距离更近。传递每一份信任，成就每一份梦想，为美好“加速”，</span><br>
          <span>让物流更美好，让商业更美好，让生活更美好，让未来无限可能。</span>
        </h2>
        <el-row>
          <el-col :span="6">
            <div class="icon_b">
              <img src="@/assets/image/组 3530@2x.png" width="100%">
            </div>
            <div class="h6">急速陆运</div>
            <div class="h7">我们与各大快递公司合作，在保证安的前提下您的货物永远是最先。</div>
          </el-col>
          <el-col :span="6">
            <div class="icon_b"><img src="@/assets/image/组 3531@2x.png" width="100%"></div>
            <div class="h6">箱柜海运</div>
            <div class="h7">在化学品转运，荣达昌致力给您的货品保证快速送达，满足你的需求是我们的最初理念</div>
          </el-col>
          <el-col :span="6">
            <div class="icon_b"><img src="@/assets/image/组 3532@2x.png" width="100%"></div>
            <div class="h6">航空运输</div>
            <div class="h7">对于客户加急快件，我们将于合作航空进行无缝交接，在第一时间把您的货物发出</div>
          </el-col>
          <el-col :span="6">
            <div class="icon_b"><img src="@/assets/image/组 3533@2x.png" width="100%"></div>
            <div class="h6">快速中转</div>
            <div class="h7">我们因为专业所以信赖深圳、香港两地仓库，均配备体制完善中转团队来保障您的货物安全</div>
          </el-col>
          <el-col :span="6">
            <div class="icon_b"><img src="@/assets/image/组 3534@2x.png" width="100%"></div>
            <div class="h6">实时跟踪</div>
            <div class="h7">首创业内线上同步信息，让您足不出户就能知道当前货物状态实时跟踪货物</div>
          </el-col>
          <el-col :span="6">
            <div class="icon_b"><img src="@/assets/image/组 3535@2x.png" width="100%"></div>
            <div class="h6">货物安全</div>
            <div class="h7">深圳为中心，辐射全国各口岸收货的拼配一体化服务，为客户提供化工品、危险品的全球服务。</div>
          </el-col>
          <el-col :span="6">
            <div class="icon_b"><img src="@/assets/image/组 3536@2x.png" width="100%"></div>
            <div class="h6">让危险不再危险</div>
            <div class="h7">荣达昌有专业的应急救援设备和人员，可提供危险化学品在运输及储存过程中泄露事故。</div>
          </el-col>
          <el-col :span="6">
            <div class="icon_b"><img src="@/assets/image/组 3537@2x.png" width="100%"></div>
            <div class="h6">急速清关</div>
            <div class="h7">海运双清关服务开创服务新纪元，解决中小企业清关派送难题.让国际物流变得更简单!</div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="logistics">
      <img class="background_img" src="@/assets/image/组 3529@2x.png" width="100%" height="100%">
      <div class="logistics_a">
        <div class="h5">物流创造无限可能</div>
        <h2>
          <span>我们依靠点点滴滴，坚持不懈的努力，不断迭代进步，为事业持续经营创造更好条件，在产业领域创造更大的发展空间和价值空间，</span><br>
          <span>最终实现物流人的健康发展、持续增长和基业长青。</span>
        </h2>
        <!-- <el-row type="flex" justify="space-between">
          <el-col :span="5">
            <div class="country">
              <div class="icon_c"></div>
              <div class="h8">China</div>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="country">
              <div class="icon_c"></div>
              <div class="h8">United States</div>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="country">
              <div class="icon_c"></div>
              <div class="h8">Malaysia</div>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="country">
              <div class="icon_c"></div>
              <div class="h8">Romania</div>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="country">
              <div class="icon_c"></div>
              <div class="h8">Brazil</div>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="country">
              <div class="icon_c"></div>
              <div class="h8">Australia</div>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="country">
              <div class="icon_c"></div>
              <div class="h8">Canada</div>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="country">
              <div class="icon_c"></div>
              <div class="h8">Luxembourg</div>
            </div>
          </el-col>
        </el-row> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'home',
  data () {
    return {
      inquire_date:{
        send_address:'',
        destination:'',
        goods_info:'',
        package:'',
        phone:'',
      },
      tracking_number: '',
      track_active:'',
      is_steps:false,
      loading_upSearch:false,
      countryList:[],
      goodsType:['普货'],
    }
  },
  created () {
    this.inquire_date.phone = localStorage.getItem('loginForm')?JSON.parse(localStorage.getItem('loginForm')).iphone:''
    this.fetach()
  },
  methods: {
    fetach(){
      this.$get('api/orders/countries/').then(res=>{
        this.countryList = res.data
      })
    },
    track_search(){
      if(localStorage.getItem('loginForm')){
        if(this.tracking_number){
          var obj = {tracking_number:this.tracking_number}
          this.$get('api/orders/trackingsearch/',obj).then(res=>{
            if(res&&res.code===0){
              if(res.data&&res.data.length>0){
                this.track_active = res.data[0].status+1
                this.is_steps = true
              }else{
                this.$message.error('未查询到该运单状态')
              }
            }else{
              this.$message.error(res.msg)
            }
          })
        }else{
          this.is_steps = false
          this.track_active = ''
        }
      }else{
        this.$parent.$refs.heard.dialogLogin=true
      }
    },
    up_search(){
      if(!this.inquire_date.send_address||!this.inquire_date.destination||!this.inquire_date.phone){
        this.$message.error('请完整填写出发地、目的地和电话')
      }else{
        this.loading_upSearch = true
        this.$post('api/info/inquireadd/',this.inquire_date).then(res=>{
          if(res&&res.code===0){
            this.$message.success('成功')
            this.inquire_date.send_address = ''
            this.inquire_date.destination = ''
            this.inquire_date.goods_info = ''
            this.inquire_date.package = ''
            this.loading_upSearch = false
          }else{
            this.$message.error(res.msg)
            this.loading_upSearch = false
          }
        }).catch(err=>{this.loading_upSearch = false})
      }
    },
  }
}
</script>
