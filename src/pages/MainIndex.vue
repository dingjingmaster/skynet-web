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
        </el-row>
    </div>
</template>

<script>
    import axios from 'axios'
    import MyCard from '@@/../plugins/LocalCard'
    import {Notify} from "vant";

    export default {
        name: "MainIndex.vue",
        data: function () {
            return {
                auName: "金(Au)",
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
                agName: "银(Ag)",
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
                ]
            }
        },
        components: {
            MyCard
        },
        methods : {
            init () {
                this.get_au_price_index();
                this.get_ag_price_index();
            },
            get_au_price_index () {
                const pThis = this;
                axios ({
                    url: '/index/au-price',
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    }
                }).then (function (response) {
                    const obj = response.data;
                    console.log(obj);
                    // Au
                    if (200 === response.status) {
                        pThis.auPrice = obj['price'].toFixed(3);
                        pThis.auUTime = obj['uTime'];
                        pThis.auDetail = [
                            {
                                date: '近3天',
                                average_price: obj['d3'].toFixed(3),
                                unit: 'RMB/g',
                            },
                            {
                                date: '近7天',
                                average_price: obj['d7'].toFixed(3),
                                unit: 'RMB/g',
                            },
                            {
                                date: '近30天',
                                average_price: obj['d30'].toFixed(3),
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
                    url: '/index/ag-price',
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    }
                }).then (function (response) {
                    // Ag
                    const obj = response.data;
                    if (200 === response.status) {
                        pThis.agPrice = obj['price'].toFixed(3);
                        pThis.agUTime = obj['uTime'];
                        pThis.agDetail = [
                            {
                                date: '近3天',
                                average_price: obj['d3'].toFixed(3),
                                unit: 'RMB/g',
                            },
                            {
                                date: '近7天',
                                average_price: obj['d7'].toFixed(3),
                                unit: 'RMB/g',
                            },
                            {
                                date: '近30天',
                                average_price: obj['d30'].toFixed(3),
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
        },
        created() {
        },
        mounted() {
            this.init();
        }
    }
</script>

<style>

</style>