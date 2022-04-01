<template>
  <div class="substitute-order" v-loading="loading">
    <el-form
      ref="substituteFormRule"
      :model="substituteForm"
      :rules="substituteRules"
      label-width="170px"
      label-suffix="："
    >
      <div class="item-box">
        <h1>客户信息</h1>
        <el-form-item label="客户名称" prop="clid">
          <el-select v-model="substituteForm.clid" filterable placeholder="请选择客户">
            <el-option
              v-for="item in clientOptions"
              :label="item.cname"
              :key="item.clid"
              :value="item.clid"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户类型">
          <span>{{ ctype }}</span>
        </el-form-item>
      </div>

      <div class="item-box">
        <div class="commodity-list">
          <div class="top">
            <div class="each-title">商品列表</div>
            <div>
              <el-button type="primary" @click="handleAddToCart">添加商品</el-button>
            </div>
          </div>
          <div class="total-info" style="display: flex; margin-left: 8px">
            <div class="each-item">
              <span class="title">数量总计：</span
              ><span class="value" style="color: #1677ff">{{ currentTotalPnum }}</span>
            </div>
            <div class="each-item" style="margin-left: 24px">
              <span class="title">应付金额：</span
              ><span class="value" style="color: #ff6010">￥{{ currentTotalMoney }}</span>
            </div>
          </div>
          <div class="commodity-table">
            <el-table :data="commodityList" style="width: 100%">
              <el-table-column type="index" label="序号" width="50"> </el-table-column>
              <el-table-column prop="mthumb" label="商品主图" width="180">
                <template slot-scope="scope">
                  <div style="display: flex; align-content: center">
                    <img :src="scope.row.mthumb" style="width: 43px; height: 32px" />
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="cname" label="商品名称" width="180">
              </el-table-column>
              <el-table-column prop="ccode" label="商品编号" width="180">
              </el-table-column>
              <el-table-column prop="pnum" label="数量" width="180">
                <template v-slot="{ row }">
                  <div
                    class="adjust-munit"
                    :class="[row.pnum > row.lnum ? 'redClass' : '']"
                  >
                    <el-input-number
                      :min="0"
                      v-model="row.pnum"
                      @change="(cur, old) => handleNumChange(row, cur, old)"
                      placeholder="请输入"
                      style="width: 84%"
                    />
                    <el-tooltip
                      class="item"
                      effect="light"
                      content="库存不足"
                      placement="top-start"
                      v-if="row.pnum >= row.lnum"
                    >
                      <span>
                        <i
                          class="el-icon-warning-outline"
                          style="color: red; margin-left: 4px"
                        ></i>
                      </span>
                    </el-tooltip>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="cunit" label="单位"> </el-table-column>
              <el-table-column prop="uprize" label="单价"> </el-table-column>
              <el-table-column prop="total" label="金额小计(元)">
                <template v-slot="{ row }">
                  <div class="adjust-munit">
                    <span>{{ (row.pnum * row.uprize) | numFormat }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" fixed="right" width="240">
                <template slot-scope="scope">
                  <el-button
                    @click="handleDeleteCartItem(scope.$index)"
                    type="text"
                    size="small"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>

      <div class="item-box">
        <h1>配货信息</h1>
        <el-row>
          <el-col :span="8">
            <el-form-item label="交付日期" prop="htime">
              <!-- <el-input v-model="formData.sdate" placeholder="请输入"></el-input> -->
              <el-date-picker
                v-model="substituteForm.htime"
                style="width: 100%"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="配货员" prop="did">
              <!-- <el-input v-model="formData.rway" placeholder="请输入"></el-input> -->
              <el-select
                clearable
                v-model="substituteForm.did"
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in distributorOptions"
                  :key="item.did"
                  :label="item.diname"
                  :value="item.did"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="线路" prop="lid">
              <!-- <el-input v-model="formData.rway" placeholder="请输入"></el-input> -->
              <el-select
                clearable
                v-model="substituteForm.lid"
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in linesList"
                  :key="item.lid"
                  :label="item.lname"
                  :value="item.lid"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="司机"> {{ currentDriver || "--" }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="装卸工"> {{ currentZhuangxie || "--" }}</el-form-item>
          </el-col>
        </el-row>
      </div>

      <div class="item-box">
        <h1>其他信息</h1>
        <el-row>
          <el-col :span="24">
            <el-form-item label="订单备注(仅用户可见)">
              <el-input
                type="textarea"
                v-model="substituteForm.cremark"
                placeholder="请输入"
                rows="4"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="后台备注(仅后台可见)">
              <el-input
                type="textarea"
                v-model="substituteForm.remark"
                placeholder="请输入"
                rows="4"
                maxlength="200"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <el-dialog
        title="提交订单"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <span style="line-height: 24px">是否确定提交订单？</span>
        <br />
        <span v-if="!checkInventoryFlag" style="color: #ff6600; line-height: 24px"
          >订单中部分商品存在库存不足的情况，请联系生产主管确认。</span
        >
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitOrder">确 定</el-button>
        </span>
      </el-dialog>

      <my-drawer :drawer="drawer" @close="closeDrawer" title="添加商品" size="920px">
        <div class="drawer-content">
          <add-commodity
            v-if="drawer"
            :queryParams="queryParams"
            @getCommodity="addToTable"
            @setCloseDrawer="closeDrawer"
          />
        </div>
      </my-drawer>
    </el-form>
    <bottom-bar>
      <el-button @click="goBack">返回</el-button>
      <el-button type="primary" @click="tijiao">提交</el-button>
    </bottom-bar>
  </div>
</template>
<script>
import moment from "moment";
import BottomBar from "@c/bottomBar";
import MyDrawer from "@c/myDrawer";
import AddCommodity from "./sdxAddCommodity";
import { mapActions } from "vuex";
import {
  fetchAllClient,
  fetchAllDistributor,
  fetchAllLines,
  commitOrder,
  checkInventory,
  // fetchAllClientList,
} from "@/api/orderMgrApi";
import { fetchAllClientList } from "@/api/clientList.js";
export default {
  name: "substituteOrder",
  components: {
    "my-drawer": MyDrawer,
    "add-commodity": AddCommodity,
    BottomBar,
  },
  data() {
    return {
      drawer: false,
      ctype: "--",
      dialogVisible: false,
      checkInventoryFlag: true,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 3600 * 1000;
        },
      },
      substituteForm: {
        htime: moment(Date.now() + 24 * 3600 * 1000).format("YYYY-MM-DD"),
        clid: "",
        did: "",
        lid: "",
        remark: "",
        cremark: "",
      },
      loading: false,
      queryParams: {
        ucode: "",
      }, // 传给子组件的查询参数
      commodityList: [], // 商品集合
      clientOptions: [], // 客户集合
      distributorOptions: [], // 配货员集合
      linesList: [], // 线路集合
      currentTotalPnum: 0,
      currentTotalMoney: 0,
      currentDriver: "",
      currentZhuangxie: "",
      substituteRules: {
        clid: [
          {
            required: true,
            message: "请选择客户",
            trigger: ["blur", "change"],
          },
        ],
        htime: [
          {
            required: true,
            message: "请选择交付日期",
            trigger: ["change"],
          },
        ],
        did: [
          {
            required: true,
            message: "请选择配货员",
            trigger: ["change"],
          },
        ],
        lid: [
          {
            required: true,
            message: "请选择线路",
            trigger: ["change"],
          },
        ],
      },
    };
  },
  filters: {
    numFormat(val) {
      if (!isNaN(val)) {
        return val.toFixed(2);
      } else {
        return "--";
      }
    },
  },
  created() {
    this.init();
  },
  watch: {
    "substituteForm.clid": {
      handler(newVal, oldVal) {
        console.log("newVal: ", newVal, "oldValue", oldVal);
        let objClient = this.clientOptions.filter((item) => {
          return item.clid === newVal;
        })[0];

        this.commodityList = []; // 清空原来的
        this.setDxCommodityList(this.commodityList);
        this.ctype = objClient.ctype;
        console.log("打印当前查找对象：", objClient);
        this.queryParams = {
          ucode: objClient.ucode,
        };
        this.substituteForm.did = objClient.did;
        this.substituteForm.lid = objClient.lid;
      },
      deep: true,
    },

    "substituteForm.lid": {
      handler(newVal, oldVal) {
        let objLine = this.linesList.filter((item) => {
          return item.lid === newVal;
        })[0];
        this.currentDriver = `${objLine.drname || "--"}(手机号码：${
          objLine.drmobile || "--"
        })`;
        this.currentZhuangxie = objLine.doname;
      },
      deep: true,
    },
    commodityList: {
      handler(newVal, oldVal) {
        if (newVal.length) {
          this.currentTotalPnum = newVal
            .reduce(function (pre, cur) {
              return pre + cur.pnum;
            }, 0)
            .toFixed(0)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.currentTotalMoney = newVal
            .reduce(function (pre, cur) {
              return pre + cur.pnum * cur.uprize;
            }, 0)
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
          this.currentTotalPnum = 0;
          this.currentTotalMoney = 0;
        }
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions(["setDxCommodityList"]),
    async init() {
      this.loading = true;
      this.setDxCommodityList([]);
      await Promise.all([
        this.getAllClient(),
        this.getAllDistributor(),
        this.getAllLines(),
      ]).then((res) => {
        this.loading = false;
      });
    },
    addToTable(val) {
      console.log("子组件过来的数据是傻逼：", val);

      // for (let i = 0; i < val.length; i++) {
      //   let commodityIndex = this.commodityList.findIndex((item) => {
      //     return item.ccode === val[i].ccode;
      //   });
      //   if (commodityIndex >= 0) {
      //     this.commodityList[commodityIndex].pnum = val[i].pnum;
      //   } else {
      //     this.commodityList.unshift({ ...val[i] });
      //   }
      // }
      this.commodityList = [];
      for (let i = 0; i < val.length; i++) {
        // let commodityIndex = this.commodityList.findIndex((item) => {
        //   return item.ccode === val[i].ccode;
        // });
        // if (commodityIndex >= 0) {
        //   this.commodityList[commodityIndex].pnum = val[i].pnum;
        // } else {
        //   this.commodityList.unshift({ ...val[i] });
        // }
        this.commodityList.unshift({ ...val[i] });
      }
      this.commodityList = this.commodityList.map((item) => {
        return {
          ...item,
          deleted: false,
        };
      });

      this.setDxCommodityList(this.commodityList);
    },
    handleDeleteCartItem(index) {
      this.$confirm("是否确定要删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          this.commodityList.splice(index, 1);
          this.setDxCommodityList(this.commodityList);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    handleNumChange(row, cur, old) {
      if (row.pnum < row.mquantity) {
        this.$confirm(
          "已经是最小起订量，将减少至0。是否确认将该商品从列表中删除？",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            closeOnClickModal: false,
            closeOnPressEscape: false,
          }
        )
          .then(async () => {
            console.log("要删除的行是： ", row);
            // this.handleDeleteCartItem(row);
            let deleteIndex = this.commodityList.findIndex((item) => {
              return item.cid === row.cid;
            });

            this.commodityList.splice(deleteIndex, 1);
            this.setDxCommodityList(this.commodityList);
          })
          .catch(() => {
            row.pnum = old;
          });
      }
      this.setDxCommodityList(this.commodityList);
    },

    async tijiao() {
      const checkParams = this.commodityList.map((item) => {
        return {
          cid: item.cid,
          pnum: item.pnum,
        };
      });

      const checkFlag = await checkInventory(checkParams);
      console.log("代下单校验执行了checkFlag==>：", checkFlag);
      this.checkInventoryFlag = checkFlag;
      this.dialogVisible = true;
    },

    handleClose() {
      this.dialogVisible = false;
    },
    submitOrder() {
      this.$refs["substituteFormRule"].validate(async (valid) => {
        if (valid) {
          if (this.commodityList.length === 0) {
            this.$message.error("请添加商品");
            return;
          }

          const zeroFlag = this.commodityList.some((item) => {
            return item.pnum === 0;
          });

          if (zeroFlag) {
            this.$message.error("购买商品不能小于起订量");
            return;
          }

          const params = {
            ...this.substituteForm,
            htime: moment(this.substituteForm.htime).format("YYYY-MM-DD"),
            otype: "2",
            dtos: this.commodityList
              .filter((item) => {
                return item.pnum > 0;
              })
              .map((item) => {
                return {
                  cid: item.cid,
                  pnum: item.pnum,
                };
              }),
          };
          console.log("打印当前提交的参数：", params);
          await commitOrder(params);
          this.$message.success("提交成功");
          this.$router.go(-1);
          // this.init();
        } else {
          console.log("errror submit");
        }
      });
    },

    goBack() {
      this.$router.go(-1);
    },
    handleAddToCart() {
      if (this.queryParams.ucode) {
        this.drawer = true;
      } else {
        this.$message.warning("请先选择客户名称");
      }
    },
    closeDrawer() {
      this.drawer = false;
    },
    async getAllLines() {
      try {
        const res = await fetchAllLines();
        if (res.data.length > 0) {
          this.linesList = res.data.map((item) => {
            return {
              // lid: item.lid,
              // lname: item.lname,
              // diphone: item.diphone,
              // doname: item.doname,
              // drmobile: item.drmobile,
              ...item,
            };
          });
        }
        console.log("distributorOptions:", res.data);
      } catch (e) {}
    },

    async getAllDistributor() {
      try {
        const res = await fetchAllDistributor();
        if (res.length > 0) {
          this.distributorOptions = res.map((item) => {
            return {
              // did: item.did,
              // diname: item.diname,
              // diphone: item.diphone,
              ...item,
            };
          });
        }
        console.log("distributorOptions:", res.data);
      } catch (e) {}
    },

    async getAllClient() {
      try {
        // const res = await fetchAllClient();
        const params = {
          astatus: 1,
          status: 1,
        };
        const res = await fetchAllClientList(params);
        console.log("代下单客户：", res);
        if (res.length > 0) {
          this.clientOptions = res.map((item) => {
            // return {
            //   clid: item.clid,
            //   cname: item.cname,
            //   ctype: item.ctype,
            //   did: item.did,
            //   lid: item.lid,
            // };
            return {
              ...item,
            };
          });
        }
      } catch (e) {}
    },
  },
};
</script>

<style lang="less" scoped>
.redClass /deep/ .el-input__inner {
  color: orange;
}
.item-box {
  background: #fff;
  border-radius: 2px;
  padding: 20px;
  margin-bottom: 20px;
  h1 {
    // width: 96px;
    height: 21px;
    font-size: 16px;
    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.85);
    line-height: 21px;
    margin-bottom: 20px;
  }
}
.total-info {
  font-family: MicrosoftYaHei;
  .each-item {
    height: 24px;
    .title {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
    }
    .value {
      font-size: 18px;
      font-weight: bolder;
    }
  }
}
.each-title {
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.85);
  line-height: 34px;
}
.substitute-order {
  .commodity-list {
    .top {
      display: flex;
      justify-content: space-between;
      line-height: 34px;
      padding: 4px 12px;
      // border-bottom: 1px solid #e8e8e8;
    }
    .commodity-table {
      margin-top: 16px;
    }
  }
  .distribution-info {
    .top {
      display: flex;
      justify-content: flex-start;
      line-height: 34px;
      padding: 4px 12px;
      border-bottom: 1px solid #e8e8e8;
    }
  }
  .other-info {
    .top {
      display: flex;
      justify-content: flex-start;
      line-height: 34px;
      padding: 4px 12px;
      border-bottom: 1px solid #e8e8e8;
    }
  }
}
</style>
