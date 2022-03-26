<template>
  <div class="ceph-status">
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('messages')">
          <div class="card-panel-icon-wrapper icon-message">
            <!-- <svg-icon icon-class="message" class-name="card-panel-icon" /> -->
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">Pools</div>
            <div class="card-panel-num">
              <router-link to="/ceph_pools" class="router-style">
                {{ pool_numbers }}
              </router-link>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('purchases')">
          <div class="card-panel-icon-wrapper icon-money">
            <!-- <svg-icon icon-class="money" class-name="card-panel-icon" /> -->
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">Ceph_Nodes</div>
            <div class="card-panel-num">
              <router-link to="/ceph_nodes" class="router-style">
                {{ ceph_nodes }}</router-link
              >
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('shoppings')">
          <div class="card-panel-icon-wrapper icon-shopping">
            <!-- <svg-icon icon-class="shopping" class-name="card-panel-icon" /> -->
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">Ceph_Status</div>
            <div class="card-panel-num">
              <router-link to="/ceph_status_detail" class="router-style">
                {{ ceph_status }}
              </router-link>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
          <div class="card-panel-icon-wrapper icon-people">
            <!-- <svg-icon icon-class="peoples" class-name="card-panel-icon" /> -->
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">Logs_Path</div>
            <div class="card-panel-num">
              <router-link to="/logs_path" class="router-style">
                {{ logs_path }}</router-link
              >
            </div>
          </div>
        </div>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
          <div class="card-panel-icon-wrapper icon-people">
            <!-- <svg-icon icon-class="peoples" class-name="card-panel-icon" /> -->
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">Crush_Map</div>
            <div class="card-panel-num">
              <router-link to="/crush_map" class="router-style">
                Cluster</router-link
              >
            </div>
          </div>
        </div>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
          <div class="card-panel-icon-wrapper icon-people">
            <!-- <svg-icon icon-class="peoples" class-name="card-panel-icon" /> -->
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">Pg_Repair</div>
            <div class="card-panel-num">
              <router-link to="/pg_repair" class="router-style">
                {{ ceph_pg_repaor }}</router-link
              >
            </div>
          </div>
        </div>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
          <div class="card-panel-icon-wrapper icon-people">
            <!-- <svg-icon icon-class="peoples" class-name="card-panel-icon" /> -->
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">Pg_Hosts</div>
            <div class="card-panel-num">
              <router-link to="/ceph_hosts" class="router-style">
                {{ ceph_hosts }}</router-link
              >
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ceph_status: "",
      ceph_nodes: "",
      pool_numbers: "",
      logs_path: "",
      ceph_hosts: "",
      ceph_pg_repaor: "",
    };
  },
  components: {},
  methods: {
    handleSetLineChartData(type) {
      this.$emit("handleSetLineChartData", type);
    },
  },
  mounted() {
    this.axios.get("/ceph_health/").then((res) => {
      // 循环获取ceph checks数据
  
      // 获取ceph集群主机数量
      this.ceph_nodes = res.data.hosts;
      this.ceph_status = res.data.health.status;
    });
    // 获取pools的数量
    this.axios.get("/ceph_pools/").then((res) => {
      this.pool_numbers = res.data.length;
    });

    // 获取日志路径数量
    this.axios.get("/ceph_logs/").then((res) => {
      let count = [];
      for (let i in res.data) {
        for (let y = 0; y < res.data[i].length; y++) {
          count.push(res.data[i][y]);
        }
      }
      this.logs_path = count.length;
    });
    // 获取主机信息
    this.$axios.get("ceph_redis_hosts/").then((res) => {
      this.ceph_hosts = res.data.length;
    });
    // 获取pg repair的数量
    this.$axios.get("/ceph_pgs_errors/").then((res) => {
      this.ceph_pg_repaor = res.data.length;
    });
  },
};
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 20px 0 0 0px;
      padding: 2px;
      // transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
.router-style {
  text-decoration: none;
}
</style>
