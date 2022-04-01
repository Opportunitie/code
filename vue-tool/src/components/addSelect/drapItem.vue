<template>
  <div
    class="drap__item"
    :class="{
      'selected': itemSelected,
      'hover': hover
    }"
    :key="item.value"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
    @click.stop.prevent="select"
  >{{ item.label }}</div>
</template>

<script>
export default {
  props: ["item", "selectItem"],
  data() {
    return {
      hover: false,
    };
  },
  computed: {
    itemSelected() {
      if (this.item.value == this.selectItem?.value) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    mouseenter() {
      this.hover = true;
    },
    mouseleave() {
      this.hover = false;
    },
    select() {
      this.$emit("select", this.item);
    },
  },
};
</script>

<style lang="less" scoped>
.hover {
  background-color: #f5f7fa;
}
.selected {
  color: #409eff;
  font-weight: 700;
}
.drap__item {
  padding: 0 20px;
  height: 33px;
  line-height: 33px;
  font-size: 14px;
}
</style>