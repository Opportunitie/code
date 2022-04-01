<template>
  <div class="invoice-table">
    <!-- :class="item.itemHeightFlex&&item.itemHeightFlex>1?'list-item-'+item.itemHeightFlex:''" -->
    <div class="table-list" v-for="(item, index) in tableList" :key="index" :ref="'tableList'+index">
      <div style="padding:12px 0;">
        <h2>浙江阮小二食品有限公司销售发票</h2>
        <div class="fake-table">
          <span>开单日期 {{printDate}}</span>
          <span>订货单号 {{item.ono}}</span>
        </div>
        <table style="width: 100%" class="table-item" border-collapse="collapse">
          <tbody>
            <tr>
              <td rowspan="2" style="width:98px;">购货单位</td>
              <td style="width: 182px;">公司名称</td>
              <td colspan="7">{{item.cname||''}}</td>
            </tr>
            <tr>
              <td>地址、电话</td>
              <td colspan="5">{{(item.apr||'')+(item.act||'')+(item.area||'')+(item.adetail||'')}}</td>
              <td colspan="2">{{item.cphone||''}}</td>
            </tr>
            <tr>
              <td colspan="2" class="align-center">代码</td>
              <td>商品名称</td>
              <td>规格</td>
              <td>数量</td>
              <td>单价</td>
              <td>金额</td>
              <td>税率</td>
              <td>税金</td>
            </tr>
            <tr v-for="(tbItem, tbIndex) in item.commodities" :key="tbIndex">
              <td colspan="2" class="align-center">{{tbItem.ccode}}</td>
              <td>{{tbItem.cname}}</td>
              <td>{{tbItem.cunit}}</td>
              <td>{{tbItem.pnum}}</td>
              <template v-if="printPrice">
                <td>{{tbItem.uprize | numberFix2}}</td>
                <td>{{tbItem.total | numberFix2}}</td>
                <td>{{tbItem.trate||'0%'}}</td>
                <td>{{tbItem.taxes||'0'}}</td>
              </template>
              <template v-else>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </template>
            </tr>
            <tr>
              <td colspan="2" class="align-center">合计</td>
              <td colspan="2"></td>
              <td>{{item.sumNum}}</td>
              <td></td>
              <template v-if="printPrice">
                <td>{{item.sumPrice | numberFix2}}</td>
                <td>0%</td>
                <td>{{item.sumTax}}</td>
              </template>
              <template v-else>
                <td></td>
                <td></td>
                <td></td>
              </template>
            </tr>
            <tr>
              <td colspan="2" class="align-center">价税合计</td>
              <template v-if="printPrice">
                <td colspan="5">{{item.sumPriceAndTaxChinese}}</td>
                <td colspan="2">{{item.sumPriceAndTax | numberFix2}}</td>
              </template>
              <template v-else>
                <td colspan="5"></td>
                <td colspan="2"></td>
              </template>
            </tr>
            <tr>
              <td colspan="2" class="align-center">备注</td>
              <td colspan="7">{{item.cremark}}</td>
            </tr>
            <tr>
              <td>生产日期</td>
              <td>{{printDate}}</td>
              <td colspan="7">保质期:3天（0~10℃ 冷藏）；&nbsp;&nbsp;&nbsp;&nbsp;出厂检验序号：1</td>
            </tr>
          </tbody>
        </table>
        <div class="fake-table-footer">
          <span>出库人：  洪建莉</span>
          <span>送货人：</span>
          <span>收货人：</span>
          <!-- <span>开单人： {{item.uname}}</span> -->
          <span>开单人： 郑秀萍</span>
        </div>
        <h3>本公司郑重声明：票面所载批次产品已经检验，符合国家相关标准要求。</h3>
        <h3>此联由批发单位直接用于批发台账资料留存。</h3>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { printInvoice } from "@/api/orderMgrApi";
import { changeNumMoneyToChinese } from "@/utils";
export default {
  name: "printPreview",
  data() {
    return {
      printDate: moment(new Date()).format('YYYY-MM-DD HH:mm'),
      tableList: [],
      printPrice: false,
      ids: "", // 订单ID
      ucode: "", // 用户编码(登录用户)
      // sumNum: 0, // 合计数量
      // sumPrice: 0, // 合计金额
      // sumTax: 0, // 合计税金
      // sumPriceAndTax: 0, // 价税合计
      // sumPriceAndTaxChinese: "" // 价税合计中文
    }
  },
  watch:{
    tableList(){
      this.$nextTick(_=>{
        this.initHeight()
      })
    }
  },
  filters: {
    numberFix2(value){
      let newVal = parseFloat(value).toFixed(2);
      return newVal||'';
    }
  },
  created() {
    const { list,type } = this.$route.query;
    this.ids = list;
    this.printPrice = type==='hasPrice'?true:false;
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if(!userInfo) this.$message.error('登录到期，请重新登录');
    this.ucode = userInfo.ucode;
    this.init();
    setTimeout(()=>{
      alert('您的浏览器需要您同时按下CTRL+P来打印');
    },500);
  },
  mounted() {
    // this.initHeight();
  },
  methods: {
    conversion_getDPI() {
      var arrDPI = new Array;
      if (window.screen.deviceXDPI) {
          arrDPI[0] = window.screen.deviceXDPI;
          arrDPI[1] = window.screen.deviceYDPI;
      } else {
          var tmpNode = document.createElement("DIV");
          tmpNode.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
          document.body.appendChild(tmpNode);
          arrDPI[0] = parseInt(tmpNode.offsetWidth);
          arrDPI[1] = parseInt(tmpNode.offsetHeight);
          tmpNode.parentNode.removeChild(tmpNode);
      }
      return arrDPI;
    },
    mmConversionPx(value) {
        var inch = value/25.4;
        var c_value = inch*this.conversion_getDPI()[0];
        return c_value;
    },
    initHeight() {
      this.$nextTick(()=>{
        let width = this.mmConversionPx(215); // 打印单宽度
        let height = this.mmConversionPx(78.5); // 打印单高度
        this.tableList.map((item,i)=>{
          let tableDom = this.$refs[`tableList${i}`];
          let itemHeight = window.getComputedStyle(tableDom[0]).height;
          let heightIndex = parseInt(parseFloat(itemHeight)/parseFloat(height)) + 1;
          this.$refs[`tableList${i}`][0].style.width = width+'px';
          this.$refs[`tableList${i}`][0].style.height = height*heightIndex+'px';
        })
      })
    },

    init() {
      this.getTableList();
    },
    async getTableList() {
      const params = {
        list: this.ids,
        ucode: this.ucode
      };
      try {
        const res = await printInvoice(params);
        this.tableList = res.map((item)=>{
          item.sumNum = 0;
          item.sumPrice = 0;
          item.sumTax = 0;
          item.sumPriceAndTax = 0;
          item.sumPriceAndTaxChinese = '';
          if(item.commodities) {
            item.commodities.map((item1)=>{
              item.sumNum += parseFloat(item1.pnum||0);
              item.sumPrice += parseFloat(item1.total||0);
              item.sumTax += parseFloat(item1.taxes||0);
            });
            item.itemHeightFlex = parseInt(item.commodities.length/24);
            item.sumPriceAndTax = item.sumPrice + item.sumTax;
            item.sumPriceAndTaxChinese = changeNumMoneyToChinese(item.sumPriceAndTax);
          }
          return {
            ...item,
          };
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>
<style lang="less" scoped>
.invoice-table {
  .table-list {
    // 布局横向 边距默认
    // width: 1560px;
    // height: 1060px;
    // border: 1px #000 solid;
    // padding: 12px 0;
    // margin: 0 auto;
    // each(range(5), {
    //   &.list-item-@{value} {
    //     height: (1060px + (@value - 1) * 1062px);
    //   }
    // })
    font-family: "黑体";
    h2,h3 {
      font-weight: normal;
      text-align: center;
      margin-bottom: 10px;
    }
    h2 {
      font-size: 24px;
    }
    h3 {
      font-size: 16px;
      margin-bottom: 5px;
    }
    .fake-table {
      display: flex;
      font-size: 16px;
      padding: 0 32px;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid #000;
      margin-bottom: 10px;
      thead {
        tr {
          background: #fff;
          th {
            text-align: left;
            line-height:18px;
            font-size: 16px;
            border: 1px solid #000;
            font-weight: normal;
            padding: 4px 6px;
            &.align-center {
              text-align: center;
            }
          }
        }
      }
      tbody {
        tr {
          background: #fff;
          td {
            text-align: left;
            line-height:18px;
            font-size: 16px;
            border: 1px solid #000;
            padding: 4px 6px;
            &.align-center {
              text-align: center;
            }
          }
        }
      }
    }
    .fake-table-footer {
      display: flex;
      font-size: 16px;
      padding: 0 32px;
      justify-content: space-between;
      margin-bottom: 10px;
    }
  }
}
</style>