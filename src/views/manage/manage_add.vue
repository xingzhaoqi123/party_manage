<template>
    <el-card>
        <div slot="header" class="clearfix">
            <span>添加管理员</span>
        </div>
        <el-form ref="formData" :model="formData" label-width="80px">
            <el-form-item label="头像上传">
                <upload v-model="formData.avatar"></upload>
            </el-form-item>
            <el-form-item label="账号" required>
                <el-input v-model="formData.username" placeholder="请输入账号" ></el-input>
            </el-form-item>
            <el-form-item label="密码" required>
                <el-input v-model="formData.password" type="password" placeholder='请输入密码'></el-input>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="formData.nickname" placeholder="请输入昵称"></el-input>
            </el-form-item>
            <el-form-item label="性别">
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
                <el-button type="primary" @click='submit'>提交</el-button>
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
            formData: {}
        };
    },
    methods: {
        submit() {
            this.$axios.post("/admin/add", this.formData).then(res => {
                if (res.code == 200) {
                    this.$message.success(res.msg);
                    this.$router.push({path:'manage_list'})
                } else {
                    this.$message.error('添加失败');
                }
            });
        }
    },
    created() {}
};
</script>

<style>
.el-input {
    width: 430px;
}
.el-select {
    width: 80px;
}
</style>
