<template>
    <div class="sidebar">
        <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#0B233D" text-color="#fff" active-text-color="#ffd04b">
            <router-link :to="{path:'home'}">
                <el-menu-item index="1">
                    <span slot="title">首页</span>
                </el-menu-item>
            </router-link>
            <el-submenu index="2">
                <template slot="title">
                    <span>管理员管理</span>
                </template>
                <router-link :to="{path:'manage_list'}">
                    <el-menu-item index="2-1">管理员列表</el-menu-item>
                </router-link>
                <router-link :to="{path:'manage_add'}">
                <el-menu-item index="2-2">添加管理员</el-menu-item></router-link>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <span>新闻管理</span>
                </template>
                <router-link :to="{path:'news_list'}">
                    <el-menu-item index="3-1">新闻列表</el-menu-item>
                </router-link>
                <router-link :to="{path:'news_add'}">
                <el-menu-item index="3-2">添加新闻</el-menu-item></router-link>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <span>轮播图管理</span>
                </template>
                <router-link :to="{path:'swiper_list'}">
                    <el-menu-item index="4-1">轮播图列表</el-menu-item>
                </router-link>
                <router-link :to="{path:'swiper_add'}">
                <el-menu-item index="4-2">添加轮播图</el-menu-item></router-link>
            </el-submenu>

        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    computed: {},
    created() {}
};
</script>

<style lang= 'scss' scoped>
/deep/.el-menu {
    border: none;
}
.sidebar {
    background-color: #0b233d;
    overflow-y: auto;
}
</style>
