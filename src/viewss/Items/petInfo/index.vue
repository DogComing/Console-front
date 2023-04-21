<template>
    <div class="bar">
        <!-- 列表 -->
        <el-table :data="dogData" border style="width: 100%">
            <el-table-column type="index" label="" width="50"></el-table-column>
             <!-- id -->
            <el-table-column prop="id" label="ID" width="40"></el-table-column>
            <!-- 图片 -->
            <el-table-column prop="ags" label="图片"  width="130">
                <template slot-scope="scope" >
                     <el-image style="width: 100px; height: 100px" :src="url+scope.row.imag+'.png'"  ></el-image>
                </template>
            </el-table-column>
            <!-- 品质 -->
            <el-table-column prop="ags" label="品质">
                <template slot-scope="scope" >
                    <div v-if="!scope.row.quality.isSet" style="margin-top: 5px;">{{ scope.row.quality.value }}</div>
                    <div v-if="scope.row.quality.isSet" >
                        <el-input size="mini" placeholder="品质" v-model="scope.row.quality.setValue"></el-input>
                    </div>
                    <div style="height: 10px;" ></div>
                    <el-button  v-if="!scope.row.quality.isSet" type="primary" size="small" icon="el-icon-edit" @click="scope.row.quality.isSet=!scope.row.quality.isSet">修改</el-button>
                    <el-button v-if="scope.row.quality.isSet" type="success" size="small" icon="el-icon-circle-check-outline" @click="SetPinZhi(scope.$index, scope.row)">确认</el-button>
                    <el-button v-if="scope.row.quality.isSet" type="info" size="small" icon="el-icon-circle-check-outline" @click="scope.row.quality.isSet=!scope.row.quality.isSet">取消</el-button>
                </template>
            </el-table-column>
            <!-- 名称 -->
            <el-table-column prop="ags" label="名称">
                <template slot-scope="scope" >
                    <div v-if="!scope.row.name.isSet" style="margin-top: 5px;">{{ scope.row.name.value }}</div>
                    <div v-if="scope.row.name.isSet"   >
                        <el-input size="mini" placeholder="名称" v-model="scope.row.name.setValue"></el-input>
                    </div>
                    <div style="height: 10px;" ></div>
                    <el-button  v-if="!scope.row.name.isSet" type="primary" size="small" icon="el-icon-edit" @click="scope.row.name.isSet=!scope.row.name.isSet">修改</el-button>
                    <el-button  v-if="scope.row.name.isSet" type="success" size="small" icon="el-icon-circle-check-outline" @click="SetPinZhi(scope.$index, scope.row)">确认</el-button>
                    <el-button  v-if="scope.row.name.isSet" type="info" size="small" icon="el-icon-circle-check-outline" @click="scope.row.name.isSet=!scope.row.name.isSet">取消</el-button>
                </template>
            </el-table-column>
             <!-- 品种 -->
            <el-table-column prop="ags" label="品种">
                <template slot-scope="scope" >
                    <div v-if="!scope.row.varieties.isSet" style="margin-top: 5px;">{{ scope.row.varieties.value }}</div>
                    <div v-if="scope.row.varieties.isSet"  >
                        <el-input
                            size="mini"
                            placeholder="品种"
                            v-model="scope.row.varieties.setValue">
                        </el-input>
                    </div>
                    <div style="height: 10px;" ></div>
                    <el-button  v-if="!scope.row.varieties.isSet" type="primary" size="small" icon="el-icon-edit" @click="scope.row.varieties.isSet=!scope.row.varieties.isSet">修改</el-button>
                    <el-button v-if="scope.row.varieties.isSet" type="success" size="small" icon="el-icon-circle-check-outline" @click="SetPinZhi(scope.$index, scope.row)">确认</el-button>
                    <el-button v-if="scope.row.varieties.isSet" type="info" size="small" icon="el-icon-circle-check-outline" @click="scope.row.varieties.isSet=!scope.row.varieties.isSet">取消</el-button>
                </template>
            </el-table-column>
            <!-- 初始战力 -->
            <el-table-column prop="ags" label="初始战力">
                <template slot-scope="scope" >
                    <div v-if="!scope.row.power.isSet" style="margin-top: 5px;">{{ scope.row.power.value }}</div>
                    <div v-if="scope.row.power.isSet"  >
                        <el-input
                            size="mini"
                            placeholder="初始战力"
                            v-model="scope.row.power.setValue">
                        </el-input>
                    </div>
                    <div style="height: 10px;" ></div>
                    <el-button  v-if="!scope.row.power.isSet" type="primary" size="small" icon="el-icon-edit" @click="scope.row.power.isSet=!scope.row.power.isSet">修改</el-button>
                    <el-button v-if="scope.row.power.isSet" type="success" size="small" icon="el-icon-circle-check-outline" @click="SetPinZhi(scope.$index, scope.row)">确认</el-button>
                    <el-button v-if="scope.row.power.isSet" type="info" size="small" icon="el-icon-circle-check-outline" @click="scope.row.power.isSet=!scope.row.power.isSet">取消</el-button>
                </template>
            </el-table-column>
             <!-- 成长次数 -->
            <el-table-column prop="ags" label="成长次数">
                <template slot-scope="scope" >
                    <div v-if="!scope.row.growth.isSet" style="margin-top: 5px;">{{ scope.row.growth.value }}</div>
                    <div v-if="scope.row.growth.isSet"  >
                        <el-input
                            size="mini"
                            placeholder="成长次数"
                            v-model="scope.row.growth.setValue">
                        </el-input>
                    </div>
                    <div style="height: 10px;" ></div>
                    <el-button  v-if="!scope.row.growth.isSet" type="primary" size="small" icon="el-icon-edit" @click="scope.row.growth.isSet=!scope.row.growth.isSet">修改</el-button>
                    <el-button v-if="scope.row.growth.isSet" type="success" size="small" icon="el-icon-circle-check-outline" @click="SetPinZhi(scope.$index, scope.row)">确认</el-button>
                    <el-button v-if="scope.row.growth.isSet" type="info" size="small" icon="el-icon-circle-check-outline" @click="scope.row.growth.isSet=!scope.row.growth.isSet">取消</el-button>
                </template>
            </el-table-column>
             <!-- 天赋 -->
            <el-table-column prop="ags" label="天赋">
                <template slot-scope="scope" >
                    <div v-if="!scope.row.talent.isSet" style="margin-top: 5px;">{{ scope.row.talent.value }}</div>
                    <div v-if="scope.row.talent.isSet"  >
                        <el-input
                            size="mini"
                            placeholder="天赋"
                            v-model="scope.row.talent.setValue">
                        </el-input>
                    </div>
                    <div style="height: 10px;" ></div>
                    <el-button  v-if="!scope.row.talent.isSet" type="primary" size="small" icon="el-icon-edit" @click="scope.row.talent.isSet=!scope.row.talent.isSet">修改</el-button>                      
                    <el-button  v-if="scope.row.talent.isSet" type="success" size="small" icon="el-icon-circle-check-outline" @click="SetPinZhi(scope.$index, scope.row)">确认</el-button>
                    <el-button  v-if="scope.row.talent.isSet" type="info" size="small" icon="el-icon-circle-check-outline" @click="scope.row.talent.isSet=!scope.row.talent.isSet">取消</el-button>
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
    import {dogAll,dogUpdate} from "@/api/user";
    export default {
    name: 'UserInfo',
  
    data() {
            return {
                url:"https://sjzxingguangkeji.com:9090/Images/dog/dog/",
                // 用户信息
                dogData: [ ],
                //页
                pageData:
                {
                    curPage:1,
                    maxCount:0,
                    maxNum:12,
                }
            }
        },
    mounted() {
        this.GetDogInfo()
    },
    methods: {
         //获取狗狗配置
        async GetDogInfo() {
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
            const data = await dogAll(_paget)
            //修改页
            this.pageData.maxCount = data.data.count;
            this.pageData.curPage = data.data.currentPage;
            //刷新信息
            this.dogData = [];
            for (let i = 0; i < data.data.data.length; i++) {
                let value ={
                    id:data.data.data[i].id,
                    imag:data.data.data[i].imgName,
                   //品质
                    quality:{
                            value: data.data.data[i].dogGrade, 
                            setValue:'',
                            isSet:false,
                        },
                    //名称
                    name: {
                            value: data.data.data[i].dogName, 
                            setValue:'',
                            isSet:false,
                        },
                    //品种
                    varieties: {
                            value: data.data.data[i].dogBreed, 
                            setValue:'',
                            isSet:false,
                        },
                    //初始战力
                    power:{
                            value: data.data.data[i].initialFightingNum, 
                            setValue:'',
                            isSet:false,
                        },
                    //成长次数
                    growth:{
                        value: data.data.data[i].growUpNum, 
                        setValue:'',
                        isSet:false,
                    },
                     //天赋
                    talent:{
                            value: data.data.data[i].inbornNum, 
                            setValue:'',
                            isSet:false,
                        },
                }
                this.dogData.push(value);
            }
        },
        //修改配置信息
        async SetDogInfo(id, _paget) {
            await dogUpdate(id,_paget)
            this.GetDogInfo();
        },
        // 修改配置
        SetPinZhi(index, row) {
            let _paget=
            {                
            }
            if(this.dogData[index].quality.isSet){if(this.dogData[index].quality.setValue==''){this.$message.error('修改失败\n空');return;}
            else{ _paget['dogGrade']=this.dogData[index].quality.setValue;}}
            if(this.dogData[index].name.isSet){if(this.dogData[index].name.setValue==''){this.$message.error('修改失败\n空');return;}
            else{ _paget['dogName']=this.dogData[index].name.setValue;}}
            if(this.dogData[index].varieties.isSet){if(this.dogData[index].varieties.setValue==''){this.$message.error('修改失败\n空');return;}
            else{ _paget['dogBreed']=this.dogData[index].varieties.setValue;}} 
            if(this.dogData[index].power.isSet){if(this.dogData[index].power.setValue==''){this.$message.error('修改失败\n空');return;}
            else{ _paget['initialFightingNum']=this.dogData[index].power.setValue;}} 
            if(this.dogData[index].growth.isSet){if(this.dogData[index].growth.setValue==''){this.$message.error('修改失败\n空');return;}
            else{ _paget['growUpNum']=this.dogData[index].growth.setValue;}} 
            if(this.dogData[index].talent.isSet){if(this.dogData[index].talent.setValue==''){this.$message.error('修改失败\n空');return;}
            else{ _paget['inbornNum']=this.dogData[index].talent.setValue;}}
            console.log(_paget);
            this.SetDogInfo(this.dogData[index].id,_paget);
        },
        //跳转页
        HandleCurrentChange(val) {
          this.GetDogInfo()
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
