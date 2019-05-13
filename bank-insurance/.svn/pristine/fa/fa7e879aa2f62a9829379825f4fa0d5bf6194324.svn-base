<template>
  	<div class="login-wrap">
    	<div class="login-container">
      		<div class="login-cont-left">
      			<div class="login-logo">
      				<img src="../assets/images/login_logo.png">
      			</div>
      			<div class="login-text">中路联运营管理系统</div>
      		</div>
      		<div class="login-cont-right">
	      		<el-form ref="loginform" :model="loginform" :rules="rules" label-position="left" label-width="0px" class="login-form">
		        	<h3 class="login-title">后台登录</h3>
		        	<el-form-item prop="account">
		          		<el-input type="text" v-model="loginform.account" placeholder="请输入账号(用户名)" clearable></el-input>
		        	</el-form-item>
		        	<el-form-item prop="password">
		          		<el-input type="password" v-model="loginform.password" placeholder="密码" clearable></el-input>
		        	</el-form-item>
		        	<el-form-item>
		          		<div class="drag">
						    <div class="drag_bg"></div>
						    <div class="drag_text">{{confirmWords}}</div>
						    <div @mousedown="mousedownFn($event)" class="handler handler_bg"></div>
						</div>
						<div v-show="valideText" class="valide-text">请先滑动滑块验证</div>
		        	</el-form-item>
		        	<el-form-item style="width:100%;">
		          		<el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin" :loading="loading">登录</el-button>
		        	</el-form-item>
	      		</el-form>
      		</div>
    	</div>
  	</div>
</template>
<script>
import * as api from '@/libs/api'
import Util from '@/libs/util'
import md5 from 'js-md5'
export default {
    data() {
      	return {
	        loading: false,
	        valideText:false,
	        value1:'0',
	        beginClientX:0,/*距离屏幕左端距离*/
            mouseMoveStata:false,/*触发拖动状态  判断*/
            maxwidth:$('.el-form-item').width() - 43,/*拖动最大宽度,依据滑块宽度算出来的*/
            confirmWords:'拖动滑块验证',      /*滑块文字*/
            confirmSuccess:false,
	        loginform: {
	          	account: '18888888888',
	          	password: '123456'
	        },
	        rules: {
	          	account: [
	            	{required: true, message: '请输入账号', trigger: 'blur'}
	          	],
	          	password: [
	            	{required: true, message: '请输入密码', trigger: 'blur'}
	          	]
	        }
	    };
    },
    methods: {
      	handleLogin() {
      		const that = this;
      		this.$refs['loginform'].validate(valid =>{
                if(valid&& this.confirmSuccess) {
                	this.loading = true;
                  var loginParams = { account: this.loginform.account, password: md5(this.loginform.password) };
                    api.requestLogin(loginParams).then(data => {
                    	that.loading = false;
                    	if(data){
	                    	sessionStorage.setItem('LOGIN_TOKEN',data.token);
	                      	sessionStorage.setItem("LOGIN_INFO",JSON.stringify(data));
                    		// sessionStorage.setItem('access-user', JSON.stringify(data));
                      		this.$router.push('/');

                    	}else{
                    		that.$message.error({showClose: true, message: data.message || '登录失败', duration: 2000});
                    	}
                    }).catch(error => {
                    	console.log(error);
                    	that.loading = false;
                      	that.$message.error({showClose: true, message: error || '登录失败', duration: 2000});
                    })
                }else{
                	this.valideText=true;
                }
            });
      	},
      	mousedownFn:function (e) {
            this.mouseMoveStata = true;
            this.beginClientX = e.clientX;
        },       //按下滑块函数
        successFunction(){
        	this.maxwidth=$('.el-form-item').width() - 43;
            $(".handler").removeClass('handler_bg').addClass('handler_ok_bg');
            $('.drag').addClass('success');
            this.confirmWords = '验证通过';
            $(".handler").css({'left':this.maxwidth});
            $(".drag_bg").css({'width': this.maxwidth});
            $('body').unbind('mousemove');
            $('body').unbind('mouseup');
            this.confirmSuccess = true;
        }
    },
    mounted(){
        $('body').on('mousemove',(e) => {
          	//拖动，这里需要用箭头函数，不然this的指向不会是vue对象
            if(this.mouseMoveStata){
                var width = e.clientX - this.beginClientX;
                if(width>0 && width<=this.maxwidth){
                    $(".handler").css({'left':width});
                    $(".drag_bg").css({'width': width});
                }else if(width>this.maxwidth){
                    this.successFunction();
                }
            }
        });
        $('body').on('mouseup',(e) => {     //鼠标放开
            this.mouseMoveStata = false;
            var width = e.clientX - this.beginClientX;
            if(width<this.maxwidth){
                $(".handler").css({'left':0});
                $(".drag_bg").css({'width': 0});
            }
        })
    }
}
</script>
<style lang="scss">
.login-wrap{
 	width:100%;
  	height:100%;
  	background:url('../assets/images/login_bj.png') no-repeat;
  	background-size:100% 100%;
  	-webkit-background-size:100% 100%;
  	-moz-background-size:100% 100%;
  	position:relative;
  	.login-container{
    	position:absolute;
	    width:46%;
	    height:48%;
	    left:50%;
	    top:50%;
	    margin-left:calc(-23% + 15px);
	    margin-top:-12%;
	    .login-cont-left,.login-cont-right{
	    	width:50%;
	    	height:100%;
	    	box-sizing:border-box;
	    }
	    .login-cont-left{
		    background-color:rgba(255,255,255,0.12);
		    display:inline-block;
		    .login-logo{
		    	    width: 13.625rem;
				    height: 4.875rem;
				    text-align: center;
				    padding:10px 15px;
				    box-sizing:border-box;
				    margin:calc((100% - 4.875rem)/2) auto 0;
		    	img{
		    		width:100%;
		    		height:100%;
		    	}
		    }
		    .login-text{
		    	text-align:center;
		    	line-height:2.215rem;
		    	color:#fff;
		    	font-size:1.875em;
		    	text-shadow:1px 5px 5px #000;
		    }
	    }
	    .login-cont-right{

	    	background-color:#fff;
	      	width:50%;
	      	height:100%;
	      	float:right;
	      	.login-form{
	      		padding:1.25rem;
	      		box-sizing:border-box;
	      		margin:calc((100% - 13.875rem)/2) auto 0;
	      	}
	      	.login-title{
	      		font-size: 1.5em;
			    color: #555151;
			    padding: 0.375rem 0;
	      	}
	      	.el-form-item{
	      		margin-bottom:15px;
	      	}
	      	.drag{
			    position: relative;
			    background-color: #e8e8e8;
			    width: 100%;
			    height: 30px;
			    margin-left: 0;
			    margin-top: 0;
			    line-height: 34px;
			    text-align: center;
			    &.success{
			    	.drag_text{
			    		color:#fff;
			    	}
			    }
			}
			.valide-text{
				color:red;
				font-size:10px;
			}
			.handler{
			    position: absolute;
			    top: 0px;
			    left: 0px;
			    width: 43px;
			    height: 30px;
			    border: 1px solid #ccc;
			    cursor: move;
			}
			.handler_bg{
			    background: #fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==") no-repeat center;
			}
			.handler_ok_bg{
			    background: #fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg==") no-repeat center;
			}
			.drag_bg{
			    background-color: #7ac23c;
			    height: 30px;
			    width: 0px;
			}
			.drag_text{
			    position: absolute;
			    top: 0px;
			    width: 100%;
			    font-size:0.75rem;
			    height:1.875rem;
			    line-height:1.875rem;
			    color:#666;
			    -moz-user-select: none;
			    -webkit-user-select: none;
			    user-select: none;
			    -o-user-select:none;
			    -ms-user-select:none;
			}
	    }
  	}
}

</style>
