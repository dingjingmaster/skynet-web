<template>
    <div id="main-index">
        <el-row :gutter="12">
            <el-col :span="6">
                <MyCard v-bind:price="auPrice"
                        v-bind:name="auName"
                        v-bind:unit="auUnit"
                        v-bind:uTime="auUTime"
                        v-bind:detail="auDetail">
                </MyCard>
            </el-col>
            <el-col :span="6">
                <MyCard v-bind:price="agPrice"
                        v-bind:name="agName"
                        v-bind:unit="agUnit"
                        v-bind:uTime="agUTime"
                        v-bind:detail="agDetail">
                </MyCard>
            </el-col>
            <el-col :span="6">
                <MyCard v-bind:price="auPrice"
                        v-bind:name="auName"
                        v-bind:unit="auUnit"
                        v-bind:uTime="auUTime"
                        v-bind:detail="auDetail">
                </MyCard>
            </el-col>
            <el-col :span="6">
                <MyCard v-bind:price="agPrice"
                        v-bind:name="agName"
                        v-bind:unit="agUnit"
                        v-bind:uTime="agUTime"
                        v-bind:detail="agDetail">
                </MyCard>
            </el-col>
        </el-row>
        <el-row :gutter="6">
            <el-col :span="24">
                <LineChart ref="lineChartRef"
                           v-bind:form=lineChartForm
                           v-bind:name=lineChartName
                           v-bind:area=lineChartArea
                           v-bind:types=lineChartTypes
                           v-bind:date-range=lineChartDateRange
                           v-bind:on_submit=line_chart_submit
                           v-bind:on_init=line_chart_init
                >
                </LineChart>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from 'axios'
    import {Notify} from "vant";
    import MyCard from '@@/../plugins/LocalCard'
    import LineChart from "../plugins/LineChart";
    import { getCurrentInstance, onMounted } from '@vue/runtime-core'

    export default {
        name: "MainIndex.vue",
        components: {
            LineChart,
            MyCard
        },
        data: function () {
            return {
                auName: "中国金",
                auPrice: "0",
                auUnit: "RMB/g",
                auUTime: "2022-06-10 17:20:31",
                auDetail: [
                    {
                        date: '近3天',
                        average_price: '0',
                        unit: 'RMB/g',
                    },
                    {
                        date: '近7天',
                        average_price: '0',
                        unit: 'RMB/g',
                    },
                    {
                        date: '近1月',
                        average_price: '0',
                        unit: 'RMB/g',
                    },
                ],
                agName: "中国银",
                agPrice: "0",
                agUnit: "RMB/g",
                agUTime: "2022-06-10 17:20:31",
                agDetail: [
                    {
                        date: '近3天',
                        average_price: '0',
                        unit: 'RMB/g',
                    },
                    {
                        date: '近7天',
                        average_price: '0',
                        unit: 'RMB/g',
                    },
                    {
                        date: '近1月',
                        average_price: '0',
                        unit: 'RMB/g',
                    },
                ],
                // 以上都是 MyCard


                lineChartName: "贵金属历史价格查询",
                lineChartForm: {},
                lineChartArea: [
                    {label: '中国', value: 'CN'},
                    {label: '英国伦敦', value: 'UK'}
                    ],
                lineChartTypes: [
                    {label: '金', value: 'Au'},
                    {label: '银', value: 'Ag'}
                    ],
                lineChartDateRange: [
                    new Date(),
                ],
                // form : {},
            }
        },
        methods : {
            init () {
                console.info("message");
                this.get_au_price_index();
                this.get_ag_price_index();

                getCurrentInstance()
                // this.$refs.lineChartComponents.draw_line();

                // debug
                //this.line_chart_submit();
            },
            get_au_price_index () {
                const pThis = this;
                axios ({
                    url: '/index/au-price/CN',
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    }
                }).then (function (response) {
                    const obj = response.data;
                    console.log(obj);
                    // Au
                    if (200 === response.status) {
                        pThis.auPrice = obj['price'].toFixed(3).toString();
                        pThis.auUTime = obj['uTime'].toString();
                        pThis.auDetail = [
                            {
                                date: '近3天',
                                average_price: obj['d3'].toFixed(3).toString(),
                                unit: 'RMB/g',
                            },
                            {
                                date: '近7天',
                                average_price: obj['d7'].toFixed(3).toString(),
                                unit: 'RMB/g',
                            },
                            {
                                date: '近30天',
                                average_price: obj['d30'].toFixed(3).toString(),
                                unit: 'RMB/g',
                            }
                        ]
                    }
                }).catch(function (error) {
                    Notify({
                        type: 'warning',
                        message: error
                    });
                    console.log(error)
                })
            },
            get_ag_price_index () {
                const pThis = this;
                axios ({
                    url: '/index/ag-price/CN',
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    }
                }).then (function (response) {
                    // Ag
                    const obj = response.data;
                    if (200 === response.status) {
                        pThis.agPrice = obj['price'].toFixed(3).toString();
                        pThis.agUTime = obj['uTime'].toString();
                        pThis.agDetail = [
                            {
                                date: '近3天',
                                average_price: obj['d3'].toFixed(3).toString(),
                                unit: 'RMB/g',
                            },
                            {
                                date: '近7天',
                                average_price: obj['d7'].toFixed(3).toString(),
                                unit: 'RMB/g',
                            },
                            {
                                date: '近30天',
                                average_price: obj['d30'].toFixed(3).toString(),
                                unit: 'RMB/g',
                            }
                        ];
                    }
                }).catch(function (error) {
                    Notify({
                        type: 'warning',
                        message: error
                    });
                    console.log(error)
                })
            },

            // lineCard
            line_chart_submit () {

            },
            line_chart_init () {
            },

        },
        created() {
        },
        mounted() {
            this.init();
        }
    }
</script>

<style>
    #main-index>.el-row {
        padding: 8px 0 8px 0;
    }

</style>