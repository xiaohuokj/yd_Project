<template>
    <div class="contentDiv">
        <div class="processTittle">
            <div class="process_name">设置流程</div>
            <router-link to="/standard"><div class="process_return">退出</div></router-link>
            <div style="clear: both"></div>
        </div>
        <!-- 进度条 -->
        <div class="Progressbar">
            <el-steps :active="orderStatus" finish-status="success">
                <el-step :title="item.title" v-for="item in items"></el-step>
            </el-steps>
        </div>  
        <!-- 省市级联 -->
        <div v-if="orderStatus == 1" class="cityContent">
            <div class="cityDiv">
                <span style="color:#000">省</span>
                <el-select v-model="province" filterable placeholder="请选择省份" v-on:change="prochange()">
                  <el-option v-for="item in provinceList" :key="item.code" :label="item.name" :value="item.code">
                  </el-option>
                </el-select>
            </div>
            <div class="cityDivMsg" style="display:none">
              {{msg}}
            </div>
            <div class="cityDiv">
                <span style="color:#000">市</span>
                <el-select v-model="city" filterable placeholder="请选择城市" v-on:change="citychange()">
                  <el-option v-for="item in cityList" :key="item.code" :label="item.name" :value="item.code">
                  </el-option>
                </el-select>
            </div>
            <div class="cityDiv">
                <span style="color:#000">县</span>
                <el-select v-model="county" filterable placeholder="请选择区县">
                  <el-option v-for="item in countyList" :key="item.code" :label="item.name" :value="item.code">
                  </el-option>
                </el-select>
            </div>
            <div class="cityDiv">
                <el-button type="primary" @click="oneNext()">下一步</el-button>
            </div>
        </div>
        <!-- 选择版本 -->
        <div class="versionsContent" v-else-if="orderStatus == 2">
            <el-radio-group v-model="radioValue" v-for="(item,index) in versionList" >
                <div class="cityDiv">
                <el-radio :label="item.id" class="radio">
                  <div class="radioName">&nbsp;{{item.standardVersion}}</div>
                  <div class="radioSpan" @click="detailDalog(item.id)">预览</div>
                </el-radio>
              </div>
            </el-radio-group>
            <div class="cityDiv">
                <el-button type="primary" @click="twoPrev()">上一步</el-button>
                <el-button type="primary" @click="twoNext()">下一步</el-button>
            </div>
            
        </div>
        <!-- 确认版本 -->
        <div class="versionsConfirm" v-else>
            <ul>
            <div class="cityDiv">
                <div class="confirm_text">{{radioName}} <span class="radioSpanTwo" @click="detailDalog(0)">预览</span> </div>
            </div>
            <div class="cityDiv">
                <div class="confirm_text">请确认是否应用该版本标准，确认应用后此标准将同步移动端应用</div>
            </div>
            <div class="cityDiv">
                <el-button type="primary" @click="threePrev()">上一步</el-button>
                <el-button type="primary" @click="threeNext()">确认应用</el-button>
            </div>
            </ul>
        </div>  
        <!--预览详情-->
        <el-dialog title="预览详情" :visible.sync="detailsFormVisible">
              <div class="excel_name">{{standardVersion}}</div>
              <div class="excel_div">
                <el-collapse v-model="activeName" accordion>
                  <el-collapse-item :title="item.standardClassify" v-for="(item,index) in standardClassify" :name="index">
                    <ul>
                        <li v-for="items in item.standardTerm" style="color:#000">
                            <el-col :span="4">{{ items.standardType }}</el-col>
                            <el-col :span="6">{{ items.standardTermType }}</el-col>
                            <el-col :span="11">{{ items.standardTerm }}</el-col>
                            <el-col :span="1">{{ items.deductingUnit }}</el-col>
                            <el-col :span="2">扣{{ items.score }}分</el-col>
                        </li>
                    </ul>
                  </el-collapse-item>
                </el-collapse>
              </div>
        </el-dialog>
        <!--预览详情-->
    </div>

</template>
<script>
/*import {provinceList} from '@/libs/api'
import {citiesList} from '@/libs/api'
import {districtsList} from '@/libs/api'
import {versionsList} from '@/libs/api'
import {standardDetail} from '@/libs/api'
import {applicationApi} from '@/libs/api'
import Util from '@/libs/util'*/
  export default{
      data () {
          return {
              detailsFormVisible:false,
              provinceList:[],
              cityList:[],
              countyList:[],
              province:'',
              city:'',
              county:'',
              nextNum:0,
              radioValue:0,
              radioName:'',
              versionList:[],
              standardVersion:'',
              standardClassify:[],
              activeName: 0,
              orderStatus: 1,
              items:[{title:'选择行政区域'},{title:'选择标准版本'},{title:'确认应用'}],
              msg:'请选择省份'
          }
      },
      methods:{
          // 省份变化
          prochange: function (){
              $('.cityDivMsg').hide();
              this.cityList = [];
              this.countyList = [];
              this.city='';
              this.county='';
              let self = this;
              /*citiesList({params:{provinceCode:this.province,cityCode:''}}).then(data => {
                  this.cityList = data;
              }).catch(error => {
                  self.$message.error({showClose: true, message: '请求失败', duration: 2000});
              })*/
          },
          // 城市变化
          citychange:function(){
              this.countyList = [];
              this.county='';
              let self = this;
              /*districtsList({params:{cityCode:this.city,districtCode:''}}).then(data => {
                  this.countyList = data;
              }).catch(error => {
                  self.$message.error({showClose: true, message: '请求失败', duration: 2000});
              })*/
          },
          oneNext:function(){
            if(this.province == '' || this.province == null){
              $('.cityDivMsg').show();
              return ;
            }
            let self = this;
            /*versionsList({params:{provinceCode:this.province,cityCode:this.city,districtCode:this.county}}).then(data => {
              if(data.length>0){
                  self.versionList=data;
                  //当前步骤数
                  this.orderStatus=2;
              }else{
                self.$message.error({showClose: true, message:'暂无版本', duration: 2000});
                return ;
              }
            }).catch(error => {
              self.$message.error({showClose: true, message:'暂无版本', duration: 2000});
              return ;
            })*/
            
          },
          twoPrev:function(){
            this.orderStatus=1;
          },
          twoNext:function(){
            let self = this;
            if(this.radioValue==0){
              self.$message.error({showClose: true, message:'请选择版本', duration: 2000});
              return ;
            }
            if($('.el-radio').hasClass('is-checked')){
              this.radioName = $('.versionsContent .is-checked').find('.el-radio__label').text().replace("预览","");
            }
            this.orderStatus=3;
          },
          threePrev:function(){
            this.orderStatus=2;
          },
          // 确认应用
          threeNext:function(){
            /*applicationApi({params:{districtNumber:localStorage.cityNumber,standardVersionId:this.radioValue,oldStandardVersionId:localStorage.oldStandardVersionId}}).then(data => {
              this.$router.replace({path:'/standard'});
            }).catch(error => {
              self.$message.error({showClose: true, message:'应用质量标准失败', duration: 2000});
              return ;
            })*/
          },
  
          /*详情弹窗*/
          detailDalog(value){
            let self = this;
            // 清楚一次原数据
            self.standardVersion = '',
            self.standardClassify = []
            // 确认时使用
            if(value==0){
              value = this.radioValue;
            }
            
            /*standardDetail({params:{districtNumber:this.province,standardVersionId:value}}).then(data => {
              if(JSON.stringify(data)!='{}'){
                self.standardVersion = data.standardVersion,
                self.standardClassify = data.standardClassify
              }
            }).catch(error => {
              self.$message.error({showClose: true, message:'暂无版本', duration: 2000});
              return ;
            })*/
            this.detailsFormVisible = true;
          },
      },
      created(){
          let self = this;
          let orderStatus = {
              'NONPAYMENT':2,
              'HASDONE':3
          };
          /*provinceList({params:{provinceCode:''}}).then(data => {
              this.provinceList = data;
          }).catch(error => {
              self.$message.error({showClose: true, message:'暂无数据', duration: 2000});
          })*/
      }
  }
</script>
<style lang="scss">
  /*更改进度条样式*/
  .el-step.is-horizontal .el-step__line{
    height:5px;
  }
  .el-step__line-inner{
    height:5px;
    border-width:3px ! important;
  }
  .el-step__icon{
    width:30px;
    height:30px;
  }
  /*折叠箭头位置*/
  .el-collapse-item__arrow{
    float:left;
    margin-left:30px;
  }
  /*取消折叠下边距*/
  .el-collapse-item__content{
    padding-bottom:0;
  }
  .el-col{
    word-break:normal;
    white-space:pre-wrap;
    text-align:center;
  }
  /*单选按钮div宽度*/
  .el-radio-group{
    width:100%;
  }
  .contentDiv{
    background:#fff;
    width:100%;
    height:100%;
  }
  .processTittle{
    padding: 25px 25px;
  }
  .process_name{
    float: left;
    font-size: 14px;
    color: #89959c;
  }
  .process_return{
    float: right;
    width: 68px;
    height: 28px;
    background: url("../../../assets/images/ago_l.png") no-repeat 10px 0px!important;
    border: 1px solid #c1d8f7;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    color: #5b5959;
    font-size: 12px;
     text-align: center;
    padding-left: 18px;
    line-height: 25px;
  }
  .Progressbar{
    padding: 0px 150px;
    box-sizing:border-box;
    width: 100%;
    text-align: left;
    height: 12px;
  }
  
  .cityContent{
    margin-top:117px;

  }
  .cityDiv{
    margin-top:20px;
    display: -moz-box;/*兼容Firefox*/
    display: -webkit-box;/*兼容FSafari、Chrome*/

    -moz-box-align: center;/*兼容Firefox*/
    -webkit-box-align: center;/*兼容FSafari、Chrome */

    -moz-box-pack: center;/*兼容Firefox*/
    -webkit-box-pack: center;
  }
  .cityDivMsg{
    margin-top:5px;
    color:red;
    display: -moz-box;/*兼容Firefox*/
    display: -webkit-box;/*兼容FSafari、Chrome*/

    -moz-box-align: center;/*兼容Firefox*/
    -webkit-box-align: center;/*兼容FSafari、Chrome */

    -moz-box-pack: center;/*兼容Firefox*/
    -webkit-box-pack: center;
  }
  .versionsContent{
    margin-top:117px;
  }
  .versionsConfirm{
    margin-top:117px;
    display: -moz-box;/*兼容Firefox*/
    display: -webkit-box;/*兼容FSafari、Chrome*/

    -moz-box-align: center;/*兼容Firefox*/
    -webkit-box-align: center;/*兼容FSafari、Chrome */

    -moz-box-pack: center;/*兼容Firefox*/
    -webkit-box-pack: center;
  }
  .el-radio__input{
    float:left;
  }
  .radioName{
    float:left;
    width:330px;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
  }
  .radioSpan{
    float:right;
    margin-left:50px;
    color: #62a8ea;
    cursor: pointer;
  }
  /*确认版本预览按钮*/
  .radioSpanTwo{
    margin-left:50px;
    color: #62a8ea;
    cursor: pointer;
  }
  
  /*版本名称*/
  .excel_name{
    font-size: 14px;
    color: #89959c;
    line-height: 50px;
    cursor: pointer;
    margin-bottom: 20px;
  }
  /*折叠展示样式*/
  .excel_div ul li{
    margin-left:30px;
    margin-right:30px;
    border-top:1px  solid #e0e0e0;
  }
  .excel_div ul li:hover{
    background: #effbff;
    cursor: pointer;
  }
  .excel_div ul li{
    list-style: none;
    display: block;
    line-height: 40px;
    font-size: 12px;
    color: #616161;
    text-align:center;
    white-space:nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
  }
  .confirm_text{
    font-size: 14px;
    color: #5b5858;
    text-align: left;
  }
</style>
