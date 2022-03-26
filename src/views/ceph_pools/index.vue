<template>
  <div class="ceph_pools">
    <el-table :data="test">
      <el-table-column prop="pool_name" label="Name"></el-table-column>
      <el-table-column prop="type" label="Type"></el-table-column>
      <el-table-column
        prop="application_metadata"
        label="Applications"
      ></el-table-column>
      <el-table-column
        prop="pg_status"
        label="PG Status"
        :formatter="pgstatus"
      ></el-table-column>
      <el-table-column prop="size" label="Replica Size"></el-table-column>
      <el-table-column prop="last_change" label="Last Change"></el-table-column>
      <el-table-column
        prop="erasure_code_profile"
        label="Erasure Coded Profile"
      ></el-table-column>
      <el-table-column
        prop="crush_rule"
        label="Crush Ruleset"
      ></el-table-column>
      <el-table-column
        prop="stats"
        label="Usage"
        :formatter="strogeusage"
      ></el-table-column>
      <el-table-column prop="create_time" label="Create Time"></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      test: [],
    };
  },
  mounted() {
    this.axios.get("/ceph_pools/").then((res) => {
      this.test = res.data;
    //   window.console.log(this.test);
    });
  },
  methods: {
    pgstatus(row) {
      undefined;
      var pgstatus = [];
      for (var i in row.pg_status) {
        undefined;
        pgstatus.push(row.pg_status[i] + " " + ":" + " " + i);
      }
      return pgstatus.join();
    },
    strogeusage(row) {
      undefined;
      //   raw latest
      var rawlatest = row.stats.stored_raw["latest"] / 1024 / 1024 / 1024;
      //   四舍五入
      var tofixedraw = rawlatest.toFixed(2);
      var newrawlatest = ""
      if (parseFloat(tofixedraw) < parseFloat(1)) {
        newrawlatest = rawlatest.toFixed(2) + "M";
      }
      if(parseFloat(tofixedraw) >= parseFloat(1)){
          newrawlatest = rawlatest.toFixed() + "G"
      }
      // max avail
      var maxlatest = row.stats.max_avail["latest"] / 1024 / 1024 / 1024;
      //   四舍五入
      var tofixedmax = maxlatest.toFixed(2)
      var newmaxlatest = ""
      if (parseFloat(tofixedmax) < parseFloat(1)) {
          newmaxlatest = maxlatest.toFixed(2) + "M"
      }
      if (parseFloat(tofixedmax) >= parseFloat(1)) {
          newmaxlatest = maxlatest.toFixed() + "G"
      }
    
      //
      var newlatest = newrawlatest + "/" + newmaxlatest;
      // 获取现在使用
      return newlatest;
    },
  },
};
</script>