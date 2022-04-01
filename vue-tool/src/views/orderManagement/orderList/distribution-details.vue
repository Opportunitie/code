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
        <el-table-column prop="utime" label="更新时间"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button v-rules="29" @click="handleChangeRoute(scope.row)" type="text" size="small"
              >更换配货员</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="mypagination" style="height: 24px">
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination> -->
    </div>
    <el-dialog
      title="更改配货员"
      :visible.sync="editVisiable"
      width="480px"
      :before-close="handleClose"
    >
      <el-form
        :model="editForm"
        :rules="editRule"
        label-width="110px"
        ref="editForm"
        label-suffix="："
      >
        <el-form-item label="原配货员">
          <span>{{ currentDname }}</span>
        </el-form-item>
        <el-form-item label="新配货员" prop="disid">
          <el-select
            clearable
            v-model="editForm.disid"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="item in distributorOptions"
              :key="item.did"
              :label="item.diname"
              :value="item.did"
              :disabled="item.diname === currentDname"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div style="line-height: 24px; padding-left: 16px; color: #ff9900">
        本次修改属于临时修改，不会影响该客户的绑定配货员。
        如果需要长期更换，请前往客户管理修改该客户的配货员。
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
  fetchDistributionDetail,
  updateDistributor, // 更改配货员
  distributionDetailsExport,
} from "@/api/distributetApi";
import { fetchAllDistributor } from "@/api/orderMgrApi";
export default {
  name: "distribution-details",
  components: {
    "fake-table": FakeTable,
    BottomBar,
  },
  data() {
    return {
      borderFlag: true,
      editVisiable: false,
      loading: false,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      currentDname: "", // 当前线路
      currentDownName: "", // 下载文档的名字
      editOno: "",
      linesList: [], //所有的线路集合
      distributorOptions: [], // 配货员集合
      baseDetailsItemsList: [],
      htime: "", // 交付日期
      disid: "",
      hdate: "",
      heardList: [],
      tableData: [],
      htime: "",
      editForm: {
        disid: "",
        ono: "",
      },
      editRule: {
        disid: [
          {
            required: true,
            message: "请选择新配货员",
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
                rules: 43,
                text: "查询",
                fn: (row) => {
                  this.pageState.pageNum = 1;
                  this.search(row);
                },
              },
              {
                type: "",
                text: "重置",
                event: "reset",
                fn: (row) => {
                  this.reset(row);
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
    const { did, hdate } = this.$route.query;
    this.disid = did;
    this.hdate = hdate;
    this.init();
  },
  methods: {
    async init() {
      this.loading = true;
      await Promise.all([
        this.getAllDistributor(),
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
      console.log("当前表头查询是：", this.heardList.length);
      const headLen = this.heardList.length + 3;
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        if (index === 1) {
          return;
        }
        if (index === headLen) {
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        // console.log("打印一下表格求和：values==》", values);
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
          // sums[index] += " 元";
        } else {
          // sums[index] = "N/A";
        }
      });

      return sums;
    },
    async handleExport() {
      try {
        const params = {
          disid: this.disid,
          hdate: this.hdate,
        };
        await distributionDetailsExport(params, this.currentDownName);
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
          await updateDistributor(params);
          this.$message.success("修改成功!");
          this.init();
          this.$refs["editForm"].resetFields();
          this.editVisiable = false;
        } else {
          console.log("errror submit");
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTableList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getTableList();
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
    async getAllDistributor() {
      try {
        const res = await fetchAllDistributor();
        console.log("配货员idd: ", res);
        if (res.length > 0) {
          this.distributorOptions = res.map((item) => {
            return {
              did: item.did,
              diname: item.diname,
              diphone: item.diphone,
            };
          });
        }
        console.log("distributorOptions:", res.data);
      } catch (e) {}
    },

    async getTableList() {
      const params = {
        disid: parseInt(this.disid),
        hdate: this.hdate,
        ...this.searchForm,
      };
      try {
        const res = await fetchDistributionDetail(params);

        const { list = [], detail = {} } = res;
        const { htime, dname, onumber, cnum } = detail;
        this.currentDname = detail.dname; // 当前线路名字
        this.currentDownName = "配货表-" + dname + "-" + htime.split("-").join("");
        this.baseDetailsItemsList = [
          {
            label: "交付日期",
            value: htime,
          },
          {
            label: "配货员",
            value: dname,
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
        // this.pageState = {
        //   total: res.total,
        // };
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
