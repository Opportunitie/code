<template>
  <div class="my-table-container">
    <div
      class="selection-box"
      v-if="tableData.showSelection && selectionList.length"
    >
      <div class="text">
        <i class="icon-Shape icon-style"></i>已选择
        <span>{{ selectionList.length }}</span
        >项, 您可以对其批量删除等操作
      </div>
      <div class="action" @click="clearSelection">清空</div>
    </div>
    <!-- :row-key="(row) => (!row[rowKey] ? tableData.id : row[rowKey])" -->
    <el-table
      v-loading="loading"
      :row-key="(row) => (!row[rowKey] ? tableData.id : row[rowKey])"
      :ref="tableData.id"
      :empty-text="emptyText"
      :data="tableList"
      :header-cell-style="{
        background: '#fafafa',
        color: '#606266',
        textAlign: 'left',
        fontSize: '14px',
      }"
      :cell-style="{ textAlign: 'left', fontSize: '14px' }"
      :row-class-name="tableRowClassName"
      :expand-row-keys="selectId"
      @row-click="handleClickRow"
      @expand-change="expandChange"
      @selection-change="handleSelectionChange"
    >
      <template v-for="item in tableData.arr">
        <!-- 特定类型 -->
        <el-table-column
          :fixed="item.fixed"
          :key="item[tableData.id]"
          :type="item.type"
          :label="item.label"
          :width="item.minWidth"
          :prop="item.prop"
          :show-overflow-tooltip="item.tips || false"
          v-if="item.type && showScopeArr.includes(item.type)"
        >
          <template slot-scope="scope">
            <div
              class="icon-status-box"
              v-if="item.type == 'icon-status' && scope.row[item.prop]"
            >
              <img
                v-if="Number(scope.row[item.prop])"
                :src="
                  (item.statusMap[Number(scope.row[item.prop])] &&
                    item.statusMap[Number(scope.row[item.prop])].icon) ||
                  ''
                "
              />
              <span>{{
                (item.statusMap[Number(scope.row[item.prop])] &&
                  item.statusMap[Number(scope.row[item.prop])].label) ||
                ""
              }}</span>
            </div>
            <div
              class="status-box"
              v-else-if="item.type == 'status' && scope.row[item.prop]"
            >
              <span :style="item.oStyle ? { ...item.oStyle(scope.row) } : {}">{{
                (item.statusMap[Number(scope.row[item.prop])] &&
                  item.statusMap[Number(scope.row[item.prop])].label) ||
                ""
              }}</span>
            </div>
            <div
              class="status-box"
              v-else-if="item.type == 'unit' && scope.row[item.prop]"
            >
              <span>{{
                `${scope.row[item.prop]} ${scope.row[item.mergeField]}`
              }}</span>
            </div>
            <div
              class="icon-sign-box"
              v-else-if="item.type == 'icon-sign' && scope.row[item.prop]"
            >
              <span class="sign-text">{{ scope.row[item.prop] }}</span>
              <span
                v-if="item.sign && item.sign(scope.row)"
                class="sign"
                :style="item.oStyle ? { ...item.oStyle(scope.row) } : {}"
                >{{ item.sign(scope.row) }}</span
              >
            </div>
            <div
              class="my-expend-box"
              @click="
                showDetails(
                  $event,
                  scope.row[item.prop],
                  scope.$index,
                  scope.row
                )
              "
              v-else-if="item.type == 'my-expend' && scope.row[item.prop]"
            >
              <span class="my-expend-box-text">{{ scope.row[item.prop] }}</span>
            </div>
            <div
              class="my-tooptips"
              v-else-if="item.type == 'my-tooptips' && scope.row[item.prop]"
            >
              {{ scope.row[item.prop] }}
            </div>
            <!-- list-all-data -->
            <div
              class="my-tooptips"
              v-else-if="item.type == 'list-all-data' && scope.row[item.prop]"
            >
              {{ scope.row[item.prop] && scope.row[item.prop].length !== 0?scope.row[item.prop].reduce((result, value)=>{
                if(!result){
                  return result + value[item.dispalyField]
                }
                return result + '、' + value[item.dispalyField]
              } , ""):"-" }}
            </div>
            <div v-else>-</div>
          </template>
        </el-table-column>
        <!-- 多选框 -->
        <el-table-column
          fixed
          :label="item.label"
          :type="item.type"
          :key="item[tableData.id]"
          :width="item.minWidth"
          v-else-if="item.type == 'selection'"
        ></el-table-column>
        <!-- 需要tip的类型 -->
        <el-table-column
          :fixed="item.fixed"
          :key="item[tableData.id]"
          :type="item.type"
          :label="item.label"
          :width="item.minWidth"
          :show-overflow-tooltip="item.tips || false"
          :prop="item.prop"
          v-else-if="item.tips || false"
        >
          <template slot-scope="scope">
            {{
              item.text
                ? item.text(scope.row)
                : scope.row[item.prop]
                ? scope.row[item.prop]
                : scope.row[item.prop] === 0
                ? 0
                : "-"
            }}
          </template>
        </el-table-column>
        <!-- 序号 -->
        <el-table-column
          :type="item.type"
          :label="item.label"
          :key="item[tableData.id]"
          :width="item.minWidth"
          :fixed="item.fixed"
          v-else-if="item.type == 'index'"
        ></el-table-column>
        <el-table-column
          :key="item[tableData.id]"
          :width="item.minWidth"
          v-else-if="item.type == 'edit'"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.isSet">
              <el-input
                @blur="editBlur(scope.$index, scope.row)"
                size="mini"
                placeholder="请输入"
                v-model="scope.row[item.prop]"
              ></el-input>
            </span>
            <span v-else>{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :type="item.type"
          :key="item[tableData.id]"
          :width="item.minWidth"
          v-else-if="item.type == 'expand'"
          :show-overflow-tooltip="item.tips || false"
        >
          <template>
            <div style="height: 335px"></div>
          </template>
        </el-table-column>
        <el-table-column
          :fixed="item.fixed"
          :key="item[tableData.id]"
          :type="item.type"
          :width="item.minWidth"
          :sortable="item.sortable"
          :show-overflow-tooltip="item.tips || false"
          :prop="item.prop"
          v-else
        >
          <template slot="header">
            <el-input
              v-if="item.type == 'handle' && item.header"
              v-model="item.header.value"
              :ref="`${item.type}-headerInput`"
              @change="headerChange(`${item.type}-headerInput`, item)"
              size="mini"
              :placeholder="item.header.placeholder"
            />
            <span v-else>{{ item.label }}</span>
          </template>
          <template slot-scope="scope">
            <!-- handle 类型 -->
            <div v-if="item.type === 'handle'">
              <template v-for="(btn, index) in item.handles">
                <template v-if="btn.rules">
                  <el-button
                    v-rules="btn.rules"
                    :plain="btn.plain"
                    class="my-btn"
                    v-if="btn.show ? btn.show(scope.row) : true"
                    :type="
                      btn.type
                        ? typeof btn.type === 'string'
                          ? btn.type
                          : btn.type(scope.row)
                        : ''
                    "
                    @click="btn.fn(scope.$index, scope.row, btn.fn)"
                    :key="index"
                    >{{
                      btn.text
                        ? typeof btn.text === "string"
                          ? btn.text
                          : btn.text(scope.row)
                        : ""
                    }}</el-button
                  >
                </template>
                <template v-else>
                  <el-button
                    :plain="btn.plain"
                    class="my-btn"
                    v-if="btn.show ? btn.show(scope.row) : true"
                    :type="
                      btn.type
                        ? typeof btn.type === 'string'
                          ? btn.type
                          : btn.type(scope.row)
                        : ''
                    "
                    @click="btn.fn(scope.$index, scope.row, btn.fn)"
                    :key="index"
                    >{{
                      btn.text
                        ? typeof btn.text === "string"
                          ? btn.text
                          : btn.text(scope.row)
                        : ""
                    }}</el-button
                  >
                </template>
              </template>
            </div>
            <!-- 默认 类型 -->
            <div
              :style="item.oStyle ? { ...item.oStyle(scope.row) } : {}"
              v-else
            >
              {{
                item.text
                  ? item.text(scope.row)
                  : scope.row[item.prop]
                  ? scope.row[item.prop]
                  : scope.row[item.prop] === 0
                  ? 0
                  : "-"
              }}
            </div>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div v-if="isPager" class="pagination-container">
      <el-pagination
        :page-size="listState.pageSize"
        :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]"
        class="pagination-self"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listState.total"
        :current-page="listState.pageNum"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { deepCopy } from "@/utils";
import Sortable from "sortablejs";
export default {
  name: "my-table",
  props: {
    tableData: {
      type: Object,
      required: true,
    },
    list: {
      type: Array,
      default: () => [],
      required: true,
    },
    listState: {
      type: Object,
      default: () => {},
      required: false,
    },
    isPager: {
      type: Boolean,
      default: false,
      required: false,
    },
    loading: {
      type: Boolean,
      default: true,
    },
    emptyText: {
      type: String,
      default: "暂无数据",
    },
    draggable: {
      type: Boolean,
      default: false,
    },
    rowKey: {
      type: String,
      default() {
        return "";
      },
    },
  },
  mounted() {
    setTimeout(() => {
      this.draggable && this.rowDrop();
    });
  },
  data() {
    return {
      showScopeArr: [
        "img",
        "icon-status",
        "my-expend",
        "icon-sign",
        "status",
        "my-tooptips",
        "unit",
        "list-all-data"
      ],
      selectionList: [],
    };
  },
  watch: {
    list: {
      handler: function () {
        this.clearExpand();
      },
      deep: true,
    },
  },
  computed: {
    ...mapState({
      selectId: (state) => state.expand.selectId,
      sindex: (state) => state.expand.index,
    }),
    tableList() {
      return deepCopy(this.list);
    },
  },
  methods: {
    ...mapActions(["setExpand", "clearExpand"]),
    rowDrop() {
      const tbody = document.querySelector(
        ".draggable-table .el-table__body-wrapper tbody"
      );
      if (tbody) {
        const _this = this;
        this.sortable = Sortable.create(tbody, {
          onEnd({ newIndex, oldIndex }) {
            const currRow = _this.list.splice(oldIndex, 1)[0];
            _this.list.splice(newIndex, 0, currRow);
            const pids = _this.list.map((item) => item.pid);
            _this.$emit("drag", pids);
          },
        });
      }
    },
    handleSelectionChange(val) {
      this.selectionList = [...val];
      this.$emit("select", val);
    },
    showDetails(e, id, index, row) {
      // 动态计算高度
      let top = e.clientY - e.offsetY - 54 - 20 - 40 + 49 - 8 - (32 - 14) / 2;
      try {
        // 小屏滚动情况下
        const myContainer = document.querySelector(".my-main");
        top = top + myContainer.scrollTop;
      } catch (e) {}
      if (this.sindex > -1 && this.sindex < index && this.selectId.length > 0) {
        top = top - 372;
      }
      const params = {
        top,
        id,
        index,
        row: { ...row, pageUniqueFlag: this.$route.path },
      };
      this.setExpand(params);
    },
    expandChange() {
      this.clearExpand();
    },
    handleClickRow(val) {
      this.$emit("handleClickRow", val);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    tableRowClassName({ row }) {
      if (row[this.tableData.id] == this.selectId) {
        return "select-row";
      }
      return "";
    },
    editBlur(index, row) {
      this.$emit("editBlur", index, row);
    },
    headerChange(ref, item) {
      this.$refs[ref]?.map((item) => {
        item.select();
      });
      item?.header?.change(item?.header?.value);
    },
    clearSelection() {
      this.$refs[this.tableData.id].clearSelection();
      this.selectionList = [];
      this.$emit("select", []);
    },
  },
  destroyed() {
    this.clearExpand();
  },
};
</script>

<style lang="less" scoped>
@import "@/styles/theme.less";
.my-table-container {
  flex: 1;
  position: relative;
  padding-bottom: 16px;
  .pagination-container {
    margin-top: 7px;
    text-align: right;
  }
  .icon-status-box {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    & > span {
      padding-left: 7px;
      font-size: 14px;
    }
    & > img {
      width: 13px;
      height: 13px;
    }
  }
  .status-box {
    display: flex;
    align-items: flex-start;
  }
  .my-expend-box {
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    &-text {
      cursor: pointer;
      &:hover {
        color: @fontColor167;
      }
    }
  }
  .icon-sign-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .sign {
      padding: 3px 8px;
      line-height: 14px;
      background: red;
      color: #fff;
      border-radius: 4px;
      margin-left: 7px;
    }
  }
}
.my-btn {
  position: relative;
  display: inline-block;
  padding-right: 7px;
  &::after {
    position: absolute;
    right: -4px;
    content: "";
    top: 9px;
    width: 1px;
    height: 12px;
    background: #409eff;
  }
}
.my-btn:last-child {
  &::after {
    width: 0;
  }
}
/deep/ .el-table .select-row {
  background: #e7f1ff;
}

/deep/ .el-table .el-table__expand-icon .el-icon-arrow-right::before {
  content: "\e791";
  cursor: default;
}
/deep/ .el-table__expand-icon > .el-icon {
  margin-top: -7px !important;
  margin-left: -7px !important;
}
.selection-box {
  width: 100%;
  height: 40px;
  margin-bottom: 16px;
  box-sizing: border-box;
  border: 1px solid #bae7ff;
  background-color: #e6f7ff;
  line-height: 38px;
  padding: 0 24px 0 16px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  .text {
    color: rgba(0, 0, 0, 0.65);
    & > span {
      color: #1890ff;
    }
    & > i {
      color: #1890ff;
      font-size: 14px;
      margin-right: 8px;
    }
  }
  .action {
    color: #1890ff;
    cursor: pointer;
  }
}
/deep/ .el-table th > .cell > .el-checkbox {
  padding-left: 4px;
}
.my-tooptips {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}
</style>

