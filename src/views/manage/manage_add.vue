<template>
    <el-card>
        <div slot="header" class="clearfix">
            <span v-if="!isEdit">添加管理员</span>
            <span v-else>修改管理员</span>
        </div>
        <el-form ref="formData" :model="formData" label-width="80px" style="width:400px">
            <el-form-item label="头像上传">
                <upload v-model="formData.avatar"></upload>
            </el-form-item>
            <el-form-item label="账号" required v-if="!isEdit">
                <el-input v-model="formData.username" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码" required v-if="!isEdit">
                <el-input v-model="formData.password" type="password" placeholder='请输入密码'></el-input>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="formData.nickname" placeholder="请输入昵称"></el-input>
            </el-form-item>
            <el-form-item label="性别" >
                <el-select v-model="formData.sex" placeholder="请选择">
                    <el-option label="男" value="1"></el-option>
                    <el-option label="女" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="formData.phone" placeholder="请输入电话">

                </el-input>
            </el-form-item>
            <el-form-item label="个人描述">
                <el-input v-model="formData.desc" placeholder="个人描述"></el-input>
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
            formData: {
                avatar: "",
                username: "",
                password: "",
                nickname: "",
                sex: "",
                phone: "",
                desc: ""
            },
            id: "",
            isEdit: false
        };
    },
    methods: {
        edit() {
            this.$axios.put(`/admin/${this.id}`, this.formData).then(res => {
                if (res.code == 200) {
                    this.$message.success(res.msg);
                    this.$router.push({ path: "manage_list" });
                }
            });
        },
        getmanage() {
            this.$axios.get(`/admin/user/${this.id}`).then(res => {
                if (res.code == 200) {
                    this.formData = res.data;
                }
            });
        },
        submit() {
            this.$axios.post("/admin/add", this.formData).then(res => {
                if (res.code == 200) {
                    this.$message.success(res.msg);
                    this.$router.push({ path: "manage_list" });
                } else {
                    this.$message.error("添加失败");
                }
            });
        }
    },
    created() {
        this.id = this.$route.query.id;
        if (this.$route.query.id) {
            this.getmanage();
            this.isEdit = true;
        }
    },
    watch: {
        "$route.query.id"(val, oldval) {
            if (oldval) {
                this.isEdit = false;
                this.formData = {
                    avatar: "",
                    username: "",
                    password: "",
                    nickname: "",
                    sex: "",
                    phone: "",
                    desc: ""
                };
            } else {
                this.getmanage();
                this.isEdit = true;
            }
        }
    }
};
</script>

<style scope>
.el-select {
    width: 150px;
}
</style>
