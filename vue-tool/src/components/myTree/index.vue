<template>
  <div class="wrap">
    <div class="tree-box" :style="{width: width, flex: `0 0 ${width}`}">
      <template v-if="newArray.length > 0">
         <div v-for="item in newArray" :key="item.mid" class="tree-item">
          <tree-item @handleClick="openSub" :item="item" />
        </div>
      </template>
      <div v-else class="empty">暂无数据</div>
    </div>
    <div class="w-border"></div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import TreeItem from "./item";
import { mapActions } from 'vuex';
export default {
  props: {
    array: {
      type: Array,
      default: () => [],
    },
    width: {
      type: String,
      default: '300px'
    }
  },
  components: {
    TreeItem,
  },
  computed: {
    newArray() {
      return this.deep(this.array);
    },
  },
  name: "my-tree",
  methods: {
    ...mapActions(['selectItem', 'selectItemBbid']),
    deep(arr) {
      arr.forEach((item) => {
        if (item.children && item.children.length > 0) {
          if (!item.open) {
            this.$set(item, "open", true);
          }
          this.deep(item.children);
        }
      });
      return arr;
    },
    openSub(item) {
      this.selectItem(item.mid)
      this.selectItemBbid(item.bbid)
    },
  },
};
</script>

<style lang="less" scoped>

.wrap {
  display: flex;
  height: 100%;
  .tree-box {
    box-sizing: border-box;
    overflow: auto;
    margin: 0 24px 0 0;
    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
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
  }
  .content {
    overflow: auto;
    flex: 1;
    margin: 7px 0 0 15px;
    padding: 0 15px;
  }
}
.empty{
  color: #999999;
}
.w-border {
  width: 20px;
  height: calc(100% + 56px);
  margin-top: -24px;
  background: #edeff2;
}
</style>