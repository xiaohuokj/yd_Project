<template>
  <div class="wrap-main contentDiv">
    <el-tabs v-model="activeName" class="tabClass">
      <el-tab-pane v-for="(item, index) in tabPaneList" :key="item.name" :label="item.label" :name="item.name">
      </el-tab-pane>
      <!--<keep-alive>-->
        <component v-bind:is="activeName" ref="event"></component>
      <!--</keep-alive>-->
    </el-tabs>
  </div>
</template>
<script>

  import {statusTotal} from "@/libs/api"
  import Util from '@/libs/util';
  import bus from '@/libs/bus.js'
  import axios from 'axios'
  import EventStartInfo from './EventStartInfo.vue';
  import EventBeingInfo from './EventBeingInfo.vue';
  import EventVerifiedInfo from './EventVerifiedInfo.vue';
  import EventEndInfo from './EventEndInfo.vue';
  export default{
    watch : {
      activeName(val){ //监听切换状态-计划单
        this.activeName = val;
        localStorage.setItem("activeName",val);
        localStorage.setItem("activeStatues",1);
        this.statusTotal();
      },
    },
    name: 'app',
    data () {
      return {
        activeName: 'eventStartInfo',
        issueTotal:{},
        startLabel:'待指派',
        beingLabel:'处理中',
        verifiedLabel:'待核查',
        endLabel:'已结束',
        tabPaneList:[{
          name:'eventStartInfo',
          label:'待指派'
        },{
          name:'eventBeingInfo',
          label:'处理中'
        },{
          name:'eventVerifiedInfo',
          label:'待核查'
        },{
          name:'eventEndInfo',
          label:'已结束'
        }]
      }
    },
    components: {
      EventStartInfo,
      EventBeingInfo,
      EventVerifiedInfo,
      EventEndInfo
    },
    provide(){
      return{
        statusTotal:this.statusTotal
      }
    },
    methods: {
        statusTotal(){
          let self = this;
          statusTotal({}).then(data => {
          self.issueTotal = data;
          self.tabPaneList = [];
          var startMap = {
            name:'eventStartInfo',
            label:'待指派('+data.unDesignateTotal+')'
          };
          self.tabPaneList.push(startMap);
          var beingMap = {
            name:'eventBeingInfo',
            label:'处理中('+data.processToal+')'
          };
          self.tabPaneList.push(beingMap);
          var verifiedMap = {
            name:'eventVerifiedInfo',
            label:'待核查('+data.unVerificationToal+')'
          }
          self.tabPaneList.push(verifiedMap);
          var endMap = {
            name:'eventEndInfo',
            label:'已结束('+data.finishTotal+')'
          };
          self.tabPaneList.push(endMap);
          }).catch(error => {
            self.$message.error({showClose: true, message:'暂无项目', duration: 2000});
            return ;
          });
        },
     },
    created(){
      this.statusTotal();
      if(this.$route.query.activeName != null){
        if(localStorage.activeStatues==1){
          this.activeName = localStorage.activeName;
        }else{
          this.activeName = this.$route.query.activeName;
        }

      }
    }
  }
</script>
<style lang="scss">
  .tabClass > .el-tabs__header{
    height:40px;
    margin:0px;
    padding-left: 10px;
  }
  /*上报页面上传图片*/
  .issueImgDiv>.el-upload--picture-card{
    height:70px;
    width:70px;
    line-height:82px;
    margin-top: 10px;
    float: left;
  }
  /*上报页面图片*/
  .issueImgDiv>.el-upload-list--picture-card .el-upload-list__item{
    height:70px;
    width:70px;
    margin-top:8px;
    float:left;
  }
  /*监察标准箭头方向调整*/
  .cascade-item .el-cascader.sourceSelect .el-icon-arrow-down{
    transform: rotateZ(180deg);
    vertical-align: -5px;
  }
  /*监察标准箭头方向调整*/
  .cascade-item .el-cascader .el-icon-arrow-down.is-reverse{
    transform: rotateZ(0deg);
  }
  .cascade-item .versionSelect{
    line-height:30px;
  }
  /*时间插件删除按钮*/
  .dateClossClass .el-date-editor .el-range__close-icon{
    display:none;
  }
  /*时间插件宽度*/
  .dateTimeClass{
    width: 94%;
  }
  /*input宽度，起止时间*/
  .dateTimeClass>.el-range-input{
    width:43%;
  }
  /*时间插件“至”位置*/
  .dateClossClass .dateTimeClass .el-range-separator{
    line-height:23px;
  }
  .dateTimeClass>.el-input__icon{
    margin-top:0px;
  }
  /*时限文本框*/
  .input_number_class{
    float: left;
  }
  .overtime_color{
    color:red;
  }
</style>
