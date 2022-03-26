<template>
  <div class="list_host">
    <div>
      <el-button type="primary" @click="dialogFormVisible = true"
        >新增主机信息</el-button
      >
      <el-dialog :visible.sync="dialogFormVisible">
        <el-form :model="formData" :rules="rules">
          <el-form-item label="IP地址" prop="host_ip">
            <el-input v-model="formData.host_ip"></el-input>
          </el-form-item>
          <el-form-item label="主机名" prop="host_name">
            <el-input v-model="formData.host_name"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="host_user">
            <el-input v-model="formData.host_user"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="host_pass">
            <el-input v-model="formData.host_pass"></el-input>
          </el-form-item>
          <el-form-item label="端口号" prop="host_port">
            <el-input v-model="formData.host_port"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="formSubmit(formData)"
            >确定</el-button
          >
        </div>
      </el-dialog>
    </div>
    <div>
      <el-table :data="tabledata">
        <el-table-column prop="host_ip" label="ip地址"></el-table-column>
        <el-table-column prop="host_name" label="主机名"></el-table-column>
        <el-table-column prop="host_user" label="用户名"></el-table-column>
        <el-table-column
          prop="host_pass"
          label="密码"
          v-if="false"
        ></el-table-column>
        <el-table-column prop="host_port" label="端口号"></el-table-column>

        <el-table-column prop="xx" label="操作">
          <template slot-scope="scope">
            <el-button type="primary">xxx</el-button>
            <el-button type="primary" @click="web_console(scope.row)"
              >web_console</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import {
  validateIP,
  validatePort,
  validatePass,
  validateName,
  validateUser,
} from "@/assets/rules/validate.js";
export default {
  data() {
    return {
      tabledata: [],
      dialogFormVisible: false,
      formData: {
        host_ip: "",
        host_name: "",
        host_user: "",
        host_pass: "",
        host_port: "",
      },
      rules: {
        host_ip: [
          {
            required: true,
            message: "请输入IP",
            trigger: "blur",
          },
          {
            validator: validateIP,
            trigger: "blur",
          },
        ],
        host_port: [
          {
            required: true,
            message: "请输入端口号",
            trigger: "blur",
          },
          {
            validator: validatePort,
            trigger: "blur",
          },
        ],
        host_pass: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            validator: validatePass,
            trigger: "blur",
          },
        ],
        host_name: [
          {
            required: true,
            message: "请输入主机名",
            trigger: "blur",
          },
          {
            validator: validateName,
            trigger: "blur",
          },
        ],
        host_user: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            validator: validateUser,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    web_console(row) {
      this.$router.push({ path: "/web_console", query: { ip: row.ip } });
    },
    formSubmit(formData) {
      window.console.log(formData);
      this.$axios.post("ceph_redis_hosts/", formData).then((res) => {
        window.console.log(res);
        this.dialogFormVisible = false;
      });
    },
  },
  mounted() {
    this.$axios.get("ceph_redis_hosts/").then((res) => {
      this.tabledata = res.data;
      window.console.log(res);
    });
  },
};
</script>
<style>
.el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: calc(100% -30px);
  max-width: calc(100% - 30px);
}
.el-dialog .el-dialog__body {
  flex: 1;
  overflow: auto;
}
.el-form .el-input {
  width: auto;
}
</style>