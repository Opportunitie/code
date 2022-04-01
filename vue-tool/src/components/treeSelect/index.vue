<template>
  <div class="tree-select" @click="handleSelect">
    <el-input v-model="nValue"></el-input>
    <span class="drap__icon__wrap">
      <i
        v-if="!nValue"
        class="el-icon-arrow-down drap__icon"
        :style="{transform: visible ? 'rotate(-180deg)' : 'rotate(0deg)'}"
      />
      <i v-else class="el-icon-circle-close drap__icon" @click.stop="clearValue" />
    </span>
    <div class="drap__menu" :style="{ visibility: visible ? 'visible' : 'hidden' }">
      <div class="drap__arrow"></div>
      <el-tree
        class="filter-tree"
        :data="data"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        ref="tree"
      ></el-tree>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nValue: "",
      visible: false,
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  watch: {
    nValue(val) {
      this.$refs.tree.filter(val);
    },
  },
  methods: {
    handleSelect() {
      this.visible = !this.visible;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
  },
};
</script>

<style lang="less" scoped>
.tree-select {
  position: relative;
  .drap__icon__wrap {
    position: absolute;
    color: #c0c4cc;
    top: 0px;
    right: 10px;
    display: inline-block;
    height: 100%;
    line-height: 33px;
    .drap__icon {
      transition: 0.2s;
    }
  }
  .drap__menu {
    position: absolute;
    border: 1px solid #e4e7ed;
    width: 100%;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    margin: 15px 0;
    padding: 6px 0;
    z-index: 9999;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 6px;
      height: 1px;
      visibility: hidden;
    }
    &:hover {
      &::-webkit-scrollbar {
        visibility: visible;
      }
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 6px;
      background-color: rgba(144, 147, 153, 0.3);
      transition: background-color 0.3s;
    }
    &::-webkit-scrollbar-track {
      background-color: #fff;
      border-radius: 6px;
    }
    .drap__nodata {
      height: 33px;
      line-height: 33px;
      font-size: 14px;
      text-align: center;
      color: #999;
    }

    .drap__arrow {
      position: absolute;
      top: 1px;
      left: 35px;
      margin-right: 3px;
      border-bottom-color: #ebeef5;
      border-top-width: 0;
      border-width: 6px;
      filter: drop-shadow(0 0px 12px rgba(0, 0, 0, 0.5));
      &::after {
        position: absolute;
        display: block;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
        z-index: 4001;
        content: " ";
        border-width: 6px;

        bottom: 1px;
        margin-left: -6px;
        border-bottom-color: #fff;
        border-top-width: 0;
      }
    }
  }
}
</style>