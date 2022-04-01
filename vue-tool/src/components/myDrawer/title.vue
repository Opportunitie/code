<template>
  <div class="my-title">{{ title }}</div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style lang="less" scoped>
.my-title {
  font-size: 14px;
  line-height: 19px;
  font-weight: bold;
  color: #000;
  position: relative;
  text-indent: 8px;
  margin-bottom: 16px;
  height: 19px;
  &::before{
    position: absolute;
    content: ' ';
    width: 3px;
    height: 14px;
    left: 0px;
    top: 2px;
    background-image: linear-gradient(to right, #FF9D3E, #FF5410);
  }
}
</style>
