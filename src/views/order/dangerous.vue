<template>
  <div class="Dangerous">
    危化发货
    <div v-permission="['dangerous_add']" class="permission-alert">
      has
      <el-tag class="permission-tag" size="small">add</el-tag> permission
    </div>
    <div v-permission="['dangerous_check']" class="permission-alert">
      has
      <el-tag class="permission-tag" size="small">check</el-tag> permission
    </div>
  </div>
</template>
<script>

import permission from '@/directive/permission/index.js' // 权限判断指令
export default {
  name: 'Dangerous',
  components: {
  },
  directives: { permission },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.Dangerous{
  padding: 20px 40px;
}
</style>
