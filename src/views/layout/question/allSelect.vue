<template>
  <div class="allSelect">
    <div v-if="formInline.type == 1">
      <el-row v-for="(item, index) in formInline.select_options" :key="index">
        <el-col :span="20">
          <el-radio
            v-model="formInline.single_select_answer"
            @change="allSelectChange('single_select_answer')"
            :label="item.label"
            >{{ item.label }}</el-radio
          >
          <el-input v-model="item.text"></el-input>
        </el-col>
        <el-col :span="4">
          <elUpload v-model="item.image"></elUpload>
        </el-col>
      </el-row>
    </div>
    <div v-else-if="formInline.type == 2">
      <el-row v-for="(item, index) in formInline.select_options" :key="index">
        <el-col :span="20">
          <el-checkbox
            v-model="formInline.multiple_select_answer"
            @change="allSelectChange('multiple_select_answer')"
            :label="item.label"
            >{{ item.label }}</el-checkbox
          >
          <el-input v-model="item.text"></el-input>
        </el-col>
        <el-col :span="4">
          <elUpload v-model="item.image"></elUpload>
        </el-col>
      </el-row>
    </div>
    <div v-else>
      <el-input
        type="textarea"
        rows="5"
        @change="allSelectChange('short_answer')"
        v-model="formInline.short_answer"
      ></el-input>
    </div>
  </div>
</template>

<script>
import elUpload from '@/components/elUpload'
export default {
  props: ['formInline'],
  components: { elUpload },
  methods: {
    allSelectChange (msg) {
      this.$emit('validataRules', msg)
    }
  }
}
</script>

<style></style>
