<template>
  <div class="index-page">
    <el-alert :closable="false" title="页面名称配置与qa环境保持了一致，有些隐藏的路由需要经过页面跳转查看" type="success"></el-alert>
    <el-menu
      :router="true"
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="menu"
      text-color="#fff"
    >
      <el-menu-item :route="{path:'/example/home'}" index="1">
        <i class="el-icon-location"></i>
        <span slot="title">栗子</span>
      </el-menu-item>
      <el-menu-item :route="{path:'/example/list'}" index="2">
        <i class="el-icon-location"></i>
        <span slot="title">列表</span>
      </el-menu-item>
      <el-menu-item :route="{path:'/example/rock'}" index="3">
        <i class="el-icon-location"></i>
        <span slot="title">摇一摇</span>
      </el-menu-item>
      <el-menu-item :route="{path:'/example/cardBoard'}" index="3">
        <i class="el-icon-location"></i>
        <span slot="title">面板</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index-page {
  background: #fff;
  box-shadow: 0 3px 5px #bdbdbd;
}
.menu {
  width: 200px;
}
</style>
