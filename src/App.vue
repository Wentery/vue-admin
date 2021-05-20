<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { isObejctDiff } from '@/assets/js/utils'
export default {
  name: 'App',
  created () {
    const a = {
      id: 2,
      name: 'jj'
    }
    const b = {
      id: 1,
      name: 'jlj'
    }
    console.log(isObejctDiff(a, b))
  }
}
</script>

<style lang="scss">
// @import './assets/scss/base.scss';

* {
  padding: 0;
  margin: 0;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
