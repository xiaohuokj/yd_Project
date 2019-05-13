import Util from '../libs/util';

export const requestLogin = params => { return Util.ajax.post('/supervise/login', params).then(res => res.data); };
export const requestlogout = params => { return Util.ajax.get('/supervise/logout', params).then(res => res.data); };
/*新增人员*/
export const newPersonnel = params => { return Util.ajax.post('/supervise/user', params).then(res => res.data); };
/*获取人员列表*/
export const PersonList = params => { return Util.ajax.get('/supervise/user/page', params).then(res => res.data); };
/*岗位角色获取列表*/
export const rolesList = params => { return Util.ajax.get('/supervise/roles/list',params).then(res => res.data); };
/*确认编辑人员信息*/
export const editpersonnel = params => { return Util.ajax.put('/supervise/user',params).then(res => res.data); };
/*标准监察*/
export const standardDetail = params => { return Util.ajax.get('/supervise/standard/versions/detail',params).then(res => res.data); };
/*获取人员*/
export const getpeople = params => { return Util.ajax.get('/supervise/user',params).then(res => res.data); };
//省份列表
export const provinceList = params => { return Util.ajax.get('/supervise/provinces',params).then(res => res.data); };
//城市列表查询
export const citiesList = params => { return Util.ajax.get('/supervise/provinces/cities',params).then(res => res.data); };
//区/县列表查询
export const districtsList = params => { return Util.ajax.get('/supervise/cities/districts',params).then(res => res.data); };
// 根据省市区查询质量标准版本列表
export const versionsList = params => { return Util.ajax.get('/supervise/standard/versions',params).then(res => res.data); };
// 应用质量标准版本
export const applicationApi = params => { return Util.ajax.get('/supervise/standard/versions/application',params).then(res => res.data); };
// 删除人员
export const deleteUser = params => { return Util.ajax.delete('/supervise/user',{params:params}).then(res => res.data); };
//新增应急案件
export const addEmergeCase = params => { return Util.ajax.post('/supervise/cases',params).then(res => res.data); };
//新增获取name
export const addEmergeCaseName = params => { return Util.ajax.get('/supervise/cases/caseName',params).then(res => res.data); };
//新增获取name校验
export const valideCaseName = params => { return Util.ajax.get('/supervise/cases/verifyCaseName',{params:params}).then(res => res.data); };
//质量事件列表
export const qualityEventList = params => { return Util.ajax.get('/supervise/issues/page',{params:params}).then(res => res.data); };
//添加应急案件小组
export const addEmergeGroup = params => { return Util.ajax.post('/supervise/cases/groups',params).then(res => res.data); };
//应急小组关联资源
export const releteGroupResource = params => { return Util.ajax.post('/supervise/cases/groupResources',params).then(res => res.data); };
//群组列表
export const tempGroups = params => { return Util.ajax.get('/supervise/cases/'+params+'/groups',params).then(res => res.data); };
//获取附近资源
export const nearResource = params => { return Util.ajax.get('/supervise/cases/nearResources',{params:params}).then(res => res.data); };
//删除资源
export const delGroupResource = params => { return Util.ajax.delete('/supervise/cases/groupResources/'+params,params).then(res => res.data); };
//解散小組
export const delGroup = params => { return Util.ajax.delete('/supervise/cases/group/'+params,params).then(res => res.data); };
//结案
export const caseClose = params => { return Util.ajax.delete('/supervise/cases/'+params,params).then(res => res.data); };
//案件详情
export const caseDetail = params => { return Util.ajax.get('/supervise/cases/caseList',params).then(res => res.data); };
//案件总数
export const caseTotal = params => { return Util.ajax.get('/supervise/cases/caseTotal',params).then(res => res.data); };
//播放事件列表
export const brocastList = params => { return Util.ajax.get('/supervise/cases/message/page',{params:params}).then(res => res.data); };
//获取地图各类型坐标点
export const getAllOverlay = params => { return Util.ajax.get('/supervise/cases/info',{params:params}).then(res => res.data); };
//对讲
export const getGTalkTempCall = params => { return Util.ajax.get('/supervise/g-talk/temp-call?recAccounts='+params,params).then(res => res.data); };
//视频
export const getGTalkTempMonitor = params => { return Util.ajax.get('/supervise/g-talk/video-monitor?recAccounts='+params,params).then(res => res.data); };
//事件列表
export const dealEventList = params => { return Util.ajax.get('/supervise/cases/dispatchDetail',{params:params}).then(res => res.data); };
//分页查询监察问题列表-web端接口
export const issuesInfoPageList = params => { return Util.ajax.get('/supervise/issues/info/page',{params:params}).then(res => res.data); };
//根据问题ID获取问题详情-web端接口
export const issuesDetailById = params => { return Util.ajax.get('/supervise/supv/issues/detail',{params:params}).then(res => res.data); };
//获取项目列表-web端接口
export const projectsList = params => { return Util.ajax.get('/supervise/projects',{params:params}).then(res => res.data); };
//获取监察标准列表-web端接口
export const standardVersions = params => { return Util.ajax.get('/supervise/standard/versions/government-standard',{params:params}).then(res => res.data); };
//问题指派-web端接口
export const assignment = params => { return Util.ajax.put('/supervise/issues/assignment',params).then(res => res.data); };
//问题办结-web端接口
export const finishIssue = params => { return Util.ajax.put('/supervise/supv/issues/finish?id='+params).then(res => res.data); };
//问题关闭-web端接口
export const closeIssue = params => { return Util.ajax.put('/supervise/supv/issues/close?id='+params).then(res => res.data); };
//问题重新指派-web端接口
export const reassignmentIssue = params => { return Util.ajax.put('/supervise/supv/issues/reassignment?id='+params).then(res => res.data); };
//问题退回-web端接口
export const returnIssue = params => { return Util.ajax.put('/supervise/supv/issues/return?id='+params).then(res => res.data); };
//上报问题-web端接口
export const issuesReport = params => { return Util.ajax.post('/supervise/supv/issues',params).then(res => res.data); };
//上传图片-web端接口
export const uploadImg = params => { return Util.ajax.post('/supervise/files/mini-app/upload-img',{params:params}).then(res => res.data); };
//根据问题状态统计问题总数
export const statusTotal = params => { return Util.ajax.get('/supervise/issues/status/total',{params:params}).then(res => res.data); };
//大数据项目列表
export const projectList = params => { return Util.ajax.get('/supervise/governments/projects',{params:params}).then(res => res.data); };
//大数据echart
export const echartAData = params => { return Util.ajax.get('/supervise/companies/overview',{params:params}).then(res => res.data); };
//大数据echart
export const echartBData = params => { return Util.ajax.get('/supervise/issues',{params:params}).then(res => res.data); };
//大数据地图点
export const markerSpuperData = params => { return Util.ajax.get('/supervise/position/info',{params:params}).then(res => res.data); };
//大数据事件点坐标
export const issuesPositionData = params => { return Util.ajax.get('/supervise/issues/detail',{params:params}).then(res => res.data); };
