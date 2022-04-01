<template>
  <el-form
    label-position="left"
    :inline="formData.inline ? true : false"
    :model="searchForm"
    :ref="formData.id"
    class="search-form-container"
  >
    <el-form-item
      v-for="item in formData.arr"
      :key="item.key"
      :label="item.label"
      :label-width="item.width"
    >
      <el-input
        :size="item.size || 'small '"
        v-if="item.type == 'input'"
        v-model.trim="searchForm[item.key]"
        :placeholder="item.placeholder"
        class="input-width"
        :style="{ width: item.inputWidth || '230px' }"
      ></el-input>
      <el-date-picker
        :size="item.size || 'small '"
        v-else-if="item.type == 'date-picker'"
        :value-format="item.valueFormat || 'yyyy-MM-dd'"
        v-model="searchForm[item.key]"
        class="input-width"
        type="date"
        placeholder="选择日期"
      ></el-date-picker>
      <el-date-picker
        v-else-if="item.type == 'daterange-picker'"
        v-model="searchForm[item.key]"
        class="input-width"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :size="item.size || 'small '"
        :value-format="item.valueFormat || 'yyyy-MM-dd'"
      ></el-date-picker>
      <el-date-picker
        :size="item.size || 'small '"
        v-else-if="item.type == 'monthrange'"
        value-format="yyyy-MM"
        v-model="searchForm[item.key]"
        class="input-width"
        type="monthrange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <template v-if="item.type == 'year-picker'">
        <el-date-picker
          v-if="item.size == 2"
          v-model="searchForm[item.key]"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        <el-date-picker
          v-if="item.size == 3"
          v-model="searchForm[item.key]"
          type="monthrange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        <el-date-picker
          style="display: inline-block"
          v-model="searchForm[item.key]"
          type="year"
          v-if="item.year == 'byear'"
          placeholder="选择开始年"
        >
        </el-date-picker>
        <!-- <span  v-if="item.year == 'byear'"> - </span> -->
        <el-date-picker
          style="display: inline-block"
          v-model="searchForm[item.key]"
          type="year"
          v-if="item.year == 'eyear'"
          placeholder="选择结束年"
        >
        </el-date-picker>
      </template>
      <el-select
        :size="item.size || 'small '"
        clearable
        v-else-if="item.type == 'select'"
        class="input-width"
        v-model="searchForm[item.key]"
        placeholder="请选择"
      >
        <el-option
          v-for="item in item.option"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-cascader
        :size="item.size || 'small '"
        clearable
        v-else-if="item.type == 'cascader'"
        class="input-width"
        v-model="searchForm[item.key]"
        :show-all-levels="item.showAllLevels === false ?item.showAllLevels:true"
        :options="item.option"
        :props="{ checkStrictly: true, emitPath: false,value:item.value? item.value:'value',label: item.displayLabel?item.displayLabel:'label'}"
        placeholder="请选择"
      >
      </el-cascader>
      <template v-else-if="item.type == 'button'">
        <template v-for="(btn, index) in item.handles">
          <el-button
            v-if="!btn.rules"
            :size="item.size || 'small'"
            :key="index"
            :type="btn.type"
            @click="btnFn(btn)"
            >{{ btn.text }}</el-button
          >
          <el-button
            v-else
            v-rules="btn.rules"
            :size="item.size || 'small'"
            :key="index"
            :type="btn.type"
            @click="btnFn(btn)"
            >{{ btn.text }}</el-button
          >
        </template>
      </template>
    </el-form-item>
  </el-form>
</template>

<script>
import { formatTime } from "@/utils";
export default {
  name: "ajax-form",
  props: {
    formData: {
      type: Object,
      default: () => {
        return {
          id: "demo",
          arr: [],
        };
      },
    },
  },
  data() {
    return {
      searchForm: {},
    };
  },
  created() {
    this.formData.arr &&
      this.formData.arr.map((item) => {
        if (item.key) {
          if (item.default) {
            this.$set(this.searchForm, item.key, item.default);
          } else {
            this.$set(this.searchForm, item.key, "");
          }
        }
      });
  },
  methods: {
    btnFn(btn) {
      const form = {};
      if (btn.event == "reset") {
        this.formData.arr.map((item) => {
          if (item.key) {
            this.$set(this.searchForm, item.key, "");
          }
        });
        btn.fn(this.searchForm);
      } else {
        this.formData.arr.map((item) => {
          if (item.key) {
            form[item.key] = item.format
              ? item.format(this.searchForm[item.key])
              : this.searchForm[item.key];
          }
        });
        btn.fn(form);
      }
    },
  },
};
</script>

<style lang="less">
.search-form-container {
  background-color: #fff;
  padding: 10px;
  & > .el-form-item {
    margin-right: 30px !important;
  }
}
.input-width {
  width: 260px !important;
  box-sizing: border-box;
}
</style>