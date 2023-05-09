<template>
    <div class="bar">
       <div style="width: 500px;height: 70px;display:flex; flex-direction:row; ">
            <div><el-input placeholder="搜索钱包地址" prefix-icon="el-icon-search" v-model="sousuo1" @input='SouSuo(1)' clearable></el-input></div>
            <div style="width: 20px;" ></div>
            <div><el-input placeholder="搜索场次号" prefix-icon="el-icon-search" v-model="sousuo2" @input='SouSuo(2)' clearable></el-input></div>
            <div style="width: 20px;" ></div>
            <div v-if="sousuo2!=''"><el-select  v-model="sousuo3" placeholder="全部" @change='SouSuo' ><el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option></el-select></div>
        </div>
        <el-table :data="juluData" border style="width: 100%" :show-summary="sousuo2!='' || sousuo1!=''" >
            <el-table-column type="index" label="" width="50"></el-table-column>
            <!-- 场次号 -->
            <el-table-column  label="场次号" align="center"  width="250" >
                <template slot-scope="scope" >
                     <div style="display:flex; flex-direction:row; justify-content:space-between;">
                        <div style="margin-top: 5px;overflow: hidden;-webkit-line-clamp: 1;-webkit-box-orient: vertical;display: -webkit-box;">{{ scope.row.gameNum }}</div>
                        <el-button type="text" size="small" icon="el-icon-document-copy" @click="copyBtn(scope.row.gameNum)">复制</el-button>
                     </div>
                </template>
            </el-table-column>
              <!-- 赞助对象 -->
            <el-table-column  label="赞助人" align="center" width="150">
                <template slot-scope="scope" >
                    <div style="margin-top: 5px;">{{ scope.row.userName }}</div>
                </template>
            </el-table-column>
            <!-- 钱包地址 -->
            <el-table-column  label="钱包地址" align="center"  width="200px">
                <template slot-scope="scope" >
                     <div style="display:flex; flex-direction:row; justify-content:space-between;">
                        <div style="margin-top: 5px;overflow: hidden;-webkit-line-clamp: 1;-webkit-box-orient: vertical;display: -webkit-box;">{{ scope.row.address }}</div>
                        <el-button type="text" size="small" icon="el-icon-document-copy" @click="copyBtn(scope.row.address)">复制</el-button>
                     </div>
                </template>
            </el-table-column>
             <!-- 赞助对象 -->
            <el-table-column  label="赞助对象" align="center" width="160">
                <template slot-scope="scope" >
                    <div style="margin-top: 5px;">{{ scope.row.dogNum }}</div>
                </template>
            </el-table-column>
            <!-- 赞助类型 -->
            <el-table-column  label="赞助类型" align="center">
                <template slot-scope="scope" >
                    <div style="margin-top: 5px;">{{ GetTypeStr(scope.row.stakeType) }}</div>
                </template>
            </el-table-column>
            <!-- 赞助结果 -->
            <el-table-column  label="赞助结果" align="center" width="230">
                <template slot-scope="scope" >
                    <div style="margin-top: 5px;">{{ scope.row.awardDesc }}</div>
                </template>
            </el-table-column>
             <!-- 倍率 -->
            <el-table-column  label="倍率" align="center" width="100">
                <template slot-scope="scope" >
                    <div style="margin-top: 5px;">{{ scope.row.odds }}</div>
                </template>
            </el-table-column>
            <!-- 赞助数量 -->
            <el-table-column  label="赞助数量(注)" prop="pourNum" align="center" width="110">
                <!-- <template slot-scope="scope" >
                    <div style="margin-top: 5px;">{{ scope.row.pourNum }}</div>
                </template> -->
            </el-table-column>
            <!-- 获得ASG -->
            <el-table-column  label="获得ASG" align="center" prop="money" >
                <!-- <template slot-scope="scope" >
                    <div style="margin-top: 5px;">{{ scope.row.money }}</div>
                </template> -->
            </el-table-column>
            <!-- 时间 -->
            <el-table-column  label="时间" align="center" width="150">
                <template slot-scope="scope" >
                    <div style="margin-top: 5px;">{{ timestampToTime(scope.row.createTime) }}</div>
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
 import {logAward} from "@/api/user";
    export default {
    name: 'UserInfo',
    data() {
            return {
                sousuo1:'',
                sousuo2:'',
                sousuo3:0,
                dialogVisible:false,
                curType:1,
                curIndex:0,
                titleName:"",
               //地图信息
                juluData: [ 
                ],
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
                options: 
                [
                {
                    value: 0,
                    label: '全部'
                }, 
                {
                    value: 1,
                    label: '1号'
                }, 
                {
                    value: 2,
                    label: '2号'
                }, 
                {
                    value: 3,
                    label: '3号'
                }, 
                {
                    value: 4,
                    label: '4号'
                }, 
                {
                    value: 5,
                    label: '5号'
                }, 
                {
                    value: 6,
                    label: '6号'
                }
                ],
            }
    },
    mounted() {
        this.GetUseInfo()
    },
    created() {
        if (this.$route.query.address)
        {
            this.sousuo1 = this.$route.query.address;
        }
        if (this.$route.query.gameNum)
        {
            this.sousuo2 = this.$route.query.gameNum;
            if (this.$route.query.hao)
            {
                this.sousuo3 = this.$route.query.hao;
            }
        }
        
    },
    methods: {
        //获取饲料配置
        async GetUseInfo() {
            this.pageData.maxNum =11;
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
                _paget['gameNum'] = this.sousuo2;
                this.pageData.curPage = 1;
                this.pageData.maxNum =10000;
                _paget['page'] = this.pageData.curPage;
                _paget['size'] = this.pageData.maxNum;
            }
            const data = await logAward(_paget)            
            var that = this;
            if(this.sousuo3 != 0 && this.sousuo2!='')
            {
                this.juluData = [];
                data.data.data.forEach(function(element) {
                    if(that.IsHao(element.dogNum))
                    {
                        that.juluData.push(element);
                    }
                });
            }else
            {
                //刷新信息
                this.juluData = data.data.data;
            }
            //修改页
            this.pageData.maxCount = data.data.count;
            this.pageData.curPage = data.data.currentPage;
             
        },
          //跳转页
        HandleCurrentChange(val) {
            this.GetUseInfo()
        },
        //复制
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
        //搜索
        SouSuo()
        {
            this.GetUseInfo()
        },
        timestampToTime(nS)
        {
            return new Date(parseInt(nS) ).toLocaleString().replace(/:\d{1,2}$/,' '); 
        },
        //获得中文赞助类型
        GetTypeStr(_type)
        {
            switch(_type)
            {
                case 1 :
                return '独赢';
                case 2 :
                return '名次';
                case 3 :
                return '包围';
            }
        },
        //是不是有这个号
        IsHao(str)
        {
            if(this.sousuo3 == 0)
            {
                 return true
            }
            if(str.search(this.sousuo3)== -1)
            {
                return false
            }else{
                return true
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
