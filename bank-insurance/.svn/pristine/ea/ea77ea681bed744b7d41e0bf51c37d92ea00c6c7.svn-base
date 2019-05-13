<template>
    <div>
    	<el-form v-show="formShow" class="style-form p-relative"  ref="caseForm" :model="caseForm" :rules="caserules" label-position="right" label-width="80px">
    		<p class="switch-event" @click="switchEvent"><a href="javascript:;" > 质量事件转入</a></p>
    		<el-form-item label="名称:"  prop="name">
                <el-input v-model="caseForm.name" auto-complete="off" clearable @change="valideteName" :disabled="disable"></el-input>
                <p class="valide-error">{{valideText}}</p>
            </el-form-item>
            <el-form-item label="位置:"  prop="address">
                <el-input placeholder="请在地图中标注位置" :title="caseForm.address" v-model="caseForm.address" auto-complete="off" :disabled="true" clearable></el-input>
            </el-form-item>
            <el-form-item label="发生时间:" prop="startTime">
            	<el-date-picker
                      :disabled="disable"
                      popper-class="style-dropdown"
    			      v-model="caseForm.startTime"
    			      type="datetime"
                      format="yyyy-MM-dd HH:mm:ss"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      :picker-options="pickerOptions"
    			      placeholder="选择日期时间">
    			</el-date-picker>
            </el-form-item>
            <el-form-item label="级别:"  prop="level">
                <el-radio-group v-model="caseForm.level">
    		      	<el-radio class="level1" :label="1">一般</el-radio>
    		      	<el-radio class="level2" :label="2">较大</el-radio>
    		      	<el-radio class="level3" :label="3">重大</el-radio>
    		      	<el-radio class="level4" :label="4">特大</el-radio>
    		    </el-radio-group>
            </el-form-item>
            <el-form-item label="备注:"  prop="remark">
                <div class="textarea_tips" :style="{color:((50-(caseForm.remark.length))<=0)?'red':'#c0c4cc'}">可输入{{50-caseForm.remark.length<0?0:(50-caseForm.remark.length)}}个字</div>
                <el-input type="textarea" v-model="caseForm.remark" :rows="4"  clearable maxlength="50"></el-input>
            </el-form-item>
        	<div class="t-center p-absolute form-btn">
        		<el-button type="primary" @click="onSubmit">创建</el-button>
    			<el-button @click="cancel">取消</el-button>
        	</div>
    	</el-form>
        <emerge-qualitylist ref="quailtyList" v-show="!formShow" @reloading="refresh"></emerge-qualitylist>
    </div>
</template>
<script>
import Util from '@/libs/util'
import * as api from "@/libs/api"
import bus from '@/libs/bus'
// import moment from 'moment'
import EmergeQualitylist from './EmergeQualitylist.vue'
export default{
    name:'EmergForm',
    components: { EmergeQualitylist },
	data(){
        let checkMarker = (rule, value, callback) => {/*验证备注不能多余20字*/
            if (value.length > 51) {
                callback(new Error('备注不能多于50字'));
            } else {
                callback();
            }
        };
		return{
            pickerOptions:{
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
			formtitle:'',
            formShow: true,
            disable:false,
            valideText:'',
            caserules:{
            	name:[{ required: true, message: '请输入名称', trigger: 'change' },{ max: 30, message: '名称最多可输入30位', trigger: 'blur' }],
            	address:[{ required: true, message: '请输入案件位置', trigger: 'change' }],
            	startTime:[{ required: true, message: '请选择发生时间', trigger: 'change' }],
                remark: [{ min: 0, max: 50, message: '备注不能多于50字 ', trigger: 'change' },{ validator: checkMarker, trigger: 'change' }]
            },
            addMarker:null,
            eventmarket:null,
            caseForm:{
            	name:'',
            	address:'',
            	coordinate:'',
            	startTime:this.moment().format('YYYY-MM-DD HH:mm:ss'),
            	level:1,
            	remark:'',
                cityNumber:'',
                token:'',
                endRange:''
            },
		}
	},
	methods:{
        setTimeRange(time){
             this.endRange = time + ':00' + ' - ' + '23:59:59';
        },
        initForm(){
            this.formShow = true;
            let self = this;
            this.$nextTick(()=>{
                if(self.addMarker!==null){
                    self.addMarker.setMap(null)
                }
                if(self.eventmarket!==null){
                    self.eventmarket.setMap(null)
                }
                self.disable = false;
                self.$refs['caseForm'].resetFields();
                self.caseForm = Object.assign(self.caseForm, self.defaultData.caseForm);
                self.$set(self.caseForm,'startTime',self.moment().format('YYYY-MM-DD HH:mm:ss'));
                api.addEmergeCaseName().then(data => {
                    self.caseForm.name = data.name;
                }).catch(error => {
                    self.$message({showClose: true,message: error.message,type: 'error'});
                });
                self.mapObj = self.mapObj?self.mapObj:self.$store.state.map;
                if(self.mapObj!=null){
                    AMap.event.addListener(self.mapObj, 'click', self.getLnglat);
                }
            });
        },
        getLnglat(e){
            let x = e.lnglat.getLng();
            let y = e.lnglat.getLat();
            let lnglatXY = new AMap.LngLat(x, y);
            if(this.mapObj && this.formShow && this.$store.state.enableStatus){
                this.geocoder(lnglatXY);
            }
        },
        geocoder(lnglat){//地理位置解析
            let MGeocoder, self = this;
            this.mapObj.plugin(["AMap.Geocoder"], function () {
                MGeocoder = new AMap.Geocoder({
                    radius: 1000,
                    extensions: "all"
                });
                MGeocoder.getAddress(lnglat, function(status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        let address = result.regeocode.formattedAddress; //返回地址描述
                        self.caseForm.address = address;
                        let coordinate = [];
                        coordinate.push(lnglat.lng);
                        coordinate.push(lnglat.lat);
                        self.caseForm.coordinate = coordinate.join(',');
                        self.caseForm.address = address;
                    }
                });
                if(self.addMarker!==null){
                    self.addMarker.setMap(null)
                }
                self.addMarker = new AMap.Marker({
                    map: self.mapObj,
                    icon: new AMap.Icon({
                        image: "../supervise-vue/static/addMarker.png" ,
                        size: new AMap.Size(58, 30),
                        imageOffset: new AMap.Pixel(-0, -0)
                    }),
                    position: lnglat,
                    offset: new AMap.Pixel(-5, -30)
                });
                self.addMarker.setMap(self.mapObj);
            });
        },
		switchEvent(){//转入事件
            let self = this;
            this.$nextTick(()=>{
                self.$refs.quailtyList.getJson();
                if(self.addMarker!==null){
                    self.addMarker.setMap(null)
                }
                self.$store.commit('updateStatus',false);
                self.formShow=!self.formShow;
            });
		},
        refresh(value){
            let self = this;
            this.$nextTick(()=>{
                if(value!=''){
                    self.disable = true;
                    self.caseForm.address = value.address;
                    self.caseForm.coordinate = value.offsetCooredinates;
                    self.caseForm.startTime = self.moment(value.reportTime).format('YYYY-MM-DD HH:mm:ss');
                    self.eventmarket = value.eventmarket;
                }
                self.formShow = !self.formShow;
            });
        },
		onSubmit(){//新增应急案件
        	let self = this;
            this.$refs['caseForm'].validate((valid) =>{
                if(valid){
                    let json = {};
                    json = Object.assign(json, self.caseForm);
                    json.cityNumber =  self.$store.state.cityNumber;
                    json.token = self.$store.state.token;
                    json.startTime = self.moment(json.startTime, 'YYYY-MM-DD HH:mm:ss').valueOf();
                    if(json.startTime>new Date().getTime()){
                        self.$message({showClose: true,message: '您所选择的时间大于当前时间，请重新选择',type: 'warning'});
                    }else{
                        api.addEmergeCase(json).then(response => {
                            self.$message({showClose: true,message: '创建成功',type: 'success'});
                            if(self.addMarker!==null){
                                self.addMarker.setMap(null)
                            }
                            if(self.eventmarket!==null){
                                self.eventmarket.setMap(null)
                            }
                            self.$store.commit('updateStatus',false);
                            self.$store.commit('updateCaseId',response.id);
                            self.$emit('pareloading',response);
                        }).catch(error =>{
                            self.$message({showClose: true,message: error.message,type: 'error'});
                        });
                    }

            	}
        	})
        },
        cancel(){//取消
            let self = this;
            this.$nextTick(()=>{
                self.$refs['caseForm'].resetFields();
                self.$store.commit('updateStatus',false);
                if(self.addMarker!==null){
                    self.addMarker.setMap(null)
                }
                if(self.eventmarket!==null){
                    self.eventmarket.setMap(null)
                }
                self.$emit('pareloading','');
                self.caseForm = Object.assign(self.caseForm, self.defaultData.caseForm);
            });
        },
        valideteName(){
            let self = this;
            api.valideCaseName({name:this.caseForm.name}).then(response => {
                if(response.verify=="true"){
                    self.valideText = '';
                }else{
                    self.valideText = '案件名称已存在，请重新输入';
                }
            }).catch(error =>{
                self.$message({showClose: true,message: error.message,type: 'error'});
                self.valideText = '';
            });
        }
	},
    computed:{
        cityNumber(){
            return this.$store.state.cityNumber;
            return this.$store.state.cityName;
            return this.$store.state.map;
            return this.$store.state.token;
            return this.$store.state.enableStatus;
        }
    },
    mounted(){
        bus.$on('getMapObj',(data) =>{
            self.mapObj = data.mapObj;
        });
    },
    created(){
        this.defaultData = JSON.parse(JSON.stringify(this.$data));
    }
}
</script>
<style lang="scss" scoped>
.style-form{
	width:400px;
	background-color:#1a2f54;
	padding:20px;
	box-sizing:border-box;
    border-top: 1px solid #0b1c38;
    box-shadow:0 0 5px rgba(4,16,48,0.8);
	.switch-event{
		text-align:right;
		margin-bottom:10px;
	}
    .valide-error{
        color:#fff;
        font-size:10px;
    }
}
.el-select-dropdown{
    background-color:#122442;
    color:#fff;
    border:none;
    padding:0 10px;
}
.el-dropdown-menu{
    background-color:#122442;
    color:#fff;
    padding:10px 7px 10px;
    border:none;
    border-radius:none;
    top: 369px;
    left: 301px;
    .el-dropdown-menu__item{
        padding:0 10px;
        color:#fff;
    }
    .popper__arrow{
        display:none;
    }
}
.el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover{
    background-color:#1f3151;
    border-radius:20px;
    border:none;
}
.el-popper[x-placement^=bottom] .popper__arrow{
    border-bottom-color: #0c1d37;
}
.el-popper[x-placement^=bottom] .popper__arrow::after{
        border-bottom-color: #122442;
}
.el-select-dropdown__item.selected,.el-select-dropdown__item{
    color:#fff;
}
.el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
    background-color:#1f3151;
    border-radius:20px;
    border:none;
    color:#fff;
}

.el-picker-panel,.el-input__inner,.el-picker-panel__footer{
    background-color:#122442;
    color:#fff;
    border:none;
    padding:0 10px;
}
.el-button.is-plain:focus, .el-button.is-plain:hover{
    background-color:#1f3151;
}
.el-picker-panel__footer{
    .el-button{
        background-color:#1f3151;
    }
}
.el-popper[x-placement^=bottom] .popper__arrow{
    border-bottom-color: #0c1d37;
}
.el-popper[x-placement^=bottom] .popper__arrow::after{
        border-bottom-color: #122442;
}
</style>
