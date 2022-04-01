<template>
  <div class="containerUpload">
    <span
      class="shade"
      @mouseleave="mouseleave"
      v-if="(isReview || isDel) && isShade && fileList.length > 0"
    >
      <span class="text reviewIcon" @click="handleView" v-if="isReview">
        <i class="el-icon-zoom-in"></i>
      </span>
      <span class="text reviewIcon" @click="handleDel" v-if="isDel && !disabled">
        <i class="el-icon-delete"></i>
      </span>
    </span>
    <el-upload
      v-loading="loading"
      element-loading-text="图片上传中"
      class="avatar-uploader"
      :action="action"
      :headers="header"
      :disabled="disabled"
      name="file"
      list-type="picture-card"
      :show-file-list="false"
      :on-success="handleUploadSuccess"
      :file-list="fileList"
      :on-error="() => loading = false"
      :before-upload="beforeUpload"
      :data="{projectName}"
    >
      <img
        v-if="fileList.length > 0"
        :src="needlim(fileList[0].url)"
        @mouseenter="mouseenter"
        class="avatar"
      />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      <div v-if="tip" slot="tip" class="el-upload__tip">{{tip}}</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="needlim(dialogImageUrl)" alt />
    </el-dialog>
  </div>
</template>
/**
* <is-one-upload></is-one-upload>
* import IsOneUpload from '@/components/Upload/isOneUpload'
* @param {Array} fileList  已有的数据列表[{url: ''}]
* @param {Boolean} isReview  是否开启预览
*/
<script>
export default {
  name: "isOneUpload",
  props: {
    fileList: {
      type: Array,
      default: () => []
    },
    isReview: {
      type: Boolean,
      default: true
    },
    isDel: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    limitSize: {
      type: Number,
      default: 1,
      desc: "上传图片大小限制"
    },
    warning: {
      type: Object,
      default: () => {}
    },
    tip: {
      type: String,
      default: ""
    },
    action: {
      type: String,
      default: ""
    },
    projectName:{
      type:String,
      default: ""
    }
  },
  data() {
    return {
      header: {},
      dialogImageUrl: "",
      dialogVisible: false,
      isShade: false,
      loading: false,
      size: 0,
    };
  },
  methods: {
    mouseenter() {
      this.isShade = true;
    },
    mouseleave() {
      if (this.fileList.length > 0) {
        this.isShade = false;
      }
    },
    handleView() {
      this.dialogImageUrl = this.fileList[0].url;
      this.dialogVisible = true;
    },
    handleDel() {
      this.size = 0;
      this.$emit("input", [], this.size);
    },
    beforeUpload(file) {
      const isJPG =
        file.type === "image/png" ||
        file.type === "image/jpeg"
      this.size = file.size / 1024 / 1024; // 单位Mb
      if (!isJPG) {
        this.$message.error("请上传png,jpg格式的图片");
        return false;
      }
      // 超过提醒
      if (this.warning && this.warning.fn(this.size)) {
        this.$message.warning(this.warning.info);
      }
      // 超过阻止
      if (this.limitSize && this.size > this.limitSize) {
        this.$message.error(`上传图片大小不能超过 ${this.limitSize}MB!`);
        return false;
      }
      this.loading = true;
      return (
        isJPG &&
        ((this.limitSize && this.size <= this.limitSize) || !this.limitSize)
      );
    },
    handleUploadSuccess(res) {
      this.$emit("input", [{ url: res.data }], this.size);
      this.loading = false;
    },
    needlim(url = '') {
      const httpReg = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/
      const isDev = process.env.NODE_ENV == 'development'
      const origin = window.location.origin
      if (httpReg.test(url)) {
        return url
      } else {
        if (!/^\//.test(url)) url = '/' + url; 
        if (isDev) {
          return `http://dev.localcards.gov.vbooster.cn${url}`
        } else {
          return `${origin}${url}`
        }
      }
    },
  }
};
</script>

<style lang="less" scoped>
.avatar {
  width: 146px;
  height: 146px;
  display: block;
}
.avatar-uploader-icon {
  width: 148px;
  height: 148px;
  line-height: 148px;
}
.containerUpload {
  position: relative;
  .el-upload__tip {
    line-height: 1.2;
  }
}
.shade {
  text-align: center;
  line-height: 148px;
  z-index: 2000;
  position: absolute;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 146px;
  height: 146px;
  border-radius: 4px;
}
.reviewIcon {
  font-size: 20px;
}
.text {
  margin: 0 5px;
  cursor: pointer;
  color: #fff;
}
</style>
