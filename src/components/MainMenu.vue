<template>
    <el-menu id="i-main-menu"
             default-active="1"
             @select="selected_child"
             :collapse="isCollapse" >
        <!-- 导航1 -- 开始 -->
        <el-menu-item index="1">
            <el-icon><Menu /></el-icon>
            <template #title>菜单</template>
        </el-menu-item>
        <!-- 导航1 -- 结束 -->

        <el-menu-item index="2">
            <el-icon><Money /></el-icon>
            <template #title>贵金属</template>
        </el-menu-item>

    </el-menu>
</template>

<style>
    #i-main-menu {
        width: 60px;
        height: 100vh;
        top: 52px;
        left:0;
        z-index: 998;
        position: fixed;
    }
    #i-main-menu:not(.el-menu--collapse) {
        width: 260px;
        height: 100vh;
    }
</style>

<script>
    import {Menu, Money} from '@element-plus/icons-vue'
    export default {
        data: function () {
            return {
                isCollapse: true
            }
        },
        methods: {
            selected_child (index, indexPath) {
                if (index === '1') {
                    // 第一个 —— 菜单按钮
                    this.isCollapse = !(this.isCollapse)
                } else {
                    if (this.isCollapse === false) {
                        this.isCollapse = !(this.isCollapse)
                    }
                }
            }
        },
        components: {
            Menu,
            Money
        }
    }
</script>
