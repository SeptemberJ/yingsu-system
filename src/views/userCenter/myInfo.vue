<template>
  <div class="ColdChain">
    myInfo
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'ColdChain',
  components: {
  },
  computed: {
    ...mapGetters([
      'zRegisterInfo'
    ])
  },
  created() {
    // console.log(this.zRegisterInfo)
  },
  methods: {
    getUserInfo() {
      getUserInfo(this.zRegisterInfo.id).then(response => {
        console.log(response)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
