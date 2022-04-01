import { mapActions, mapState } from 'vuex'
import { warehousingMap, pinkingMap, pinkingStatusMap } from '@/common/js/statusConfig'
export default {
  data() {
    return {
      formData: {},
      tableData: {},
      searchForm: {},
      list: [],
      pageState: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      warehousingMap: warehousingMap,
      pinkingMap: pinkingMap,
      pinkingStatusMap: pinkingStatusMap
    }
  },
  computed: {
    ...mapState({
      rules: (state) => state.common.rules
    })
  },
  methods: {
    ...mapActions(['clearExpand']),
    handleCurrentChange(val) {
      console.log(val)
      this.pageState = {
        ...this.pageState,
        pageNum: val
      }
      this.getTableList()
    },
    handleSizeChange(val) {
      console.log(val)
      this.pageState = {
        ...this.pageState,
        pageSize: val
      }
      this.getTableList()
    },
    reset(row = {}) {
      this.pageState = {
        pageSize: 10,
        pageNum: 1,
        total: 0
      }
      this.searchForm = {
        ...row
      }
      this.getTableList()
    }
  },
  destroyed() {
    this.clearExpand()
  }
}
