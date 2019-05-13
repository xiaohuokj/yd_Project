<template>
  <div class="contentDiv p-relative">
    <div class="topClass"><router-link :to="{path:'/eventInfo',query:{activeName: activeName}}" class="hover_class">&nbsp;</router-link>事件上报</div>
    <div class="centerClass">
      <!--基本信息-->
      <div class="center_left_div">
        <el-form class="demo-ruleForm" :model="form" label-width="100px" :rules="rules" ref="form">
          <div class="center_detail">
            <el-row>
              <el-col :span="20">
                <el-form-item label="事件来源 " prop="source">
                  <!--<el-select v-model="form.source" placeholder="请选择" class="sourceSelect">-->
                  <!--<el-option v-for="item in sourceList"-->
                             <!--:key="item.id"-->
                             <!--:label="item.name"-->
                             <!--:value="item.id" >-->
                  <!--</el-option>-->
                <!--</el-select>-->
                  <el-col :span="14">
                    <el-radio-group v-model="form.source" class="sourse-radio">
                      <el-radio :label="3">城管派件</el-radio>
                      <el-radio :label="4">市民热线</el-radio>
                      <el-radio :label="6">上级交办</el-radio>
                      <el-radio :label="5">其他</el-radio>
                    </el-radio-group>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="所属项目 " prop="projectId"><el-select v-model="form.projectId" filterable placeholder="请选择" @change="projectChange()" clearable class="sourceSelect">
                  <el-option
                    v-for="item in projectList"
                    :key="item.projectId"
                    :label="item.projectName"
                    :value="item.projectId">
                  </el-option>
                </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="所属公司"><el-input v-model="companyName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="事件描述" prop="description"><el-input type="textarea" :rows="2" placeholder="请描述存在问题(可输入100字)" maxlength="100" v-model="form.description"></el-input>
                  <div class="textarea_tips" :style="{color:((100-(form.description.length))<=0)?'red':'#c0c4cc'}">可输入{{100-form.description.length<0?0:(100-form.description.length)}}个字</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="事件类型" class="cascade-item" prop="sourceSelect">
                  <el-cascader class="sourceSelect" v-model="form.sourceSelect"
                               placeholder="可输入关键词进行搜索"
                               :options="versionsList"
                               @change="selectStandard"
                               filterable
                               separator="-"
                               :clearable="true"
                  ></el-cascader>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="监察标准">
                  <el-input type="textarea" :rows="2" v-model="versionName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="基准扣分(分)"><el-input-number size="mini" :min="0.0" :max="20" :step="0.1" v-model="form.deductPoints" class="input_number_class"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="处理时限(小时)"><el-input-number size="mini" :min="0.5" :max="24" :step="0.5" v-model="form.timeLimit" class="input_number_class" ></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="事件位置" prop="address"><el-input v-model="form.address" :disabled="true" placeholder="点击下侧地图标注位置"></el-input></el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item><div class="addressMap"><amap :vid="vid" :init="init" :zoom="zoom" :center="center" :mapStyle="mapStyle"></amap>
                  <el-input v-model="searchAddress" placeholder="可输入关键词进行搜索" @input="keyUpSearch" @change="keyUpSearch" @propertychange="keyUpSearch" clearable class="searchInput">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                  <div class="tempClass">
                    <ul>
                      <li v-for="(task,index) in searchList" @click="addressOnclick(task.location.lng,task.location.lat)">{{task.name}}</li>
                    </ul>
                  </div>
                </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="事件照片">
                  <el-upload
                    class="issueImgDiv"
                    action="/supervise/files/mini-app/upload-img"
                    :file-list = "fileList"
                    list-type="picture-card"
                    :headers='token'
                    multiple
                    :on-success="handleAvatarSuccess"
                    :on-change="handleChange"
                    :on-remove="handleRemove"
                    :on-preview="handlePictureCardPreview"
                    :limit="5">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" height="80%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>&nbsp;</el-row>
          </div>
        </el-form>
      </div>
    </div>

    <!--案件操作-->
    <div class="buttomClass">
      <el-row>
        <div class="el-col-12"><div class="bg-purple"><el-button type="primary" @click="reportSubmit('form')">上报</el-button>&nbsp;&nbsp;&nbsp;</div></div>
        <div class="el-col-12 buttonRightClass">
          <router-link :to="{path:'/eventInfo',query:{activeName: activeName}}"><el-button type="info" plain>取消</el-button></router-link>
        </div>
      </el-row>
    </div>

  </div>
</template>
<script>

  import {projectsList,standardVersions,issuesReport,uploadImg} from "@/libs/api"
  import Util from '@/libs/util';
  import bus from '@/libs/bus.js'
  import axios from 'axios'
  import ElRow from "element-ui/packages/row/src/row"

  export default{
//    watch: {
//      filterText(val) {
//        this.$refs.tree2.filter(val);
//      }
//    },
    components: {ElRow},
    data(){
      var checkMarker = (rule, value, callback) => {/*事件描述不能多于100字*/
        if (value.length > 100) {
          callback(new Error('事件描述不能多于100字'));
        } else {
          callback();
        }
      };
      return {
        searchList:[],
        rules: {
          source: [
            {required: true, message: '请选择事件来源', trigger: 'change'}
          ],
          address:[
            {required: true, message: '请选择事件位置', trigger: 'change'}
          ],
          projectId:[
            {required: true, message: '请选择项目', trigger: 'change'}
          ],
          description: [
            { required: true,message: '事件描述不能多于100字 ', trigger: 'change' },
            { validator: checkMarker, trigger: 'change' }
          ],
          issueImg:[
            {required: true, message: '请选择事件照片', trigger: 'change'}
          ],
          sourceSelect:[
            {required: true, message: '请选择事件类型', trigger: 'change'}
          ]

        },
        vid: 'emerg-amap',
        plugin: [{
          pName: 'ToolBar',
          liteStyle: true
        }],
        searchAddress:'',
        zoom: 10,
        mapObj: null,
        mapStyle:'',
        markers: [],
        markerobj:{},
        addMarker:null,
        center:[116.397428, 39.90923],
        mapTimer:null,
        eventOfflineMarker:null,
        imgSrc: '',
        selectIndex: undefined,
        projectList:[],
        companyName:'',
        activeName:'',
        form: {
          source:3,
          projectId:'',
          description:'',
          address:'',
          offsetCooredinates:'',
          issueImg:'',
          problemItem:'',
          timeLimit:0,
          deductPoints:0,
          sourceSelect:[]
        },
        sourceList:[
          {
            id:3,
            name:'城管派件'
          },{
            id:4,
            name:'市民热线'
          },{
            id:6,
            name:'上级交办'
          },{
            id:5,
            name:'其他'
          }
        ],
        token:{
          token:this.$store.state.token
        },
        dialogImageUrl: '',
        dialogVisible: false,
        fileList:[],
        filterText: '',
        versionsList:[],
        versionName:'',
        defaultProps: {
          children: 'children',
          label: 'label'
        },

      }
    },
    methods: {
      handleChanges(value) {
        console.log(value);
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      initApi(){
        this.curpageindex = 0;
      },
      /*地图初始化完成后回调方法*/
      init(map){
        this.mapObj = map;
        //根据城市名称定位地图城市
        map.setCity(this.$store.state.cityName);
        this.initApi();
        this.activeName = localStorage.activeName;
        localStorage.setItem("activeStatues",0);
        let self = this;
        AMap.event.addListener(this.mapObj, 'click', self.getLnglat);

        //获取项目列表
        self.getProjectList();
        //获取监察标准列表
        self.getStandardVersionsList()
      },
      keyUpSearch(){
        let self = this;
        let txt = this.searchAddress;
        if(this.searchAddress == '' || this.searchAddress == null){
          $('.tempClass').hide();
        }
        AMap.service(["AMap.PlaceSearch"], function() {
          let placeSearch = new AMap.PlaceSearch({
            //构造地点查询类
            pageSize: 10,
            pageIndex: 1,
            city: "",
//              cityLimit: 'true',
//              panel: 'temp'
          });
          //关键字查询
          placeSearch.search(txt, function (status, result) {
            if(status == 'complete' && result.info == 'OK'){
              self.searchList = result.poiList.pois;
              if(self.searchAddress == ''){
                $('.tempClass').hide();
              }else if(result.poiList.pois.length>0){
                $('.tempClass').show();
              }else{
                $('.tempClass').hide();
              }
            }
          })
        })
      },
      //通过搜索对地图打点
      addressOnclick(lng,lat){
        this.searchAddress = '';
        $('.tempClass').hide();
        this.mapObj.clearMap();
        let lnglatXY = new AMap.LngLat(lng,lat);
        this.geocoder(lnglatXY);
      },
      //获取项目列表
      getProjectList(){
        let self = this;
        projectsList({}).then(data => {
          if(data.length>0){
          self.projectList=data;
        }else{
          self.$message.error({showClose: true, message:'暂无项目', duration: 2000});
          return ;
        }
      }).catch(error => {
          self.$message.error({showClose: true, message:'暂无项目', duration: 2000});
        return ;
      });
      },
      //点击项目获取公司
      projectChange(val){
        let self = this;
        if(this.form.projectId){
          this.projectList.forEach(function(items,index){
            if(self.form.projectId == items.projectId){
              self.companyName = items.companyName;
              $(".projectError").hide();
            }
          })
        }
      },
      //获取监察标准列表
      getStandardVersionsList(){
        standardVersions({}).then(data => {
          if(data.length>0){
          for(var i = 0;i<data.length;i++){
            var oneMap = new Array();
            for(var j = 0;j<data[i].secondClassificationItem.length;j++){
              var mapTwo = {
                value:data[i].secondClassificationItem[j].threeClassificationItem[0].id+'**'+data[i].secondClassificationItem[j].threeClassificationItem[0].threeClassification+'**'+data[i].secondClassificationItem[j].threeClassificationItem[0].timeLimit+'**'+data[i].secondClassificationItem[j].threeClassificationItem[0].score,
                label:data[i].secondClassificationItem[j].secondClassification,
              }
              oneMap.push(mapTwo)
            }
            var mapOne = {
              value:i,
              label:data[i].primaryClassification,
              children:oneMap
            }
            this.versionsList.push(mapOne);
          }
        }else{
          self.$message.error({showClose: true, message:'暂无标准', duration: 2000});
          return ;
        }
      }).catch(error => {
          self.$message.error({showClose: true, message:'暂无项目', duration: 2000});
        return ;
      });
      },
      //点击事件类型，获取标准及扣分、时限
      selectStandard(value){
        if(value.length>0){
          var node = value[1].split('**');
          this.form.problemItem = node[0];
          this.versionName = node[1];
          this.form.timeLimit = node[2];
          this.form.deductPoints = node[3];
        }
      },
      //鼠标点击，获取经纬度坐标
      getLnglat(e){
        this.mapObj.clearMap();
        var x = e.lnglat.getLng();
        var y = e.lnglat.getLat();
        let lnglatXY = new AMap.LngLat(x, y);
        this.geocoder(lnglatXY);
      },
      geocoder(lnglat){
        let MGeocoder, self = this;
        this.mapObj.plugin(["AMap.Geocoder"], function () {
          MGeocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
          });
          MGeocoder.getAddress(lnglat, function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
              let address = result.regeocode.formattedAddress; //返回地址描述
              self.form.address = address;
              let coordinate = [];
              coordinate.push(lnglat.lng);
              coordinate.push(lnglat.lat);
              self.form.offsetCooredinates = coordinate.join(',');
              self.form.address = address;
            }
          });
          if(self.addMarker!==null){
            self.addMarker.setMap(null)
          }
          self.addMarker = new AMap.Marker({
            map: self.mapObj,
            icon: new AMap.Icon({
              image: "./static/addMarker.png" ,
              size: new AMap.Size(28, 50),
              imageOffset: new AMap.Pixel(-0, -0),
              zoom:13,
              center:lnglat,
            }),
            position: lnglat,
            offset: new AMap.Pixel(-5, -30)
          });
          /*mapObj.setFitView(overlay);*/
          self.mapObj.setFitView();
          self.addMarker.setMap(self.mapObj);
        });
      },
      /*上报图片--start*/
      handleAvatarSuccess(res, file) {
        this.batchId = res.batchId;
        this.successCount = res.successCount;
        this.errorCount = res.errorCount;
      },
      handleChange(file, fileList) {
        if(fileList.length>4){
          $('.issueImgDiv>.el-upload--picture-card').hide();
        }
        this.fileList = fileList;
        var ids=this.handleUpOrDel(fileList);
      },
      handleRemove(file, fileList){
        $('.issueImgDiv>.el-upload--picture-card').show();
        this.fileList = fileList;
        var ids= this.handleUpOrDel(fileList);
      },
      handleUpOrDel(fileList){
        let ids="";
        if(fileList){
          for(var i =0; i < fileList.length; i++){
            var obj = fileList[i].response;
            if(obj){
              if(obj.code){
                ids +=obj.record.successResponse[0].id;
                if(i < fileList.length - 1){
                  ids +=",";
                }
              }
            }
          }
        }
        return ids;
        if(ids !=''){
        }
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      /*上报图片--end*/
      //上报问题
      reportSubmit(form){
        this.$refs[form].validate((valid) => {
          if(valid){
            var loginParams = this.form;
            if(this.fileList.length > 0){
              var issueImg ='';
              for(var i = 0;i<this.fileList.length;i++){
                issueImg += this.fileList[i].response[0].url+ ",";
              }
              //去掉最后一个逗号(如果不需要去掉，就不用写)
              if(issueImg.length > 0) {
                issueImg = issueImg.substr(0,issueImg.length - 1);
              }
              loginParams.issueImg = issueImg;
            }
            loginParams.source=parseInt(loginParams.source);
            loginParams.projectId=parseInt(loginParams.projectId);
            loginParams.problemItem=parseInt(loginParams.problemItem);
            issuesReport(loginParams).then(data => {/*指派接口*/
              //指派成功跳转首页，待指派tab切
              this.$router.replace({path:'/eventInfo?activeName=eventBeingInfo'});
          }).catch(error => {
              self.$message.error({showClose: true, message:'上报失败', duration: 2000});
          })
          }else{
            return false;
      }
      });

      },
    },
    computed:{
        getToken(){
            return this.$store.state.token;
        }
    },
    created(){
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/theme/element-variables.scss";
  .contentDiv{
    background:#fff;
    width:100%;
    height:100%;
    color:#000000;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  /*退回Div*/
  .hover_class{
    background: url("../../assets/images/default.png") no-repeat 12px 15px;
    width: 36px;
    height: 44px;
    display: inline-block;
  }
  .hover_class:hover{
    background: url("../../assets/images/glide.png") no-repeat 12px 15px;
    width: 36px;
    height: 44px;
    display: inline-block;
  }
  .topClass{
    height:46px;
    font-size:15px;
    line-height:46px;
    padding-left:30px;
    border-bottom:1px solid #d8d8d8;
  }
  /*内容DIv*/
  .centerClass{
    padding-top:30px;
    height:calc(100% - 136px);
    overflow:auto;
    overflow-x:hidden;
    font-size:12px;
  }
  /*按钮DIV*/
  .buttomClass{
    height:90px;
    padding-top:15px;
  }
  /*内容左部div*/
  .center_left_div{
    padding-left:56px;
    float:left;
    width:70%;
    height:100%;
  }
  .center_detail{
    padding-left:38px;
  }
  /*地图*/
  .addressMap{
    width:100%;
    height:300px;
    margin-right:8%;
    border:1px solid #e6e6e6;
  }
  /*滚动条整体样式*/
  .centerClass::-webkit-scrollbar {
    width: 5px;
    height: 4px;
    background-color: #F5F5F5;
  }
  /*滚动条里面小方块*/
  .centerClass::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.4);
    background: rgba(0,0,0,0.4);
    background-color: #e6e6e6;
  }
  /*滚动条里面轨道*/
  .centerClass::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.6);
    border-radius: 0;
    background: rgba(0,0,0,0.4);
    background-color: #F5F5F5;
  }
  .bg-purple {
    text-align:right;
    color:#8c8c8c;
    font-size:12px;
    line-height:45px;
  }
  .sourceSelect{
    width:100%;
  }
  .issueImgDiv > .el-upload el-upload--picture-card{
    width:70px;
    height:70px;
  }
  .buttonRightClass{
    line-height:43px;
  }
  /*地图搜索Input*/
  .searchInput{
    position:absolute;
    z-index:1;
    top:10px;
    right:10px;
    width:300px;
  }
  /*地图搜索结果Div*/
  .tempClass{
    position:absolute;
    z-index:1;
    top:40px;
    right:10px;
    width:300px;
    background-color:#fff;
    border:1px solid #e6e6e6;
    padding-left: 10px;
    height: 250px;
    overflow:auto;
    overflow-x:hidden;
    display:none;
  }
  /*滚动条整体样式*/
  .tempClass::-webkit-scrollbar {
    width: 5px;
    height: 4px;
    background-color: #F5F5F5;
  }
  /*滚动条里面小方块*/
  .tempClass::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.4);
    background: rgba(0,0,0,0.4);
    background-color: #e6e6e6;
  }
  /*滚动条里面轨道*/
  .tempClass::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.6);
    border-radius: 0;
    background: rgba(0,0,0,0.4);
    background-color: #F5F5F5;
  }
  .tempClass ul li{
    cursor: pointer;
  }
  .tempClass ul li:hover{
    color:#2b8bf4;
  }
  .sourse-radio{
    text-align: left;
  }
</style>
