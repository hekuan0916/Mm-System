<template>
  <el-dialog class="addQuestion" :visible.sync="isShow" :fullscreen="true">
    <div slot="title" class="title">新增题目测试</div>
    <div class="form">
      <el-form :model="formInline" label-width="100">
        <el-form-item label="学科">
          <el-select v-model="formInline.subject" placeholder="请选择学科">
            <el-option
              v-for="(item, index) in subjectList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段">
          <el-select v-model="formInline.step" placeholder="请选择阶段">
            <el-option
              v-for="(value, key, index) in objStep"
              :key="index"
              :label="value"
              :value="+key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业">
          <el-select v-model="formInline.enterprise" placeholder="请选择企业">
            <el-option
              v-for="(item, index) in businessList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市">
          <el-cascader
            :props="{ value: 'label' }"
            v-model="formInline.city"
            size="large"
            :options="options"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="题型">
          <el-radio
            v-model="formInline.type"
            v-for="(value, key, index) in objType"
            :key="index"
            :label="value"
            :index="key"
          >
          </el-radio>
        </el-form-item>
        <el-form-item label="难度">
          <el-radio
            v-model="formInline.difficulty"
            v-for="(value, key, index) in objDiff"
            :key="index"
            :label="value"
            :index="key"
          >
          </el-radio>
        </el-form-item>
        <hr />
        <el-form-item label="试题标题">
          <quillEditor
            v-model="formInline.title"
            :options="{ placeholder: '请在这里输入...' }"
          ></quillEditor>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="footer">
      <el-button @click="isShow = false">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { regionData } from 'element-china-area-data'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  components: { quillEditor },
  props: ['subjectList', 'objStep', 'businessList', 'objType', 'objDiff'],
  data () {
    return {
      content: '',
      options: regionData,
      isShow: false,
      formInline: {
        subject: '', // 是 int 学科id标识
        step: '', // 是 int 阶段1、初级 2、中级 3、高级
        enterprise: '', // 是 int 企业id标识
        city: [], // 是 array [省、市、区县]
        title: '', // 是 string 标题
        type: 1, // 是 string 题型 1单选 、2多选 、3简答
        difficulty: 1, // 是 int 题目难度 1简单 、2一般 、3困难
        single_select_answer: '', // 是 string 单选题答案
        multiple_select_answer: '', // 是 array 多选题答案
        short_answer: '', // 是 string 简答题答案
        video: '', // 否 string 解析视频地址
        answer_analyze: '', // 是 string 答案解析
        remark: '', // 是 string 答案备注
        select_options: '' // 是 array 选项，介绍，图片介绍
      }
    }
  },
  methods: {
    submit () {},
    handleChange (value) {
      console.log(value)
    }
  }
}
</script>

<style lang="less">
.addQuestion {
  .el-dialog__header {
    padding: 0;
  }
  .title {
    height: 55px;
    color: #fff;
    text-align: center;
    font-size: 700;
    line-height: 55px;
    background: linear-gradient(#01c4fa, #1395fa);
  }
  .footer {
    text-align: center;
  }
  .form {
    width: 835px;
    margin: 0 auto;
  }
  .quill-editor {
    margin-top: 50px;
  }
  .ql-editor {
    min-height: 200px;
  }
}
</style>
