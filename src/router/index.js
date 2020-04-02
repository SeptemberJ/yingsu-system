import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

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
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/website',
    component: () => import('@/views/website/website'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/PayWaiting',
    component: () => import('@/views/PayWaiting/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  }
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/businessBoard',
  //   children: [
  //     {
  //       path: 'businessBoard',
  //       component: () => import('@/views/businessBoard/index'),
  //       name: 'BusinessBoard',
  //       meta: { title: '业务看板', icon: 'kanban', affix: true, breadcrumb: false }
  //     }
  //   ]
  // }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/kanban',
    component: Layout,
    redirect: '/kanban/index',
    name: 'kanban',
    // alwaysShow: true,
    meta: {
      title: '业务看板',
      icon: 'user'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/businessBoard/index'),
        name: 'index',
        meta: { title: '业务看板', icon: 'kanban', affix: true, breadcrumb: false }
      }
    ]
  },

  {
    path: '/order',
    component: Layout,
    redirect: '/order/general',
    alwaysShow: true,
    name: 'order',
    meta: {
      title: '信息发布',
      icon: 'icon_Release',
      keepAlive: true
    },
    children: [
      {
        path: 'general',
        component: () => import('@/views/order/general'),
        name: 'General',
        meta: {
          title: '普货发货',
          keepAlive: true
        }
      },
      {
        path: 'generalAdd',
        component: () => import('@/views/order/generalAdd'),
        name: 'GeneralAdd',
        meta: { title: '新建普货发货', keepAlive: true, activeMenu: '/order/general' },
        hidden: true
      },
      {
        path: 'dangerous',
        component: () => import('@/views/order/dangerous'),
        name: 'dangerous',
        meta: {
          title: '危化发货'
        }
      },
      {
        path: 'coldchain',
        component: () => import('@/views/order/coldchain'),
        name: 'coldchain',
        meta: {
          title: '冷链发货'
        }
      },
      {
        path: 'container',
        component: () => import('@/views/order/container'),
        name: 'container',
        meta: {
          title: '集装箱发货'
        }
      }
    ]
  },

  {
    path: '/userCenter',
    component: Layout,
    redirect: '/userCenter/myInfo',
    alwaysShow: true,
    name: 'userCenter',
    meta: {
      title: '用户中心',
      icon: 'user'
    },
    children: [
      {
        path: 'myInfo',
        component: () => import('@/views/userCenter/myInfo'),
        name: 'myInfo',
        meta: {
          title: '我的资料'
        }
      },
      {
        path: 'wallet',
        component: () => import('@/views/userCenter/wallet'),
        name: 'wallet',
        meta: {
          title: '我的钱包'
        }
      }
    ]
  },

  {
    path: '/table',
    component: Layout,
    redirect: '/table/complex-table',
    name: 'Table',
    meta: {
      title: 'Table',
      icon: 'table'
    },
    children: [
      {
        path: 'dynamic-table',
        component: () => import('@/views/table/dynamic-table/index'),
        name: 'DynamicTable',
        meta: { title: 'Dynamic Table' }
      },
      {
        path: 'drag-table',
        component: () => import('@/views/table/drag-table'),
        name: 'DragTable',
        meta: { title: 'Drag Table' }
      },
      {
        path: 'inline-edit-table',
        component: () => import('@/views/table/inline-edit-table'),
        name: 'InlineEditTable',
        meta: { title: 'Inline Edit' }
      },
      {
        path: 'complex-table',
        component: () => import('@/views/table/complex-table'),
        name: 'ComplexTable',
        meta: { title: 'Complex Table' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1/menu1-1',
    name: 'Nested',
    meta: {
      title: 'Nested Routes',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu 1' },
        redirect: '/nested/menu1/menu1-1',
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu 1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            redirect: '/nested/menu1/menu1-2/menu1-2-1',
            meta: { title: 'Menu 1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu 1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu 1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu 1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'Menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'Menu 2' }
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'Example',
      icon: 'example'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'Create Article', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'Article List', icon: 'list' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const scrollBehavior = function(to, from, savedPosition) {
  if (to.hash) {
    return {
      // 通过 to.hash 的值來找到对应的元素
      selector: to.hash
    }
  }
}

const createRouter = () => new Router({
  // mode: 'history', // require service support
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
  scrollBehavior
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
