<template>
  <div class="ajax-table-container">
    <el-table
      :height="height"
      empty-text="暂无数据"
      :ref="tableData.id"
      :data="list"
      :row-key="tableData.id"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
      @filter-change="filterChange"
    >
      <el-table-column
        v-if="tableData.selection"
        :selectable="(row, index) => tableData.selectable && tableData.selectable(row, index)"
        :reserve-selection="tableData.reserveSelection || false"
        type="selection"
        width="55"
      ></el-table-column>
      <template v-for="item in tableData.arr">
        <el-table-column
          v-if="!item.hide && item.type == 'index'"
          :key="item[tableData.id]"
          :type="item.type"
          :label="item.label"
          :width="item.minWidth"
        ></el-table-column>
        <el-table-column
          v-if="!item.hide && item.type != 'index'"
          :key="item[tableData.id]"
          :sortable="item.sort"
          :width="item.width"
          :min-width="item.minWidth"
          :label="item.label"
          align="center"
          :prop="item.prop"
          :column-key="item.prop"
          :show-overflow-tooltip="item.tips || false"
          :filters="item.filters || null"
        >
          <template slot-scope="scope">
            <div v-if="item.type === 'img'" @click.stop="item.show && item.show(scope.row)">
              <span class="view-img" @click="showImg(scope.row[item.prop])">查看</span>
            </div>
            <div v-else-if="item.type === 'imgs'">
              <template v-for="item in scope.row[item.prop]">
                <img v-if="item" :key="item" v-image-preview class="tableImg" :src="`${item}`" />
              </template>
            </div>
            <div v-else-if="item.type === 'date'">
              <span v-if="scope.row[item.prop]">
                <span v-if="item.fmt === 0">{{scope.row[item.prop] | time-formater-year-month}}</span>
                <span v-else>{{scope.row[item.prop] | time-formater-has-hour}}</span>
              </span>
              <span v-else>-</span>
            </div>
            <div v-else-if="item.type === 'money'">{{scope.row[item.prop] | format-money}}</div>
            <div
              v-else-if="item.type === 'status'"
              :class="scope.row[item.prop] !== null ? item.statusMap[Number(scope.row[item.prop])] && item.statusMap[Number(scope.row[item.prop])].class : ''"
            >{{scope.row[item.prop] !== null ? (item.statusMap[Number(scope.row[item.prop])] && item.statusMap[Number(scope.row[item.prop])].label || '无') : '无'}}</div>
            <div v-else-if="item.type === 'switch'">
              <p v-if="item.show ? item.show(scope.row) : true">
                {{item.switchText ? item.switchText + '：' : ''}}
                <el-switch
                  @change="item.change(scope.$index, scope.row)"
                  v-model="scope.row[item.prop]"
                  :active-value="item.hasOwnProperty('activeValue') ? item.activeValue : true"
                  :inactive-value="item.hasOwnProperty('inactiveValue') ? item.inactiveValue : false"
                  :disabled="item.disabled ? item.disabled(scope.row) : false"
                ></el-switch>
              </p>
            </div>
            <div v-else-if="item.type === 'handle'">
              <template v-for="(btn, index) in item.handles">
                <div
                  class="download-style"
                  v-if="btn.download && ( btn.show ? btn.show(scope.row) : true )"
                  :key="index"
                >
                  <a
                    v-if="isIE && /\.(png|jpg|PNG|JPG)$/.test(scope.row[btn.prop])"
                    :href="isHttpUrl(scope.row[btn.prop])"
                    target="_blank"
                    download
                    class="down-load-a btn-color"
                  >{{btn.text}}</a>
                  <a
                    v-else
                    @click="downloadIamge(scope.row[btn.prop], btn.text)"
                    class="download"
                  >{{btn.text}}</a>
                </div>
                <el-button
                  :style="{marginTop: '6px'}"
                  :plain="btn.plain"
                  v-else-if="btn.show ? btn.show(scope.row) : true"
                  :type="btn.type ? (typeof btn.type === 'string') ? btn.type : btn.type(scope.row) : ''"
                  @click="btn.fn(scope.$index, scope.row, btn.fn)"
                  :size="btn.size||''"
                  :key="index"
                >{{btn.text ? (typeof btn.text === 'string') ? btn.text : btn.text(scope.row) : ''}}</el-button>
                <!-- 按钮不显示时的默认值，有时候需要展示‘-’ -->
                <span v-else-if="btn.defaultValue" :key="index">{{btn.defaultValue}}</span>
              </template>
            </div>
            <div v-else-if="item.type === 'card'">{{scope.row[item.prop] | card}}</div>
            <div v-else-if="item.type === 'calc'">
              <!--显示计算结果-->
              {{item.calc(scope.row)}}
            </div>
            <div
              v-else-if="item.type === 'event'"
              class="edit-item-ceil"
              @click="item.fn(scope.$index,scope.row)"
            >
              <!--事件-->
              <span :style="item.style||{}">
                {{textShow(scope.row, item)}}
                <i
                  :class="`el-icon-${typeof item.icon === 'function' ? item.icon(scope.row) : item.icon}`"
                  v-if="textShow(scope.row, item) !== '-'"
                ></i>
              </span>
            </div>
            <div v-else-if="item.type === 'numbered'">
              <!--序号-->
              {{(listState && (listState.pageSize * (listState.pageIndex - 1)) || 0) + scope.$index + 1}}
            </div>
            <div v-else-if="item.type === 'dropdown'">
              <!--下拉菜单-->
              <el-dropdown>
                <el-button>
                  <svg class="icon" aria-hidden="true">
                    <use :xlink:href="`#icon-${item.icon || 'bars'}`" />
                  </svg>
                </el-button>
                <el-dropdown-menu slot="dropdown" :class="`${item.class}`">
                  <template v-for="(btn, index) in item.handles">
                    <el-dropdown-item
                      :plain="btn.plain"
                      v-if="btn.show ? btn.show(scope.row) : true"
                      :type="btn.type ? (typeof btn.type === 'string') ? btn.type : btn.type(scope.row) : ''"
                      @click.native="btn.fn(scope.$index,scope.row, btn.fn)"
                      :key="index"
                    >{{btn.text ? (typeof btn.text === 'string') ? btn.text : btn.text(scope.row) : ''}}</el-dropdown-item>
                  </template>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div v-else-if="item.type === 'custom'">
              <slot name="custom" :value="scope.row" :type="item.prop"></slot>
            </div>
            <template v-else>{{ (item.text && item.text(scope.row)) || textShow(scope.row, item)}}</template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        v-if="isPager"
        :page-size="listState.pageSize"
        :page-sizes="[10, 20, 30, 40, 50, 60 , 70, 80 ,90, 100]"
        class="pagination-self"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listState.total"
        :current-page="listState.pageNum"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></el-pagination>
    </div>
    <el-dialog title="查看" :visible.sync="showImgFlag" width="340px" :close-on-click-modal="false">
      <viewer :images="showImgArr">
        <img v-for="(img, index) in showImgArr" :key="index" :src="img" class="image-box" />
      </viewer>
      <div style="text-align:center;margin-top:20px">
        <el-button @click="showImgFlag=false">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>
/**
* <ajax-table></ajax-table>
* import AjaxTable from '@/components/ajaxTable/index'
* @param {Array} list  表格数据
* @param {Boolean} loading  loading状态
* @param {Object} tableData  表格配置信息
*   @param id 表格id对应的字段
*   @param arr 表格每一列的配置
*     @param {String} label 当前列的表头
*     @param {String} prop 表格字段
*     @param {String} type 类型 （img（图片） || date（时间） || money（金额） || status（状态） || switch（开关） || handle（操作） || custom (自定义类型)）
*     @param {String} width 宽度
*     @param {Number} hide 隐藏当前列
*     @param {Array} statusMap 状态对应的数组[{label: 'xxx'}] -- status对应数组的下标 -- type为status时必传
*     @param {String} switchText 开关提示文字 -- type为switch时必传
*     @param {Function} change 切换开关时的回调函数 -- type为switch时必传
*     @param {Array} handles 操作按钮的配置 -- type为handle时必传
*       @param {Function} fn 点击按钮的回调函数
*       @param {String} text 按钮文字
*       @param {Function} show 按钮显示于隐藏的回调函数
*       @param type 按钮的颜色（primary || danger || warning || info || success）
*       @param defaultValue: 文本默认值
*/
<script>
export default {
  name: "ajaxTableCom",
  props: {
    tableData: {
      type: Object,
      required: true
    },
    list: {
      type: Array,
      default: () => [],
      required: true
    },
    loading: {
      type: Boolean,
      default: false,
      required: false
    },
    isPager: {
      type: Boolean,
      default: false,
      required: false
    },
    sortChange: {
      type: Function,
      default: () => {}
    },
    listState: {
      type: Object,
      default: () => {},
      required: false
    },
    height: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      showImgFlag: false,
      showImgArr: []
    };
  },
  methods: {
    showImg(img) {
      this.showImgFlag = true;
      this.showImgArr = [img];
    },
    // 执行默认值函数
    exeDefaultValue(row, item) {
      let v = item.defaultValue;
      if (item && item.defaultValue instanceof Function) {
        v = item.defaultValue(row);
      }
      return v;
    },
    handleClick(index, row, call) {
      call(index, row);
    },
    textShow(row, item) {
      let val = row[item.prop];
      val = val === undefined ? this.exeDefaultValue(row, item) : val;
      if (val === null || val === "" || val === undefined) {
        return "无";
      } else {
        return val;
      }
    },
    handleCurrentChange(val) {
      this.$emit("currentChange", val);
    },
    handleSizeChange(val) {
      this.$emit("sizeChange", val);
    },
    // 图片瘦身处理
    imgsLim(src) {
      let reg = /\?/g;
      let result = reg.test(src);
      return result;
    },
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },
    filterChange(filter) {
      this.$emit("filterChange", filter);
    },
    clearSelection() {
      this.$refs[this.tableData.id].clearSelection();
    },
    isHttpUrl(url) {
      if (/^http/.test(url)) {
        return url;
      } else {
        return `${window.location.origin}${url}`;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.ajax-table-container {
  margin-top: 10px;
}
.pagination-container {
  background: #fff;
  text-align: right;
  .pagination-self {
    padding: 10px 0px 0;
  }
}
.view-img {
  cursor: pointer;
  color: #409eff;
}
.tableImg {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.edit-item-ceil {
  cursor: pointer;
  span {
    padding: 10px;
    display: block;
    i {
      font-size: 18px;
      color: #409eff;
    }
  }
}
.primary {
  color: #67c23a;
}
.success {
  color: #67c23a;
}
.warning {
  color: #e6a23c;
}
.danger {
  color: #f56c6c;
}
.info {
  color: #909399;
}
.ajax-table-container {
  background-color: #fff;
  padding: 10px;
}
.download-style {
  display: inline-block;
  color: #66b1ff;
  margin: 0 0 0 10px;
  cursor: pointer;
}
.btn-color {
  color: #409eff !important;
  &:hover {
    color: #66b1ff !important;
  }
}
.image-box {
  width: 300px;
  height: auto;
  margin: 0 auto;
}
.text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

