<template>
  <!-- <div v-if="menu.level > 0"> -->
  <div v-if="menu.children">
    <!-- <el-submenu :index="menu.path" class="my-submenu"> -->
    <el-submenu :index="menu.path" v-rules="menu.code">
      <template slot="title">
        <el-badge :value="value" v-if="menu.badge">
          <i :class="menu.icon"></i>
          <span class="sub-title">{{ menu.name }}</span>
        </el-badge>
        <div v-else class="adjust-positon">
          <i :class="menu.icon" style="color:#333333; margin-right: 8px;"></i>
          <span class="sub-title">{{ menu.name }}</span>
        </div>
      </template>
      <my-menu-item
        v-for="item in menu.children"
        :key="item.path"
        :menu="item"
      ></my-menu-item>
    </el-submenu>
  </div>
  <el-menu-item
    v-else
    :index="menu.path"
    class="my-menu"
    v-menuItem="!menu.hidden"
    v-rules="menu.code"
  >
    <el-badge :value="value" slot="title" v-if="menu.badge">
      <span>{{ menu.name }}</span>
    </el-badge>
    <span v-else slot="title" style="margin-left: 6px;">{{ menu.name }}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: "my-menu-item",
  props: {
    menu:{
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      badgeValue: 0,
    };
  },
  mounted() {},
  created() {
    // console.log("this.menu22", this.menu);
    this.emitter.on("updateBadge", (v) => {
      this.badgeValue = v;
    });
  },
  computed: {
    value() {
      if (this.badgeValue > 99) return "99+";
      return this.badgeValue;
    },
  },
};
</script>

<style lang="less" scoped>
@import "@/styles/theme.less";
.sub-title {
  color: @fontColor333;
  font-size: @fontSize16;
  font-weight: 500;
  // padding-left: @navPaddingLeft2;
}

</style>

<style lang="less">
@import "@/styles/theme.less";
.my-submenu {
  & .el-submenu__icon-arrow {
    left: 18px !important;
    color: @fontColor000;
    right: auto !important;
  }
  &.is-opened > .el-submenu__title .el-submenu__icon-arrow {
    transform: rotateZ(90deg) !important;
  }

  & .el-submenu__title .el-icon-arrow-down:before {
    content: "\e791";
  }

  & .el-menu {
    background: @navColor3;
  }
  & .el-menu-item.is-active {
    color: @fontColorff8;
    background-color: @navColor5;
  }
}
.my-menu {
  &.is-active {
    color: @fontColorff8;
    background-color: @navColor6;
  }
}

.el-badge {
  sup.el-badge__content {
    top: 25px;
    right: -12px;
  }
}
</style>