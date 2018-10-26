<template>
    <el-card>
        <div slot="header">
            <span>添加轮播图</span>
        </div>
        <el-table :data="swiper" style="width: 100%">
            <el-table-column prop="title" label="标题">
            </el-table-column>
            <el-table-column prop="img" label="轮播图">
                <template slot-scope="scope">
                    <img :src="scope.row.img" alt="" class="table_item_img">
                </template>
            </el-table-column>
            <el-table-column prop='sort' label="排序">
            </el-table-column>
            <el-table-column prop="status" label="是否显示">
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary"@click="$router.push({path:'swiper_add',query:{id:scope.row._id}})">编辑</el-button>
                    <el-button size="mini" type="danger" @click="remove(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            swiper: []
        };
    },
    methods: {
        remove(id) {
            this.$axios.delete(`/admin/swiper/${id}`).then(res => {
                if (res.code == 200) {
                    this.$message.success(res.msg);
                    this.getSwiper();
                }
            });
        },
        getSwiper() {
            this.$axios
                .get("/admin/swiper/list")
                .then(res => {
                    if (res.code == 200) {
                        this.swiper = res.data;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    created() {
        this.getSwiper();
    }
};
</script>

<style>
.table_item_img {
    width: 80px;
    height: 90px;
}
</style>
