<template>
	<div class="archives">
		<span class="top_left"></span>
		<span class="top_left2"></span>
		<span class="top_left3"></span>
		<span class="top_left4"></span>
		<div class="archives_check">
			<div class="clearfix">
				<p class="el-icon-date archives_check_p"> 预警信息</p>
				<button class="archives_check_btn" @click="back">返回</button>
			</div>
			<div class="archives_list">
				<el-table
				:data="tableData2"
				style="width: 100%"
				:row-class-name="tableRowClassName">
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
						prop="type"
						align="center"
						label="预警类型">
					</el-table-column>
					<el-table-column
						prop="status"
						align="center"
						label="状态">
					</el-table-column>
					<el-table-column
						prop="createDate"
						align="center"
						label="预警时间">
					</el-table-column>
				</el-table>
				<div class="fenye">
					<el-pagination
						@current-change="handleCurrentChange"
						:current-page="pageNo"
						:page-size="pageSize"
						layout="total, prev, pager, next, jumper"
						:total=total>
					</el-pagination>
				</div>
			</div>		
		</div>
	</div>
</template>
<script>
	import {warnRecord} from '@/libs/api'
	import {getCookie} from '@/libs/cookieFun'
	export default {
		data() {
			return {
				value6: '',
				tableData2: [],
				id: localStorage.getItem('cattlefarm_Id'),//牛场id
				pageNo:1,
				pageSize:5,
				total:'',
				rfid:this.$route.params.rfid,//子扣编号
				gleb:this.$route.params.gleb
			};
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
        	number: val,
        	size: this.pageSize,
			rfid:this.rfid,
			gleb:this.gleb,
			token: getCookie('token')
        }
		//console.log(data)
		
        this.$get(bankWarningList, data).then((res) => {
        	//debugger
        	this.tableData2 = res.data;
        	this.count=res.count
        })
      },
			 
    },
		created() {
			let data = {
				rfid:this.rfid,
				gleb:this.gleb,
				number: this.pageNo,
				size: this.pageSize,
				token: getCookie('token')
			}
			this.$get(warnRecord, data).then((res) => {
				//debugger
				//console.log(res)
				this.tableData2 = res.data.list;
				this.total=res.data.total;
				//debugger
				
			})
		},
	};
</script>
<style scoped>
	@import "../../css/base.css";
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
.el-date-editor{
	background:#0A3A78;
	width: 150px;
	border: 1px solid #5C9BF9;
}
.el-range-input{
	background:#0A3A78;
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
.archives_check_btn2{
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
.archives_list{
	width: 100%;
	margin-top: 30px;
	border-top:1px solid  #2294C9;
}

.el-table--enable-row-hover .el-table__body tr>td{
background-color:  rgba(34,148,201,0.20);
border:none;
color: #fff;
}
.archives_list >>> .el-table, .archives_list >>> .el-table__expanded-cell {
    background-color: transparent;
}
.archives_list >>> .el-table th, .archives_list >>> .el-table tr {
    background-color:transparent;
    color: #fff;
}
.archives_list>>>.el-table--enable-row-hover .el-table__body tr:hover>td{
background-color:rgba(34,148,201,0.2)  !important;


}
.archives_list>>>.el-table .warning-row {
    background:rgba(34,148,201,0.1);
		/*opacity: 0.1;*/
	
  }
.el-table--border::after, .el-table--group::after, .el-table::before {
    background-color:transparent;   
}
.archives_list >>> .el-table td, .archives_list >>> .el-table th.is-leaf {
    border-bottom:none;
}
.el-button:nth-child(1){
	padding-right: 10px;
	color: #1DE8F5;
}

.el-button:nth-child(2){
	padding-right: 10px;
	color: #5C9BF9 ;
}
.el-button:nth-child(3){
	color: #F5A623;
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
</style>
