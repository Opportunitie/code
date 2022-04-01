<template>
  <div class="add-commodity" v-loading="loading">
    <div class="search">
      <div style="">
        <span>商品名称：</span>

        <el-input v-model="searchCname" style="width: 260px; height: 34px"></el-input>
      </div>

      <el-button type="primary" style="margin-left: 8px" @click="search">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </div>

    <el-table :data="filterCommodityList" style="width: 100%; margin-bottom: 48px">
      <el-table-column prop="mthumb" label="商品主图" width="82">
        <template slot-scope="scope">
          <div style="display: flex; align-content: center">
            <img :src="scope.row.mthumb" style="width: 43px; height: 32px" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="cname" label="商品名称"> </el-table-column>

      <el-table-column prop="uprize" label="单价">
        <template v-slot="{ row }">
          <div class="adjust-munit">
            <span>{{ row.uprize }}</span
            ><span>元/{{ row.cunit }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="lnum" label="库存" width="100">
        <template v-slot="{ row }">
          <div class="adjust-munit">
            <span>{{ row.lnum }}</span
            ><span>{{ row.cunit }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="mquantity" label="起订量">
        <template v-slot="{ row }">
          <div class="adjust-munit">
            <span>{{ row.mquantity }}</span
            ><span>{{ row.cunit }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="pnum" label="下单数量" width="220">
        <template v-slot="{ row }">
          <!-- :max="row.lnum" -->
          <div class="adjust-munit">
            <el-input-number
              v-model="row.pnum"
              controls-position="right"
              @change="(cur, old) => handleChange(row, cur, old)"
              :min="0"
            />
            <span v-if="row.pnum > row.lnum" style="color: red; margin-left: 8px"
              >库存不足!</span
            >
            <!-- <span v-if="row.pnum < row.mquantity" style="color: orange; margin-left: 8px"
              >小于起订量!</span
            > -->
          </div>
        </template>
      </el-table-column>
    </el-table>
    <bottom-bar style="width: 840px">
      <div class="my-btns">
        <el-button type="primary" @click="add" style="margin-right: 8px">添加</el-button>
        <el-button @click="handleClose">取消</el-button>
      </div>
    </bottom-bar>
  </div>
</template>

<script>
import BottomBar from "@c/bottomBar";
import { mapState } from "vuex";
import {
  fetchEditCommodityList, // 获取修改订单添加商品的列表查询
} from "@/api/orderMgrApi";
export default {
  name: "add-commodity",
  components: {
    BottomBar,
  },
  props: {
    queryParams: {
      type: Object,
      default: () => {},
    },
    updatgeTable: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    myCommodityList: {
      handler(newVal, oldVal) {
        console.log("监听皇上的变化： ", newVal);
      },
      deep: true,
    },
  },
  computed: {
    ...mapState({
      myCommodityList: (state) => state.editOrder.myCommodityList,
    }),
  },

  inject: ["myCommodityTableData"],

  data() {
    return {
      loading: false,
      commodityList: [],

      sbTableList: this.tableList,
      searchCname: "", // 搜索条件
      filterCommodityList: [],
      middleCommodityArray: [],
      formData: {
        id: "searchForm",
        inline: true,
        arr: [
          {
            label: "商品名称：",
            type: "input",
            key: "cname",
            placeholder: "请输入",
          },
          {
            label: "",
            type: "button",
            key: "",
            handles: [
              {
                type: "primary",
                // rules: 30,
                text: "查询",
                fn: (row) => {
                  this.search(row);
                },
              },
            ],
          },
        ],
      },
    };
  },

  created() {
    this.init();
  },

  methods: {
    async init() {
      await this.getInitTableList();
    },

    updateByVuexData() {
      if (this.myCommodityList && this.myCommodityList.length > 0) {
        for (let i = 0; i < this.myCommodityList.length; i++) {
          let curIndex = this.filterCommodityList.findIndex((item) => {
            return item.cid === this.myCommodityList[i].cid;
          });
          console.log("当前索引是：", curIndex);
          this.filterCommodityList[curIndex].pnum = this.myCommodityList[i].pnum;
          this.filterCommodityList[curIndex].deleted = this.myCommodityList[i].deleted;
          if (this.filterCommodityList[curIndex].deleted) {
            this.filterCommodityList[curIndex].pnum = 0;
          }
        }
      }
    },

    handleChange(row, cur, old) {
      if (cur < row.mquantity && old === 0) {
        row.pnum = row.mquantity;
      }
      if (row.pnum < row.mquantity && old === row.mquantity) {
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
            row.pnum = 0;

            /**
             * 1. 查找当前cid 对应的商品
             * 2. 判断 如果临数组中没有 ，如果下单数量大于 0 则添加进去
             *    如果下单数量为零 临时数组中有 则删除
             */
            let eachCommodityItem = this.middleCommodityArray.find((item) => {
              return item.cid === row.cid;
            });
            if (!eachCommodityItem) {
              // 没有找到
              this.middleCommodityArray.push({ ...row });
            } else {
              let index = this.middleCommodityArray.findIndex((item) => {
                return item.cid === row.cid;
              });
              this.middleCommodityArray[index].pnum = row.pnum;
            }
          })
          .catch(() => {
            row.pnum = row.mquantity;
          });
      }

      let eachCommodityItem = this.middleCommodityArray.find((item) => {
        return item.cid === row.cid;
      });
      if (!eachCommodityItem) {
        // 没有找到
        this.middleCommodityArray.push({ ...row });
      } else {
        let index = this.middleCommodityArray.findIndex((item) => {
          return item.cid === row.cid;
        });
        this.middleCommodityArray[index].pnum = row.pnum;
      }

      console.log("middleCommodityArray: ", this.middleCommodityArray);
    },

    handleClose() {
      this.$emit("setCloseDrawer");
    },
    add() {
      let sendCommodityList = this.middleCommodityArray
        .filter((item) => {
          return item.pnum > 0;
        })
        .map((item) => {
          return {
            ...item,
            deleted: false,
          };
        });
      if (sendCommodityList.length > 0) {
        this.$emit("getCommodity", sendCommodityList);
        this.$message.success("添加到商品列表");
        this.$emit("setCloseDrawer");
      } else {
        this.$message.warning("请添加商品!");
      }
    },
    reset() {
      this.searchCname = "";
      this.filterCommodityList = this.commodityList;
    },
    search() {
      this.filterCommodityList = this.commodityList.filter((item) => {
        return item.cname.includes(this.searchCname);
      });
    },
    async getInitTableList() {
      const params = {
        ...this.searchForm,
        oid: this.queryParams.oid,
        ucode: this.queryParams.ucode,
        status: 1,
      };

      this.loading = true;
      try {
        const res = await fetchEditCommodityList(params);
        if (res) {
          this.commodityList = [...res];
          this.filterCommodityList = [...res];

          if (this.myCommodityList && this.myCommodityList.length > 0) {
            for (let i = 0; i < this.myCommodityList.length; i++) {
              let curIndex = this.filterCommodityList.findIndex((item) => {
                return item.cid === this.myCommodityList[i].cid;
              });

              this.filterCommodityList[curIndex].pnum = this.myCommodityList[i].pnum;
              this.filterCommodityList[curIndex].deleted = this.myCommodityList[
                i
              ].deleted;
              if (this.filterCommodityList[curIndex].deleted) {
                this.filterCommodityList[curIndex].pnum = 0;
              }
            }
          }

          let arr = res.filter((item) => {
            return item.pnum > 0;
          });

          if (arr.length) {
            this.middleCommodityArray = arr.map((item) => {
              return { ...item, deleted: false };
            });
          }
        }
      } catch (e) {
        console.log("e", e);
      } finally {
        this.loading = false;
      }
    },

    async getTableList() {
      const params = {
        ...this.searchForm,
        oid: this.queryParams.oid,
        ucode: this.queryParams.ucode,
      };

      this.loading = true;
      try {
        const res = await fetchEditCommodityList(params);
        if (res) {
          this.commodityList = [...res];
          // this.filterCommodityList = [...res];
        }
      } catch (e) {
        console.log("e", e);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.my-btns {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}
.search {
  height: 34px;
  display: flex;
  align-content: center;
}
</style>
