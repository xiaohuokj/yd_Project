<template>
    <div class="selectactive">
        <span class="selectText">选择牛场&nbsp</span>
        <el-select v-model="value" placeholder="请选择" @change="selectchange">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>
<script>
    import {cattlefarmName} from '@/libs/api'
    import {getCookie} from '@/libs/cookieFun'
    import {setCookie} from '@/libs/cookieFun'
    import bus from '@/libs/bus'
    export default {
        data() {
            return {
                options: [],
                value: '请选择'
            }
        },
        mounted() {
            // localStorage.setItem("cattlefarm_Id", this.value)
            /*AMap.plugin('AMap.Weather', function() {
                //创建天气查询实例
                var weather = new AMap.Weather();

                //执行实时天气信息查询
                weather.getForecast('北京市', function(err, data) {
                    console.log(err, data);
                });
            });*/

            this.cattlefarmNameFun()
        },
        computed: {
            /*cattlefarm_Fun() {
                return this.$store.state.cattlefarm_Id
            },
            ...mapState(['cattlefarm_Id']) // 全局牛场id*/
        },
        methods: {
            cattlefarmNameFun() {
                let _self = this
                this.$get(cattlefarmName, {token: getCookie('token')}).then((res) => {
                    if (res.code === 200) {
                        if (res.data.length > 0) {
                            let cattlefarmList = []
                            for (var i in res.data) {
                                cattlefarmList.push({'value':res.data[i].cattlefarmId, 'label': res.data[i].cattlefarmName})
                            }
                            this.options = cattlefarmList
                            if (localStorage.getItem('cattlefarm_Id')) {
                                _self.value = localStorage.getItem('cattlefarm_Id')
                                bus.$emit("cattlefarm_Id", localStorage.getItem('cattlefarm_Id'))
                                return;
                            }
                            _self.value = cattlefarmList[0].value // 设置初始化默认选择数据第一个作为默认
                            localStorage.setItem("cattlefarm_Id", cattlefarmList[0].value)
                            bus.$emit("cattlefarm_Id", cattlefarmList[0].value)
                        }
                    }
                }).catch((err=> {}))
            },
            selectchange(val) {
                localStorage.setItem("cattlefarm_Id", val)
                bus.$emit("cattlefarm_Id", val)
            }
        }
    }
</script>

<style scoped lang="scss">
    .selectactive /deep/ .el-select {
        width: 150px;
    }

    .selectactive /deep/ .el-input__inner {
        background-color: #0A3A78;
        font-size: 12px;
        color: #FFFFFF;
        border: 1px solid #67ACFF;
    }

    .selectactive {
        position: absolute;
        top: 42px;
        left: 22px;
        z-index: 10;
        .selectText {
            font-size: 14px;
            color: #FFFFFF;
        }
    }
	.selectactive /deep/ .popper__arrow {
    top: -6px;
    left: 50%;
    margin-right: 3px;
    border-top-width: 0;
    border-bottom-color:red !important;
}

</style>
