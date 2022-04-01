<template>
  <div class="edit-order" v-loading="loading">
    <!-- <div class="item-box">
      <h1>订单信息</h1>
      <div class="myfaketable">
        <fake-table :itemsList="baseItemList" />
      </div>
    </div> -->

    <div class="item-box">
      <div class="myfaketable">
        <fake-table :itemsList="baseItemList" />
      </div>
      <div class="" style="display: flex; justify-content: space-between">
        <div class="each-title">商品列表</div>
        <div>
          <el-button v-rules="41" type="primary" @click="handleAddToCart"
            >添加商品</el-button
          >
        </div>
      </div>
      <div class="commodity-table">
        <div class="total-info" style="display: flex">
          <div class="each-item">
            <span class="title">数量总计：</span
            ><span class="value" style="color: #1677ff">{{ currentTotalPnum }}</span>
          </div>
          <div class="each-item" style="margin-left: 24px">
            <span class="title">应付金额：</span
            ><span class="value" style="color: #ff6010">￥{{ currentTotalMoney }}</span>
          </div>
        </div>
        <el-table :data="realCommodityTable" style="width: 100%">
          <el-table-column type="index" label="序号" width="50"> </el-table-column>
          <el-table-column prop="mthumb" label="商品主图" width="180">
            <template slot-scope="scope">
              <div style="display: flex; align-content: center">
                <img :src="scope.row.mthumb" style="width: 43px; height: 32px" />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="cname" label="商品名称" width="180"> </el-table-column>
          <el-table-column prop="ccode" label="商品编号" width="180"> </el-table-column>
          <el-table-column prop="pnum" label="数量" width="180">
            <template v-slot="{ row }">
              <div class="adjust-munit" :class="[row.pnum > row.lnum ? 'redClass' : '']">
                <el-input-number
                  :min="0"
                  v-model="row.pnum"
                  placeholder="请输入"
                  style="width: 84%"
                  @change="(cur, old) => handleNumChange(row, cur, old)"
                />

                <el-tooltip
                  class="item"
                  effect="light"
                  content="库存不足"
                  placement="top-start"
                  v-if="row.pnum > row.lnum"
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
                @click="handleDeleteCartItem(scope.row, scope.$index)"
                type="text"
                size="small"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="item-box">
      <h1>收货信息</h1>
      <div class="myfaketable">
        <fake-table :itemsList="deliveryItemList" />
      </div>
    </div>
    <el-form
      ref="substituteFormRule"
      :model="substituteForm"
      :rules="substituteRules"
      label-width="170px"
      label-suffix="："
    >
      <div class="item-box">
        <h1>配货信息</h1>

        <div class="distribution-info" style="margin-top: 24px">
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
              <el-form-item label="司机"> {{ currentDriver }}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="装卸工"> {{ currentZhuangxie || "--" }}</el-form-item>
            </el-col>
          </el-row>
        </div>
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

        <el-row>
          <el-col :span="24">
            <el-form-item label="核算单位"> {{ aunit }} </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="金蝶同步结果"> {{ asyncResult }} </el-form-item>
        </el-row>
      </div>
    </el-form>
    <my-drawer :drawer="drawer" @close="closeDrawer" title="添加商品" size="840px">
      <div class="drawer-content">
        <!-- v-if="drawer" -->
        <add-commodity
          :queryParams="queryParams"
          @getCommodity="addToTable"
          @setCloseDrawer="closeDrawer"
          v-if="drawer"
          ref="myChild"
        />
      </div>
    </my-drawer>
    <el-dialog
      title="修改订单"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleTishiClose"
    >
      <span style="line-height: 24px">是否确定修改此订单？</span>
      <br />
      <span v-if="!checkInventoryFlag" style="color: #ff6600; line-height: 24px"
        >部分商品存在库存不足的情况，请联系生产主管确认是否可添加。</span
      >
      <!-- dialogVisible = false;
            AgainVisible = true; -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitOrder">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改订单" :visible.sync="AgainVisible" width="30%">
      <span style="line-height: 24px">是否确定修改此订单？</span>
      <br />
      <span slot="footer" class="dialog-footer">
        <el-button @click="AgainVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitOrder">确 定</el-button>
      </span>
    </el-dialog>

    <bottom-bar>
      <el-button @click="goBack">返回</el-button>
      <el-button v-rules="42" type="primary" @click="saveUpdateOrder">保存</el-button>
      <!-- <el-button type="primary" @click="submitOrder">保存</el-button> -->
    </bottom-bar>
  </div>
</template>
<script>
import moment from "moment";
import BottomBar from "@c/bottomBar";
import MyDrawer from "@c/myDrawer";
import FakeTable from "@c/fakeTable";
import AddCommodity from "./addCommodity";
import { getReceiptList, deleteBatchReceipt } from "@/api/api";
import { mapActions } from "vuex";
import {
  fetchAllClient,
  fetchAllDistributor,
  fetchAllLines,
  fetchAllLinesList,
  fetchOrderDetails,
  fetchEditCommodityList, // 获取修改订单添加商品的列表查询
  updateEditOrder,
  checkInventory,
} from "@/api/orderMgrApi";
export default {
  name: "editOrder",
  components: {
    "fake-table": FakeTable,
    "my-drawer": MyDrawer,
    "add-commodity": AddCommodity,
    BottomBar,
  },
  provide() {
    return {
      myCommodityTableData: this,
    };
  },
  data() {
    return {
      oid: "",
      loading: false,
      sbNum: 0,
      updatgeTable: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 3600 * 1000;
        },
      },
      drawer: false,
      ostatusList: ["已提交", "已签收", "已作废"],
      baseItemList: [],
      deliveryItemList: [],
      ctype: "--",
      substituteForm: {
        htime: moment(Date.now() + 24 * 3600 * 1000).format("YYYY-MM-DD"),
        clid: "",
        did: null,
        lid: null,
        remark: "",
      },
      loading: false,
      realCommodityTable: [],
      oldCommodityList: [],
      oldCommodityCcodeList: [],
      commodityList: [], // 商品集合
      currentTotalPnum: 0,
      currentTotalMoney: 0,
      clientOptions: [], // 客户集合
      distributorOptions: [], // 配货员集合
      linesList: [], // 线路集合
      queryParams: {}, // 传给子组件的查询参数

      dialogVisible: false, // 保存提示
      checkInventoryFlag: true,
      AgainVisible: false,

      aunit: "", // 核算单位
      aresultList: ["", "未同步", "同步成功", "同步失败"],
      areason: "",
      aresult: "",
      asyncResult: "",

      currentDriver: "",
      currentZhuangxie: "",
      substituteForm: {
        htime: "",
        did: "",
        lid: "",
      },
      substituteRules: {
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
        return val
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else {
        return "--";
      }
    },
  },

  created() {
    const { oid } = this.$route.query;
    this.oid = oid;
    this.init();
  },
  watch: {
    "substituteForm.lid": {
      handler(newVal, oldVal) {
        let objLine = this.linesList.filter((item) => {
          return item.lid === newVal;
        })[0];
        // objLine.drname = null;
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
            .filter((item) => {
              return item.deleted === false;
            })
            .reduce(function (pre, cur) {
              return pre + cur.pnum;
            }, 0)
            .toFixed(0)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.currentTotalMoney = newVal
            .filter((item) => {
              return item.deleted === false;
            })
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
        this.realCommodityTable = this.commodityList.filter((item) => {
          return item.deleted == false;
        });
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions(["setCommodityList"]),
    async init() {
      this.loading = true;
      await this.getAllLines();
      await this.getAllDistributor();
      await this.getDetails();
      this.loading = false;
    },

    handleTishiClose() {
      this.dialogVisible = false;
    },

    addToCartV1(val) {
      console.log("新版本 子组件传递：", val);
      console.log("打印oldCommodity: ", this.oldCommodityList);
      this.commodityList = []; //原来的清空
      let valCopy = val.map((item) => {
        return {
          ...item,
        };
      });

      for (let i = 0; i < this.oldCommodityList.length; i++) {
        let findItem = this.oldCommodityList[i];
        let findIndex = val.findIndex((item) => {
          return item.cid === findItem.cid;
        });

        if (findIndex < 0) {
          findItem.deleted = true;
          valCopy.push({ ...findItem });
        }
      }
      this.commodityList = valCopy.map((item) => {
        return {
          ...item,
        };
      });
      this.realCommodityTable = this.commodityList.filter((item) => {
        return item.deleted == false;
      });
      this.setCommodityList(this.commodityList);
    },
    addToTable(val) {
      this.addToCartV1(val);
      return; // 下面不执行

      /**
       * 循环遍历：如果当前项 在后台返回的订单里面 ，修改数量
       */

      for (let i = 0; i < val.length; i++) {
        // 1.获取每一个待添加的订单项
        // let eachNeedAddItem = val[i];
        // 2. 查找是否在oldCommodityList中
        // 2.1 如果oldCommodityList 有找到
        if (this.oldCommodityCcodeList.includes(val[i].ccode)) {
          // 找到在commodityList 中的位置，并修改这一项的下单数量
          let targetItemIndex = this.commodityList.findIndex((item) => {
            return item.ccode === val[i].ccode;
          });
          this.commodityList[targetItemIndex].pnum = val[i].pnum;
          this.commodityList[targetItemIndex].deleted = false;
        } else {
          // 2.2 如果 oldCommodityList 没有找到了
          // 然后在 commodityList 查找 （有可能是多次添加 ，关了抽屉又添加）
          let commodityIndex = this.commodityList.findIndex((item) => {
            return item.ccode === val[i].ccode;
          });
          if (commodityIndex >= 0) {
            this.commodityList[commodityIndex].pnum = val[i].pnum;
          } else {
            // this.commodityList.push({ ...val[i] });
            this.commodityList.unshift({ ...val[i] });
          }
        }
      }
      // 记得每次变化 都要更新 store
      this.setCommodityList(this.commodityList);
    },
    handleDeleteCartItem(row, index) {
      this.$confirm("是否确定要删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          if (!row.ocid) {
            this.commodityList.splice(index, 1);
            this.setCommodityList(this.commodityList); // 删除也要更新store
          } else {
            let index = this.commodityList.findIndex((item) => {
              return item.ocid === row.ocid;
            });
            // let index = this.oldCommodityCcodeList.findIndex((item) => {
            //   return item.ocid === row.ocid;
            // });
            this.commodityList[index].deleted = true;
            console.log("打印删除后的商品列表：", this.commodityList);
            this.setCommodityList(this.commodityList); // 删除也要更新store
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleClose() {
      console.log("您好！");
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
            // this.handleDeleteCartItem(row);

            let deleteIndex = this.commodityList.findIndex((item) => {
              return item.cid === row.cid;
            });

            // this.commodityList.splice(deleteIndex, 1);
            this.commodityList[deleteIndex].deleted = true;
            this.setCommodityList(this.commodityList);
          })
          .catch(() => {
            row.pnum = old;
          });
      }
      this.setCommodityList(this.commodityList);
    },
    async saveUpdateOrder() {
      this.$refs["substituteFormRule"].validate(async (valid) => {
        if (valid) {
          if (
            this.commodityList.filter((item) => {
              return !item.deleted;
            }).length === 0
          ) {
            this.$message.error("请添加商品");
            return;
          }
          const checkParams = this.realCommodityTable.map((item) => {
            return {
              cid: item.cid,
              pnum: item.pnum,
            };
          });
          const checkFlag = await checkInventory(checkParams);
          this.checkInventoryFlag = checkFlag;
          if (checkFlag) {
            this.AgainVisible = true;
          } else {
            this.dialogVisible = true;
          }
        } else {
          this.$message.error("请先完善相关信息");
        }
      });
    },

    submitOrder() {
      this.$refs["substituteFormRule"].validate(async (valid) => {
        if (valid) {
          const params = {
            oid: this.oid,
            ...this.substituteForm,
            htime: moment(this.substituteForm.htime).format("YYYY-MM-DD"),
            // dtos: this.realCommodityTable, // 这里错了
            dtos: this.commodityList,
          };
          await updateEditOrder(params);
          this.$message.success("修改成功");
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
      this.drawer = true;
    },
    closeDrawer() {
      this.drawer = false;
    },

    async getDetails() {
      const params = {
        oid: this.oid,
      };
      try {
        const res = await fetchOrderDetails(params);

        const {
          base = {},
          delivery = {},
          prepare = {},
          other = {},
          list = [],
          discard = {},
          records = [],
          tprize,
        } = res;
        // alert(11);
        this.base = base;
        const { oid, ucode } = base;
        this.queryParams = {
          oid: oid,
          ucode: ucode,
        };

        this.aunit = other.aunit ? other.aunit : "--";
        this.aresult = other.aresult ? this.aresultList[other.aresult] : "--";
        let areason = other.areason ? other.areason : "--";
        if (other.aresult === 3) {
          this.asyncResult = `${this.aresult}（失败原因：${areason}）`;
        } else {
          this.asyncResult = this.aresult;
        }

        var currentDid, currentLid;
        if (prepare.dname) {
          currentDid = this.distributorOptions.filter((item) => {
            return item.diname === prepare.dname;
          })[0].did;
        }

        if (prepare.lname) {
          console.log("打印当前的线路集合22222：", this.linesList, prepare.lname);
          currentLid = this.linesList.filter((item) => {
            return item.lname === prepare.lname;
          })[0].lid;
        }
        console.log("currnetDid = ");
        console.log("currnetDid = ", currentDid, "currentLid =", currentLid);
        this.substituteForm = {
          remark: other.remark,
          cremark: other.cremark,
          htime: prepare.htime,
          did: currentDid,
          lid: currentLid,
        };

        console.log("this.substituteForm:");

        // 订单基本信息fakeTable
        this.baseItemList = [
          {
            label: "订单号",
            value: base.ono || "--",
          },
          {
            label: "客户名称",
            value: base.cname || "--",
          },
          {
            label: "客户经理",
            value: base.cmanager || "--",
          },
          {
            label: "订单状态",
            value: this.ostatusList[base.ostatus - 1] || "--",
          },
        ];

        this.deliveryItemList = [
          {
            label: "联系人姓名",
            value: delivery.cname || "--",
          },
          {
            label: "手机号",
            value: delivery.cmobile || "--",
          },
          {
            label: "收货地址",
            value: delivery.apr + delivery.act + delivery.aarea + delivery.adetail,
          },
        ];
        this.prepareItemList = [
          {
            label: "交付日期",
            value: prepare.htime || "--",
          },
          {
            label: "配货员",
            value: prepare.dname || "--",
          },
          {
            label: "线路",
            value: prepare.lname || "--",
          },
          {
            label: "司机",
            value: prepare.driver ? prepare.driver + "(" + prepare.dmobile + ")" : "--",
          },
        ];
        this.otherItemList = [
          {
            label: "备注",
            value: other.remark || "--",
          },
        ];
        if (list.length > 0) {
          this.commodityList = list.map((item) => {
            return {
              ...item,
              deleted: false,
            };
          }); //
          this.oldCommodityList = list.map((item) => {
            return { ...item };
          });
          this.oldCommodityCcodeList = list.map((item) => {
            return item.ccode;
          });
        }

        this.delivery = delivery;
        this.prepare = prepare;
        this.other = other;
        this.records = records;
        this.discard = discard;
      } catch (e) {}
    },
    async getAllLines() {
      try {
        const res = await fetchAllLinesList();
        if (res.length > 0) {
          this.linesList = res.map((item) => {
            return {
              lid: item.lid,
              lname: item.lname,
              drname: item.drname,
              doname: item.doname,
              drmobile: item.drmobile,
            };
          });
        }
      } catch (e) {}
    },

    async getAllDistributor() {
      try {
        const res = await fetchAllDistributor();
        if (res.length > 0) {
          this.distributorOptions = res.map((item) => {
            return {
              did: item.did,
              diname: item.diname,
              diphone: item.diphone,
            };
          });
        }
      } catch (e) {}
    },

    async getAllClient() {
      try {
        const res = await fetchAllClient();
        if (res.data.length > 0) {
          this.clientOptions = res.data.map((item) => {
            return {
              clid: item.clid,
              cname: item.cname,
              ctype: item.ctype,
              did: item.did,
              lid: item.lid,
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
.each-title {
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.85);
  line-height: 34px;
}
.edit-order {
  .commodity-list {
    .top {
      display: flex;
      justify-content: space-between;
      line-height: 34px;
      padding: 4px 12px;
      border-bottom: 1px solid #e8e8e8;
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
}
</style>
