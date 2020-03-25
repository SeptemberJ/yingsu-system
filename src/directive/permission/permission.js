import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding
    // const butRoles = store.getters && (JSON.parse(store.getters.butRoles))
    const butRoles = store.getters && store.getters.butRoles.split(',')
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value
      const hasPermission = butRoles.some(role => {
        return permissionRoles.includes(role)
      })
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`没有任何指令权限`)
    }
  }
}
