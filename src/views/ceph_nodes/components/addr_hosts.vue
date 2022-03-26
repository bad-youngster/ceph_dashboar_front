<template>
  <div class="addr_hosts">
    <el-form
      label-width="80px"
      ref="form_data"
      :model="form_data"
      :rules="rules"
    >
      <el-form-item label="主机名" prop="hostname">
        <el-input v-model="form_data.hostname"></el-input>
      </el-form-item>
      <el-form-item label="主机地址" prop="hostaddr">
        <el-input v-model="form_data.hostaddr"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form_data')"
          >立即创建</el-button
        >
        <el-button >取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    const validateIP = (rule, value, callback) => {
      if (value === "" || typeof value === "undefined" || value == null) {
        callback(new Error("请输入IP"));
      } else {
        const reg =
          /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        if (!reg.test(value) && value !== "") {
          callback(new Error("请输入正确IP"));
        } else {
          callback();
        }
      }
    };
    return {
      form_data: {
        hostname: "",
        hostaddr: "",
      },
      rules: {
        hostname: [
          {
            type: "string",
            required: true,
            messages: "必填",
            trigger: "blur",
          },
        ],
        hostaddr: [
          {
            validator: validateIP,
            // type: "string",
            required: true,
            messages: "必填",
            trigger: "blur",
          },
        ],
      },
    };
  },
  
  methods: {
    onSubmit(form_data) {
      let options = {
        hostname: this.form_data.hostname,
        hostaddr: this.form_data.hostaddr,
      };
      this.$refs[form_data].validate((valid) => {
        if (valid) {
          this.$axios.post("ceph_hosts/", options)
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style >
.addr_hosts {
  text-align: center;
  display: inline-block;
}
</style>