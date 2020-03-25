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
  // return Cookies.set('menus', menu)
}

export function getUserMenu() {
  return localStorage.getItem('menus')
  // return Cookies.get('menus')
  // return Decrypt(Cookies.get('menus'))
}

export function removeUserMenu() {
  return localStorage.removeItem('menus')
  // return Cookies.remove('menus')
}
export function setUserBtPermission(bts) {
  return localStorage.setItem('BtP', bts)
  // return Cookies.set('BtP', bts)
}

export function getUserBtPermission() {
  return localStorage.getItem('BtP')
  // return Cookies.get('BtP')
}

export function removeUserBtPermission() {
  return localStorage.removeItem('BtP')
  // return Cookies.remove('BtP')
}

export function setUserBasicInfo(Info) {
  return localStorage.setItem('BI', JSON.stringify(Info))
  // return Cookies.set('BI', Info)
}

export function getUserBasicInfo() {
  return JSON.parse(localStorage.getItem('BI'))
  // return JSON.parse(Cookies.get('BI'))
}

export function removeBasicInfo() {
  return localStorage.removeItem('BI')
  // return Cookies.remove('BI')
}

export function setUserAvatar(Avatar) {
  return localStorage.setItem('Avatar', Avatar)
  // return Cookies.set('Avatar', Avatar)
}

export function getUserAvatar() {
  return localStorage.getItem('Avatar')
  // return Cookies.get('Avatar')
}

export function removeUserAvatar() {
  return localStorage.removeItem('Avatar')
  // return Cookies.remove('Avatar')
}
