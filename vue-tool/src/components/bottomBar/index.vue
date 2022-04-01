<template>
  <div class="bottom-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="less" scoped>
.bottom-bar {
  position: fixed;
  z-index: 2800;
  bottom: 0;
  right: 0;
  height: 56px;
  background: #fff;
  width: calc(100% - 260px);
  box-sizing: border-box;
  line-height: 56px;
  text-align: right;
  padding: 0 30px;
  box-shadow: 0 -1px 2px 0 rgba(0,0,0,0.03);
}
</style>