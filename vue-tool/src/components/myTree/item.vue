<template>
  <div class="box">
    <div class="sub-box" v-if="myItem.children && myItem.children.length > 0">
      <div class="sub-item">
        <i
          class="sub-icon"
          :class="{'el-icon-plus': !myItem.open, 'el-icon-minus': myItem.open }"
          @click.stop="openSub(item)"
        ></i>
        <span :class="{ 'select': myItem.id == selectId }" @click="openTable(myItem)" class="text">{{ myItem.label }}</span>
      </div>
      <div class="sub-alas" v-show="myItem.open">
        <template v-for="j in myItem.children">
          <tree-item  @handleClick="openTable" :item="j" :key="j.id" />
        </template>
      </div>
    </div>
    <div class="tree-item" v-else>
      <span @click="openTable(myItem)" :class="{ 'select': myItem.id == selectId }" class="text text-margin">{{ myItem.label }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  props: {
    item: {
      type: Object,
      defualt: () => {},
    },
  },
  name: "tree-item",
  computed: {
    ...mapState({
      selectId: state => state.myTree.selectId
    }),
    myItem() {
      let label = `${this.item.mno} ${this.item.mname}`
      return {
        ...this.item,
        id: this.item.mid,
        label
      }
    }
  },
  methods: {
    openSub(item) {
      this.$set(item, "open", !item.open);
    },
    openTable(item) {
      this.$emit("handleClick", item);
    },
  },
};
</script>

<style lang="less" scoped>
.box {
}
.sub-box {
  .sub-item {
    color: #666;
    line-height: 22px;
    font-size: 14px;
    white-space: nowrap;
    cursor: pointer;
    padding: 2px 4px;
    border-radius: 2px;
    .sub-icon {
      margin-right: 5px;
      margin-left: 2px;
      transition: 0.1s;
    }
    .open {
      transform: rotate(90deg);
    }
  }
  .sub-alas {
    margin-left: 19px;
    cursor: pointer;
    transition: 0.3s;
  }
}

.tree-item {
  color: #666;
  padding: 0 4px;
  
}
.text {
  white-space: nowrap;
  display: inline-block;
  padding: 2px 4px;
  border-radius: 2px;
  &:hover {
    background: #f1f1f1;
  }
}
.select {
  background: #f1f1f1;
}
.text-margin{
  margin-left: 20px;
}
</style>