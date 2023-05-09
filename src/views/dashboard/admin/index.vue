<template>
  <div class="dashboard-editor-container">
    <panel-group />
    <el-row style="background:#fff;padding:16px 16px 16px 16px;margin-bottom:32px;" class="card-panel-text">
      <!-- <div>
        <div>世界状态： {{cur_word}}</div>
        <div style="height: 20px;"></div>
        <div style="display:flex; flex-direction:row; justify-content:start;">
          <div>当前场次： {{cur_gameNum}} </div>
          <div style="width: 10px;"></div>
          <el-button type="text" size="small" icon="el-icon-document-copy" @click="copyBtn(cur_gameNum)" style="margin-top: -8px;">复制</el-button>
        </div>
         <div style="height: 20px;"></div>
      </div> -->
      
      <div>
        <div style="display: flex;flex-direction:row">
          <svg-icon style="  color: #36a3f7;" icon-class="table" />
          <div style="font-weight: bold;  line-height: 18px;   color: rgb(0, 0, 0);  font-size: 20px;margin-left: 10px;">比赛记录</div>
        </div>
        
        <div style="height: 20px;"></div>
        <div style="width: 500px;height: 50px;display:flex; flex-direction:row; ">
            <div><el-input placeholder="搜索场次号" prefix-icon="el-icon-search" v-model="sousuo" @input='SouSuo' clearable></el-input></div>
        </div>
        <template> <el-table :data="bisaiData" style="width: 100%" border>
          <el-table-column type="index" label="" width="50" align="center" ></el-table-column>
          <el-table-column  label="状态" width="80" align="center">
            <template slot-scope="scope" >
                <div style="margin-top: 5px;">{{ typeStr(scope.row.type) }}</div>
            </template>
          </el-table-column>
          <!-- 场次号 -->
          <el-table-column  label="场次号" width="280">
              <template slot-scope="scope" >
                  <div style="display:flex; flex-direction:row; justify-content:space-between;">
                      <div style="margin-top: 5px;overflow: hidden;-webkit-line-clamp: 1;-webkit-box-orient: vertical;display: -webkit-box;">{{ scope.row.gameNum }}</div>
                      <el-button type="text" size="small" icon="el-icon-document-copy" @click="copyBtn(scope.row.gameNum)">复制</el-button>
                  </div>
              </template>
          </el-table-column>
          <el-table-column  label="排名"  align="center">
              <template slot-scope="scope" >
                  <div style="margin-top: 5px;">{{ scope.row.paiming }}</div>
              </template>
          </el-table-column>
          <!-- 流水 -->
          <el-table-column  label="流水" width="180" align="center">
              <template slot-scope="scope" >
                  <div style="margin-top: 5px; color: rgb(0, 255, 0);" v-if="scope.row.yinli>=0">+{{scope.row.yinli}}</div>
                  <div style="margin-top: 5px; color: rgb(255, 0, 0);" v-if="scope.row.yinli<0">{{scope.row.yinli}}</div>
              </template>
          </el-table-column>
            <!-- 时间 -->
          <el-table-column  label="时间" width="280" align="center">
              <template slot-scope="scope" >
                  <div style="margin-top: 5px;">{{ timestampToTime(scope.row.createTime) }}</div>
              </template>
          </el-table-column>
        <!-- 赞助记录 -->
        <el-table-column  label="赞助记录" width="150"  align="center" >
            <template slot-scope="scope" >
                <el-button  type="primary" size="small" icon="el-icon-circle-check-outline" @click="TiaoZhuan('/jilu/sponsorship',{gameNum:scope.row.gameNum})">赞助记录</el-button>
            </template>
        </el-table-column>
        <!-- 详情 -->
        <el-table-column type="expand" label="详情" width="50">
          <template slot-scope="scope"> 
            <el-table :data="scope.row.tableData" style="width: 100%" border>
              <el-table-column type="index" label="号" width="80" align="center"></el-table-column>
              <el-table-column prop="name" label="玩家名字"  align="center"></el-table-column>
              <el-table-column prop="fighting" label="战力"  align="center"></el-table-column>
              <el-table-column  label="排名"  align="center">
                <template slot-scope="scope" >
                    <div style="margin-top: 5px;">{{ scope.row.paiming }}</div>
                </template>
              </el-table-column>
              <el-table-column  label="赞助详情" align="center" width="130px" >
                  <template slot-scope="scope" >
                      <el-button  type="primary" size="small" icon="el-icon-circle-check-outline" @click="TiaoZhuan('/jilu/sponsorship',{ gameNum:scope.row.gameNum,hao:(scope.$index+1)})">{{(scope.$index+1)}}号赞助详情</el-button>
                  </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        </el-table></template>
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
    </el-row>
  </div>
</template>

<script>
 
import PanelGroup from './components/PanelGroup'
import {logSupport,logAward} from "@/api/user";
export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
  },
  data() {
    return {
      sousuo:'',
      cur_word:'比赛中',
      cur_gameNum:"20230423202416001919172",
      juluData:[],
      //比赛列表
      bisaiData:[
      ],
       //页
      pageData:
      {
          //第几页
          curPage:1,
          //每页最大数量
          maxNum:5,
          //最大数量
          maxCount:0,
      },
    }
  },
  mounted() {
    this.GetUseInfo()

  },
  methods: {
  
    async GetUseInfo() {
            let _paget=
            {
                page :this.pageData.curPage,
                size :this.pageData.maxNum*6,                
            }
            const data = await logSupport(_paget)
            //刷新信息
            this.juluData = data.data.data;
            this.bisaiData = [];
            let that = this;
            for(var i=0; i<that.juluData.length;i+=6)
            {
              let value ={
                gameNum:that.juluData[i].gameNum,
                createTime:that.juluData[i].createTime,
                type:that.juluData[i].isReal,
            
              }
              //排名
              for(var w = 1; w<7;w++)
              {
                for(var q = 0; q<6;q++)
                {
                  if( that.juluData[i+q].ranking == w)
                  {
                    if(value["paiming"])
                    {
                      value["paiming"] = value["paiming"]+'-'+that.juluData[i+q].dogNumber;
                    }else
                    {
                      value["paiming"] =that.juluData[i+q].dogNumber ;
                    }
                  }
                }
                //比赛狗狗详情服务器是倒叙
                let listDog = [];
                for(var q = 5; q>-1;q--)
                {
                    let dogData ={}
                    dogData["name"] =  that.juluData[i+q].userName;
                    dogData["fighting"] =  that.juluData[i+q].fightingNum;
                    dogData["paiming"] =  that.juluData[i+q].ranking;
                    dogData["gameNum"] =  that.juluData[i+q].gameNum;
                    listDog.push(dogData);
                }
                value['tableData'] = listDog;
              }
             
              //流水
              let _paget1=
              {
                  page :1,
                  size :10000,
                  gameNum :that.juluData[i].gameNum,
              }
              const liushui = await logAward(_paget1)
              let num = 0;
              liushui.data.data.forEach(function(element) {
                  //注                     //赢得钱 
                num += element.pourNum * 100 - element.money
              });
              value["yinli"] = num;

               that.bisaiData.push(value);
            }
            //修改页
            this.pageData.maxCount = data.data.count/6;
            this.pageData.curPage = data.data.currentPage;
    },
    TiaoZhuan(_name,_data)
    {
        // this.$router.push({ name: _name, params: _data });
          this.$router.push({ path: _name, query: _data });
    },
    timestampToTime(nS)
    {
        return new Date(parseInt(nS) ).toLocaleString().replace(/:\d{1,2}$/,' '); 
    },
    typeStr(_type)
    {
      switch(_type)
      {
        case 1:
          return '已结束';
        case 2:
          return '押注中';
        case 3:
          return '比赛中';
        case 4:
          return '排队中';
      }
      return '未知状态';
      
    },
    //搜索
    SouSuo()
    {
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
  }
}
</script>

<style lang="scss" scoped>
.card-panel-text {
  
  font-weight: bold;
  line-height: 18px;
  
  color: rgba(0, 0, 0, 0.45);
  font-size: 16px;
  margin-bottom: 12px;
}
.dashboard-editor-container {
  
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
   
  }
}
.pagination
{
    
    display:flex;
    justify-content: center;
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
