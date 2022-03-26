<template>
  <div class="ceph_detail">
    <el-descriptions title="detail"> </el-descriptions>
    {{ health_status }}
    <p v-for="(item, keys) in health_summary" :key="item">
      <router-link :to="keys">{{ keys }}</router-link> :{{ item }}
    </p>
    <router-view ></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      health_status: "",
      health_detail: "",
      health_summary: [],
      message: "",
    };
  },
  mounted() {
    this.axios.get("/ceph_health/").then((res) => {
      window.console.log(res.data);

      var health_type_summary = {};
      this.health_status = res.data.health.status;
      for (let i = 0; i < res.data.health.checks.length; i++) {
        const ceph_health_type = res.data.health.checks[i].type;
        // const ceph_health_detail = res.data.health.checks[i].detail;
        const ceph_health_summary = res.data.health.checks[i].summary;

        health_type_summary[ceph_health_type] = ceph_health_summary["message"];
      }
      this.health_summary = health_type_summary;
    });
  },
};
</script>
<style scoped>
/* .ceph_detail {
  white-space: pre-wrap;
} */
.span-color {
  color: red;
}
</style>
