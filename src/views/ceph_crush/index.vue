<template>
  <div class="crush_rule">
    <el-table :data="table_data">
      <el-table-column label="crush_map">
        <template slot-scope="scope">
          <el-button
            style="margin-right: 10px"
            size="mini"
            @click="handleInfo(scope.$index, scope.row)"
            >crush</el-button
          >
          <el-dialog title="详细" :visible.sync="dialogInfoVisible">
            <el-input
              v-model.trim="crush_json"
              type="textarea"
              :rows="20"
              v-bind:readonly="isReadonly"
            ></el-input>
            <div class="dialog_button">
              <el-button type="primary" @click="handEdit">编辑</el-button>
              <el-button type="primary" @click="handSubmit">提交</el-button>
              <el-button type="primary" @click="handInput">导出</el-button>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { saveAs } from "file-saver";
export default {
  data() {
    return {
      dialogInfoVisible: false,
      dialogEditVisible: false,
      isReadonly: true,
      crush_json: "",
      tree_json: "",
      table_data: [
        {
          xx: "",
        },
      ],

      formLabelWidth: "120px",
    };
  },

  methods: {
    handleInfo() {
      this.dialogInfoVisible = true;
    },
    handleTree() {
      this.dialogEditVisible = true;
    },

    handEdit() {
      this.isReadonly = false;
    },
    handInput() {
      const str = new Blob([this.crush_json], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(str, "crush_map.txt");
    },
    handSubmit() {
      let option = { data: this.crush_json };
      this.$axios.post("osds_crush/", option)
      // .then(res=>{
      //   window.console.log(res)
      // });
    },
  },
  mounted() {
    this.$axios.get("osds_crush/").then((res) => {
      this.crush_json = res.data;
    });
  },
};
</script>
<style>
.el-input__inner {
  width: 50%;
}
.dialog_button {
  margin-top: 10px;
}
</style>