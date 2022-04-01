<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="160px" class="myprint-form">
    <el-form-item label="请输入已有的PID：" prop="pid">
      <el-input
        ref="tInput"
        class="swidth"
        v-model="form.pid"
        placeholder="请输入"
        @keyup.enter.native="getPackNum"
      ></el-input>
    </el-form-item>
    <el-form-item label="包装数量：" prop="mnum">
      <el-input class="swidth" v-model.number="form.mnum" placeholder="包装数量" disabled></el-input>
    </el-form-item>
    <el-form-item label="重打包装数量：" prop="pnum" class="pnum-box">
      <el-input-number
        v-model.number="form.pnum"
        class="swidth"
        :step-strictly="true"
        controls-position="right"
        placeholder="请输入"
        :min="1"
        :max="max"
        :disabled='!(form.mnum > 0)'
      ></el-input-number>
      <p class="p-text" v-show="form.mnum">(最多可重打包数量{{ max }})</p>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('form')" :disabled='!(form.mnum > 0 && form.pnum > 0)'>打印并添加</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { getPackNum, insertRecordLabel } from "@/api/returnMaterial";
export default {
  props: {
    origin: {
      type: Number | String,
      default: 1
    },
    drawer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        pid: "",
        mnum: 0,
        pnum: 0
      },
      plid: "",
      rules: {
        pid: [
          {
            required: true,
            message: "请输入已有PID",
            trigger: ["blur", "change"]
          }
        ],
        pnum: [
          {
            required: true,
            message: "请输入重打包装数量",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  watch: {
    "drawer"(val) {
      if (!val) {
        this.reset("form");
      }
    }
  },
  computed: {
    ...mapState({
      drawerInfos: state => state.drawer.drawerInfos,
      labellist: state => state.drawer.labellist
    }),
    max() {
      return this.form.mnum || 0;
    }
  },
  methods: {
    ...mapActions(["getLabelList"]),
    beginInput() {
      this.$refs.tInput.focus();
    },
    // todo
    // 根据pid查询包装数量
    async getPackNum() {
      const { rbid } = this.drawerInfos;
      let params = {
        rbid: rbid,
        pid: this.form.pid
      };
      try {
        this.$refs.tInput.select();
        const res = await getPackNum(params);

        this.plid = res.plid; // 从返回数据中获得plid
        if (res.num != null) {
          this.form.mnum = res.num;
        }
      } catch (e) {}
    },
    onSubmit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const params = {
            plid: this.plid,
            num: this.form.pnum
          };
          try {
            await insertRecordLabel(params);
            this.reset(formName);
            await this.getLabelList({ rbid: this.drawerInfos.rbid });
            this.$emit('printSuccess')
          } catch (e) {}
        } else {
          return false;
        }
      });
    },
    reset(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.myprint-form {
  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item:last-child {
    margin-bottom: 0 !important;
  }
  .pnum-box {
    position: relative;
    .p-text {
      position: absolute;
      right: 80px;
      margin-right: 10px;
      top: 0px;
      line-height: 32px;
      height: 32px;
      font-size: 12px;
      color: red;
    }
  }
}
.swidth {
  width: 260px;
}
/deep/ .el-input-number.is-controls-right .el-input__inner {
  text-align: left;
}
</style>