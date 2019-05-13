<template>

    <div class="cui-table-layout" ref="cuiTableLayout">
        <!--查询-->
        <div class="cui-table-query-layout" ref="cuiTableQuery" v-if="!tableConfigs.isSimTable">
            <el-collapse-transition>
                <div class="cui-table-simple-query" :class="isSimpleQuery?'hide':'show'" v-if="tableConfigs.isShowSimQuery">
                    <el-button type="text" size="small" v-show="tableConfigs.isShowAdvQuery" @click="_showAdvancedQuery" class="advanced-query-switch"><i class="icon16 icon16-query"></i>高级查询</el-button>
                    <el-input
                        :placeholder="this.tableConfigs.simPlaceholder || ''"
                        v-model="simInput"
                        clearable @change="_simQueryFn">
                    </el-input>
                </div>
            </el-collapse-transition>
            <el-collapse-transition>
                <div class="cui-table-advanced-query" v-if="tableConfigs.isShowAdvQuery" v-show="isShowQuery">
                    <el-button type="text" size="small"   @click="_showSimpleQuery" class="simple-query-switch"><i class="icon16 icon16-query"></i>简单查询</el-button>
                    <slot name="cuiTableAdvQuery"></slot>
                </div>
            </el-collapse-transition>
        </div>
        <!--按钮操作-->
        <div class="cui-table-button-layout clearfix" ref="cuiTableBtn" v-if="tableConfigs.isShowOptArea == false ? false:true">
            <div class="table-handle" v-if="tableConfigs.isShowBtn == false ? false:true">
                <slot name="cuiTableBtn"></slot>
            </div>
            <div class="table-filter" v-if="tableConfigs.isShowFilter == false ? false:true">
                <el-dropdown trigger="click" :hide-on-click="false">
                    <el-button type="text" size="small" @click="columnsFilter"><i class="icon16 icon16-set"></i>数据设置<i class="el-icon-arrow-down" :class="{ open:filterArrowSwitch }"></i></el-button>
                        <el-dropdown-menu slot="dropdown">
                        <el-scrollbar view-class="el-table-scrollbar_view">
                            <el-dropdown-item v-for="(item,idx) in columns" :key="idx"><el-checkbox v-if="!item.fixed" v-model="item.colShow">{{item.label}}</el-checkbox></el-dropdown-item>
                        </el-scrollbar>
                        </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <!--表格列表-->
        <div :style="{height:elTable}">
            <el-table class="cui-table-list-layout" ref="cuiTable"
                style="width:100%"
                :height="tableHeight"
                v-loading="loading"
                :data="data"
                :max-height="tableAttr.maxHeight"
                :stripe="tableAttr.stripe"
                :border="tableAttr.border == false ? false:true"
                :size="tableAttr.size"
                :fit="tableAttr.fit == false ? false:true"
                :show-header="tableAttr.showHeader == false ? false:true"
                :highlight-current-row="tableAttr.highlightCurrentRow"
                :current-row-key="tableAttr.currentRowKey"
                :row-class-name="tableAttr.rowClassName"
                :row-style="tableAttr.rowStyle"
                :cell-class-name="tableAttr.cellClassName"
                :cell-style="tableAttr.cellStyle"
                :header-row-class-name="tableAttr.headerRowClassName"
                :header-row-style="tableAttr.headerRowStyle"
                :header-cell-class-name="tableAttr.headerCellClassName"
                :header-cell-style="tableAttr.headerCellStyle"
                :row-key="tableAttr.rowKey"
                :empty-text="tableAttr.emptyText"
                :default-expand-all="tableAttr.defaultExpandAll"
                :expand-row-keys="tableAttr.expandRowKeys"
                :default-sort="tableAttr.defaultSort"
                :tooltip-effect="tableAttr.tooltipEffect"
                :show-summary="tableAttr.showSummary"
                :sum-text="tableAttr.sumText"
                :summary-method="tableAttr.summaryMethod"
                :span-method="tableAttr.spanMethod"
                @sort-change="_sortChange"
                @select="_handleEvent('select',arguments)"
                @select-all="_handleEvent('select-all',arguments)"
                @selection-change="_handleEvent('selection-change',arguments)"
                @cell-mouse-enter="_handleEvent('cell-mouse-enter',arguments)"
                @cell-mouse-leave="_handleEvent('cell-mouse-leave',arguments)"
                @cell-click="_handleEvent('cell-click',arguments)"
                @cell-dblclick="_handleEvent('cell-dblclick',arguments)"
                @row-click="_handleEvent('row-click',arguments)"
                @row-contextmenu="_handleEvent('row-contextmenu',arguments)"
                @row-dblclick="_handleEvent('row-dblclick',arguments)"
                @header-click="_handleEvent('header-click',arguments)"
                @filter-change="_handleEvent('filter-change',arguments)"
                @current-change="_handleEvent('current-change',arguments)"
                @header-dragend="_handleEvent('header-dragend',arguments)"
                @expand-change="_handleEvent('expand-change',arguments)">
                <el-table-column
                    v-for="(item,idx) in columns"
                    :key="idx"
                    v-if="!item.scopedSlot && item.colShow"
                    :prop="item.prop"
                    :label="item.label"
                    :sortable="item.sortable"
                    :width="item.width"
                    :type="item.type"
                    :index="item.index"
                    :column-key="item.columnKey"
                    :min-width="item.minWidth"
                    :fixed="item.fixed"
                    :render-header="item.renderHeader"
                    :sort-method="item.sortMethod"
                    :sort-by="item.sortBy"
                    :resizable="item.resizable == false ? false:true"
                    :formatter="item.formatter"
                    :show-overflow-tooltip="item.showOverflowTooltip == false ? false:true"
                    :align="item.align || 'left'"
                    :header-align="item.headerAlign"
                    :class-name="item.className"
                    :label-class-name="item.labelClassName"
                    :selectable="item.selectable"
                    :reserve-selection="item.reserveSelection"
                    :filters="item.filters"
                    :filter-placement="item.filterPlacement"
                    :filter-multiple="item.filterMultiple == false ? false:true"
                    :filter-method="item.filterMethod"
                    :filtered-value="item.filteredValue">
                    <template v-for="(childitem,ckey) in item.childList" v-if="item.childList.length>0">
                        <el-table-column   :prop="childitem.prop" :width="childitem.width" :label="childitem.label" :sortable="childitem.sortable"></el-table-column>
                    </template>
                </el-table-column>
                <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    :sortable="item.sortable"
                    :width="item.width"
                    :type="item.type"
                    :index="item.index"
                    :column-key="item.columnKey"
                    :min-width="item.minWidth"
                    :fixed="item.fixed"
                    :render-header="item.renderHeader"
                    :sort-method="item.sortMethod"
                    :sort-by="item.sortBy"
                    :resizable="item.resizable == false ? false:true"
                    :formatter="item.formatter"
                    :show-overflow-tooltip="item.showOverflowTooltip == false ? false:true"
                    :align="item.align || 'left'"
                    :header-align="item.headerAlign"
                    :class-name="item.className"
                    :label-class-name="item.labelClassName"
                    :selectable="item.selectable"
                    :reserve-selection="item.reserveSelection"
                    :filters="item.filters"
                    :filter-placement="item.filterPlacement"
                    :filter-multiple="item.filterMultiple == false ? false:true"
                    :filter-method="item.filterMethod"
                    :filtered-value="item.filteredValue"
                    v-else-if="item.colShow">
                    <template slot-scope="scope">
                        <slot :name="item.scopedSlot" :$index="scope.$index" :row="scope.row"></slot>
                    </template>
                    <template v-for="(childitem,ckey) in item.childList" v-if="item.childList.length>0">
                        <el-table-column   :prop="childitem.prop" :width="childitem.width" :label="childitem.label" :sortable="childitem.sortable"></el-table-column>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--表格分页-->
        <div class="cui-table-page-layout" ref="cuiTablePage">

            <el-pagination
                @size-change="_pageChange"
                @current-change="_pageCurChange"
                :small="pageConfigParam.small"
                :background="pageConfigParam.background"
                :popper-class="pageConfigParam.popperClass"
                :current-page="pageCur"
                :page-sizes="pageConfigParam.pageSizes"
                :page-size="pageConfigParam.pageSize"
                :layout="pageConfigParam.layout"
                :prev-text= "pageConfigParam.prevText"
                :next-text="pageConfigParam.nextText"
                :page-count="pageCount"
                :total="pageTotal"
                ref="cuiPagination">
                <span>
                  <span v-if="pageConfigParam.showText" ref="pageText" class="cui-page-text">第0项到0项&nbsp;&nbsp;</span>
                  <span v-if="pageTotal" ref="pageTotal" class="el-pagination__total">共{{pageTotal}}项&nbsp;&nbsp;</span>
                </span>

            </el-pagination>
        </div>
    </div>
</template>

<script>
    // import Util from '@/libs/util'
    export default {
        name: 'CuiTable',
        data(){
            return{
                elTable:'',
                tableHeight:0,
                isShowQuery:false,//展开复杂查询
                isSimpleQuery:false,//展开简单查询
                loading:false,
                data:[],//表格数据
                pageTotal:0,//总条数
                pageCount:1,//总页数
                simInput:'',//简单查询输入框
                pageCur:1,//分页组件当前页
                pageindex:0,//接口请求传参页数
                filterArrowSwitch:false,//数据设置箭头交互切换
                isShowSizes:true,//是否显示sizes
                pageConfigParam:{
                    pageSize : 10,
                    pageSizes : [10,20,30,40,50],
                    small : false,
                    background : true,
                    popperClass : null,
                    layout : 'slot,prev, pager, next',
                    showText:'从_start_项到_end_项&nbsp;&nbsp;',
                    prevText : '',
                    nextText : ''
                },
                columns:[]
            }
        },
        props: {
            tableConfigs:{
                type:Object,
                default: function(){
                    return {
                        /*url:'',
                        isShowSimQuery:false,//是否显示简单查询
                        isShowAdvQuery:false,//是否显示复杂查询
                        isSimTable:false,//是否为简单表格，没有查询和操作按钮
                        simPlaceholder:'',//简单查询输入提示
                        simSearchParam:'',//简单查询参数
                        params:{},//接口参数
                        pageParam:{//分页参数
                            small:false,
                            pageSize:10,
                            pageSizes:[10,20,30,40,50]
                        },
                        tableAttr:{},表格属性
                        columns: [  // column配置
                        {
                            prop:'numberAndPlate',
                            label:'车辆编号/车牌号',
                            sortable:'custom',
                            sortname:'license_plate',
                            width:140
                        }]*/
                   }
                }
            }
        },
        watch: {

        },
        computed: {
            tableAttr(){
                const tableAttrObj = Object.assign({}, this.tableConfigs.tableAttr); // 表格属性
                return tableAttrObj;
            },
            columnsAttr(){
                const columns = this.tableConfigs.columns || [] // 列配置
                return columns;
            }
        },
        methods: {
            _pageChange(size){
                this.loading = true;
                this.pageConfigParam.pageSize = size;
                this._renderTable();
            },
            _pageCurChange(index){
                this.loading = true;
                this.pageindex = index - 1;
                this.pageCur = index;
                this._renderTable();
            },
            _pageTotal(){
              let total = this.pageTotal;
              if(total){
               // this.$refs.pageTotal.innerHTML = "222222";
              }
          },
            _pageShowText(){
                let showText = this.pageConfigParam.showText;
                if (showText) {
                    let totalCount = this.pageTotal;
                    let pagesize = this.pageConfigParam.pageSize;
                    let pageindex = this.pageindex;

                    let first = (totalCount == 0) ? 0 : ((this.pageCur -1) * pagesize + 1);
                    let last = (totalCount < pagesize) ? totalCount: pagesize * this.pageCur;
                    last = (last > totalCount) ? totalCount: last;
                    showText = showText.replace(new RegExp("_start_", "gm"), first)
                        .replace(new RegExp("_start_", "gm"), first)
                        .replace(new RegExp("_end_", "gm"), last)
                        .replace(new RegExp("_pageindex_", "gm"), totalCount != 0 ? pageindex : 0)
                        .replace(new RegExp("_pagesize_", "gm"), pagesize)
                        .replace(new RegExp("_totalPages_", "gm"), this.pageCount)
                        .replace(new RegExp("_total_", "gm"), totalCount);
                        this.$refs.pageText.innerHTML = showText;

                }
            },
            _showAdvancedQuery(){//显示高级查询
                this.isSimpleQuery = !this.isSimpleQuery;
                this.isShowQuery = !this.isShowQuery;
                let that = this;
                setTimeout(function(){
                    that.setHeight();
                }, 500)
            },
            _showSimpleQuery(){//显示简单查询
                this.isSimpleQuery = !this.isSimpleQuery;
                this.isShowQuery = !this.isShowQuery;
                let that = this;
                setTimeout(function(){
                    that.setHeight();
                }, 500)
            },
            _simQueryFn(){
                this.pageindex = 0;
                this.loading = true;
                this._renderTable();
            },
            _sortChange(param){
                let sortOrder = {
                    'ascending':'asc',
                    'descending':'desc'
                }
                let columnsAttr = this.columnsAttr;
                let sortname = '';
                for(let i=0;i<columnsAttr.length;i++){
                    if(columnsAttr[i].prop == param.prop){
                        sortname = columnsAttr[i].sortname || param.prop;
                    }

                }
                this.tableConfigs.params.sortname = sortname;
                this.tableConfigs.params.sortorder = sortOrder[param.order];
                this._renderTable()
            },
            _handleEvent (action,param) {
                this.$emit(action, param);
            },
            _renderTable(){
                let params = this.tableConfigs.params || {};
                Object.assign(this.pageConfigParam,this.tableConfigs.pageParam);
                params.pagesize = this.pageConfigParam.pageSize;
                params.pageindex = this.pageindex;
                if(this.tableConfigs.isShowSimQuery){
                    params[this.tableConfigs.simSearchParam] = this.simInput;
                }
                /*Util.ajax.get(this.tableConfigs.url,{params:params}).then((res) => {
                    this.data = res.data.items;
                    this.loading = false;
                    this.pageCount = res.data.totalPages;
                    this.pageTotal = res.data.totalCount;
                    this.pageindex = res.data.page-1;
                    /!*this.pageCur = res.data.page + 1;*!/
                    this._pageShowText();
                   this._pageTotal();
                });*/
            },
/*            cuiTableFull(){
                let wrapH = this.$refs.cuiTableLayout.offsetHeight;
                let queryH = this.$refs.cuiTableQuery.offsetHeight;
                let btnH = this.$refs.cuiTableBtn.offsetHeight;
                let pageH = this.$refs.cuiTablePage.offsetHeight;
                this.tableAttr.height = wrapH - queryH - btnH - pageH
            },*/
            cuiTableReload(){
                this.pageindex = 0;
                this.pageCur = 1;
                this.loading = true;
                this._renderTable();
            },
            cuiTableCurPageReload(){
                this.loading = true;
                this._renderTable();
             },
            clearSelection(selection){
                this.$refs.cuiTable.clearSelection(selection);
            },
            toggleRowSelection(row,selected){
                this.$refs.cuiTable.toggleRowSelection(row,selected);
            },
            toggleRowExpansion(row,expanded){
                this.$refs.cuiTable.toggleRowExpansion(row,expanded);
            },
            setCurrentRow(row){
                this.$refs.cuiTable.setCurrentRow(row);
            },
            clearSort(){
                this.$refs.cuiTable.clearSort();
            },
            clearFilter(){
                this.$refs.cuiTable.clearFilter();
            },
            doLayout(){
                this.$refs.cuiTable.doLayout();
            },
            columnsFilter () {
                this.filterArrowSwitch = !this.filterArrowSwitch;
            },
            setHeight () {
                let conHei = this.$refs.cuiTableLayout.offsetHeight || 0;
                let query = this.$refs.cuiTableQuery && this.$refs.cuiTableQuery.offsetHeight;
                let button = this.$refs.cuiTableBtn && this.$refs.cuiTableBtn.offsetHeight;
                let page = this.$refs.cuiTablePage.offsetHeight;
                this.elTable = 'calc(100% - ' + (query + button + page) +'px)';
                this.tableHeight = conHei - (query + button + page);
            }
        },
        mounted() {
            let self=this;
            this.$nextTick(()=>{
                self.setHeight();
            })
            window.onresize = () =>{
                self.setHeight();
            }
            if(this.pageConfigParam.layout.indexOf('sizes') != -1){
                let sizeTextNode = document.createElement('span');
                let pageNode = this.$refs.cuiPagination.$el;
                let pageChildNodes = this.$refs.cuiPagination.$el.childNodes || [];
                sizeTextNode.innerHTML = '显示行数';
                sizeTextNode.className = 'el-pagination_text';
                for(let i=0;i<pageChildNodes.length;i++){
                    if(pageChildNodes[i].className == "el-pagination__sizes"){
                        pageNode.insertBefore(sizeTextNode,pageChildNodes[i])
                        return;
                    }
                }
                this.isShowSizes = true;
            }else{
                this.isShowSizes = false;
            }

            //this.cuiTableFull();
        },
        created () {
            this.columns = this.tableConfigs.columns || [];
            if(this.tableConfigs.isSimTable){
                this.tableConfigs.isShowOptArea = false;
                this.tableConfigs.isShowSimQuery = false;
                this.tableConfigs.isShowAdvQuery = false;
            }
            //this._renderTable()
        }
    };
</script>
<style lang="scss">
@import "../../assets/theme/element-variables.scss";
.content-wraper{
  background: white;
}
.el-table.cui-table-list-layout thead th{
  background: #f5f6f7;
  height: 50px;
}
.cui-table-layout{
    height: 100%;
    position:relative;
    background: white;
}
.cui-table-query-layout{
    position:relative;
    border-width:1px 1px 0;
    border-color:$--border-color-lighter;
    border-style:solid;
    background-color:#f5f7fa;
    .table-page-wrap{
        position:absolute;
        width:100%;
        left:0px;
        bottom:0px;
        z-index:10;
    }
}
.el-table.cui-table-list-layout{
    color:$--font-color-default;
    font-size:12px;
    thead{
        color:$--font-color-light;
    }
    thead th,
    tbody td{
        height:$--table-tbody-tr-th-height;
        padding:5px 0;
        font-size:$--table-tbody-tr-td-font
    }
    thead th{
        font-weight:$--table-tbody-tr-th-fontwight;
        font-size:$--table-tbody-tr-th-font;
        color:$--table-tbody-tr-th-color;

    }
    .sort-caret.descending{
        bottom: 0px;
    }
    .sort-caret.ascending{
        top: -2px;
    }
    .caret-wrapper{
        height: 20px;
        width: 16px;
    }
    .cell{
        line-height: 21px;
    }
}
.cui-table-simple-query{
    border-bottom:1px $--border-color-lighter solid;
    position:relative;
    padding:10px;
    .el-input{
        width:360px;
    }
}
.cui-table-advanced-query{
    border-bottom:1px $--border-color-lighter solid;
    padding:10px 10px 0px;
    position:relative;
    .el-input,
    .el-select,
    .el-date-editor.el-input{
        width:auto;
        display:block;
    }
}
.el-table--border td:not(:last-child){
    border-right-color:transparent;
}
.advanced-query-switch,.simple-query-switch{
    position:absolute;
    top:10px;
    right:10px;
    line-height:30px;
    z-index:11;
}
.el-button{
    .el-icons{
        margin-left:5px;
    }
    .el-icon-arrow-down{
        -webkit-transition: -webkit-transform .3s;
        transition: -webkit-transform .3s;
        transition: transform .3s;
        transition: transform .3s,-webkit-transform .3s;
        -webkit-transform: rotateZ(0deg);
        transform: rotateZ(0deg);
        /* &.open{
            -webkit-transform: rotateZ(180deg);
            transform: rotateZ(180deg);
        } */
    }
}
.cui-table-button-layout{
    border-width: 0px 1px;
    border-style:solid;
    border-color:$--border-color-lighter;
    background-color:#ffffff;
    padding:10px;
}
.table-handle {
    float: left;
}
.table-filter {
    float: right;
    margin-top: 6px;
}
.el-pagination{
    font-weight: normal;
    padding:10px;
    button{
        border-radius: 2px;
        border:1px $--border-color-base solid;
        font-size:12px;
        padding:0 10px;
        text-align: center;
        &.disabled{
            border-color:$--button-disabled-border;
        }
    }
    .btn-prev{
        margin-right:5px;
    }
    span:not([class*=suffix]){
        font-size:12px;
        min-width: auto;
    }
    span.cui-page-text:after{
        content: '';
    }
    .el-select{
        .el-input{
            width: 80px;
            margin:0;
            .el-input__inner{
                border-radius:$--border-radius-base;
            }
        }
        .el-input__suffix{
            right: 5px;
            transform: scale(1);
        }
    }
    .el-pagination_text{
        margin-right: 5px;
    }
}
.el-pagination__jump{
    color: $--font-color-lighter;
    margin-left:10px;
}
.el-pagination__editor{
    margin:0 5px;
    &.el-input{
        width: 60px;
        vertical-align: top;
        .el-input__inner{
            border-radius: 2px;
        }
    }
}
.el-pagination__sizes{
    margin-right: 5px;
    .el-input .el-input__inner{
        font-size:12px;
    }
}

/*分页样式调整*/
.el-pager li{/*分页边框颜色*/
  border: 1px solid #e4eaec;
  border-left: 0px solid #e4eaec;
  height:28px;
  line-height: 26px;
  font-size: 14px;
}
.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
  margin: 0px;
  background: #fff;
}
.el-pagination button{
  border: 1px solid #e4eaec!important;
  background: #fff;
  height: 28px;
}
.el-pagination .btn-next{
  border-left: 0px solid #e4eaec!important;
}
.el-pagination.is-background .el-pager li:not(.disabled).active{
  border: 0px solid #fff!important;
}
.el-table-scrollbar_view {
    height: 300px;
}
.cui-table-page-layout {
    position: absolute;
    /*bottom: -20px;*/
    width: 100%;
    z-index: 3;
    text-align: right;
    background-color:#f1f4f5;
}
</style>

