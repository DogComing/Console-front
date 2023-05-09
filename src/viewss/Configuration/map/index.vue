<template>
    <div class="bar">     
        <el-table :data="mapData" border style="width: 100%">
            <el-table-column type="index" label="" width="50"></el-table-column>
            <!-- 名字 -->
            <el-table-column  label="名字" align="center">
                <template slot-scope="scope" >
                    <div style="display:flex; flex-direction:row; justify-content:space-between;">
                        <div v-if="!scope.row.name.isSet" style="margin-top: 5px;">{{ scope.row.name.value }}</div>
                        <div v-if="scope.row.name.isSet" style="width: 80px;">
                            <el-input
                                size="mini"
                                placeholder="名字"
                                v-model="scope.row.name.setValue">
                            </el-input>
                        </div>
                        <el-button  v-if="!scope.row.name.isSet" type="primary" size="small" icon="el-icon-edit" @click="scope.row.name.isSet=!scope.row.name.isSet">修改</el-button>
                        <div  v-if="scope.row.name.isSet">
                            <el-button  type="success" size="small" icon="el-icon-circle-check-outline" @click="SetPinZhi(scope.$index, scope.row)">确认</el-button>
                            <el-button  type="info" size="small" icon="el-icon-circle-check-outline" @click="scope.row.name.isSet=!scope.row.name.isSet">取消</el-button>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <!-- 等级 -->
            <el-table-column  label="解锁等级" align="center">
                <template slot-scope="scope" >
                    <div style="display:flex; flex-direction:row; justify-content:space-between;">
                        <div v-if="!scope.row.lockLevel.isSet" style="margin-top: 5px;">{{ scope.row.lockLevel.value }}</div>
                        <div v-if="scope.row.lockLevel.isSet" style="width: 80px;">
                            <el-input
                                size="mini"
                                placeholder="解锁等级"
                                v-model="scope.row.lockLevel.setValue">
                            </el-input>
                        </div>
                        <el-button  v-if="!scope.row.lockLevel.isSet" type="primary" size="small" icon="el-icon-edit" @click="scope.row.lockLevel.isSet=!scope.row.lockLevel.isSet">修改</el-button>
                        <div  v-if="scope.row.lockLevel.isSet">
                            <el-button  type="success" size="small" icon="el-icon-circle-check-outline" @click="SetPinZhi(scope.$index, scope.row)">确认</el-button>
                            <el-button  type="info" size="small" icon="el-icon-circle-check-outline" @click="scope.row.lockLevel.isSet=!scope.row.lockLevel.isSet">取消</el-button>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <!-- 消耗AGS -->
            <el-table-column  label="消耗AGS" align="center">
                <template slot-scope="scope" >
                    <div style="display:flex; flex-direction:row; justify-content:space-between;">
                        <div v-if="!scope.row.useAgs.isSet" style="margin-top: 5px;">{{ scope.row.useAgs.value }}</div>
                        <div v-if="scope.row.useAgs.isSet" style="width: 80px;">
                            <el-input                                
                                size="mini"
                                placeholder="消耗AGS"
                                v-model="scope.row.useAgs.setValue">
                            </el-input>
                        </div>
                        <div style="height: 10px;"></div>
                        <el-button  v-if="!scope.row.useAgs.isSet" type="primary" size="small" icon="el-icon-edit" @click="scope.row.useAgs.isSet=!scope.row.useAgs.isSet">修改</el-button>
                        <div v-if="scope.row.useAgs.isSet" >
                            <el-button  type="success" size="small" icon="el-icon-circle-check-outline" @click="SetPinZhi(scope.$index, scope.row)">确认</el-button>
                            <el-button  type="info" size="small" icon="el-icon-circle-check-outline" @click="scope.row.useAgs.isSet=!scope.row.useAgs.isSet">取消</el-button>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <!-- 消耗精力 -->
            <el-table-column  label="消耗精力" align="center">
                <template slot-scope="scope" >
                    <div style="display:flex; flex-direction:row; justify-content:space-between;">
                        <div v-if="!scope.row.JL.isSet" style="margin-top: 5px;">{{ scope.row.JL.value }}</div>
                        <div v-if="scope.row.JL.isSet" style="width: 80px;">
                            <el-input                                
                                size="mini"
                                placeholder="消耗精力"
                                v-model="scope.row.JL.setValue">
                            </el-input>
                        </div>
                        <div style="height: 10px;"></div>
                        <el-button  v-if="!scope.row.JL.isSet" type="primary" size="small" icon="el-icon-edit" @click="scope.row.JL.isSet=!scope.row.JL.isSet">修改</el-button>
                        <div v-if="scope.row.JL.isSet" >
                            <el-button  type="success" size="small" icon="el-icon-circle-check-outline" @click="SetPinZhi(scope.$index, scope.row)">确认</el-button>
                            <el-button  type="info" size="small" icon="el-icon-circle-check-outline" @click="scope.row.JL.isSet=!scope.row.JL.isSet">取消</el-button>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <!-- 捕捉概率 -->
            <!-- <el-table-column  label="捕捉概率" width="250">
                <template slot-scope="scope" >
                     <el-button  type="success" size="small" icon="el-icon-circle-check-outline" @click="DialogVisible(scope.$index, scope.row)">设置</el-button>
                </template>
            </el-table-column> -->
        </el-table>

        <el-dialog :title="titleName" :visible.sync="dialogVisible" width="30%">
            <!-- 宠物 -->
            <div  style="display:flex; flex-direction:row;">
                    <div style="margin-top: 10px;width:60px">宠物概率:</div>
                    <div style="margin-top: 10px;width: 20px;">  </div>
                    <div><el-input placeholder="概率" v-model="mapGaiLv[0].gailv" > </el-input></div>
            </div>
            <div style="height:10px; width:10px"></div>
            <div v-for="(value,index) in  mapGaiLv[0].lvgailv" :key="index">
                <div  style="display:flex; flex-direction:row;">
                    <div style="margin-top: 10px;width:60px">{{index+1}}级概率</div>
                    <div style="margin-top: 10px;width: 20px;">  </div>
                    <div><el-input placeholder="概率" v-model="mapGaiLv[0].lvgailv[index]" > </el-input></div>
                </div>
                <div style="height:10px; width:10px"></div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="DialogVisible">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
 import {mapAll,mapUpdate} from "@/api/user";
    export default {
    name: 'UserInfo',
    
    data() {
            return {
                dialogVisible:false,
                curType:1,
                curIndex:0,
                titleName:"",
               //地图信息
                mapData: [ 
                ],
                //概率
                mapGaiLv:[{
                    id:1,
                    gailv:1,
                    lvgailv:[1,1,1,1,1,1,1,1,1,1],
                }]
            }
        },
    mounted() {
        this.GetUseInfo()
    },
    methods: {
        //获取饲料配置
        async GetUseInfo() {
            let _paget=
            {
                page :1,
                size :12,
            }
            const data = await mapAll(_paget)
            console.log(data)
            //刷新信息
            this.mapData = [];
            for (let i = 0; i < data.data.data.length; i++) {
                let value ={
                    id:data.data.data[i].id,
                    imag:data.data.data[i].imgName,                   
                    //名字
                    name: {
                            value: data.data.data[i].mapName, 
                            setValue:'',
                            isSet:false,
                        },
                    //消耗ASG
                    useAgs:{
                         value: data.data.data[i].useAgs, 
                            setValue:'',
                            isSet:false,
                    },
                     //消耗体力
                    JL:{
                         value: data.data.data[i].useBrawn, 
                            setValue:'',
                            isSet:false,
                    },
                    //解锁等级
                    lockLevel:{
                        value: data.data.data[i].lockLevel, 
                        setValue:'',
                        isSet:false,
                    },
                    //地图等级
                    mapGrade:{
                        value: data.data.data[i].mapGrade, 
                        setValue:'',
                        isSet:false,
                    },
                }
                //捕捉类型
                this.mapData.push(value);
            }
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
            console.log(data);
            this.titleName = "LV"+(data.lockLevel.value+1)+data.name.value;
        },
    }
}
</script>

<style lang="scss" scoped>
.bar{
    
    padding: 14px 14px;
}
</style>
