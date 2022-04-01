<template>
  <div
    class="add-select"
    @click="handleFocus"
    @mouseenter="inputHover = true"
    @mouseleave="inputHover = false"
    v-clickoutside="() => handleBlur(true)"
  >
    <input
      type="text"
      ref="addinput"
      class="input__inner"
      :class="{ 'is-focus': visible, 'is-disabled': disabled, wordcolor: disabled }"
      v-model="nValue"
      :placeholder="holderValue || placeholder"
      :disabled="disabled"
    />
    <span class="drap__icon__wrap">
      <i v-if="clearBtnVisible" class="el-icon-circle-close drap__icon" @click.stop="clearValue" />
      <i
        v-else
        class="el-icon-arrow-down drap__icon"
        :style="{transform: visible ? 'rotate(-180deg)' : 'rotate(0deg)'}"
      />
    </span>
    <div class="drap__menu" v-show="visible">
      <div class="drap__arrow"></div>
      <div class="drap__wrap">
        <drap-item
          v-for="item in filOptions"
          :key="item.value"
          :item="item"
          :selectItem="selectItem"
          @select="select"
        />
        <div v-if="filOptions.length <= 0" class="drap__nodata">暂无数据</div>
      </div>
      <div class="add_wrap" @click.stop>
        <input type="text" class="add__inner" v-model="addValue" placeholder='请输入' :maxlength="15"/>
        <span @click.stop="addtext" class="add_text">
          <i>+</i>添加选项
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import DrapItem from "./drapItem";
import Clickoutside from "element-ui/src/utils/clickoutside";
export default {
  name: "add-select",
  components: {
    DrapItem,
  },
  directives: { Clickoutside },
  props: {
    options: {
      type: Object | Array,
      default: () => [],
    },
    value: {
      type: String | Number,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "请选择",
    },
  },
  data() {
    return {
      visible: false,
      nValue: "",
      addValue: "",
      holderValue: "",
      selectItem: null,
      inputHover: false,
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    visible(val) {
      if (!val) {
        this.addValue = ''
      }
    },
    value(val) {
      if (val || val === 0) {
        for (let item of this.options) {
          if (item.value === val) {
            this.nValue = item.label;
            this.selectItem = item
            break;
          }else{
            this.nValue = "";
            this.selectItem = null
          }
        }
      }else{
        this.nValue = "";
        this.selectItem = null
      }
    },
    nValue(val) {
      if (!val && !this.holderValue) {
        this.selectItem = null;
      }
    },
    selectItem: {
      handler: function (val) {
        this.$emit("input", val?.value || "");
      },
      deep: true,
    },
  },
  computed: {
    selectLabel() {
      return this.selectItem ? this.selectItem.label : "";
    },
    filOptions() {
      if (this.nValue) {
        let arr = [];
        if (this.options instanceof Object) {
          arr = Object.values(this.options);
        }
        if (this.options instanceof Array) {
          arr = this.options;
        }
        return arr.filter((item) => {
          return item.label.indexOf(this.nValue) > -1;
        });
      } else {
        return this.options;
      }
    },
    clearBtnVisible() {
      if (!this.inputHover) {
        return false;
      }
      return this.addValue || this.holderValue;
    },
  },
  methods: {
    init() {
      let farr = this.options.filter((item) => item.value == this.value);
      if (farr?.length > 0) {
        this.selectItem = farr[0];
        this.nValue = farr[0].label;
      } else {
        this.selectItem = null;
      }
    },
    handleFocus() {
      if (this.disabled) {
        return;
      } else {
        this.visible = !this.visible;
        if (this.visible) {
          if (this.nValue) {
            this.holderValue = this.nValue;
          }
          this.nValue = "";
        } else {
          if (this.holderValue) {
            this.nValue = this.holderValue;
          }
          this.addValue = "";
          this.$refs.addinput.blur();
        }
      }
    },
    handleBlur(flag = true) {
      this.visible = false;
      if (this.holderValue && flag) {
        this.nValue = this.holderValue;
      } 
      // else {
        // this.nValue = ''
      // }
    },
    clearValue() {
      if (this.disabled) {
        return;
      } else {
        this.selectItem = null
        this.nValue = "";
        this.holderValue = "";
      }
    },
    select(item) {
      this.selectItem = {
        ...item,
      };
      this.holderValue = this.nValue = this.selectItem.label;
       
      this.handleBlur(false);
    },
    addtext() {
      this.$emit("addtext", this.addValue);
      this.$nextTick(() => {
        this.addValue = "";
      });
    },
  },
};
</script>

<style lang="less" scoped>
.add-select {
  width: 100%;
  height: 33px;
  position: relative;
  .input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 33px;
    line-height: 33px;
    outline: 0;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
    &::-webkit-input-placeholder {
      color: #999;
    }
    &::-moz-placeholder {
      color: #999;
    }
    &:-moz-placeholder {
      color: #999;
    }
    &:-ms-input-placeholder {
      color: #999;
    }
  }
  .wordcolor {
    color: #c0c4cc;
  }
  .is-focus {
    border-color: #409eff;
  }
  .is-disabled {
    background: #f5f7fa;
  }
  .drap__menu {
    position: absolute;
    border: 1px solid #e4e7ed;
    width: 100%;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    margin: 15px 0;
    padding: 6px 0;
    max-height: 200px;
    padding-bottom: 40px;
    z-index: 10000;
    .drap__wrap {
      overflow-y: scroll;
      max-height: 146px;
      &::-webkit-scrollbar {
        width: 6px;
        height: 1px;
        visibility: hidden;
      }
      &:hover {
        &::-webkit-scrollbar {
          visibility: visible;
        }
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 6px;
        background-color: rgba(144, 147, 153, 0.3);
        transition: background-color 0.3s;
      }
      &::-webkit-scrollbar-track {
        background-color: #fff;
        border-radius: 6px;
      }
      .drap__nodata {
        height: 33px;
        line-height: 33px;
        font-size: 14px;
        text-align: center;
        color: #999;
      }
    }
    .drap__arrow {
      position: absolute;
      top: 1px;
      left: 35px;
      margin-right: 3px;
      border-bottom-color: #ebeef5;
      border-top-width: 0;
      border-width: 6px;
      filter: drop-shadow(0 0px 12px rgba(0, 0, 0, 0.5));
      &::after {
        position: absolute;
        display: block;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
        z-index: 4001;
        content: " ";
        border-width: 6px;
        bottom: 1px;
        margin-left: -6px;
        border-bottom-color: #fff;
        border-top-width: 0;
      }
    }
    .add_wrap {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 39px;
      border-top: 1px solid #f5f5f5;
      padding: 0 15px;
      box-sizing: border-box;
      line-height: 39px;
      display: flex;
      flex-direction: row;
      justify-items: center;
      align-items: center;
      .add__inner {
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 28px;
        line-height: 28px;
        outline: 0;
        padding: 0 7px;
        transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        width: 100%;
      }
      .add_text {
        white-space: nowrap;
        color: #409eff;
        height: 100%;
        display: flex;
        align-items: center;
        margin-left: 3px;
        cursor: pointer;
        & > i {
          font-size: 20px;
          margin: 0 3px;
        }
      }
    }
  }
  .drap__icon__wrap {
    position: absolute;
    color: #c0c4cc;
    top: 0px;
    right: 10px;
    display: inline-block;
    height: 100%;
    line-height: 33px;
    .drap__icon {
      transition: 0.2s;
    }
  }
}
</style>