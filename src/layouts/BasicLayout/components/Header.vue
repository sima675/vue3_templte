<template>
  <a-layout-header class="header">
    <div class="logo-wrap">
      <router-link :to="{ path: '/' }">
        <h1 class="brand">DINSTAR</h1>
      </router-link>
    </div>
    <div>
      <RightContent />
    </div>
  </a-layout-header>
</template>
<script setup lang="ts">
  import RightContent from './RightContent.vue';
</script>
<style lang="less" scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    height: 80px;
    padding: 0 16px;
    background: #ffffff;
    box-shadow: 0 1px 4px #00152914;
    z-index: 1;
    .logo-wrap {
      height: 100%;
      a {
        display: flex;
        align-items: center;
        height: 100%;
      }
      .brand {
        margin: 0;
        color: #0b76e0;
        font-size: 28px;
        font-weight: 800;
        line-height: 1;
      }
    }
  }
</style>
