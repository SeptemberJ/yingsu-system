import { asyncRoutes, constantRoutes } from '@/router'
import { sortByPro } from '@/utils/index'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */

function hasPermission(userRoute, curRoute) {
  if (userRoute) {
    var matchedUserMenu = userRoute.find((menu, idx) => {
      if (curRoute.name && (menu.name).toUpperCase() === (curRoute.name).toUpperCase()) {
        return menu
      }
    })
    return matchedUserMenu
  } else {
    return undefined
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
function filterAsyncRoutes(routes, userMenu) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    const tmpS = { ...route }
    if (hasPermission(userMenu, tmpS) !== 'undefined' && hasPermission(userMenu, tmpS) !== undefined) {
      tmp.idx = hasPermission(userMenu, tmpS).idx
      tmp.meta.title = hasPermission(userMenu, tmpS).menuTxt
      if (tmp.children) {
        tmp.children = sortByPro(filterAsyncRoutes(tmpS.children, hasPermission(userMenu, tmpS).children), 'idx')
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, userMenu) {
    return new Promise(resolve => {
      const accessedRoutes = sortByPro(filterAsyncRoutes(asyncRoutes, userMenu), 'idx')
      // 最后加上404 page
      accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
