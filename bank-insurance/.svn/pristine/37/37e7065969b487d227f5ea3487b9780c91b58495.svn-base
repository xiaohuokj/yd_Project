<template>
    <div class="archives">
        <span class="top_left"></span>
        <span class="top_left2"></span>
        <span class="top_left3"></span>
        <span class="top_left4"></span>
        <div class="archives_check">
            <div class="clearfix">
                <p class="el-icon-date archives_check_p"> 健康统计</p>
                <!--<button class="archives_check_btn" @click="back">返回</button>-->
            </div>
            <div class="clearfix">
                <div class="healthy-echars">
                    <div class="healthy-con">
                        <div class="title">
                            <span class="title1">育龄段发病率</span>
                            <span class="title2">取值：最近半年</span>
                        </div>
                        <div class="healthyFloat healthyFloat-1">
                            <div id="childbearing_ele" class="eleStyle"></div>
                        </div>
                    </div>
                    <div class="healthy-con">
                        <div class="title">
                            <span class="title1">疾病发病率</span>
                            <span class="title2">取值：最近半年</span>
                        </div>
                        <div class="healthyFloat healthyFloat-2">
                            <div id="disease_ele" class="eleStyle"></div>
                        </div>
                    </div>
                    <div class="healthy-con">
                        <div class="title">
                            <span class="title1">淘汰率</span>
                            <span class="title2">取值：最近半年</span>
                        </div>
                        <div class="healthyFloat healthyFloat-3">
                            <div id="eliminate_ele" class="eleStyle"></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    import {getDiseaseStatis,queryDiseaseCountByCp, getEliminateStatis} from '@/libs/api'
    import {getCookie} from '@/libs/cookieFun'
    import bus from '@/libs/bus'

    export default {
        data() {
            return {
                cattlefarmId: ''
            };
        },
        mounted() {
            bus.$on('cattlefarm_Id',(cattlefarm_Id)=>{
                this.cattlefarmId = cattlefarm_Id
                this.Childbearing_age()
                this.disease()
                this.eliminate()
            });
            if (this.$route.query.id) {
                this.cattlefarmId = this.$route.query.id
                this.Childbearing_age()
                this.disease()
                this.eliminate()
            }
        },
        created() {

        },
        methods: {
            //返回
            back() {
                this.$router.go(-1);//返回上一层
            },
            Childbearing_age() {
                let myChart = this.$echarts.init(document.getElementById('childbearing_ele'))
                let data = {
                    cattlefarmId: this.cattlefarmId,
                    token: getCookie('token')
                }
                this.$get(getDiseaseStatis, data).then((res) => {
                    if (res.code === 200) {
                        // let data_1 = res.data.stage
                        let data = []
                        for (let i = 0; i< res.data.stage.length; i++) {
                            data.push(res.data.stage[i].months)
                        }
                        let data_1 = []
                        let data_2 = []
                        let data_3 = []
                        let data_4 = []
                        let data_5 = []
                        for (let i = 0; i< res.data.stage.length; i++) {
                            data_1.push(parseFloat(res.data.stage[i].count))
                        }
                        for (let i = 0; i< res.data.stage1.length; i++) {
                            data_2.push(parseFloat(res.data.stage1[i].count))
                        }
                        for (let i = 0; i< res.data.stage2.length; i++) {
                            data_3.push(parseFloat(res.data.stage2[i].count))
                        }
                        for (let i = 0; i< res.data.stage3.length; i++) {
                            data_4.push(parseFloat(res.data.stage3[i].count))
                        }
                        for (let i = 0; i< res.data.stage4.length; i++) {
                            data_5.push(parseFloat(res.data.stage4[i].count))
                        }
                        myChart.setOption({
                            backgroundColor: "#0A3A78",

                            tooltip: {
                                trigger: 'axis'
                            },
                            legend: {
                                data:['全群','成年牛','育成牛','青年牛','犊牛'],
                                textStyle: { // 设置图标旁文字大小和颜色
                                    color: '#FFF',
                                    fontSize: 10
                                },
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            toolbox: {
                            },
                            xAxis: {
                                type: 'category',
                                boundaryGap: false,
                                data: data,
                                axisLabel: {
                                    show: true,
                                    textStyle: {
                                        color: '#c3dbff',  //更改坐标轴文字颜色
                                        fontSize : 10      //更改坐标轴文字大小
                                    },
                                    interval: 0
                                }
                            },
                            yAxis: {
                                type: 'value',
                                axisLabel: {
                                    show: true,
                                    textStyle: {
                                        color: '#c3dbff',  //更改坐标轴文字颜色
                                        fontSize : 10      //更改坐标轴文字大小
                                    },
                                    interval: 0
                                }
                            },
                            series: [
                                {
                                    name:'全群',
                                    type:'line',
                                    stack: '总量',
                                    data:data_1
                                },
                                {
                                    name:'成年牛',
                                    type:'line',
                                    stack: '总量',
                                    data:data_2
                                },
                                {
                                    name:'育成牛',
                                    type:'line',
                                    stack: '总量',
                                    data:data_3
                                },
                                {
                                    name:'青年牛',
                                    type:'line',
                                    stack: '总量',
                                    data:data_4
                                },
                                {
                                    name:'犊牛',
                                    type:'line',
                                    stack: '总量',
                                    data:data_5
                                }
                            ]
                        })
                    }
                }).catch((err) => {})

            },
            disease() {
                let myChart = this.$echarts.init(document.getElementById('disease_ele'))
                let data = {
                    cattlefarmId: this.cattlefarmId,
                    token: getCookie('token')
                }
                this.$get(queryDiseaseCountByCp, data).then((res) => {
                    if (res.code === 200) {
                        let xAxisArr = []
                        let seriesArr = []
                        if (res.data.length  > 0) {
                            for (let i=0; i<res.data.length; i++) {
                                xAxisArr.push(res.data[i].name)
                                seriesArr.push(res.data[i].value)
                            }
                        } else {

                        }

                        myChart.setOption({
                            backgroundColor: "#0A3A78",
                            color: ['#3398DB'],
                            tooltip : {
                                trigger: 'axis',
                                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis : [
                                {
                                    type : 'category',
                                    data : xAxisArr,
                                    axisTick: {
                                        alignWithLabel: true
                                    },
                                    axisLabel: {
                                        show: true,
                                        textStyle: {
                                            color: '#c3dbff',  //更改坐标轴文字颜色
                                            fontSize : 10      //更改坐标轴文字大小
                                        },
                                        interval: 0
                                    }
                                }
                            ],
                            yAxis : [
                                {
                                    type : 'value',
                                    axisLabel: {
                                        show: true,
                                        textStyle: {
                                            color: '#c3dbff',  //更改坐标轴文字颜色
                                            fontSize : 10      //更改坐标轴文字大小
                                        },
                                        interval: 0
                                    }
                                }
                            ],
                            series : [
                                {
                                    name:'',
                                    type:'bar',
                                    barWidth: '60%',
                                    data: seriesArr
                                }
                            ]
                        })
                    }
                }).catch((err) => {
                })
            },
            eliminate() {
                let myChart = this.$echarts.init(document.getElementById('eliminate_ele'))
                let data = {
                    cattlefarmId: this.cattlefarmId,
                    token: getCookie('token')
                }
                this.$get(getEliminateStatis, data).then((res) => {
                    if (res.code === 200) {
                        let xAxisArr = []
                        let seriesArr = []
                        if (res.data.length  > 0) {
                            for (let i=0; i<res.data.length; i++) {
                                xAxisArr.push(parseFloat(res.data[i].months))
                            }
                            for (let i=0; i<res.data.length; i++) {
                                seriesArr.push(res.data[i].count)
                            }
                        } else {
                            xAxisArr = ["2018-11","2018-12","2019-01","2019-02","2019-03","2019-04"]
                            seriesArr.push(0)
                        }
                        myChart.setOption({
                            backgroundColor: "#0A3A78",
                            color: ['#3398DB'],
                            xAxis: {
                                type: 'category',
                                data: xAxisArr,
                                axisLabel: {
                                    show: true,
                                    textStyle: {
                                        color: '#c3dbff',  //更改坐标轴文字颜色
                                        fontSize : 10      //更改坐标轴文字大小
                                    },
                                    interval: 0
                                }
                            },
                            yAxis: {
                                type: 'value',
                                axisLabel: {
                                    show: true,
                                    textStyle: {
                                        color: '#c3dbff',  //更改坐标轴文字颜色
                                        fontSize : 10      //更改坐标轴文字大小
                                    },
                                    interval: 0
                                }
                            },
                            series: [{
                                data: seriesArr,
                                type: 'line'
                            }]
                        })
                    }
                })
            }
        }

    };
</script>
<style scoped>
    @import "../../css/base.css";

    .healthy-echars {
        width: 100%;
        margin: 0 auto;
    }

    .healthyFloat {
        width: 85%;
        height: 300px;
        margin: 20px auto;
        /*float: left;
        margin-left: 60px;*/
    }

    .healthy-con {
        width: 100%;
        height: auto;
    }

    .eleStyle {
        width: 100%;
        height: 300px;
    }

    .healthy-con .title .title1 {
        font-size: 14px;
        font-weight: 600;
        padding-left: 2.1%;
        color: #FFFFFF;
    }

    .healthy-con .title .title2 {
        font-size: 12px;
        margin-left: 1.4%;
        color: #FFFFFF;
    }


    .archives {
        width: 98%;
        background: rgba(0, 0, 0, 0.10);
        border: 1px solid #2294C9;
        margin: 30px auto;
        position: relative;
        padding-bottom: 30px;

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
        display: block;
        width: 8px;
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

    .yanse {
        color: #5C9BF9;
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
        padding-right: 10px;
        color: #1DE8F5;
    }

    .el-button:nth-child(2) {
        padding-right: 10px;
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
