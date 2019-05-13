<template>
    <div id="Map"></div>
</template>

<script>
    import {cattleTracks, warnRecordOne} from '@/libs/api'
    import {getCookie} from '@/libs/cookieFun'

    export default {
        data() {
            return {
                map: '',
                markerplayback: '',
                lineArrplayback: [],
                polygonArray: [],
                markerLists: [],
                markerALL: [],
                rfids: this.$route.query.id
            }
        },
        mounted() {
            this.tostMapsInit()
        },
        methods: {
            tostMapsInit() {
                // 创建轨迹地图标签
                var mapTostContent = document.getElementById('Map');
                var tostMap = document.createElement('div');
                tostMap.setAttribute('id', 'tostMap');
                mapTostContent.appendChild(tostMap)
                var date_search = document.createElement('div');
                date_search.className = "date_search"
                date_search.innerHTML = '<div class="dateWrapperleft" style="display: none"><input class="dateinput" id="date1" type="date"><b class="zhiTxt">至</b><input class="dateinput" id="date2" type="date"></div>'
                mapTostContent.appendChild(date_search)

                var exit = document.createElement('div');
                exit.className = "eixt"
                exit.innerHTML = "返回"
                exit.onclick = this.exitClick;
                mapTostContent.appendChild(exit)

                var dateWrapperright = document.createElement("div");
                dateWrapperright.className = "dateWrapperright"

                var searchBtn = document.createElement('div');
                searchBtn.innerHTML = "轨迹播放"
                searchBtn.setAttribute("id", "searchBtn")
                searchBtn.onclick = this.searchclick

                /*var search_playbtn_hr = document.createElement("b")
                search_playbtn_hr.className = "search_playbtn_hr"*/

                var palyBtn = document.createElement('div');
                palyBtn.setAttribute("id", "palyBtn")
                palyBtn.className = "playpause1"
                palyBtn.onclick = this.palyBtn

                dateWrapperright.appendChild(searchBtn)
                // dateWrapperright.appendChild(search_playbtn_hr)
                date_search.appendChild(dateWrapperright)
                dateWrapperright.appendChild(palyBtn)
                this.tostMap = new AMap.Map('tostMap', {
                    resizeEnable: true,
                    center: [116.397428, 39.90923],
                    zoom: 5
                })
                this.playback(this.rfids)

            },
            async playback(rfid) {

                // 绘制轨迹
                var cattleTracks_data = await this.$get(cattleTracks, {rfid: rfid, token: getCookie('token')})
                if (cattleTracks_data.data.length > 0) {
                    this.lineArrplayback = []// 清空上一次数据
                    this.markerLists = []
                    for (var i = 0; i < cattleTracks_data.data.length; i++) {
                        this.lineArrplayback.push([cattleTracks_data.data[i].longitude, cattleTracks_data.data[i].latitude])

                        if(i==0){
                            this.markerplayback = new AMap.Marker({
                                map: this.tostMap,
                                position: [cattleTracks_data.data[i].longitude, cattleTracks_data.data[i].latitude],
                                icon: require("@/views/Monitored/icon/cowb3.png"),
                                //offset: new AMap.Pixel(-26, -13),
                                offset: new AMap.Pixel(-26, -35),
                                autoRotation: true,
                                angle: -90
                            });

                        }else if(i==cattleTracks_data.data.length-1){
                            this.markerLists = new AMap.Marker({
                                map: this.tostMap,
                                position: [cattleTracks_data.data[i].longitude, cattleTracks_data.data[i].latitude],
                                title : cattleTracks_data.data[i].createDate,
                                icon: require("@/views/Monitored/icon/end.png"),
                                offset: new AMap.Pixel(-26, -35),
                                autoRotation: true,
                                angle: 0
                            })

                        }else {

                            this.markerLists = new AMap.Marker({
                                map: this.tostMap,
                                position: [cattleTracks_data.data[i].longitude, cattleTracks_data.data[i].latitude],
                                title : cattleTracks_data.data[i].createDate,
                                icon: require("@/views/Monitored/icon/pointright.png"),
                                offset: new AMap.Pixel(-10, -8),
                                autoRotation: true,
                                angle: 0
                            })
                        }
                    }
                }

                // console.log(this.lineArrplayback[0][0])
                var polyline = new AMap.Polyline({
                    map: this.tostMap,
                    path: this.lineArrplayback,
                    showDir: true,
                    strokeColor: "#28F",  //线颜色
                    // strokeOpacity: 1,     //线透明度
                    strokeWeight: 6,      //线宽
                    // strokeStyle: "solid"  //线样式
                });
                var passedPolyline = new AMap.Polyline({
                    map: this.tostMap,
                    // path: lineArr,
                    strokeColor: "#AF5",  //线颜色
                    // strokeOpacity: 1,     //线透明度
                    strokeWeight: 6,      //线宽
                    // strokeStyle: "solid"  //线样式
                });

                this.markerplayback.on('moving', function (e) {
                    passedPolyline.setPath(e.passedPath);
                });
                this.tostMap.setFitView()
            },
            // 运动轨迹播放/暂停按钮图标
            palyBtn() {
                if (document.getElementById("palyBtn").getAttribute("data-a") == "palyBtn2") {
                    this.resumeAnimation()
                    document.getElementById("palyBtn").setAttribute("data-a", "palyBtn1")
                    document.getElementById("palyBtn").setAttribute("class", "playpause2")
                    return;
                }
                if (document.getElementById("palyBtn").getAttribute("data-a") == "palyBtn1") {
                    this.pauseAnimation()
                    document.getElementById("palyBtn").setAttribute("data-a", "palyBtn2")
                    document.getElementById("palyBtn").setAttribute("class", "playpause1")
                    return;
                }
                this.startAnimation()
                document.getElementById("palyBtn").setAttribute("data-a", "palyBtn1")
                document.getElementById("palyBtn").setAttribute("class", "playpause2")

            },
            // 开始运行轨迹
            startAnimation() {
                this.markerplayback.moveAlong(this.lineArrplayback, 120);
            },

            pauseAnimation() {
                this.markerplayback.pauseMove();
            },

            resumeAnimation() {
                this.markerplayback.resumeMove();
            },
            // 返回上一页
            exitClick() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="scss">
    #Map,#tostMap {
        width: 100%;
        height: 100%;
    }
    .date_search {
        position: absolute;
        top: 22px;
        left: 85px;
        background: #fff;
    }
    .dateWrapperleft {
        width: 400px;
        height: 36px;
        line-height: 36px;
        border: 1px solid #ccc;
        float: left;
    }
    .dateinput {
        height: 36px;
        text-align: center;
        border: none;
        width: 47%;
        float: left;
        outline: none;
    }
    .zhiTxt {
        padding-right: 10px;
        font-weight: normal;
        font-size: 12px;
        float: left;
    }
    .dateWrapperright {
        width: 100px;
        height: 36px;
        line-height: 36px;
        background-color: #15889A;
        float: right;
        padding-bottom: 2px;
        position: relative;
    }
    #searchBtn {
        float: left;
        position: absolute;
        top: 0px;
        left: 9px;
        background-repeat: no-repeat;
        display: inline-block;
        background-size: 18px;
        color: #ffffff;
    }
    .search_playbtn_hr {
        width: 0px;
        height: 20px;
        border: 1px solid #FFFFFF;
        position: absolute;
        left: 46px;
        top: 10px;
    }
    .playpause1,.playpause2{
        float: right;
        width: 14px;
        height: 17px;
        background-repeat: no-repeat;
        background-position: center right;
        background-size: 14px;
        position: absolute;
        right: 20px;
        top: 10px;
    }
    .palyBtn {
    }
    .playpause1 {
        background-image: url('../../views/Monitored/icon/play.png');
        cursor: pointer;
    }

    .playpause2 {
        background-image: url('../../views/Monitored/icon/playpause.png');
        cursor: pointer;
    }

    .eixt {
        position: absolute;
        top: 24px;
        right: 43px;
        width: 52px;
        height: 34px;
        border-radius: 2px;
        line-height: 34px;
        text-align: center;
        background: #15889A;
        color: #ffffff;
        cursor: pointer;
    }
</style>