<template>
  <div class="contentDiv p-relative">
    <div class="topClass"><router-link :to="{path:'/eventInfo',query:{activeName: activeName}}" class="hover_class">&nbsp;</router-link>{{detailName}}</div>
    <!--图片放大调用-->
    <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
    <div class="centerClass">
      <!--基本信息-->
      <div class="center_left_div">
        <el-form class="demo-ruleForm" :model="form" label-width="100px" ref="form" :rules="rules">
          <span class="vertical_line">|</span>&nbsp;事件信息
          <div class="center_detail">
            <el-row>
              <el-form-item label="事件编号:">{{dataObj.issueNumber}}
                <div class="grid-content issueTabClass">
                  <div class="verifiedStatus" v-if="dataObj.status == 0">待指派</div>
                  <div class="verifiedStatus" v-if="dataObj.status == 1">处理中</div>
                  <div class="verifiedStatus" v-if="dataObj.status == 2">待核查</div>
                  <div class="verifiedStatus" v-if="dataObj.status == 3">已结束</div>
                  <div class="verifiedStatus" v-if="dataObj.status == 4">已结束</div>
                  <div class="punishStatus" v-if="dataObj.isReissued == 1">重办</div>
                </div>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="处理时长:"><span v-if="parseInt(parseFloat(dataObj.processerDuration/1000/60/60/24))>0">{{parseInt(parseFloat(dataObj.processerDuration/1000/60/60/24))}}天</span>
                <span v-if="parseInt(parseFloat(dataObj.processerDuration/1000/60/60-(24*parseInt(parseFloat(dataObj.processerDuration/1000/60/60/24)))))>0">{{parseInt(parseFloat(dataObj.processerDuration/1000/60/60-(24*parseInt(parseFloat(dataObj.processerDuration/1000/60/60/24)))))}}小时</span>
                <span v-if="parseInt(parseFloat(dataObj.processerDuration/1000/60-(24*60*parseInt(parseFloat(dataObj.processerDuration/1000/60/60/24)))-(60*parseInt(parseFloat(dataObj.processerDuration/1000/60/60-(24*parseInt(parseFloat(dataObj.processerDuration/1000/60/60/24))))))))>0">{{parseInt(parseFloat(dataObj.processerDuration/1000/60-(24*60*parseInt(parseFloat(dataObj.processerDuration/1000/60/60/24)))-(60*parseInt(parseFloat(dataObj.processerDuration/1000/60/60-(24*parseInt(parseFloat(dataObj.processerDuration/1000/60/60/24))))))))}}分钟</span>
                <div v-if="dataObj.timeLimit != 'undefined' && dataObj.timeLimit != '' && dataObj.timeLimit != null">
                  <span v-if="dataObj.isOverTime == 1 && activeName != 'eventStartInfo'"><div class="overTimeStatus">超时</div></span>
                </div>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="事件来源:">
                <div data-v-7ce36d96 class="el-input is-disabled" v-if='dataObj.source==1'>政府监察</div>
                <div data-v-7ce36d96 class="el-input is-disabled" v-if='dataObj.source==2'>公众号投诉</div>
                <div data-v-7ce36d96 class="el-input is-disabled" v-if='dataObj.source==3'>城管派件</div>
                <div data-v-7ce36d96 class="el-input is-disabled" v-if='dataObj.source==4'>市民热线</div>
                <div data-v-7ce36d96 class="el-input is-disabled" v-if='dataObj.source==5'>其他</div>
                <div data-v-7ce36d96 class="el-input is-disabled" v-if='dataObj.source==6'>上级交办</div>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="事件描述:">
                <div data-v-7ce36d96 class="el-input is-disabled">{{dataObj.description}}</div>
              </el-form-item>
            </el-row>
            <div v-if="dataObj.timeLimit != 'undefined' && dataObj.timeLimit != '' && dataObj.timeLimit != null">
              <div v-if="activeName == 'eventVerifiedInfo'">
                <el-row v-if="lastProcessType!=8">
                  <el-form-item label="所属项目:"><div data-v-7ce36d96 class="el-input is-disabled">{{dataObj.projectName}}（{{dataObj.companyName}}）</div></el-form-item>
                </el-row>
              </div>
              <div v-if="activeName == 'eventEndInfo'">
                <el-row>
                  <el-form-item label="所属项目:"><div data-v-7ce36d96 class="el-input is-disabled">{{dataObj.projectName}}（{{dataObj.companyName}}）</div></el-form-item>
                </el-row>
              </div>
              <div v-if="activeName != 'eventStartInfo'">
                <el-row>
                  <el-form-item label="事件类型:"><div data-v-7ce36d96 class="el-input is-disabled">{{dataObj.primaryClassification}}-{{dataObj.secondClassification}}</div></el-form-item>
                </el-row>
                <el-row>
                  <el-col :span="20">
                    <el-form-item label="监察标准:"><div data-v-7ce36d96 class="el-input is-disabled text_class">{{dataObj.problemItemDetail}}</div></el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-form-item label="基准扣分:"><div data-v-7ce36d96 class="el-input is-disabled">{{dataObj.deductPoints}} 分</div></el-form-item>
                  <el-form-item label="处理时限:"><div data-v-7ce36d96 class="el-input is-disabled">{{dataObj.timeLimit}} 小时</div></el-form-item>
                </el-row>
              </div>
            </div>
            <el-row>
              <el-form-item label="事件位置:"><div data-v-7ce36d96 class="el-input is-disabled">{{dataObj.address}}</div></el-form-item>
            </el-row>
            <el-row>
              <el-col :span="20">
              <el-form-item>
                <div class="addressMap">
                  <amap :vid="vid" :init="init" :zoom="zoom" :center="center" :mapStyle="mapStyle" class="GdMap">
                  </amap>
                </div>
              </el-form-item>
              </el-col>
            </el-row>
            <div v-if="activeName == 'eventVerifiedInfo' && lastProcessType==8">
              <el-row>
                <el-col :span="10">
                  <el-form-item label="所属项目 " prop="projectId"><el-select v-model="form.projectId" filterable placeholder="请选择" @change="projectChange()" clearable class="sourceSelect" name="projectName">
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
            </div>
            <div v-if="activeName == 'eventBeingInfo' || activeName == 'eventStartInfo'">
              <el-row>
                <el-col :span="10">
                  <el-form-item label="所属项目 " prop="projectId"><el-select v-model="form.projectId" filterable placeholder="请选择" @change="projectChange()" clearable class="sourceSelect" name="projectName">
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
            </div>
            <div v-if="activeName == 'eventStartInfo'">
              <el-row>
                <el-col :span="20">
                  <el-form-item label="事件类型" prop="problemItem" class="cascade-item">
                    <el-cascader class="sourceSelect"
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
            </div>
            <el-row>&nbsp;</el-row>
          </div>
        </el-form>
      </div>
      <!--事件进展-->
      <div class="center_right_div">
        <span class="vertical_line">|</span>&nbsp;事件进展
        <ul class="timeline-item">
          <li class="timeline-list" v-for="item in dataObj.records">
            <!--打回状态-->
            <div v-if="item.processType==8">
              <div  class="timeline-content-time">
                <p data-name="eventdata">{{moment(item.processTime).format("MM月DD日")}}</p>
                <p data-name="eventtime">{{moment(item.processTime).format("HH:mm")}}</p>
              </div>
              <div class="timeline-list-content">
                <span class="timeline-content-tit" data-name="processType">打回</span>
                <p class="timeline-content-con">事件已被{{item.projectName}}打回</p>
                <p class="timeline-content-con">打回说明：{{item.description}}</p>
              </div>
            </div>
            <!--办结状态-->
            <div v-if="item.processType==7">
              <div  class="timeline-content-time">
                <p data-name="eventdata">{{moment(item.processTime).format("MM月DD日")}}</p>
                <p data-name="eventtime">{{moment(item.processTime).format("HH:mm")}}</p>
              </div>
              <div class="timeline-list-content">
                <span class="timeline-content-tit" data-name="processType">办结</span>
                <p class="timeline-content-con">事件已被{{item.roleName}}{{item.processerName}}(<span class="phoneNum">{{item.processerTelephone}}</span>)办结</p>
              </div>
            </div>
            <!--退回状态-->
            <div v-if="item.processType==6">
              <div  class="timeline-content-time">
                <p data-name="eventdata">{{moment(item.processTime).format("MM月DD日")}}</p>
                <p data-name="eventtime">{{moment(item.processTime).format("HH:mm")}}</p>
              </div>
              <div class="timeline-list-content">
                <span class="timeline-content-tit" data-name="processType">退回</span>
                <p class="timeline-content-con">事件已被{{item.roleName}}{{item.processerName}}(<span class="phoneNum">{{item.processerTelephone}}</span>)退回</p>
                <p class="timeline-content-con">退回说明：{{item.description}}</p>
              </div>
            </div>
            <!--反馈状态-->
            <div v-if="item.processType==5">
              <div  class="timeline-content-time">
                <p data-name="eventdata">{{moment(item.processTime).format("MM月DD日")}}</p>
                <p data-name="eventtime">{{moment(item.processTime).format("HH:mm")}}</p>
              </div>
              <div class="timeline-list-content">
                <span class="timeline-content-tit" data-name="processType">反馈</span>
                <p class="timeline-content-con">事件已被{{item.projectName}}反馈</p>
                <p class="timeline-content-con">反馈说明：{{item.description}}</p>
              </div>
              <div class="feedback feedback-before" v-if="item.resultImg != null && item.resultImg !=''">
                <label>作业后</label>
                <img class="work-img" v-for="(items,index) in item.resultImg.split(',')" :src="items" @click="clickImg($event)">
              </div>
              <div class="feedback feedback-doing" v-if="item.processImg != null && item.processImg !=''">
                <label>作业中</label>
                <img class="work-img" v-for="(items,index) in item.processImg.split(',')" :src="items" @click="clickImg($event)">
              </div>
              <div class="feedback feedback-before" v-if="item.beforeImg != null && item.beforeImg !=''">
                <label>作业前</label>
                <img class="work-img" v-for="(items,index) in item.beforeImg.split(',')" :src="items" @click="clickImg($event)">
              </div>
            </div>
            <!--重新指派状态-->
            <div v-if="item.processType==4">
              <div  class="timeline-content-time">
                <p data-name="eventdata">{{moment(item.processTime).format("MM月DD日")}}</p>
                <p data-name="eventtime">{{moment(item.processTime).format("HH:mm")}}</p>
              </div>
              <div class="timeline-list-content">
                <span class="timeline-content-tit" data-name="processType">重新指派</span>
                <p class="timeline-content-con">事件已被{{item.roleName}}{{item.processerName}}(<span class="phoneNum">{{item.processerTelephone}}</span>)重新指派到{{item.projectName}}</p>
              </div>
            </div>
            <!--指派状态-->
            <div v-if="item.processType==3">
              <div  class="timeline-content-time">
                <p data-name="eventdata">{{moment(item.processTime).format("MM月DD日")}}</p>
                <p data-name="eventtime">{{moment(item.processTime).format("HH:mm")}}</p>
              </div>
              <div class="timeline-list-content">
                <span class="timeline-content-tit" data-name="processType">指派</span>
                <p class="timeline-content-con">事件已被{{item.roleName}}{{item.processerName}}(<span class="phoneNum">{{item.processerTelephone}}</span>)指派到{{item.projectName}}</p>
              </div>
            </div>
            <!--关闭状态-->
            <div v-if="item.processType==2">
              <div  class="timeline-content-time">
                <p data-name="eventdata">{{moment(item.processTime).format("MM月DD日")}}</p>
                <p data-name="eventtime">{{moment(item.processTime).format("HH:mm")}}</p>
              </div>
              <div class="timeline-list-content">
                <span class="timeline-content-tit" data-name="processType">关闭</span>
                <p class="timeline-content-con">事件已被{{item.roleName}}{{item.processerName}}(<span class="phoneNum">{{item.processerTelephone}}</span>)关闭</p>
                <p class="timeline-content-con">关闭说明：{{item.description}}</p>
              </div>
            </div>
            <!--投诉状态-->
            <div v-if="item.processType==1">
              <div class="timeline-content-time">
                <p data-name="eventdata">{{moment(item.processTime).format("MM月DD日")}}</p>
                <p data-name="eventtime">{{moment(item.processTime).format("HH:mm")}}</p>
              </div>
              <div class="timeline-list-content">
                <span class="timeline-content-tit" data-name="processType" v-if="dataObj.source==2">投诉</span>
                <span class="timeline-content-tit" data-name="processType" v-else>上报</span>
                <p class="timeline-content-con" v-if="dataObj.source==2">事件已被市民上报</p>
                <p class="timeline-content-con" v-else>事件已被{{item.roleName}}{{item.processerName}}(<span class="phoneNum">{{item.processerTelephone}}</span>)上报并指派到{{item.projectName}}</p>
              </div>
              <div class="feedback feedback-before" v-if="item.issueImg != null && item.issueImg !=''">
                <label>事件照片</label>
                <img class="work-img" v-for="(items,index) in item.issueImg.split(',')" :src="items" @click="clickImg($event)">
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!--案件操作-->
    <div class="buttomClass" v-if="activeName != 'eventEndInfo'">
      <!--待指派-操作按钮-->
      <div v-if="activeName == 'eventStartInfo'">
        <el-row>
          <div class="el-col-12"><div class="bg-purple"><el-button type="primary" @click="editSubmit('form')">指派</el-button>&nbsp;&nbsp;&nbsp;</div></div>
          <div class="el-col-12 buttonRightClass">
            <el-button type="info" @click="endSubmit()" plain>关闭</el-button>
          </div>
        </el-row>
      </div>
      <!--处理中-操作按钮-->
      <div v-if="activeName == 'eventBeingInfo'">
        <el-row>
          <div class="el-col-12"><div class="bg-purple"><el-button type="primary" @click="secondAppointDalog()">重新指派</el-button>&nbsp;&nbsp;&nbsp;</div></div>
          <div class="el-col-12 buttonRightClass">
            <el-button type="info" @click="endSubmit()" plain>关闭</el-button>
          </div>
        </el-row>
      </div>
      <!--待核查-操作按钮-->
      <div v-if="activeName == 'eventVerifiedInfo'">
        <el-row v-if="lastProcessType==8">
          <div class="el-col-12"><div class="bg-purple"><el-button type="primary" @click="secondAppointDalog()">重新指派</el-button>&nbsp;&nbsp;&nbsp;</div></div>
          <div class="el-col-12 buttonRightClass">
            <el-button type="info" @click="endSubmit()" plain>关闭</el-button>
          </div>
        </el-row>
        <el-row v-else>
          <div class="el-col-12"><div class="bg-purple"><el-button type="primary" @click="concludeSubmit()">办结</el-button>&nbsp;&nbsp;&nbsp;</div></div>
          <div class="el-col-12 buttonRightClass">
            <el-button type="info" @click="backSubmit()" plain>退回重办</el-button>
          </div>
        </el-row>
      </div>
    </div>

    <el-dialog class="this-el-dialog min-dialog" title="指派确认" :visible.sync="secondAppointDiv" >
      <el-form  class="demo-ruleForm detail-box">
        <el-row>
          <el-col :span="24">
            <span>&nbsp;</span>
          </el-col>
        </el-row>
        <el-row v-if="activeName == 'eventStartInfo'">
          <el-col :span="24">
            <span>是否指派事件到{{projectName}}？</span>
          </el-col>
        </el-row>
        <el-row v-else>
          <el-col :span="24">
            <span>是否重新指派事件到{{projectName}}？</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <span>&nbsp;</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <span>&nbsp;</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" v-if="activeName == 'eventStartInfo'">
            <div class="grid-content bg-purple-light right-button">
              <el-button type="primary" @click="firstAppoint()">确认</el-button>&nbsp;&nbsp;&nbsp;<el-button @click="resetForm()">取消</el-button>
            </div>
          </el-col>
          <el-col :span="24" v-if="activeName == 'eventBeingInfo' || activeName == 'eventVerifiedInfo'" >
            <div class="grid-content bg-purple-light right-button">
              <el-button type="primary" @click="appointDalog()">确认</el-button>&nbsp;&nbsp;&nbsp;<el-button @click="resetForm()">取消</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <!--处理中-关闭问题-->
    <el-dialog class="this-el-dialog min-dialog" title="请选择关闭原因" :visible.sync="closeIssueDiv" >
      <el-form  class="demo-ruleForm detail-box">
        <!--<el-row>
          <el-col :span="4"> &nbsp;
          </el-col>
          <el-col :span="8">
            <el-radio v-model="form.closeType" label="1" check>问题不存在</el-radio>
          </el-col>
        </el-row>
        <el-row>
          &nbsp;
        </el-row>
        <el-row>
          <el-col :span="4"> &nbsp;
          </el-col>
          <el-col :span="8">
            <el-radio v-model="form.closeType" label="2">非环卫问题</el-radio>
          </el-col>
        </el-row>
        <el-row>
          &nbsp;
        </el-row>-->
        <el-row>
          <el-col :span="12" class="closs-left-class">
            <el-radio v-model="form.closeType" label="1" check>问题不存在</el-radio>
          </el-col>
          <el-col :span="12">
            <el-radio v-model="form.closeType" label="2">非环卫问题</el-radio>
          </el-col>
        </el-row>
        <el-row>
          &nbsp;
        </el-row>
        <el-row>
          <el-col :span="24"><div class="grid-content bg-purple-light right-button"><el-button type="primary"  @click="affirmClose()">确认关闭</el-button>&nbsp;&nbsp;&nbsp;<el-button @click="resetForm()">取消</el-button></div></el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <!--待核查-办结弹框-->
    <el-dialog class="this-el-dialog min-dialog" title="办结确认" :visible.sync="concludeIssueDiv" >
      <el-form  class="demo-ruleForm detail-box">
        <el-row>
          <el-col :span="24">
            <span>是否办结该事件？</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <span>&nbsp;</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><div class="grid-content bg-purple-light  right-button"><el-button type="primary"  @click="concludeClose()">确认办结</el-button>&nbsp;&nbsp;&nbsp;<el-button @click="resetForm()">取消</el-button></div></el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <!--待核查-退回重办弹框-->
    <el-dialog class="this-el-dialog min-dialog" title="退回确认" :visible.sync="backIssueDiv" >
      <el-form  class="demo-ruleForm detail-box" :model="form" :rules="rules" ref="form" >
        <el-row>
          <el-form-item label="" prop="description">
            <el-input type="textarea" v-model="form.description" :rows="3" placeholder="请输入退回说明（50字以内）" maxlength="50"></el-input>
            <div class="textarea_tips" :style="{color:((50-(form.description.length))<=0)?'red':'#c0c4cc'}">可输入{{100-form.description.length<0?0:(50-form.description.length)}}个字</div>
          </el-form-item>
        </el-row>
        <el-col :span="24">
          <span>&nbsp;</span>
        </el-col>
        <el-row>
          <el-col :span="24"><div class="grid-content bg-purple-light right-button"><el-button type="primary"  @click="backClose('form')">确认退回</el-button>&nbsp;&nbsp;&nbsp;<el-button @click="resetForm()">取消</el-button></div></el-col>
        </el-row>
      </el-form>
    </el-dialog>

  </div>
</template>
<script>

  import {issuesDetailById,projectsList,standardVersions,assignment,closeIssue,reassignmentIssue,finishIssue,returnIssue} from "@/libs/api"
  import Util from '@/libs/util';
  import bus from '@/libs/bus.js'
  import axios from 'axios'
  import BigImg from './BigImg.vue';
  import ElRow from "element-ui/packages/row/src/row";

  export default{
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },
    components: {
      ElRow,
      'big-img':BigImg
    },
    data(){
      return {
        rules: {
          projectId:[
            {required: true, message: '请选择项目', trigger: 'change'}
          ],
          problemItem:[
            {required: true, message: '请选择事件类型', trigger: 'change'}
          ],
          description: [
            { required: true, message: '请输入退回说明', trigger: 'blur' }
          ]

        },
        lastProcessType:0,// 8 打回
        detailName:'',//标题名称
        secondAppointDiv:false,//确认指派
        closeIssueDiv:false,//关闭弹框
        concludeIssueDiv:false,//办结弹框
        backIssueDiv:false,//退回弹框
        vid: 'emerg-amap',
        plugin: [{
          pName: 'ToolBar',
          liteStyle: true
        }],
        zoom: 18,
        mapObj: null,
        mapStyle:'',
        markers: [],
        center:[116.397428, 39.90923],
        mapTimer:null,
        eventOfflineMarker:null,
        dataObj:{},
        id:0,
        deductPoints:0,//基准扣分
        timeLimit:0,//处理时限
        showImg:false,
        imgSrc: '',
        projectList:[],//项目列表
        filterText: '',//事件类型名称
        versionsList:[],//事件类型
        versionName:'',//事件标准名称
        activeName:'',
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        form: {
          id:0,
          projectId:'',
          closeType:1,
          description:'',
          problemItem:'',
          deductPoints:'0',
          timeLimit:'0',
          closeType:1,
        },
        companyName:'',//公司名称
        projectName:''
      }
    },
    methods: {
      clickImg(e) {
        this.showImg = true;
        // 获取当前图片地址
        this.imgSrc = e.currentTarget.src;
      },
      viewImg(){
        this.showImg = false;
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
        this.initApi();
        //根据传参ID获取详情
        this.id = parseInt(this.$route.query.id);
        this.activeName = localStorage.activeName;
        localStorage.setItem("activeStatues",0);
        if(localStorage.activeName == 'eventEndInfo'){
          this.detailName = "事件详情";
          $('.centerClass').css('height',$('.contentDiv').height()-46+'px');
        }else{
          this.detailName = "事件处理";
        }
        //待指派
        if(localStorage.activeName == 'eventStartInfo'){
          let self = this;
          //获取项目列表
          self.getProjectList();
          self.getStandardVersionsList();
        }
        //处理中状态获取项目列表，重新指派
        if(localStorage.activeName == 'eventBeingInfo'){
          let self = this;
          //获取项目列表
          self.getProjectList();
        }
        issuesDetailById({id:this.$route.query.id}).then(data => {
        this.dataObj = data;
        this.form.projectId = data.projectName;
        this.companyName = data.companyName;

        //处理中状态获取项目列表，重新指派
        if(localStorage.activeName == 'eventVerifiedInfo'){
          let self = this;
          self.lastProcessType = data.lastProcessType;
          //获取项目列表
          self.getProjectList();
        }
        //获取事件坐标，渲染地图标记点
        var offsetCooredinates = data.offsetCooredinates;
        if(offsetCooredinates != null){
          this.center=offsetCooredinates.split(",");
          this.mapObj = map;
          var marker = new AMap.Marker({
            icon: "./static/addMarker.png",
            position: offsetCooredinates.split(",")
          });
          marker.setMap(map);
        }
      }).catch(error => {
          self.$message.error({showClose: true, message:'暂无数据', duration: 2000});
      })
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
              value:data[i].primaryClassification,
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
          $(".versionError").hide();
        }
      },
      /*指派任务*/
      editSubmit(form){

        this.$refs[form].validate((valid) => {
          if(valid){
            let self = this;
            if(this.form.projectId){
              this.projectList.forEach(function(items,index){
                if(self.form.projectId == items.projectId){
                  self.projectName = items.projectName;
                }
              })
            }
            this.secondAppointDiv=true;
          }else{
            return false;
          }
        })
      },
      firstAppoint(){
        var loginParams = this.form;
         loginParams.id=parseInt(this.id);
         assignment(loginParams).then(data => {/*指派接口*/
         //指派成功跳转首页，待指派tab切
         this.$router.replace({path:'/eventInfo?activeName='+this.activeName});
         }).catch(error => {
         self.$message.error({showClose: true, message:'指派失败', duration: 2000});
         })
      },
      secondAppointDalog(){
        let self = this;
        if(this.form.projectId){
          this.projectList.forEach(function(items,index){
            if(self.form.projectId == items.projectId){
              self.projectName = items.projectName;
            }
          })
        }
        if(self.form.projectId == self.dataObj.projectName){
          self.projectName = self.dataObj.projectName;
        }
        this.secondAppointDiv=true;
      },
      /*重新指派任务*/
      appointDalog(){
        let self = this;
          if(self.form.projectId == null || self.form.projectId == ''){
            $(".projectError").show();
            return false;
          }
          if(self.form.projectId == self.dataObj.projectName){
            self.form.projectId = self.dataObj.projectId;
          }
          var close =this.id+'&projectId='+parseInt(self.form.projectId);
          reassignmentIssue(close).then(data => {/*重新指派接口*/
            //指派成功跳转首页，待指派tab切
            this.$router.replace({path:'/eventInfo?activeName='+this.activeName});
          }).catch(error => {
              self.$message.error({showClose: true, message:'指派失败', duration: 2000});
          })
      },
      /*关闭事件*/
      endSubmit(){
        this.form.closeType = '1';
        this.closeIssueDiv = true;
      },
      /*确认关闭*/
      affirmClose(){
        var loginParams = this.form;
        var close = this.id+'&closeType='+loginParams.closeType;
        closeIssue(close).then(data => {/*问题关闭接口*/
          //关闭成功跳转首页，待指派tab切
          this.$router.replace({path:'/eventInfo?activeName='+this.activeName});
      }).catch(error => {
          self.$message.error({showClose: true, message:'关闭失败', duration: 2000});
      })
      },

      /*办结案件*/
      concludeSubmit(){
        this.concludeIssueDiv = true;
      },
      /*确认办结*/
      concludeClose(){
        finishIssue(this.id).then(data => {/*问题办结接口*/
          //关闭成功跳转首页，待指派tab切
          this.$router.replace({path:'/eventInfo?activeName='+this.activeName});
      }).catch(error => {
          self.$message.error({showClose: true, message:'办结失败', duration: 2000});
      })
      },

      /*退回案件*/
      backSubmit(){
        this.form.description = '';
        this.backIssueDiv = true;
      },
      /*确认退回*/
      backClose(form){
        this.$refs[form].validate((valid) => {
          if (valid) {
            var loginParams = this.form;
            var close = this.id+'&description='+loginParams.description;
            returnIssue(close).then(data => {/*问题退回接口*/
            //关闭成功跳转首页，待指派tab切
            this.$router.replace({path:'/eventInfo?activeName='+this.activeName});
            }).catch(error => {
              self.$message.error({showClose: true, message:'退回失败', duration: 2000});
            })
          } else {
            return false;
          }
        });
      },
      /*取消关闭指派页面*/
      resetForm() {
        this.closeIssueDiv = false;
        this.concludeIssueDiv = false;
        this.backIssueDiv = false;
        this.secondAppointDiv=false;
      },
      photoShow(items){
        this.imgSrc = items;
        this.issuePhotoDiv = true;
      }


    },
    created(){

    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/theme/element-variables.scss";
  .this-el-dialog{
    margin-top: 20vh!important;
  }
  .GdMap >.el-vue-amap-container>.el-vue-amap amap-container>.amap-logo{
    display: none;
  }
  .GdMap >.el-vue-amap-container>.el-vue-amap amap-container> .amap-copyright {
    bottom:-100px;
    display: none;
  }
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
    line-height:45px;
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
    padding-top:25px;
  }
  .buttonRightClass{
    line-height:39px;
  }
  .vertical_line{
    color:#62a8ea;
  }
  /*内容左部div*/
  .center_left_div{
    padding-left:56px;
    float:left;
    width:50.3%;
    height:100%;
    border-right:1px solid #d8d8d8;
  }
  .center_detail{
    padding-top:10px;
  }
  /*地图*/
  .addressMap{
    width:100%;
    height:300px;
    margin-top:10px ;
    margin-bottom:10px;
    border:1px solid #e6e6e6;
  }
  /*内容右部div*/
  .center_right_div{
    padding-left:56px;
    padding-right:56px;
    float:right;
    width:49.7%;
    height:100%;
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
    line-height:40px;
  }
  .bg-purple-light {
    color:#000;
    font-size:12px;
    line-height:40px;
  }
  .right-button{
    text-align: right;
  }
  .issueTabClass{
    margin-left:130px;
    width:90px;
  }
  /*待核查标签*/
  .verifiedStatus{
    float:left;
    font-size:12px;
    width:48px;
    height:20px;
    border-radius:3px;
    border:1px solid #ff7d0a;
    text-align:center;
    background-color:#ff7d0a;
    color:#fff;
    margin-top:-25px;
    line-height: 18px;
  }
  /*重办标签*/
  .punishStatus{
     font-size:12px;
     width:36px;
     height:20px;
     border-radius:3px;
     border:1px solid #ff7d0a;
     text-align:center;
     color:#ff7d0a;
     margin-top:-25px;
     float:right;
     line-height: 18px;
   }
  /*超时标签*/
  .overTimeStatus{
    font-size:12px;
    width: 35px;
    height: 20px;
    border-radius: 3px;
    border: 1px solid #ff7d0a;
    text-align: center;
    color: #ff7d0a;
    margin-top: -24px;
    line-height: 18px;
    float: left;
    margin-left: 130px
  }

  .timeline-item{
    position: relative;
    padding: 0px 20px 20px 80px;
  }
  /*进度线样式*/
  .timeline-item:before{
  }
  .timeline-list{
    border-radius:4px;
    box-shadow:0px 4px 30px rgba(0,0,0,0.2);
    width:80%;
    margin-left:44px;
    margin-bottom:20px;
    padding:20px;
    box-sizing:border-box;
    min-height:130px;
    font-size:12px;
    color:#1c1c1c;
    position:relative;
  }
  /*进度线圆点*/
  .timeline-list:before{
    width:18px;
    height:18px;
    background-color:#dbdbdb;
    border-radius:50%;
    content:' ';
    position:absolute;
    left:-32px;
    top:20px;
    z-index:11;
  }
  .timeline-list:first-child:before{
    width:18px;
    height:18px;
    background-color:#9ece67;
    border-radius:50%;
    content:' ';
    position:absolute;
    left:-32px;
    top:20px;
    z-index:11;
  }
  .timeline-list:last-child:after{
    content:' ';
    border-left:2px dashed transparent;
    position:absolute;
    left:-24px;
    top:40px;
    width:8px;
    height:100%;
  }
  .timeline-list:after{
    content:' ';
    border-left:2px dashed #e0e0e0;
    position:absolute;
    left:-24px;
    top:40px;
    width:8px;
    height:100%;
  }
  .timeline-content-tit{
    width: 12px;
    color: #1c1c1c;
    font-weight: bold;
  }
  .timeline-content-time{
    position: absolute;
    left: -85px;
  }
  .timeline-content-time p{
    line-height: 24px;
    text-align: right;
  }
  .timeline-list-content p{
    line-height: 30px;
    margin:0.6em 0;
  }
  .feedback{
    position: relative;
    border-top: 1px solid #ebebeb;
    padding-top:16px;
    margin-bottom: 20px;
  }
  .feedback label{
    position: absolute;
    position: absolute;
    top: -10px;
    background-color: #fff;
    width: 50px;
  }
  .work-img{
    width: 70px;
    height: 70px;
    margin-right:15px;
    cursor:pointer
  }
  .sourceSelect{
    width:100%;
  }

  .text_class{
    text-align:left;
  }
  .closs-left-class{
    text-align:right;
    padding-right:20px;
  }
</style>
