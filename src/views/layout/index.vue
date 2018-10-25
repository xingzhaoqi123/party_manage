<template>
    <div class="wrapper">
        <el-row class="container">
            <el-col :span="4" class="left">
                <sidebar></sidebar>
            </el-col>
            <el-col :span="20" class="right">
                <vHead></vHead>
                <div class="content">
                        <router-view class="content_detail"></router-view>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import vHead from "../../components/vheader";
import sidebar from "../../components/sidebar";
export default {
    components: { vHead, sidebar }
};
</script>

<style lang="scss" >
.container {
    overflow: hidden;
    height: 100%;
}
.content {
    padding: 10px;
}
.left {
    background-color: #0b233d;
    // margin-bottom: -99999px;
    // padding: 0 0 99999px;

    height: 100vh;
}
.right {
    // min-height: 100vh;

    height: 100vh;
    overflow-y: scroll;
}
</style>
