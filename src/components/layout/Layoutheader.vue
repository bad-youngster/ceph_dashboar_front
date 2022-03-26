<template>
  <div>
    <div class="line"></div>
    <el-menu
      :default-active="this.$route.path"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      @select="handleSelect"
    >
      <el-menu-item index="/home">首页</el-menu-item>
      <!-- <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="/about">选项1</el-menu-item>
      </el-submenu> -->
      <!-- <el-menu-item index="/about">消息中心</el-menu-item>
      <el-menu-item index="4"
        ><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item
      > -->
    </el-menu>
    <el-main>
      <router-view></router-view>
    </el-main>
  </div>
</template>

<script>
export default {
  methods: {
    handleSelect(key, keyPath) {
      window.console.log(key, keyPath);
    },
  },
};
</script>