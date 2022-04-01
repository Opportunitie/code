<template>
  <el-pagination
    style="float: right"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page.sync="listState.pageNum"
    :page-size="listState.pageSize"
    :page-sizes="[10, 20, 30, 40, 50, 60 , 70, 80 ,90, 100]"
    layout="total, prev, pager, next, sizes, jumper"
    :total="listState.total"
  />
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    listState: {
      type: Object,
      default: () => {
        return {
          total: 0,
          pageSize: 10,
          pageNum: 1
        }
      }
    }
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    handleCurrentChange (val) {
      this.$emit('handleCurrentChange', { pageNum: val, pageSize: this.listState.pageSize })
    },
    handleSizeChange (val) {
      this.$emit('handleSizeChange', { pageNum: this.listState.pageNum, pageSize: val })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
