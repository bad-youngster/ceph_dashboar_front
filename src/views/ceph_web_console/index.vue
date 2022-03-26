<template>
  <div class="web_console">
    <SSH :ip="ip" :height="100" />
  </div>
</template>
<script>
export default {
  name: "xTerm",
  components: {
    SSH: () =>import('./components/webConsole.vue')
  },
  data() {
    return {
      ip: ''
    }
  },
  mounted() {
    this.ip = this.$route.query.ip
  }
}
</script>