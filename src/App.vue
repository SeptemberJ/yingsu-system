<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
// import { removeToken } from '@/utils/auth'
export default {
  name: 'App',
  created() {
    // window.addEventListener('beforeunload', () => {
    //   removeToken()
    // }, false)
  }
}
</script>
