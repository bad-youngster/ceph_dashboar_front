import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('./views/Home.vue'),
      redirect: '/login',
      children: [
        {
          path: '/home',
          name: 'Home',

          component: () => import('./views/home/index.vue')
        },
        {
          path: '/ceph_status_detail',
          name: 'ceph_status_detail',
          component: () => import('./views/ceph_status_detail/index.vue')
        },
        {
          path: '/ceph_nodes',
          name: 'ceph_nodes',
          component: () => import('./views/ceph_nodes/index.vue')
        },
        {
          path: '/ceph_pools',
          name: 'ceph_pools',
          component: () => import('./views/ceph_pools/index.vue')
        },
        {
          path: '/logs_path',
          name: 'logs_path',
          component: () => import('./views/ceph_logs/index.vue')
        },
        {
          path: '/crush_map',
          name: 'crush_map',
          component: () => import('./views/ceph_crush/index.vue')
        },
        {
          path: '/pg_repair',
          name: 'pg_repair',
          component: () => import('./views/ceph_repair/index.vue')
        },
        {
          path: '/web_console',
          name: 'web_console',
          component: () => import('./views/ceph_web_console/index.vue')
        },
        {
          path: '/ceph_hosts',
          name: 'ceph_hosts',
          component: () => import ('./views/ceph_hosts/index.vue')
        },
        {
          path: '/OSD_SCRUB_ERRORS',
          name: 'OSD_SCRUB_ERRORS',
          component: () => import('./views/ceph_detail/osd_scrub_errors.vue')
        },
        {
          path: '/OSD_DOWN',
          name: 'OSD_DOWN',
          component: () => import ('./views/ceph_detail/osd_down.vue')
        },
        {
          path: '/MON_CLOCK_SKEW',
          name: 'MON_CLOCK_SKEW',
          component: () => import('./views/ceph_detail/mon_clock_skew.vue')
        }
      ]
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('./test/test1.vue')
    },
    {
      path:'/PG_DAMAGED',
      name: 'PG_DAMAGED',
      redirect:"/pg_repair"
    },
    {
      path: '/login',
      name: 'login',

      component: () => import('./views/ceph_login/index.vue')
    }
  ]
})
