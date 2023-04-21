<template>
    <div class="bar">
        <div style="width: 200px;height: 50px;">
        <el-input placeholder="搜索用户名字" prefix-icon="el-icon-search" v-model="sousuo" @input= 'SouSuo'></el-input>
        </div>
        <!-- 列表 -->
        <el-table :data="userData" border style="width: 100%">
            <el-table-column type="index" label="" ></el-table-column>
            <!-- id -->
            <el-table-column prop="id" label="ID"></el-table-column>
            <!-- 名字 -->
            <el-table-column prop="name" label="名字" ></el-table-column>
            <!-- AGS -->
            <el-table-column prop="ags" label="AGS" >
                <template slot-scope="scope" >
                    <div style="display:flex; flex-direction:row; justify-content:space-between;">
                        <div v-if="!scope.row.ags.isSet" style="margin-top: 5px;">{{ scope.row.ags.value }}</div>
                        <div v-if="scope.row.ags.isSet" style="width: 120px;">
                            <el-input
                                size="mini"
                                placeholder="AGS"
                                v-model="scope.row.ags.setValue">
                            </el-input>
                        </div>
                        <div style="height: 10px;"></div>
                        <el-button  v-if="!scope.row.ags.isSet" type="primary" size="small" icon="el-icon-edit" @click="scope.row.ags.isSet=!scope.row.ags.isSet">修改</el-button>
                        <div v-if="scope.row.ags.isSet">
                            <el-button  type="success" size="small" icon="el-icon-circle-check-outline" @click="SetAGS(scope.$index, scope.row)">确认</el-button>
                            <el-button  type="info" size="small" icon="el-icon-circle-check-outline" @click="scope.row.ags.isSet=!scope.row.ags.isSet">取消</el-button>
                        </div>
                     </div>
                </template>
            </el-table-column>
            <!-- 精力 -->
            <el-table-column prop="ags" label="精力" >
                <template slot-scope="scope" >
                    <div style="display:flex; flex-direction:row; justify-content:space-between;">
                        <div v-if="!scope.row.JL.isSet" style="margin-top: 5px;">{{ scope.row.JL.value }}</div>
                        <div v-if="scope.row.JL.isSet" style="width: 120px;">
                            <el-input
                                size="mini"
                                placeholder="精力"
                                v-model="scope.row.JL.setValue">
                            </el-input>
                        </div>
                        <div style="height: 10px;"></div>
                        <el-button  v-if="!scope.row.JL.isSet" type="primary" size="small" icon="el-icon-edit" @click="scope.row.JL.isSet=!scope.row.JL.isSet">修改</el-button>
                        <div v-if="scope.row.JL.isSet">
                            <el-button  type="success" size="small" icon="el-icon-circle-check-outline" @click="SetTL(scope.$index, scope.row)">确认</el-button>
                            <el-button  type="info" size="small" icon="el-icon-circle-check-outline" @click="scope.row.JL.isSet=!scope.row.JL.isSet">取消</el-button>
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
                :page-size="pageData.maxNum"
                layout="total, prev, pager, next, jumper"
                :total="pageData.maxCount">
                </el-pagination>
            </div>
        </div>     
    </div>
</template>
<script>
    import {userAll,userUpdate} from "@/api/user";
    export default {
    name: 'UserInfo',
  
    data() {
            return {
                // 用户信息
                userData: [{
                    id: '1',
                    name: '王小虎',
                    //AGS
                    ags:{
                            value: '123', 
                            setValue:'',
                            isSet:false,
                        },
                   
                    //精力
                    JL: {
                            value: '30', 
                            setValue:'',
                            isSet:false,
                        },
                } ],
                //页
                pageData:
                {
                    //第几页
                    curPage:1,
                    //每页最大数量
                    maxNum:12,
                    //最大数量
                    maxCount:0,
                },
                sousuo:'',
            }
        },
    mounted() {
        this.getUerInfo()
    },
    methods: {
        //获取用户信息
        async getUerInfo() {
            let _paget=
            {
                page :this.pageData.curPage,
                size :this.pageData.maxNum,
            }
            if(this.sousuo !="")
            {
                _paget=
                {
                    userName:this.sousuo,
                    page :this.pageData.curPage,
                    size :this.pageData.maxNum,
                }
            }
         
            const data = await userAll(_paget)
            //修改页
            this.pageData.maxCount = data.data.count;
            this.pageData.curPage = data.data.currentPage;
            //刷新信息
            this.userData = [];
            for (let i = 0; i < data.data.data.length; i++) {
                let value ={
                    id:data.data.data[i].userId,
                    name:data.data.data[i].userName,
                    //AGS
                    ags:{
                            value: data.data.data[i].dogCoin, 
                            setValue:'',
                            isSet:false,
                        },
                   
                    //精力
                    JL: {
                            value: data.data.data[i].residueMuscleNum, 
                            setValue:'',
                            isSet:false,
                        },
                }
                this.userData.push(value);
            }
         
        },
        //修改用户信息
        async SetUerInfo(id, _paget) {
          
            console.log(_paget);
            const data = await userUpdate(id,_paget)
            console.log(data);
            this.getUerInfo();
        },
        // 修改AGS
        SetAGS(index, row) {
            if(index, row,this.userData[index].ags.setValue !='')
            {
                let _paget=
                {
                    dogCoin :this.userData[index].ags.setValue,
                }
                this.SetUerInfo(this.userData[index].id,_paget);
            }else
            {
                this.$message.error('修改失败\nAGS为空');
            } 
        },
        // 修改体力
        SetTL(index, row) {
            if(row,this.userData[index].JL.setValue !='')
            {
                let _paget=
                {
                    residueMuscleNum :this.userData[index].JL.setValue,
                }
                this.SetUerInfo(this.userData[index].id,_paget);
            }else
            {
                this.$message.error('修改失败\n体力为空');
            } 
        },
        //跳转页
        HandleCurrentChange(val) {
             this.getUerInfo()
        },
        //搜索
        SouSuo()
        {
            this.getUerInfo()
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
