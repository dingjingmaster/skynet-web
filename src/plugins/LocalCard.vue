<template>
    <div id="i-l-card">
        <el-card shadow="hover">
            <div id="i-l-card-header">
                <el-row>
                    <el-col :span="15"><span>{{ price }}</span></el-col>
                    <el-col :span="9">
                        <el-row>
                            <el-col :span="12"><small>{{ name }}:</small></el-col>
                            <el-col :span="12"><small>{{ unit }}</small></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12"><small>更新时间:</small></el-col>
                            <el-col :span="12"><small>{{ uTime }}</small></el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
            <el-table v-bind:data=detail style="width: 100%">
                <el-table-column prop="date" label="时间"/>
                <el-table-column prop="average_price" label="均价"/>
                <el-table-column prop="unit" label="单位"/>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "LocalCard",
        props: {
            name: String,
            unit: String,
            uTime: String,
            price: String,
            detail: Array
        },
    }
</script>

<style>
    #i-l-card {
        height: 245px;
    }
    #i-l-card>.el-card>.el-table>.el-table-column {
        font-size: 1px;
    }
    .el-card {
        height: 240px;
        min-width: 360px;
        max-width: 380px;
    }
    #i-l-card-header>.el-row>.el-col>span {
        font-size: 39px;
        font-weight: bold;
        vertical-align: bottom;
    }
    #i-l-card-header>.el-row>.el-col>.el-row>.el-col>small {
        white-space:nowrap;
        vertical-align: bottom;
        horiz-align: center;
    }
</style>