<template>
  	<div class="wrap-main" id="accountWraper" :style="{height: tableHeight}">
    		<cui-table  ref="accountTable" :tableConfigs="tableConfigs">
            <template slot="operate" slot-scope="scope">
                <el-button type="text"  size="small" @click="editDalog(scope.row)">修改</el-button>
                <el-button v-show="scope.row.status==0" type="text" size="small" @click="deletePersonner(scope.row)">删除</el-button>
                <el-button type="text" size="small" @click="detailDalog(scope.row)">详情</el-button>
                <el-button type="text" size="small" @click="passwordReset(scope.row)">重置密码</el-button>
            </template>
            <!--状态-->
            <template slot="status" slot-scope="scope">
                {{scope.row.status == 0 ? '离职' :'在职'}}
            </template>
                <!--性别-->
            <template slot="sex" slot-scope="scope">
                {{scope.row.sex == 1 ? '女' :'男'}}
            </template>
                <!--岗位-->
            <template slot="roleId" slot-scope="scope">
                {{scope.row.roleId == 1 ? '女' :'男'}}
            </template>
           <!--高级查询-->
            <el-form ref="searchForm" :model="searchForm" :inline="true" class="demo-form-inline" slot="cuiTableAdvQuery">
                <el-row :gutter="24">
                    <el-form-item label="人员姓名">
                        <el-select v-model="tableConfigs.params.userName" filterable  placeholder="请选择"  clearable>
                           <el-option v-for="item in peopleList"
                           :key="item.id"
                           :label="item.name"
                           :value="item.name">
                           </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="手机号码">
                        <el-select v-model="tableConfigs.params.telephone" filterable  placeholder="请选择"  clearable>
                           <el-option v-for="item in peopleList"
                           :key="item.id"
                           :label="item.telephone"
                           :value="item.telephone">
                        </el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item label="职务">
                        <el-select v-model="tableConfigs.params.roleId" placeholder="请选择"  clearable>
                            <el-option v-for="item in options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" @click="searchF">查询</el-button>
                        <el-button  size="small" @click="clearList">清除</el-button>
                    </el-form-item>
                </el-row>
            </el-form>
            <!--end高级查询-->
            <div slot="cuiTableBtn">
                <el-button size="mini" @click="adddialog('form')"><i class="el-icons el-icon-plus"></i>新增</el-button>
                <el-button size="mini" @click="refresh"><i class="el-icons el-icon-refresh"></i>刷新</el-button>
            </div>
        </cui-table>
        <!--新增和编辑弹窗-->
        <el-dialog width="680px" :title="addbtn?'新增':'编辑'" :visible.sync="dialogFormVisible" class="dialogborder" >
           <el-form :model="form" :rules="rules" class="demo-ruleForm" ref="form" :label-width="formLabelWidth">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="姓名:"  prop="name">
                      <el-input v-model="form.name" auto-complete="off" clearable></el-input>
                    </el-form-item>
                 </el-col>
                 <el-col :span="12">
                    <el-form-item label="性别:"  prop="sex">
                          <el-radio v-model="form.sex" label="0">男</el-radio>
                          <el-radio v-model="form.sex" label="1">女</el-radio>
                    </el-form-item>
                 </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="职务:"  prop="roleId">
                          <el-select v-model="form.roleId" placeholder="请选择"  clearable>
                            <el-option v-for="item in options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="在职状态:"  prop="status">
                          <el-radio v-model="form.status" label="1">在职</el-radio>
                          <el-radio v-model="form.status" label="0">离职</el-radio>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                      <el-form-item label="手机号码:"  prop="telephone">
                          <el-input v-model="form.telephone" auto-complete="off" clearable></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="12">
                      <el-form-item label="身份证号:"  prop="identityCard">
                          <el-input v-model="form.identityCard" auto-complete="off" clearable></el-input>
                      </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="所属项目:"  prop="projectId">
                        <el-select v-model="form.projectId" placeholder="请选择"  clearable filterable>
                            <el-option v-for="item in projectList"
                            :key="item.projectId"
                            :label="item.projectName"
                            :value="item.projectId">
                            </el-option>
                          </el-select>
                      </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                  <!-- <el-col :span="24"> -->
                    <el-form-item label="备注:"  prop="remark">
                        <div class="textarea_tips" :style="{color:((20-(form.remark.length))<=0)?'red':'#c0c4cc'}">可输入{{20-form.remark.length<0?0:(20-form.remark.length)}}个字</div>
                        <el-input type="textarea" v-model="form.remark"  :rows="2"  clearable maxlength="20"></el-input>
                    </el-form-item>
                  <!-- </el-col> -->
                </el-row>
           </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" v-if="editbtn" @click="editSubmit('form')">确 定</el-button>
                <el-button type="primary" v-if="addbtn" @click="addSubmit('form')">确 定</el-button>
                <el-button  @click="resetForm('form')">取 消</el-button>
            </div>
        </el-dialog>

        <!--详情-->
        <el-dialog title="详情" width="680px" :visible.sync="detailsFormVisible" >
            <el-form :model="formd" :label-width="formLabelWidth" class="demo-ruleForm detail-box" ref="formd">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="姓名:" >
                        <div>{{formd.name}}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="性别:">
                          <el-radio-group v-model="formd.sex">
                            <el-radio disabled :label="0">男</el-radio>
                            <el-radio disabled :label="1">女</el-radio>
                          </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                      <el-form-item label="职务:">
                        <div>{{formd.roleName}}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="在职状态:">
                          <el-radio-group v-model="formd.status">
                            <el-radio disabled :label="1">在职</el-radio>
                            <el-radio disabled :label="0">离职</el-radio>
                          </el-radio-group>
                      </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="手机号码:">
                          <div>{{formd.telephone}}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                       <el-form-item label="身份证号:" >
                          <div>{{formd.identityCard?formd.identityCard:'无'}}</div>
                       </el-form-item>
                    </el-col>
                </el-row>
                <el-row :span="24">
                    <el-form-item label="所属项目:">
                      <div>{{formd.projectName}}</div>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-col :span="24">
                      <el-form-item label="备注:" >
                         <div>{{formd.remark?formd.remark:'无'}}</div>
                      </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-dialog>
      <!--详情-->
  	</div>
</template>
<script>
/*
*PersonList 人员列表的接口
*newPersonnel 新增人员接口
*rolesList  职务获取列表
*editpersonnel 确认编辑人员信息的接口
* getpeople获取人员及手机号列表
* */
/*import {newPersonnel,PersonList,rolesList,editpersonnel,getpeople,deleteUser,projectList}  from "@/libs/api"*/
import Util from '@/libs/util';
import bus from '@/libs/bus.js'
import axios from 'axios'
export default{
    components: {
    },
    data () {
        var checkMarker = (rule, value, callback) => {/*验证备注不能多余20字*/
          if (value.length > 20) {
            callback(new Error('备注不能多于20字'));
          } else {
            callback();
          }
      };
        return {
            dialogFormVisible: false,
            passwordFormVisible:false,
            detailsFormVisible:false,
            sex:'0',
            addbtn:false,
            editbtn:false,
            status:'1',
            value: '',
            roleId: '',
            peopleList:[],
            projectList:[],
            form: {
              name: '',
              sex: '0',
              roleId: '',
              status: '1',
              telephone: '',
              projectId:'',
              identityCard: '',
              remark: ''
            },
            formd: {
            },
            rules: {
              name: [
                { required: true, message: '请输入姓名', trigger: 'blur' }
              ],
              sex: [
                { required: true, message: '请选择性别', trigger: 'change' }
              ],
              roleId: [
                 {required: true, message: '请选择角色', trigger: 'change' }
              ],
              status: [
                { required: true, message: '请选择状态', trigger: 'change' }
              ],
              telephone: [
                {required: true, message: '请输入手机号', trigger: 'blur' },
                {pattern: /(^((0[1,2]{1}\d{1}-?\d{8})|(0[3-9]{1}\d{2}-?\d{7,8}))$)|(^0?(13[0-9]|15[0-9]|17[0123456789]|18[0123456789]|14[57])[0-9]{8}$)/, message: '手机号格式不对！', trigger: 'blur'}
              ],
              remark: [
                { min: 0, max: 20, message: '备注不能多于20字 ', trigger: 'change' },
                { validator: checkMarker, trigger: 'change' }
              ],
              identityCard:[
                {pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/, message: '证件号码格式有误！', trigger: 'blur'}
              ]
            },
            options: [{//职务
              name: '管理员',
              id:1
            }, {
              name: '保洁员',
              id:2
            }],
            formLabelWidth: '100px',
            title:'新增',
            visible:true,
            breadcrumbList:[],
            breadcrumbShow:true,
            tableHeight:'700px',
            detailInfo:{},
            searchForm:{
                name:'',
                accountType:[],
                statusa :[],
                account:''
            },
            tableConfigs:{
                url:'/supervise/user/page',
                isShowSimQuery:true,//是否显示简单查询
                isShowAdvQuery:true,//是否显示复杂查询
                isShowFilter:false,//是否显示数据设置,
                simPlaceholder:'姓名/手机号/身份证号/职务',//简单查询输入提示
                simSearchParam:'searchable',//简单查询参数
                params:{
                  userName:'',
                  telephone:'',
                  roleId:''
                },
                columns:[
                  {
                    prop:'name',
                    label:'姓名',
                    colShow:true
                  },
                  {
                    prop:'sex',
                    label:'性别',
                    colShow:true,
                    scopedSlot:'sex',
                  },
                  {
                    prop:'telephone',
                    label:'手机号',
                    colShow:true
                  },
                  {
                    prop:'identityCard',
                    label:'身份证号',
                    colShow:true
                  },
                  {
                    prop:'roleName',
                    label:'职务',
                    colShow:true
                  },
                  {
                    prop:'status',
                    label:'在职状态',
                    colShow:true,
                    scopedSlot:'status'
                  },
                  {
                    prop:'remark',
                    label:'备注',
                    colShow:true
                  },
                  {
                      label:'操作',
                      fixed:'right',
                      scopedSlot:'operate',
                      width:250,
                      colShow:true
                  }
                ]
            }
        }
    },
    methods: {
      clearList(){
          this.tableConfigs.params = Object.assign(this.$data.tableConfigs.params, this.defaultData.tableConfigs.params);
      },
      getProject(){
        let self = this;
          projectList().then(result=> {
              if(result){
                  self.projectList = result;
              }
          }).catch(error=> {
              var pattern = /^[\u4E00-\u9FA5]$/;
              if(pattern.test(error.message)){
                  self.$message({type:'error',message:error.message});
              }
          });
      },
      adddialog(formName){//新增弹窗弹出
        this.getProject();
        this.dialogFormVisible = true;
        this.addbtn=true;
        this.editbtn=false;
        //this.$refs[formName].resetFields();
        this.form = Object.assign(this.$data.form, this.defaultData.form);
      },
      deletePersonner(json){
        let self = this;
        this.$confirm('该操作不可撤销，确定删除该人员信息吗？', '提示', {
              confirmButtonClass: 'el-button--primary'
          }).then(() => {
              //确认
              self.loading = true;
              let params = {
                userId: json.id
              };
              deleteUser(params).then(function (result) {
                  self.getJson()
                  self.$message({type:'success',message:'删除成功'});
              }).catch(error=> {
                  self.loading = false;
                  return
              });
          }).catch(() => {});
      },
      passwordReset(json) {
       let self = this;
        this.$confirm('是否确定为账号'+json.telephone+'重置密码?重置后的密码为该号码后六位数字 ', '重置密码', {
              confirmButtonClass: 'el-button--primary'
          }).then(() => {
              //确认
              axios.put('/supervise/user/'+json.id+'/password',/*重置密码*/
                    ).then((res)=>{
                      self.getJson()
                      self.$message({type:'success',showClose: true,message:'重置成功'});
                    })
          }).catch(() => {});
      },
      getJson(){
          var self = this;
          self.$refs.accountTable.cuiTableReload();
          this.getRole()
      },
      addSubmit(formName){/*新增*/
        var self = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addbtn=false;
            this.editbtn=false;
             var loginParams = this.form;
               loginParams.sex=parseInt(loginParams.sex)
               loginParams.roleId=parseInt(loginParams.roleId)
               loginParams.status=parseInt(loginParams.status)
               /*newPersonnel(loginParams).then(data => {/!*新增接口*!/
                 this.$refs[formName].resetFields();
                 this.getJson()
                 self.$message({type:'success',showClose: true,message:"新增成功"});
                 this.dialogFormVisible=false;
                }).catch(error => {
                   self.$message({type:'error',showClose: true,message:error.message});
                 //this.$refs[formName].resetFields();
                })*/


         } else {
          return false;
        }
      })
      },
      resetForm(formName) {
          this.$refs[formName].resetFields();
          this.dialogFormVisible=false;
          this.addbtn=false;
          this.editbtn=false;
      },
      refresh(){
          this.$refs.accountTable.cuiTableReload();
      },
      searchF(){
          this.getJson();
      },
      editSubmit(formName){/*编辑*/
          /*this.$refs[formName].validate((valid) => {
              if (valid) {
              var loginParams = this.form;
              loginParams.sex=parseInt(loginParams.sex)
              loginParams.roleId=parseInt(loginParams.roleId)
              loginParams.status=parseInt(loginParams.status)
              editpersonnel(loginParams).then(data => {/!*编辑接口*!/
                  this.getJson();
                  this.$refs[formName].resetFields();
              }).catch(error => {
                  this.$refs[formName].resetFields();
              })
                  this.dialogFormVisible=false;
                  this.addbtn=false;
                  this.editbtn=false;
              } else {
                return false;
              }
          })*/
      },
      detailDalog(item){/*详情弹窗*/
        this.formd = Object.assign(this.formd,item);
        this.detailsFormVisible = true;
      },
      editDalog($row){/*编辑弹窗*/
        this.getProject();
        let getform=this.form;
        for (var key in $row) {
          if(key=="id"){
            this.form['id']=$row['id']
          }
          if(getform.hasOwnProperty(key)){
            if(key=="sex" || key=="status"){
              this.form[key]=""+$row[key]+""
            }else{
              this.form[key]=$row[key]
            }
          }
        }
        this.dialogFormVisible = true;
        this.editbtn=true;
        this.addbtn=false;
      },
      getRole(){
        let slef = this;
        rolesList().then(data => {
          slef.options=data
        }).catch(error => {
          slef.options=[]
          window.location.href="../../supervise-web/login.html";
        });
      },
    getPeopleList(){
        let slef = this;
         /*getpeople().then(data => {
           slef.peopleList=data
        }).catch(error => {
           slef.peopleList=[]
        });*/
    }
   },
    mounted(){
       this.$refs.accountTable.cuiTableReload();
       this.getRole();
       this.getPeopleList();
       this.tableHeight=$('.wrap-main').height($('.content-wraper').height()).height();
        const that = this;
        window.onresize = () =>{
            that.tableHeight=$('.wrap-main').height($('.content-wraper').height()).height();
        }
    },
    created(){
      this.defaultData = JSON.parse(JSON.stringify(this.$data));
      /*获取岗位角色*/
       //this.getRole();
    }
}
</script>
<style lang="scss" scoped>
    @import "../../../assets/theme/element-variables.scss";
    .demo-form-inline{
        padding:0 20px;
    }
    .el-message-box__message{
      color: red;
    }
    .detail-box{
      .el-form-item__content{
        text-align: left;
      }
    }
    .el-select{
      width:100%
    }
</style>
