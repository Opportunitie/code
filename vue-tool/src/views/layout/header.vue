<template>
  <div class="my-header">
    <div class="logo">
      <img src="../../assets/base/rxe-logo.png" class="logo-icon" />
      <h3 class="title">业务后台</h3>
    </div>
    <div class="user">
      <!-- <i
        class="collapse-box"
        :class="!collapseFlag ? 'collapse-left' : 'collapse-right'"
        @click="collapseAction"
      ></i> -->
      <div class="user-box">
        <!-- <div class="pro-box">
          <div class="product" v-for="(item, index) in product" :key="index" @click="goLink(item)" v-rules="item.code">
            <span>{{ item.name }}</span>
          </div>
        </div> -->
        <el-avatar
          class="avatar"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        <el-dropdown class="dropdown" trigger="click" @command="command">
          <span class="el-dropdown-link" :style="{ cursor: 'pointer' }">
            {{ user.user ? user.user.name : '默认' }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item command="a">个人中心</el-dropdown-item> -->
            <el-dropdown-item command="b">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { gotologin } from '@/utils';
export default {
  name: "my-header",
  computed: {
    ...mapState({
      collapseFlag: (state) => state.common.collapseFlag,
      user: (state) => state.common.user,
    }),
  },
  data() {
    return {
      // product: [{ name: "MES系统", path: '/smartdevice/admin/#/', code: 2000 }, { name: "WMS系统", path: '/smartindustry/admin/#/', code: -1 }, { name: "MDM系统", path: '/smartmdm/admin/#/', code: -1 }],
    };
  },
  methods: {
    ...mapActions(["toggleCollapseFlag", "logout"]),
    collapseAction() {
      this.toggleCollapseFlag();
    },
    goLink(item) {
      window.location.href = window.location.origin + item.path
    },
    async command(command) {
      if (command == "b") {
        await this.logout();
        gotologin()
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "@/styles/theme.less";
.my-header {
  display: flex;
  align-items: center;
  height: 54px;
  padding: 7px;
  box-sizing: border-box;
  .logo {
    display: flex;
    min-width: @menuWidthMax;
    align-items: center;
    .logo-icon {
      width: 52px;
      height: 40px;
      margin-right: 8px;
    }
    .title {
      font-size: 18px;
      color: #fff;
      line-height: 44px;
      margin-top: 4px;
    }
  }
  .user {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    // justify-content: space-between;
    padding: 0 7px;
    .collapse-box {
      width: 18px;
      height: 18px;
      color: #fff;
      cursor: pointer;
    }
    .collapse-left {
      background-image: url("../../assets/base/group-left.png");
      background-size: cover;
    }
    .collapse-right {
      background-image: url("../../assets/base/group-right.png");
      background-size: cover;
    }
    .user-box {
      display: flex;
      align-items: center;
      .avatar {
        width: 30px;
        height: 30px;
      }
      .dropdown {
        color: #fff;
        padding: 0 7px;
      }
    }
  }
}
.open {
  flex: 0 0 @menuWidthMax;
}
.collapse {
  flex: 0 0 @menuWidthMin;
}
.pro-box {
  display: flex;
  .product {
    max-width: 32px;
    color: #fff;
    opacity: 0.9;
    padding: 0 16px;
    position: relative;
    text-align: center;
    cursor: pointer;
    &::after {
      position: absolute;
      right: 0;
      content: " ";
      width: 1px;
      background: rgba(255, 255, 255, 0.3);
      top: 6px;
      bottom: 6px;
    }
  }
  .product:last-child {
    margin-right: 10px;
    &::after {
      width: 0;
    }
  }
}
</style>