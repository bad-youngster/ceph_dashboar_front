<template>
  <div class="logs_path">
    <el-table :data="logs_all_path">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="hostname" label="hostName"></el-table-column>
      <el-table-column prop="logpath" label="logsPath"></el-table-column>
      <el-table-column label="operate">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="download_log_file(scope.$index, scope.row)"
          >
            Download
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="width: 70%; margin-left: 30px; margin-top: 30px">
      <el-button
        class="filter-item"
        type="success"
        icon="el-icon-download"
        @click="downfile()"
        >下载</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logs_path: "",
      logs_all_path: [],
      spanArr: [],
      pos: "",
    };
  },
  mounted() {
    let params = new URLSearchParams();
    params.append("model_name", "mon.host034");
    params.append("filter", "^log_file");
    this.axios.post("/ceph_logs/", params).then((res) => {
      this.logs_path = res.data;
    });
    this.axios.get("/ceph_logs/").then((res) => {
      let log_path = [];
      for (let i in res.data) {
        for (let y = 0; y < res.data[i].length; y++) {
          let all_path = {};
          all_path["hostname"] = i;
          all_path["logpath"] = res.data[i][y];
          log_path.push(all_path);
        }
      }

      this.logs_all_path = log_path;
      this.getSpanArr(this.logs_all_path);
    });
  },
  methods: {
    getSpanArr(data) {
      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1);
          this.pos = 0;
        } else {
          if (data[i].hostname === data[i - 1].hostname) {
            this.spanArr[this.pos] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.pos = i;
          }
        }
        // window.console.log(this.spanArr);
      }
    },

    objectSpan({ rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1) {
        const _row = this.spanArr[rowIndex];
        const _col = 1;
        window.console.log(`rowspan:${_row} colspan:${_col}`);
        return {
          rowspan: 6,
          colspan: 1,
        };
      }
    },

    downloadfile(options = {}) {
      return new Promise((resolve, reject) => {
        this.axios({
          url: "/ceph_download_logs/",
          params: options,
          method: "post",
          responseType: "blob",
        }).then(
          (res) => {
            resolve(res.data);
            let blob = new Blob([res.data], {
              type: "application/vnd.ms-excel",
            });

            let filenameend =
              res.headers["content-disposition"].split("filename=")[1];
            let filename = decodeURIComponent(filenameend);
            window.console.log(filename);

            if (window.navigator.msSaveOrOpenBlob) {
              navigator.msSaveOrOpenBlob(blob, filename);
            } else {
              var link = document.createElement("a");
              link.href = window.URL.createObjectURL(blob);
              link.download = filename;
              link.click();
              window.URL.revokeObjectURL(link.href);
            }
          },
          (err) => {
            reject(err);
          }
        );
      });
    },

    download_log_file(index, row) {
      window.console.log(row);
      let host = row.hostname;
      // let remote = "/var/log/ceph/ceph-osd-1.log";
      let remote = row.logpath.replace(/[\n]/g, "");
      let params = {
        host: host,
        remote_path: remote,
      };
      window.console.log(params);
      this.downloadfile(params);
    },
  },
};
</script>