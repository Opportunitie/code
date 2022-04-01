<template>
  <div class="fake-table-container">
    <div class="item" v-for="(item, index) in itemsList" :key="index">
      <div class="each-item-title">
        <span>{{ item.label }}：</span>
      </div>
      <div class="each-item-value">
        <span>{{ item.value || "--" }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemsList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
};
</script>

<style lang="less" scoped>
.fake-table-container {
  display: flex;
  flex-wrap: wrap;
  .item {
    display: flex;
    margin-right: 20px;
    line-height: 38px;
    .each-item-title {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: bolder;
      color: rgba(0, 0, 0, 0.85);
    }
    .each-item-value {
      text-align: left;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
    }
  }
}
</style>
