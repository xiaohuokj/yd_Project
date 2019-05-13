<template>
	<div class="style-panel p-relative case-panel">
		<el-scrollbar class="case-content" style="width:380px">
			<ul class="case-item" v-if=" caseList.length>0">
				<li class="case-item-list" v-for="(item,index) in caseList" @click="resourceSchedle(item)">
					<div class="case-item-tit">
						<p class="p-relative"><i v-if="item.level==1" class="map-icon level1 map-event"></i>
							<i v-else-if="item.level==2" class="map-icon level2 map-event"></i>
							<i v-else-if="item.level==3" class="map-icon level3 map-event"></i>
							<i v-else-if="item.level==4" class="map-icon level4 map-event"></i>
							<span class="caseListTit" :title="item.name">{{item.name}}</span><el-button class="p-absolute orange" size="mini"  @click.stop="closeCase(item.id)">结案</el-button></p>
					</div>
					<div class="case-item-content">
						<p><label>开始时间：</label>
							<span v-if="item.startTime">{{moment(item.startTime).format('YYYY-MM-DD HH:mm')}}</span>
							<span v-else class="null-data">无数据</span></p>
						<p><label>应急资源：</label>
							<span >{{item.peopleCount?item.peopleCount:'0'}}人</span>
							<span >{{item.carCount?item.carCount:'0'}}车</span>
						</p>
					</div>
					<div class="case-item-content">
						<p><label>创建时间：</label>
							<span v-if="item.createTime">{{moment(item.createTime).format('YYYY-MM-DD HH:mm')}}</span>
							<span v-else class="null-data">无数据</span>
						</p>
						<p><label>创建人员：</label>
							<span v-if="item.createrName">{{item.createrName}}</span>
							<span v-else class="null-data">无数据</span>
						</p>
					</div>
				</li>
			</ul>
			<ul class="case-item" v-else>
				<li class="null-data">无案件信息</li>
			</ul>
		</el-scrollbar>
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
			issueName:'',
			caseList:[
			],
			// cityNumber:''
		}
	},
	methods:{
		closeCase(id){//结案
			let self = this;
			this.$confirm('结案后应急群组将解散，成员恢复正常作业状态，是否结束该案件？', '提示', {
	            confirmButtonClass: 'el-button--primary',
              confirmButtonText: '结案',
	        }).then(() => {
              	api.caseClose(id).then(function (result) {
                  	self.$message({type:'success',message:'已结案',showClose: true});
                  	self.$emit('emergefresh',id);
              	}).catch(error=> {
                  	self.$message({type:'success',message:error.message,showClose: true});
              	});
          	}).catch(() => {});
		},
		resourceSchedle(item){
			this.$store.commit('updateCaseId',item.id);
			this.$emit('fresh',item);
		},
		caseDetail(){
			let self = this;
			api.caseDetail(this.$store.state.cityNumber).then(function (result) {
				self.caseList = [];
				if(result && result.length>0){
              		self.caseList = result;
				}
          	}).catch(error=> {
              	self.$message({type:'error',message:error.message,showClose: true});
          	});
		}
	},
	computed:{
        cityNumber(){
            return this.$store.state.cityNumber;
            return this.$store.state.cityName;
        }
    },
	mounted(){
	}
}
</script>
<style lang="scss" scoped>
	.style-panel{
		/*height:750px;*/
		&.case-panel{
			margin-top:5px;
		}
		.case-item-list{
			width:360px;
			height:140px;
			background-color:#122442;
			padding:0 20px;
			font-size:12px;
			border-radius:4px;
			margin-bottom:20px;
			cursor:pointer;
			.case-item-tit{
				height:50px;
				border-bottom:1px solid #1a2f54;
				box-sizing:border-box;
				p{
					line-height:50px;
				}
				.el-button{
					width:55px;
					height:22px;
					line-height:0;
					top:14px;
				}
				.map-event{
					margin-top: -42px;
				}
				.caseListTit{
					display: inline-block;
    				width: 60%;
    				overflow: hidden;
				    text-overflow: ellipsis;
				    white-space: nowrap;
				}
			}
			.case-item-content{
				padding:5px 0;
				p{
					display:inline-block;
					line-height:22px;
					margin-right:20px;
					label{
						color:#5a5c60;
					}
					&+p{
						margin-right:0;
					}
				}
			}
		}

	}
</style>
