import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/tokens/pcLogin?fmobile=' + data.username + '&fpassword=' + data.password + '&ftype=0',
    method: 'post'
  })
}

export function getUserInfo(id) {
  return request({
    url: '/zRegisterController/getOwnerInfo?id=' + id,
    method: 'post',
    data: {}
  })
}

export function getUserMenus() {
  return request({
    url: '/tokens/pcLogin?fmobile=13310176649&fpassword=123456&ftype=0',
    method: 'post',
    data: {}
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
