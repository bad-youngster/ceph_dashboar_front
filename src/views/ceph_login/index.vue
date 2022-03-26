<template>
  <div class="ceph_login">
    <el-card class="box_card">
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo_ruleForm"
      >
        <el-form-item label="用户名" prop="user">
          <el-input v-model="loginForm.user" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="loginForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitLogin('loginForm')"
            >登录</el-button
          >
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      }

      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("输入密码"));
      }

      callback();
    };

    return {
      loginForm: {
        user: "",
        pass: "",
      },
      rules: {
        user: [{ validator: validateUser, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    resetForm(loginForm) {
      this.$refs[loginForm].resetFields();
    },
    submitLogin(loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          this.$axios.post("/ceph_web_login/", this.loginForm).then((res) => {
            if (res.data.status === 200) {
            //   this.$store.dispatch("userLogin", true);
            //   localStorage.setItem("Flag", "isLogin");
              this.$router.replace("/home");
            } else {
              alert(res.data.message);
            }
          });
        }
      });
    },
  },
};
</script>
<style>
.box_card {
  margin: 200px auto;
  width: 400px;
}
</style>