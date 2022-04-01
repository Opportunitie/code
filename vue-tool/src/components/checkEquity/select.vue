<template>
  <el-dialog
    title="设置"
    :visible.sync="dialogShow"
    width="840px"
    :close-on-click-modal="false"
    :show-close="false"
  >
    <el-divider class="dialogDivider"></el-divider>
    <el-form ref="idsForm" style="padding:0px 30px 0px 30px;font-size:16px">
      <el-form-item style="margin:0px;">
        <div class="dialoglabel">选择可享受此权益的人才卡:</div>
      </el-form-item>
      <el-form-item>
        <el-checkbox-group v-model="newform.cardIds">
          <el-checkbox
            v-for="(item, index) in cardList"
            :key="index"
            :checked="item.checked"
            :label="item.cardId"
          >{{`${item.title}/${item.initialWord}`}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item style="margin:0px;">
        <div class="dialoglabel">选择可享受此权益的主要人才荣誉：</div>
      </el-form-item>
      <el-form-item>
        <el-checkbox-group v-model="newform.talentHonourIds">
          <el-checkbox
            v-for="item in talentHonourList"
            :key="item.type"
            :checked="item.checked"
            :label="item.type"
          >{{item.text}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item style="margin:0px;">
        <div class="dialoglabel">选择可享受此权益的人才类别：</div>
      </el-form-item>
      <el-form-item>
        <el-checkbox-group v-model="newform.categoryIds">
          <el-checkbox
            v-for="item in talentListCop"
            :key="item.type"
            :checked="item.checked"
            :label="item.type"
          >{{item.text}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item style="margin:0px;">
        <div class="dialoglabel">选择可享受此权益的人才学历：</div>
      </el-form-item>
      <el-form-item>
        <el-checkbox-group v-model="newform.educIds">
          <el-checkbox
            v-for="item in educationList"
            :key="item.type"
            :checked="item.checked"
            :label="item.type"
          >{{item.text}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item style="margin:0px;">
        <div class="dialoglabel">选择可享受此权益的人才职称：</div>
      </el-form-item>
      <el-form-item>
        <el-checkbox-group v-model="newform.titleIds">
          <el-checkbox
            v-for="item in jobTitleList"
            :key="item.type"
            :checked="item.checked"
            :label="item.type"
          >{{item.text}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item style="margin:0px;">
        <div class="dialoglabel">选择可享受此权益的人才职业资格：</div>
      </el-form-item>
      <el-form-item>
        <el-checkbox-group v-model="newform.qualityIds">
          <el-checkbox
            v-for="item in certificateList"
            :key="item.type"
            :checked="item.checked"
            :label="item.type"
          >{{item.text}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="selectTags">保 存</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "checkEquity",
  props: {
    dialogShow: {
      type: Boolean,
      default: false
    },
    cardList: {
      type: Array,
      default: () => []
    },
    talentListCop: {
      type: Array,
      default: () => []
    },
    educationList: {
      type: Array,
      default: () => []
    },
    jobTitleList: {
      type: Array,
      default: () => []
    },
    certificateList: {
      type: Array,
      default: () => []
    },
    talentHonourList: {
      type: Array,
      default: () => []
    },
    form: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      newform: {
        cardIds: [],
        categoryIds: [],
        educIds: [],
        titleIds: [],
        qualityIds: [],
        talentHonourIds: []
      },
      isIndeterminate: false,
      checkAll: false
    }
  },
  watch: {
     dialogShow (val) {
      if(val){
        console.log(this.form)
        this.newform = {
          ...this.form
        }
      }
    },
    newform: {
      handler: function (val) {
        const arr = [].concat(val.cardIds, val.categoryIds, val.educIds, val.titleIds, val.qualityIds, val.talentHonourIds)
        const length = arr.length
        const { cardList, talentListCop, educationList, jobTitleList, certificateList, talentHonourList } = this
        
        const topArr = [].concat(cardList, talentListCop, educationList, jobTitleList, certificateList, talentHonourList)
        const toplength = topArr.length
        if (length == 0) {
          this.isIndeterminate = false
          this.checkAll = false
        } else if (length < toplength) {
          this.isIndeterminate = true
          this.checkAll = false
        } else {
          this.isIndeterminate = false
          this.checkAll = true
        }
      },
      deep: true
    }
  },
  methods: {
    handleCheckAllChange(val) {
      if (val) {
        this.setIds(this.cardList, "cardIds", "cardId");
        this.setIds(this.talentListCop, "categoryIds");
        this.setIds(this.educationList, "educIds");
        this.setIds(this.jobTitleList, "titleIds");
        this.setIds(this.certificateList, "qualityIds");
        this.setIds(this.talentHonourList, "talentHonourIds");
        this.isIndeterminate = false;
        this.checkAll = false
      } else {
        this.$set(this.newform, "cardIds", []);
        this.$set(this.newform, "categoryIds", []);
        this.$set(this.newform, "educIds", []);
        this.$set(this.newform, "titleIds", []);
        this.$set(this.newform, "qualityIds", []);
        this.$set(this.newform, "talentHonourIds", []);
        this.isIndeterminate = false
        this.checkAll = true
      }
    },
    setIds(arr, keyStr, type = "type") {
      const ids = [];
      arr.map(item => {
        ids.push(item[type]);
      });
      this.$set(this.newform, keyStr, ids);
    },
    selectTags () {
      this.$emit('submit', this.newform)   
    },
    close () {
      this.$emit('close')
    }
  }
};
</script>

<style lang="less" scoped>
.dialogDivider{
  margin-top:-20px;
}
</style>