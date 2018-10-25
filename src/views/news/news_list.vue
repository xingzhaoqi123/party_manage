<template>
    <div>
        <el-card>
            <div slot="header" class="clearfix">
                <span>新闻列表</span>
            </div>
            <el-table :data="newsData" style="width: 100%">
                <el-table-column prop="title" label="标题">
                </el-table-column>
                <el-table-column prop='author.nickname' label="作者">
                </el-table-column>
                <el-table-column prop="type.title" label="种类">
                </el-table-column>
                <el-table-column prop="img" label="头图">
                    <template slot-scope="scope">
                        <img :src="scope.row.img" alt="" class="table_item_img">
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary">编辑</el-button>
                        <el-button size="mini" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newsData: []
        };
    },
    methods: {
        getNews() {
            this.$axios.get("/admin/news/all").then(res => {
                if (res.code == 200) {
                    this.newsData = res.data;
                }
            });
        },
    },
    created() {
        this.getNews();
    }
};
</script>

<style>
.table_item_img {
    width: 80px;
    height: 90px;
}
</style>
