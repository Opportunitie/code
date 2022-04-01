<template>
  <div>
    <span class="select-ids" @click="dialogShow = true">设置</span>
    <el-row v-if="form.cardIds.length > 0">人才卡：</el-row>
    <el-row>
      <template v-for="item in cardList">
        <el-tag
          :key="item.label"
          effect="dark"
          style="margin-right:10px;"
          v-if="form.cardIds.includes(item.cardId)"
          closable
          @close="removetag(item.cardId, 'cardIds')"
        >{{ `${item.title}/${item.initialWord}` }}</el-tag>
      </template>
    </el-row>
    <el-row v-if="form.talentHonourIds.length > 0">人才荣誉：</el-row>
    <el-row>
      <template v-for="item in talentHonourList">
        <el-tag
          :key="item.type"
          effect="dark"
          style="margin-right:10px;"
          v-if="form.talentHonourIds.includes(item.type)"
          closable
          @close="removetag(item.type, 'talentHonourIds')"
        >{{ item.text }}</el-tag>
      </template>
    </el-row>
    <el-row v-if="form.categoryIds.length > 0">人才类别：</el-row>
    <el-row>
      <template v-for="item in talentListCop">
        <el-tag
          :key="item.type"
          effect="dark"
          style="margin-right:10px;"
          v-if="form.categoryIds.includes(item.type)"
          closable
          @close="removetag(item.type, 'categoryIds')"
        >{{ item.text }}</el-tag>
      </template>
    </el-row>
    <el-row v-if="form.educIds.length > 0">人才学历：</el-row>
    <el-row>
      <template v-for="item in educationList">
        <el-tag
          :key="item.type"
          effect="dark"
          style="margin-right:10px;"
          closable
          v-if="form.educIds.includes(item.type)"
          @close="removetag(item.type, 'educIds')"
        >{{ item.text }}</el-tag>
      </template>
    </el-row>
    <el-row v-if="form.titleIds.length > 0">人才职称：</el-row>
    <el-row>
      <template v-for="item in jobTitleList">
        <el-tag
          :key="item.type"
          effect="dark"
          style="margin-right:10px;"
          closable
          v-if="form.titleIds.includes(item.type)"
          @close="removetag(item.type, 'titleIds')"
        >{{ item.text }}</el-tag>
      </template>
    </el-row>
    <el-row v-if="form.qualityIds.length > 0">人才职业资格：</el-row>
    <el-row>
      <template v-for="item in certificateList">
        <el-tag
          :key="item.type"
          effect="dark"
          style="margin-right:10px;"
          closable
          v-if="form.qualityIds.includes(item.type)"
          @close="removetag(item.type, 'qualityIds')"
        >{{ item.text }}</el-tag>
      </template>
    </el-row>
    <select-equity 
      :dialogShow="dialogShow" 
      :cardList="cardList"
      :talentListCop="talentListCop"
      :educationList="educationList"
      :jobTitleList="jobTitleList"
      :certificateList="certificateList"
      :talentHonourList="talentHonourList"
      @close="close"
      @submit="submit"
      :form="form"
    />
  </div>
</template>

<script>
import SelectEquity from './select'
import { getCardsFilterBase } from '@/api/api'
import { talentList, educationList, jobTitleList, certificateList, talentHonourList } from './config'
export default {
  name: 'checkEquityIndex',
  components: {
    SelectEquity
  },
  props: {
    form: {
      type: Object,
      default: () => {
        return {}
      }
    },
    type: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      dialogShow: false,
      cardList: [],
      talentList: talentList,
      educationList: educationList,
      jobTitleList: jobTitleList,
      certificateList: certificateList,
      talentHonourList: talentHonourList
    }
  },
  methods: {
    async init() {
      try {
        const res = await getCardsFilterBase();
        this.cardList = [ ...res ];
      } catch (e) {
        console.log(e)
      }
    },
    removetag(tag, arrkey) {
      const index = this.form[arrkey].indexOf(tag);
      this.form[arrkey].splice(index, 1);
    },
    submit (val) {
      this.$emit('submit', val)
      this.dialogShow = false
    },
    close () {
      this.dialogShow = false
    }
  },
  computed: {
    talentListCop () {
      if (this.type && this.type == 1) {
        return this.talentList.filter((item) => item.type !== 100)
      } else if (this.type && this.type == 2) {
        return this.talentList
      }
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="less" scoped>
.select-ids{
  cursor: pointer;
  height:20px;
  font-size:14px;
  color:rgba(54,152,233,1);
  text-decoration: underline;
}
</style>