<template>
  <div class="pg_error">
    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handSelection"
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="pgs" label="pg_id" width="180">
      </el-table-column>
      <el-table-column prop="message" label="message" width="800">
      </el-table-column>
      <el-table-column prop="" label="operate" width="300">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="handRepair(scope.$index, scope.row)"
            class="operate_button"
          >
            修复
          </el-button>
          <el-button
            type="warning"
            @click="handRollback(scope.$index, scope.row)"
            >回滚</el-button
          >
          <el-button type="danger" @click="handDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

  <script>
export default {
  data() {
    return {
      tableData: [],
      handSelections: [],
      health_detail: [],
    };
  },
  mounted() {
    this.$axios.get("/ceph_pgs_errors/").then((res) => {
      this.tableData = res.data
    });
  },
  methods: {
    handSelection(val) {
      this.handSelections = val;

},
    handRepair(index, row) {
      const pg_repair = {
        type: "repair",
        pg_id: row.pgs,
      };
      this.$axios.post("/ceph_pgs_errors/", pg_repair).then(res=>{
        window.console.log(res)
      });
    },
    handRollback(index, row) {
      const pg_rollback = {
        type: "rollback",
        pg_id: row.pgs,
      };
      this.$axios.post("/ceph_pgs_errors/", pg_rollback);
    },
    handDelete(index, row) {
      const pg_delete = {
        type: "delete",
        pg_id: row.pgs,
      };
      this.$axios.post("/ceph_pgs_errors/", pg_delete);
    },
  },
};
</script>
<style>
</style>