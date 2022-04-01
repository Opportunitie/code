<template>
  <div class="base-info">
    <h3 class="title">物料基本信息</h3>
    <div class="content mar">
      <div class="item">
        <span>物料编码：</span>
        <span>{{ infos.mno || '-' }}</span>
      </div>
      <div class="item">
        <span>物料名称：</span>
        <span>{{ infos.mname || '-' }}</span>
      </div>
    </div>
    <div class="content">
      <div class="item">
        <span>收料类型：</span>
        <span>{{ infos.type || '-' }}</span>
      </div>
      <div class="item">
        <span>需录入物料总数：</span>
        <span style="color: #1677ff">{{ infos.anum || '-' }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    infos: {
      type: Object,
      default: () => {
        return {
          mno: "",
          mname: "",
          type: "",
          anum: ""
        };
      }
    }
  }
};
</script>

<style lang="less" scoped>
.base-info {
  border: 1px solid #eee;
  width: 100%;
  border-radius: 2px;
  padding: 24px;
  box-sizing: border-box;
  .title {
    font-size: 14px;
    line-height: 19px;
    color: #000;
    margin-bottom: 16px;
  }
  .content {
    display: flex;
    flex-direction: row;
    .item {
      flex: 1;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
    }
  }
  .mar {
    margin-bottom: 16px;
  }
}
</style>
