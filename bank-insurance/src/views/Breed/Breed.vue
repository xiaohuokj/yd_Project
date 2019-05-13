<template>
    <div class="archives">
      <span class="top_left"></span>
      <span class="top_left2"></span>
      <span class="top_left3"></span>
      <span class="top_left4"></span>
      <div class="archives_check">
          <div class="clearfix">
              <p class="el-icon-date archives_check_p">生产养殖</p> 
          </div>
		  <div class="box">
		    <div class="tab-hd clearfix">
		      <a href="javascript:;" :class="{'now':xuan==1}" @click="xuan=1">隔离分栏</a>
		      <a href="javascript:;" :class="{'now':xuan==2}" @click="xuan=2">日常饲喂</a>
		      <a href="javascript:;" :class="{'now':xuan==3}" @click="xuan=3">疾病</a>
		      <a href="javascript:;" :class="{'now':xuan==4}" @click="xuan=4">免疫</a>
		    </div>
		    <div class="tab-bd">
		      <div class="tab-item" v-show="xuan==1" style="color: #fff;">
		      <div class="clearfix" style="margin-top: 30px;">
              <div class="archives_content clearfix">
                  <p class="content_p">牛舍编号：</p>
				<el-select v-model="value1" placeholder="请选择" @change="selectchange">
				    <el-option
				            v-for="item in niushejihe"
				            :key="item.cowshedId"
				            :label="item.cowshedNum"
				            :value="item.cowshedId">
				    </el-option>
				</el-select>
              </div>
              <div class="archives_content clearfix" >
                  <p class="content_p">牛栏编号：</p>
                  <el-select v-model="value2" placeholder="请选择" @change="selectchange2">
                      <el-option
                              v-for="item in niulanjihe"
                              :key="item.bullpenNum"
                              :label="item.bullpenNum"
                              :value="item.bullpenNum">
                      </el-option>
                  </el-select>
				
              </div>
              <button class="archives_check_btn2" @click="querys">搜 索</button>
          </div>
		  <div class="archives_list">
		      <el-table
		              :data="tableData"
		  
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
		                  prop="inDate"
		                  align="center"
		                  label="购入日期">
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
		      <div class="tab-item2" v-show="xuan==2" style="color: #fff;">
		  		 <div class="clearfix" style="margin-top: 30px;">
		  		    <div class="archives_content archives_content2 clearfix">
		  		        <p class="content_p">计划日期：</p>
						 <el-date-picker
						  v-model="value5"
						  type="date"
						   format="yyyy-MM-dd"
							value-format="yyyy-MM-dd"
						  @change="changes"
						  placeholder="选择日期">
						</el-date-picker>
						<span>至</span>
						<el-date-picker
						  v-model="value6"
						  type="date"
						  format="yyyy-MM-dd"
						  value-format="yyyy-MM-dd"
						  @change="changess"
						  placeholder="选择日期">
						</el-date-picker>
		  		    </div>
		  		    <button class="archives_check_btn2" @click="querys5">搜 索</button>
		  		</div>
		  		<div class="archives_list">
		  		    <el-table
		  		            :data="tableData4"
		  		
		  		            style="width: 100%"
		  		            :row-class-name="tableRowClassName">
		  		        <el-table-column
		  		                prop="feedDate"
		  		                align="center"
		  		                label="计划日期"
		  		        >
		  		        </el-table-column>
		  		        <el-table-column
		  		                prop="isComplete"
		  		                align="center"
		  		                label="计划是否完整"
		  		        >
		  		        </el-table-column>
		  		        <el-table-column
		  		                prop="feedWeigth"
		  		                align="center"
		  		                label="计划总量(kg)">
		  		        </el-table-column>
		  		        <el-table-column
		  		                prop="isstate"
		  		                align="center"
		  		                label="是否启用">
		  		        </el-table-column>
		  		        <el-table-column
		  		                prop="createBy"
		  		                align="center"
		  		                label="计划指定人">
		  		        </el-table-column>
		  		    </el-table>
		  		    <div class="fenye">
		  		        <el-pagination
		  		                @current-change="handleCurrentChange4"
		  		                :current-page="pageNo"
		  		                :page-size="pageSize"
		  		                layout="total, prev, pager, next, jumper"
		  		                :total=count>
		  		        </el-pagination>
		  		    </div>
		  		</div>
			  </div>
		      <div class="tab-item" v-show="xuan==3" style="color: #fff;">
		  		 <div class="clearfix" style="margin-top: 30px;">
					<div class="archives_content clearfix">
						<p class="content_p">母扣编号：</p>
						<input type="text" placeholder="请输入" v-model="glebs" class="content_input" />
					</div>
					<div class="archives_content clearfix" >
					    <p class="content_p">子扣编号：</p> 
					    <input type="text" placeholder="请输入" v-model="rfids" class="content_input" />
					</div>
					<button class="archives_check_btn2" @click="querys2">搜 索</button>
				</div>
				<div class="archives_list">
				    <el-table
				            :data="tableData3"
				
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
				                prop="fbrq"
				                align="center"
				                label="发病时间">
				        </el-table-column>
						<el-table-column
						        prop="lczzms"
						        align="center"
						        label="疾病症状">
						</el-table-column>
						<el-table-column
						        prop="createBy"
						        align="center"
						        label="操作人员">
						</el-table-column>
				    </el-table>
				    <div class="fenye">
				        <el-pagination
				                @current-change="handleCurrentChange2"
				                :current-page="pageno"
				                :page-size="pagesize"
				                layout="total, prev, pager, next, jumper"
				                :total=totalcount>
				        </el-pagination>
				    </div>
				</div>
		  	  </div>
		      <div class="tab-item" v-show="xuan==4" style="color: #fff;">
		  		<div class="clearfix" style="margin-top: 30px;">
		  		    <div class="archives_content clearfix">
		  		        <p class="content_p">免疫疾病：</p>
		  						<el-select v-model="value3" placeholder="请选择" @change="selectchange3">
		  						    <el-option
		  						            v-for="item in immunejihe"
		  						            :key="item.value"
		  						            :label="item.name"
		  						            :value="item.value">
		  						    </el-option>
		  						</el-select>
		  		    </div>
		  		    <div class="archives_content clearfix" >
		  		        <p class="content_p">疫苗名称：</p>
		  		        <el-select v-model="value4" placeholder="请选择" @change="selectchange4">
		  		            <el-option
		  		                    v-for="item in ymmcjihe"
		  		                    :key="item.value"
		  		                    :label="item.name"
		  		                    :value="item.name">
		  		            </el-option>
		  		        </el-select>
		  						
		  		    </div>
		  		    <button class="archives_check_btn2" @click="querys4">搜 索</button>
		  		</div>
		  		<div class="archives_list">
		  		    <el-table
		  		            :data="tableData4"
		  		
		  		            style="width: 100%"
		  		            :row-class-name="tableRowClassName">
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
		  		                prop="mybmName"
		  		                align="center"
		  		                label="免疫疾病">
		  		        </el-table-column>
		  		        <el-table-column
		  		                prop="ymmc"
		  		                align="center"
		  		                label="疫苗名称">
		  		        </el-table-column>
		  		        <el-table-column
		  		                prop="gytjName"
		  		                align="center"
		  		                label="给药途径">
		  		        </el-table-column>
						 <el-table-column
						        prop="yyjl"
						        align="center"
						        label="用药剂量">
						</el-table-column>
						 <el-table-column
						        prop="myrq"
						        align="center"
						        label="免疫时间">
						</el-table-column>
						 <el-table-column
						        prop="userName"
						        align="center"
						        label="操作人员">
						</el-table-column>
		  		    </el-table>
		  		    <div class="fenye">
		  		        <el-pagination
		  		                @current-change="handleCurrentChange3"
		  		                :current-page="pageNo"
		  		                :page-size="pageSize"
		  		                layout="total, prev, pager, next, jumper"
		  		                :total=count>
		  		        </el-pagination>
		  		    </div>
		  		</div>
		  	</div>
		   </div>
		  </div>
      </div> 
    </div>
</template>
<script>
  import {findBullpen,findOxer,bullpenInfo,cpCowInfoDiseaseList,diseaseDropDown,vaccineDropDown,bankImmuneList,feedPlannList} from '@/libs/api'
  import {getCookie} from '@/libs/cookieFun'
  import bus from '@/libs/bus' 
   export default {
      data() {
          return {
			  xuan : 1,
			  value1:'选择牛舍',
			  value2:'选择牛栏',
			  value3:'选择免疫疾病',
			  value4:'选择疫苗',
			  value5:'',
			  value6:'',
			  feedDateStart:'',//开始时间
			  feedDateEnd:'',//结束时间
			  tableData:[],
			  tableData2:[],
			  tableData3:[],
			  tableData4:[],
			  total:'0',
			  count:'0',
			cattlefarmId: "",//牛场id
            niushejihe:[],//牛舍集合 
			niulanjihe:[],
			cowshedId:'',//牛舍iD 
			cowshedNum:'',//牛舍名
			bullpenNum:"",//牛栏名
			 pageNo:1,
			 pageSize:10,
			  pageno:1,
			 pagesize:10,
			 totalcount:0,
			glebs:'',
			rfids:'',
			immunejihe:[],//免疫疾病集合
			ymmcjihe:[],//免疫疾病集合
			mybm:'',//免疫病名
			
			ymmc:'',//疫苗名称
          };
      },
      mounted() {
        let self = this
        bus.$on('cattlefarm_Id',(cattlefarm_Id)=>{
            self.cattlefarmId = cattlefarm_Id 
			 self.niushejihess()
			self.niuzhilist()
			self.disease() 
			self.immune()
			self.ymmcneme()
			self.bankImmuneLists()
			self.feedPlannLists()
        });
        if (self.$route.query.id) {
            self.cattlefarmId = self.$route.query.id
			self.niushejihess()
			self.niuzhilist()
			self.disease()
			self.immune()
			self.ymmcneme()
			self.bankImmuneLists()
			self.feedPlannLists()
        };
		
      },
      methods: {
		  changes(val){
			  this.feedDateStart=val
		  },
		  changess(val){
		  	this.feedDateEnd=val	
		  },
		  //隔离分栏搜索
		 querys(){
			let data = {
				cattlefarmId: this.cattlefarmId,
				token: getCookie('token'),
				cowshedId:this.cowshedId,
				bullpenNum:this.bullpenNum,
				pageNo: this.pageNo,
				pageSize: this.pageSize,
			};
			this.$post(bullpenInfo, data).then((res) => {
				this.tableData=res.data.list;
				this.total = res.data.total
// 			    debugger
// 				console.log(this.tableData)
			})	  
		 },
		  //疾病搜索
		 		 querys2(){
		 			let data = {
		 				cattlefarmId: this.cattlefarmId,
		 				token: getCookie('token'),
		 				rfid:this.rfids,
		 				gleb:this.glebs,
		 				pageno:this.pageno,
		 				pagesize: this.pagesize,
		 			};
		 			this.$post(cpCowInfoDiseaseList, data).then((res) => {
		 						  	this.tableData3=res.data.list;
		 						  	this.totalcount = res.data.totalcount
		 			// 			      debugger
		 			// 			  	console.log(this.tableData2)
		 			})	
		 		 },
		//免疫查詢
		querys4(){
			let data = {
				cattlefarmId: this.cattlefarmId,
				token: getCookie('token'),
				pageNo:this.pageNo,
				pageSize: this.pageSize,
				mybm: this.mybm,
				ymmc: this.ymmc,
			};
			
			 this.$get(bankImmuneList, data).then((res) => {
			 	this.tableData4=res.data;
			 	this.count = res.count
			    //debugger
			 //console.log(res)
			 })	  
		},
		//饲喂查询
		querys5(){
			 let data = {
				 	cattlefarmId: this.cattlefarmId,
				 	token: getCookie('token'),
				 	pageNo:this.pageNo,
				 	pageSize: this.pageSize,
					feedDateStart:this.feedDateStart,
					feedDateEnd:this.feedDateEnd
					
				 };
				
				  this.$get(feedPlannList, data).then((res) => {
				  	this.tableData4=res.data;
				  	this.count = res.count
			  debugger
			console.log(res)
				  })	  
		},
		 // 疾病列表
		 disease(){
			 let data = {
			 	cattlefarmId: this.cattlefarmId,
			 	token: getCookie('token'),
			 	pageno:this.pageno,
			 	pagesize: this.pagesize,
			 };
			  this.$post(cpCowInfoDiseaseList, data).then((res) => {
 			  	this.tableData3=res.data.list;
 			  	this.totalcount = res.data.totalcount
// 			      debugger
// 			  	console.log(this.tableData2)
			  })	  
		 },
		  // 疾病列表分页
		 handleCurrentChange2(val){
			  let data = {
			 	cattlefarmId: this.cattlefarmId,
			 	token: getCookie('token'),
			 	pageno:val,
			 	pagesize: this.pagesize,
			 };
			  this.$post(cpCowInfoDiseaseList, data).then((res) => {
			  	this.tableData3=res.data.list;
			  	this.totalcount = res.data.totalcount
// 			      debugger
// 			  	console.log(this.tableData2)
			  })	  
		 },
		 //获取免疫疾病
		 immune(){
			this.$get(diseaseDropDown).then((res) => {
				this.immunejihe=res.data;
			    //debugger
				//console.log(this.immunejihe)
			})	  
		 },
		 //获取免疫疾病名称
		 selectchange3(val){
			 //debugger
			 this.mybm=val
			 
		 },
		 //获取育苗
		 ymmcneme(){
		 			this.$get(vaccineDropDown).then((res) => {
		 				this.ymmcjihe=res.data;
		 			    //debugger
		 				//console.log(this.ymmcjihe)
		 			})	  
		 },
		 //获取育苗名称
		 selectchange4(val){
		 			 this.ymmc=val	
					 //var ss = typeof  this.ymmc; 
					//alert(ss)
		 },
		  // 免疫疾病列表
		 		 bankImmuneLists(){
		 			  let data = {
		 			 	cattlefarmId: this.cattlefarmId,
		 			 	token: getCookie('token'),
		 			 	pageNo:this.pageNo,
		 			 	pageSize: this.pageSize,
		 			 };
		 			  this.$get(bankImmuneList, data).then((res) => {
		 			  	this.tableData4=res.data;
		 			  	this.count = res.count
		  			     //debugger
		  			  //console.log(res)
		 			  })	  
		 		 },
		  // 免疫疾病列表分页
		 		 handleCurrentChange3(val){
		 			let data = {
		 				cattlefarmId: this.cattlefarmId,
		 				token: getCookie('token'),
		 				pageNo:val,
		 				pageSize: this.pageSize,
						mybm: this.mybm,
						ymmc: this.ymmc,
		 			};
		 			 this.$get(bankImmuneList, data).then((res) => {
		 			 	this.tableData4=res.data;
		 			 	this.count = res.count
		 			     //debugger
		 			 	//console.log(res)
		 			 })	  
		 		 },
		 // 饲喂列表
				 		 feedPlannLists(){
				 			  let data = {
				 			 	cattlefarmId: this.cattlefarmId,
				 			 	token: getCookie('token'),
				 			 	pageNo:this.pageNo,
				 			 	pageSize: this.pageSize,
				 			 };
				 			  this.$get(feedPlannList, data).then((res) => {
				 			  	this.tableData4=res.data;
				 			  	this.count = res.count
					      //debugger
					  	//console.log(res)
				 			  })	  
				 		 },	
		//饲喂分页
					handleCurrentChange4(val){
						let data = {
							 	cattlefarmId: this.cattlefarmId,
							 	token: getCookie('token'),
							 	pageNo:val,
							 	pageSize: this.pageSize,
							 };
							  this.$get(feedPlannList, data).then((res) => {
							  	this.tableData4=res.data;
							  	this.count = res.count
						  //debugger
						//console.log(res)
							  })	  
					},	  
		 //获取牛舍
        niushejihess(){
			let data = {
				cattlefarmId: this.cattlefarmId,
				token: getCookie('token')
			};
			this.$post(findOxer, data).then((res) => {
				this.niushejihe=res.data;
				
			   // debugger
				//console.log(this.niushejihe)
			})	 
       },
	   //获取牛栏
	   niulanjihess(id){
		  // debugger
  	   		let data = {
  	   		cattlefarmId: this.cattlefarmId,
  	   		token: getCookie('token'),
  	   		cowshedId:id,
  	   	};
  	   	this.$post(findBullpen, data).then((res) => {
  	   		this.niulanjihe=res.data;
			//console.log(this.niulanjihe)
  	   	    //debugger
  	   	})	  
  	   			   	
	   },
	   //获取牛舍ID
	   selectchange(val){
		  //console.log(val);
           this.cowshedId = val;
		    //this.cowshedNum = val.cowshedNum;
               //alert(this.cowshedId)
			this.niulanjihess(val)
        },
		 selectchange2(val){
				  //console.log(val);
		    this.bullpenNum = val;
			//debugger
			//console.log(val);	
		 },
		 //隔离分栏列表
		niuzhilist(){
			let data = {
				cattlefarmId: this.cattlefarmId,
				token: getCookie('token'),
				cowshedId:this.cowshedId,
				bullpenNum:this.bullpenNum,
				pageNo: this.pageNo,
				pageSize: this.pageSize,
			};
			this.$post(bullpenInfo, data).then((res) => {
				this.tableData=res.data.list;
				this.total = res.data.total
			    //debugger
				//console.log(this.tableData)
			})	  
		},
		//列表隔行换色
		 tableRowClassName({row, rowIndex}) {
		    if (rowIndex % 2 === 0) {
		        return 'warning-row';
		    }
		    return '';
		},
		//隔离分页
         handleCurrentChange(val) {
           let data = {
           	cattlefarmId: this.cattlefarmId,
           	token: getCookie('token'),
           	cowshedId:this.cowshedId,
           	bullpenNum:this.bullpenNum,
           	pageNo: val,
           	pageSize: this.pageSize,
           };
            this.$post(bullpenInfo, data).then((res) => {
            	this.tableData=res.data.list;
            	this.total = res.data.total
                //debugger
            	//console.log(this.tableData)
            })	  
        }, 
         
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
  
  .yanse {
      color: #5C9BF9;
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
      display: block;: 8 px;
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
      width: 250px;
      height: 30px;
      float: left;
  }
  
  .archives_content2 {
      width: 400px;
      height: 30px;
      float: left;
  }
  
  .content_p {
      width: 80px;
      height: 30px;
      line-height: 30px;
      float: left;
      font-family: MicrosoftYaHei;
      font-size: 12px;
      color: #FFFFFF;
      padding-left: 20px;
  
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
  .el-select{
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
  .el-select>>>.el-input__inner{
	  
	 line-height: 28px;
	height: 26px;
	 font-family: MicrosoftYaHei;
	 font-size: 12px;
	 color: #FFFFFF;
	 background: #0A3A78;
	 border: none;
	 
  }
  input::-webkit-input-placeholder {
      color: #fff;
  }
  
  .archives_content>>>.el-date-editor {
      background: #0A3A78;
      width: 150px;
      border: 1px solid #5C9BF9;
  }
  
  .el-range-input {
      background: #0A3A78;
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
  
  .archives_check_btn2 {
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
  
  .archives_list {
      width: 100%;
      margin-top: 30px;
      border-top: 1px solid #2294C9;
	  padding-bottom: 20px;
  }
  
  .el-table--enable-row-hover .el-table__body tr > td {
      background-color: rgba(34, 148, 201, 0.20);
      border: none;
      color: #fff;
  }
  
  .archives_list >>> .el-table, .archives_list >>> .el-table__expanded-cell {
      background-color: transparent;
  }
  
  .archives_list >>> .el-table th, .archives_list >>> .el-table tr {
      background-color: transparent;
      color: #fff;
  }
  
  .archives_list >>> .el-table--enable-row-hover .el-table__body tr:hover > td {
      background-color: rgba(34, 148, 201, 0.2) !important;
  
  
  }
  
  .archives_list >>> .el-table .warning-row {
      background: rgba(34, 148, 201, 0.1);
      /*opacity: 0.1;*/
  
  }
  
  .el-table--border::after, .el-table--group::after, .el-table::before {
      background-color: transparent;
  }
  
  .archives_list >>> .el-table td, .archives_list >>> .el-table th.is-leaf {
      border-bottom: none;
  }
  
  .el-button:nth-child(1) {
      padding-right: 3px;
      color: #1DE8F5;
  }
  
  .el-button:nth-child(2) {
      padding-right: 3px;
      color: #5C9BF9;
  }
  
  .el-button:nth-child(3) {
      color: #F5A623;
  }
  
  .fenye {
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
  
      background-color: transparent;
     
  }
   .archives_content >>> .el-input__inner {
  
      border-radius: 4px;
		border: none;
      color: #fff;
  
      background-color: transparent;
     
  }
  
  .archives_list >>> .el-pagination {
  
      color: #fff;
  }
  
  .archives_list >>> .el-pagination .btn-next, .archives_list >>> .el-pagination .btn-prev {
      background: transparent;
      background-size: 16px;
      cursor: pointer;
      margin: 0;
      color: #fff;
  }
  
  .archives_list >>> .el-dialog, .archives_list >>> .el-pager li {
      background: transparent;
  
  }
  
  .el-pagination button:disabled {
      color: #fff;
      background-color: transparent;
  
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
