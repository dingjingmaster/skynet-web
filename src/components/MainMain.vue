<template>
    <div class="i-main-content" ref="mainMain"><router-view></router-view></div>
</template>

<script>
    export default {
        name: 'MainMain'
    }
</script>

<style>
    .i-main-content {
        min-width: 1200px;
        width: calc(100% - 108px);
        padding-bottom: 108px;
        top: 66px;
        left: 80px;
        z-index: 996;
        float: left;
        position: absolute;
    }
</style>
