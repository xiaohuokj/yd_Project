<template>
    <div class="wrap-main contentClass" :style="{height: tableHeight}">
      <cui-table  ref="accountTable" :tableConfigs="tableConfigs">
        <template slot="operate" slot-scope="scope">
          <el-button type="text"  size="small" @click="editDalog(scope.row)">处理</el-button>
        </template>
        <template slot="source" slot-scope="scope">
          <span v-if='scope.row.source===1'>政府监察</span>
          <span v-if='scope.row.source===2'>公众号投诉</span>
          <span v-if='scope.row.source===3'>城管派件</span>
          <span v-if='scope.row.source===4'>市民热线</span>
          <span v-if='scope.row.source===5'>其他</span>
        </template>

        <template slot="reportTime" slot-scope="scope">
          <span>{{moment(scope.row.reportTime).format("YYYY-MM-DD HH:mm")}}</span>
        </template>
        <!--高级查询-->
        <el-form ref="searchForm" :model="searchForm" :inline="true" class="demo-form-inline" slot="cuiTableAdvQuery">
          <el-row :gutter="24">
            <el-form-item label="事件编号">
              <el-input v-model="tableConfigs.params.issueNumber" ></el-input>
            </el-form-item>
            <el-form-item label="上报时间" class="dateClossClass">
              <el-date-picker class="dateTimeClass"
                v-model="dateTime"
                type="daterange"
                :clearable=false
                :picker-options="pickerOptions2"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                align="right">
              </el-date-picker>
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

  import issuesInfoPageList from "@/libs/api"
  import Util from '@/libs/util';
  import bus from '@/libs/bus.js'
  import axios from 'axios'
  export default{
    inject:['statusTotal'],
    components: {
    },
    data(){
      return {
        sex:'0',
        status:'1',
        value: '',
        formLabelWidth: '100px',
        visible:true,
        breadcrumbList:[],
        breadcrumbShow:true,
        tableHeight:'700px',
        detailInfo:{},
        searchForm:{
          name:'fff',
          accountType:[{id:1,name:"1111",id:2,name:"22222"}],
          statusa :[{id:1,name:"1111",id:2,name:"22222"}],
          account:''
        },
        dateTime:'',//日期
        pickerOptions2: {
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
        tableConfigs:{
          url:'/supervise/issues/info/page',
          isShowSimQuery:true,//是否显示简单查询
          isShowAdvQuery:true,//是否显示复杂查询
          isShowFilter:false,//是否显示数据设置,
          simPlaceholder:'可输入事件编号/描述/位置进行搜索',//简单查询输入提示
          simSearchParam:'searchable',//简单查询参数
          params:{
            issueNumber:'',
            startTime:'',
            endTime:'',
            statusList:0
          },
          columns:[
            {
              prop:'issueNumber',
              label:'事件编号',
              colShow:true
            },
            {
              prop:'source',
              label:'来源',
              colShow:true,
              scopedSlot:'source'
            },
            {
              prop:'reportTime',
              label:'上报时间',
              colShow:true,
              scopedSlot:'reportTime'
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
              label:'操作',
              fixed:'right',
              scopedSlot:'operate',
              width:250,
              colShow:true
            }
          ]
        },
      }
    },
    methods: {
      //清除
      clearList(){
        this.dateTime='';
        this.tableConfigs.params = Object.assign(this.$data.tableConfigs.params, this.defaultData.tableConfigs.params);
      },
      getJson(){
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
//          path: 'eventDetail?id='+$row.id +'&activeName=eventStartInfo'
          path: 'eventDetail?id='+$row.id
        })
      },
      //上报事件
      reportIssue(){
        this.$router.push({
//          path:'eventReport?activeName=eventStartInfo'
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
    },
  }
</script>
<style lang="scss">
  @import "../../assets/theme/element-variables.scss";
  /*时间插件宽度*/
  /*.dateClass{
    width: 90%;
  }
  !*input宽度，起止时间*!
  .dateClass>.el-range-input{
    width:43%;
  }*/
  /*时间插件删除按钮*/
  /*.dateClass>.el-range__close-icon{*/
    /*display:none;*/
  /*}*/
  /*时间插件删除按钮*/
 /* .dateClass>.el-range__close-icon{
    width: 17px;
  }
  !*时间插件“至”位置*!
  .dateClass>.el-range-separator{
    line-height:22px;
  }
  .dateClass>.el-input__icon{
    margin-top:0px;
  }*/
  .demo-form-inline{
    padding:0 20px;
  }


</style>
