<template>
  <div>
    <input type="file" ref="upload" accept=".xls,.xlsx" @change="readExcel" />
  </div>
</template>

<script>
import { CheckboxGroup } from 'element-ui';
import * as XLSX from "xlsx";
export default {
  name: "JsXlsx",
  data() {
    return {
      outputs: [],
    };
  },
  methods: {
    readExcel(e) {
      let that = this;
      const files = e.target.files;
      console.log('file',files );
      if (files.length < 1) {
        return false;
      } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        this.$toast("上传文件格式不正确，请上传xls或者xlsx格式");
        return false;
      }

      const fileReader = new FileReader();
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: "binary",
          }); // 读取数据
          const wsname = workbook.SheetNames[0]; // 取第一张表
          console.log(wsname);
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); // 生成json表格内容
          console.log(ws);
          // const ws1 = XLSX.utils.sheet_to_slk(workbook.Sheets[wsname]) // 输出表格对应位置是什么值
          // console.log('ws1',ws1);
          // const ws2 = XLSX.utils.sheet_to_html(workbook.Sheets[wsname]) // 生成HTML输出
          // const ws3 = XLSX.utils.sheet_to_csv(workbook.Sheets[wsname]) // 生成分隔符分隔值输出
          // const ws4 = XLSX.utils.sheet_to_formulae(workbook.Sheets[wsname]) // 生成公式列表（具有值回退）
          // const ws5 = XLSX.utils.sheet_to_txt(workbook.Sheets[wsname]) // 生成UTF16格式的文本

          that.outputs = []; // 清空接收数据

          for (let i = 0; i < ws.length; i++) {
            let sheetData = ws[i]; // 对数据自行操作
            that.outputs.push(sheetData);
          }
          console.log(that.outputs);

          // this.$refs.upload.value = "";
        } catch (e) {
          console.log(e);
          return false;
        }
      };
      fileReader.readAsBinaryString(files[0]);
    },
  },
};
</script>

<style lang="less" scoped>
</style>