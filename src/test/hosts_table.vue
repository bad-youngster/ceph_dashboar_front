<template>
  <div>
    <el-table :data="ceph_host">
      <el-table-column prop="hostname" label="hostname"></el-table-column>
      <el-table-column
        prop="services"
        label="services"
        :formatter="cephServices"
      ></el-table-column>
      <el-table-column prop="ceph_version" label="version"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ceph_host: [],
    };
  },
  mounted() {
    this.axios.get("/ceph_host/").then((res) => {
      let cephhosts = new Array();
      // ceph services data
      let cephservices = new Array();
      for (let i = 0; i < res.data.length; i++) {
        cephhosts.push(res.data[i]);
        cephservices.push(res.data[i].services);
      }
      this.ceph_host = cephhosts;
    });
  },
  methods: {
    cephServices(row) {
      undefined;
      var serviceslist = [];
      for (var i = 0; i < row.services.length; i++) {
        undefined;
        serviceslist.push(row.services[i].type + "." + row.services[i].id);
      }
      return serviceslist.join();
    },
  },
};
</script>