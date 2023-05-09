<template>
    <div class="bar">     
        <div class="select-container">
        <el-button type="primary" @click="handleAdd">新增<i class="el-icon-circle-plus el-icon--right"></i></el-button>
        </div>
        <el-table :data="mapData" border style="width: 100%">
            <el-table-column type="index" label="" width="50"></el-table-column>
            <!-- 视频地址 -->
            <el-table-column  label="视频地址" align="center">
                <template slot-scope="scope" >
                    <div style="display:flex; flex-direction:row; justify-content:space-between;">
                        <div style="margin-top: 5px;overflow: hidden;-webkit-line-clamp: 1;-webkit-box-orient: vertical;display: -webkit-box;">{{ scope.row.adUrl }}</div>
                        <el-button type="text" size="small" icon="el-icon-document-copy" @click="copyBtn(scope.row.adUrl)">复制</el-button>
                    </div>
                </template>
            </el-table-column>
              <!-- 跳转地址 -->
            <el-table-column  label="跳转地址" align="center">
               <template slot-scope="scope" >
                    <div style="display:flex; flex-direction:row; justify-content:space-between;">
                        <div style="margin-top: 5px;overflow: hidden;-webkit-line-clamp: 1;-webkit-box-orient: vertical;display: -webkit-box;">{{ scope.row.jumpUrl }}</div>
                        <el-button type="text" size="small" icon="el-icon-document-copy" @click="copyBtn(scope.row.jumpUrl)">复制</el-button>
                    </div>
                </template>
            </el-table-column>
                <!-- 奖励类型 -->
            <el-table-column  label="奖励类型" align="center">
                <template slot-scope="scope" >
                    <div>{{ GetTypeStr(scope.row.awardType)}}</div>
                </template>
            </el-table-column>
            <!-- 获得奖励 -->
            <el-table-column  label="获得奖励" align="center">
                <template slot-scope="scope" >
                    <div>{{ scope.row.awardNum}}</div>
                </template>
            </el-table-column>
           
            <!-- 设置 -->
            <el-table-column  label="设置" width="250" align="center">
                <template slot-scope="scope" >
                        <el-button  type="primary" size="small" icon="el-icon-circle-check-outline" @click="DialogVisible(scope.$index, scope.row)">修改</el-button>
                        <el-button  type="danger" size="small" icon="el-icon-circle-check-outline" @click="DialogVisible(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="titleName" :visible.sync="dialogVisible" width="30%">
            <!-- <div  style="display:flex; flex-direction:row;">
                <div style="margin-top: 10px;width:120px">{{curname}}概率:</div>
                <div style="margin-top: 10px;width: 20px;">  </div>
                <div><el-input placeholder="概率" v-model="bilv" > </el-input></div>
            </div> -->

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="DialogVisible">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
 import {adAll,adUpdate,adAdd,adDelete} from "@/api/user";
    export default {
    name: 'ad',
    
    data() {
            return {
                dialogVisible:false,
                curType:1,
                curIndex:0,
                titleName:"",
                mapData: [ 
                ],
                addData:{
                    adUrl:'',
                    awardNum:'',
                    jumpUrl:'',
                    awardType:'1',
                }
            
            }
        },
    mounted() {
        this.GetUseInfo()
    },
    methods: {
        async GetUseInfo() {
            let _paget=
            {
                page :1,
                size :12,
            }
            const data = await adAll(_paget)
            console.log(data)
            //刷新信息
            this.mapData = data.data.data;
        },
        //修改配置信息
        async SetDogInfo(id, _paget) {
            await mapUpdate(id,_paget)
            this.GetUseInfo();
            this.$message({
                message: '修改成功',
                type: 'success'
            });
        },
        // 修改配置
        SetPinZhi(index, row) {
            let _paget=
            {                
            }
            if(this.mapData[index].name.isSet){if(this.mapData[index].name.setValue==''){this.$message.error('修改失败\n空');return;}
            else{ _paget['mapName']=this.mapData[index].name.setValue;}}
            if(this.mapData[index].useAgs.isSet){if(this.mapData[index].useAgs.setValue==''){this.$message.error('修改失败\n空');return;}
            else{ _paget['useAgs']=this.mapData[index].useAgs.setValue;}} 
            if(this.mapData[index].JL.isSet){if(this.mapData[index].JL.setValue==''){this.$message.error('修改失败\n空');return;}
            else{ _paget['useBrawn']=this.mapData[index].JL.setValue;}}
            if(this.mapData[index].lockLevel.isSet){if(this.mapData[index].lockLevel.setValue==''){this.$message.error('修改失败\n空');return;}
            else{ _paget['lockLevel']=this.mapData[index].lockLevel.setValue;}}
            if(this.mapData[index].mapGrade.isSet){if(this.mapData[index].mapGrade.setValue==''){this.$message.error('修改失败\n空');return;}
            else{ _paget['mapGrade']=this.mapData[index].mapGrade.setValue;}}
            console.log(_paget);
            this.SetDogInfo(this.mapData[index].id,_paget);
        },
        DialogVisible(index,data)
        {
            this.dialogVisible = true;
            this.titleName = '修改';
        },
        copyBtn(address)
        {
            var oInput = document.createElement('input'); //创建一个隐藏input（重要！）
            oInput.value =address;    //赋值
            document.body.appendChild(oInput);
            oInput.select(); // 选择对象
            document.execCommand("Copy"); // 执行浏览器复制命令
            oInput.className = 'oInput';
            oInput.style.display = 'none';
            this.$message.success('复制成功');
        },
        //奖励类型
        GetTypeStr(type)
        {
            switch (type)
            {
                case 1:
                    return 'ASG';
                case 2:
                    return '精力';
            }
            return '没有此类型';
        },
        //新增
        handleAdd()
        {
            this.titleName = '新增';
            this.dialogVisible = true;
        }
    }
}
</script>

<style lang="scss" scoped>
.bar{
    
    padding: 14px 14px;
}
.select-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0 5px 10px 0;
}
</style>
