<template>
    <div class="contentDiv p-relative">
        <div v-if="id ==0 " class="standardBox p-absolute">
            <p class="standardText">您还未导入标准，若设置请点击下方按钮完成导入</p>
            <router-link to="/process"><el-button type="primary">设置标准</el-button></router-link>
        </div>
        <div v-else class="standardBoxs">
            <div class="processIndex">
                <div class="process_name">以下是您当前应用的标准版本，若想更换请点击右侧更换按钮完成标准版本更换</div>
                <router-link to="/process"><div class="process_return" title="更换标准">更换</div></router-link>
                <div style="clear: both"></div>
            </div>
            <!--版本名称-->
            <div  class="excel_name_tit">{{standardVersion}}</div>
            <!--版本分类-->
            <div class="excel_div">
                <el-collapse v-model="activeName" accordion >
                  <el-collapse-item class="excel_tit" :title="item.standardClassify" v-for="(item,index) in standardClassify" :name="index">
                    <ul>
                        <li v-for="items in item.standardTerm">
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
        </div>
    </div>

</template>
<script>
/*import {standardDetail} from '@/libs/api'
  import Util from '@/libs/util'*/
  export default{
      data () {
          return {
              id:"0",
              standardVersion:'',
              standardClassify:[],
              showHide:'true',
              activeName:0
          }
      },
      methods:{
         
      },
      created(){
          let self = this;
          /*standardDetail({params:{districtNumber:localStorage.cityNumber,standardVersionId:''}}).then(data => {
            if(JSON.stringify(data)!='{}'){
                this.id = data.id,
                this.standardVersion = data.standardVersion,
                this.standardClassify = data.standardClassify,
                localStorage.setItem("oldStandardVersionId",data.id)
            }
          }).catch(error => {
              self.$message.error({showClose: true, message: '请求失败', duration: 2000});
          })*/
      }
  }
</script>
<style lang="scss" >
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
    .contentDiv{
      background:#fff;
      width:100%;
      height:100%;
    }
    /*无数据时div*/
    .standardBox{
      width:100%;
      height:100%;
      background: white;
      margin-bottom: 20px;
      box-sizing: border-box;
      text-align: center;
      padding-bottom: 20px;
      top:40%;
    }
    /*无标准时提示*/
    .standardText{
      font-size: 14px;
      color: #757575;
      margin-bottom: 35px;
    }
    /*有标准时提示*/
    .processIndex{
      padding: 25px 25px 0px 25px;
    }
    /*有标准时提示*/
    .process_name{
      float: left;
      font-size: 14px;
      color: #89959c;
    }
    /*更换按钮*/
    .process_return{
      float: right;
      /* width: 46px;*/
      height: 28px;
      padding:0px 7px 0px 28px;
      background:url('../../../assets/images/replace.png') no-repeat 10px 1px;
      border: 1px solid #c1d8f7;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      color: #5b5959;
      font-size: 12px;
      text-align: center;
      line-height: 28px;
      cursor:pointer;
    }
    /*版本名称*/
    .excel_name_tit{
        font-size: 24px;
        color: #000;
        text-align:center;
        margin-bottom: 20px;
        line-height: 50px;
    }
    .excel_name{
      text-align:center;
      font-size: 14px;
      color: #89959c;
      line-height: 50px;
      cursor: pointer;
      margin-bottom: 20px;
    }
    .excel_tit{
      font-size:14px;
      color:#000;
      font-weight:bold;
    }
    /*折叠展示样式*/
    .excel_div ul li{
      margin-left:30px;
      margin-right:30px;
      border-top:1px  solid #e0e0e0;
      font-weight:normal;
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

</style>
