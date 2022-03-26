<template>
  <div class="navbar">
    <!-- 左侧边 -->
    <!-- <el-col :span="28">
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>

        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>数据列表</span>
          </template>
          <el-menu-item index="1-2">用户列表</el-menu-item>
          <el-menu-item index="1-3">商家列表</el-menu-item>
          <el-menu-item index="1-3">食品列表</el-menu-item>
          <el-menu-item index="1-3">订单列表</el-menu-item>
          <el-menu-item index="1-3">管理员列表</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-edit"></i>
            <span>编辑</span>
          </template>
          <el-menu-item index="1-3">文本编辑</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-star-on"></i>
            <span>图表</span>
          </template>
          <el-menu-item index="1-3">用户分布</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-plus"></i>
            <span>添加数据</span>
          </template>
          <el-menu-item index="1-3">添加商铺</el-menu-item>
          <el-menu-item index="1-3">添加商品</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>设置</span>
          </template>
          <el-menu-item index="1-3">管理员设置</el-menu-item>
        </el-submenu>
        <el-submenu idnex="6">
          <template slot="title">
            <i class="el-icon-warning"></i>
            <span>说明</span>
          </template>
          <el-menu-item index="1-3">说明</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col> -->
    <el-row class="tac">
      <el-col :span="6">
        <!-- <h5>默认颜色</h5> -->
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" >
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped>

.el-menu {
  left: 0px;
  width: 200px;
  bottom: 0px;
}

</style>
<script>
export default {
  data() {
    return {
      isCollapse: true,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      window.console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      window.console.log(key, keyPath);
    },
  },
};
</script>