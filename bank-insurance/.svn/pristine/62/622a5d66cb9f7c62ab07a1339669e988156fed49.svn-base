<template>
    <div class="ui-amap-container">
        <el-amap
                :vid="vid"
                :zoom="zoom ? zoom : 18"
                :mapStyle="mapStyle ? mapStyle :''"
                :events="mapEvents"
                :center="center ? center : [122.250127, 43.663418]"
                :amap-manager="AmapManager"
                :dragEnable="dragEnable"
                :zoomEnable="zoomEnable"
                :doubleClickZoom="doubleClickZoom"
                :scrollWheel="scrollWheel"
                :keyboardEnable="keyboardEnable">
            <slot></slot>
        </el-amap>

        <div class="map-toolside">
            <!-- 卫星 路网 -->
            <ul class="layerbox-square satellite-wrap" v-show="satelliteHide"><!-- satelliteHide卫星图是否隐藏  默认为不隐藏 -->
                <li class="roadnet" :class="{open: roadnetCurrent, current:lineCurrent}" @click="roadnetClick"><span><i
                        class="icons-map"></i><span>路网</span></span></li>
                <li class="satellite" :class="{current: roadnetCurrent}" @click="satelliteClick"><span><i
                        class="icons-map"></i><span></span></span></li>
            </ul>
            <!-- 测距 测面 -->
            <ul class="layerbox-square" v-show="measureHide"><!-- 测绘工具是否隐藏  默认不隐藏 -->
                <li class="ranging" :class="{current: rangingCurrent}" @click="rangingClick"><i class="icons-map"></i>
                    <p>测距</p></li>
                <li class="measuring-surface" :class="{current: measuringCurrent}" @click="measuringClick"><i
                        class="icons-map"></i>
                    <p>测面</p></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {cpRealTimePreview, queryFenceList} from '@/libs/api'
    import {getCookie} from '@/libs/cookieFun'
    import bus from '@/libs/bus'
    import points from '../../views/Monitored/points'
    export default {
        props: ['vid', 'zoom', 'center', 'mapStyle', 'plugin', 'AmapManager', 'satelliteHide', 'measureHide', 'init', 'moveend', 'zoomchange', 'click', 'dragEnable', 'zoomEnable', 'doubleClickZoom', 'scrollWheel', 'keyboardEnable'],

        data() {
            return {
                map: '',
                mapEvents: {
                    init: (o) => {
                        if (this.init && typeof this.init == 'function') {
                            this.init(o);
                        }
                        this.map = o;
                        // bus.$emit('getMapObj', this.map);
                        // this.$store.commit('updateMap', this.map);
                        /*var circle = new AMap.Circle({
                            // center: [121.5273285, 31.21515044],
                            center: this.center,
                            radius: 1000, //半径
                            borderWeight: 3,
                            strokeColor: "#FF33FF",
                            strokeOpacity: 1,
                            strokeWeight: 6,
                            strokeOpacity: 0,
                            fillOpacity: 0.2,
                            strokeStyle: 'dashed',
                            strokeDasharray: [10, 10],
                            // 线样式还支持 'dashed'
                            fillColor: '#1791fc',
                            zIndex: 50,
                        })

                        circle.setMap(this.map)
                        // 缩放地图到合适的视野级别
                        this.map.setFitView([ circle ])*/
                        // var circleEditor = new AMap.CircleEditor(this.map, circle)
                        // this.initTools();
                    },
                },
                lineCurrent: false,/*路网显示*/
                roadnetCurrent: false,/*卫星选中*/
                rangingCurrent: false,/*测距选中*/
                measuringCurrent: false,/*测面显示*/
                satellLayer: '',/*卫星工具*/
                roadnetLayer: '',/*路网工具*/
                mousetool: '',/*鼠标工具*/
                cattlefarmId: '', // 牛场id 0_CSQY001
                MarkerArray: [],
                polygonArraylist: [],
                markflag:false

            }
        },
        methods: {
            /*初始化地图工具*/
            initTools() {
                this.mousetool = new AMap.MouseTool(this.map);
            },
            mappolygon() {
                let _this = this
                let data = {
                    cattlefarmId: _this.cattlefarmId,
                    token: getCookie('token')
                }
                _this.$get(queryFenceList, data ).then((res) => {
                    if (res.code === 200) {
                        if (res.data.length > 0) {
                            for (var i = 0; i <res.data.length; i++) {
                                //debugger
                                _this.polygonArraylist = new AMap.Polygon({
                                    path: res.data[i].point,
                                    fillColor: '#fff', // 多边形填充颜色
                                    strokeWeight: 6,
                                    strokeOpacity: 0,
                                    fillOpacity: 0.2,
                                    fillColor: '#e5fcf7',
                                });
                                _this.map.add(_this.polygonArraylist);
                                // if ( !this.markflag){
                                _this.map.setFitView(_this.polygonArraylist)
                                // }
                            }
                        }
                    }
                })
            },
            mapMarker() {
                // var poins = [{ 'lnglat': ['122.2629404068','43.6316334913']},{ 'lnglat': ['122.2655153275','43.6327672341']},{ 'lnglat': ['122.2694300000','43.6331100000']}, {'lnglat': ['122.262457','43.628712']}]
                this.$get(cpRealTimePreview, {cattlefarmId: this.cattlefarmId, token: getCookie('token')}).then((res) => {
                    if (res.code === 200) {
                        this.markflag = false;
                        debugger
                        if (res.data.length > 0) {
                            var positions = []
                            this.markflag = true;
                            // this.map.clear();
                            for (var i = 0; i < res.data.length; i++){

                                var iconTrue = require("@/views/Monitored/icon/cow3.png")
                                if (res.data[i].isOnline === "true") { // true 是在线  false 是离线
                                    iconTrue = require("@/views/Monitored/icon/cow3.png")

                                } else {
                                    iconTrue = require("@/views/Monitored/icon/cow1.png")

                                }
                                positions.push([res.data[i].longitude,res.data[i].latitude])
                                this.MarkerArray = new AMap.Marker({

                                    position: [res.data[i].longitude,res.data[i].latitude],   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                                    icon: iconTrue,
                                    title : "子扣:"+res.data[i].rfid +"\r\n"+"品种:"+res.data[i].variety+"\r\n"+"毛色:"+res.data[i].coatColour+"\r\n"+"畜牧主:"+res.data[i].cattlefarmName+";",
                                    size: (28, 42),
                                    zIndex: 9999999
                                });
                                this.map.add(this.MarkerArray);

                            }
                            // this.polygonArraylistak = new AMap.Polygon({
                            //     path: positions,
                            //     strokeOpacity: 0,//透明
                            //     fillOpacity: 0,//透明
                            //     fillOpacity: 1,
                            //     bubble: true
                            // });
                            //
                            //
                            // // 自适应居中所有mark点
                            //
                            // this.map.setFitView(this.polygonArraylistak);
                            // this.map.getCenter();

                        }
                    }
                })
                /*for (var i = 0; i < poins.length; i++){
                    var marker = new AMap.Marker({
                        position: poins[i]['lnglat'],   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                        icon: require("@/views/Monitored/icon/cow3.png"),
                        size: (28, 42),
                        zIndex: 9999999
                    });
                    this.map.add(marker);
                }*/
            },

            satelliteClick() {
                this.roadnetCurrent = !this.roadnetCurrent;
                this.lineCurrent = false;
                if (!this.satellLayer) {
                    let satellLayer = new AMap.TileLayer.Satellite({zIndex: 10, map: this.map}); //实例化卫星图
                    let roadnetLayer = new AMap.TileLayer.RoadNet({zIndex: 10, map: this.map});//路网图
                    this.satellLayer = satellLayer;
                    this.roadnetLayer = roadnetLayer;
                }
                if (this.roadnetCurrent) {
                    this.satellLayer.show();
                    this.roadnetLayer.hide();
                } else {
                    this.roadnetLayer.hide();
                    this.satellLayer.hide();
                }
            },
            roadnetClick() {
                this.lineCurrent = !this.lineCurrent;
                if (this.lineCurrent) {
                    this.roadnetLayer.show();
                } else {
                    this.roadnetLayer.hide();
                }
            },
            rangingClick() {
                let that = this;
                this.rangingCurrent = !this.rangingCurrent;
                this.measuringCurrent = false;
                this.mousetool && this.mousetool.close(true);
                if (this.rangingCurrent) {
                    this.mousetool.rule({
                        lineOptions: {
                            strokeColor: '#f86a71'
                        }
                    });
                }
                /*测量一次结束测量*/
                this.mousetool.on("draw", function () {
                    that.mousetool && that.mousetool.close();
                    that.rangingCurrent = false;
                });
            },
            measuringClick() {
                let that = this;
                this.measuringCurrent = !this.measuringCurrent;
                this.rangingCurrent = false;
                this.mousetool && this.mousetool.close(true);
                if (this.measuringCurrent) {
                    this.mousetool.measureArea({
                        strokeColor: '#f86a71',
                        fillColor: '#caecf8'
                    });  //调用鼠标工具的面积量测功能
                }
                /*测量一次结束测量*/
                this.mousetool.on("draw", function () {
                    that.mousetool && that.mousetool.close();
                });
            }
        },
        mounted () {
            this.$nextTick(() => {
            })
            bus.$on('cattlefarm_Id', (cattlefarm_Id) => {
                debugger
                this.cattlefarmId = cattlefarm_Id
                this.mapMarker()
                this.mappolygon() // 多边形围栏

            })
        },
        beforeDestroy () {
            bus.$off('cattlefarm_Id');
        },
        created() {
        }
    }
</script>

<style lang="scss">
    /* @path: '../../assets/images/'; */
    .ui-amap-container {
        .icons-map {
            width: 20px;
            height: 20px;
            display: inline-block;
            /*background: url('@{path}map/icon-map.png') no-repeat 0 0;*/
            vertical-align: -2px;
        }

        height: 100%;
        position: relative;

        .map-toolside {
            position: absolute;
            right: 16px;
            bottom: 96px;
            top: auto;
            width: 32px;

            .layerbox-square {
                position: static;
                margin-bottom: 10px;
                padding: 0px;
                color: #666666;
                font-size: 12px;
                line-height: 20px;
                -webkit-box-shadow: 0px 8px 13px -5px rgba(6, 69, 54, 0.24);
                -moz-box-shadow: 0px 8px 13px -5px rgba(6, 69, 54, 0.24);
                box-shadow: 0px 8px 13px -5px rgba(6, 69, 54, 0.24);

                li {
                    cursor: pointer;
                    float: none;
                    border-right: 0px;
                    border-bottom: 1px #dddddd solid;
                    padding: 7px 4px;
                    text-align: center;
                    margin-bottom: 0px;
                    background-color: #ffffff;

                    .icons-map {
                        vertical-align: top;
                    }

                    p {
                        line-height: normal;
                    }
                }

                li:last-child {
                    border-bottom: 0px;
                }

                li.roadnet {
                    position: absolute;
                    top: 0;
                    right: 0;
                    opacity: 0;
                    z-index: 0;
                    white-space: nowrap;
                    -webkit-transition: opacity 0.5s linear, right 0.5s linear;
                    -moz-transition: opacity 0.5s linear, right 0.5s linear;
                    -ms-transition: opacity 0.5s linear, right 0.5s linear;
                    transition: opacity 0.5s linear, right 0.5s linear;

                    .icons-map {
                        margin-right: 6px;
                        background-position: 0px -100px;
                    }
                }

                li.roadnet:hover {
                    .icons-map {
                        background-position: 0px -80px;
                    }
                }

                li.roadnet.open {
                    opacity: 1;
                    right: 32px;
                }

                li.roadnet.current, li.roadnet:active {
                    .icons-map {
                        background-position: 0px -60px;
                    }
                }

                li.roadnet.current:active {
                    .icons-map {
                        background-position: 0px -100px;
                    }
                }

                li.satellite {
                    position: absolute;
                    z-index: 1;

                    .icons-map {
                        background-position: -1px 1px;
                    }
                }

                li.satellite:hover {
                    .icons-map {
                        background-position: -1px -19px;
                    }
                }

                li.satellite.current, li.satellite:active {
                    .icons-map {
                        background-position: -1px -39px;
                    }
                }

                li.satellite.current:active {
                    .icons-map {
                        background-position: -1px 1px;
                    }
                }

                li:hover {
                    color: #ff8642;
                }

                li:active,
                li.current {
                    color: #1da381;
                }

                li.current:active {
                    color: #666;
                }

                li.ranging {
                    .icons-map {
                        background-position: -20px 0px;
                    }
                }

                li.ranging:hover {
                    .icons-map {
                        background-position: -20px -20px;
                    }
                }

                li.ranging.current, li.ranging:active {
                    .icons-map {
                        background-position: -20px -40px;
                    }
                }

                li.measuring-surface {
                    .icons-map {
                        background-position: -40px 0px;
                    }
                }

                li.measuring-surface:hover {
                    .icons-map {
                        background-position: -40px -20px;
                    }
                }

                li.measuring-surface.current, li.measuring-surface:active {
                    .icons-map {
                        background-position: -40px -40px;
                    }
                }
            }

            .satellite-wrap {
                height: 34px;

                li {
                    border-bottom: none;
                    text-align: center;
                }

                li.satellite {
                    width: 100%;
                }

                li.roadnet {
                    border-right: 1px #dddddd solid;
                }
            }

            .layerbox-square:last-child {
                margin-bottom: 0px;
            }
        }

        .amap-touch-toolbar {
            bottom: 100px !important;
            right: 12px !important;

            .amap-zoom-touch-plus, .amap-zoom-touch-minus {
                margin-bottom: 0;
                height: 33px;
                background-color: rgba(27, 48, 83, 0.6);

                div {
                    line-height: 28px;
                    color: #999;
                }
            }

            .amap-zoomcontrol:after {
                width: 100%;
                top: 32px;
            }

            .amap-zoomcontrol {
                width: 32px;
                background-color: rgba(27, 48, 83, 0.6);
                border-radius: 0;
                border: none;
                -webkit-box-shadow: 0px 8px 13px -5px rgba(6, 69, 54, 0.24);
                -moz-box-shadow: 0px 8px 13px -5px rgba(6, 69, 54, 0.24);
                box-shadow: 0px 8px 13px -5px rgba(6, 69, 54, 0.24);
            }

        }

        /*去除地图logo及版本*/
        .amap-logo {
            display: none !important;
        }

        .amap-copyright {
            display: none !important;
        }
    }
</style>
