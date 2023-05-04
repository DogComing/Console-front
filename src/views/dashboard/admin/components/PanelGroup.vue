<template>
  <div>
    <el-row :gutter="40" class="panel-group">
      
      <!-- 充提记录 -->
      <el-col :xs="12" :sm="12" :lg="10" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('shoppings')" style=" display: flex;flex-direction:column;">
          <div class="card-panel-icon-wrapper" style=" color: #fff;background: #34bfa3">
            <svg-icon icon-class="money" class-name="card-panel-icon" />
            <div style="display: flex;align-content: center;font-size: 28px;margin: 14px 0 0 14px; margin-left: 100px;">充提记录</div>
          </div>
          <div class="card-panel-description" style="display: flex; flex-direction:row ">
            <div style="width: 4px; height: 50px;background: #34bfa3;"></div>
            <div style="width: 10px; "></div>
            <div style="width: 150px">
              <div class="card-panel-text">总充值ASG</div>
              <count-to :start-val="0" :end-val="infoData.all_C_asg" :duration="1500" class="card-panel-num" />             
            </div>
            <div style="width: 30px; "></div>
            <div style="width: 4px; height: 50px;background: #34bfa3;"></div>
            <div style="width: 10px; "></div>
            <div style="width: 150px">
              <div class="card-panel-text">总提现ASG</div>
              <count-to :start-val="0" :end-val="infoData.all_T_asg" :duration="1500" class="card-panel-num" />
            </div>
            <div style="width: 30px; "></div>
            <div style="width: 4px; height: 50px;background: #34bfa3;"></div>
            <div style="width: 10px; "></div>
            <div style="width: 150px">
              <div class="card-panel-text">总充值USTD</div>
              <count-to :start-val="0" :end-val="infoData.all_USTD" :duration="1500" class="card-panel-num" />
            </div>
          </div>
          <div class="card-panel-description" style="display: flex; flex-direction:row ">
            <div style="width: 4px; height: 50px;background: #34bfa3;"></div>
            <div style="width: 10px; "></div>
            <div  style="width: 150px">
              <div class="card-panel-text">当天充值ASG</div>
              <count-to :start-val="0" :end-val="infoData.cur_C_asg" :duration="1500" class="card-panel-num" />
            </div>
            <div style="width: 30px; "></div>
            <div style="width: 4px; height: 50px;background: #34bfa3;"></div>
            <div style="width: 10px; "></div>
            <div style="width: 150px">
              <div class="card-panel-text">当天提现ASG</div>
              <count-to :start-val="0" :end-val="infoData.cur_T_asg" :duration="1500" class="card-panel-num" />
            </div>
            <div style="width: 30px; "></div>
            <div style="width: 4px; height: 50px;background: #34bfa3;"></div>
            <div style="width: 10px; "></div>
            <div style="width: 150px">
              <div class="card-panel-text">当天充值USTD</div>
              <count-to :start-val="0" :end-val="infoData.cur_USTD" :duration="1500" class="card-panel-num" />
            </div>
          </div>
        </div>
      </el-col>
       <!-- 人数统计 -->
      <el-col :xs="12" :sm="12" :lg="7" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('shoppings')" style=" display: flex;flex-direction:column;">
          <div class="card-panel-icon-wrapper" style=" color: #fff;background: #40c9c6;">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
            <div style="display: flex;align-content: center;font-size: 28px;margin: 14px 0 0 14px; margin-left: 100px;">人数统计</div>
          </div>
          <div class="card-panel-description" style="display: flex; flex-direction:row ">
            <div style="width: 4px; height: 50px;background: #40c9c6;"></div><div style="width: 10px; "></div>
            <div style="width: 150px">
              <div class="card-panel-text">注册人数</div>
              <count-to :start-val="0" :end-val="infoData.registeredAmount" :duration="1500" class="card-panel-num" />
            </div>
            <div style="width: 30px; "></div><div style="width: 4px; height: 50px;background: #34bfa3;"></div><div style="width: 10px; "></div>
            <div style="width: 150px">
              <div class="card-panel-text">在线人数</div>
              <count-to :start-val="0" :end-val="infoData.onlineAmount" :duration="1500" class="card-panel-num" />
            </div>
          </div>
        </div>
      </el-col>
      <!-- 奖池 -->
      <el-col :xs="12" :sm="12" :lg="7" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('shoppings')" style=" display: flex;flex-direction:column;">
          <div class="card-panel-icon-wrapper" style=" color: #fff;background: #36a3f7;">
            <svg-icon icon-class="example" class-name="card-panel-icon" />
            <div style="display: flex;align-content: center;font-size: 28px;margin: 14px 0 0 14px; margin-left: 100px;">奖池</div>
          </div>
          <div class="card-panel-description" style="display: flex; flex-direction:row;margin: 16px;">
            <div style="width: 4px; height: 50px;background: #36a3f7;"></div>
            <div style="width: 10px; "></div>
            <div  style="width: 150px">
              <div class="card-panel-text">当前奖池余额</div>
              <count-to :start-val="0" :end-val="infoData.bonusPools" :duration="1500" class="card-panel-num" />
            </div>
            <div style="width: 30px; "></div><div style="width: 4px; height: 50px;background: #36a3f7;"></div><div style="width: 10px; "></div>
            <div style="width: 150px">
              <div class="card-panel-text">平台分红</div>
              <count-to :start-val="0" :end-val="infoData.share_out_bonus" :duration="1500" class="card-panel-num" />
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import {settingAll,settingInfo} from "@/api/user";
export default {
  components: {
    CountTo
  },
  data() {
    return {
      infoData:{
        all_C_asg:0,
        all_T_asg:0,
        all_USTD:0,
        cur_C_asg:0,
        cur_T_asg:0,
        cur_USTD:0,
        registeredAmount:0,
        onlineAmount:0,
        bonusPools:0,
        share_out_bonus:0,
      }
    }
  },
  mounted() {
      this.infoData.all_C_asg=1248685
      this.infoData.all_T_asg=245587
      this.infoData.all_USTD=315
      this.infoData.cur_C_asg=445
      this.infoData.cur_T_asg=558
      this.infoData.cur_USTD=6
      this.infoData.registeredAmount=78
      this.infoData.onlineAmount=8
      this.GetBonusPools();
  },
  methods: {
    //获得奖金池
    async GetBonusPools()
    {
        const data = await settingAll()
        this.infoData.bonusPools= parseInt(data.data[18].value);
        this.infoData.share_out_bonus=  parseInt(data.data[19].value);
        
    },
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {   
   
    // cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 10px 10px 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
      
    }

    .card-panel-description {
      float: left;
      font-weight: bold;
      margin: 26px;
     
      
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;
    
    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
