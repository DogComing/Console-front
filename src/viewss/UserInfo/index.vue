<template>
    <div class="bar">
        <div style="width: 500px;height: 70px;display:flex; flex-direction:row; ">
            <div><el-input placeholder="搜索钱包地址" prefix-icon="el-icon-search" v-model="sousuo1" @input='SouSuo' clearable></el-input></div>
            <div style="width: 20px;" ></div>
            <div><el-input placeholder="搜索名字" prefix-icon="el-icon-search" v-model="sousuo2" @input='SouSuo' clearable></el-input></div>
        </div>
        <!-- 列表 -->
        <el-table :data="userData" border style="width: 100%">
            <el-table-column type="index" label="" align="center" fixed></el-table-column>
            <!-- id -->
            <el-table-column prop="id" label="ID" align="center" width="100px"></el-table-column>
            <!-- 名字 -->
            <el-table-column prop="name" label="名字" align="center" width="100px" fixed></el-table-column>
            <!-- 钱包地址 -->
            <el-table-column  label="钱包地址" align="center"  width="400px" fixed>
                <template slot-scope="scope" >
                     <div style="display:flex; flex-direction:row; justify-content:space-between;">
                        <div style="margin-top: 5px;overflow: hidden;-webkit-line-clamp: 1;-webkit-box-orient: vertical;display: -webkit-box;">{{ scope.row.address }}</div>
                        <el-button type="text" size="small" icon="el-icon-document-copy" @click="copyBtn(scope.row.address)">复制</el-button>
                     </div>
                </template>
            </el-table-column>
             <!-- 开启地图数量 -->
            <el-table-column prop="openMapNum" label="开启地图数量" align="center" width="130px"></el-table-column>
             <!-- 签到天数 -->
            <el-table-column prop="signInDayNum" label="签到天数" align="center" width="100px"></el-table-column>
            <!-- 宠物数量 -->
            <el-table-column prop="dogNum" label="宠物数量" align="center" width="100px"></el-table-column>
            <!-- 珍宝数量 -->
            <el-table-column prop="gemNum" label="珍宝数量" align="center" width="100px"></el-table-column>
            <!-- 胜利场次 -->
            <el-table-column prop="winNum" label="胜利场次" align="center" width="100px"></el-table-column>
            <!-- AGS -->
            <el-table-column prop="ags" label="AGS" align="center" width="290px">
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
            <el-table-column prop="ags" label="精力" align="center" width="290px">
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
            <!-- ASG记录  fixed="right" -->
            <el-table-column  label="ASG记录" align="center" width="130px">
                <template slot-scope="scope" >
                     <el-button  type="success" size="small" icon="el-icon-circle-check-outline" @click="TiaoZhuan('/jilu/asg',{address:scope.row.address})">ASG记录</el-button>
                </template>
            </el-table-column>
            <!-- 消费记录 -->
            <el-table-column  label="消费记录" align="center" width="130px">
                <template slot-scope="scope" >
                     <el-button  type="success" size="small" icon="el-icon-circle-check-outline" @click="TiaoZhuan('/jilu/pay',{address:scope.row.address})">消费记录</el-button>
                </template>
            </el-table-column>
             <!-- 赞助记录 -->
            <el-table-column  label="比赛记录" align="center" width="130px">
                <template slot-scope="scope" >
                     <el-button  type="success" size="small" icon="el-icon-circle-check-outline" @click="TiaoZhuan('/jilu/support',{address:scope.row.address})">比赛记录</el-button>
                </template>
            </el-table-column>
            <!-- 赞助结果记录 -->
            <el-table-column  label="赞助结果记录" align="center" width="130px" >
                <template slot-scope="scope" >
                     <el-button  type="success" size="small" icon="el-icon-circle-check-outline" @click="TiaoZhuan('/jilu/sponsorship',{address:scope.row.address})">赞助结果记录</el-button>
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
                    maxNum:11,
                    //最大数量
                    maxCount:0,
                },
                sousuo1:'',
                sousuo2:'',
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
            if(this.sousuo1 !="")
            {
                _paget['address'] = this.sousuo1;
            }
            if(this.sousuo2 !="")
            {
                 _paget['userName'] = this.sousuo2;
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
                    openMapNum:data.data.data[i].openMapNum,
                    signInDayNum:data.data.data[i].signInDayNum,
                    dogNum:data.data.data[i].dogNum,
                    gemNum:data.data.data[i].gemNum,
                    winNum:data.data.data[i].winNum,
                    address:data.data.data[i].address,
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
                 this.$message({
                message: '修改成功',
                type: 'success'
            });
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
        //翻页
        HandleCurrentChange(val) {
             this.getUerInfo()
                  this.$message({
                message: '翻页成功',
                type: 'success'
            });
        },
        //搜索
        SouSuo()
        {
            this.getUerInfo()
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
        //跳转
        TiaoZhuan(_name,_data)
        {
            // this.$router.push({ name: _name, params: _data });
             this.$router.push({ path: _name, query: _data });
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
