<template>
    <el-card>
        <div slot="header" class="clearfix">
            <span>管理员列表</span>
        </div>
        <el-table :data="formData" style="width: 100%">
            <el-table-column prop="nickname" label="昵称">
            </el-table-column>
            <el-table-column prop="phone" label="手机号">
            </el-table-column>
            <el-table-column prop="avatar" label="头像">
                <template slot-scope="scope">
                    <img :src="scope.row.avatar" alt="" class="table_item_img">
                </template>
            </el-table-column>
            <el-table-column prop="sex" label="性别">
            </el-table-column>
            <el-table-column prop="desc" label="个性签名">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary">编辑</el-button>
                    <el-button size="mini" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>
<script>
export default {
    data() {
        return {
            formData: []
        };
    },
    methods: {
        getData() {
            this.$axios.get("/admin/list").then(res => {
                this.formData = res.dataList;
            });
        }
    },
    created() {
        this.getData();
    }
};
</script>

<style lang="scss" scoped>
.table_item_img {
    width: 80px;
    height: 90px;
}
</style>
