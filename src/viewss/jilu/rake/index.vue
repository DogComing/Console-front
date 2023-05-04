<template>
    <div class="bar">
        <div style="width: 200px;height: 50px;">
            <!-- <el-input placeholder="搜索用户名字" prefix-icon="el-icon-search" v-model="sousuo" @input= 'SouSuo'></el-input> -->
            <el-input placeholder="搜索钱包地址" prefix-icon="el-icon-search" v-model="sousuo" @input= 'SouSuo' clearable></el-input>
        </div>
        <el-table :data="juluData" border style="width: 100%">
            <el-table-column type="index" label="" width="50"></el-table-column>
            <!-- 名字 -->
            <el-table-column  label="名字" align="center">
                <template slot-scope="scope" >
                    <div style="margin-top: 5px;">{{ scope.row.userName }}</div>
                </template>
            </el-table-column>
            <!-- 钱包地址 -->
            <el-table-column  label="钱包地址" align="center"  width="400px">
                <template slot-scope="scope" >
                     <div style="display:flex; flex-direction:row; justify-content:space-between;">
                        <div style="margin-top: 5px;overflow: hidden;-webkit-line-clamp: 1;-webkit-box-orient: vertical;display: -webkit-box;">{{ scope.row.address }}</div>
                        <el-button type="text" size="small" icon="el-icon-document-copy" @click="copyBtn(scope.row.address)">复制</el-button>
                     </div>
                </template>
            </el-table-column>
            <!-- 消耗方式 -->
            <el-table-column  label="ASG" align="center">
                <template slot-scope="scope" >
                    <div style="margin-top: 5px;">返佣:{{ scope.row.num }} ASG</div>
                </template>
            </el-table-column>
             <!-- 消耗详情 -->
            <el-table-column  label="消耗详情" align="center">
                <template slot-scope="scope" >
                    <div style="margin-top: 5px;">{{ scope.row.remarks }}</div>
                </template>
            </el-table-column>
                <!-- 时间 -->
            <el-table-column  label="时间" align="center">
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
 import {logRake} from "@/api/user";
    export default {
    name: 'UserInfo',
    
    data() {
            return {
                sousuo:'',
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
            }
        },
    mounted() {
        this.GetUseInfo()
    },
     created() {
        if (!this.$route.query.address) return;
        this.sousuo = this.$route.query.address;
    },
    methods: {
        //获取饲料配置
        async GetUseInfo() {
            let _paget=
            {
                page :this.pageData.curPage,
                size :this.pageData.maxNum,                
            }
            if(this.sousuo !="")
            {
                _paget=
                {
                    address:this.sousuo,
                    page :this.pageData.curPage,
                    size :this.pageData.maxNum,
                }
            }
            const data = await logRake(_paget)
            console.log(data.data.data)
            //刷新信息
            this.juluData = data.data.data;
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
