<template>
    <div class="bar">
        <div  style="display:flex; flex-direction:row;">
            <div style="margin-top: 10px;">购买价格(USDT):</div>
            <div style="margin-top: 10px;width: 20px;">  </div>
            <div><el-input placeholder="USDT" v-model="usdt" @change=SetUSDT> </el-input></div> 
        </div>
        <div style="height: 20px;"></div>
        <!-- 列表 -->
        <el-table :data="userData" border style="width: 100%">
            <el-table-column type="index" label="天" align="center"></el-table-column>
            <!-- 物品ID -->
            <el-table-column prop="ags" label="物品ID"  align="center">
                <template slot-scope="scope" >
                    <div style="display:flex; flex-direction:row; justify-content:space-between;">
                        <div v-if="!scope.row.itemsId.isSet" style="margin-top: 5px;">{{ scope.row.itemsId.value }}</div>
                        <div v-if="scope.row.itemsId.isSet">
                            <el-input size="mini" placeholder="ID" v-model="scope.row.itemsId.setValue"></el-input>
                        </div>
                        <el-button  v-if="!scope.row.itemsId.isSet" type="primary" size="small" icon="el-icon-edit" @click="scope.row.itemsId.isSet=!scope.row.itemsId.isSet">修改</el-button>
                        <div v-if="scope.row.itemsId.isSet">
                            <el-button  type="success" size="small" icon="el-icon-circle-check-outline" @click="SetItemsID(scope.$index, scope.row)">确认</el-button>
                            <el-button  type="info" size="small" icon="el-icon-circle-check-outline" @click="scope.row.itemsId.isSet=!scope.row.itemsId.isSet">取消</el-button>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <!-- 数量 -->
            <el-table-column prop="ags" label="数量" align="center">
                <template slot-scope="scope" >
                    <div style="display:flex; flex-direction:row; justify-content:space-between;">
                        <div v-if="!scope.row.itemsNum.isSet" style="margin-top: 5px;">{{ scope.row.itemsNum.value }}</div>
                        <div v-if="scope.row.itemsNum.isSet">
                            <el-input
                                size="mini"
                                placeholder="数量"
                                v-model="scope.row.itemsNum.setValue">
                            </el-input>
                        </div>
                        <el-button  v-if="!scope.row.itemsNum.isSet" type="primary" size="small" icon="el-icon-edit" @click="scope.row.itemsNum.isSet=!scope.row.itemsNum.isSet">修改</el-button>
                        <div  v-if="scope.row.itemsNum.isSet" >
                            <el-button type="success" size="small" icon="el-icon-circle-check-outline" @click="SetItemsNum(scope.$index, scope.row)">确认</el-button>
                            <el-button type="info" size="small" icon="el-icon-circle-check-outline" @click="scope.row.itemsNum.isSet=!scope.row.itemsNum.isSet">取消</el-button>
                        </div>
                     </div>
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
                //USDT
                usdt:'10',
                cur_usdt:'10',
                // 用户信息
                userData: [{
                    id:0,
                    //物品ID
                    itemsId: {
                            value: '1', 
                            setValue:'',
                            isSet:false,
                        },
                    //物品数量
                    itemsNum:{
                        value: '1000', 
                        setValue:'',
                        isSet:false,
                    }
                } ],
                //页
                pageData:
                {
                    curPage:1,
                    maxCount:8,
                }
            }
        },
   
    methods: {
        // 修改物品ID
        SetItemsID(index, row) {
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
        // 修改物品数量
        SetItemsNum(index, row) {
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
        },
        //修改购买价格
        SetUSDT()
        {
            if(this.usdt=="")
            {
                this.usdt = this.cur_usdt;
            }else
            {
                
            }
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
