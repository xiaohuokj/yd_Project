<template>
    <div class="wrap-main sanitation-main" id="sanitationWraper">
        <div class="map-box map-project">
            <div class="project-bottom p-relative" style="margin-right: 10px;
    margin-bottom: 10px;background: rgba(18, 83, 255, 0.15);">
                <div class="echart-box">
                    <div class="horn horn-top-left"></div>
                    <div class="horn horn-top-right"></div>
                    <div class="horn horn-bottom-left"></div>
                    <div class="horn horn-bottom-right"></div>
                    <div class="echart-tit"><i class="yuandian"></i>牛只品种</div>
                    <div class="echart-content">
                        <div id="Varietiescontainer" style="width: 100%; height: 30vh;">

                        </div>
                    </div>
                </div>
            </div>
            <div class="project-bottom p-relative" style="margin-right: 10px;
    margin-bottom: 10px; background: rgba(18, 83, 255, 0.15);">
                <div class="left-echarts-2">
                    <div class="horn horn-top-left"></div>
                    <div class="horn horn-top-right"></div>
                    <div class="horn horn-bottom-left"></div>
                    <div class="horn horn-bottom-right"></div>
                    <div class="echart-tit"><i class="yuandian"></i>存栏统计</div>
                    <div class="echart-content">
                        <div id="Enclosurecontainer" style="width: 100%; height: 30vh">

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="map-box map-center p-relative">
            <div class="horn horn-top-left"></div>
            <div class="horn horn-top-right"></div>
            <div class="horn horn-bottom-left"></div>
            <div class="horn horn-bottom-right"></div>
            <amap :vid="vid"  :zoom="zoom" :plugin="plugin" :center="center" :mapStyle="mapStyle">
            </amap>
        </div>
        <div class="map-box map-echart">
            <div class="echart-box p-relative" id="echartTopLeft">
                <div class="horn horn-top-left"></div>
                <div class="horn horn-top-right"></div>
                <div class="horn horn-bottom-left"></div>
                <div class="horn horn-bottom-right"></div>
                <div class="echart-tit"><i class="yuandian"></i>预警信息</div>
                <div class="echart-content" style="overflow:hidden;">
                    <div class="tabContainer">
                        <table class="early-tab">
                            <tr>
                                <th>母扣编号</th>
                                <th>预警类型</th>
                                <th>时间</th>
                            </tr>
                            <tr style="padding-left: 10px;" v-for="(item, index) in tableData">
                                <td class="earlyNumber">{{item.number}}</td>
                                <td class="earlyType">{{item.type}}</td>
                                <td class="earlyDate">{{item.date}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div class="echart-box p-relative" id="echartTopRight">
                <div class="horn horn-top-left"></div>
                <div class="horn horn-top-right"></div>
                <div class="horn horn-bottom-left"></div>
                <div class="horn horn-bottom-right"></div>
                <div class="echart-tit"><i class="yuandian"></i>畜龄</div>
                <div class="echart-content">
                    <div id="Agcontainer" class="echars-container"></div>
                </div>
            </div>
            <div class="echart-box p-relative" id="echartBottomLeft">
                <div class="horn horn-top-left"></div>
                <div class="horn horn-top-right"></div>
                <div class="horn horn-bottom-left"></div>
                <div class="horn horn-bottom-right"></div>
                <div class="echart-tit"><i class="yuandian"></i>发病率统计</div>
                <div class="echart-content">
                    <div id="Morbiditycontainer" class="echars-container"></div>
                </div>
            </div>
            <div class="echart-box p-relative" id="echartBottomRight">
                <div class="horn horn-top-left"></div>
                <div class="horn horn-top-right"></div>
                <div class="horn horn-bottom-left"></div>
                <div class="horn horn-bottom-right"></div>
                <div class="echart-tit"><i class="yuandian"></i>免疫统计</div>
                <div class="echart-content">
                    <div id="immunecontainer" class="echars-container"></div>
                </div>
            </div>
        </div>
        <div class="shadow shadow-box p-fixed" v-show="imgPanel">
            <div class="pictureBoxs p-relative">
                <div class="horn horn-top-left"></div>
                <div class="horn horn-top-right"></div>
                <div class="horn horn-bottom-left"></div>
                <div class="horn horn-bottom-right"></div>
                <div class="picture-content">
                    <div class="close-tit">
                        <div class="close-name">{{imgtit}}</div>
                        <div class="close-tipnum">{{curImgNum}}/{{scenePictureList.length || 0}}</div>
                        <div class="close-button clearfix"><span class="close-icon f-right cursor"
                                                                 ></span></div>
                    </div>
                    <div class="picture-center">
                        <div class="arrow-btn p-relative">
                            <span class="arrow-icon pre-icon p-absolute cursor"></span>
                        </div>
                        <div class="picture-box">
                            <div><a href="javasctipt:;"><img :style="[styleObj]" ref="curImg" :src="curImgUrl"></a>
                            </div>
                        </div>
                        <div class="arrow-btn p-relative">
                            <span class="arrow-icon after-icon p-absolute cursor"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    /*import Util from '@/libs/util'
    import * as api from "@/libs/api"
    import bus from '@/libs/bus'
    import echarts from 'echarts'*/
    import {bankWarningList,getMonthAgeStatis, bankAmountCount, getImmuneStatis, queryDiseaseCountByCp, bankCattleSpecies} from '@/libs/api'
    import Cookies from 'js-cookie'

    export default {
        name: 'SanitationIndex',
        data() {
            return {
                tableData: [{
                    date: '2016-05-02',
                    number: '00001',
                    type: '耳标脱落'
                }, {
                    date: '2016-05-02',
                    number: '00001',
                    type: '耳标脱落'
                }, {
                    date: '2016-05-02',
                    number: '00001',
                    type: '耳标脱落'
                }, {
                    date: '2016-05-02',
                    number: '00001',
                    type: '耳标脱落'
                }, {
                    date: '2016-05-02',
                    number: '00001',
                    type: '耳标脱落'
                }, {
                    date: '2016-05-02',
                    number: '00001',
                    type: '耳标脱落'
                }, {
                    date: '2016-05-02',
                    number: '00001',
                    type: '耳标脱落'
                }, {
                    date: '2016-05-02',
                    number: '00001',
                    type: '耳标脱落'
                }, {
                    date: '2016-05-02',
                    number: '00001',
                    type: '耳标脱落'
                }, {
                    date: '2016-05-02',
                    number: '00001',
                    type: '耳标脱落'
                }, {
                    date: '2016-05-02',
                    number: '00001',
                    type: '耳标脱落'
                }, {
                    date: '2016-05-02',
                    number: '00001',
                    type: '耳标脱落'
                }, {
                    date: '2016-05-02',
                    number: '00001',
                    type: '耳标脱落'
                }, {
                    date: '2016-05-02',
                    number: '00001',
                    type: '耳标脱落'
                }],
                vid: 'sabitation-amap',
                markerobj: {},
                plugin: [{
                    pName: 'ToolBar',
                    liteStyle: true
                }, {
                    pName: 'CircleEditor',
                    liteStyle: true
                }],
                zoom: 10,
                mapObj: null,
                mapStyle: "amap://styles/blue",
                resizeEnable: true,
                satelliteHide: false,
                measureHide: false,
                markers: [],
                scrollWheel: false,
                center: [122.262457,43.628712],
                markerObj: {},
                projectList: [],
                curWorkType: '',
                curProjectId: '',
                styleObj: {},
                overlaysArr: [],
                overlaysObj: {},//地图覆盖物对象
                tipObj: {},
                issuesArr: [],
                detailPanel: false,
                detailId: 0,
                chartObj: {},
                issuesObj: {},
                scenePictureList: [],
                scenePictureObj: {},
                curImgNum: 0,
                curImgUrl: '',
                imgtit: '',
                imgPanel: false,
                timer: null,
                styleObj: {},
                pre: 0,
                next: 0,
                cleanChart: null,
                wcChart: null,
                collChart: null,
                transferChart: null
            }
        },
        methods: {
            Varieties_init() { // 牛只品种
                let myChart = this.$echarts.init(document.getElementById('Varietiescontainer'))
                this.$get(bankCattleSpecies, {cattlefarmId: '0_ZL6002', token: Cookies.get('token')}).then((res) => {
                    if (res.status === 200 || res.status === '200') {
                        var seriesdata = []
                        var xAxisdata = []
                        for(var i = 0;i< res.data.length;i++){
                            seriesdata.push({value: res.data[i].value, name: res.data[i].name})
                            xAxisdata.push(res.data[i].name)
                        }
                        myChart.setOption({
                            tooltip: {
                                trigger: 'item',
                                formatter: "{a} <br/>{b} : {c} ({d}%)",
                                textStyle: {
                                    fontSize: '12px',
                                },
                            },
                            legend: {
                                orient: 'vertical',
                                right: 'right',
                                itemWidth: 10,   // 设置图例图形的宽
                                itemHeight: 10,  // 设置图例图形的高
                                textStyle: { // 设置图标旁文字大小和颜色
                                    color: '#FFF',
                                    fontSize: 10
                                },
                                data: xAxisdata
                            },
                            series: [
                                {
                                    name: '访问来源',
                                    type: 'pie',
                                    radius: '55%',
                                    center: ['26%', '50%'],
                                    data: seriesdata,
                                    /*label: {
                                        normal: {
                                            show:true,
                                            position:'inner', //标签的位置
                                            textStyle : {
                                                fontSize : 16    //文字的字体大小
                                            },
                                            formatter:'{d}%'
                                        }
                                    },*/
                                    label:{            //饼图图形上的文本标签
                                        normal:{
                                            show:true,
                                            position:'inner', //标签的位置
                                            textStyle : {
                                                fontWeight : 300 ,
                                                fontSize : 9    //文字的字体大小
                                            },
                                            formatter:'{d}%'


                                        }
                                    },
                                    itemStyle: {
                                        emphasis: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                                        }
                                    }
                                }
                            ]
                        })
                    }
                }).catch((err) => {})
            },
            Enclosure_init() { // 存栏统计
                let myChart = this.$echarts.init(document.getElementById('Enclosurecontainer'))
                this.$get(bankAmountCount, {cattlefarmId: '0_ZL6002', token: Cookies.get('token')}).then((res) => {
                    // debugger
                    if (res.status === '200' || res.status === 200) {
                        var seriesdata = []
                        var xAxisdata = []
                        for(var i = 0;i< res.data.length;i++){
                            seriesdata.push({value: res.data[i].value, name: res.data[i].name})
                            xAxisdata.push(res.data[i].name)
                        }
                        myChart.setOption({
                            tooltip: {
                                trigger: 'item',
                                formatter: "{a} <br/>{b}: {c} ({d}%)"
                            },
                            legend: {
                                orient: 'vertical',
                                // x: 'right',
                                right: 'right',
                                itemWidth: 10,   // 设置图例图形的宽
                                itemHeight: 10,  // 设置图例图形的高
                                textStyle: { // 设置图标旁文字大小和颜色
                                    color: '#FFF',
                                    fontSize: 10
                                },
                                data: xAxisdata
                            },
                            series: [
                                {
                                    name:'访问来源',
                                    type:'pie',
                                    center: ['35%', '50%'],
                                    radius: ['40%', '60%'],
                                    avoidLabelOverlap: false,
                                    label: {
                                        normal: {
                                            show: false,
                                            position: 'center'
                                        },
                                        emphasis: {
                                            show: true,
                                            textStyle: {
                                                fontSize: '30',
                                                fontWeight: 'bold'
                                            }
                                        }
                                    },
                                    labelLine: {
                                        normal: {
                                            show: false
                                        }
                                    },
                                    data: seriesdata,
                                    label:{            //饼图图形上的文本标签
                                        normal:{
                                            show:true,
                                            position:'inner', //标签的位置
                                            textStyle : {
                                                fontWeight : 300 ,
                                                fontSize : 9    //文字的字体大小
                                            },
                                            formatter:'{d}%'


                                        }
                                    },
                                },
                            ]
                        })
                    }
                }).catch((err) => {})
            },
            earlywarning() { // 预警
                this.$get(bankWarningList, {cattlefarmId: '0_ZL6002', token: Cookies.get('token')}).then((res) => {
                    // debugger
                }).catch((err=> {

                }))
            },

            Age_init() { // 畜龄
                let myChart = this.$echarts.init(document.getElementById('Agcontainer'))
                this.$get(getMonthAgeStatis, {cattlefarmId: '0_ZL6002', token: Cookies.get('token')}).then((res) => {
                    if (res.code === 200) {
                        let stage1 = res.data.stage1+100
                        let stage2 = res.data.stage2+200
                        let stage3 = res.data.stage3+300
                        let stage4 = res.data.stage4+400
                        myChart.setOption({
                            tooltip: {
                                trigger: 'item',
                                formatter: "{a} <br/>{b} : {c} ({d}%)",
                                textStyle: {
                                    fontSize: '12px',
                                },
                            },
                            legend: {
                                orient: 'vertical',
                                right: 'right',
                                itemWidth: 10,   // 设置图例图形的宽
                                itemHeight: 10,  // 设置图例图形的高
                                textStyle: { // 设置图标旁文字大小和颜色
                                    color: '#FFF',
                                    fontSize: 10
                                },
                                data: [`犊牛总数`, `育成牛总数`, `青年牛总数`, `成年牛总数`]
                            },
                            series: [
                                {
                                    name: '访问来源',
                                    type: 'pie',
                                    radius: '55%',
                                    center: ['26%', '50%'],
                                    data: [
                                        {value: stage1, name: `犊牛总数`,itemStyle:{normal:{color:''}}},
                                        {value: stage2, name: `育成牛总数`,itemStyle:{normal:{color:''}}},
                                        {value: stage3, name: `青年牛总数`,itemStyle:{normal:{color:''}}},
                                        {value: stage4, name: `成年牛总数`,itemStyle:{normal:{color:''}}},
                                    ],
                                    /*label: {
                                        normal: {
                                            show:true,
                                            position:'inner', //标签的位置
                                            textStyle : {
                                                fontSize : 16    //文字的字体大小
                                            },
                                            formatter:'{d}%'
                                        }
                                    },*/
                                    label:{            //饼图图形上的文本标签
                                        normal:{
                                            show:true,
                                            position:'inner', //标签的位置
                                            textStyle : {
                                                fontWeight : 300 ,
                                                fontSize : 9    //文字的字体大小
                                            },
                                            formatter:'{d}%'


                                        }
                                    },
                                    itemStyle: {
                                        emphasis: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                                        }
                                    }
                                }
                            ]
                        })
                    }
                }).catch((err) => {})
            },

            Morbidity_init() { // 发病率
                let myChart = this.$echarts.init(document.getElementById('Morbiditycontainer'))
                this.$get(queryDiseaseCountByCp, {cattlefarmId: '0_ZL6002', token: Cookies.get('token')}).then((res) => {
                    if (res.code === 200) {
                        //let count = res.data.count
                        //let months = res.data.months
                        var seriesdata = []
                        var xAxisdata = []
                        for(var i = 0;i< res.data.length;i++){
                            seriesdata.push(res.data[i].value)
                            xAxisdata.push(res.data[i].name)
                        }
                        myChart.setOption({
                            grid: {
                                x:1,
                                y:5,
                                top: '3%',   // 等价于 y: '16%'
                                left: '0',
                                right: '5',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: {
                                type: 'category',
                                boundaryGap: false,
                                data: xAxisdata,
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
                            series: {
                                data: seriesdata,
                                type: 'line',
                                smooth: true,
                            }
                        })
                    }
                }).catch((err)=> {})
            },
            immune_init() { // 免疫统计
                let myChart = this.$echarts.init(document.getElementById('immunecontainer'))
                this.$get(getImmuneStatis, {cattlefarmId: '0_ZL6002', token: Cookies.get('token')}).then((res) => {
                    if (res.code === 200) {
                        //let count = res.data.count
                        //let months = res.data.months
                        var seriesdata = []
                        var xAxisdata = []
                        for(var i = 0;i< res.data.length;i++){
                            seriesdata.push(res.data[i].count)
                            xAxisdata.push(res.data[i].months)
                        }
                        myChart.setOption({
                            grid: {
                                x:1,
                                y:5,
                                top: '3%',   // 等价于 y: '16%'
                                left: '0',
                                right: '5',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: {
                                type: 'category',
                                boundaryGap: false,
                                data: xAxisdata,
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
                            series: {
                                data: seriesdata,
                                type: 'line',
                                smooth: true,
                            }
                        })
                    }
                }).catch((err)=> {})
            }
        },
        created() {
            // this.initData();
            // bus.$emit('getPageName', '智慧环卫大数据中心');
        },
        computed: {
            /*cityNumber() {
                return this.$store.state.cityNumber;
                return this.$store.state.cityName;
            }*/
        },
        /*updated() {
            this.reloadEchart();
        },
        beforeDestroy() {
            clearInterval(this.timer);
        },
        destroyed() {
            clearInterval(this.timer);
        },*/
        mounted() {
            clearInterval(this.timer);
            let self = this;
            this.$nextTick(() => {
                self.timer = setInterval(function () {
                    // if(Object.keys(self.overlaysObj).length>0){
                    var tempObj = self.overlaysObj;
                    for (var i in tempObj) {
                        if (i.indexOf('device_') > -1) {
                            if (tempObj[i] !== null) {
                                tempObj[i].setMap(null)
                                delete self.overlaysObj[i];
                            }
                        }
                    }
                    // }
                    // self.initEchartAData();
                    // self.initEchartBData();
                    // self.initMarkerData();

                }, 60000);
            });
            self.Varieties_init()
            self.Enclosure_init()
            self.earlywarning()
            self.Age_init()
            self.Morbidity_init()
            self.immune_init()
            /*window.addEventListener("resize", function () {
                self.reloadEchart();
            });*/
            const that = this
            window.onresize = () => {//  根据窗口大小调整曲线大小
                let Varietiescontainer = this.$echarts.init(document.getElementById('Varietiescontainer'));
                Varietiescontainer.resize();
                let Enclosurecontainer = this.$echarts.init(document.getElementById('Enclosurecontainer'));
                Enclosurecontainer.resize();
                let Agcontainer = this.$echarts.init(document.getElementById('Agcontainer'));
                Agcontainer.resize();
                let Morbiditycontainer = this.$echarts.init(document.getElementById('Morbiditycontainer'));
                Morbiditycontainer.resize();
                let immunecontainer = this.$echarts.init(document.getElementById('immunecontainer'));
                immunecontainer.resize();
            }
        }
    }
</script>
<!-- border: 1px solid #0083db; -->
<style scoped lang="scss">
    .ui-amap-container {
        box-shadow: 0 0 5px #0083db inset;
    }

    .wrap-main {
        width: 100%;
        height: 100%;

        &.sanitation-main {
            display: flex;
        }

        .map-box {
            height: 100%;
            border: 1px solid transparent;

            &.map-center {
                margin: 0 10px;
                width: calc(60% - 210px);

                .map-toolbox {
                    width: 100%;
                    bottom: 0;
                    left: 0;
                    height: 75px;
                    background: rgba(18, 83, 255, 0.15);
                    display: flex;

                    .toolbox-list {
                        width: 20%;
                        height: 100%;
                        color: #fff;
                        font-size: 18px;
                        line-height: 75px;
                        text-align: center;
                        cursor: pointer;

                        &.current {
                            color: #ccf619;
                        }

                        &:hover {
                            -webkit-transform: scale(1.1);
                            -moz-transform: scale(1.1);
                            -ms-transform: scale(1.1);
                            -o-transform: scale(1.1);
                            transform: scale(1.1);
                        }
                    }
                }

                .map-tootip {
                    bottom: 75px;
                    right: 0px;
                    color: #fff;
                    font-size: 12px;
                    padding: 0 20px 5px 30px;

                    .tiplist {
                        position: relative;
                        line-height: 24px;

                        span {
                            margin: 0 4px;
                        }
                    }

                    .map-icon {
                        position: absolute;
                        left: -35px;
                        top: -5px;
                        transform: scale(0.5);
                    }
                }
            }

            &.map-project {
                width: 245px;

                .project-top {
                    width: 100%;
                    height: calc(100% - 85px);
                    background: rgba(18, 83, 255, 0.15);
                    margin-bottom: 10px;
                    overflow: hidden;

                    .case-content {
                        height: 100%;
                    }

                    .project-item {
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        height: 100%;
                        color: #fff;

                        .list-name {
                            font-size: 16px;
                        }

                        .project-all {
                            text-align: center;
                            line-height: 80px;
                        }

                        .project-list {
                            padding: 0 15px;
                            width: 100%;
                            height: 80px;
                            border-bottom: 1px solid #0083db;
                            box-sizing: border-box;

                            &.current {
                                box-shadow: 0 0 1rem rgba(0, 129, 222, 1) inset;
                            }

                            .list-name {
                                font-size: 16px;
                                line-height: 48px;
                                -webkit-transition: all 0.4s cubic-bezier(0.21, 1, 0.84, 1.01);
                                -moz-transition: all 0.4s cubic-bezier(0.21, 1, 0.84, 1.01);
                                transition: all 0.4s cubic-bezier(0.21, 1, 0.84, 1.01);

                                &:hover {
                                    -webkit-transform: scale(1.1);
                                    -moz-transform: scale(1.1);
                                    -ms-transform: scale(1.1);
                                    -o-transform: scale(1.1);
                                    transform: scale(1.1);
                                }
                            }

                            .all-icon {
                                background: #fff;
                                border-radius: 3px;
                                padding: 2px 3px;
                                margin-left: 6px;
                                color: #0071cf;
                                font-size: 12px;
                                height: 18px;
                                line-height: 18px;
                                box-sizing: border-box;
                            }

                            .list-num {
                                font-family: jxrhConstRegular;
                                font-size: 16px;
                                color: #ccf619;
                            }
                        }
                    }
                }

                .project-bottom {
                    height: calc((100% - 10px) / 2);
                    /*width:100%;
                    height:75px;
                    background:url('../../assets/images/login_logo.png') no-repeat center center;
                    background-size:70% 70%;
                    background-color:rgba(18,83,255,0.15);*/
                }
            }

            &.map-echart {
                width: 40%;
                height: 100%;
                display: flex;
                flex-wrap: wrap;

                .echart-box {
                    background: rgba(18, 83, 255, 0.15);
                    width: calc((100% - 10px) / 2);
                    height: calc((100% - 10px) / 2);

                    &:first-child {
                        margin-right: 10px;
                        margin-bottom: 10px;
                    }

                    &:last-child {
                        margin-left: 10px;
                    }
                }

            }
        }
    }

    .detail-panel {
        color: #fff;
        width: 250px;
        height: auto;
        font-size: 12px;
        background-color: rgba(3, 9, 33, 0.6);
        border: 1px solid #030921;
        box-shadow: 0px 0px 6px #43bfff;
        top: 20px;
        right: 20px;

        .detail-tit {
            height: 40px;
            width: 100%;
            line-height: 40px;
            background-color: rgba(50, 142, 241, 0.2);

            .tit-name {
                margin-left: 20px;
                float: left;
            }

        }

        .detail-content {
            padding: 8px 20px 8px 20px;
            box-sizing: border-box;

            li {
                width: 100%;
                line-height: 20px;
                display: inline-block;
                word-break: break-word;
                overflow: hidden;
                padding: 4px 0;

                label {
                    width: 60px;
                    float: left;
                    text-align: left;
                }

                .info {
                    margin-left: 60px;

                    &.cursor {
                        span {
                            margin-right: 8px;
                            display: inline-block;

                            &:hover {
                                transform: scale(1.2);
                            }
                        }
                    }
                }

                .info-imgbox {
                    width: 80px;
                    height: 60px;
                    background-color: rgba(0, 0, 0, 0.6);
                    text-align: center;
                }

                .info-img {
                    width: 80px;
                    height: 60px;
                    display: block;

                    img {
                        max-width: 100%;
                        overflow: hidden;
                        height: 100%;
                    }
                }

                .tip-num {
                    padding-left: 60px;
                    box-sizing: border-box;
                }
            }
        }
    }

    .el-scrollbar__wrap {
        overflow-y: scroll;
    }

    .close-icon {
        width: 15px;
        height: 15px;
        background: url('../../assets/images/close.png') no-repeat center center;

        &:hover {
            transform: scale(1.4);
        }
    }

    .close-btn {
        float: right;
        margin-right: 20px;
        margin-top: 13px;

    }

    .onebox {
        width: 100%;
        height: 100%;
    }

    .echart-tit {
        color: #fff;
        font-size: 14px;
        height: 55px;
        line-height: 50px;
        padding-left: 15px;
        box-sizing: border-box;
        .yuandian {
            display: inline-block;
            width: 4px;
            height: 4px;
            background: #1DE8F5;
            border-radius: 50%;
            vertical-align: middle;
            margin-right: 4%;
        }
    }

    .work-process, .echart-section {
        display: flex;
        flex-wrap: wrap;
    }

    .echart-content {
        width: 100%;
        height: calc(100% - 55px);
        color: #fff;
        font-size: 16px;
        padding: 0 10px 10px;
        box-sizing: border-box;
        .tabContainer {
            position: relative;
            overflow: hidden;
            height: 100%;
            border: 1px;
            .early-tab {
                width: 100%;
                overflow: hidden;
                font-family: MicrosoftYaHei;
                font-size: 12px;
                color: #1DE8F5;
                tr {
                    height: 32.5px;
                    .earlyType {
                        color: #F5A623;
                    }
                    .earlyNumber {
                        color: #F2F9FF;
                    }
                    .earlyDate {
                        color: #1DE8F5;
                    }
                    th {
                        text-align: center;
                        color: #F2F9FF;
                    }
                    td {
                        text-align: center;
                    }
                }
            }
        }
    }

    .echars-container { // 图表容器自适应
        width: 100%;
        height: 100%;
    }

    .echart-section {
        width: 100%;
        height: calc(100% - 78px);
        display: flex;
    }

    .minbox {
        width: calc((100% - 20px) / 2);
        height: calc((100% - 10px) / 2);
        text-align: center;
    }

    .rightbox {
        width: calc((100% - 20px) / 2);
        height: calc(100% - 20px);
        text-align: center;;
        box-sizing: border-box;
        margin-right: 20px;

        &:last-child {
            margin-right: 0;
        }
    }

    .echart-tabs {
        display: flex;
        width: 100%;
        height: 78px;
        box-sizing: border-box;
    }

    .chartbox {
        width: 100%;
        height: calc(100% - 20px);
    }

    .charttit {
        height: 14px;
        margin-top: -5px;
    }

    .one-tabs {
        width: 100%;
        background: rgba(18, 83, 255, 0.15);
        padding: 10px 0px 10px 10px;
        height: 78px;
        box-sizing: border-box;
    }

    .echart-tab {
        width: calc((100%) / 2);
        height: 100%;
        text-align: center;
        background: rgba(18, 83, 255, 0.15);
        padding: 10px 0px 10px 10px;
        box-sizing: border-box;

        &:first-child {
            margin-right: 10px;
        }
    }

    .echart-sub-tit {
        width: 100%;
        text-align: left;
        padding-left: 12px;
        box-sizing: border-box;
        font-size: 14px;
        color: #fff;
    }

    .echart-num {
        width: 100%;
        line-height: 2rem;
        font-size: 1.875rem;
        font-family: jxrhConstRegular;
        text-align: center;
    }

    .style-panel {
        padding: 20px;
    }

    .yellow {
        color: #f5ea0f;
    }

    .green {
        color: #2ACE00;
    }

    .blue {
        color: #2dfef9
    }

    .cursor {
        cursor: pointer;
    }

    .shadow {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        top: 0;
        left: 0;
    }

    .shadow-box {
        box-sizing: border-box;
        padding: 4.5% 14%;
    }

    .pictureBoxs {
        border: 1px solid #030921;
        box-shadow: 0px 0px 6px #43bfff;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background-color: #000;
        color: #fff;
        font-size: 16px;
    }

    .picture-content {
        width: 100%;
        height: 100%;
    }

    .close-tit {
        padding: 0 54px;
        box-sizing: border-box;
        height: 50px;
        width: 100%;
        line-height: 50px;
        display: flex;

        .close-name {
            width: 25%;
        }

        .close-tipnum {
            width: 50%;
            text-align: center;
        }

        .close-button {
            width: 25%;
            height: 100%;

            .close-icon {
                display: inline-block;
                text-align: right;
                margin-top: 17px;

                &:hover {
                    transform: scale(1.4);
                }
            }
        }
    }

    .picture-center {
        height: calc(100% - 50px);
        width: 100%;
        display: flex;

        .arrow-btn {
            width: 54px;
            height: 100%;

            .arrow-icon {
                width: 20px;
                vertical-align: middle;
                height: 34px;
                display: inline-block;
                background: url('../../assets/images/arrow.png') no-repeat 0 0;
                bottom: 0;
                top: 0;
                left: 0;
                right: 0;
                margin: auto;

                &.pre-icon {
                    background-position: 0 0;

                    &:hover {
                        transform: scale(1.4);
                    }
                }

                &.after-icon {
                    background-position: 0 -41px;

                    &:hover {
                        transform: scale(1.4);
                    }
                }
            }
        }

        .picture-box {
            width: calc(100% - 108px);
            height: 100%;
            text-align: center;
            vertical-align: middle;

            div {
                width: 100%;
                height: 100%;

                img {
                    max-height: 100%;
                    max-width: 100%;
                }
            }
        }
    }
</style>
