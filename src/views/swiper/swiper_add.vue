<template>
    <el-card>
        <div slot="header">
            <span v-if="!isEdit">添加轮播图</span>
            <span v-else>修改轮播图</span>
        </div>
        <el-form :model="swiper" label-width="110px" label-position='right'>
            <el-form-item label="轮播图上传">
                <upload v-model="swiper.img"></upload>
            </el-form-item>
            <el-form-item label="轮播图标题" style="width: 430px;">
                <el-input v-model="swiper.title"></el-input>
            </el-form-item>
            <el-form-item label="相关新闻">
                <el-select v-model="swiper.newsId" placeholder="请选择">
                    <el-option v-for="(item,index) in news" :key="index" :label="item.title" :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="排序">
                <el-input-number v-model="swiper.sort" :min="1"></el-input-number>
            </el-form-item>
            <el-form-item label="是否显示">
                <el-switch v-model="swiper.status" active-color="#13ce66" inactive-color="#ff4949" :active-value='1' :inactive-value='0'>
                </el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click='submit' v-if="!isEdit">提交</el-button>
                <el-button type="primary" @click='edit' v-else>修改</el-button>
            </el-form-item>
        </el-form>

    </el-card>
</template>

<script>
import upload from "../../components/upload";
export default {
    components: { upload },
    data() {
        return {
            swiper: {
                img: "",
                title: "",
                sort: "", //排序
                status: "", //是否显示
                newsId: ""
            },
            news: [],
            isEdit: false,
            id: ""
        };
    },
    methods: {
        edit() {
            this.$axios
                .put(`/admin/swiper/${this.id}`, this.swiper)
                .then(res => {
                    if (res.code == 200) {
                        this.$message.success(res.msg);
                        this.$router.push({ path: "swiper_list" });
                    }
                });
        },
        getswiper() {
            this.$axios.get(`/admin/swiper/${this.id}`).then(res => {
                if (res.code == 200) {
                    this.swiper = res.data;
                }
            });
        },
        submit() {
            this.$axios
                .post("/admin/swiper/add", this.swiper)
                .then(res => {
                    if (res.code == 200) {
                        this.$message.success(res.msg);
                        this.$router.push({ path: "swiper_list" });
                    } else {
                        this.$message.error("添加失败");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getnews() {
            this.$axios
                .get("/admin/news/all")
                .then(res => {
                    if (res.code == 200) {
                        this.news = res.data;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    created() {
        this.id = this.$route.query.id;
        if (this.$route.query.id) {
            this.getswiper();
            this.isEdit = true;
        }
        this.getnews();
    },
    watch: {
        "$route.query.id"(val, oldval) {
            if (oldval) {
                this.isEdit = false;
                this.swiper = {
                    img: "",
                    title: "",
                    sort: "", //排序
                    status: "", //是否显示
                    newsId: ""
                };
            } else {
                this.getswiper();
                this.isEdit = true;
            }
        }
    }
};
</script>

<style>
</style>
