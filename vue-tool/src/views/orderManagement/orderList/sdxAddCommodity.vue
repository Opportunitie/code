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
      <el-table-column prop="lnum" label="库存" width="82">
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
          <div class="adjust-munit">
            <el-input-number
              v-model="row.pnum"
              controls-position="right"
              @change="(cur, old) => handleChange(cur, old, row)"
              :min="0"
            />
            <span v-if="row.pnum > row.lnum" style="color: red; margin-left: 8px"
              >库存不足!</span
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <bottom-bar style="width: 920px">
      <div class="my-btns">
        <el-button type="primary" @click="add" style="margin-right: 8px">添加</el-button>
        <el-button @click="handleClose">取消</el-button>
      </div>
    </bottom-bar>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BottomBar from "@c/bottomBar";
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
  },
  data() {
    return {
      loading: false,
      commodityList: [],
      searchCname: "", // 搜索条件
      basicCommodityList: [],
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
  computed: {
    ...mapState({
      myDxCommodityList: (state) => state.dxOrder.myDxCommodityList,
    }),
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getInitTableList();
    },
    handleChange(cur, old, row) {
      console.log("cur=", cur, "row.pnum ==", row.pnum, "  old=", old);
      if (row.pnum < row.mquantity && old < row.mquantity) {
        row.pnum = row.mquantity;
      }

      // 对比新旧值和 最小起订量相比 如果row.pnum 和cur 是同一个值
      // 如果当前值小于小于起订量 且old值等于 说明点击的是递减操作
      if (row.pnum < row.mquantity && old === row.mquantity) {
        row.pnum = 0;
      }

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
        console.log("发送过去的数组是： ", sendCommodityList);
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

          if (this.myDxCommodityList && this.myDxCommodityList.length > 0) {
            for (let i = 0; i < this.myDxCommodityList.length; i++) {
              let curIndex = this.filterCommodityList.findIndex((item) => {
                return item.cid === this.myDxCommodityList[i].cid;
              });
              this.filterCommodityList[curIndex].pnum = this.myDxCommodityList[i].pnum;
            }
          }
          //将过滤数组中的放进去
          let arr = this.filterCommodityList.filter((item) => {
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
