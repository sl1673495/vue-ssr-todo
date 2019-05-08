<template>
  <div class="loading-wrap">
     <loading></loading> 
  </div>
</template>

<script>
import Loading from './loading.vue'

export default {
    components: {
        Loading
    }
};
</script>

<style lang="stylus" scoped>
.loading-wrap {
    position fixed
    left 0
    right 0
    top 0 
    bottom 0
    display flex
    justify-content center
    align-items center
    background rgba(0, 0, 0, .3)
}
</style>