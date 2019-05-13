<template>
  <div class="site-wrapper site-page--login">
    <div class="bg-swiper">
      <el-carousel indicator-position="none" arrow="always">
        <el-carousel-item v-for="(item, index) in swipreImg" :key="index">
          <!--<h3>{{ item }}</h3>-->
          <img class="swiperimg" :src="item.imgUrl" width="100%" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-form :model="loginForm" :rules="fieldRules" ref="loginForm" label-position="left" label-width="0px"
             class="demo-ruleForm login-container">
      <!--<div class="userLoginBg">用户登录</div>-->
      <div class="userForm-container">
        <div class="userLoginTit">牧联网银保数据中心</div>
        <div class="userLoginTit-min">肉牛全生命周期+物联网+区块链+大数据</div>
        <el-form-item prop="account">
          <i class="input-Icon input-Icon-user"></i>
          <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <i class="input-Icon input-Icon-password"></i>
          <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <!--<el-form-item style="margin: 0; line-height: 0">
          <el-col class="line" :span="4">&nbsp;</el-col>
          <el-col :span="8">
            <el-form-item prop="captcha">
              <el-input type="test" v-model="loginForm.captcha" auto-complete="off" placeholder="验证码"
                        style="width: 100%;">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1">&nbsp;</el-col>
          <el-col :span="7">
            <el-form-item>
              <img style="width: 100%;" height="40px" class="pointer" :src="loginForm.src" @click="refreshCaptcha">
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
        <el-form-item style="width:100%; margin-top: 10px; padding-bottom: 25%">
          <!--<el-button type="primary" style="width:48%;" @click.native.prevent="reset">重 置</el-button>-->
          <el-button type="primary" style="" @click.native.prevent="loginclick" :loading="loading">登 录</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
  // import {mapState} from 'vuex'
  // import Cookies from "js-cookie"
  /*import ThemePicker from "@/components/ThemePicker"
  import LangSelector from "@/components/LangSelector"*/
  import {setCookie} from '@/libs/cookieFun'
  import {requestLogin} from "@/libs/api"
  import { Message  } from 'element-ui'

  export default {
    name: 'Login',
    /*components: {
      ThemePicker,
      LangSelector
    },*/
    data() {
      return {
        swipreImg: [
          {
            id: "0001",
            imgUrl: require("../assets/img/bg1.jpg")
          }, {
            id: "0002",
            imgUrl: require("../assets/img/bg2.jpg")
          }, {
            id: "0003",
            imgUrl: require("../assets/img/bg3.jpg")
          }
        ],
        loading: false,
        loginForm: {
          account: '',
          password: '',
          captcha: '',
          src: ''
        },
        fieldRules: {
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
          // ,
          // captcha: [
          //   { required: true, message: '请输入验证码', trigger: 'blur' }
          // ]
        },
        checked: true
      }
    },
    created() {
      let that = this;
      document.onkeypress = function (e) {
        var keycode = document.all ? event.keyCode : e.which;
        if (keycode == 13) {
          // that.login();// 登录方法名
          return false;
        }
      };
    },
    methods: {
      loginclick() {
        this.login()
      },
      login() {
        if (this.loginForm.account == '' || this.loginForm.account == null) {
          return
        }
        if (this.loginForm.password == '' || this.loginForm.password == null) {
          return
        }
        this.loading = true
        this.$get(requestLogin, {username: this.loginForm.account, password: this.loginForm.password}).then((res) => {
          if (res.status === 200) {
            this.loading = false
            setCookie('token',  res.data.token);
            localStorage.setItem('user_name', res.data.user_name)
            this.$router.push({path: '/overview'})
          } else {
            this.loading = false
            Message({
              message: res.msg,
              type: 'error',
              duration: 3000
            });
          }
        }). catch((err) => {
          this.loading = false
          console.log(err)
        })
        /*this.$api.login.login(userInfo).then((res) => {
          if (res.msg != null) {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          } else {


            Cookies.set('token', res.data.token) // 放置token到Cookie
            sessionStorage.setItem('user', userInfo.account) // 保存用户到本地会话


            if (this.checked == true) {
              console.log("checked == true");
              //传入账号名，密码，和保存天数3个参数
              this.setCookie(this.loginForm.account, this.loginForm.password, 7);
            } else {
              console.log("清空Cookie");
              //清空Cookie
              this.clearCookie();
            }


            this.$store.commit('menuRouteLoaded', false) // 要求重新加载导航菜单
            this.$router.push('/')  // 登录成功，跳转到主页
          }
          this.loading = false
        }).catch((res) => {
          this.loading = false
          this.$message({
            message: res.message,
            type: 'error'
          })
        });*/
      },
      refreshCaptcha: function () {
        // this.loginForm.src = this.global.baseUrl + "/captcha.jpg?t=" + new Date().getTime();
      },
      reset() {
        this.$refs.loginForm.resetFields()
      },
      // 切换主题
      onThemeChange: function (themeColor) {
        this.$store.commit('setThemeColor', themeColor)
      },

      //设置cookie
      setCookie(c_name, c_pwd, exdays) {
        var exdate = new Date(); //获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
        //字符串拼接cookie
        window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
      },
      //读取cookie
      getCookie: function () {
        if (document.cookie.length > 0) {
          var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
          for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('='); //再次切割
            //判断查找相对应的值
            if (arr2[0] == 'userName') {
              this.loginForm.account = arr2[1]; //保存到保存数据的地方
            } else if (arr2[0] == 'userPwd') {
              this.loginForm.password = arr2[1];
            }
          }
        }
      },
      //清除cookie
      clearCookie: function () {
        this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
      }

    },
    mounted() {
      this.getCookie();
      this.refreshCaptcha()

    },
    computed: {
      /*...mapState({
        themeColor: state => state.app.themeColor
      })*/
    }
  }
</script>

<style lang="scss" scoped>
  .site-wrapper.site-page--login /deep/ .el-carousel__container {
    height: 100vh !important;
  }

  .site-wrapper.site-page--login /deep/ .el-carousel__container > button {
    display: none !important;
  }

  .site-wrapper.site-page--login /deep/ .el-input {
    width: 67%;
  }

  .site-wrapper.site-page--login /deep/ .el-form-item__content {
    text-align: center;
  }

  .site-wrapper.site-page--login /deep/ .el-form-item__error {
    left: 72px;
  }
  .site-wrapper.site-page--login /deep/ .el-input__inner {
    padding-left: 32px !important;
    border-color: #15889A;
  }
  .site-wrapper.site-page--login /deep/ .input-Icon {
    position: absolute;
    display: inline-block;
    top: 20%;
    left: 82px;
    z-index: 6;
    width: 18px;
    height: 18px;
    z-index: 6;
  }
  .site-wrapper.site-page--login /deep/ .input-Icon-user {
    background-image: url("../assets/input-Icon-user.png");
    background-repeat: no-repeat;
  }
  .site-wrapper.site-page--login /deep/ .input-Icon-password {
    background-image: url("../assets/input-Icon-password.png");
    background-repeat: no-repeat;
  }
  .site-wrapper.site-page--login /deep/ .remember {
    left: 72px;
  }
  .site-wrapper.site-page--login /deep/ .el-button--primary {
    width:67%;
    height: 50px;
    background-image: linear-gradient(-90deg, #0062B2 0%, #00B28F 100%);
    border: none;
    border-radius: inherit;
  }
  .site-wrapper.site-page--login {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    /*background-color: rgba(38, 50, 56, .6);*/
    overflow: hidden;
    .bg-swiper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;

      .swiperimg {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .login-container {
    position: absolute;
    top: 0;
    right: 80px;
    /*width: 450px;
    height: 75vh;
    min-height: 75vh;*/
    width: auto;
    min-width: 450px;
    height: auto;
    background: rgba(255,255,255,0.75);
    .userLoginTit {
      font-family: MicrosoftYaHei-Bold;
      font-size: 24px;
      color: #303133;
      text-align: center;
      margin-bottom: 10px;
    }
    .userLoginTit-min {
      font-family: MicrosoftYaHeiLight;
      font-size: 14px;
      color: #303133;
      text-align: center;
      margin-bottom: 8%;
    }
    .userLoginBg {
      text-align: center;
      width: 50%;
      height: 50px;
      line-height: 50px;
      position: absolute;
      background-image: linear-gradient(-90deg, #0062B2 0%, #00B28F 100%);
      font-family: MicrosoftYaHei-Bold;
      font-size: 16px;
      color: #FFFFFF;
    }
    .userForm-container {
      margin-top: 84px;
    }
    .title {
      /*margin: 0px auto 30px auto;*/
      /*text-align: center;*/
      /*color: #505458;*/
    }

    .remember {
      /*margin: 0px 0px 35px 0px;*/
    }
  }
</style>
