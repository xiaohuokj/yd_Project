<template>
	<div class="wrap-main" id="emergWraper">
		<div class="map-container p-relative">
            <div class="horn horn-top-left"></div>
            <div class="horn horn-top-right"></div>
            <div class="horn horn-bottom-left"></div>
            <div class="horn horn-bottom-right"></div>
			<amap :vid="vid" :init="init" :zoom="zoom" :plugin="plugin" :center="center" :mapStyle="mapStyle" >
				<!-- <el-amap-marker></el-amap-marker> -->
			</amap>
			<div class="map-context p-absolute">
				<div class="case-panel p-relative" :class="{noborder:formVisible}">
					<ul class="clearfix">
						<div class="panel-tit f-left" v-if="!formVisible">
							<li class="case-list" @click="caseDetail">
								<div class="case-list-info"><span>案件数量</span><h3 class="orange">{{totalObj.caseCount?totalObj.caseCount:0}}</h3></div>
							</li>
							<li class="case-list">
								<div class="case-list-info"><span>应急人员</span><h3>{{totalObj.peopleCount?totalObj.peopleCount:0}}</h3></div>
							</li>
							<li class="case-list">
								<div class="case-list-info"><span>应急车辆</span><h3>{{totalObj.carCount?totalObj.carCount:0}}</h3></div>
							</li>
						</div>
						<div class="panel-tit form-tit f-left" v-else="formVisible">
							<p>新增应急案件</p>
						</div>
						<li class="case-list-button p-relative f-right">
							<div class="case-list-btn p-absolute"  title="新增应急案件" @click="addEvent"><i class="tool-icon tool-add" :class="{open:formVisible}"></i></div>

						</li>
					</ul>
				</div>
				<emerg-form ref="emergeform" v-show="formVisible" @pareloading="pareload"></emerg-form>
				<emerg-list v-show="casePanelShow" ref="emergeList" @fresh="refresh" @emergefresh="emergeload"></emerg-list>
				<emerg-dealevent v-show="caseDealShow" ref="emergedealevent" @closeEmerge="closeEmerge" @emergeLoad="emergeload"></emerg-dealevent>
			</div>
            <div class="case-brocast p-absolute" v-if="brocastList && brocastList.length>0">
                <div class="brocast-title" @click="lookMore">
                    <i class="el-icon-caret-right" :class="{open:showMoreBrocast}"></i><span>实时播报</span>
                </div>
                <el-scrollbar class="issue-content" style="width:376px">
                    <ul class="brocast-item" ref="brocast" @scroll="scrollFun"  v-if="brocastList && brocastList.length>0">
                        <li :id="brocastList[0].id" :class="{active:activeId== brocastList[0].id}" @click="brocastMoreFun(brocastList[0])">
                            <p>
                            <span class="brocast-item-time">{{moment(brocastList[0].createTime).format('HH:mm')}}</span><span :title="brocastList[0].content">{{brocastList[0].content}}</span>
                            </p>
                        </li>
        					<div  v-show="showMoreBrocast">
        						<li :id="item.id" :class="{active:activeId== item.id}" @click="brocastMoreFun(item)" v-for="(item,index) in brocastList"v-if="index!=0">
        							<p>
        							<span class="brocast-item-time">{{moment(item.createTime).format('HH:mm')}}</span><span :title="item.content">{{item.content}}</span></p>
        						</li>
        					</div>
                    </ul>
                    <div v-show="showMoreBrocast">
                        <p v-if="loadData==2" class="load-text" :loading="scroll">{{scroll?'正在加载中。。。':'已加载全部数据'}}</p>
                        <!-- <p v-else-if="loadData==1" class="load-text">加载更多</p> -->
                    </div>
                </el-scrollbar>
            </div>
			<div class="map-device-detail" ref="overlayPanel" v-show="overlayDetailshow">
				<div class="over-tit p-relative">详情<i class="p-absolute el-icon-close" @click="closePanel"></i></div>
				<div class="over-content p-relative">
					<ul class="detail-panel">
						<li class="detail-item p-relative">
							<label>名称</label><div class="detail-info"><span v-if="overlayDetail.name" :title="overlayDetail.name">{{overlayDetail.name}}</span><span v-else class="null-data">无数据</span></div>
                            <span class="p-absolute tool-icon tool-vehicle" v-if="overlayDetail.carVideoNum || facilityType==1"
                            @click="vechileVideo(overlayDetail)"></span>
                            <!-- <span class="p-absolute tool-icon tool-vehicle" @click="vechileVideo(overlayDetail)"></span> -->
						</li>
						<div v-if="overType==5 || overType==6">
							<li class="detail-item">
								<label>垃圾类型</label><div class="detail-info"><span v-if="overlayDetail.garbageType">{{overlayDetail.garbageType==1?'可回收':overlayDetail.garbageType==2?'厨余':overlayDetail.garbageType==3?'有害':'其他'}}</span><span v-else class="null-data">无数据</span></div>
							</li>
							<li class="detail-item">
								<label>处理能力</label><div class="detail-info"><span v-if="overlayDetail.processingCapacity">{{overlayDetail.processingCapacity}}吨</span><span v-else class="null-data">无数据</span></div>
							</li>
							<li class="detail-item">
								<label>今日处理</label><div class="detail-info"><span v-if="overlayDetail.todayProcessing">{{overlayDetail.todayProcessing}}吨</span><span v-else class="null-data">无数据</span></div>
							</li>
						</div>
						<div v-else-if="overType==7">
							<li class="detail-item">
								<label>公厕等级</label><div class="detail-info"><span v-if="overlayDetail.level">{{overlayDetail.level==1?'一级':overlayDetail.level==2?'二级':overlayDetail.level==3?'三级':'高级'}}</span><span v-else class="null-data">无数据</span></div>
							</li>
							<li class="detail-item">
								<label>设计承载</label><div class="detail-info">
                                    <span v-if="overlayDetail.menLatrineNum==0 || overlayDetail.menLatrineNum==null" class="null-data">无数据</span>
									<span v-else>男{{overlayDetail.menLatrineNum}}人</span>
                                    <span v-if="overlayDetail.womenLatrineNum==0 || overlayDetail.womenLatrineNum==null" class="null-data">无数据</span>
                                    <span v-else>女{{overlayDetail.womenLatrineNum}}人</span>
                                    <span v-if="overlayDetail.otherLatrineNum==null" class="null-data">无数据</span>
                                    <span v-else>第三{{overlayDetail.otherLatrineNum}}人</span>
                                </div>
							</li>
						</div>
						<div v-else-if="overType==201">
							<li class="detail-item">
								<label>岗位</label><div class="detail-info"><span v-if="overlayDetail.operatingPost">{{overlayDetail.operatingPost}}</span><span v-else class="null-data">无数据</span></div>
							</li>
							<li class="detail-item">
								<label>应急任务</label><div class="detail-info"><span v-if="overlayDetail.caseName">{{overlayDetail.caseName}}</span><span v-else class="null-data">无数据</span></div>
							</li>
							<li class="detail-item">
								<label>应急分组</label><div class="detail-info"><span v-if="overlayDetail.groupName">{{overlayDetail.groupName}}</span><span v-else class="null-data">无数据</span></div>
							</li>
						</div>
						<div v-else-if="overType==1">
							<li class="detail-item">
								<label>车辆类型</label><div class="detail-info"><span v-if="overlayDetail.operatingPost">{{overlayDetail.operatingPost}}</span><span v-else class="null-data">无数据</span></div>
							</li>
							<li class="detail-item">
								<label>司机姓名</label><div class="detail-info"><span v-if="overlayDetail.driverName">{{overlayDetail.driverName}}</span><span v-else class="null-data">无数据</span></div>
							</li>
							<li class="detail-item">
								<label>应急任务</label><div class="detail-info"><span v-if="overlayDetail.caseName">{{overlayDetail.caseName}}</span><span v-else class="null-data">无数据</span></div>
							</li>
							<li class="detail-item">
								<label>应急分组</label><div class="detail-info"><span v-if="overlayDetail.groupName">{{overlayDetail.groupName}}</span><span v-else class="null-data">无数据</span></div>
							</li>
						</div>
						<li class="detail-item">
							<label>所属项目</label><div class="detail-info"><span v-if="overlayDetail.projectName" :title="overlayDetail.projectName">{{overlayDetail.projectName}}</span><span v-else class="null-data">无数据</span></div>
						</li>
						<li class="detail-item">
							<label>所属公司</label><div class="detail-info"><span v-if="overlayDetail.companyName">{{overlayDetail.companyName}}</span><span v-else class="null-data">无数据</span></div>
						</li>
					</ul>
					<div class="p-absolute terminal-tbn" v-if="overType==1 || overType==201">
						<div class="talk-btn" @click="getTempGTalk(overlayDetail.talkAccount)" v-if="overlayDetail.talkAccount">
							<i class="tool-icon tool-talk"></i><span>对讲</span>
						</div>
						<div class="videos-btn" @click="getTempGVideo(overlayDetail.talkAccount)" v-if="overlayDetail.talkAccount">
							<i class="tool-icon tool-video"></i><span>视频</span>
						</div>
					</div>
				</div>
			</div>
        </div>
        <video-list ref="videolist" v-show="videoShow"  @closeVideo="initStatus"></video-list>
	</div>
</template>
<script>
	/*import Util from '@/libs/util'
    import * as api from "@/libs/api"
    import bus from '@/libs/bus'
    import moment from 'moment'
    import EmergForm from './EmergForm.vue'
    import EmergDealevent from './EmergDealevent.vue'
    import EmergeQualitylist from './EmergeQualitylist.vue'
    import EmergList from './EmergList.vue'
    import VideoList from '../CommonVideo/VideoList.vue'*/
export default{
	name:'EmergCommd',
	components: { EmergForm,EmergDealevent,EmergeQualitylist,EmergList,VideoList },
	data(){
		return{
			vid: 'emerg-amap',
            markerobj:{},
            plugin: [{
                pName: 'ToolBar',
                liteStyle: true
            }],
            zoom: 10,
            mapObj: null,
            mapStyle:'amap://styles/8ae924480c549dbcf37982f127d3939d',
            resizeEnable:true,
            satelliteHide:false,
            measureHide:false,
            markers: [],
            center:[116.397428, 39.90923],
            formVisible:false,
            showMoreBrocast:false,
            casePanelShow:false,
            caseDealShow:false,
            videoShow:false,
            activeId:'',
            totalObj:{},
            brocastList:[],
            caseId:'',
            iconType : {
                1:'A',
                101:'A1',//清扫
                102:'A2',//洒水
                103:'A3',//垃圾收运
                104:'A4',//垃圾转运
                105:'A5',//吸污
                2:'B',
                201:'B1',//保洁
                3:'C',
                4:'D',
                5:'E',//压缩
                15:'E',//压缩
                17:'E',//压缩
                6:'F',//处理厂
                18:'F',//处理厂
                7:'G',//公共厕所
                8:'H',
                9:'J',
                10:'K',
                11:'L'
            },
            overType:1,
            facilityType:0,
            overlaysList:[
            ],
            cluster:'',
            overlayDetailshow:false,
            overtit:'',
            overlayDetail:{},
            labelOverlay:{},
            overlay:[],
            form:{},
            eventDetail:{},
            curpageindex:0,
            curpagesize:10,
            curCount:0,
            scrollHeight:0,
            scrollTop:0,
            totalPage:0,
            scroll:false,
            loadData:0,
            mapTimer:null,
            eventOfflineMarker:null,
            typeMarker:null
		}
	},
	methods:{
        initApi(){
            this.curpageindex = 0;
            this.setMapPosition();
            this.caseTotalList();
            this.brocastListMore();
        },
        init(map){/*地图初始化完成后回调方法*/
            this.mapObj = map;
            let self = this;
            if(this.mapObj!=null&&this.mapObj!=undefined){
                this.mapObj.setCity(this.$store.state.cityName,function(lnglat){
                    self.center = lnglat;
                });
            }
            this.initApi();
            this.form.center = this.center;
            this.form.mapObj = this.mapObj;
            bus.$emit('getMapObj',this.form);
        },
        initStatus(value){//初始化状态，关闭所有的panel
            if(this.formVisible){this.formVisible=false;}
            if(value != 1){
              if(this.showMoreBrocast){this.showMoreBrocast=false;}
            }
            if(this.casePanelShow){this.casePanelShow=false;}
            if(this.caseDealShow){this.caseDealShow=false;}
            if(this.videoShow){this.videoShow=false;}
        },
        caseDetail(){//点击查看更多案件
            this.$refs.emergeList.caseDetail();
            if(this.formVisible){this.formVisible=false;}
//            if(this.showMoreBrocast){this.showMoreBrocast=false;}
            if(this.caseDealShow){this.caseDealShow=false;}
        	this.casePanelShow = !this.casePanelShow;
        },
        addEvent(){//添加应急事件
        	let self = this;
        	this.$nextTick(()=>{
//                if(self.showMoreBrocast){self.showMoreBrocast=false;}
                if(self.casePanelShow){self.casePanelShow=false;}
                if(self.caseDealShow){self.caseDealShow=false;}
                self.formVisible = !self.formVisible;
                if(self.formVisible){
                    self.$refs.emergeform.initForm();
                    self.$store.commit('updateStatus',true);
                }else{
                    self.$store.commit('updateStatus',false);
                }
	        });
        },
        refresh(value){//刷新案件總數
            let self = this;
            this.$nextTick(()=>{
                if(value!=''){
                    self.pareload(value);
                }
            })
        },
        pareload(value){//案件创建成功，加载处理案件列表
            let self = this;
            this.$nextTick(()=>{
                self.initApi();
            	if(value!=''&& value!=1){
                    if(self.formVisible){self.formVisible=false;}
//                    if(self.showMoreBrocast){self.showMoreBrocast=false;}
                    if(self.casePanelShow){self.casePanelShow=false;}
            		self.eventDetail = value;
                    self.eventDetail.mapObj = self.mapObj;
                    self.eventDetail.markerobj = self.markerobj;
                    bus.$emit('caseDetail',self.eventDetail);
            		self.caseDealShow = !self.caseDealShow;
            	}else{
                    self.initStatus(1);
            	}
            });
		},
        closeEmerge(value){
            this.initStatus(1);
            this.$refs.emergedealevent.clearCircle();
            this.initApi();
        },
        emergeload(value){//案件创建成功，加载处理案件列表
            let self = this;
            this.initStatus(1);
            if(value !=''){
                let mark=this.markerobj[value];
                if(mark){
                    mark.setMap(null);
                }
                this.$refs.emergedealevent.clearCircle();
            }else{
                this.caseDealShow = !this.caseDealShow;
            }
            this.initApi();
        },
		brocastListMore(){//播放列表
			let self = this;
			let params={
                cityNumber:this.$store.state.cityNumber,
                pageindex:this.curpageindex,
                pagesize:this.curpagesize
            };
			api.brocastList(params).then(data => {
                self.brocastList = [];
                if(data && data.items.length>0){
                    self.brocastList = data.items;
                    self.totalPage = data.totalCount;
                    self.curCount = data.count;
                    // data.items.forEach(function(item,key){
                    //     self.brocastList.splice(key,0,item);
                    // })
                    // self.brocastList=self.brocastList.concat(data.items);
                }
            }).catch(error => {
                self.$message({showClose: true,message: error.message,type: 'error'});
            });
		},
        scrollFun(){
            this.scrollTop = this.$refs.brocast.scrollTop;
            this.scrollHeight = this.$refs.brocast.scrollHeight;
            let uHeight = this.$refs.brocast.offsetHeight;
            if(this.scrollTop + uHeight>=this.scrollHeight){
                if(this.curpagesize>=this.totalPage){
                    this.scroll = false;
                }else if(this.curpagesize<this.totalPage){
                    this.loadData=2;
                    this.scroll = true;
                    this.curpageindex++;
                    this.curpagesize = 10;
                    if(this.curpagesize==this.curCount){
                        this.brocastListMore();
                    }else{
                        this.scroll = false;
                        this.loadData=2;
                    }
                }else{
                }
            }
        },
        lookMore(){//查看更多事件列表
//            if(this.formVisible){this.formVisible=false;}
//            if(this.casePanelShow){this.casePanelShow=false;}
//            if(this.caseDealShow){this.caseDealShow=false;}
        	this.showMoreBrocast = !this.showMoreBrocast;
            if(this.showMoreBrocast){
                if(this.brocastList && this.brocastList.length>0){
                    this.loadData=1;
                }else{
                    this.loadData=0;
                }
            }else{
                this.loadData=0;
            }
        },
        brocastMoreFun(item){//播放列表点击
            this.mapObj = this.mapObj ?this.mapObj :this.$store.state.map;
        	this.activeId = item.id;
            let active = '';
            let position = [];
            $('.map-marker').removeClass('active');
            if(this.eventOfflineMarker!==null){
                this.eventOfflineMarker.setMap(null)
            }
            if(item.coordinate!=null && item.coordinate!=undefined && item.offLine==0){
                if(item.coordinate!=null && item.coordinate!=undefined){
                    position = item.coordinate.split(',');
                }
                active = item.id;
                this.eventOfflineMarker = new AMap.Marker({
                    map: this.mapObj,
                    content: '<div data-id="'+item.relateResourceId+'" class="map-marker active"><span class="marker-text">'+ item.content +'</span><div class="map-icon map-event level-offline"></div></div>',
                    position: position,
                    offset: new AMap.Pixel(-15, -42),
                    id:item.relateResourceId,
                    zIndex: 113,
                    extData:item
                });
                if(this.eventOfflineMarker && this.mapObj){
                    this.eventOfflineMarker.setMap(this.mapObj);
                    this.mapObj.setFitView(this.eventOfflineMarker);
                }
                let self = this;
                setTimeout(function(){
                    if(self.eventOfflineMarker!==null){
                        self.eventOfflineMarker.setMap(null)
                    }
                },10000);
            }else{
                active = item.relateResourceId;
                if(this.mapObj){
                    let mark=this.markerobj[item.relateResourceId];
                    if(mark){
                        this.mapObj.setFitView(mark);
                    }
                }
                $('.map-marker[data-id="'+active+'"]').addClass('active');
            }
        },
        caseTotalList(){//案件总数
        	let self = this;
			api.caseTotal({cityNumber:this.$store.state.cityNumber}).then(result=> {
				self.loading = true;
                if(result){
              	    self.totalObj = result;
                }
          	}).catch(error=> {
              	self.loading = false;
              	self.$message({type:'error',message:error.message});
          	});
        },
        setMapPosition(){
            this.markers = [];
            this.overlaysList = [];
        	let self = this;
        	let params = {
        		cityNumber:this.$store.state.cityNumber,
        		centralPoint:self.center.join(',')
        	}
        	api.getAllOverlay(params).then(data => {
                self.overlaysList = data;
                if(self.overlaysList){
                	self.overlaysList.forEach(function(value,key){
                        self.overlaysList[key].position = value.coordinate.split(',');
                        let tempMark=self.markerobj[value.id];
                        if(tempMark){
                            tempMark.getPosition(self.overlaysList[key].position);
                        }else{
                            let markerId = value.id,
                            markerName = value.name;
                            let markerType = self.iconType[value.type];
                            let offline = value.status==0?'offline':'';
                            if(value.type==666){
                                self.overlaysList[key].markerContent='<div data-id="'+markerId+'" class="map-marker"><span class="marker-text">'+ markerName +'</span><div class="map-icon map-event level'+value.caseLevel+'"></div></div>';
                                self.typeMarker = new AMap.Marker({
                                    content: self.overlaysList[key].markerContent,
                                    position: self.overlaysList[key].position,
                                    offset: new AMap.Pixel(-15, -42),
                                    id:self.overlaysList[key].id,
                                    extData:self.overlaysList[key]
                                });
                                self.mapObj.add(self.typeMarker);
                                self.markerobj[value.id]=self.typeMarker;
                                self.markers.push(self.typeMarker)
                                self.bindEventOverlay(self.typeMarker,value);
                            }else{
                                self.overlaysList[key].markerContent='<div data-id="'+markerId+'" class="map-marker"><span class="marker-text">'+ markerName +'</span><div class="map-icon deviceMarker '+markerType+' '+offline+'"></div></div>';
                                self.typeMarker = new AMap.Marker({
                                    content: self.overlaysList[key].markerContent,
                                    position: self.overlaysList[key].position,
                                    offset: new AMap.Pixel(-15, -22),
                                    id:value.id,
                                    extData:value
                                });
                                self.mapObj.add(self.typeMarker);
                                self.markerobj[value.id]=self.typeMarker;
                                self.markers.push(self.typeMarker);
                                self.bindOverlay(self.typeMarker,value);
                            }
                        }

                	});
                }
            }).catch(error => {
                let message = error.status==500 ? '系统异常' :error.message;
                self.$message({showClose: true,message:message,type: 'error'});
            });
        },
        bindOverlay(bindEle,value){
            let self = this;
            AMap.event.addListener(bindEle,'click',function(event){
                $('.map-marker').removeClass('active');
                $('.map-marker[data-id="'+value.id+'"]').addClass('active');
                self.overlayDetail = value;
                if(value.type==101 || value.type==102 || value.type==103 || value.type==104 || value.type==105){
                    self.overType = 1;
                    self.overtit = '车辆';
                }else if(value.type==5 ||  value.type==17){
                    self.overType = 5;
                    self.overtit = '中转站';
                    self.facilityType = 1;
                }else if(value.type==6 || value.type==18){
                    self.overType = 6;
                    self.overtit = '处理厂';
                    self.facilityType = 1;
                }else if(value.type==7){
                    self.overType = value.type;
                    self.facilityType = 1;
                }else{
                    self.overType = value.type;
                    self.facilityType = 0;

                }
                self.closePanel();
                let infoWindow;
                self.overlayDetailshow = true;
                infoWindow = new AMap.InfoWindow({
                    isCustom: true,
                    content: self.$refs.overlayPanel,
                    offset: new AMap.Pixel(-16, -65)
                });
                infoWindow.open(self.mapObj, bindEle.getPosition());
            })
        },
        bindEventOverlay(bindEle,value){
            let self = this;
            AMap.event.addListener(bindEle,'click',function(event){
                $('.map-marker').removeClass('active');
                $('.map-marker[data-id="'+value.id+'"]').addClass('active');
                self.initStatus(1);
                // value.centralPoint = self.center.join(',');
                value.markerobj = self.markerobj;
                value.mapObj = self.mapObj;
                bus.$emit('caseDetail',value);
                self.caseDealShow = true;
            });
        },
        getTempGTalk(recAccounts){//对讲
            this.$alert('正在打开对讲客户端，请稍后,如长时间无反应，请手动打开', '提示', {
                confirmButtonText: '关闭提示'
            });
            api.getGTalkTempCall(recAccounts).then(result=> {
            }).catch(err=> {
                this.$message.error({type: 'error',showClose: true, message: err.message, duration: 2000});
            });
        },
        getTempGVideo(recAccounts){//视频
            this.$alert('正在打开视频客户端，请稍后,如长时间无反应，请手动打开', '提示', {
                confirmButtonText: '关闭提示'
            });
            api.getGTalkTempMonitor(recAccounts).then(result=> {
            }).catch(err=> {
                this.$message.error({type: 'error',showClose: true, message:err.message, duration: 2000});
            });
        },
        vechileVideo(item){
            this.videoShow = !this.videoShow;
            bus.$emit('videoInfo',item);
            this.$refs.videolist.jsessionF();
        },
        closePanel(){//关闭详情框
            // this.initStatus();
            this.overlayDetailshow = false;
        }
    },
	created(){
       bus.$emit('getPageName','环卫应急指挥中心');
	},
    computed:{
        cityNumber(){
            return this.$store.state.cityNumber;
            return this.$store.state.cityName;
            return this.$store.state.token;
            return this.$store.state.map;
            this.mapObj = this.mapObj ? this.mapObj :this.$store.state.map;
        }
    },
    beforeDestroy(){
        clearInterval(this.mapTimer);
    },
    destroyed(){
        clearInterval(this.mapTimer);
    },
    mounted(){
        clearInterval(this.mapTimer)
        let self = this;
        this.$nextTick(()=>{
            self.mapObj = self.mapObj?self.mapObj:self.$store.state.map;
            self.mapTimer = setInterval(function(){
                    self.initApi();
                }, 60000);
        });
	}
}
</script>
<style scoped lang="scss">
.ui-amap-container{
	border: 1px solid #0083db;
    box-shadow: 0 0 5px #0083db inset;
}
.map-context{
	top:20px;
	left:20px;
}
.wrap-main{
	width:100%;
	height:100%;
	box-shadow:0 0 5rem rgba(0,129,222,1) inset;
	.map-container{
		.map-context{
			top:30px;
			left:30px;
		}
		.case-panel{
			background-color:#1a2f54;
			width:400px;
			height:54px;
			box-shadow:0 0 5px rgba(4,16,48,0.8);
			border-radius:4px;
			color:#fff;
			&.noborder{
				border-radius:0px;
			}
			.panel-tit{
				width:324px;
				height:54px;
				box-sizing:border-box;
			}
			.form-tit{
				line-height:54px;
				padding:0 20px;
				font-size:16px;
			}
			.case-list{
				width:108px;
				height:100%;
				float:left;
				padding:5px 0;
				box-sizing:border-box;
				.case-list-info{
					border-right:1px solid #122442;
					padding:0 20px;
					box-sizing:border-box;
					span{
						font-size:12px;
					}
					h3{
						text-align:right;
						font-size:22px;
						line-height:25px;
						color:#626364;
						&.orange{
							color:#f90000;
						}
					}
				}
				&:first-child{
					cursor:pointer;
				}
			}
			.case-list-button{
				width:76px;
				height:100%;
				.case-list-btn{
					width:34px;
					height:34px;
					background-color:#ee624f;
					top:10px;
					left:21px;
					border-radius:50%;
					line-height:34px;
					text-align:center;
					cursor:pointer;
					.tool-add{
						width:22px;
						height:24px;
						background-position:-57px -1px;
						&.open{
							background-position:-58px -0px;
							-moz-transform:rotate(45deg);
							-webkit-transform:rotate(45deg);
							-o-transform:rotate(45deg);
							transform:rotate(45deg);
							filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=1);
						}
					}
				}
			}
		}

	}
}
.case-brocast{
	width:376px;
	min-height:108px;
	top:20px;
	right:20px;
	background-color:#1a2f54;
	border-radius:4px;
	box-shadow:0 0 10px rgba(0,0,0,0.7);
	color:#fff;
	.brocast-title{
		line-height:54px;
		height:54px;
		font-size:14px;
		padding:0 20px;
		box-sizing:border-box;
		border-bottom:1px solid #0b1c38;
		cursor:pointer;
		.el-icon-caret-right{
			color:#2b8bf4;
			margin-right:10px;
			font-size:16px;
			&.open{
				transform: rotate(90deg);
				-o-transform: rotate(90deg);
				-webkit-transform: rotate(90deg);
				-moz-transform: rotate(90deg);
			}
		}
	}
	.brocast-item{
		min-height:54px;
		line-height:54px;
		padding:0 20px;
		font-size:12px;
        max-height:432px;
        cursor:pointer;
		.brocast-item-time{
			margin-right:10px;
		}
		li{
			&:hover{
				color:#6aa6ff;
			}
			&.active{
				color:#3385ff;
			}
            p{
                width:100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
		}
	}
}
.style-panel{
		padding:20px;
	}
</style>
