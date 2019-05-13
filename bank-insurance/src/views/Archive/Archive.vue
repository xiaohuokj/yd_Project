<template>
    <div class="archives">
        <span class="top_left"></span>
        <span class="top_left2"></span>
        <span class="top_left3"></span>
        <span class="top_left4"></span>
        <div class="archives_check">
            <div class="clearfix">
                <p class="el-icon-date archives_check_p"> 牛只档案</p>
                <!--<button class="archives_check_btn" @click="back">返回</button>-->
            </div>
            <div class="clearfix">
                <div class="archives_content clearfix">
                    <p class="content_p">母扣：</p>
                    <input class="content_input" type="text" v-model="glebs" placeholder="请输入"/>
                </div>
                <div class="archives_content clearfix">
                    <p class="content_p">子扣：</p>
                    <input class="content_input" type="text" v-model="rfids" placeholder="请输入"/>
                </div>
                <!-- <div class="archives_content clearfix">
                    <p class="content_p">状态：</p>
                    <select class="content_input">
                        <option>1</option>
                        <option>1</option>
                        <option>1</option>
                    </select>
                </div> -->
                <button class="archives_check_btn2" @click="querys">搜 索</button>
            </div>
            <div class="archives_list">
                <el-table
                        :data="tableData2"

                        style="width: 100%"
                        :row-class-name="tableRowClassName">
                    <el-table-column
                            prop="gleb"
                            align="center"
                            label="母扣编号"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="rfid"
                            align="center"
                            label="子扣编号"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="growStage"
                            align="center"
                            label="所处阶段">
                    </el-table-column>
                    <el-table-column
                            prop="cowshedNum"
                            align="center"
                            label="所处牛舍">
                    </el-table-column>
                    <el-table-column
                            prop="niulan"
                            align="center"
                            label="所处牛栏">
                    </el-table-column>
                    <el-table-column
                            prop="enterpriseName"
                            align="center"
                            label="企业">
                    </el-table-column>
                    <el-table-column
                            prop="cattlefarmName"
                            align="center"
                            label="牛场">
                    </el-table-column>
                    <el-table-column
                            prop="purchaseDate"
                            align="center"
                            label="购入日期">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            align="center"
                            width="200"
                            label="操作">
                        <template slot-scope="scope">
                            　　　　　　
                            <el-button type="text" @click="checkDetail(scope.row)">查看</el-button>
                            <el-button type="text"><router-link class="yanse" :to="{path: 'Oddtrajectory', query: {id: scope.row.rfid}}">轨迹</router-link></el-button>
                            <el-button type="text" @click="checkDetail2(scope.row)">预警</el-button>
                            　　　　
                        </template>
                    </el-table-column>
                </el-table>
                <div class="fenye">
                    <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page="pageno"
                            :page-size="pagesize"
                            layout="total, prev, pager, next, jumper"
                            :total=totalcount>
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {cpCowInfoList} from '@/libs/api'
	import {getCookie} from '@/libs/cookieFun'
    import bus from '@/libs/bus'
    export default {
        data() {
            return {
                value6: '',
                tableData2: [],
                cattlefarmId: "",//牛场id
                "pageno": 1,
                "pagesize": 10,
                "totalcount": 0,
                rfid: '',
                rfids: '',
                glebs: '',
            };
        },
        mounted() {
            let self = this
            bus.$on('cattlefarm_Id',(cattlefarm_Id)=>{
                self.cattlefarmId = cattlefarm_Id
                self.cpCowInfoLists()
            });
            if (self.$route.query.id) {
                self.cattlefarmId = self.$route.query.id
                self.cpCowInfoLists()
            }
        },
        methods: {
            cpCowInfoLists() {
                let data = {
                    pageno: this.pageno,
                    pagesize: this.pagesize,
                    cattlefarmId: this.cattlefarmId,
					token: getCookie('token')
                }
                this.$get(cpCowInfoList, data).then((res) => {
                    this.tableData2 = res.data.list;
                    this.rfid = res.data.list.rfid;
                    this.gleb = res.data.list.gleb;
                    this.totalcount = res.data.totalcount

                })
            },
            //返回
            back() {
                this.$router.go(-1);//返回上一层
            },
            //查询
            querys() {
                let data = {
                    "pageno": this.pageno,
                    "pagesize": this.pagesize,
                    "cattlefarmId": this.cattlefarmId,
                    "rfid": this.rfids,
                    "gleb": this.glebs,
					token: getCookie('token')
                }

                this.$post(cpCowInfoList, data).then((res) => {
                    //debugger
                    this.tableData2 = res.data.list;
                    this.totalcount = res.data.totalcount

                })
            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex % 2 === 0) {
                    return 'warning-row';
                }
                return '';
            },

            handleCurrentChange(val) {
                //debugger
                let data = {
                    pageno: val,
                    pagesize: this.pagesize,
                    cattlefarmId: this.cattlefarmId,
					token: getCookie('token')
                }
                this.$post(cpCowInfoList, data).then((res) => {

                    this.tableData2 = res.data.list;
                    this.totalcount = res.data.totalcount
                })
            },
            //查看详情
            checkDetail(val) {
                //dc
                this.$router.push({name: '档案查看', params: {rfid: val.rfid}})
            },
            /*checkDetail1(val) {
                //debugger
                this.$router.push({name: '单只牛轨迹', qurey: {id: val.rfid}})
            },*/
            //预警
            checkDetail2(val) {
                //debugger
                this.$router.push({name: '单只牛预警列表', params: {rfid: val.rfid, gleb: val.gleb}})
            }
        },
       
    };
</script>
<style scoped>
    @import "../../css/base.css";

    .archives {
        width: 98%;
        background: rgba(0, 0, 0, 0.10);
        border: 1px solid #2294C9;
        margin: 30px auto;
        position: relative;
        padding-bottom: 30px;

    }

    .yanse {
        color: #5C9BF9;
    }

    .top_left {
        display: block;
        width: 8px;
        height: 8px;
        border-bottom: 1px solid #1DE8F5;
        border-right: 1px solid #1DE8F5;
        position: absolute;
        bottom: 0;
        right: 0;
    }

    .top_left2 {
        display: block;: 8 px;
        height: 8px;
        border-bottom: 1px solid #1DE8F5;
        border-left: 1px solid #1DE8F5;
        position: absolute;
        bottom: 0;
        left: 0;
    }

    .top_left3 {
        display: block;
        width: 8px;
        height: 8px;
        border-top: 1px solid #1DE8F5;
        border-left: 1px solid #1DE8F5;
        position: absolute;
        top: 0;
        left: 0;
    }

    .top_left4 {
        display: block;
        width: 8px;
        height: 8px;
        border-top: 1px solid #1DE8F5;
        border-right: 1px solid #1DE8F5;
        position: absolute;
        top: 0;
        right: 0;
    }

    .archives_check {
        width: 98%;
        height: 98%;
        margin: 30px auto 0;
    }

    .archives_check_p {
        width: 150px;
        height: 40px;
        float: left;
        font-family: MicrosoftYaHei-Bold;
        font-size: 14px;
        color: #1DE8F5;
    }

    .archives_check_btn {
        width: 80px;
        height: 36px;
        background: #5C9BF9;
        border-radius: 6px;
        float: right;
        font-family: AvenirNext-Regular;
        font-size: 14px;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: center;
    }

    .archives_content {
        width: 220px;
        height: 30px;
        float: left;
    }

    .archives_content2 {
        width: 400px;
        height: 30px;
        float: left;
    }

    .content_p {
        width: 47px;
        height: 30px;
        line-height: 30px;
        float: left;
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: #FFFFFF;
        padding-right: 10px;

    }

    .content_input {
        width: 150px;
        height: 30px;
        line-height: 30px;
        float: left;
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: #FFFFFF;
        background: #0A3A78;
        border: 1px solid #5C9BF9;
        border-radius: 3px;
        padding-left: 5px;
    }

    input::-webkit-input-placeholder {
        color: #fff;
    }

    .el-date-editor {
        background: #0A3A78;
        width: 150px;
        border: 1px solid #5C9BF9;
    }

    .el-range-input {
        background: #0A3A78;
    }

    .el-date-editor .el-input__icon {
        width: 16px;
        height: 16px;
        margin-top: 0px;
    }

    .el-date-editor .el-range-separator {
        padding: 0 5px;
        line-height: 21px;
        width: 5%;
        color: #fff;
    }

    .el-date-editor .el-range-input {

        color: #fff;
    }

    .archives_check_btn2 {
        width: 80px;
        height: 36px;
        line-height: 36px;
        background: #F5A623;
        border-radius: 6px;
        font-size: 14px;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: center;
        float: left;
        margin-left: 30px;
        margin-top: -3px;
    }

    .archives_list {
        width: 100%;
        margin-top: 30px;
        border-top: 1px solid #2294C9;
    }

    .el-table--enable-row-hover .el-table__body tr > td {
        background-color: rgba(34, 148, 201, 0.20);
        border: none;
        color: #fff;
    }

    .archives_list >>> .el-table, .archives_list >>> .el-table__expanded-cell {
        background-color: transparent;
    }

    .archives_list >>> .el-table th, .archives_list >>> .el-table tr {
        background-color: transparent;
        color: #fff;
    }

    .archives_list >>> .el-table--enable-row-hover .el-table__body tr:hover > td {
        background-color: rgba(34, 148, 201, 0.2) !important;


    }

    .archives_list >>> .el-table .warning-row {
        background: rgba(34, 148, 201, 0.1);
        /*opacity: 0.1;*/

    }

    .el-table--border::after, .el-table--group::after, .el-table::before {
        background-color: transparent;
    }

    .archives_list >>> .el-table td, .archives_list >>> .el-table th.is-leaf {
        border-bottom: none;
    }

    .el-button:nth-child(1) {
        padding-right: 3px;
        color: #1DE8F5;
    }

    .el-button:nth-child(2) {
        padding-right: 3px;
        color: #5C9BF9;
    }

    .el-button:nth-child(3) {
        color: #F5A623;
    }

    .fenye {
        text-align: center;
        margin-top: 30px;
    }

    .archives_list >>> .el-pagination__total {

        color: #fff;
    }

    .archives_list >>> .el-pagination__jump {

        color: #fff;
    }

    .archives_list >>> .el-input__inner {

        border-radius: 4px;

        color: #fff;

        background-color: transparent;
        width: 100%;
    }

    .archives_list >>> .el-pagination {

        color: #fff;
    }

    .archives_list >>> .el-pagination .btn-next, .archives_list >>> .el-pagination .btn-prev {
        background: transparent;
        background-size: 16px;
        cursor: pointer;
        margin: 0;
        color: #fff;
    }

    .archives_list >>> .el-dialog, .archives_list >>> .el-pager li {
        background: transparent;

    }

    .el-pagination button:disabled {
        color: #fff;
        background-color: transparent;

    }
</style>
