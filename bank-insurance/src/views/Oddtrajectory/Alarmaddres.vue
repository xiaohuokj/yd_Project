<template>
    <div id="Map"></div>
</template>

<script>
    import {cattleTracks, warnRecordOne,cattlePosition} from '@/libs/api'
    import {getCookie} from '@/libs/cookieFun'
    import { Message } from 'element-ui'

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


                this.tostMap = new AMap.Map('tostMap', {
                    resizeEnable: true,
                    zoom: 5
                })
                this.playback(this.rfids)

            },
            async playback(rfids) {

                this.$get(cattlePosition, {id: rfids, token: getCookie('token')}).then((res) => {
                    if (res.code === 200) {
                        if (res.data.length > 0&& res.data[0].longitude!=0) {
                            for (var i = 0; i < res.data.length; i++) {

                                this.markerLists = new AMap.Marker({
                                    map: this.tostMap,
                                    position: [res.data[i].longitude, res.data[i].latitude],
                                    title: res.data[i].createDate,
                                    icon: require("@/views/Monitored/icon/cow2.png"),
                                    offset: new AMap.Pixel(-10, -8),
                                    autoRotation: true,
                                    angle: 0
                                })
                                this.tostMap.setFitView(this.markerLists)
                            }
                        }else {
                            const h = this.$createElement;
                            Message({
                                message:'此告警没有位置信息！！！！',
                                type: "提示",
                                duration: 2000,
                                onClose:this.exitClick
                            });

                        }
                    }
                })

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