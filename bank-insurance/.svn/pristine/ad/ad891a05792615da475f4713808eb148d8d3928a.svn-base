<template>
	<el-container class="style-container p-relative">
		<layout-menu></layout-menu>
		<layout-head></layout-head>
		<el-container class="style-main" :class="{overflows:overflows,}">
            <div class="style-wraper">
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </el-container>
	</el-container>
</template>
<script>
import LayoutHead from './Layout/LayoutHead.vue'
import LayoutMenu from './Layout/LayoutMenu.vue'
import bus from '@/libs/bus'
export default {
	name:'StyleHome',
    components: { LayoutHead,LayoutMenu },
    data() {
        return {
			overflows: false,
			
        }
	},
	mounted(){
		
		
		let width = $('.style-container').width();
		let height = $('.style-main').height();
		//alert(height)
		if(height>400){
			
			// $(".style-main").css("overflow-y:scroll");
			 
			 
			
			 this.overflows = true
		}else{
			
			 this.overflows = false
			 
		}
		$('.style-main').width(width);
		let data = {};
		data = eval("("+sessionStorage.getItem("LOGIN_INFO")+")");
		if(data!=''){
			// this.$store.commit('update',data);
			// bus.$emit('getCityInfo',data);
		}else{
			window.location.href="../../supervise-web/login.html";
		}
	}
}
</script>
<style lang="scss">
@import '../assets/theme/style-element-variable.scss';
.overflows{overflow-y:scroll;}

	.style-container{
		width: 100%;
		height: 100%;
		background-color:#07163c;
		background:url('../assets/images/bgimg.jpg') no-repeat center center;
		
		.style-content{
			width:100%;
			height:100%;
			
		}
	}
	.style-main{
		min-width:100%;
		margin-top:94px;
		height:calc(100% - 94px);
		 
		position:fixed;
		.style-wraper{
			width:100%;
			height:100%;
			padding:10px;
		}
	}
</style>
