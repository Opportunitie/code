<template>
  <div class="login">
    <div class="login-container">
      <div class="logo-box"></div>
      <div class="title-box">阮小二管理系统</div>
      <div class="login-box"></div>
      <el-form :model="ruleForm2" ref="ruleForm2" :rules="rules" class="form-box">
        <el-form-item class="form-item" prop="ucode">
          <el-input
            type="text"
            v-model="ruleForm2.ucode"
            prefix-icon="el-icon-user-solid"
            placeholder="用户名"
            size="large"
          ></el-input>
        </el-form-item>
        <el-form-item class="form-item" prop="password">
          <el-input
            type="password"
            v-model="ruleForm2.password"
            prefix-icon="el-icon-lock"
            placeholder="密码"
            size="large"
            maxlength="15"
          ></el-input>
        </el-form-item>
        <el-form-item class="form-item" prop="code">
          <el-input
            size="large"
            v-model="ruleForm2.code"
            prefix-icon="el-icon-key"
            placeholder="验证码"
            @keyup.enter.native="handleSubmit2('ruleForm2')"
          ></el-input>
          <img class="checkCodeWrapper" @click="createCode" :src="checkCodeUrl" />
        </el-form-item>
        <el-form-item class="form-item">
          <el-button :loading="loading" type="primary" @click="handleSubmit2('ruleForm2')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { requestLogin, requestCheckcode } from "../api/auth";
import { mapActions } from 'vuex'
// import { getQueryVariable } from '@/utils'
export default {
  data() {
    return {
      checkCodeUrl: "",
      loading: false,
      ruleForm2: {
        ucode: "",
        password: "",
        code: "",
      },
      rules: {
        ucode: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: ["change", "blur"],
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: ["change", "blur"],
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: ["change", "blur"],
          },
        ],
      },
    };
  },
  mounted() {
    this.createCode();
  },
  methods: {
    ...mapActions(['logined']),
    async createCode() {
      try {
        const { code } = await requestCheckcode();
        this.checkCodeUrl = "data:image/png;base64," + code;
      } catch (e) {
        console.log(e);
      }
    },
    handleSubmit2(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const loginParams = {
              ...this.ruleForm2,
            };
            this.loading = true
            await this.logined(loginParams)
            // const url = getQueryVariable('from')
            // if (url) {
            //   window.location.href = decodeURIComponent(url)
            // } else {
              this.$router.push('/')
            // }
            this.loading = false
          } catch (e) {
            this.loading = false
            this.createCode();
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  background-image: url("../assets/base/login_bg.png");
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  text-align: center;
  position: relative;
}

.login-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .logo-box {
    width: 69px;
    height: 77px;
    background-size: 100% 100%;
    margin: 0 auto 26px;
  }
  .title-box {
    color: #fff;
    line-height: 30px;
    font-size: 23px;
    margin-bottom: 50px;
  }
  .form-box {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .form-item {
      width: 270px;
      position: relative;
      .checkCodeWrapper {
        position: absolute;
        width: auto;
        height: 33px;
        top: 3px;
        right: 3px;
        z-index: 100;
      }
    }
  }
}
.el-button {
  width: 270px;
}

</style>
