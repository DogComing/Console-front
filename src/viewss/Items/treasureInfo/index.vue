<template>
    <div class="bar">
        <!-- 列表 -->
        <el-table :data="userData" border style="width: 100%">
            <el-table-column type="index" label="" width="50" align="center"></el-table-column>
             <!-- id -->
            <el-table-column prop="id" label="ID" width="50" align="center"></el-table-column>
            <!-- 图片 -->
            <el-table-column prop="ags" label="图片"  width="130" align="center">
                <template slot-scope="scope" >
                     <el-image style="width: 100px; height: 100px" :src="url+scope.row.imag+'.png'"></el-image>
                </template>
            </el-table-column>
            <!-- 名字 -->
            <el-table-column prop="ags" label="名字" align="center">
                <template slot-scope="scope" >
                    <div v-if="!scope.row.name.isSet" style="margin-top: 5px;">{{ scope.row.name.value }}</div>
                    <div v-if="scope.row.name.isSet">
                        <el-input size="mini" placeholder="名字" v-model="scope.row.name.setValue"></el-input>
                    </div>
                    <div style="height: 10px;" ></div>
                    <el-button  v-if="!scope.row.name.isSet" type="primary" size="small" icon="el-icon-edit" @click="scope.row.name.isSet=!scope.row.name.isSet">修改</el-button>
                    <el-button v-if="scope.row.name.isSet" type="success" size="small" icon="el-icon-circle-check-outline" @click="SetPinZhi(scope.$index, scope.row)">确认</el-button>
                    <el-button v-if="scope.row.name.isSet" type="info" size="small" icon="el-icon-circle-check-outline" @click="scope.row.name.isSet=!scope.row.name.isSet">取消</el-button>
                </template>
            </el-table-column>
             <!-- 说明 -->
            <el-table-column prop="ags" label="说明" align="center">
                <template slot-scope="scope" >
                    <div v-if="!scope.row.introduce.isSet" style="margin-top: 5px;overflow: hidden;-webkit-line-clamp: 1;-webkit-box-orient: vertical;display: -webkit-box;">{{ scope.row.introduce.value }}</div>
                    <div v-if="scope.row.introduce.isSet"  >
                        <el-input
                            size="mini"
                            placeholder="说明"
                            v-model="scope.row.introduce.setValue">
                        </el-input>
                    </div>
                    <div style="height: 10px;" ></div>
                    <el-button  v-if="!scope.row.introduce.isSet" type="primary" size="small" icon="el-icon-edit" @click="scope.row.introduce.isSet=!scope.row.introduce.isSet">修改</el-button>
                    <el-button v-if="scope.row.introduce.isSet" type="success" size="small" icon="el-icon-circle-check-outline" @click="SetPinZhi(scope.$index, scope.row)">确认</el-button>
                    <el-button v-if="scope.row.introduce.isSet" type="info" size="small" icon="el-icon-circle-check-outline" @click="scope.row.introduce.isSet=!scope.row.introduce.isSet">取消</el-button>
                </template>
            </el-table-column>
              <!-- 等级 -->
            <el-table-column prop="ags" label="等级" align="center">
                <template slot-scope="scope" >
                    <div v-if="!scope.row.grade.isSet" style="margin-top: 5px;">{{ scope.row.grade.value }}</div>
                    <div v-if="scope.row.grade.isSet"  >
                        <el-input
                            size="mini"
                            placeholder="等级"
                            v-model="scope.row.grade.setValue">
                        </el-input>
                    </div>
                    <div style="height: 10px;" ></div>
                    <el-button  v-if="!scope.row.grade.isSet" type="primary" size="small" icon="el-icon-edit" @click="scope.row.grade.isSet=!scope.row.grade.isSet">修改</el-button>
                    <el-button v-if="scope.row.grade.isSet" type="success" size="small" icon="el-icon-circle-check-outline" @click="SetPinZhi(scope.$index, scope.row)">确认</el-button>
                    <el-button v-if="scope.row.grade.isSet" type="info" size="small" icon="el-icon-circle-check-outline" @click="scope.row.grade.isSet=!scope.row.grade.isSet">取消</el-button>
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
 import {propAll,propUpdate} from "@/api/user";
    export default {
    name: 'UserInfo',
  
    data() {
            return {
                url:"https://sjzxingguangkeji.com:9090/Images/dog/dog/",
                // 用户信息
                userData: [ ],
                //页
                pageData:
                {
                    curPage:1,
                    maxCount:0,
                    maxNum:5,
                }
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
                page :this.pageData.curPage,
                size :this.pageData.maxNum,
            }
            // if(this.sousuo !="")
            // {
            //     _paget=
            //     {
            //         userName:this.sousuo,
            //         page :this.pageData.curPage,
            //         size :this.pageData.maxNum,
            //     }
            // }
            const data = await propAll(_paget)
            //修改页
            this.pageData.maxCount = data.data.count;
            this.pageData.curPage = data.data.currentPage;
            //刷新信息
            this.userData = [];
            for (let i = 0; i < data.data.data.length; i++) {
                let value ={
                    id:data.data.data[i].id,
                    imag:data.data.data[i].imgName,                   
                    //名字
                    name: {
                            value: data.data.data[i].propName, 
                            setValue:'',
                            isSet:false,
                        },
                    //说明
                    introduce:{
                        value: data.data.data[i].propDesc, 
                        setValue:'',
                        isSet:false,
                    },
                    //等级
                    grade:{
                        value: data.data.data[i].grade, 
                        setValue:'',
                        isSet:false,
                    },
                }
                //捕捉类型
                this.userData.push(value);
            }
        },
        //修改配置信息
        async SetDogInfo(id, _paget) {
            await propUpdate(id,_paget)
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
            if(this.userData[index].name.isSet){if(this.userData[index].name.setValue==''){this.$message.error('修改失败\n空');return;}
            else{ _paget['propName']=this.userData[index].name.setValue;}}
            if(this.userData[index].introduce.isSet){if(this.userData[index].introduce.setValue==''){this.$message.error('修改失败\n空');return;}
            else{ _paget['propDesc']=this.userData[index].introduce.setValue;}} 
            if(this.userData[index].grade.isSet){if(this.userData[index].grade.setValue==''){this.$message.error('修改失败\n空');return;}
            else{ _paget['grade']=this.userData[index].grade.setValue;}}
            console.log(_paget);
            this.SetDogInfo(this.userData[index].id,_paget);
        },
        //跳转页
        HandleCurrentChange(val) {
            this.GetUseInfo()
                 this.$message({
                message: '翻页成功',
                type: 'success'
            });
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
