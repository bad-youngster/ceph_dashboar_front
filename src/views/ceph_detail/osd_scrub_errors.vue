<template>
  <div class="osd_scrub_errors">
    <p>尝试先 <router-link to="pg_repair">ceph pg repair</router-link>修复pg</p>
    <p>
      无法修复后,执行刷新一组pg组，执行命令：
      <p>
      ceph pg scrub "pg_id" <br> ceph pg deep-scrub "pg_id" <br> ceph pg repair "pg_id"
    </p>
    <p>
        还未恢复，通过查询pg的主节点
        <br>
        ceph pg "pg_id" query|grep acting_primary
        <br>
        <p>
        停止主节点的osd
        <br>
        systemctl stop ceph-osd@"acting_primary"
        <br>
        <p>
        等待集群自动恢复,恢复结束后，查看ceph状态
        <br>
        ceph health detail
        <br>
        <p>
        还未恢复，重新修复pg
        <br>
         ceph pg repair "pg_id"
    </p>
    <router-view></router-view>
  </div>
</template>