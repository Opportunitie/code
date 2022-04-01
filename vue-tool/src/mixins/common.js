export default {
    data() {
        return {
            list: [],
            listState: {
                total: 0,
                pageNum: 1,
                pageSize: 10
            },
            tableData: {},
            formData: {},
            searchForm: {}
        }
    },
    methods: {
        search (val) {
            this.searchForm = {
                ...val
            }
            this.getTableList()
        },
        reset (val) {
            this.searchForm = {
                ...val
            }
            this.listState ={
                pageNum: 1,
                pageSize: 10
            },
            this.getTableList()
        },
        handleCurrentChange(val) {
            console.log('val', val)
            this.listState = {
                ...this.listState,
                pageNum: val
            }
            this.getTableList()
        },
        handleSizeChange(val) {
            console.log('val1', val)
            this.listState = {
                ...this.listState,
                pageSize: val
            }
            this.getTableList()
        }
    }
}