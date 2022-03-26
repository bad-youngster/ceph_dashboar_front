<template>
  <div>
    <el-button type="info" plain @click="shell1">查看ceph状态</el-button>
    <el-button type="info" plain @click="shell2">查看ceph详细状态</el-button>
    <el-button type="info" plain @click="shell3">查看ceph osd状态</el-button>
    <el-button type="info" plain @click="shell4">命令4</el-button>
    <div ref="xterm" class="ceph_web_ssh" :style="styleVar"></div>
  </div>
</template>
<script>
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
export default {
  name: "console",
  props: {
    ip: { type: String },
    height: {
      type: Number,
      default: 100,
    },
  },
  data() {
    return {
      term: null,
      socket: null,
      shell: null,
    };
  },
  computed: {
    styleVar() {
      return {
        "--terminal-height": this.height + "vh",
      };
    },
  },
  mounted() {
    this.init();
    this.initSocket();
  },
  beforeDestroy() {
    this.socket.close();
    this.term.dispose();
    clearTimeout(this.socket.onclose());
  },
  methods: {
    init() {
      this.term = new Terminal({
        fontSize: 18,
        convertEol: true,
        rendererType: "canvas",
        cursorBlink: true,
        cursorStyle: "bar",
        theme: {
          background: "#060101",
          cursor: "help",
        },
      });
    },
    initSocket() {
      const fitPlugin = new FitAddon();
      this.term.loadAddon(fitPlugin);
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      this.socket = new WebSocket(
        `${protocol}//${window.g.ws}/${this.ip}`
      );

      this.socket.onmessage = (e) => {
        this.term.write(e.data);
      };
      this.socket.onopen = () => {
        this.term.open(this.$refs.xterm);
        this.term.focus();
        fitPlugin.fit();
      };
      this.socket.onclose = (e) => {
        if (e.code === 1234) {
          window.location.href = "about:blank";
          window.close();
        } else {
          setTimeout(
            () => this.term.write("\r\n Connection is closed. \r\n"),
            200
          );
        }
      };
      this.term.onData((shell) => {
        const send_data = JSON.stringify({
          flag: "entered_key",
          entered_key: shell,
          cols: null,
          rows: null,
        });
        this.socket.send(send_data);
      });
      this.term.onResize(({ cols, rows }) => {
        this.socket.send(
          JSON.stringify({ flag: "resize", cols: cols, rows: rows })
        );
      });
      window.onresize = () => fitPlugin.fit();
    },
    shell1() {
      const send_data = JSON.stringify({
        flag: "entered_key",
        entered_key: "ceph -s",
        cols: null,
        rows: null,
      });
      this.socket.send(send_data);
      window.console.log("shell1");
    },
    shell2() {
      const send_data = JSON.stringify({
        flag: "entered_key",
        entered_key: "ceph health detail",
        cols: null,
        rows: null,
      });
      this.socket.send(send_data);
      window.console.log("shell2");
    },
    shell3() {
      const send_data = JSON.stringify({
        flag: "entered_key",
        entered_key: "ceph osd tree",
        cols: null,
        rows: null,
      });
      this.socket.send(send_data);
      window.console.log("shell3");
    },
    shell4() {
      window.console.log("shell4");
    },
  },
};
</script>
<style>
.ceph_web_ssh {
  display: flex;
  width: 100%;
  min-height: var(--terminal-height);
  flex: 1;
  background-color: #000;
}
.ceph_web_ssh > div {
  flex: 1;
}
</style>
