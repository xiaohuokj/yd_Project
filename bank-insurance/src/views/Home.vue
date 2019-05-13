<template>
  <el-container>
    <!--左侧菜单导航-->
    <div class="showBtn" v-bind:class="{ hideBtn: !showMenu}" @click="showfun"></div>
    <div class="menuStyle" v-show="showMenu" >
      <ul class="menuList">
        <li v-for="(value, key) in menulist" :class="{licurrent:clickmenu['list'+(key+1)]}" @mouseover="menuhover(key)" @click="clickMenu(key)"  @mouseout="menuhout(key)">
          <a v-if="value.url" :href="value.url">
            <p v-if="listmenu['list'+(key+1)]">
              <span :class="[value.style]"></span>
              <span class="nameHeight">{{value.name}}</span>
            </p>
            <p v-else>
              <span :class="[value.style,value.current]"></span>
            </p>
          </a>
          <router-link v-else-if="value.path"  :to="value.path">
            <p v-if="listmenu['list'+(key+1)]">
              <span :class="[value.style]"></span>
              <span class="nameHeight">{{value.name}}</span>
            </p>
            <p v-else>
              <span :class="[value.style,value.current]"></span>
            </p>
          </router-link>
          <div  v-else >
            <p v-if="listmenu['list'+(key+1)]">
              <span :class="[value.style]"></span>
              <span class="nameHeight">{{value.name}}</span>
            </p>
            <p v-else>
              <span :class="[value.style,value.current]"></span>
            </p>
          </div>
        </li>
      </ul>
      <div class="menu-qr-code"></div>
      <div class="menu-hover-qr-code"><img src="../assets/images/qrhovercode.png"></div>
      <div class="botttomlogout" @click="logout">退出</div>
    </div>
    <div class="childmenu" v-show="childshow" @mouseout="mouseoutchildBox" @mouseover="mouseoverchildBox">
      <div class="childName">{{childName}}</div>
      <ul>
        <li v-for="(value, key) in childmenu" class="li_1" :class="{childhover:childmenu[key].childbjhover,childcurrent:childmenu[key].childbjshow}" @click="clildClick(key)" @mouseover="childmenuhover(key)" @mouseout="childmenuhout(key)">
          <router-link  :to="value.url">
            <i>●</i>{{value.name}}
          </router-link>
        </li>
      </ul>
    </div>
    <!--右侧内容-->
    <el-container :class="{toggleContainer:isCollapse}">
      <!-- <div class="is-collapse" :class="{noCollapse:isCollapse}" @click="toggleCollapse"></div> -->
      <el-header style="height:44px;line-height:80px">
        <div class="ui-breadcrumb" v-show="breadcrumbShow" >
          <div class="label" :class="{marginleft:!showMenu}">{{menulist[selectParI].name}}</div>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item,index) in breadcrumbList" :key="index">{{item.name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="topbar-account">
          <!-- <el-dropdown trigger="hover">
              <span class="el-dropdown-link">
                  <i class="topbar-newsinfo menu-icons"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
              </el-dropdown-menu>
          </el-dropdown> -->
          <!-- <el-dropdown trigger="hover">
              <span class="el-dropdown-link topbar-userinfo">二娜</span>
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                      <div @click="editPassword"><span>修改密码</span></div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                      <div @click="logout"><span>退出登录</span></div>
                  </el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown> -->
          <!-- <el-dropdown trigger="hover">
              <span class="el-dropdown-link"><i class="topbar-expand menu-icons"></i></span>
              <el-dropdown-menu slot="dropdown">
              </el-dropdown-menu>
          </el-dropdown> -->
        </div>
      </el-header>
      <el-main>
        <div class="content-wraper">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </el-main>
      <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
        <el-form :model="passform" ref="passform" :rules="formrules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="旧密码" prop="pass" required>
            <el-input v-model="passform.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpass" required>
            <el-input v-model="passform.newpass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="renewpass" required>
            <el-input v-model="passform.renewpass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"  @click="submitForm('passform')">确认</el-button>
            <el-button @click="resetForm('passform')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-container>
  </el-container>
</template>
<script>
  import bus from '@/libs/bus.js'
  import * as api from "@/libs/api"
  import Util from '@/libs/util';
  import LayoutMenu from './Layout/LayoutMenu.vue'
  export default {
    name:'StyleHome',
    components: { LayoutMenu },
    data () {
      var validatePass1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入旧密码'));
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.passform.renewpass !== '') {
            this.$refs.passform.validateField('renewpass');
          }
          callback();
        }
      };
      var validatePass3 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.passform.newpass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        childName:'',
        showMenu:true,
        childshow:false,
        selectName:"",
        parentIndex:0,
        selectParI:0,
        defaultActiveIndex:"0",
        breadcrumbList:[],
        breadcrumbShow:true,
        isCollapse:false,
        dialogFormVisible:false,
        childmenu:[
        ],
        menulist:[
          {
            id:0,
            name:'环卫监管',
            path:'/sanitationSuper',
            style:'projecticon',
            current:'iconcurrent'
          },
          {
            id:1,
            name:'场站监控',
            url:'../supervise-web/depotIndex.html',
            style:'stationicon',
            current:'iconcurrent'

          },
          {
            id:2,
            name:'应急指挥',
            path:'/emergecommand',
            // url:'../supervise-web/depotIndex.html',
            style:'superviseicon',
            current:'iconcurrent'

          },
          {
            id:3,
            name:'质量监察',
            url:'',
            style:'eventmanger',
            current:'iconcurrent',
            childList:[
              {
                id:21,
                name:'事件管理',
                url:'/eventInfo',
                childbjhover:false,
                childbjshow:false,
              }
            ]
          },
          {
              id:4,
              name:'数据分析',
              url:'',
              style:'reportData',
              current:'iconcurrent',
              childList:[
                  {
                      id:21,
                      name:'质量监察日报',
                      url:'/superviseDayReport',
                      childbjhover:false,
                      childbjshow:false,
                  },
                  {
                      id:22,
                      name:'人工清保日报',
                      url:'/workerDayReport',
                      childbjhover:false,
                      childbjshow:false,
                  },
                  {
                      id:23,
                      name:'机械清保日报',
                      url:'/vehDayReport',
                      childbjhover:false,
                      childbjshow:false,
                  }
              ]
          },
          {
              id:5,
              name:'基础信息',
              url:'',
              style:'informationicon',
              current:'iconcurrent',
              childList:[
                  {
                      id:21,
                      name:'人员管理',
                      url:'/userinfo',
                      childbjhover:false,
                      childbjshow:false,
                  }
                  // ,{
                  //   id:23,
                  //   name:'标准管理',
                  //   url:'/standard',
                  //   childbjhover:false,
                  //   childbjshow:false,
                  // }
              ]
            },
        ],
        listmenu:{
          list1:false,
          list2:false,
          list3:false,
          list4:false,
          list5:false
        },
        clickmenu:{
          list1:false,
          list2:false,
          list3:false,
          list4:false,
          list5:false
        },
        active:'',
        passform:{
          pass:'',
          newpass:'',
          renewpass:''
        },
        formrules:{
          pass:[{ validator: validatePass1, trigger: 'blur' }],
          newpass:[{ validator: validatePass2, trigger: 'blur' }],
          renewpass:[{ validator: validatePass3, trigger: 'blur' }]
        }
      }
    },
    methods: {
      showfun(){
        this.showMenu=!this.showMenu;
      },//是否显示菜单

      clildClick(e){//点击子菜单的LI
        for(var j=0;j<this.childmenu.length;j++){
          this.childmenu[j].childbjhover=false
          this.childmenu[j].childbjshow=false
        }
        for(var i=0;i<this.menulist.length;i++){
          this.menulist['list'+(i+1)]=false;
          this.clickmenu['list'+(i+1)]=false;
        }
        var id=parseInt(this.parentIndex);
        this.clickmenu['list'+(id+1)]=true;
        this.childmenu[e].childbjshow=true;
        // this.parentIndex=this.selectParI;
        this.selectParI=this.parentIndex;
        sessionStorage.setItem('lastMenu',this.parentIndex);
        this.showMenu=!this.showMenu;
        this.childshow=false;
      },
      childmenuhover(e){//鼠标滑出子菜单LI
        for(var i=0;i<this.childmenu.length;i++){
          this.childmenu[i].childbjhover=false
        }
        this.childmenu[e].childbjhover=true
      },
      childmenuhout(e){//鼠标滑出子菜单LI
        for(var i=0;i<this.childmenu.length;i++){
          this.childmenu[i].childbjhover=false
        }
      },
      mouseoutchildBox(){//鼠标滑出子菜单
        this.childshow=false;
      },
      mouseoverchildBox(){
        this.childshow=true;
      },
      clickMenu(e){//点击父级菜单
        var id=parseInt(e);
        if(!!this.menulist[e].childList && this.menulist[e].childList.length>0){

        }else{
          if(!!this.childmenu && this.childmenu.length){
            for(var j=0;j<this.childmenu.length;j++){
              this.childmenu[j].childbjhover=false
              this.childmenu[j].childbjshow=false
            }
          }
          for(var i=0;i<this.menulist.length;i++){
            this.menulist['list'+(i+1)]=false;
            this.clickmenu['list'+(i+1)]=false;
          }
          this.clickmenu['list'+(id+1)]=true;

        }
        this.parentIndex=id;
        this.selectParI=id
        sessionStorage.setItem('lastMenu',id);
      },
      menuhover(e){   //菜单hover事件
        var id=parseInt(e);
        this.listmenu['list'+(id+1)]=true;
        if(!!this.menulist[e].childList && this.menulist[e].childList.length>0){
          this.parentIndex=id;
          this.childName=this.menulist[e].name
          this.childmenu=this.menulist[e].childList;
          this.childshow=true;
        }

      },
      menuhout(e){
        var id=parseInt(e);
        if(!!this.menulist[e].childList && this.menulist[e].childList.length>0){
          this.childName=this.menulist[e].name
          this.childmenu=this.menulist[e].childList;
          this.childshow=true;
        }else{
          this.childshow=false;
        }
        this.listmenu['list'+(id+1)]=false;


      },
//        toggleCollapse(){
//            this.isCollapse = !this.isCollapse;
//        },
      handleSelect(){
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      //修改密码
      editPassword(){
        this.dialogFormVisible = true;
      },
      submitForm(form){
        this.$ref[form].validate((valid) =>{
          if(valid){
            alert('submit');
            this.dialogFormVisible = true;
          }else{
            console.log('error submit!!');
        return false;
        this.dialogFormVisible = true;
      }
      })
      },
      resetForm(form){
        this.$ref[form].resetFields();
        this.dialogFormVisible = true;
      },
      //退出
      logout(){
        let that = this;
        this.$confirm('确认退出吗?', '提示', {
          confirmButtonClass: 'el-button--warning'
        }).then(() => {
          //确认
          var loginhef=localStorage.getItem('loginhef')
          localStorage.removeItem('access-user');
        localStorage.setItem("user_token",'');
        window.location.href="../../supervise-web/login.html"
      }).catch(() => {});
      }
    },
    mounted(){
       var currentIndex= sessionStorage.getItem('lastMenu');
       this.clickmenu['list'+(currentIndex+1)]=true;
    },
    created(){
      const index = window.parent.index;
      let breadCrumbs = [];
      if(index && index.breadCrumbs) {
        breadCrumbs = index.breadCrumbs
      }
      this.breadcrumbList = breadCrumbs;
      let data = {};
      data = eval("("+sessionStorage.getItem("LOGIN_INFO")+")");
      if(data!=''){
        // this.$store.commit('update',data);
      }else{
        window.location.href="../../supervise-web/login.html";
      }
      if(sessionStorage.getItem("lastMenu") != null && sessionStorage.getItem("lastMenu") != ''){
        this.selectParI= sessionStorage.getItem("lastMenu");
        console.log(this.selectParI+'点击当前菜单')
        console.log(this.menulist[this.selectParI]+'点击当前菜单list')
      }
    }
  }
</script>
<style scoped lang="scss">
  .showBtn{
    position:absolute;
    left: 0px;
    top: 0px;
    width: 74px;
    z-index: 100;
    text-align: center;
    height: 94px;
    cursor:pointer;
    box-sizing: border-box;
    background:url(../assets/images/menuicon.png)no-repeat;
    background-position:0px -109px;
  &.hideBtn{
     background-position:0px -10px;
   }
  }
  .menuStyle{
    padding-top: 94px;
    width:74px;
    position:relative;
    min-height: 500px;
    background:#263238;
  .menuList{
    max-height:500px;
  li{
    display: block;
    list-style: none;
    height: 74px;
    text-align: center;
    cursor:pointer;
  a{
    color:white;
    text-decoration: none;
  }
  &.licurrent{
     background:#1d262b;
   //background: red;
   }
  span{
    display: block;
  }
  .nameHeight{
    line-height: 30px;
    height: 34px;

  }
  // 环卫监管
     .superviseicon{
       background:url(../assets/images/menuicon.png)no-repeat;
       background-position:0px -208px;
       width: 74px;
       height: 40px;
       display: block;
  &.iconcurrent{
     height: 74px;
     background-position:0px -198px;
   }
  }
  // 场站监控
     .stationicon{
       background:url(../assets/images/menuicon.png)no-repeat;
       background-position:0px -282px;
       width: 74px;
       height: 40px;
       display: block;
  &.iconcurrent{
     height: 74px;
     background-position:0px -272px;
   }
  }
  // 场站监控
     .informationicon{
       background:url(../assets/images/menuicon.png)no-repeat;
       background-position:0px -360px;
       width: 74px;
       height: 40px;
       display: block;
  &.iconcurrent{
     height: 74px;
     background-position:0px -360px;
   }
  }
  .projecticon{
    background:url(../assets/images/menuicon.png)no-repeat;
    background-position:0px -434px;
    width: 74px;
    height: 40px;
    display: block;
  &.iconcurrent{
     height: 74px;
     background-position:0px -423px;
   }
  }
  .eventmanger{
    background:url(../assets/images/menuicon.png)no-repeat;
    background-position:0px -512px;
    width: 74px;
    height: 40px;
    display: block;
  &.iconcurrent{
     height: 74px;
     background-position:0px -502px;
   }
  }
    /*数据分析*/
  .reportData{
    background:url(../assets/images/menuicon.png)no-repeat;
    background-position:0px -590px;
    width: 74px;
    height: 40px;
    display: block;
    &.iconcurrent{
      height: 74px;
      background-position:0px -581px;
    }
  }
  }
  }

  }
  .childmenu{
    position: absolute;
    width: 220px;
    height: 100%;
    left: 74px;
    top: 0px;
    z-index: 500;
    background: #242f35;
  .childName{
    line-height: 80px;
    padding-left: 20px;
    font-size: 16px;
  }
  ul{
  li{
  // list-style:disc inside;
    padding:0;
    padding-left: 26px;
    line-height: 40px;
    font-size: 14px;
  a{
    color:white;
    text-decoration: none;
  }
  i{
    font-style: normal;
    font-size: 12px;
    padding-right: 10px;
  }
  &.childcurrent{
     background: #1d262b;
   //background: red;
   }
  &.childhover{
     background: #273339;
   // background: green;
   }
  }
  }
  }
  .marginleft{
    margin-left: 50px
  }
  .botttomlogout{
    width:48px;
    height:48px;
    line-height:48px;
    background:#fc4782;
    border-radius:50%;
    text-align: center;
    position: absolute;
    bottom:20px;
    left:13px;
    cursor:pointer;
  }


  .el-menu--collapse{
    width:74px;
    background:#263238;
  }

  .el-menu-item,
  .el-submenu__title{
    height:42px;
    line-height:42px;
  }
  .el-submenu__title{
    text-align:center;
  }
  .el-container{
    width:100%;
    height:100%;
    color:#fff;
    position:relative;
  .el-aside{
    height:calc(100%);
    box-sizing:border-box;
    position:relative;
  &.toggleMenu{
     width:90px!important;
   }
  .aside-menu{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
  .aside-logo{
    width:100%;
    height:60px;
    line-height:60px;
    background:url('../assets/images/logo_icon.png') no-repeat 0 0;
    background-color:#23262b;
    transition: width .2s;
    -moz-transition: width .2s;  /* Firefox 4 */
    -webkit-transition: width .2s;   /* Safari 和 Chrome */
    -o-transition: width .2s;
  &.smallLogo{
     background-position: -218px 0;
     background-color:#23262b;
   }
  }
  .el-menu{
    background-color:#263238;
    padding:20px;
    box-sizing:border-box;
    height:calc(100% - 60px);
    border-right:0;
  .el-submenu,.el-menu-item{
    height:42px;
    line-height:42px;
    font-size:14px;
  .el-submenu__title{
    height:42px!important;
  .samll-icon,.small-txt{
    display:inline-block;
  }
  }
  &:hover{
  .el-submenu__title{
    height:42px!important;
  .samll-icon,.small-txt{
    color:#fff;
    display:inline-block;
  }
  }
  }
  .el-menu--inline{
    font-size:12px;
  .el-menu-item{
    text-align:center;
    font-size:12px;
    list-style:disc;
    list-style-position:inside;
  &:hover{
     color:#fff!important;
   }
  }

  }
  }
  &.el-menu--collapse{
     padding:10px 0;
     width:90px;
  .el-menu-item{
    height:42px;
    line-height:42px;
  .el-submenu__title{
    width:100%;
    height:42px!important;
    line-height:42px;
    text-align:center!important;
  .samll-icon{
    text-align:center;
    transform:scale(1.2);
    -webkit-transform:scale(1.2);
    -moz-transform:scale(1.2);
    -o-transform:scale(1.2);
    -ms-transform:scale(1.2);
  }
  }
  &:hover{
     color:#fff;
     height:66px;
     line-height:66px;
  .el-submenu__title{
    width:100%;
    height:66px!important;
    line-height:66px!important;
    text-align:center!important;
  &:hover{
     height:66px!important;
     line-height:66px!important;
     text-align:center!important;
   }
  .samll-icon{
    height:42px;
    line-height:42px;
    display:block;
    transform:scale(1.2);
    -webkit-transform:scale(1.2);
    -moz-transform:scale(1.2);
    -o-transform:scale(1.2);
    -ms-transform:scale(1.2);
  }
  .small-txt{
    width:100%;
    display:block;
    height:24px;
    line-height:24px;
    font-size:12px;
    visibility:visible;
    color:#fff;
  }
  }
  }
  }
  .el-submenu{
  .el-submenu__title{
    height:66px!important;
    line-height:66px!important;
  &:hover{
     height:66px!important;
     line-height:66px!important;
   }
  }
  }
  }
  }
  }
  }
  .el-container{
    width:calc(100% - 218px);
    height:100%;
    position:relative;
    transition: width .2s;
    -moz-transition: width .2s;  /* Firefox 4 */
    -webkit-transition: width .2s;   /* Safari 和 Chrome */
    -o-transition: width .2s;
  &.toggleContainer{
     width:calc(100% - 90px);
   }
  .is-collapse{
    width:18px;
    height:78px;
    position:absolute;
    left:0;
    top:50%;
    margin-top:-39px;
    cursor:pointer;
    background:url('../assets/images/list_arrow.png') no-repeat center top;
  &.noCollapse{
     background-position:0 -78px;
   }
  }
  .el-header{
    width:100%;
    height:94px;
    padding:0px;
    box-sizing:border-box;
    fon-zize:1em;
    position:relative;
    background: #ecedef;
  //box-shadow:1px 1px 7px rgba(53,53,53,0.1);
  .ui-breadcrumb {
    color: #666666;
    padding:0 20px;
    box-sizing:border-box;
    width:calc(100% - 14.25rem);
  .label {
    float: left;
    font-size: 16px;
    color:#3583ca;
  }
  .el-breadcrumb {
    min-height: 16px;
    line-height: 16px;
    font-size: 16px;
  }
  .el-breadcrumb__inner {
    color: #666666;
    font-weight: normal;
    cursor: text;
  }
  .el-breadcrumb__separator {
    font-weight:normal;
    color: #666;
    margin: 0 3px;
  }
  }
  .topbar-account{
    position:absolute;
    right:0;
    top:0;
    line-height:60px;
    width:14.25rem;
    height:100%;
  .el-dropdown{
  .el-dropdown-link{
    text-align:center;
    display:inline-block;
    width:36px;
    height:36px;
    line-height:36px;
    margin:0 20px;
  }
  &:last-child{
  .el-dropdown-link{
    margin-right:0;
  }
  }

  }
  .topbar-userinfo{
    border-radius:50%;
    color:#fff;
    font-size:0.625em;
    background-color:#fc4782;
  }
  .topbar-newsinfo{
    background-position:3px -27px;
  &:hover{
     background-position:4px -52px;
   }
  }
  .topbar-expand{
    background-position:-28px -28px;
  &:hover{
     background-position:-25px -50px;
   }
  }
  }
  }
  .el-main{
    width:100%;
    height:calc(100% - 60px);
    padding:20px;
    box-sizing:border-box;
    background-color:#ecedef;
  .content-wraper{
    width:100%;
    height:100%;
  }
  }
  }
  }
  .el-submenu__title{
    height:30px!important;
    line-height:30px;
  }
  /*二维码*/
  .menu-qr-code{
    width: 50px;
    height: 50px;
    background: url(../assets/images/qrcode.png) no-repeat center;
    position: absolute;
    bottom:110px;
    margin-left: 12px;
    cursor:pointer;
  }
  .menu-hover-qr-code{
    width: 308px;
    height: 348px;
    position:absolute;
    left:62px;
    bottom:70px;
    display:none;
    z-index:501
    /*background:url(../images/qrhovercode.png) no-repeat center;*/
    /*box-shadow: 0 0 10px rgba(0,0,0,0.8) inset;*/
  }
  .menu-qr-code:hover + .menu-hover-qr-code{
    display:block;
  }
  .menu-hover-qr-code img{
    width:100%;
    height:100%;
  }
  @media screen and (max-width:1366px){
    .menu-hover-qr-code{
      width: 214px;
      height: 245px;
      position:absolute;
      left:66px;
      bottom:88px;
      display:none;
      /*background:url(../images/qrhovercode.png) no-repeat center;*/
      /*box-shadow: 0 0 10px rgba(0,0,0,0.8) inset;*/
    }
  }
</style>


