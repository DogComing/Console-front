<template>
  <div class="app-container">    
    <div  style="display:flex; flex-direction:row; justify-content:start ;width: 100%;">
      <div style="width: 40%; ">
        <div  style=" " v-for="(value,index) in  info1" :key="index" >
          <el-card class="box-card" v-if="info1[index].key != 'jackpot' && info1[index].key != 'share_out_bonus'">
            <div slot="header" class="clearfix">
              <span>{{info1[index].remark}}</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="OpenPinZhi(index,0)">设置</el-button>
            </div>
            <div class="text item" >
                {{info1[index].value}}
            </div>
          </el-card>
          <div style="height: 50px;" v-if="info1[index].key != 'jackpot' && info1[index].key != 'share_out_bonus'"></div>
        </div>
      </div>
      <div style="width: 50px;"></div>
      <div style="width: 40%;  ">
        <div  style=" width: 100%" v-for="(value,index) in  info2" :key="index" >
          <el-card class="box-card" v-if="info1[index].key != 'jackpot' && info1[index].key != 'share_out_bonus'" >
          <div slot="header" class="clearfix">
            <span>{{info2[index].remark}}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="OpenPinZhi(index,1)" >设置</el-button>
            </div>
          <div class="text item" >
            {{info2[index].value}}
          </div>
          </el-card>
          <div style="height: 50px;" v-if="info1[index].key != 'jackpot' && info1[index].key != 'share_out_bonus'"></div>
        </div>
      </div>


    </div>
    <el-dialog
      :title="cur.shuoming"
      :visible.sync="cur.dialogVisible"
      width="30%"
      >
       <el-input v-model="cur.value" placeholder="请输入内容"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cur.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="SetDogInfo()">确 定</el-button>
      </span>
</el-dialog>
  </div>
</template>

<script> 
  import {settingAll,settingUpdate} from "@/api/user";
    export default {
    name: 'UserInfo',
    data() {
            return {
              infodata:[],
              info1:[ ],
              info2:[ ],
              cur:{
                dialogVisible :false,
                index:0,
                key:0,
                sendkey:0,
                shuoming:'11',
                value:'',
              },
            }
    },
    mounted() {
      this.GetUseInfo();
     
    },
    methods: {
      fenge()
      {
        let a = [[]] = this.chunk(this.infodata);
        this.info1 = a[0];
        this.info2 = a[1];
      },
      chunk(arr) 
      {
        let a = [[]]
        a.push([])
        a.push([])
        let index =0;
        for (let i = 0; i < arr.length; i++) {
            a[index].push(arr[i]);
            if(index == 0)
            {
              index = 1;
            }else
            {
              index = 0;
            }
        }
        return a
      },
      //获取饲料配置
      async GetUseInfo() {
          const data = await settingAll()
          this.infodata=data.data;
          this.fenge();
           this.cur.dialogVisible = false;
      },
      //修改配置信息
      async SetDogInfo() {
        let data = 
        {
          value: this.cur.value,
          key: this.cur.sendkey
        }
        console.log(data);
        await settingUpdate(data)
        this.GetUseInfo();
             this.$message({
                message: '修改成功',
                type: 'success'
            });

      },
      // 修改配置
      OpenPinZhi(index,key) {
        this.cur.dialogVisible = true;
        this.cur.index=index;
        this.cur.key=key;
        if(key == 0)
        {
          this.cur.sendkey = this.info1[index].key;
          this.cur.shuoming = this.info1[index].remark;
          this.cur.value = this.info1[index].value;
        }else
        {
           this.cur.sendkey = this.info2[index].key;
          this.cur.shuoming = this.info2[index].remark;
          this.cur.value = this.info2[index].value;
        }
        
      },
    }
}
</script>

<style lang="scss" scoped>
.app-container {

  padding: 10px;
}
</style>
