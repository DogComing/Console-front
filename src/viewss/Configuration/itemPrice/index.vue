<template>
    <div class="bar">
        <!-- 列表 -->
        <el-table :data="userData" border style="width: 100%">
            <el-table-column type="index" label="" width="50"></el-table-column>
             <!-- id -->
            <el-table-column prop="id" label="ID" width="40"></el-table-column>
            <!-- 名字 -->
            <el-table-column prop="ags" label="名字">
                <template slot-scope="scope" >
                    <div style="display:flex; flex-direction:row; justify-content:space-between;">
                        <div v-if="!scope.row.name.isSet" style="margin-top: 5px;">{{ scope.row.name.value }}</div>
                        <div v-if="scope.row.name.isSet"  style="width: 100px;">
                            <el-input size="mini" placeholder="名字" v-model="scope.row.name.setValue"></el-input>
                        </div>
                        <el-button  v-if="!scope.row.name.isSet" type="primary" size="small" icon="el-icon-edit" @click="scope.row.name.isSet=!scope.row.name.isSet">修改</el-button>
                        <div v-if="scope.row.name.isSet">
                            <el-button  type="success" size="small" icon="el-icon-circle-check-outline" @click="SetAGS(scope.$index, scope.row)">确认</el-button>
                            <el-button  type="info" size="small" icon="el-icon-circle-check-outline" @click="scope.row.name.isSet=!scope.row.name.isSet">取消</el-button>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <!-- 价格 -->
            <el-table-column prop="ags" label="价格(USDT)" width="220">
                <template slot-scope="scope" >
                    <div style="display:flex; flex-direction:row; justify-content:space-between;">
                        <div v-if="!scope.row.usdt.isSet" style="margin-top: 5px;">{{ scope.row.usdt.value }}</div>
                        <div v-if="scope.row.usdt.isSet" style="width: 60px;">
                            <el-input
                                size="mini"
                                placeholder="数量"
                                v-model="scope.row.usdt.setValue">
                            </el-input>
                        </div>
                        <el-button  v-if="!scope.row.usdt.isSet" type="primary" size="small" icon="el-icon-edit" @click="scope.row.usdt.isSet=!scope.row.usdt.isSet">修改</el-button>
                        <div  v-if="scope.row.usdt.isSet" >
                            <el-button type="success" size="small" icon="el-icon-circle-check-outline" @click="SetTL(scope.$index, scope.row)">确认</el-button>
                            <el-button type="info" size="small" icon="el-icon-circle-check-outline" @click="scope.row.usdt.isSet=!scope.row.usdt.isSet">取消</el-button>
                        </div>
                     </div>
                </template>
            </el-table-column>
             <!-- 说明 -->
            <el-table-column prop="ags" label="说明">
                <template slot-scope="scope" >
                    <div style="display:flex; flex-direction:row; justify-content:space-between;">
                        <div v-if="!scope.row.introduce.isSet" style="margin-top: 5px;overflow: hidden;-webkit-line-clamp: 1;-webkit-box-orient: vertical;display: -webkit-box;">{{ scope.row.introduce.value }}</div>
                        <div v-if="scope.row.introduce.isSet" style="width: 55%">
                            <el-input
                                size="mini"
                                placeholder="说明"
                                v-model="scope.row.introduce.setValue">
                            </el-input>
                        </div>
                        <el-button  v-if="!scope.row.introduce.isSet" type="primary" size="small" icon="el-icon-edit" @click="scope.row.introduce.isSet=!scope.row.introduce.isSet">修改</el-button>
                        <div  v-if="scope.row.introduce.isSet" >
                            <el-button type="success" size="small" icon="el-icon-circle-check-outline" @click="SetTL(scope.$index, scope.row)">确认</el-button>
                            <el-button type="info" size="small" icon="el-icon-circle-check-outline" @click="scope.row.introduce.isSet=!scope.row.introduce.isSet">取消</el-button>
                        </div>
                     </div>
                </template>
            </el-table-column>
            <!-- 战力 -->
            <el-table-column prop="ags" label="增加战力">
                <template slot-scope="scope" >
                    <div style="display:flex; flex-direction:row; justify-content:space-between;">
                        <div v-if="!scope.row.power.isSet" style="margin-top: 5px;">{{ scope.row.power.value }}</div>
                        <div v-if="scope.row.power.isSet" style="width: 55%">
                            <el-input
                                size="mini"
                                placeholder="增加战力"
                                v-model="scope.row.power.setValue">
                            </el-input>
                        </div>
                        <el-button  v-if="!scope.row.power.isSet" type="primary" size="small" icon="el-icon-edit" @click="scope.row.power.isSet=!scope.row.power.isSet">修改</el-button>
                        <div  v-if="scope.row.power.isSet" >
                            <el-button type="success" size="small" icon="el-icon-circle-check-outline" @click="SetTL(scope.$index, scope.row)">确认</el-button>
                            <el-button type="info" size="small" icon="el-icon-circle-check-outline" @click="scope.row.power.isSet=!scope.row.power.isSet">取消</el-button>
                        </div>
                     </div>
                </template>
            </el-table-column>
             <!-- 装备提升战力 -->
            <el-table-column prop="ags" label="装备提升战力">
                <template slot-scope="scope" >
                    <div style="display:flex; flex-direction:row; justify-content:space-between;">
                        <div v-if="!scope.row.percentage.isSet" style="margin-top: 5px;">{{ scope.row.percentage.value }}</div>
                        <div v-if="scope.row.percentage.isSet" style="width: 55%">
                            <el-input
                                size="mini"
                                placeholder="百分比"
                                v-model="scope.row.percentage.setValue">
                            </el-input>
                        </div>
                        <el-button  v-if="!scope.row.percentage.isSet" type="primary" size="small" icon="el-icon-edit" @click="scope.row.percentage.isSet=!scope.row.percentage.isSet">修改</el-button>
                        <div  v-if="scope.row.percentage.isSet" >
                            <el-button type="success" size="small" icon="el-icon-circle-check-outline" @click="SetTL(scope.$index, scope.row)">确认</el-button>
                            <el-button type="info" size="small" icon="el-icon-circle-check-outline" @click="scope.row.percentage.isSet=!scope.row.percentage.isSet">取消</el-button>
                        </div>
                     </div>
                </template>
            </el-table-column>
            <!-- 是否不受天赋影响 -->
            <el-table-column prop="ags" label="天赋影响" width="130">
                <template slot-scope="scope" >
                    <el-switch
                    style="display: block"
                    v-model="scope.row.isYingXiang"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-text="不受"
                    inactive-text="受">
                    </el-switch>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div style="height: 50px;"></div>
        <div class="pagination">
            <div>
                <el-pagination 
                @current-change="HandleCurrentChange"
                :current-page.sync="pageData.curPage"
                :page-size="7"
                layout="total, prev, pager, next, jumper"
                :total="pageData.maxCount">
                </el-pagination>
            </div>
        </div>     
    </div>
</template>
<script>
    export default {
    name: 'UserInfo',
  
    data() {
            return {
                // 用户信息
                userData: [{
                    id:1,
                    //名字
                    name: {
                            value: '物品1', 
                            setValue:'',
                            isSet:false,
                        },
                    //价格
                    usdt: {
                            value: '1', 
                            setValue:'',
                            isSet:false,
                        },
                    //说明
                    introduce:{
                        value: '说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明', 
                        setValue:'',
                        isSet:false,
                    },
                    //是否不受天赋影响
                    isYingXiang:true,
                    //战力
                    power:{
                            value: '123', 
                            setValue:'',
                            isSet:false,
                        },
                    //装备提升战力百分比
                    percentage:{
                            value: '0.1', 
                            setValue:'',
                            isSet:false,
                        },

                }],
                //页
                pageData:
                {
                    curPage:1,
                    maxCount:8,
                }
            }
        },
   
    methods: {
        // 修改AGS
        SetAGS(index, row) {
            if(index, row,this.userData[index].setAGS !='')
            {
                console.log(index, row,this.userData[index].setAGS);
                console.log('发送修改AGS消息');


                //消息成功后
                this.userData[index].setAGS = '';
                this.userData[index].isSetAGS = false;
            }else
            {
                this.$message.error('修改失败\nAGS为空');
            } 
        },
        // 修改体力
        SetTL(index, row) {
            if(row,this.userData[index].setTL !='')
            {
                console.log(index, row,this.userData[index].setTL);
                console.log('发送修改体力消息');
                this.userData[index].setTL = '';
                this.userData[index].isSetTL = false;
            }else
            {
                this.$message.error('修改失败\n体力为空');
            } 
        },
        //跳转页
        HandleCurrentChange(val) {
            console.log(this.pageData.curPage)
            //发送申请用户列表
        }
    }
}
</script>

<style lang="scss" scoped>
.bar{
    
    padding: 14px 14px;
}
.pagination
{
   
    display:flex;
    justify-content: center;
}
</style>
