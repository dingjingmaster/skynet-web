<template>
    <div id="i-l-line-chart">
        <el-card shadow="hover">
            <div id="i-l-line-chart-header">
                <h1 v-if="name.length > 0">{{ name }}</h1><br/>
                <div class="i-l-line-chart-form">
                    <el-form ref="form" :model="form" label-width="76px">
                        <!-- 区域 -->
                        <el-form-item v-if="area.length > 0" style="margin-bottom:3px;" label="区域">
                            <el-checkbox-group v-model="form.area">
                                <el-checkbox
                                        style="width:66px;margin:0;padding:0;"
                                        v-for="item in area"
                                        :key="item.label"
                                        :label="item.label">
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>

                        <!-- 类型 -->
                        <el-form-item v-if="types.length > 0" style="margin-bottom:3px;" label="类型">
                            <el-checkbox-group v-model="form.types">
                                <el-checkbox
                                    style="width:66px;margin:0;padding:0;"
                                    v-for="item in types"
                                    :key="item.label"
                                    :label="item.label">
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>

                        <!-- 时间段 -->
                        <el-form-item v-if="dateRange.length > 0" label="选择时间" style="width:670px;">
                            <el-date-picker
                                    v-model="form.dateRange"
                                    type="daterange"
                                    align="right"
                                    unlink-panels
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :default-value="[new Date(2003, 1, 1), new Date()]"
                                    :picker-options="time_range_option">
                            </el-date-picker>
                        </el-form-item>

                        <!-- 重置与查询按钮 -->
                        <el-form-item v-if="(on_submit != null) || (on_init != null)">
                            <el-button v-if="(on_submit != null)" type="primary" @click="on_submit">查询</el-button>
                            <el-button v-if="(on_init != null)" @click="on_init">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div id="i-l-line-chart-content"></div>
        </el-card>
    </div>
</template>

<script>
    import {Notify} from "vant";
    import Highcharts from 'highcharts';
    require('highcharts/modules/exporting')(Highcharts);

    export default {
        functional : true,
        name: "LineChart",
        props: {
            name: String,
            types: Array,
            area: Array,
            dateRange: Array,
            on_submit: Function,
            on_init: Function,
            form: Object                    // line
        },
        data: function () {
            // return {
            //     form: {
            //         types: ['金'],
            //         area: ['中国'],
            //         dateRange: [new Date(2003, 1, 1), new Date()],
            //     },
            //     types: [
            //         {label: '金', value: 'Au'},
            //         {label: '银', value: 'Ag'}
            //     ],
            //     area: [
            //         {label: '中国', value: 'CN'},
            //         {label: '英国伦敦', value: 'UK'}
            //     ],
            //     time_range_option: {
            //         shortcuts: [{
            //             text: '最近一周',
            //             onClick(picker) {
            //                 const end = new Date();
            //                 end.setTime(end.getTime() - 3600 * 1000 * 24 * 2);
            //                 const start = new Date();
            //                 start.setTime(start.getTime() - 3600 * 1000 * 24 * 9);
            //                 picker.$emit('pick', [start, end]);
            //             }}, {
            //             text: '最近一个月',
            //             onClick(picker) {
            //                 const end = new Date();
            //                 end.setTime(end.getTime() - 3600 * 1000 * 24 * 2);
            //                 const start = new Date();
            //                 start.setTime(start.getTime() - 3600 * 1000 * 24 * 32);
            //                 picker.$emit('pick', [start, end]);
            //             }}, {
            //             text: '最近三个月',
            //             onClick(picker) {
            //                 const end = new Date();
            //                 end.setTime(end.getTime() - 3600 * 1000 * 24 * 2);
            //                 const start = new Date();
            //                 start.setTime(start.getTime() - 3600 * 1000 * 24 * 92);
            //                 picker.$emit('pick', [start, end]);
            //             }}, {
            //             text: '最近一年',
            //             onClick(picker) {
            //                 const end = new Date();
            //                 end.setTime(end.getTime() - 3600 * 1000 * 24 * 2);
            //                 const start = new Date();
            //                 start.setTime(start.getTime() - 3600 * 1000 * 24 * 368);
            //                 picker.$emit('pick', [start, end]);
            //             }
            //         }, {
            //             text: '最近两年',
            //             onClick(picker) {
            //                 const end = new Date();
            //                 end.setTime(end.getTime() - 3600 * 1000 * 24 * 2);
            //                 const start = new Date();
            //                 start.setTime(start.getTime() - 3600 * 1000 * 24 * 733);
            //                 picker.$emit('pick', [start, end]);
            //             }
            //         }]
            //     },
            // }
        },
        methods: {
            init() {
                console.info("message");
            },
            // init() {
            //     this.form.area = ['中国'];
            //     this.form.types = ['金'];
            //     this.form.dateRange = [new Date(2003, 1, 1), new Date()];
            // },
            // on_submit() {
            //     const request = {};
            //     if (this.form.types.length === 0) { this.$alert("!检查'类型'字段是否选中", '提示', {confirmButtonText: '确定'}); return;}
            //     if (this.form.area.length === 0) { this.$alert("!检查'地区'字段是否选中", '提示', {confirmButtonText: '确定'}); return;}
            //     if (this.form.dateRange.length !== 2) { this.$alert("!检查是否选择查询时间段", '提示', {confirmButtonText: '确定'}); return;}
            //
            //     // 查询时间段
            //     var startTimeDate = this.dateToString(this.form.dateRange[0]);
            //     var stopTimeDate = this.dateToString(this.form.dateRange[1]);
            //     var startTime = startTimeDate > stopTimeDate ? stopTimeDate : startTimeDate;
            //     var stopTime = startTimeDate > stopTimeDate ? startTimeDate : stopTimeDate;
            //     request['timerange'] = [startTime, stopTime];
            //
            //     // 类型
            //     var types = [];
            //     for (var i in this.form.types) {
            //         if (this.form.types.hasOwnProperty(i)) {
            //             var ii = this.form.types[i];
            //             for (var j in this.types) {
            //                 if (this.types.hasOwnProperty(j)) {
            //                     var jj = this.types[j];
            //                     if (ii === jj['label']) {
            //                         types.push(jj['value']);
            //                         break;
            //                     }
            //                 }
            //             }
            //         }
            //     }
            //
            //     // 区域
            //     var areas = [];
            //     for (var i in this.form.area) {
            //         if (this.form.area.hasOwnProperty(i)) {
            //             var ii = this.form.area[i];
            //             for (var j in this.area) {
            //                 if (this.area.hasOwnProperty(j)) {
            //                     var jj = this.area[j];
            //                     if (ii === jj['label']) {
            //                         areas.push(jj['value']);
            //                         break;
            //                     }
            //                 }
            //             }
            //         }
            //     }
            //
            //     request['area'] = areas;
            //     request['type'] = types;
            //
            //     //console.log(request);
            //
            //     axios ({
            //         url: '/'
            //     });
            //
            // },
            //
            // dateToString(date) {
            //     var year = date.getFullYear();
            //     var month = (date.getMonth() + 1).toString();
            //     var day = (date.getDate()).toString();
            //
            //     if (month.length === 1) {
            //         month = "0" + month;
            //     }
            //
            //     if (day.length === 1) {
            //         day = "0" + day;
            //     }
            //
            //     return "" + year + month + day;
            // },
            draw_line() {
                var obj;
                obj ['Lines'] = {
                    'Introduction' : 'name1',
                    'Y' : [

                    ]
                };

                console.info("draw lines");

                const lines = obj['Lines'];
                const y = [];
                for (let i = 0; i < lines.length; ++i) {
                    const info = lines[i];
                    const tmp = {};
                    tmp['name'] = info['Introduction'];
                    tmp['data'] = info['Y'];
                    y.push(tmp)
                }

                Highcharts.chart('read-event-show', {
                    chart: {
                        type: 'line'
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: '书籍阅读相关统计'
                    },
                    xAxis: {
                        categories: lines[0]['X']
                    },
                    yAxis: {
                        title: {
                            text: '数量查询'
                        }
                    },
                    series: y,
                    plotOptions: {
                        line: {
                            cursor: 'pointer'
                        },
                        series: {
                            allowPointSelect: true
                        }
                    },
                    exporting: {
                        filename: '线上订展比相关统计'
                    },
                    navigation: {
                        buttonOptions: {
                            align: 'right'
                        }
                    }
                })
            }
        }
    }
</script>

<style>
    #i-l-line-chart {
        height: calc(80vh + 68px);
    }
    #i-l-line-chart-header {
        font-size: 9px;
        text-align: center;
    }
    #i-l-line-chart-content {
        height: calc(80vh - 30px);
        min-width: 360px;
        max-width: 380px;
    }
</style>