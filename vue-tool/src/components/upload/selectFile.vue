<template>
  <el-upload
    ref="upload"
    :action="action"
    :multiple="multiple"
    :file-list="files"
    :accept="accept"
    :auto-upload="false"
    :on-change="onChange"
    :on-remove="onRemove"
  >
    <el-button slot="trigger" size="small" type="primary">{{ showBtnText }}</el-button>
    <div slot="tip" class="el-upload__tip">{{ tip }}</div>
  </el-upload>
</template>

<script>
export default {
  name: "selectFile",
  props: {
    fileList: {
      type: Array,
      default: () => []
    },
    limitSize: {
      type: Number,
      default: 1,
      desc: "上传文件大小限制"
    },
    multiple: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: '.xlsx'
    },
    limit: {
      type: Number,
      default: 1
    },
    tip: {
      type: String,
      default: "支持扩展名：.xlsx"
    },
    action: {
      type: String,
      default: ""
    }
  },
  computed: {
    showBtnText () {
      const { files, limit } = this
      if (files.length >= limit) {
        return '重新上传'
      } else {
        return '上传文件'
      }
    }
  },
  data() {
    return {
      files: []
    };
  },
  created () {
    this.files = JSON.parse(JSON.stringify(this.fileList))
  },
  methods: {
    onChange (e) {
      const canUp = this.beforeUpload(e.raw)
      if (canUp) {
        this.files = [{
          name: e.name,
          url: e.raw
        }]
      } else {
        this.files = [...this.files]
      }
    },
    onRemove (e) {
      this.files = []
    },
    beforeUpload(file) {
      const isXls = file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type == 'application/vnd.ms-excel'
      this.size = file.size / 1024 / 1024; // 单位Mb
      if (!isXls) {
        this.$message.error(`请上传${this.accept}格式的文件`);
        return false;
      }
      // 超过阻止
      if (this.limitSize && this.size > this.limitSize) {
        this.$message.error(`上传文件大小不能超过 ${this.limitSize}MB!`);
        return false;
      }
      return (
        isXls &&
        ((this.limitSize && this.size <= this.limitSize) || !this.limitSize)
      );
    }
  }
};
</script>

<style lang="less" scoped>
</style>
