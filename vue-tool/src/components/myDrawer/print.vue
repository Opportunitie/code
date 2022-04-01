<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="160px" class="myprint-form">
    <el-form-item label="生产日期：" prop="pdate">
      <el-date-picker class="swidth" type="date" value-format="yyyy-MM-dd" placeholder="请选择" v-model="form.pdate"></el-date-picker>
    </el-form-item>
    <el-form-item label="生产批号：" prop="pbatch">
      <el-date-picker class="swidth" type="date" value-format="yyyy-MM-dd" placeholder="请选择" v-model="form.pbatch"></el-date-picker>
    </el-form-item>
    <el-form-item label="最小包装物料数：" prop="mnum">
       <el-input-number
        v-model.number="form.mnum"
        :step-strictly="true"
        class="swidth"
        controls-position="right"
        placeholder="请输入 "
        :min="1"
      ></el-input-number>
    </el-form-item>
    <el-form-item label="最小包装打印份数：" prop="pnum" class="pnum-box">
      <el-input-number
        v-model.number="form.pnum"
        class="swidth"
        :step-strictly="true"
        controls-position="right"
        placeholder="请输入"
        :min="1"
        :max="max"
      ></el-input-number>
      <p class="p-text" v-show="form.mnum">(最多打印{{ max > 0 ? max : 0 }}份)</p>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :disabled="max <= 0" @click="onSubmit('form')">打印并添加</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { insertRecordLabel } from '@/api/api'
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
        pdate: '',
        pbatch: '',
        mnum: '',
        pnum: 0
      },
      rules: {
        pdate: [
          {
            required: true,
            message: "请选择生产日期",
            trigger: ["blur", "change"]
          }
        ],
        pbatch: [
          {
            required: true,
            message: "请选择生产批号",
            trigger: ["blur", "change"]
          }
        ],
        mnum: [
          {
            required: true,
            message: "请输入最小包装物料数",
            trigger: ["blur", "change"]
          }
        ],
        pnum: [
          {
            required: true,
            message: "请输入最小包装份数",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  watch: {
    // 'form.mnum'(val) {
    //   if(val) {
    //     const { pnum } = this.form
    //     const { anum = 0 } = this.drawerInfos 
    //     this.$set(this.form, 'pnum', Math.ceil(anum / val))
    //   } else {
    //     this.$set(this.form, 'pnum', 1)
    //   }
    // }
    "drawer"(val) {
      if (!val) {
        this.reset('form')
      }
    }
  },
  computed: {
    ...mapState({
      drawerInfos: state => state.drawer.drawerInfos,
      labellist: state => state.drawer.labellist
    }),
    max() {
      const { anum = 0 } = this.drawerInfos 
      const { mnum = '' } = this.form 
      const { labellist = [] } = this
      if (mnum) {
        let listNum = 0;
        labellist.map((item) => {
          listNum += item.num
        })
        let calcNum = anum - listNum
        return Math.ceil(calcNum / mnum)
      } else {
        return 999999
      }
    }
  },
  methods: {
    ...mapActions(['getLabelList']),
    onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { rbid, mno, mid } = this.drawerInfos
          const params = {
            ...this.form,
            origin: this.origin,
            mid,
            mno,
            rbid
          }
          const { pnum } = this.form
          if (!pnum) {
            this.$message.error('请检查打印份数')
            return
          }
          try {
            await insertRecordLabel(params)
            this.reset(formName)
            await this.getLabelList({ rbid: this.drawerInfos.rbid })
            this.$emit('printSuccess')
          } catch(e) {}
        } else {
          return false;
        }
      });
    },
    reset(formName) {
      this.$refs[formName].resetFields()
    }
  }
};
</script>

<style lang="less" scoped>
.myprint-form {
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item:last-child {
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