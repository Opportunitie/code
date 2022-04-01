<template>
  <div class="main">
    <el-input
      v-model="inputData"
      placeholder="请输入"
      style="width: 100%"
      @focus="handleVisible"
      :disabled="disabled"
      ref="input"
    />
    <el-dialog
      title="选择物料"
      :visible.sync="dialogVisible"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      class="dialog"
      width="840px"
      :modal="modal"
    >
      <el-form
        label-width="80px"
        class="form"
      >
        <el-row>
          <el-col :span="14">
            <el-form-item label="关键字" prop="keyword">
              <el-input
                v-model="keyword"
                placeholder="输入物料编码、物料名称、型号等关键字进行搜索"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- table -->
      <el-table
        class="table"
        v-loading="loading"
        :data="comMData"
        :header-cell-style="{
          background: '#fafafa',
          color: '#606266',
          fontSize: '14px',
        }"
        :cell-style="{ textAlign: 'left', fontSize: '14px' }"
      >
        <el-table-column label width="55">
          <template v-slot="{ row }">
            <el-radio v-model="tableRadio" :label="row.mno">
              <i></i>
            </el-radio>
          </template>
        </el-table-column>
        <el-table-column
          prop="mno"
          label="物料编码"
          width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="mname"
          label="物料名称"
          width="160"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="mmodel"
          label="物料型号"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="sname"
          label="供应商"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
      <div slot="footer">
        <el-button type="primary" @click="submit" :disabled="loading"
          >保存</el-button
        >
        <el-button @click="cancle">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchCodeDataList } from "@/api/sampleAddApi";
export default {
  name: "lov",
  props: {
    value: {
      type: String,
      default: () => "",
    },
    params: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
      default: () => 0,
    },
    disabled: {
      type: Boolean,
      default: () => false,
    },
    url: {
      type: String,
      default: () => "",
    },
    modal: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      tableRadio: "",
      inputData: "",
      mData: [],
      keyword: '',
      selectItems: [],
    };
  },
  watch: {
    value: function (newValue) {
      this.inputData = newValue;
    },
    dialogVisible(val) {
      if (!val) {
        this.tableRadio = "";
      }
    },
  },
  computed: {
    comMData() {
      const { keyword = '' } = this
      if (!keyword) {
        return this.mData
      } else {
        let reg = new RegExp(keyword)
        const arr = this.mData.map((ite) => {
          if (reg.test(ite.mname) || reg.test(ite.mno) || reg.test(ite.mmodel)) {
            return ite
          }
        }).filter((i) => i)
        return arr
      }
    }
  },
  created() {
    this.inputData = this.value;
  },
  methods: {
    handleVisible() {
      if (this.params.sid) {
        this.dialogVisible = true;
        this.searchData = {
          keyword: "",
          ...this.params,
        };
        this.getTableList();
      } else {
        this.$message.error('请先选择供应商')
      }
    },
    // 查询
    async getTableList() {
      try {
        const params = {
          ...this.searchData,
        };
        this.loading = true;
        const res = await fetchCodeDataList(params, this.url);
        const { total = 0, data = [] } = res;
        this.mData = data;
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
    // 保存
    submit() {
      const _this = this;
      if (!this.tableRadio) {
        this.$notify({
          title: "提示",
          message: "请选择一项数据",
          type: "warning",
          duration: 2000,
        });
        return;
      }
      let result = this.mData.filter((item) => item.mno === _this.tableRadio);
      this.$emit("selectData", { ...result[0], index: _this.index });
      this.dialogVisible = false;
    },
    cancle() {
      this.dialogVisible = false;
    },
    validInput() {
      try {
        if (!this.inputData) {
          this.$refs.input.$refs.input.style.borderColor = "red";
          return false;
        } else {
          this.$refs.input.$refs.input.style.borderColor = "";
          return true;
        }
      } catch (e) {
        return true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  .dialog {
    .form {
      .adjust-button {
        display: flex;
        justify-content: flex-end;
      }
    }
    .table {
      margin-top: 8px;
    }
    .pagination {
      margin-top: 16px;
      text-align: right;
    }
    .buttons {
      .button-adjust {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
<style lang="less">
.main {
  /deep/ .el-dialog > .el-dialog__header {
    padding: 20px 20px 10px;
    border-bottom: 1px solid #eeeeee;
  }
}
.error-style.el-input--small {
  .el-input__inner {
    border: 1px solid red;
  }
}
</style>
