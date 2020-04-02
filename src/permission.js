import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect', '/website'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = '中运卡行' // getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next()
      // if is logged in, redirect to the home page
      // next({ path: '/' })
      NProgress.done()
    } else {
      // else if (to.path === '/header' || to.path === '/Carousel' || to.path === '/production' || to.path === '/strength' || to.path === '/partner' || to.path === '/download' || to.path === '/aboutUs') {
      //   next({ path: '/website' })
      // }
      // const hasRoles = store.getters.roles && store.getters.roles.length > 0
      const hasRegistered = store.getters.name && store.getters.name !== ''
      if (hasRegistered) {
        next()
      } else {
        try {
          // 获取用户菜单信息
          const userMenu = await store.dispatch('user/getInfo')
          // 基于用户菜单生成可访问路由表
          const accessRoutes = await store.dispatch('permission/generateRoutes', userMenu)
          console.log('accessRoutes', accessRoutes)
          // 动态添加可访问路由
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        } catch (error) {
          // 定向重新登陆
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login`)
      // next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
