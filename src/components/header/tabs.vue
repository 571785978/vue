<template>
    <div class="grid-content bg-purple">
        <el-menu
            class="el-menu-demo"
            mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu index="1">
                <template slot="title">地图</template>
                <el-menu-item index="1-1" @click="addTab('百度地图','baiduMap','baidu')" >百度地图</el-menu-item>
                <el-menu-item index="1-2" @click="addTab('高德地图','gaodeMap','gaode')" >高德地图</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>
<style scoped>

</style>
<script>
export default {
    name:"tabs",
    methods:{
        addTab:function(title,name,routerName){
            this.$emit('addTab',title,name,routerName);
        }
    }
}
</script>
