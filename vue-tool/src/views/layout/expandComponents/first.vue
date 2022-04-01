<template>
  <div class="my-first">
    <div class="btns">
      <el-button type="primary" @click="actions">{{isEdit ? '保存' : '编辑'}}</el-button>
      <el-button v-if="isEdit" @click="cancel">取消</el-button>
    </div>
    <div class="content">
      <!-- 正常 -->
      <div v-if="!imgPagePath.includes($route.path)">
        <div class="first-item">
          <label class="item-label">物流公司名称：</label>
          <span class="item-span" v-if="!isEdit">{{ logistics.company || '--' }}</span>
          <el-input
            class="max-width"
            v-else
            v-model="logistics.company"
            placeholder="请输入"
            type="text"
            maxlength="50"
          ></el-input>
        </div>
        <div class="first-item">
          <label class="item-label">物流单号：</label>
          <span class="item-span" v-if="!isEdit">{{ logistics.no || '--' }}</span>
          <el-input
            class="max-width"
            v-else
            v-model="logistics.no"
            placeholder="请输入"
            type="text"
            maxlength="50"
          ></el-input>
        </div>
        <div class="first-item">
          <label class="item-label">收货方式：</label>
          <span class="item-span" v-if="!isEdit">{{ filterWay(logistics.way) }}</span>
          <el-select class="max-width" v-else v-model="logistics.way">
            <el-option
              v-for="item in wayStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="first-item">
          <label class="item-label" style="min-width:108px">备注(采购员等)：</label>
          <span
            class="item-spanspecial"
            v-if="!isEdit"
            :title="logistics.remark"
          >{{ logistics.remark || '--' }}</span>
          <el-input
            v-else
            type="textarea"
            :rows="4"
            v-model="logistics.remark"
            placeholder="请输入"
            maxlength="200"
          ></el-input>
        </div>
      </div>
      <div v-if="imgPagePath.includes($route.path)">
        <div class="first-item">
          <label class="item-label">物流单号：</label>
          <span class="item-span" v-if="!isEdit">{{ logistics.lno || '--' }}</span>
          <el-input
            class="max-width"
            v-else
            v-model="logistics.lno"
            placeholder="请输入"
            type="text"
            maxlength="50"
          ></el-input>
        </div>
        <div class="first-item">
          <label class="item-label">发货日期：</label>
          <span
            class="item-span"
            v-if="!isEdit"
          >{{ logistics.sdate ? formatDate(logistics.sdate) : '--' }}</span>
          <el-date-picker
            class="max-width"
            v-else
            v-model="logistics.sdate"
            type="date"
            format="yyyy-MM-dd"
            placeholder="请选择"
          ></el-date-picker>
        </div>
        <div class="first-item">
          <label class="item-label">发货方式：</label>
          <span class="item-span" v-if="!isEdit">{{ filterWay(logistics.sway) }}</span>
          <el-select class="max-width" v-else v-model="logistics.sway" clearable>
            <el-option
              v-for="item in wayStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="first-item">
          <label class="item-label min-widthspcial">备注：</label>
          <span
            class="item-spanspecial"
            v-if="!isEdit"
            :title="logistics.remark"
          >{{ logistics.remark || '--' }}</span>
          <el-input
            v-else
            type="textarea"
            :rows="1"
            v-model="logistics.remark"
            placeholder="请输入"
            maxlength="200"
          ></el-input>
        </div>
        <div class="first-item adjust">
          <label class="item-label min-widthspcial">图片：</label>
          <span v-if="!isEdit">
            <span v-if="imgSpanFlag">--</span>
          </span>
          <el-upload
            ref="uploadRef"
            action="/om-yh/outbound/upload"
            list-type="picture-card"
            multiple
            :limit="5"
            :headers="{
              Authorization : `Bearer ${token}`
            }"
            :file-list="fileList"
            :before-upload="handlePictureBeforeUpload"
            :on-success="handlePictureUploadSuccess"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :disabled="!isEdit"
            :on-exceed="handleExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" append-to-body>
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Store from "@/store";
import moment from "moment";

import { editReceiptLog, saveLogisticsRecord } from "@/api/api";
export default {
  data() {
    return {
      isEdit: false,
      imgSpanFlag: false,
      token: Store.state.common.token,
      dialogImageUrl: "",
      fileList: [],
      dialogVisible: false,
      addImagIconShow: false,
      wayStatus: {
        1: { label: "到付", value: 1 },
        2: { label: "寄付", value: 2 },
      },
      logistics: {},
      imgPagePath: [
        "/outbound/delivery/work",
        "/outbound/delivery/finished",
        "/outbound/delivery/sale",
        "/outbound/delivery/other",
      ],
    };
  },
  props: {
    plogistics: {
      type: Object,
      default: () => {},
    },
    rbid: {
      type: Number | String,
      deffault: "",
    },
  },
  computed: {
    ...mapState({
      row: (state) => state.expand.row,
    }),
  },
  watch: {
    plogistics: {
      handler: function (val) {
        this.logistics = {
          ...val,
        };
        if (val.picture.length === 0) {
          this.imgSpanFlag = true;
        } else {
          this.imgSpanFlag = false;
        }
        this.fileList = val.picture
          ? val.picture.map((item) => ({
              url: item,
              response: {
                data: item,
              },
            }))
          : [];
      },
      deep: true,
    },

    isEdit: function (val) {
      if (val && this.fileList.length < 5) {
        this.$refs.uploadRef
          ? (this.$refs.uploadRef.$children[1].$el.style.display = "")
          : "";
      } else {
        this.$refs.uploadRef
          ? (this.$refs.uploadRef.$children[1].$el.style.display = "none")
          : "";
      }
    },
  },
  mounted() {
    this.$refs.uploadRef
      ? (this.$refs.uploadRef.$children[1].$el.style.display = "none")
      : "";
    this.isEdit = false;
    this.imgSpanFlag = false;
  },
  destroyed() {
    this.isEdit = false;
    this.imgSpanFlag = false;
  },
  methods: {
    async actions() {
      // 特殊-物流传输图片
      if (this.imgPagePath.includes(this.$route.path)) {
        if (this.isEdit) {
          const { oid = "" } = this.row;
          const picture = this.fileList.map((item) => item.response.data);
          const params = {
            ...this.logistics,
            sdate: this.logistics.sdate
              ? moment(this.logistics.sdate).format("YYYY-MM-DD HH:mm:ss")
              : "",
            oid,
            picture,
          };
          try {
            if (!params.lno) {
              this.$message.warning("请输入物流单号");
              return;
            }
            if (!params.sdate) {
              this.$message.warning("请选择发货日期");
              return;
            }
            if (!params.sway) {
              this.$message.warning("请选择发货方式");
              return;
            }
            await saveLogisticsRecord(params);
            this.$message.success("保存成功");
            this.$emit("update");
            this.isEdit = !this.isEdit;
          } catch (e) {}
        } else {
          this.isEdit = !this.isEdit;
        }
        return;
      }
      // 正常
      if (this.isEdit) {
        const params = {
          ...this.logistics,
          rbid: this.rbid,
        };
        try {
          await editReceiptLog(params);
          this.$message.success("保存成功");
          this.$emit("update");
          this.isEdit = false;
        } catch (e) {}
      } else {
        this.isEdit = !this.isEdit;
      }
    },
    handleExceed(file, fileList) {
      this.$message.warning("不可上传多于5张的图片");
      console.log("fileList:", fileList.length);
    },
    handlePictureBeforeUpload(file) {
      const { size = 0 } = file;
      console.log("length::", file);
      if (size > 6291456) {
        this.$message.error("上传图片不能超过6M！");
        return false;
      }
    },
    // 上传成功
    handlePictureUploadSuccess(response, file, fileList) {
      if (fileList.length === 5) {
        this.$refs.uploadRef
          ? (this.$refs.uploadRef.$children[1].$el.style.display = "none")
          : "";
      }
      this.fileList = [...fileList];
    },

    // 删除图片
    handleRemove(file, fileList) {
      if (fileList.length < 5) {
        this.$refs.uploadRef
          ? (this.$refs.uploadRef.$children[1].$el.style.display = "")
          : "";
      }
      this.fileList = [...fileList];
    },
    // 查看图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    cancel() {
      this.logistics = {
        ...this.plogistics,
      };
      this.isEdit = !this.isEdit;
      this.$emit("update");
    },
    filterWay(way) {
      if (way) {
        return this.wayStatus[way].label;
      } else {
        return "--";
      }
    },
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
  },
};
</script>

<style lang="less" scoped>
.my-first {
  position: relative;
  .btns {
    position: absolute;
    right: 0;
    top: -52px;
    z-index: 9999;
  }
  .content {
    display: flex;
    flex-direction: column;
    .first-item {
      font-size: 14px;
      line-height: 32px;
      color: #222;
      margin-bottom: 12px;
      display: flex;
      .min-width {
        min-width: 108px;
      }
      .min-widthspcial {
        min-width: 42px;
      }

      .max-width {
        max-width: 280px;
        & /deep/ .el-input__inner {
          // padding-right: 45px !important;
        }
      }
      .item-span {
        word-break: break-all;
      }
      .item-spanspecial {
        overflow: hidden;
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .item-spanspecial:hover {
        white-space: nowrap;
      }
    }
  }
}
/deep/ .el-textarea__inner {
  font-family: Arial;
  font-size: 14px;
}

/deep/ .el-upload-list--picture-card .el-upload-list__item {
  height: 80px;
  width: 80px;
}
/deep/ .el-upload--picture-card {
  height: 80px;
  width: 80px;
  line-height: 90px;
}
</style>
