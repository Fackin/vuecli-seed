<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      cssstyle: 'blue'
    };
  },
  mounted() {
    // 换肤 只在初次加载 不适用页面内切换换肤，因二次加载覆盖； 切换换肤的方法应该使用多种样式名切换
    console.log(window.location.origin);
    let host = window.location.origin;
    if (host.indexOf('localhost') > -1) {
      require('./stylus/theme.blue.styl');
    } else {
      require('./stylus/theme.red.styl');
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
