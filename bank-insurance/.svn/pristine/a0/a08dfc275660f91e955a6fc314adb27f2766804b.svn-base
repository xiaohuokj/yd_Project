<template>
	<div class="style-panel p-relative">
		<div class="panel-tit">
			<i class="tool-icon tool-back" @click="rebackForm"></i><span>质量事件列表</span>
		</div>
		<div class="search-input" v-if="issueList && issueList.length>0">
			<el-input
			    placeholder="请输入内容"
			    v-model="issueName" @change="searchList">
			    <i slot="prefix" class="el-input__icon el-icon-search searchIcon" @click="searchList"></i>
			</el-input>
		</div>
		<!-- <el-scrollbar class="issue-content" style="width:380px" > -->
		<div v-if="issueList && issueList.length>0" class="scrolloDiv">
			<ul class="issue-item"  ref="issues" @scroll="handleScroll" >
				<li class="issue-item-list clearfix" v-for="(item,index) in issueList" @click="eventDetail(item,$event)" :class="{}">
					<div class="select-radio" :class="{current:item.id == currentId}" v-model="item.id" @click.stop="eventDetail(item,$event)"><span :class="{active:item.id == currentId}"></span></div>
					<!-- <div class="select-content"> -->
						<p>
							<span>{{moment(item.reportTime).format('YYYY/MM/DD HH:mm')}}</span>
						</p>
						<p><span class="issue-name" :title="item.issueName">{{item.issueName}}问题</span>
						</p>
						<p>
							<span>{{item.sourceName}}</span><span>{{item.reportPerson}}反馈</span><span>{{item.companyName}}处理</span>
						</p>
					<!-- </div> -->
				</li>
			</ul>
            <p v-if="loadData==1" class="load-text" :loading="scroll">{{scroll?'正在加载中。。。':'已加载全部数据'}}</p>
        </div>
        <ul class="issue-item" v-else>
            <li class="null-data">无数据</li>
        </ul>
		<div class="t-center p-absolute form-btn">
    		<el-button type="primary" @click="selectedSure">确定</el-button>
			<!-- <el-button @click="rebackForm">取消</el-button> -->
    	</div>
	</div>
</template>
<script>
// import moment from 'moment'
import Util from '@/libs/util'
import * as api from "@/libs/api"
import bus from '@/libs/bus'
// import comom from '@/libs/bus'
export default{
	data(){
		return{
			loading:false,
			initpageindex:0,
			initpageTotal:0,
			initpageSize:10,
			scrollHeight:0,
			initCount:0,
            scrollTop:0,
            totalPage:0,
            scroll:false,
            loadData:0,
			issueName:'',
			issueList:[],
			dealEventLists:[],
			dataJson:{},
			currentId:'',
			mapObj:'',
			eventPosition:[],
			eventmarket:null,
		}
	},
	methods:{
		rebackForm(){//返回，取消
			if(this.eventmarket!==null){
        		this.eventmarket.setMap(null)
        	}
        	this.$store.commit('updateStatus',true);
            this.$emit('reloading','');
            this.issueList=[];
		},
		eventDetail(item,event){
			let self = this;
			this.$nextTick(()=>{
				self.currentId = item.id;
				self.mapObj = self.mapObj ? self.mapObj : self.$store.state.map;
				let streName = '';
				if(self.eventmarket!==null){
	        		self.eventmarket.setMap(null)
	        	}
				self.eventPosition = item.offsetCooredinates.split(',');
				self.geocoder(self.eventPosition );
				self.dataJson.offsetCooredinates = item.offsetCooredinates;
				self.dataJson.reportTime = item.reportTime;
	        	if(self.eventPosition){
	        		streName = item.issueName;
	        		if(self.mapObj){
	        			self.eventmarket = new AMap.Marker({
	                        map: self.mapObj,
	                        content: '<div data-id="'+item.id+'" class="map-marker"><span class="marker-text">'+ streName +'</span><div class="map-icon deviceMarker icon-quality"></div></div>',
	                        position: self.eventPosition,
	                        offset: new AMap.Pixel(-15, -42),
	                        id:item.id,
	                        zIndex: 113,
	                        extData:item
	                    });
	                    self.mapObj = self.mapObj?self.mapObj :self.$store.state.map;
	        			if(self.eventmarket){
				        	self.eventmarket.setMap(self.mapObj);
				        	self.mapObj.setFitView(self.eventmarket);
			        	}
	        		}
	        	}
	        });
		},
		selectedSure(){//选择质量事件，确认
			if(this.dataJson.offsetCooredinates){
				this.$store.commit('updateStatus',false);
				this.$emit('reloading',this.dataJson);
			}else{
				this.$message({type:'error',showClose: true,message:'您还没有选择事件呦,请先选择再点击确定按钮'});
			}
		},
		searchList(){//模糊查询
			let self = this;
			this.$nextTick(()=>{
				self.issueList = [];
				self.getJson();
        	});
		},
		getJson(){//获取质量监察列表
			this.currentId = '';
			let params = {};
			let self = this;
			this.$nextTick(()=>{
				params = {
					cityNumber:this.$store.state.cityNumber,
					pageindex:this.initpageindex,
					pagesize:this.initpageSize,
					issueName:this.issueName
				};
				api.qualityEventList(params).then(data => {
					if(data && data.items){
	                    self.initpageTotal = data.totalPages;
	                    self.initCount = data.count;
	                    if(self.issueList && self.issueList.length>0){
	                    	for(let j=0;j<data.items.length;j++){
	                    		for(let i=0;i<self.issueList.length;i++){
	                    			if(!data.items[j].id == self.issueList[i].id){
	                    				self.issueList.push(data.items[j]);
	                    			}
	                    		}
	                    	}
	                    }else{
                    		self.issueList=self.issueList.concat(data.items);
                    	}
	                }
		        }).catch(error => {
		          	self.issueList=[]
		          	self.$message({type:'error',showClose: true,message:error.message});
		        });
		    });
		},
		handleScroll(){//无限滚动，实现懒加载
			this.scrollTop = this.$refs.issues.scrollTop;
            this.scrollHeight = this.$refs.issues.scrollHeight;
            let uHeight = this.$refs.issues.offsetHeight;
            if(this.scrollTop + this.scrollHeight>=uHeight){
                if(this.initpageSize>=this.initpageTotal){
                    this.scroll = false;
                    this.loadData = 1;
                }else if(this.initpageSize<this.initpageTotal){
                    this.scroll = true;
                    this.loadData = 1;
                    this.initpageindex++;
                    if(this.initpageSize==this.initCount){
                    	this.getJson();
                    }else{
                    	this.scroll = false;
                    	this.loadData = 1;
                    }
                }
            }
		},
		geocoder(lnglat){//地理位置解析
			let MGeocoder, self = this;
			this.$store.state.map.plugin(["AMap.Geocoder"], function () {
	            MGeocoder = new AMap.Geocoder({
	                radius: 1000,
	                extensions: "all"
	            });
	            MGeocoder.getAddress(lnglat, function(status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        let address = result.regeocode.formattedAddress; //返回地址描述
                        self.dataJson.address = address;
                        self.dataJson.eventmarket = self.eventmarket;
                    }
                });
            });
		},
	},
	computed:{
        cityNumber(){
            return this.$store.state.cityNumber;
            return this.$store.state.cityName;
            return this.$store.state.map;
            return this.$store.state.token;
        },
    },
	mounted() {
		let self = this;
		this.$nextTick(()=>{
			bus.$on('getMapInfo',(data) =>{
				self.mapObj = data.mapObj;
	        })
		});
	},
	destroyed(){
	},
	created(){
	}
}
</script>
<style lang="scss" scoped>
	.style-panel{
		/*height:750px;*/
		.select-radio{
			border-radius:50%;
			width:16px;
			height:16px;
			border:1px solid #4097e6;
			display:inline-block;
			margin-right:10px;
			vertical-align: -2px;
			text-align: center;
    		line-height: 10px;
    		float:left;
    		margin-top:6px;
    		&.current{
    			vertical-align: 3px;
    		}
		}
		.active{
			width:6px;
			height:6px;
			background-color:#4097e6;
			border-radius:50%;
			display:inline-block;
		}
		.issue-item{
			height:400px;
			overflow:auto;
		}
		.issue-item-list{
			padding:5px 0;
			cursor:pointer;
			.select-content{
				display:inline-block;
				margin-left:20px;
			}
			p{
				line-height:28px;
				min-height:28px;
				span{
					margin-right: 20px;

				}
				&+p{
					margin-left:30px;
				}
			}
		}
	}
	.issue-content{

	}
	.issue-name{
		
	    display: inline-block;
    	height:14px;
    	line-height:28px;

	}
  .search-input .searchIcon{
    margin-top:13px;
  }
</style>
