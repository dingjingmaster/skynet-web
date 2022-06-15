<template>
    <div id="main-app">
        <MainHeader></MainHeader>
        <MainMenu></MainMenu>
        <MainMain></MainMain>
        <MainFooter></MainFooter>
        <div style="clear: both;height: 0;"></div>
        <div style="width:100%; height: 320px;"></div>
    </div>
</template>

<script>
    import MainMain from '@@/components/MainMain'
    import MainMenu from '@@/components/MainMenu'
    import MainHeader from '@@/components/MainHeader'
    import MainFooter from '@@/components/MainFooter'
    export default {
        name: 'App',
        components: {
            MainMain,
            MainMenu,
            MainHeader,
            MainFooter
        }
    }
</script>

<style>
    #main-app {
        width: 100%;
        height: 100%;
        min-width: 1200px;
        font-family: Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
</style>
