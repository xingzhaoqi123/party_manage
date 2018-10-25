<template>
    <div class="page">
        <div class="login">
            <div class="title">
                后台管理系统
            </div>
            <div class="username frame">
                <div>账号</div>
                <div>
                    <el-input v-model="userinfo.username" style="width:450px" placeholder="请输入账号"></el-input>
                </div>
            </div>
            <div class="password frame">
                <div>密码</div>
                <div>
                    <el-input v-model="userinfo.password" style="width:450px" type='password' placeholder="请输入密码"></el-input>
                </div>
            </div>
            <div class="login_btn">
                <div></div>
                <div>
                    <el-button type="primary" @click="login">登录</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userinfo: {
                username: "admin",
                password: "admin"
            }
        };
    },
    methods: {
        login() {
            this.$axios
                .post("/admin/login", this.userinfo)
                .then(res => {
                    if (res.code == 200) {
                        this.$message.success(res.msg);
                        this.$router.push("/layout");
                    } else {
                        this.$message.error("登录失败");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.page {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow-y: scroll;
    background-color: #1a213d;
    display: flex;
    justify-content: center;
    align-items: center;
    .login {
        width: 800px;
        height: 500px;
        border: 1px solid #fff;
        border-radius: 5px;
        color: #fff;
        display: flex;
        flex-direction: column;
        .title {
            flex: 3;
            font-size: 30px;
            text-align: center;
            transform: translateY(50%);
        }
        .frame {
            flex: 2;
            width: 500px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            line-height: 40px;
        }
        .login_btn {
            flex: 2;
            margin: 0 auto;
            width: 500px;
            display: flex;
            justify-content: space-between;
            .el-button {
                height: 40px;
                width: 450px;
            }
        }
    }
}
</style>

