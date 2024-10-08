import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/form/index'),
      meta: { title: '首页', icon: 'el-icon-s-home' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/activate',
    name: 'Example',
    meta: { title: '实例管理', icon: 'el-icon-s-tools' },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/living/list'),
        meta: { title: '实例列表' }
      },
      {
        path: 'operation',
        name: 'operation',
        component: () => import('@/views/living/operation'),
        meta: { title: '实例运营' }
      },
      {
        path: 'pool',
        name: 'pool',
        component: () => import('@/views/living/pool'),
        meta: { title: '实例池' }
      }
    ]
  },
  {
    path: '/activate',
    component: Layout,
    redirect: '/activate/activate',
    name: 'example',
    meta: { title: '激活管理', icon: 'el-icon-edit' },
    children: [
      {
        path: 'activate',
        name: 'activate',
        component: () => import('@/views/activate/index'),
        meta: { title: '激活码批次' }
      },
      {
        path: 'activateCode',
        name: 'activateCode',
        component: () => import('@/views/activate/activateCode'),
        meta: { title: '激活码' }
      }
    ]
  },
  // {
  //   path: '/activate',
  //   component: Layout,
  //   children: [{
  //     path: 'activate',
  //     name: 'activate',
  //     component: () => import('@/views/activate/index'),
  //     meta: { title: '激活码', icon: 'el-icon-edit' }
  //   }]
  // },
  {
    path: '/goods',
    component: Layout,
    children: [{
      path: 'goods',
      name: 'goods',
      component: () => import('@/views/goods/index'),
      meta: { title: '套餐列表', icon: 'el-icon-s-shop' }
    }]
  },
  {
    path: '/notice',
    component: Layout,
    children: [{
      path: 'index',
      name: 'index',
      component: () => import('@/views/notice/index'),
      meta: { title: '公告', icon: 'el-icon-message-solid' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/home', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
