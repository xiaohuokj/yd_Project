<template>
  <div class="wrap-main" :style="{height: tableHeight}">
    <cui-table  ref="accountTable" :tableConfigs="tableConfigs">
      <template slot="operate" slot-scope="scope">
        <el-button type="text"  size="small" @click="editDalog(scope.row)">处理</el-button>
      </template>
      <template slot="issueNumber" slot-scope="scope">
        <span>{{scope.row.issueNumber}}</span>
        <span v-if="scope.row.isOverTime==1"><el-tag type="danger" color="#fff" :hit=true size="mini">超时</el-tag></span>
        <span v-if="scope.row.isReissued==1"><el-tag type="danger" color="#fff" :hit=true size="mini">重办</el-tag></span></span>
      </template>
      //判断问题来源
      <template slot="source" slot-scope="scope">
        <span v-if='scope.row.source==1'>政府监察</span>
        <span v-if='scope.row.source==2'>公众号投诉</span>
        <span v-if='scope.row.source==3'>城管派件</span>
        <span v-if='scope.row.source==4'>市民热线</span>
        <span v-if='scope.row.source==6'>上级交办</span>
        <span v-if='scope.row.source==5'>其他</span>
      </template>
      <template slot="reportTime" slot-scope="scope">
        <span>{{moment(scope.row.reportTime).format("YYYY-MM-DD HH:mm")}}</span>
      </template>
      <template slot="processTime" slot-scope="scope">
        <span>{{moment(scope.row.processTime).format("YYYY-MM-DD HH:mm")}}</span>
      </template>
      <template slot="primaryClassification" slot-scope="scope">
        <span>{{scope.row.primaryClassification}}-{{scope.row.secondClassification}}</span>
      </template>
      <template slot="timeLimit" slot-scope="scope">
        <span>{{scope.row.timeLimit}} 小时</span>
      </template>
      <template slot="processerDuration" slot-scope="scope">
        <span v-if="scope.row.isOverTime==1" class="overtime_color">
          <span v-if="parseInt(parseFloat(scope.row.processerDuration/1000/60/60/24))>0">{{parseInt(parseFloat(scope.row.processerDuration/1000/60/60/24))}}天</span>
          <span v-if="parseInt(parseFloat(scope.row.processerDuration/1000/60/60-(24*parseInt(parseFloat(scope.row.processerDuration/1000/60/60/24)))))>0">{{parseInt(parseFloat(scope.row.processerDuration/1000/60/60-(24*parseInt(parseFloat(scope.row.processerDuration/1000/60/60/24)))))}}小时</span>
          <span v-if="parseInt(parseFloat(scope.row.processerDuration/1000/60-(24*60*parseInt(parseFloat(scope.row.processerDuration/1000/60/60/24)))-(60*parseInt(parseFloat(scope.row.processerDuration/1000/60/60-(24*parseInt(parseFloat(scope.row.processerDuration/1000/60/60/24))))))))>0">{{parseInt(parseFloat(scope.row.processerDuration/1000/60-(24*60*parseInt(parseFloat(scope.row.processerDuration/1000/60/60/24)))-(60*parseInt(parseFloat(scope.row.processerDuration/1000/60/60-(24*parseInt(parseFloat(scope.row.processerDuration/1000/60/60/24))))))))}}分钟</span>
        </span>
        <span v-else>
          <span v-if="parseInt(parseFloat(scope.row.processerDuration/1000/60/60/24))>0">{{parseInt(parseFloat(scope.row.processerDuration/1000/60/60/24))}}天</span>
          <span v-if="parseInt(parseFloat(scope.row.processerDuration/1000/60/60-(24*parseInt(parseFloat(scope.row.processerDuration/1000/60/60/24)))))>0">{{parseInt(parseFloat(scope.row.processerDuration/1000/60/60-(24*parseInt(parseFloat(scope.row.processerDuration/1000/60/60/24)))))}}小时</span>
          <span v-if="parseInt(parseFloat(scope.row.processerDuration/1000/60-(24*60*parseInt(parseFloat(scope.row.processerDuration/1000/60/60/24)))-(60*parseInt(parseFloat(scope.row.processerDuration/1000/60/60-(24*parseInt(parseFloat(scope.row.processerDuration/1000/60/60/24))))))))>0">{{parseInt(parseFloat(scope.row.processerDuration/1000/60-(24*60*parseInt(parseFloat(scope.row.processerDuration/1000/60/60/24)))-(60*parseInt(parseFloat(scope.row.processerDuration/1000/60/60-(24*parseInt(parseFloat(scope.row.processerDuration/1000/60/60/24))))))))}}分钟</span>
          <span v-else>0分钟</span>
        </span>
      </template>

      <!--高级查询-->
      <el-form ref="searchForm" :model="searchForm" :inline="true" class="demo-form-inline" slot="cuiTableAdvQuery">
        <el-row :gutter="24">
          <el-form-item label="事件编号">
            <el-input v-model="tableConfigs.params.issueNumber" class="inputClass"></el-input>
          </el-form-item>
          <el-form-item label="事件来源">
            <el-select v-model="tableConfigs.params.sourceList" filterable  placeholder="请选择"  clearable>
              <el-option v-for="item in sourceList"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上报时间" class="dateClossClass">
            <el-date-picker class="dateTimeClass"
              v-model="dateTime"
              :clearable=false
              type="daterange"
              :picker-options="pickerOptions2"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              size="small"
            >
            </el-date-picker>
          </el-form-item>
        </el-row>
        <el-row :gutter="24">
          <el-form-item label="所属项目">
            <el-select v-model="tableConfigs.params.projectId" placeholder="请选择" filterable  clearable>
              <el-option v-for="item in projectList"
                         :key="item.projectId"
                         :label="item.projectName"
                         :value="item.projectId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="事件类型" class="cascade-item">
            <el-cascader class="sourceSelect versionSelect"
               placeholder="可输入关键词进行搜索"
               :options="versionsList"
               filterable
               separator="-"
               :clearable="true"
               v-model="versions"
               expand-trigger = "hover"
            ></el-cascader>
          </el-form-item>
          <el-form-item >
            <el-checkbox v-model="isOverTime">超时</el-checkbox>
            <el-checkbox v-model="isReissued">重办</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="searchF">查询</el-button>
            <el-button  size="small" @click="clearList">清除</el-button>
          </el-form-item>
        </el-row>
      </el-form>
      <!--end高级查询-->
      <div slot="cuiTableBtn">
        <el-button size="mini" @click="reportIssue"><i class="el-icons el-icon-plus"></i>上报</el-button>
        <el-button size="mini" @click="refresh"><i class="el-icons el-icon-refresh"></i>刷新</el-button>
      </div>
    </cui-table>
  </div>
</template>
<script>

  import {issuesInfoPageList,projectsList,standardVersions} from "@/libs/api"
  import Util from '@/libs/util';
  import bus from '@/libs/bus.js'
  import axios from 'axios'
  export default{
    inject:['statusTotal'],
    components: {
    },
    data(){
      return {
        isReissued:false,
        isOverTime:false,
        versions:[],
        sourceList: [{//事件来源
          id:1,
          name: '环卫监察'
        },{
          id:2,
          name: '公众号'
        },{
          id:3,
          name: '城管派件'
        },{
          id:4,
          name: '市民热线'
        },{
          id:6,
          name: '上级交办'
        },{
          id:5,
          name: '其他'
        }],
        formLabelWidth: '100px',
        tableHeight:'700px',
        searchForm:{
          name:'fff',
          accountType:[{id:1,name:"1111",id:2,name:"22222"}],
          statusa :[{id:1,name:"1111",id:2,name:"22222"}],
          account:''
        },
        dateTime:'',//日期
        pickerOptions2: {//日期快速搜索
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        tableConfigs:{//table表格数据
          url:'/supervise/issues/info/page',
          isShowSimQuery:true,//是否显示简单查询
          isShowAdvQuery:true,//是否显示复杂查询
          isShowFilter:false,//是否显示数据设置,
          simPlaceholder:'可输入事件编号/来源/描述/位置/项目/类型进行搜索',//简单查询输入提示
          simSearchParam:'searchable',//简单查询参数
          params:{
            issueNumber:'',
            sourceList:'',
            startTime:'',
            endTime:'',
            projectId:'',
            standard:'',
            statusList:2,
            isOverTime:'',
            isReissued:''
          },
          columns:[
            {
              prop:'issueNumber',
              label:'事件编号',
              colShow:true,
              scopedSlot:'issueNumber',
              width:200
            },
            {
              prop:'source',
              label:'来源',
              colShow:true,
              scopedSlot:'source',
            },
            {
              prop:'reportTime',
              label:'上报时间',
              colShow:true,
              scopedSlot:'reportTime',
            },
            {
              prop:'processTime',
              label:'反馈时间',
              colShow:true,
              scopedSlot:'processTime',
            },
            {
              prop:'description',
              label:'问题描述',
              colShow:true
            },
            {
              prop:'address',
              label:'位置',
              colShow:true
            },
            {
              prop:'projectName',
              label:'所属项目',
              colShow:true
            },
            {
              prop:'primaryClassification',
              label:'事件类型',
              colShow:true,
              scopedSlot:'primaryClassification',
            },
            {
              prop:'timeLimit',
              label:'处理时限',
              colShow:true,
              scopedSlot:'timeLimit'
            },
            {
              prop:'processerDuration',
              label:'已用时',
              colShow:true,
              scopedSlot:'processerDuration'
            },
            {
              label:'操作',
              fixed:'right',
              scopedSlot:'operate',
              colShow:true
            }
          ]
        },
        projectList:[],//项目列表
        versionsList:[],//事件类型
      }
    },
    methods: {
      //清除
      clearList(){
        this.versions=[];
        this.dateTime='';
        this.isOverTime = false;
        this.isReissued = false;
        this.tableConfigs.params = Object.assign(this.$data.tableConfigs.params, this.defaultData.tableConfigs.params);
        this.getJson();
      },
      getJson(){
        //是否超时，格式转化
        if(this.isOverTime == true){
          this.tableConfigs.params.isOverTime = 1;
        }else{
          this.tableConfigs.params.isOverTime = '';
        }
        if(this.isReissued == true){
          this.tableConfigs.params.isReissued = 1;
        }else{
          this.tableConfigs.params.isReissued = '';
        }
        if(this.versions.length>0){
          this.tableConfigs.params.standard = this.versions[0]+','+this.versions[1];
        }
        var self = this;
        if(this.dateTime != ''){
          this.tableConfigs.params.startTime = this.dateTime[0]+" 00:00:00";
          this.tableConfigs.params.endTime = this.dateTime[1]+" 23:59:59";
        }
        self.$refs.accountTable.cuiTableReload();
      },
      //刷新
      refresh(){
        this.statusTotal();
        this.$refs.accountTable.cuiTableReload();
      },
      //条件查询
      searchF(){
        this.getJson();
      },

      //待指派处理操作
      editDalog($row){
        this.$router.push({
          path: 'eventDetail?id='+$row.id
        })
      },
      //上报事件
      reportIssue(){
        this.$router.push({
          path:'eventReport'
        })
      }

    },
    mounted(){
      this.$refs.accountTable.cuiTableReload();
      this.tableHeight=$('.wrap-main').height($('.content-wraper').height()).height()-40+'px';
      window.onresize = () =>{
        this.tableHeight=$('.wrap-main').height($('.content-wraper').height()).height()-40+'px';
      };
    },
    created(){
      this.defaultData = JSON.parse(JSON.stringify(this.$data));
      let self = this;
      //获取项目列表
      projectsList({}).then(data =>{
        if(data.length>0){
        self.projectList=data;
      }else{
        self.$message.error({showClose: true, message:'暂无项目', duration: 2000});
        return ;
      }
    }).catch(error => {
        self.$message.error({showClose: true, message:'暂无项目', duration: 2000});
      return ;
    });

      //获取监察标准列表
      standardVersions({}).then(data => {
        if(data.length>0){
        for(var i = 0;i<data.length;i++){
          var oneMap = new Array();
          for(var j = 0;j<data[i].secondClassificationItem.length;j++){
            var mapTwo = {
              value:data[i].secondClassificationItem[j].secondClassification,
              label:data[i].secondClassificationItem[j].secondClassification,
            }
            oneMap.push(mapTwo)
          }
          var mapOne = {
            value:data[i].primaryClassification,
            label:data[i].primaryClassification,
            children:oneMap
          }
          this.versionsList.push(mapOne);
        }
      }else{
        self.$message.error({showClose: true, message:'暂无标准', duration: 2000});
        return ;
      }
    }).catch(error => {
        self.$message.error({showClose: true, message:'暂无标准', duration: 2000});
      return ;
    });
    }
  }
</script>
<style lang="scss">
  @import "../../assets/theme/element-variables.scss";
</style>
