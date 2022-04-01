<template>
  <el-card v-if="isCard" style="height: 500px;">
    <quill-editor
      :content="content"
      :options="editorOption"
      :key="id"
      @change="onEditorChange($event)"
    >
      <div :id="`${id}`" slot="toolbar">
        <button class="ql-bold" title="加粗">Bold</button>
        <button class="ql-italic" title="斜体">Italic</button>
        <button class="ql-underline" title="下划线">underline</button>
        <button class="ql-strike" title="删除线">strike</button>
        <button class="ql-blockquote" title="引用"></button>
        <!-- <button class="ql-code-block" title="代码"></button> -->
        <button class="ql-header" value="1" title="标题1"></button>
        <button class="ql-header" value="2" title="标题2"></button>
        <button class="ql-list" value="ordered" title="有序列表"></button>
        <button class="ql-list" value="bullet" title="无序列表"></button>
        <select class="ql-header" title="段落格式">
          <option selected>段落</option>
          <option value="1">标题1</option>
          <option value="2">标题2</option>
          <option value="3">标题3</option>
          <option value="4">标题4</option>
          <option value="5">标题5</option>
          <option value="6">标题6</option>
        </select>
        <select class="ql-size" title="字体大小">
          <option value="10px">10px</option>
          <option value="12px">12px</option>
          <option value="14px">14px</option>
          <option value="16px">16px</option>
          <option value="18px">18px</option>
          <option value="20px">20px</option>
        </select>
        <select class="ql-font" title="字体">
          <option value="SimSun">宋体</option>
          <option value="SimHei">黑体</option>
          <option value="Microsoft-YaHei">微软雅黑</option>
          <option value="KaiTi">楷体</option>
          <option value="FangSong">仿宋</option>
          <option value="Arial">Arial</option>
        </select>
        <select class="ql-color" value="color" title="字体颜色"></select>
        <select class="ql-background" value="background" title="背景颜色"></select>
        <select class="ql-align" value="align" title="对齐"></select>
        <button class="ql-clean" title="还原"></button>
      </div>
    </quill-editor>
  </el-card>
  <quill-editor
    v-else
    :content="content"
    :options="editorOption"
    :key="id"
    @change="onEditorChange($event)"
  >
    <div :id="`${id}`" slot="toolbar">
      <button class="ql-bold" title="加粗">Bold</button>
      <button class="ql-italic" title="斜体">Italic</button>
      <button class="ql-underline" title="下划线">underline</button>
      <button class="ql-strike" title="删除线">strike</button>
      <button class="ql-blockquote" title="引用"></button>
      <!-- <button class="ql-code-block" title="代码"></button> -->
      <button class="ql-header" value="1" title="标题1"></button>
      <button class="ql-header" value="2" title="标题2"></button>
      <button class="ql-list" value="ordered" title="有序列表"></button>
      <button class="ql-list" value="bullet" title="无序列表"></button>
      <select class="ql-header" title="段落格式">
        <option selected>段落</option>
        <option value="1">标题1</option>
        <option value="2">标题2</option>
        <option value="3">标题3</option>
        <option value="4">标题4</option>
        <option value="5">标题5</option>
        <option value="6">标题6</option>
      </select>
      <select class="ql-size" title="字体大小">
        <option value="10px">10px</option>
        <option value="12px">12px</option>
        <option value="14px">14px</option>
        <option value="16px">16px</option>
        <option value="18px">18px</option>
        <option value="20px">20px</option>
      </select>
      <select class="ql-font" title="字体">
        <option value="SimSun">宋体</option>
        <option value="SimHei">黑体</option>
        <option value="Microsoft-YaHei">微软雅黑</option>
        <option value="KaiTi">楷体</option>
        <option value="FangSong">仿宋</option>
        <option value="Arial">Arial</option>
      </select>
      <select class="ql-color" value="color" title="字体颜色"></select>
      <select class="ql-background" value="background" title="背景颜色"></select>
      <select class="ql-align" value="align" title="对齐"></select>
      <button class="ql-clean" title="还原"></button>
    </div>
  </quill-editor>
</template>

<script>
import { Quill, quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import "@/common/css/font.css";
let Size = Quill.import("attributors/style/size");
Size.whitelist = ["10px", "12px", "14px", "16px", "18px", "20px"];
Quill.register(Size, true);

// 自定义字体类型
var fonts = [
  "SimSun",
  "SimHei",
  "Microsoft-YaHei",
  "KaiTi",
  "FangSong",
  "Arial",
  "Times-New-Roman",
  "sans-serif",
  "宋体",
  "黑体"
];
var Font = Quill.import("formats/font");
Font.whitelist = fonts;
Quill.register(Font, true);
export default {
  name: "vue-editor",
  props: {
    id: {
      type: String,
      default: "demo"
    },
    visible: {
      type: Boolean,
      default: false
    },
    defaultContent: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "请输入"
    },
    isCard: {
      type: Boolean,
      default: true
    }
  },
  components: {
    quillEditor
  },
  data() {
    return {
      content: "",
      editorOption: {}
    };
  },
  watch: {
    visible(val) {
      if (val) {
        this.content = this.defaultContent;
      }
    }
  },
  created() {
    this.content = this.defaultContent;
    this.editorOption = {
      placeholder: this.placeholder,
      theme: "snow", // or 'bubble'
      modules: {
        toolbar: {
          container: `#${this._props.id}`
        }
      }
    };
  },
  methods: {
    onEditorChange(e) {
      this.content = e.html;
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .ql-editor {
  height: 418px !important;
}
</style>