<template>
<div>
  <img :src="qrcode" />
  <el-button @click="print">打印</el-button>
</div>
</template>

<script>
import { code1, code2, code3, logo, danger, qrcode } from './imgs'
export default {
  data() {
    return {
      qrcode
    }
  },
  methods: {
    print() {
      const obj = {
        PID: 'A120700001',
        PN: '3303000006',
        QTY: '2000',
        'D/C': '202017',
        Lot: 'L20101701',
        MSL: '1',
        code1,
        code2,
        code3,
        qrcode,
        logo,
        danger,
        text: '气体放电\r\n管，2RP090M-8/S(90V,+-20%,,1.5pF,8.0mm*6.0mm,-40℃~85℃,君耀，R0HS)'
      }
      var LODOP; //声明为全局变量
      LODOP = window.getCLodop();
      function myPrint() {
        LODOP.PRINT_INITA("0mm","0mm","58mm","38mm","打印控件功能演示_Lodop功能_演示文档式模板生成和使用");
        LODOP.SET_PRINT_PAGESIZE(1, "58mm", "38mm", '条码')
        LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1)
        LODOP.ADD_PRINT_TEXT("1.4mm","2.4mm","26mm","2.1mm","PID:A120700001");
        LODOP.SET_PRINT_STYLEA(0,"FontSize",5);
        LODOP.SET_PRINT_STYLEA(0,"Bold",1);

        // code1
        LODOP.ADD_PRINT_IMAGE("4.3mm","2.4mm","27mm","3.2mm", `<img border='0' src=${obj.code1} width='437px' height='55px' />`);
        LODOP.SET_PRINT_STYLEA(0,"Stretch",2);
        // LODOP.ADD_PRINT_BARCODE("4.3mm","2.4mm","27mm","3.2mm","128C","");
        // LODOP.SET_PRINT_STYLEA(0,"FontSize",0);

        LODOP.ADD_PRINT_TEXT("8.3mm","2.4mm","20mm","2.1mm","PN:3303000006");
        LODOP.SET_PRINT_STYLEA(0,"FontSize",5);
        LODOP.SET_PRINT_STYLEA(0,"Bold",1);

        // code2
        LODOP.ADD_PRINT_IMAGE("11.2mm","2.4mm","20mm","3.2mm", `<img border='0' src=${obj.code2} width='291px' height='55px' />`);
        LODOP.SET_PRINT_STYLEA(0,"Stretch",2);
        // LODOP.ADD_PRINT_BARCODE("11.2mm","2.4mm","21mm","3.2mm","128C","");
        // LODOP.SET_PRINT_STYLEA(0,"FontSize",0);

        LODOP.ADD_PRINT_TEXT("15.35mm","2.4mm","15.88mm","2.1mm","QTY:2000");
        LODOP.SET_PRINT_STYLEA(0,"FontSize",5);
        LODOP.SET_PRINT_STYLEA(0,"Bold",2);

        // code3
        LODOP.ADD_PRINT_IMAGE("18.52mm","2.4mm","20mm","3.2mm", `<img border='0' src=${obj.code3} width='189px' height='55px' />`);
        LODOP.SET_PRINT_STYLEA(0,"Stretch",2);
        // LODOP.ADD_PRINT_BARCODE("18.52mm","2.4mm","20mm","3.2mm","128Auto","");
        // LODOP.SET_PRINT_STYLEA(0,"FontSize",0);

        LODOP.ADD_PRINT_TEXT("18mm","26.2mm","26mm","2.1mm","D/C: 202017");
        LODOP.SET_PRINT_STYLEA(0,"FontSize",5);
        LODOP.ADD_PRINT_TEXT("20.6mm","26.2mm","26mm","2.1mm","Lot: L20101701");
        LODOP.SET_PRINT_STYLEA(0,"FontSize",5);
        LODOP.ADD_PRINT_TEXT("12mm","36.8mm","10mm","2.1mm","MSL: 1");
        LODOP.SET_PRINT_STYLEA(0,"FontSize",5);
        // logo
        LODOP.ADD_PRINT_IMAGE("1.4mm","39.5mm","6.3mm","2.7mm", obj.logo);
        LODOP.SET_PRINT_STYLEA(0,"Stretch",2);
        // LODOP.ADD_PRINT_SHAPE(4,"1.4mm","39.5mm","5.8mm","2.4mm",0,0,"#000000");
        // danger
        LODOP.ADD_PRINT_IMAGE("5mm","35.2mm","3.7mm","3.7mm", obj.danger);
        LODOP.SET_PRINT_STYLEA(0,"Stretch",2);
        // LODOP.ADD_PRINT_SHAPE(4,"5mm","35.2mm","3.7mm","3.7mm",0,0,"#000000");
        LODOP.ADD_PRINT_TEXT("4.8mm","39.5mm","10mm","3.7mm","标签禁止\r\n覆盖损毁\r\n");
        LODOP.SET_PRINT_STYLEA(0,"FontSize",5);
        LODOP.ADD_PRINT_TEXT("23.5mm","2.4mm","45.2mm","4.6mm", obj.text);
        LODOP.SET_PRINT_STYLEA(0,"FontSize",4);
        // qrcode
        LODOP.ADD_PRINT_IMAGE("9.5mm","27.5mm","7mm","7mm", `<img border='0' src=${obj.qrcode} width='168px' height='168px' />`);
        LODOP.SET_PRINT_STYLEA(0,"Stretch",2);
        // LODOP.ADD_PRINT_BARCODE("9.5mm","27.5mm","7mm","7mm","QRCode","a123456789012,a123456789012,a123456789012,a123456789012,a123456789012");
        LODOP.PREVIEW();
      }
      myPrint()
    }
  }
};
</script>

<style lang="less" scoped>
</style>