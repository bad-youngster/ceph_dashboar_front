<template>
  <div class="ceph-hosts">
    <span>hosts detail</span>
    <el-tree
      :props="defaultProps"
      :data="Test"
      @node-click="handleNodeClick"
      default-expand-all
    >
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Test: "",
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
  },
  mounted() {
    this.axios.get("/ceph_host/").then((res) => {
      let test = new Array();
      for (let i = 0; i < res.data.length; i++) {
        this.ceph_host_service = res.data[i].services;
        //
        for (let y = 0; y < res.data[i].services.length; y++) {
          window.console.log("sss");
          let xx1 = {
            label: res.data[i].hostname,
            children: [
              {
                label: "services",
                children: [
                  {
                    label: res.data[i].services[y].type,
                    children: [
                        {
                            label: res.data[i].services[y].id
                        }
                    ]
                  },
                ],
              },
            ],
          };
          test.push(xx1);
        }
      }
      this.Test = test;
    });
  },
};
</script>