<template>
  <div class="archives">
	<span class="top_left"></span>
    <span class="top_left2"></span>
    <span class="top_left3"></span>
    <span class="top_left4"></span>	
	<div class="archives_check">
		<div class="clearfix">
			<p class="el-icon-date archives_check_p"> 牛只编号-<span>{{gleb}}</span></p>
			<button class="archives_check_btn" @click="back">返回</button>
		</div>
	<div class="box">
      <div class="tab-hd clearfix">
        <a href="javascript:;" :class="{'now':xuan==1}" @click="xuan=1">基本信息</a>
        <a href="javascript:;" :class="{'now':xuan==2}" @click="xuan=2">数据采集</a>
        <a href="javascript:;" :class="{'now':xuan==3}" @click="xuan=3">存栏信息</a>
        <a href="javascript:;" :class="{'now':xuan==4}" @click="xuan=4">健康信息</a>
      </div>
      <div class="tab-bd">
        <div class="tab-item" v-show="xuan==1">
          <div class="clearfix cont">
			  <div class="clearfix" style="float: left;width: 50%;">
				  <p class="cont_p1">母扣编号</p>
				  <p class="cont_p2">{{gleb}}</p>
			  </div>
			  <div class="clearfix" style="float: left; width: 50%;">
				  <p class="cont_p1">子扣编号</p>
				  <p class="cont_p2">{{rfid}}</p>
			  </div>
			  
		  </div>
		  <div class="clearfix cont">
			<div class="clearfix" style="float: left;width: 50%;">
				<p class="cont_p1">原母扣编号</p>
				<p class="cont_p2">{{oldGleb}}</p>
			</div>
			<div class="clearfix" style="float: left;width: 50%;">
				<p class="cont_p1">原子扣编号</p>
				<p class="cont_p2">{{oldRfid}}</p>
			</div>
		  </div>
		  <div class="clearfix cont">
			  <div class="clearfix" style="float: left;width: 50%;">
				  <p class="cont_p1">牛只来源</p>
				  <p class="cont_p2">{{source}}</p>
			  </div>
			  <div class="clearfix" style="float: left;width: 50%;">
				  <p class="cont_p1">所处牛舍</p>
				  <p class="cont_p2">{{cowshedNum}}</p>
			  </div>
		  </div>
		  <div class="clearfix cont">
			  <div class="clearfix" style="float: left;width: 50%;">
				  <p class="cont_p1">所处牛栏</p>
				  <p class="cont_p2">{{bullpenNum}}</p>
			  </div>
			  <div class="clearfix" style="float: left;width: 50%;">
				  <p class="cont_p1">所处阶段</p>
				  <p class="cont_p2">{{stageType}}</p>
			  </div>
		  </div>
		  <div class="clearfix cont">
			  <div class="clearfix" style="float: left;width: 50%;">
				  <p class="cont_p1">国家</p>
				  <p class="cont_p2">{{country}}</p>
			  </div>
			  <div class="clearfix" style="float: left;width: 50%;">
				  <p class="cont_p1">畜主</p>
				  <p class="cont_p2">{{xprimary}}</p>
			  </div>
		  </div>
		  <div class="clearfix cont">
			  <div class="clearfix" style="float: left;width: 50%;">
				  <p class="cont_p1">牛只品种</p>
				  <p class="cont_p2">{{variety}}</p>
			  </div>
			  <div class="clearfix" style="float: left;width: 50%;">
				  <p class="cont_p1">购入体重</p>
				  <p class="cont_p2">{{buyWeight}}</p>
			  </div>
		  </div>
		  <div class="clearfix cont">
			  <div class="clearfix" style="float: left;width: 50%;">
				  <p class="cont_p1">出生日期</p>
				  <p class="cont_p2">{{birthday}}</p>
			  </div>
			  <div class="clearfix" style="float: left;width: 50%;">
				  <p class="cont_p1">牛只毛色</p>
				  <p class="cont_p2">{{coatColour}}</p>
			  </div>
		  </div>
		  <div class="clearfix cont">
			  <div class="clearfix" style="float: left;width: 50%;">
				  <p class="cont_p1">牛只性别</p>
				  <p class="cont_p2">{{sex}}</p>
			  </div>
			  <div class="clearfix" style="float: left;width: 50%;">
				  <p class="cont_p1">用途</p>
				  <p class="cont_p2">{{purpose}}</p>
			  </div>
		  </div>
		  <div class="clearfix cont2">
			  <div class="clearfix" style="float: left;width: 50%;">
				  <p class="cont_p3">牛只照片</p>
				  <div class="cont_div">
					 <img :src="leftPicture ? leftPicture:zanwu" />
				  </div>
			  </div>
		  </div>
        </div>
        <div class="tab-item2" v-show="xuan==2" style="color: #fff;">
			<div class="archives_list">
			 <el-table
				:data="tableData2"
				style="width: 100%"
				:row-class-name="tableRowClassName">
				<el-table-column
				  prop="eventTime"
				  align="center"
				  label="时间"
				
				  >
				</el-table-column>
				<el-table-column
				  prop="temperature"
				  align="center"
				  label="设备温度(℃)"
				  >
				</el-table-column>
				<el-table-column
				  prop="electricQuantity"
				  align="center"
				  label="设备电量(%)">
				</el-table-column>
				<el-table-column
				prop="go"
				align="center"
				class-name="yanse"
				label="走">
				</el-table-column>
				<el-table-column
				prop="run"
				align="center"
				class-name="yanse"
				label="跑">
				</el-table-column>
				<el-table-column
				prop="jump"
				align="center"
				class-name="yanse"
				label="跳">
				</el-table-column>
				<el-table-column
				prop="longitude"
				align="center"
				label="经度">
				</el-table-column>
				<el-table-column
				prop="latitude"
				align="center"
				label="纬度">
				</el-table-column>
			  </el-table>
			  <div class="fenye">
			  	<el-pagination
			  		@current-change="handleCurrentChange"
			  		:current-page="pageNo"
			  		:page-size="pageSize"
			  		layout="total, prev, pager, next, jumper"
			  		:total=count>
			  	</el-pagination>
			 </div>
			</div>
		</div>
        <div class="tab-item" v-show="xuan==3" style="color: #fff;">
			<div class="archives_list">
				<el-table
						:data="tableData3"
						style="width: 100%"
						:row-class-name="tableRowClassName">
					<el-table-column
							prop="createDate"
							align="center"
							label="时间"

					>
					</el-table-column>
					<el-table-column
							prop="enterpriseName"
							align="center"
							label="企业"
					>
					</el-table-column>
					<el-table-column
							prop="cattlefarmName"
							align="center"
							label="牛场">
					</el-table-column>
					<el-table-column
							prop="cowshedNum"
							align="center"
							
							label="所处牛舍">
					</el-table-column>
					<el-table-column
							prop="bullpenNum"
							align="center"
							
							label="所处牛栏">
					</el-table-column>
					<el-table-column
							prop="createBy"
							align="center"
							
							label="操作员">
					</el-table-column>
				</el-table>
			</div>
		</div>
        <div class="tab-item" v-show="xuan==4" style="color: #fff;">
			<div class="mianyi">
					<el-table
						:data="tableData4"
						style="width: 100%">
						<el-table-column align="center" class-name="yanse2" label="免疫记录">
							<el-table-column
							prop="mybm"
							align="center"
							label="免疫疾病"
							 >
						</el-table-column>
						<el-table-column
							prop="ymmc"
							align="center"
							label="疫苗名称"
						>
						</el-table-column>
						<el-table-column
							prop="gytj"
							align="center"
							label="给药途径"
						>
						</el-table-column>
						<el-table-column
							prop="yyjl"
							align="center"
							label="用药剂量"
						>
						</el-table-column>
						<el-table-column
							prop="myrq"
							align="center"
							label="用药时间"
						>
						</el-table-column>
						<el-table-column
							prop="creatBy"
							align="center"
							label="操作员"
						>
						</el-table-column>
						</el-table-column>
									
						</el-table-column>
						</el-table-column>
					</el-table>	
				
			</div>
			<div class="mianyi" style="margin-top: 50px;">
				
					<el-table
						:data="tableData5"
						style="width: 100%">
						<el-table-column align="center" class-name="yanse2" label="疾病诊断记录">
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
							prop="cowshedNum"
							align="center"
							label="牛舍编号"
						>
						</el-table-column>
						<el-table-column
							prop="bullpenNum"
							align="center"
							label="牛栏编号"
						>
						</el-table-column>
						<el-table-column
							prop="fbrq"
							align="center"
							label="发病日期"
						>
						</el-table-column>
						<el-table-column
							prop="enterpriseName"
							align="center"
							label="企业"
						>
						</el-table-column>
						<el-table-column
							prop="cattlefarmName"
							align="center"
							label="牛场"
						>
						</el-table-column>
						</el-table-column>
									
						</el-table-column>
						</el-table-column>
					</el-table>	

			</div>
		</div>
      </div>
    </div>
	</div>
  </div>
</template>

<script>
	import {DataAcquisition,torilHistory,ImmuneRecord,diseaseRecord,cattleDetails} from '@/libs/api'
  export default {
   
    data () {
      return {    
        xuan : 1,
		id:'1100639910478966784',
		tableData:[],
		gleb:'',//母扣
		oldGleb:'',//原母扣编号
		oldRfid:'',//原子扣编号
		rfid:this.$route.params.rfid,//子扣编号
		buyWeight:'',//购入体重
		birthday:'',//出生日期
		source:'',//牛只来源
		cowshedNum:'',//所处牛舍
		bullpenNum:'',//所处牛栏
		stageType:'',//所出阶段
		xprimary:'',//畜主
		variety:'',//品种
		coatColour:'',//毛色
		sex:'',//性别
		purpose:'',//用途
		country:'',//国家
		leftPicture:'',//图片 
		"pageNo": 1,
        "pageSize":10,
		"count":'',
		  zanwu: require('../../assets/img/zanwu.png'),
		 tableData2: [],
          tableData3: [],
		   tableData4: [],
		    tableData5: [],
      }
    },
	computed: {
	},
    mounted: function(){
	//console.log(this.rfid)
		//基本信息
		let data9 = {
			
			rfid:this.rfid,
			
		}
		this.$post(cattleDetails, data9).then((res) => {
			//debugger
					this.tableData = res.data;
					this.buyWeight = this.tableData.buyWeight;
					this.birthday = this.tableData.birthday;
					this.gleb = this.tableData.gleb;
					this.rfid = this.tableData.rfid;
					this.oldGleb = this.tableData.oldGleb;
					this.oldRfid = this.tableData.oldRfid;
					this.source = this.tableData.source;
					this.cowshedNum = this.tableData.bullpenNum.cowshedNum;
					this.bullpenNum = this.tableData.bullpenNum.bullpenNum;
					this.stageType = this.tableData.growStage;
					this.xprimary = this.tableData.xprimary;
					this.variety = this.tableData.variety;
					this.coatColour = this.tableData.coatColour;
					this.sex = this.tableData.sex;
					this.purpose = this.tableData.purpose;
					this.country = this.tableData.country;
					this.leftPicture = this.tableData.leftPicture;
		 			
		// 			console.log(this.tableData2)
				}).catch((err) => {
				})

		//数据采集
		let data = {
			pageNo: this.pageNo,
			pageSize: this.pageSize,
			// rfid:'1900001111',
			rfid:this.rfid,
			
		}
		this.$get(DataAcquisition, data).then((res) => {
			this.count=res.data.count
			this.tableData2 = res.data.list;
 			//debugger
			console.log(this.tableData2)
		}).catch((err) => {
		})
		
		
				
		//存栏信息
		
				let data2 = {
					rfid:this.rfid,	
				}
				this.$post(torilHistory, data2).then((res) => {
					
					this.tableData3 = res.data;
		 			//debugger
		 			console.log(this.tableData3)
				}).catch((err) => {
				})
				//免疫信息
				let data3 = {
					rfid:this.rfid,	
				}
				this.$post(ImmuneRecord, data3).then((res) => {
					
					this.tableData4 = res.data;
// 					debugger
// 					console.log(this.tableData4)
				}).catch((err) => {
				})
				//疾病诊断
				let data4 = {
					rfid:this.rfid,	
				}
				this.$post(diseaseRecord, data4).then((res) => {
					
					this.tableData5 = res.data;
// 					debugger
// 					console.log(this.tableData5)
				}).catch((err) => {
				})
    },
    methods: {
        //返回
        back(){
            this.$router.go(-1);//返回上一层
        },
      tableRowClassName({row, rowIndex}) {
      	if (rowIndex%2 === 0) {
      		return 'warning-row';
      	}
      	return '';
      },
	  handleCurrentChange(val) {
			let data = {
						pageNo: val,
						pageSize: this.pageSize,
						rfid:this.rfid,
						
					}
          this.$post(DataAcquisition, data).then((res) => {
           
            this.count=res.data.count
            this.tableData2 = res.data.list;

          })//牛只信息
        },
    },
  }
</script>


<style scoped>

@import "../../css/base.css";
 .archives_list>>>.yanse{color: #FF7F50;}
 .mianyi>>>.el-table  .yanse2{color: #F5A623;}
 
 .el-table--enable-row-hover .el-table__body tr>td{
 background-color:  rgba(34,148,201,0.20);
 border:none;
 color: #1DE8F5;
 }
 .archives_list >>> .el-table, .archives_list >>> .el-table__expanded-cell {
     background-color: transparent;
 }
 .archives_list >>> .el-table th {
     background-color:transparent;
     color: #fff ;
 }
 .archives_list >>> .el-table tr {
 	background-color:transparent;
 	color: #1DE8F5 ;
 }
 .archives_list>>>.el-table--enable-row-hover .el-table__body tr:hover>td{
	 background-color:rgba(34,148,201,0.2)  !important;

 }
 .archives_list>>>.el-table .warning-row {
	 background:rgba(34,148,201,0.1);
 	
   }
 .el-table--border::after, .el-table--group::after, .el-table::before {
     background-color:transparent;   
 }
 .archives_list >>> .el-table td, .archives_list >>> .el-table th.is-leaf {
     border-bottom:none;
 }
 
 
 
 .mianyi >>> .el-table, .mianyi >>> .el-table__expanded-cell {
     background-color: transparent;
 }
 .mianyi >>> .el-table th {
     background-color:transparent;
     color: #fff ;
 }
 .mianyi >>> .el-table tr {
 	background-color:transparent;
 	color: #1DE8F5 ;
 }
 .mianyi>>>.el-table--enable-row-hover .el-table__body tr:hover>td{
 	 background-color:rgba(34,148,201,0.2)  !important;
 
 }
 .mianyi>>>.el-table .warning-row {
 	 background:rgba(34,148,201,0.1);
 	
   }
 .el-table--border::after, .el-table--group::after, .el-table::before {
     background-color:transparent;   
 }
 .mianyi >>> .el-table td, .mianyi >>> .el-table th.is-leaf {
     border: 1px solid rgba(34,148,201,0.30);
 }
 .mianyi >>> .el-table--border th, .el-table__fixed-right-patch {
    border-bottom: 1px solid  rgba(34,148,201,0.30);
}
  .mianyi >>> .el-table--border, .el-table--group {
    border:none;
}
 .fenye{
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
     
     background-color:transparent;
     width: 100%;
 }
 .archives_list >>> .el-pagination {
   
     color: #fff;
 }
 .archives_list >>> .el-pagination .btn-next, .archives_list >>> .el-pagination .btn-prev {
     background:transparent;
     background-size: 16px;
     cursor: pointer;
     margin: 0;
     color: #fff;
 }
 .archives_list >>> .el-dialog, .archives_list >>> .el-pager li {
     background:transparent;
     
 }
 .el-pagination button:disabled {
     color: #fff;
     background-color: transparent;
     
 }
 .archives {
 	width: 98%;
 	height: 800px;
 	background: rgba(0, 0, 0, 0.10);
 	border: 1px solid #2294C9;
 	margin: 30px auto;
 	position: relative;
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
 .box{
     width: 99%;
     margin: 0 auto;
     overflow: hidden;
   }
 
   .tab-hd { position: relative; height:30px; margin:15px 0; border-bottom: 1px solid #2294C9;}
   .tab-hd a { float:left;
     width: 100px;
     height: 30px;
     line-height: 30px;
     float: left;
     font-weight: bold;
     margin-right: 20px;
     text-align: center;
     font-size: 14px;
     display: block;
     color: #fff;
   }
   .tab-hd .now {
     border:1px solid #2294C9;
     color: #1DE8F5;
   }
 .tab-item{
 	margin-top: 30px;
 	border: 1px solid rgba(34,148,201,0.30);
 }
 .tab-item2{
 	margin-top: 30px;
 }
 .cont{
 	height: 30px;
 	border-bottom:1px solid rgba(34,148,201,0.30);
 }
 .cont2{
 	height: 110px;
 }
 .cont_p1{
 	width: 49%;
 	line-height: 30px;
 	font-family: MicrosoftYaHei;
 	font-size: 12px;
 	color:#fff;
 	letter-spacing: 0;
 	text-align: right;
 	background: rgba(34,148,201,0.2);
 	padding-right: 10px;
 	float: left;
 }
 .cont_p2{
 	width: 50%;
 	line-height: 30px;
 	font-family: MicrosoftYaHei;
 	font-size: 12px;
 	color:#fff;
 	letter-spacing: 0;
 	text-align: center;
 	float: left;
 }
 .cont_p3{
 	width: 49%;
 	height: 110px;
 	float: left;
 	line-height: 110px;
 	font-family: MicrosoftYaHei;
 	font-size: 12px;
 	color:#fff;
 	letter-spacing: 0;
 	text-align: right;
 	background: rgba(34,148,201,0.2);
 	padding-right: 10px;
 }
 .cont_div{
 	width: 50%;
 	height: 110px;
 	float: left;
 }
 .cont_div img{
 	width: 90px;
 	height: 90px;
 	border-radius: 5px;
 	margin-top: 10px;
 	margin-left: 20px;
 }
</style>