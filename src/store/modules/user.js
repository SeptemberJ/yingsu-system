import { login } from '@/api/user'
import { getToken, setToken, removeToken, setUserBasicInfo, getUserBasicInfo, removeBasicInfo, setUserMenu, getUserMenu, removeUserMenu, setUserBtPermission, getUserBtPermission, removeUserBtPermission } from '@/utils/auth'
import { menuCombine, buttonRoles } from '@/utils/index'
import router, { resetRouter } from '@/router'
import { Message } from 'element-ui'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  butRoles: [],
  zRegisterInfo: {},
  menus: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_BUTROLES: (state, butRoles) => {
    state.butRoles = butRoles
  },
  SET_USERID: (state, id) => {
    state.userId = id
  }
}

const actions = {
  // user login
  login({ commit, dispatch }, userInfo) {
    const { username, password } = userInfo
    let userMenu = []
    let firstMenu = {}
    let permissionBt = []
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(res => {
        const { data } = res
        console.log('data', data)
        switch (res.respCode) {
          case '0':
            userMenu = data.userMenu
            permissionBt = buttonRoles(userMenu)
            console.log('permissionBt--', permissionBt)
            commit('SET_TOKEN', data.token)
            commit('SET_BUTROLES', permissionBt)
            commit('SET_AVATAR', data.headPic)
            setUserBtPermission(permissionBt)
            setToken(data.token)
            setUserBasicInfo({ userID: data.userID, usercode: data.usercode, avatar: data.headPic, username: data.fname, fmobile: data.fmobile })
            setUserMenu(userMenu)
            firstMenu = menuCombine(userMenu)[0]
            console.log('firstMenu', firstMenu)
            resolve({ code: 0, path: '/' + firstMenu.name + '/' + firstMenu.children[0].name })
            break
          default:
            Message({
              message: res.message || 'Error',
              type: 'warning',
              duration: 1500
            })
            resolve({ code: -1, path: '' })
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const UserInfo = getUserBasicInfo()
      commit('SET_NAME', UserInfo.username)
      commit('SET_AVATAR', UserInfo.avatar)
      commit('SET_BUTROLES', getUserBtPermission())
      commit('SET_USERID', UserInfo.userID)
      const menu = getUserMenu()
      resolve(JSON.parse(menu))
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      removeBasicInfo()
      removeUserMenu()
      removeUserBtPermission()
      resetRouter()
      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
      // logout(state.token).then(() => {
      //   commit('SET_TOKEN', '')
      //   commit('SET_ROLES', [])
      //   removeToken()
      //   resetRouter()

      //   // reset visited views and cached views
      //   // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      //   dispatch('tagsView/delAllViews', null, { root: true })

      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  },

  disTest({ commit }) {
    return new Promise(resolve => {
      alert('haha')
      resolve('back1')
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
