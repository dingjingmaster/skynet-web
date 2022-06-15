<template>
    <div id="main-index">
        <el-row :gutter="12">
            <el-col :span="6">
                <el-card shadow="hover">

                        <div class="card-header">
                            <el-row>
                                <el-col :span="8"><span>1300</span></el-col>
                                <el-col :span="16">
                                    <el-row>
                                        <el-col :span="8"><small>金(Au)</small><br/><small> RMB/kg</small></el-col>
                                        <el-col :span="16"><small> 更新时间:</small><br/><small>2022-06-10 17:20:31</small></el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </div>

                        <el-table :data="tableData" style="width: 100%">
                            <el-table-column prop="date" label="Date"/>
                            <el-table-column prop="name" label="Name"/>
                            <el-table-column prop="address" label="Address"/>
                        </el-table>

                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    const tableData = [
        {
            date: '2016-05-03',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-04',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-01',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
    ];
    export default {
        name: "MainIndex.vue"
    }
</script>

<style>
    .el-card {
        height: 200px;
    }
    .card-header>.el-row>.el-col>span {
        font-size: 39px;
        font-weight: bold;
        vertical-align: bottom;
    }
    .card-header>.el-row>.el-col>.el-row>.el-col small {
        white-space:nowrap;
        vertical-align: bottom;
        horiz-align: center;
    }
</style>