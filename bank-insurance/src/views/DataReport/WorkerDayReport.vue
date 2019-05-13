<template>
    <div class="wrap-main" id="superviseWraper" :style="{height: tableHeight}">
        <div class="query-condition">
            <el-form  :inline="true" class="demo-form-inline" slot="cuiTableAdvQuery">
                <el-row :gutter="24">
                    <el-form-item label="时间">
                        <el-date-picker
                                v-model="tableConfigs.params.reportTime"
                                type="date"
                                format="yyyy-MM-dd"
                                value-format="timestamp"
                                :clearable=false
                                :picker-options="pickerOptionsReport"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="项目">
                        <el-select v-model="tableConfigs.params.projectId" filterable  placeholder="请选择"  clearable>
                            <el-option v-for="item in projectList"
                                       :key="item.projectId"
                                       :label="item.projectName"
                                       :value="item.projectId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" @click="searchF">查询</el-button>
                        <el-button  size="small" @click="clearList">刷新</el-button>
                    </el-form-item>
                </el-row>
            </el-form>
        </div>
        <div class="report-title">{{governmentName}}人工清保作业日报</div>
        <div class="report-journal">
            <div class="report-journal-left">
                <span>编制单位：</span>
                <span>{{governmentName}}</span>
            </div>
            <div class="report-journal-right">
                <span>制表时段：</span>
                <span>{{reportDate}}</span>
            </div>
        </div>

        <cui-table class="report-table" border="true" ref="accountTable" :tableConfigs="tableConfigs">
            <template slot="workRatio" slot-scope="scope">
                <span v-if="scope.row.workRatio != null">{{scope.row.workRatio}}%</span>
            </template>
        </cui-table>
        <div class="report-foot">
            <div class="report-foot-left">
                <span>制表人：</span>
                <span></span>
            </div>
            <div class="report-foot-right">
                <span>审核人：</span>
                <span></span>
            </div>
        </div>
    </div>
</template>
<script>
    /*import * as api  from "@/libs/api"
    import Util from '@/libs/util';
    import bus from '@/libs/bus.js'
    import axios from 'axios'*/
    export default{
        components: {
        },
        data() {
            return {
                pickerOptionsReport:{
                    disabledDate(time) {
                        return time.getTime() > Date.now() - 8.64e7;
                    }
                },
                projectList:[],
                tableHeight:'700px',
                governmentName:'',
                reportDate:'',
                tableConfigs:{
                    url:'/supervise/report/daily/workerPage',
                    isShowSimQuery:false,//是否显示简单查询
                    isShowAdvQuery:true,//是否显示复杂查询
                    isShowFilter:false,//是否显示数据设置,
                    params:{
                        reportTime:this.moment().add('day',-1).format('X') * 1000,
                        projectId:''
                    },
                    columns:[
                        {
                            prop:'projectName',
                            label:'项目名称',
                            colShow:true,
                            border:true
                        },
                        {
                            prop:'planPeople',
                            label:'计划投入(人)',
                            colShow:true,
                            sortable:true,
                            border:true
                        },
                        {
                            prop:'actualPeople',
                            label:'实际投入(人)',
                            sortable:true,
                            colShow:true
                        },
                        {
                            prop:'workPlan',
                            label:'计划清扫面积(㎡)',
                            sortable:true,
                            colShow:true
                        },
                        {
                            prop:'workArea',
                            label:'实际清扫面积(㎡)',
                            sortable:true,
                            colShow:true
                        },
                        {
                            prop:'workRatio',
                            label:'作业完成度',
                            sortable:true,
                            colShow:true,
                            scopedSlot:'workRatio'
                        }
                    ]
                }
            }
        },
        methods: {
            searchF(){
                var self = this;
                self.reportDate = this.moment(new Date(self.tableConfigs.params.reportTime)).format('YYYY年MM月DD日');
                self.$refs.accountTable.cuiTableReload();
            },
            clearList(){
                let self = this;
                self.tableConfigs.params.reportTime = this.moment().add('day',-1).format('X') * 1000;
                self.tableConfigs.params.projectId = "";
                self.$refs.accountTable.cuiTableReload();
            },
            //获取项目列表
            getProjectList(){
                let self = this;
                /*api.projectsList({}).then(data => {
                    if(data.length>0){
                        self.projectList=data;
                    }else{
                        self.$message.error({showClose: true, message:'暂无项目', duration: 2000});
                        return ;
                    }
                }).catch(error => {
                    self.$message.error({showClose: true, message:'暂无项目', duration: 2000});
                    return ;
                });*/
            },
        },

        mounted(){
            let self = this;
            var data = eval("("+sessionStorage.getItem("LOGIN_INFO")+")");
            self.governmentName = data.cities[0].governmentName;
            self.reportDate = this.moment().add('day',-1).format('YYYY年MM月DD日');
            this.$refs.accountTable.cuiTableReload();
            this.getProjectList();
            this.tableHeight=$('.wrap-main').height($('.content-wraper').height()).height()-130+'px';
            const that = this;
            window.onresize = () =>{
                that.tableHeight=$('.wrap-main').height($('.content-wraper').height()).height();
            }
        },
        created(){
        }
    }
</script>
<style lang="scss">
</style>
