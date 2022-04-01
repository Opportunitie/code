<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    class="dialog"
    :modal="modal"
    @close="$emit('close')"
    width="740px"
  >
    <el-form :model="searchData" ref="searchForm" label-width="80px" class="form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="物料编码" prop="mno">
            <el-input v-model="searchData.mno" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="物料名称" prop="mname">
            <el-input v-model="searchData.mname" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="规格型号" prop="mmodel">
            <el-input v-model="searchData.mmodel" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="adjust-button">
            <el-button type="primary" @click="getTableList">搜索</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- table -->
    <el-table
      class="table"
      v-loading="loading"
      :data="mData"
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
      <el-table-column prop="mno" label="物料编码" width="150" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="mname" label="物料名称" width="200" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="mmodel" label="物料型号" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="mdesc" label="物料描述" :show-overflow-tooltip="true"></el-table-column>
    </el-table>
    <el-pagination
      background
      class="pagination"
      :page-size="listState.pageSize"
      layout="prev, pager, next"
      :total="listState.total"
      :current-page="listState.pageNum"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <!-- <el-divider></el-divider> -->
    <div slot="footer">
      <el-button type="primary" @click="submit" :disabled="loading">保存</el-button>
      <el-button @click="cancle">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { fetchCodeDataList } from "@/api/sampleAddApi";
export default {
  name: "lov",
  props: {
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
    title: {
      type: String,
      default: () => "",
    },
    dialogVisible: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      loading: false,
      tableRadio: "",
      listState: {
        pageSize: 5,
        pageNum: 1,
        total: 0,
      },
      mData: [],
      searchData: {
        mno: "",
        mname: "",
        mmodel: "",
      },
      selectItems: [],
    };
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.listState = {
          pageSize: 5,
          pageNum: 1,
          total: 0,
        };
        this.handleVisible();
      }
    },
  },
  created() {
    this.handleVisible();
  },
  methods: {
    handleVisible() {
      this.searchData = {
        mno: "",
        mname: "",
        mmodel: "",
      };
      this.getTableList();
    },
    // 查询
    async getTableList() {
      try {
        const { pageSize, pageNum } = this.listState;
        const params = {
          ...this.searchData,
          pageSize,
          pageNum,
        };
        this.loading = true;
        const res = await fetchCodeDataList(params, this.url);
        const { total = 0, data = [] } = res;
        this.mData = data;
        this.listState = {
          ...this.listState,
          total,
        };
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
    //重置
    resetForm() {
      this.$refs.searchForm.resetFields();
      this.listState = {
        pageSize: 5,
        pageNum: 1,
        total: this.mData.length,
      };
      this.getTableList();
    },
    // 页面变更
    handleCurrentChange(val) {
      this.listState = {
        ...this.listState,
        pageNum: val,
      };
      this.getTableList();
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
      this.$emit("select", { ...result[0] });
      this.$emit("close");
    },
    cancle() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="less" scoped>
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
