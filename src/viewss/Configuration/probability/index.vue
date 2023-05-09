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
                        <!-- <el-button  v-if="!scope.row.name.isSet" type="primary" size="small" icon="el-icon-edit" @click="scope.row.name.isSet=!scope.row.name.isSet">修改</el-button>
                        <div  v-if="scope.row.name.isSet">
                            <el-button  type="success" size="small" icon="el-icon-circle-check-outline" @click="SetPinZhi(scope.$index, scope.row)">确认</el-button>
                            <el-button  type="info" size="small" icon="el-icon-circle-check-outline" @click="scope.row.name.isSet=!scope.row.name.isSet">取消</el-button>
                        </div> -->
                    </div>
                </template>
            </el-table-column>
            <!-- 宠物概率 -->
            <el-table-column  label="宠物概率" align="center">
                <template slot-scope="scope" >
                     <el-button  type="success" size="small" icon="el-icon-circle-check-outline" @click="DialogVisible(scope.$index, scope.row,1)">设置</el-button>
                </template>
            </el-table-column>
             <!-- 捕捉装备概率 -->
            <el-table-column  label="捕捉装备概率" align="center">
                <template slot-scope="scope" >
                     <el-button  type="success" size="small" icon="el-icon-circle-check-outline" @click="DialogVisible(scope.$index, scope.row,2)">设置</el-button>
                </template>
            </el-table-column>
              <!-- 对战装备概率 -->
            <el-table-column  label="对战装备概率" align="center">
                <template slot-scope="scope" >
                     <el-button  type="success" size="small" icon="el-icon-circle-check-outline" @click="DialogVisible(scope.$index, scope.row,3)">设置</el-button>
                </template>
            </el-table-column>
              <!-- 饲料概率 -->
            <el-table-column  label="饲料概率" align="center">
                <template slot-scope="scope" >
                     <el-button  type="success" size="small" icon="el-icon-circle-check-outline" @click="DialogVisible(scope.$index, scope.row,4)">设置</el-button>
                </template>
            </el-table-column>
              <!-- 珍宝概率 -->
            <el-table-column  label="珍宝概率" align="center">
                <template slot-scope="scope" >
                     <el-button  type="success" size="small" icon="el-icon-circle-check-outline" @click="DialogVisible(scope.$index, scope.row,5)">设置</el-button>
                </template>
            </el-table-column>
              <!-- 野生概率 -->
            <el-table-column  label="野生概率" align="center">
                <template slot-scope="scope" >
                     <el-button  type="success" size="small" icon="el-icon-circle-check-outline" @click="DialogVisible(scope.$index, scope.row,6)">设置</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="titleName" :visible.sync="dialogVisible" width="30%">
            <div  style="display:flex; flex-direction:row;">
                    <div style="margin-top: 10px;width:120px">{{curname}}概率:</div>
                    <div style="margin-top: 10px;width: 20px;">  </div>
                    <div><el-input placeholder="概率" v-model="bilv" > </el-input></div>
            </div>
            <div style="height:10px; width:10px"></div>
            <!-- 宠物 战斗装备 捕捉装备  饲料 -->
            <div v-if="cur_type <= 4" >
                <div v-for="(value,index) in  m_list" :key="index" >
                    <div  style="display:flex; flex-direction:row;">
                        <div style="margin-top: 10px;width:120px">{{curname+(index+1)}}级概率</div>
                        <div style="margin-top: 10px;width: 20px;">  </div>
                        
                        <div v-if="index<9"><el-input placeholder="概率" v-model="mapGaiLv[glName+'0'+(index+1)]" > </el-input></div>
                        <div v-if="index==9"><el-input placeholder="概率" v-model="mapGaiLv[''+glName+(index+1)]" > </el-input></div>
                    </div>
                    <div style="height:10px; width:10px"></div>
                </div>
            </div>
            <div v-if="cur_type == 5">
                    <div  style="display:flex; flex-direction:row;">
                        <div style="margin-top: 10px;width:120px">珍宝装备概率</div>
                        <div style="margin-top: 10px;width: 20px;">  </div>
                        <div><el-input :placeholder="curname+'概率'" v-model="mapGaiLv['gemEquip']" > </el-input></div>
                    </div>
                    <div style="height:10px; width:10px"></div>
                    <div  style="display:flex; flex-direction:row;">
                        <div style="margin-top: 10px;width:120px">珍宝饲料概率</div>
                        <div style="margin-top: 10px;width: 20px;">  </div>
                        <div><el-input :placeholder="curname+'概率'" v-model="mapGaiLv['gemForage']" > </el-input></div>
                    </div>
                    <div style="height:10px; width:10px"></div>
                    <div  style="display:flex; flex-direction:row;">
                        <div style="margin-top: 10px;width:120px">珍宝道具概率</div>
                        <div style="margin-top: 10px;width: 20px;">  </div>
                        <div><el-input :placeholder="curname+'概率'" v-model="mapGaiLv['gemProp']" > </el-input></div>
                    </div>
            </div>
            <div v-if="cur_type == 6">
                <div  style="display:flex; flex-direction:row;">
                    <div style="margin-top: 10px;width:120px">野生概率</div>
                    <div style="margin-top: 10px;width: 20px;">  </div>
                    <div><el-input :placeholder="curname+'概率'" v-model="mapGaiLv['wild']" > </el-input></div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="DialogVisible1">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
 import {mapAll,mapUpdate,produceAll,produceUpdate} from "@/api/user";
    export default {
    name: 'UserInfo',
    
    data() {
            return {
                //弹出需要的参数
                dialogVisible:false,
                
                titleName:"",
                curname:'',
                //谁的比例
                bilv:'',
               //地图信息
                mapData: [ 
                ],
                m_list:[1,2,3,4,5,6,7,8,9,10],
                m_list1:[1,2,3],
                m_list2:[1,2,3,4,5,6,7,8,9,10],
                //概率
                mapGaiLv:[],
                cur_type:'',
                curIndex:1,

                //概率名字
                glName:'',
            }
        },
    mounted() {
        this.GetUseInfo()
    },
    methods: {
        //获取地图配置
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
                    equipRatio:data.data.data[i].mapGrade,
                    forageRatio:data.data.data[i].forageRatio,
                    gemRatio:data.data.data[i].gemRatio,
                    petRatio:data.data.data[i].petRatio,
                    wildRatio:data.data.data[i].wildRatio,
                }
                //捕捉类型
                this.mapData.push(value);
            }
        },
        //获取地图配置
        async GetMapInfo() {
            let _paget=
            {
                page :1,
                size :12,
                type:this.cur_type,
            }
            const data = await produceAll(_paget)
            console.log(data)
            //刷新信息
            this.mapGaiLv = data.data.data[this.curIndex];
             this.Getstr();
        },
        //修改
        Getstr()
        {
            switch(this.cur_type)
            {
                case 1:
                    //宠物
                    //概率名字
                    this.glName = 'petGrade'
                    return;
                case 2:
                    //捕捉装备
                case 3:
                    //对战装备
                    //概率名字
                    this.glName = 'equipGrade'
                    return;
                case 4:
                    //饲料
                    //概率名字
                    this.glName = 'forageGrade'
                    return;
            }
            
        },
        //修改配置信息
        async SetDogInfo(id, _paget) {
            await mapUpdate(id,_paget)
            this.GetUseInfo()
        },
        // 修改地图配置 
        SetPinZhi() {
            let _paget=
            {                
            }
            switch(this.cur_type)
            {
                case 1:
                   _paget['petRatio']= this.bilv
                    break;
                case 2:
                    _paget['petRatio']= this.bilv
                    break;
                case 3:
                   _paget['petRatio'] = this.bilv
                    break;
                case 4:
                   _paget['petRatio'] = this.bilv
                    break;
                case 5:
                   _paget['petRatio'] = this.bilv
                    break;
                case 6:
                   _paget['petRatio'] = this.bilv
                    break;
            }
            console.log(_paget);
            this.SetDogInfo(this.mapData[this.curIndex].id,_paget);
        },
        //打开二级窗口 打开详细概率二级窗口
        DialogVisible(index,data,type)
        {
            this.curIndex = index;
            this.cur_type = type;
            switch(type)
            {
                case 1:
                    this.curname = "宠物"
                    this.bilv = this.mapData[this.curIndex].petRatio
                    console.log(this.curIndex);
                    console.log(this.mapData);
                    break;
                case 2:
                    this.curname = "装备"
                    this.bilv = this.mapData[this.curIndex].equipRatio
                    break;
                case 3:
                    this.curname = "装备"
                    this.bilv = this.mapData[this.curIndex].equipRatio
                    break;
                case 4:
                    this.curname = "饲料"
                    this.bilv = this.mapData[this.curIndex].forageRatio
                    break;
                case 5:
                    this.curname = "珍宝"
                    this.bilv = this.mapData[this.curIndex].gemRatio
                    break;
                case 6:
                    this.curname = "野生"
                    this.bilv = this.mapData[this.curIndex].wildRatio
                    break;
            }
            
            this.GetMapInfo();
            this.dialogVisible = true;
            this.titleName = "LV"+(data.lockLevel.value+1)+data.name.value;

            
        },
        //修改 详细概率
       async DialogVisible1()
        {
            this.SetPinZhi();
            await produceUpdate(this.cur_type,this.mapGaiLv)
            this.dialogVisible = false;
            this.$message({
                message: '修改成功',
                type: 'success'
            });
        },
    }
}
</script>

<style lang="scss" scoped>
.bar{
    
    padding: 14px 14px;
}
</style>
