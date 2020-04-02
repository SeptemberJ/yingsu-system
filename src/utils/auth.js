import Cookies from 'js-cookie'
import { Encrypt, Decrypt } from '@/utils/index'
const TokenKey = 'yToken'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  const millisecond = new Date().getTime()
  const expiresTime = new Date(millisecond + 60 * 60 * 1000 * 12) // 2 hours
  return Cookies.set(TokenKey, token, { expires: expiresTime })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setUserId(id) {
  return Cookies.set('id', Encrypt(id))
}

export function getUserId() {
  return Decrypt(Cookies.get('id'))
}

export function removeUserId() {
  return Cookies.remove('id')
}

export function setUserMenu(menu) {
  return localStorage.setItem('menus', JSON.stringify(menu))
}

export function getUserMenu() {
  return localStorage.getItem('menus')
  // return Decrypt(Cookies.get('menus'))
}

export function removeUserMenu() {
  return localStorage.removeItem('menus')
}
export function setUserBtPermission(bts) {
  return localStorage.setItem('BtP', bts)
}

export function getUserBtPermission() {
  return localStorage.getItem('BtP')
}

export function removeUserBtPermission() {
  return localStorage.removeItem('BtP')
}

export function setUserBasicInfo(Info) {
  return localStorage.setItem('BI', JSON.stringify(Info))
}

export function getUserBasicInfo() {
  return JSON.parse(localStorage.getItem('BI'))
}

export function removeBasicInfo() {
  return localStorage.removeItem('BI')
}

export function setUserAvatar(Avatar) {
  return localStorage.setItem('Avatar', Avatar)
}

export function getUserAvatar() {
  return localStorage.getItem('Avatar')
}

export function removeUserAvatar() {
  return localStorage.removeItem('Avatar')
}
