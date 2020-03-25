<template>
  <div class="ColdChain">
    冷链发货
    <div v-permission="['coldchain_add']" class="permission-alert">
      has
      <el-tag class="permission-tag" size="small">add</el-tag> permission
    </div>
    <div v-permission="['coldchain_update']" class="permission-alert">
      has
      <el-tag class="permission-tag" size="small">update</el-tag> permission
    </div>
    <div v-permission="['coldchain_delete']" class="permission-alert">
      has
      <el-tag class="permission-tag" size="small">delete</el-tag> permission
    </div>
  </div>
</template>
<script>

import permission from '@/directive/permission/index.js' // 权限判断指令
export default {
  name: 'ColdChain',
  components: {
  },
  directives: { permission },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.ColdChain{
  padding: 20px 40px;
}
</style>
