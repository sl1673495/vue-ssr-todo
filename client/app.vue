<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
   
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'

export default {
  metaInfo: {
    title: 'SSH\'s Todo App'
  },
  components: {
    Header,
    Footer
  },
  mounted () {
  }
}
</script>

<style lang="stylus" scoped>
#app
  position absolute
  left 0
  right 0
  top 0
  bottom 0
#cover
  position fixed
  left 0
  top 0
  right 0
  bottom 0
  background-color #999
  opacity 0.9
  z-index -1
</style>


