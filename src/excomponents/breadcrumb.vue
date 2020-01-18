<!-- 面包屑 名字先去取在路由里设置的name 后期扩展：多级路由 -->
<template>
  <div class="breadcrumb">
    {{this.$route.name}}
    <slot></slot>
  </div>
</template>
<style scoped>
.breadcrumb {
  border-bottom: 1px solid #ebf1f5;
  line-height: 35px;
  padding-left: 24px;
  font-size: 14px;
  color: #6f7e95;
  letter-spacing: 0;
  font-weight: 400;
  text-align: left;
}
</style>

