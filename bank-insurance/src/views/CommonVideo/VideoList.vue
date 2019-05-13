<template>
  <div class="videoPanel p-absolute">
  <div class="shadowbox p-relative">
    <div class="vedio_box"  
          v-loading="loading"
          element-loading-text="正在加载中"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          element-loading-spinner="el-icon-loading">
        <div class="horn horn-top-left"></div>
        <div class="horn horn-top-right"></div>
        <div class="horn horn-bottom-left"></div>
        <div class="horn horn-bottom-right"></div>
        <div class="vedio-top">
          <div class="vedio-top-name">{{videotitle}}</div>
           <div class="vedio-top-shut" @click="vediohide"></div>
        </div>
        <div id="mapVideo">
  				<h1>Alternative content</h1>
  				<p><a href="http://www.adobe.com/go/getflashplayer"><img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" /></a></p>
  			</div>  
    </div>
  </div>
</div>
</template>
<!-- <script src="/static/swfobject.js"></script> -->
<script>
import axios from 'axios'
import swfobject from 'swfobject'
import bus from '@/libs/bus'
  export default {
    data() {
      return {
         isInitFinished:false,
         clientPort:'',
         clientIp:'',
         videoIp:'http://camera.ior.org.cn',
         jsession:'',
         videotitle:'',
         loading:false,
         devIdno:''
      };
    },
    methods: {
        jsessionF(){//获取jsession码
            var url=this.HOST;
            let self = this; 
              axios.get(url + '/StandardApiAction_login.action?',{
                params:{
                   account:'admin',
                   password:'Zll@asd1707'
                }
              })
              .then(function(response){
                 self.jsession = response.data.jsession;
                 self.initPlayerExample()
              })
              .catch(function(err){
                console.log(err);
              });
        },
        initPlayerExample() {
          var self=this;
          //视频参数
          var params = {
            allowFullscreen: "true",
            allowScriptAccess: "always",
            bgcolor: "#FFFFFF",
            wmode: "transparent"
          };
          //赋值初始化为未完成
           this.isInitFinished = false;
          //初始化flash
             swfobject.embedSWF("../../supervise-vue/static/media/player.swf", "mapVideo", '100%','100%', "11.0.0", null, null, params, null);
          self.initFlash(self);     
        },
        initFlash(self) { 
          if (swfobject.getObjectById("mapVideo") == null ) {
            // self.loading = true;
            setTimeout(function(){
              self.initFlash(self)
            }, 50);
          } else {
          var url=this.HOST;
          /*axios.get(url + '/StandardApiAction_getUserServer.action?jsession='+ self.jsession,{ })
              .then(function(response){
                    // self.loading = false;
                    self.clientPort = response.data.server.clientPort;
                    self.clientIp = response.data.server.clientIp;
                  //配置当前的窗口数目
                     swfobject.getObjectById("mapVideo").setWindowNum(3);
                    //设置服务器信息
                    swfobject.getObjectById("mapVideo").setServerInfo( self.clientIp, '6605');
                    self.isInitFinished = true;
                    swfobject.getObjectById("mapVideo").setVideoInfo(0, '视频1');
                    swfobject.getObjectById("mapVideo").setVideoInfo(1, '视频2');
                    swfobject.getObjectById("mapVideo").setVideoInfo(2, '视频3');
                    swfobject.getObjectById("mapVideo").startVideo(0, self.jsession, self.devIdno, 3, 1, true);
                    swfobject.getObjectById("mapVideo").startVideo(1, self.jsession, self.devIdno, 4, 1, true);
                    swfobject.getObjectById("mapVideo").startVideo(2, self.jsession, self.devIdno, 5, 1, true);
                    swfobject.getObjectById("mapVideo").stopVideo(0);
                    swfobject.getObjectById("mapVideo").stopVideo(1);
                    swfobject.getObjectById("mapVideo").stopVideo(2); 
              }).catch(function(err){
              });*/
          }
        },
        vediohide(){
          this.$emit('closeVideo','');     
        } 
    },
    mounted(){
        let self=this;
        /*bus.$on('videoInfo',(data) =>{
          self.videotitle = data.name;
          // self.devIdno=data.carVideoNum?data.carVideoNum:data.videoUrl;
          self.devIdno=data.carVideoNum?data.carVideoNum:'101117102802';
        });*/
     }
  };
</script>
<style lang="scss" scoped>
.videoPanel{
    background-color: rgba(0,0,0,0.5);
    z-index: 110;
    width: 100%;
    height: 100%;
    top: 0;
}
.shadowbox{
  height: 100%;
  width: 100%;
}
.vedio_box{
    width: 50%;
    height:70%;
    border: 1px solid #0b7ac5;
    position: absolute;
    z-index: 1000;
    margin: 0px auto;
    background: #132541;
    left:calc((100% -  50%)/2);
    top:50px;
   .vedio-top{
     width: 100%;
     height: 39px;
     background-color:#000000;/* IE6和部分IE7内核的浏览器(如QQ浏览器)下颜色被覆盖 */
     background-color:rgba(0,0,0,0.2); 
     overflow: hidden;
     position: absolute;
     left: 0px;
     top: 0px;
    .vedio-top-name{
       float: left;
       color: white;
       font-size: 16px;
       line-height: 39px;
       margin:0px 10px;
     }
     .vedio-top-shut{
       float: right;
       color: white;
       background: url("../../assets/images/menus.png") no-repeat;
       background-position: -87px -59px;
       width: 16px;
       height: 17px;
       margin:10px 10px 0px 10px;
       cursor: pointer
     }
   }
    
   
}


</style>