<template>
  <div class="delivery-route-details" v-loading="loading">
    <div class="details" style="margin-bottom: 8px">
      <fake-table :itemsList="baseDetailsItemsList" />
    </div>
    <div class="my-form">
      <ajax-form :formData="formData"></ajax-form>
    </div>
    <div class="my-table">
      <el-table
        :data="tableData"
        style="width: 100%"
        :summary-method="getSummaries"
        show-summary
      >
        <el-table-column type="index" label="序号" width="50"> </el-table-column>
        <el-table-column prop="ctag" label="客户标签" width="82"> </el-table-column>
        <el-table-column prop="cname" label="客户名称"> </el-table-column>
        <el-table-column label="商品明细">
          <el-table-column
            v-for="(item, index) in heardList"
            :prop="item.value"
            :label="item.label"
            :key="index"
          >
          </el-table-column>
        </el-table-column>
        <el-table-column prop="dname" label="配送员" width="68"> </el-table-column>
        <el-table-column prop="utime" label="更新时间" width="160"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleChangeRoute(scope.row)" type="text" size="small"
              >更换线路</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="mypagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div> -->
    <el-dialog title="更改线路" :visible.sync="editVisiable" width="480px">
      <el-form
        :model="editForm"
        :rules="editRule"
        label-width="96px"
        ref="editForm"
        label-suffix="："
      >
        <el-form-item label="原线路">
          <span>{{ currentLname }}</span>
        </el-form-item>
        <el-form-item label="新线路" prop="lid">
          <el-select
            clearable
            v-model="editForm.lid"
            placeholder="请选择"
            style="width: 75%"
          >
            <el-option
              v-for="item in linesList"
              :key="item.lid"
              :label="item.lname"
              :value="item.lid"
              :disabled="item.lname === currentLname"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div style="line-height: 24px; padding-left: 24px; color: #ff9900">
        本次修改属于临时修改，不会影响该客户的绑定线路。
        如果长期更换，请前往客户管理修改该客户的线路信息。
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit('editForm')">确 定</el-button>
      </span>
    </el-dialog>
    <bottom-bar>
      <el-button @click="goBack">返回</el-button>
    </bottom-bar>
  </div>
</template>

<script>
import BottomBar from "@c/bottomBar";
import FakeTable from "@c/fakeTable";
import expandMixins from "@/mixins/expand";
import {
  fetchDeliveryDtail,
  fetchAllLineList,
  fetchHeaderInfo,
  updateDeliveryLine,
  xianluDetailsExport, // 导出
} from "@/api/distributetApi";
export default {
  name: "delivery-route-details",
  components: {
    "fake-table": FakeTable,
    BottomBar,
  },
  data() {
    return {
      lid: "",
      exportExcelName: "", // 导出文件名字
      borderFlag: true,
      editVisiable: false,
      loading: false,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      currentLname: "", // 当前线路
      editOno: "",
      linesList: [], //所有的线路集合
      baseDetailsItemsList: [],
      htime: "", // 交付日期
      heardList: [],
      tableData: [],
      htime: "",
      editForm: {
        lid: "",
        ono: "",
      },
      editRule: {
        lid: [
          {
            required: true,
            message: "请选择新线路",
            trigger: ["blur", "change"],
          },
        ],
      },

      formData: {
        id: "searchForm",
        inline: true,
        arr: [
          {
            label: "客户标签：",
            type: "input",
            key: "ctag",
            placeholder: "请输入",
            width: "82px",
          },
          {
            label: "客户名称：",
            type: "input",
            key: "cname",
            placeholder: "请输入",
            width: "82px",
          },
          {
            label: "",
            type: "button",
            key: "",
            handles: [
              {
                type: "primary",
                rules: 46,
                text: "查询",
                fn: (row) => {
                  this.search(row);
                },
              },
              {
                type: "",
                text: "重置",
                event: "reset",
                fn: (row) => {
                  this.reset(row);
                  this.search(row);
                },
              },
              {
                type: "",
                text: "导出",
                event: "reset",
                rules: 30,
                fn: (row) => {
                  this.handleExport();
                },
              },
            ],
          },
        ],
      },
    };
  },
  mixins: [expandMixins],
  created() {
    const { lid, htime } = this.$route.query;
    this.lid = lid;
    this.htime = htime;
    this.init();
  },
  methods: {
    async init() {
      this.loading = true;
      await Promise.all([
        this.getAllLines(),
        this.getHeaderInfo(),
        this.getTableList(),
      ]).then((res) => {
        this.loading = false;
      });
    },
    goBack() {
      this.$router.go(-1);
    },

    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        if (index === 1) {
          sums[index] = "";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          if (sums[index] === 0) {
            sums[index] = "";
          }

        } else {
          sums[index] = "";
        }
      });
      return sums;
    },
    async handleExport() {
      try {
        const params = {
          lid: this.lid,
          hdate: this.htime,
        };
        await xianluDetailsExport(params, this.exportExcelName);
      } catch (e) {}
    },
    handleChangeRoute(row) {
      this.editForm.ono = row.ono;
      this.editVisiable = true;
    },
    handleClose() {
      this.$refs["editForm"].resetFields();
      this.editVisiable = false;
    },
    submit(forName) {
      this.$refs[forName].validate(async (valid) => {
        if (valid) {
          const params = {
            ...this.editForm,
          };
          await updateDeliveryLine(params);
          this.$message.success("修改成功!");
          this.init();
          this.$refs["editForm"].resetFields();
          this.editVisiable = false;
        } else {
          console.log("errror submit");
        }
      });
    },

    search(row) {
      this.searchForm = { ...row };
      this.getTableList();
    },
    async getHeaderInfo() {
      try {
        const res = await fetchHeaderInfo();
        if (res) {
          Object.keys(res).forEach((item) => {
            this.heardList.push({
              label: item,
              value: res[item],
            });
          });
        }
      } catch (e) {}
    },
    async getAllLines() {
      try {
        const res = await fetchAllLineList();
        if (res.length > 0) {
          this.linesList = res.map((item) => {
            return {
              lid: item.lid,
              lname: item.lname,
              diphone: item.diphone,
              doname: item.doname,
              drmobile: item.drmobile,
            };
          });
        }
      } catch (e) {}
    },

    async getTableList() {
      const params = {
        lid: parseInt(this.lid),
        hdate: this.htime,
        ...this.searchForm,
      };
      try {
        const res = await fetchDeliveryDtail(params);

        const { list = [], detail = {} } = res;
        const { htime, lname, drname, doname, onumber, cnum } = detail;
        this.currentLname = detail.lname; // 当前线路名字
        this.exportExcelName = "送货表-" + lname + "-" + htime.split("-").join("");
        this.baseDetailsItemsList = [
          {
            label: "交付日期",
            value: htime,
          },
          {
            label: "线路名称",
            value: lname,
          },
          {
            label: "司机",
            value: drname,
          },
          {
            label: "装卸工",
            value: doname,
          },
          {
            label: "订单数",
            value: onumber,
          },
          {
            label: "商品总件数",
            value: cnum,
          },
        ];
        this.tableData = list.map((item) => {
          return {
            ...item,
          };
        });

        this.total = list.length;
        // this.loading = false;
      } catch (e) {
      } finally {
      }
    },
  },
};
</script>
<style lang="less" scoped>
.mypagination {
  margin-top: 8px;
  display: flex;
  justify-content: flex-end;
}
</style>
