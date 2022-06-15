<template>
    <div class="i-main">
        <!-- 标题 -->
        <div class="i-main-title"><h2>信息展示</h2></div>
        <div class="clear"></div>
        <hr style="width:100%;height:1px;margin-top:16px;border:none;background-color:#E0E0E0;">
    </div>
</template>
<script>
    export default {
    }
</script>

<style>
    .i-main {
        width: 100%;
        height: 28px;
        min-width: 1200px;
        z-index: 999;
        position: fixed;
        background-color: #FFFFFF;
    }
    .i-main-title {
        width: 358px;
        margin-top: 8px;
        margin-left: 86px;
        float: left;
        font-family: 楷体, sans-serif;
    }
    .i-main-logo>img {
        width: 180px;
        height: 56px;
        margin: 3px 28px;
    }
    .el-input-group__prepend>input {
        width: 200px;
    }
    .el-input>input {
        width: 100px;
    }
    .i-main-search>div>div>input {
        width: 218px;
    }
    .clear{
        clear:both;
        height: 0;
        line-height: 0;
        font-size: 0
    }
</style>
