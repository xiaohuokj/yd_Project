<template>
	<div class="style-panel p-relative deal-panel" id="dealPanel">
		<div id="dealTit" class="deal-tit p-relative"><p>{{dealEventName}}</p><i class="p-absolute el-icon-close" @click="closePanel"></i></div>
		<div class="deal-top" id="dealTop">
			<div class="p-relative deal-top-content">
				<i class="icon-clock tool-icon hoverClass"></i><span class="fromnow-time orange">{{day?day+'天':''}}{{hours?hours:'00'}}:{{minutes?minutes:'00'}}:{{seconds?seconds:'00'}}</span><el-button class="orange p-absolute" @click="closeCase(caseId)">结案</el-button>
			</div>
			<p class="deal-remark"><label>备注：</label><span class="remark-content" v-if="remark" :title="remark">{{remark}}</span><span v-else class="null-data">无备注信息</span></p>
		</div>
		<div class="resource-select" id="dealSelectSource">
			<el-select v-model="mancar"  @change="changeSource" popper-class="style-dropdown">
			    <el-option
				      v-for="item in resourceList"
				      :key="item.id"
				      :label="item.name"
				      :value="item.id">
			    </el-option>
			</el-select>
			<el-select v-model="distance" popper-class="style-dropdown"  @change="changeDistance">
			    <el-option
				      v-for="item in distanceList"
				      :key="item.id"
				      :label="item.name"
				      :value="item.id">
			    </el-option>
			</el-select>
		</div>
		<el-scrollbar style="width:400px">
			<div class="select-content-list">
				<div class="selected" id="dealSelectedList" v-if="dealCaseInfoList && dealCaseInfoList.length>0" >
					<div v-for="(group,index) in dealCaseInfoList">
						<div class="select-tool p-relative">
							<i class="el-icon-caret-right p-absolute open" :class="['icon-collapse'+index]" @click.stop="selCollapseFun(index,group.id)"></i>
							<div class="resource-tool">
								<span class="checked el-icon-check" :class="['checkbox'+index]" @click.stop="selectedCheckAllChange($event,index)"></span>
								<span class="nearby">{{group.name}}</span>
								<span class="dissolve orange" @click="dissolveGroup(group.id)">解散</span>
							</div>
						</div>
						<ul class="deal-item" :class="['selecteditem'+index]" v-if="group.userList && group.userList.length">
							<li class="deal-item-list" :id="user.id" v-for="(user,key) in group.userList" :talkaccount="user.talkAccount"  @click.stop="lookDetail(user)" :class="{active:activeListId== user.id,offline:user.status==0}">
								<div class="deal-item-content">
									<p><span class="checked el-icon-check"  :id="user.id" @click.stop="selectedCheckChange($event,index,group.userList,user.id)"></span>
									<span class="first">{{user.name}}</span>
									<span v-if="user.status==1" class="second">{{user.distance>1000?((user.distance/1000).toFixed(2)+' km'):(user.distance+' m')}}</span>
									<span v-else-if="user.status==0" class="second">离线</span>
									<span class="last orange el-icon-close" @click.stop="delResource(user.id)"></span></p>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div class="unselected" id="dealUnSelectedList" :style="{height: unseleHei}">
					<div class="select-tool p-relative" id="dealUnSelectedBtn">
						<i class="el-icon-caret-right p-absolute" @click="collapseFun" :class="{open:collapse}"></i>
						<div class="resource-tool p-absolute">
							<span class="checked el-icon-check" :class="{active:checkAll}" @click="handleCheckAllChange($event)"></span>
							<span class="nearby">附近资源</span>
						</div>
						<el-dropdown trigger="click" v-show="buttonGroupShow" class="f-right" >
							<el-button type="primary"><i class="tool-icon tool-move"></i>
							    移动至
							 </el-button>
						  	<el-dropdown-menu slot="dropdown" class="style-dropdown">
						  		<el-dropdown-item v-show="addgroupbtn"><div @click="addSourceToGroup('')"><span>新应急组</span></div></el-dropdown-item>
							    <el-dropdown-item><div v-for="item in tempGroups" :id="item.id" @click="addSourceToGroup(item)"><span>{{item.name}}</span></div></el-dropdown-item>
						  	</el-dropdown-menu>
						</el-dropdown>
					</div>
					<ul class="deal-item" id="dealUnSelectedList" v-show="collapse"  :style="{height: ULHeight}">
						<div class="chooseList" v-if="enableList && enableList.length>0">
							<li class="deal-item-list" :id="item.resouceId" v-for="(item,index) in enableList" :talkaccount="item.talkAccount" @click="lookDetail(item)" :class="{active:activeListId== item.id,offline:item.status==0}">
								<div class="deal-item-content" @click.stop="lookDetail(item)">
									<p><span class="checked el-icon-check" :id="item.resouceId" @click.stop="handleCheckedChange($event,item)"></span>
									<span class="first">{{item.resouceName}}</span>
									<span class="second">{{item.distance>1000?((item.distance/1000).toFixed(2)+' km'):(item.distance+' m')}}</span>
									<!-- <span v-else-if="item.status==0" class="second">离线</span> -->
									<span class="last" :class="item.isDissolved==0?'blue':'orange'">{{item.isDissolved==0?'可调度':'已调度'}}</span></p>
								</div>
							</li>
						</div>
						<div v-if="disableList && disableList.length>0">
							<li class="deal-item-list disable-list" :id="item.resouceId" v-for="(item,index) in disableList" :talkaccount="item.talkAccount"  @click="lookDetail(item)" :class="{active:activeListId== item.id}">
								<div class="deal-item-content" @click.stop="lookDetail(item)">
									<p><el-checkbox disabled :key="item.resouceId" ></el-checkbox>
									<span class="first">{{item.resouceName}}</span>
									<span class="second">{{item.distance>1000?((item.distance/1000).toFixed(2)+' km'):(item.distance+' m')}}</span>
									<!-- <span v-else-if="item.status==0" class="second">离线</span> -->
									<span class="last">{{item.isDissolved==0?'可调度':'已调度'}}</span></p>
								</div>
							</li>
						</div>
						<div class="null-data" v-else-if="nearSourceList.length==0">暂无资源</div>
					</ul>
				</div>
			</div>
		</el-scrollbar>
		<div class="deal-event-btn t-center p-absolute" v-show="buttonShow" id="dealBtn">
			<el-button type="primary" size="small" @click="getTempTalk">对讲</el-button>
			<el-button type="primary" size="small" @click="getTempMonitor">视频</el-button>
		</div>
	</div>
</template>
<script>
// import moment from 'moment'
import Util from '@/libs/util'
import * as api from "@/libs/api"
import bus from "@/libs/bus"
export default{
	data(){
		return{
			dealEventName:'',
			startTime:'',
			day:'',
			hours:'',
			minutes:'',
			seconds:'',
			mancar:'',
			distance:3,
			collapse:true,//默认收起
			checkAll: false,
			enableList:[],
			disableList:[],
	        isIndeterminate: false,
	        buttonShow:false,
	        buttonGroupShow:false,
	        listCount:0,
	        count:0,
	        checkListsel:[],
	        selectArr:[],
			tempGroups:[],
			resourceList:[{id:'',name:'全部资源'},{id:1,name:'人'},{id:2,name:'车'}],
			distanceList:[{id:1,name:'1km内'},{id:3,name:'3km内'},{id:5,name:'5km内'},{id:10,name:'10km内'},{id:20,name:'20km内'}],
			dealCaseInfoList:[],
			remark:'',
			nearSourceList:[],//附近资源
			caseId:'',//案件id
			resouceId:[],
			loading:false,
			talkArr:[],
			videoArr:[],
			ULHeight:206,
			unseleHei:260,
			timer:null,
			detailTimer:null,
			mapObj:'',
			eventCenter:[],
			circle:null,
			addgroupbtn:true,
			curIndex:'',
			activeListId:'',
			overlaysObj:{},
			drawCircle:false
		}
	},
	methods:{
		freshApi(){//刷新接口
			this.getGroupList();
			this.getSourceList();
			this.getEventOverlayDetail();
		},
		closeCase(id){//结案
        	let self = this;
        	this.$confirm('结案后应急作业群组将解散，成员将恢复正常作业状态，是否结束该案件?', '提示', {
                confirmButtonClass: 'el-button--primary',
                confirmButtonText: '结案'
            }).then(() => {
                api.caseClose(id).then(result=> {
                	self.drawCircle = false;
                    self.freshApi();
                    self.$message({type: 'success',showClose: true, message: '已结案', duration: 2000});
                    self.$emit('emergeLoad',id);
                }).catch(err=> {
                    self.$message.error({type: 'error',showClose: true, message: err.message, duration: 2000});
                });

            }).catch(() => {});
        },
        dissolveGroup(id){//解散 传小组id
        	let self = this;
        	this.$confirm('解散后该群组内成员将被删除并恢复正常作业状态，是否解散?', '提示', {
                confirmButtonClass: 'el-button--primary'
            }).then(() => {
                api.delGroup(id).then(result=> {
                    self.freshApi();
                    self.addgroupbtn = true;
                    self.checkAll = false;
                    self.$emit('emergeLoad','');
                    self.$message({type: 'success',showClose: true, message: '群组已解散', duration: 2000});
                }).catch(err=> {
                    self.$message.error({type: 'error',showClose: true, message: err.message, duration: 2000});
                });

            }).catch(() => {});
        },
        delResource(id){//删除资源
        	let self = this;
              api.delGroupResource(id).then(result=> {
                self.drawCircle = false;
                  self.freshApi();
                  self.$emit('emergeLoad','');
                  self.checkAll = false;
              }).catch(err=> {
                  self.$message.error({type: 'error',showClose: true, message: err.message, duration: 2000});
              });
        },
        closePanel(){//关闭面板
        	this.caseId = this.caseId?this.caseId:this.$store.state.caseId;
        	this.$emit('closeEmerge',this.caseId);
        },
        clearCircle(){
        	clearInterval(this.timer);
			clearInterval(this.detailTimer);
        	if(this.circle){
        		this.circle.setMap(null);
        	}

        },
        collapseFun(){
        	this.collapse = !this.collapse;
        },
        selCollapseFun(index,id){
        	this.curIndex = id;
        	$('.icon-collapse'+index).toggleClass('open');
        	$('.selecteditem'+index).slideToggle();
        },
        changeDistance(){
        	this.setMapOverCircle();
        	this.getSourceList();
        	this.setHeight();
        },
        changeSource(){
        	this.getSourceList();
        	this.setHeight();
        },
        lookDetail(item){//点击列表查看详情
        	this.activeListId = item.resouceId;
            if(this.mapObj){
                let mark=this.overlaysObj[this.activeListId];
                if(mark){
                    this.mapObj.setFitView(mark);
                }
            }
            $('.map-marker').removeClass('active');
            $('.map-marker[data-id="'+this.activeListId+'"]').addClass('active');
        },
        butShow(){
        	if(this.count>0){
        		this.buttonShow = true;
        	}else{
        		this.buttonShow = false;
        	}
        },
   		selectedCheckChange(event,index,arr,id){
   			let self = this;
   			arr.forEach(function(value,key){
				if(id == value.id){
					if(!$('.selected .selecteditem'+index+' .deal-item-list[id="'+value.id+'"] .checked').hasClass('active')){
						self.count = self.count +1;
						$('.selected .selecteditem'+index+' .deal-item-list[id="'+value.id+'"] .checked').addClass('active');
					}else{
						self.count = self.count -1;
						$('.selected .selecteditem'+index+' .deal-item-list[id="'+value.id+'"] .checked').removeClass('active');
					}
				}
			});
			let checkedList = $('.selected .selecteditem'+index+' .deal-item-list .checked.active');
			let checkedCount = checkedList.length;
	        if(checkedCount === arr.length){
	        	$('.resource-tool .checked.checkbox'+index).addClass('active');
	        }else{
	        	$('.resource-tool .checked.checkbox'+index).removeClass('active');
	        }
		    this.butShow();
   		},
        selectedCheckAllChange(event,index){
        	let checked = $('.selected .selecteditem'+index+' .deal-item-list .checked');
        	if(!$('.resource-tool .checkbox'+index+'.checked').hasClass('active')){
        		$('.resource-tool .checkbox'+index+'.checked').addClass('active');
        		$('.selected .selecteditem'+index+' .deal-item-list .checked').addClass('active');
				this.count = this.count + checked.length;
        	}else{
        		$('.resource-tool .checkbox'+index+'.checked').removeClass('active');
        		$('.selected .selecteditem'+index+' .deal-item-list .checked').removeClass('active');
        	}
        	this.butShow();
        },
		handleCheckedChange(event,item){
			let self = this;
			this.enableList.forEach(function(value,key){
				if(item.resouceId == value.resouceId){
					if(!$('.chooseList .deal-item-list[id="'+value.resouceId+'"] .checked').hasClass('active')){
						$('.chooseList .deal-item-list[id="'+value.resouceId+'"] .checked').addClass('active');
							self.count = self.count +1;
					}else{
						$('.chooseList .deal-item-list[id="'+value.resouceId+'"] .checked').removeClass('active');
						self.count = self.count -1;
					}
				}
			});
			let checkedCount = $('.chooseList .deal-item-list .checked.active');
			if(checkedCount.length>0){
				this.buttonGroupShow = true;
			}else{
				this.buttonGroupShow = false;
			}
			let AllCount = this.enableList.length;
	        this.checkAll = checkedCount.length === AllCount;
	        this.butShow();
		},
        handleCheckAllChange(event){
        	if(!this.checkAll){
        		this.count = this.count + this.enableList.length;
				$('.chooseList .deal-item-list .checked').addClass('active');
				this.checkAll = true;
        	}else{
				this.buttonGroupShow = false;
        		this.count = this.count - this.enableList.length;
        		$('.chooseList .deal-item-list .checked').removeClass('active');
        		this.checkAll = false;
        	}
        	if(this.enableList.length>0){
    			this.buttonGroupShow = true;
    		}
        	this.butShow();
		},
		forEachFun(type){
			this.resouceId = [];
			let self = this;
			if($('.deal-item-list .checked.active').length>0){
				let checkedList = '';
				if(type==1){
        			checkedList = $('.deal-item-list .checked.active').parents('.deal-item-list');
				}else{
					checkedList = $('.unselected .deal-item-list .checked.active').parents('.deal-item-list');
				}
        		for(let i=0;i<checkedList.length;i++){
        			if(checkedList.hasClass('is-disabled')){
        			}else{
        				let talkNum = checkedList[i].getAttribute('talkaccount');
        				if(talkNum!=undefined){
        					self.talkArr.push(talkNum);
        					self.videoArr.push(talkNum);
        				}
        				let id = checkedList[i].id;
        				if(id!=undefined){
        					self.resouceId.push(id);
        				}
        			}
        		}
        	}
		},
        addSourceToGroup(item){//調度資源
        	if(item){
        		this.resourceGroup(item);
        	}else{
        		if(this.tempGroups.length<=8){
        			this.resourceGroup('');
        		}else{
        			this.$message.error({type: 'error',showClose: true, message: '该案件临时群组已达到最大数值', duration: 2000});
        			this.addgroupbtn = false;
        		}
        	}
        },
        resourceGroup(item){//添加群组
        	this.caseId = this.caseId?this.caseId:this.$store.state.caseId;
        	let params = [];
        	let self = this;
        	this.forEachFun(2);
        	this.resouceId.forEach(function(idx){
        		self.enableList.forEach(function(value,key){
        			if(idx == value.resouceId){
		        		value.groupId= item.id?item.id:'';
		        		value.caseId= self.caseId;
		        		value.cityNumber= self.$store.state.cityNumber;
		        		params.push(value);
        			}
	        	});
        	});
        	api.releteGroupResource(params).then(result=> {
        		self.$emit('emergeLoad','');
                self.getEventOverlayDetail();
                self.getSourceList();
                self.getGroupList();
                self.checkAll = false;
                $('.chooseList .deal-item-list .checked').removeClass('active');
				self.count=0;
				self.butShow();
				self.buttonGroupShow = false;
            }).catch(err=> {
                self.$message.error({type: 'error',showClose: true, message: err.message, duration: 2000});
            });
        },
        getSourceList(){//获取附近资源
        	this.caseId = this.caseId?this.caseId:this.$store.state.caseId;
        	let self = this;
        	let params = {
        		cityNumber:this.$store.state.cityNumber,
        		distance:this.distance?this.distance:'',
        		mancar:this.mancar ? this.mancar:'',
        		caseId:this.caseId
        	};
        	api.nearResource(params).then(result=> {
        		this.enableList= [];
        		this.disableList= [];
                if(result.length>0){
                	self.nearSourceList = result;
                	self.setHeight();
                	result.forEach(function(item,key){
                		if(item.isDissolved==0){
                			self.enableList.push(item);
                		}else if(item.isDissolved==1){
                			self.disableList.push(item)
                		}
                	})
                }
            }).catch(err=> {
                self.$message.error({type: 'error',showClose: true, message: err.message, duration: 2000});
            });
        },
        getGroupList(){//群組列表
        	this.caseId = this.caseId?this.caseId:this.$store.state.caseId;
        	let self = this;
        	api.tempGroups(self.caseId).then(result=> {
                self.tempGroups = result;
            }).catch(err=> {
                self.$message.error({type: 'error',showClose: true, message: err.message, duration: 2000});
            });
        },
        getTempTalk(){//對講
        	let recAccounts = '';
        	this.forEachFun(1);
        	if(this.talkArr.length>0){
        		let Arr = this.talkArr.filter(function(item, index, array) {
                    return array.indexOf(item) === index;
                });
        		recAccounts =Arr.join(',');
        		// recAccounts = '8986031746205500703';
        		this.$alert('正在打开对讲客户端，请稍后,如长时间无反应，请手动打开', '提示', {
		          	confirmButtonText: '关闭提示'
		        });
        		api.getGTalkTempCall(recAccounts).then(result=> {

	            }).catch(err=> {
	            	let message = err.status==500 ? '系统异常' :err.message;
	                this.$message.error({type: 'error',showClose: true, message: err.message, duration: 2000});
	            });
        	}else{
        		this.$message.error({type: 'warning',showClose: true, message:'您选择的资源没有对讲机账号', duration: 2000});
        	}
        },
        getTempMonitor(){//視頻
        	let recAccounts = '';
        	// let recAccounts = '8986031746205501210';
        	this.forEachFun(1);
        	if(this.videoArr.length>0){
        		let Arr = this.videoArr.filter(function(item, index, array) {
                    return array.indexOf(item) === index;
                });
        		recAccounts =Arr.join(',');
        		// recAccounts = '8986031746205501210';
        		this.$alert('正在打开视频客户端，请稍后,如长时间无反应，请手动打开', '提示', {
		          confirmButtonText: '关闭提示'
		        });
        		api.getGTalkTempMonitor(recAccounts).then(result=> {
	            }).catch(err=> {
	            	let message = err.status==500 ? '系统异常' :err.message;
	                this.$message.error({type: 'error',showClose: true, message: message, duration: 2000});
	            });
        	}else{
        		this.$message.error({type: 'warning',showClose: true, message:'您选择的资源没有视频账号', duration: 2000});
        	}

        },
        getEventOverlayDetail(){
        	this.caseId = this.caseId?this.caseId:this.$store.state.caseId;
        	let self = this;
        	this.eventCenter = [];
    		this.remark = '';
          	this.dealEventName = '';
          	this.dealCaseInfoList = [];
        	this.$nextTick(()=>{
        		// setInterval(function(){
		        	let params = {caseId:self.caseId};
		        	api.dealEventList(params).then(result=> {
		        		if(result){
		        			if(result.coordinate){
			              		self.eventCenter = result.coordinate.split(',');
			              		if(self.drawCircle){
			              			self.setMapOverCircle();
			              		}
			              	}
							self.loading = true;
							self.caseId = result.id;
							self.remark = result.remark;
			              	self.dealEventName = result.name;
			              	self.startTime = result.startTime;
			              	self.dealCaseInfoList = result.groupList;
			              	self.fromNowTime();
		        		}
		          	}).catch(error=> {
		              	self.loading = false;
		              	self.$message({type:'error',message:error.message});
		          	});
        		// },6000);
	        });
        },
        fromNowTime(){
        	let self = this;
        	// this.timer = setInterval(function(){
	        	let time = Date.now();
	        	this.day = Math.floor((time-this.startTime)/(1000*60*60*24));
	        	let temp1 = (time-this.startTime)%(1000*60*60*24);
	        	this.hours = Math.floor(temp1/(1000*60*60));
	        	let temp2 = temp1%(1000*60*60);
	        	this.minutes = Math.floor(temp2/(60*1000));
	        	let temp3 = temp2%(1000*60);
	        	this.seconds = Math.round(temp3/1000);
	        	this.hours = this.hours>9?this.hours:'0'+this.hours;
	        	this.minutes = this.minutes>9?this.minutes:'0'+this.minutes;
	        	this.seconds = this.seconds>9?this.seconds:'0'+this.seconds;
	        // },1000);
        },
        setHeight(){
        	let self = this;
        	this.$nextTick(()=>{
	        	let panelHei =$('#dealPanel').height();
	            let tit =$('#dealTit').height();
	            let top = $('#dealTop').height();
	            let select = $('#dealSelectSource').height();
	            let selectedSource = $('#dealSelectedList').height();
	            let btn = $('#dealBtn').height();
	            let sourceBtn =$('#dealUnSelectedBtn').height();
	            sourceBtn = sourceBtn==0 ?20 :sourceBtn;
	            self.unseleHei = panelHei - (tit + top + select + selectedSource + btn);
	            $('#dealUnSelectedList').height(self.ULHeight);
	        })
        },
        setMapOverCircle(){
        	this.caseId = this.caseId?this.caseId:this.$store.state.caseId;
        	let self = this;
	        	if(self.circle!==null){
	        		self.circle.setMap(null)
	        	}
	        	if(self.mapObj!=''){
		        	self.circle = new AMap.Circle({
		        		center:new AMap.LngLat(self.eventCenter[0],self.eventCenter[1]),
		        		radius:self.distance*1000,
		        		strokeColor: "#328ef1",  //线颜色
					    strokeOpacity: 1,  //线透明度
					    strokeWeight: 3,  //线粗细度
					    fillColor: "rgba(50,142,241,.4)",  //填充颜色
					    fillOpacity: 0.35, //填充透明度
					    zIndex:1000,
					    offset: new AMap.Pixel(-16, -52)
					});
					self.mapObj=self.mapObj?self.mapObj:self.$store.state.map;
		        	if(self.circle && self.mapObj){
		                let mark=self.overlaysObj[self.caseId];
		                if(mark && self.circle){
			        		self.circle.setMap(self.mapObj);
		                    self.mapObj.setFitView(self.circle);
		                }
			            $('.map-marker').removeClass('active');
			            $('.map-marker[data-id="'+self.caseId+'"]').addClass('active');
		        	}
	        	}
        },
	},
	mounted(){
		let self = this;
		this.$nextTick(()=>{
			bus.$on('getMapObj',(data)=>{
				self.mapObj = data.mapObj;
			});
		})
		bus.$on('caseDetail',(data) =>{
			self.caseId = data.id;
			self.checkAll = false;
			self.dealEventName = data.name;
			self.mapObj = data.mapObj;
			self.overlaysObj = data.markerobj;
			self.drawCircle = true;
			self.freshApi();
        });
        window.onresize = () =>{
            self.setHeight();
        }
        this.timer = setInterval(self.fromNowTime,1000);
    },
	computed:{
        cityNumber(){
            return this.$store.state.cityNumber;
            return this.$store.state.cityName;
            return this.$store.state.map;
            return this.$store.state.token;
            return this.$store.state.caseId;
        }
    },
	destroyed(){
		let self = this;
		clearInterval(self.timer);
		clearInterval(self.detailTimer);
	},
	created(){
	}
}
</script>
<style lang="scss" scoped>
.deal-panel{
	padding:0;
	height:572px;
	&.deal-panel{
		margin-top:5px;
	}
	.deal-tit{
		height:55px;
		line-height:55px;
		border-bottom:1px solid #0b1c38;
		padding:0 20px;
		box-sizing:border-box;
		font-size:16px;
		p{
			width:90%;
			overflow: hidden;
		    text-overflow: ellipsis;
		    white-space: nowrap;
		}
		.el-icon-close{
			right:0;
			font-size:24px;
			top:17px;
			right:20px;
			cursor:pointer;
		}
	}
	.deal-top{
		height:100px;
		padding:10px 20px;
		box-sizing:border-box;
		.el-button{
			right:0px;
			top:15px;
		}
		.deal-top-content{
			height:66px;
			padding:10px 0;
			box-sizing:border-box;
			.icon-clock{
				width:36px;
				height:36px;
				margin-right:10px;
				background-position:-179px -3px;
				vertical-align:-5px;
			}
			.fromnow-time{
				font-size:30px;
			}
			p{
				line-height:24px;
			}
		}
		.deal-remark{
			width:100%;
			overflow:hidden;
		    text-overflow:ellipsis;
		    white-space:nowrap;
		}
	}
	.resource-select{
		padding:10px 20px;
		box-sizing:border-box;
		.el-select{
			width:170px;
			margin-right:16px;
			&+.el-select{
				margin-right:0;
			}
		}
	}
	.select-tool{
		padding:10px 20px;
		box-sizing:border-box;
		height:54px;
		line-height:30px;
		.resource-tool{
			display:inline-block;
			margin-left:10px;
			.el-checkbox{
				width:14px;
				height:14px;
			}
		}
		.checked{
			margin:0 10px 0 13px;
		}
		.nearby{
			width:74px;
			height:22px;
			display: inline-block;
			border-radius:4px;
			background-color:#626364;
			line-height:22px;
			text-align:center;
		}
		.el-dropdown{
		    color: #fff;
		    top:-4px;
		}
		.tool-move{
			background-position: -83px -2px;
    		vertical-align: -2px;
		}
	}
	.unselected{
		overflow-y:hidden;
		.tool-collapse{
			top:15px;
		}
		.deal-item{
		}
	}
	.selected{
		width:400px;
		min-height:96px;
		.dissolve{
			cursor:pointer;
			margin-left:180px;
		}
		.last{
			margin-left:14px;
		}
		.tool-collapse{
			top:15px;
		}
		.el-icon-close{
			cursor:pointer;
			font-size:16px;
		}
	}
	.deal-item{
		padding:0 20px 0 20px;
	}
	.el-checkbox-group{
		font-size:1px;
		margin:0;
	}
	.deal-item-list{
	    border-radius: 35px;
	    padding: 5px 0 0 23px;
	    margin-bottom: 5px;
		&:hover{
			background-color:rgba(50,74,115,0.9);
		}
		&.active{
			background-color:rgba(39,62,100,0.9);
		}
		&.offline{
			color:#8d8d8d;
		}
		.deal-item-content{
			height:22px;
			line-height:22px;
		}
		p{
			line-height:12px;
			.el-checkbox{
				margin-right:10px;
			}
			span{
				display:inline-block;
				&.first{
					width:140px;
				}
				&.second{
					width:105px;
				}
			}

		}
	}
	.checked{
		width:14px;
		height:14px;
		display:inline-block;
		background-color:#fff;
		border-radius:2px;
		margin-right:10px;
	}
	.el-icon-check{
		color:#fff;
		font-size:14px;
	}
	.active{
		background-color:#409eff;
	}
	.disable-list{
		color:#c1c1c1;
	}
	.disable-list .first{
		margin-right:4px;
	}
	.disable-list .second{
		margin-right:3px;
	}
	.deal-event-btn{
		height:90px;
		width:100%;
		bottom:0;
	    background-color: #1a2f54;
	    z-index: 3;
		.el-button{
			margin-top:30px;
		}
	}
}
.el-icon-caret-right{
	font-size: 24px;
    top: 13px;
    color: #2b8bf4;
    cursor: pointer;
	transform: rotate(0deg);
	-o-transform: rotate(0deg);
	-webkit-transform: rotate(0deg);
	-moz-transform: rotate(0deg);
	&.open{
		transform: rotate(90deg);
		-o-transform: rotate(90deg);
		-webkit-transform: rotate(90deg);
		-moz-transform: rotate(90deg);
	}
}
.tool-collapse{
	background-position: -54px -21px;
	vertical-align:5px;
	left:10px;
	cursor:pointer;
	-moz-transform:rotate(45deg);
		-moz-transform:rotate(-45deg);
		 -webkit-transform:rotate(-45deg);
		transform:rotate(-45deg);
		filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=1);
	&.open{
		left:7px;
		 -webkit-transform:rotate(45deg);
		transform:rotate(45deg);
		filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=1);
	}
}
.el-dialog{
	background:#1f3151;
	color:#fff;
	margin-top: 30vh!important;
}
  .hoverClass{
    cursor:default;
  }
</style>
