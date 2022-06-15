<template>
    <div id="main-index">
        <el-row :gutter="12">
            <el-col :span="6">
                <MyCard v-bind:price="price"
                        v-bind:name="name"
                        v-bind:unit="unit"
                        v-bind:uTime="uTime"
                        v-bind:detail="detail">
                </MyCard>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import MyCard from '@@/../plugins/LocalCard'

    export default {
        name: "MainIndex.vue",
        data: function () {
            return {
                name: "金(Au)",
                price: "1800",
                unit: "RMB/kg",
                uTime: "2022-06-10 17:20:31",
                detail: [
                    {
                        area: '中国',
                        price: '1000',
                        unit: 'RMB/kg',
                    },
                    {
                        area: '美国',
                        price: '2000',
                        unit: 'RMB/Kg',
                    },
                    {
                        area: '伦敦',
                        price: '3000',
                        unit: 'RMB/kg',
                    },
                ]
            }
        },
        components: {
            MyCard
        }
    }
</script>

<style>

</style>