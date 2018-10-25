<template>
    <el-card>
        <div slot="header" class="clearfix">
            <span>添加新闻</span>
        </div>
        <el-form ref="news" :model="news" label-width="80px">
            <el-form-item label="头图上传">
                <upload v-model="news.img"></upload>
            </el-form-item>
            <el-form-item label="标题" required>
                <el-input v-model="news.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="作者">
                <el-select v-model="news.author" placeholder="请选择">
                    <el-option v-for="(item,index) in users" :key="index" :label="item.nickname" :value='item._id'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="新闻内容">
                <quillEditor class="editor" v-model="news.content" @change="onEditorChange" ref="myQuillEditor" :options="editorOption"></quillEditor>
            </el-form-item>
            <el-form-item label="新闻类型">
                <el-select v-model="news.type" placeholder="请选择">
                    <el-option v-for="(item,index) in type" :key="index" :label="item.title" :value='item._id'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click='submit'>提交</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
import upload from "../../components/upload";
import { quillEditor, Quill } from "vue-quill-editor";
import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";

Quill.register("modules/ImageExtend", ImageExtend);
import axios from "axios";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
    components: { upload, quillEditor },
    data() {
        return {
            news: {
                title: "", //
                content: "", //
                contentText: "", //
                img: "", //
                author: "", //
                type: ""
            },
            users: [],
            type: [],
            token: "",
            editorOption: {
                modules: {
                    ImageExtend: {
                        loading: true,
                        name: "file",
                        action: "https://upload-z1.qiniup.com",
                        response: res => {
                            return res.url;
                        },
                        change: (xhr, formData) => {
                            // xhr.setRequestHeader("myHeader", "myValue");
                            formData.append("token", this.token);
                        }
                    },
                    toolbar: {
                        container: container,
                        handlers: {
                            image: function() {
                                QuillWatch.emit(this.quill.id);
                            }
                        }
                    }
                }
            }
        };
    },
    methods: {
        submit() {
            this.$axios
                .post("/admin/news/add", this.news)
                .then(res => {
                    if (res.code == 200) {
                        this.$message.success(res.msg);
                    } else {
                        this.$message.error("添加失败");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        onEditorChange({ editor, html, text }) {
            this.news.content = html;
            this.news.contentText = text;
            // console.log(html);
        },
        getToken() {
            axios.get("http://upload.yaojunrong.com/getToken").then(res => {
                if (res.data.code == 200) {
                    this.token = res.data.data;
                }
            });
        },
        getUsers() {
            this.$axios.get("/admin/list").then(res => {
                if (res.code == 200) {
                    this.users = res.dataList;
                }
            });
        },
        getcategory() {
            this.$axios.get("/admin/category/list").then(res => {
                if (res.code == 200) {
                    this.type = res.data;
                }
            });
        }
    },
    created() {
        this.getToken();
        this.getUsers();
        this.getcategory();
    }
};
</script>

<style>
.el-input {
    width: 430px;
}
.el-select {
    width: 80px;
}
.ql-container {
    min-height: 200px;
}
</style>
