<template>
  <div class="main">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card class="box-card"> </el-card>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-card class="box-card" shadow="hover">
              <img src="../../img/ceph.png" class="image" />
            </el-card>
          </div>
        </el-col>
        <!-- <el-col :span="6">
          <div class="grid-content bg-purple"></div>
        </el-col> -->
        <!-- <el-col :span="6">
          <div class="grid-content bg-purple"></div>
        </el-col> -->
      </el-row>
  </div>
</template>


<style scoped>
.el-row {
  margin-bottom: 20px;
}

.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.text {
  font-size: 14px;
}
.item {
  padding: 18px 0;
}
.image {
  height: 50px;
  margin: 0 auto;
}
</style>

