<template>
  <el-dialog class="addQuestion" :visible.sync="isShow" :fullscreen="true">
    <div slot="title" class="title">
      {{ mode == 'add' ? '新增' : '编辑' }}题库
    </div>
    <div class="form">
      <el-form
        :model="formInline"
        label-width="200px"
        :rules="rules"
        ref="formInline"
      >
        <el-form-item prop="subject" label="学科">
          <el-select v-model="formInline.subject" placeholder="请选择学科">
            <el-option
              v-for="(item, index) in subjectList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="step" label="阶段">
          <el-select v-model="formInline.step" placeholder="请选择阶段">
            <el-option
              v-for="(value, key, index) in objStep"
              :key="index"
              :label="value"
              :value="+key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="enterprise" label="企业">
          <el-select v-model="formInline.enterprise" placeholder="请选择企业">
            <el-option
              v-for="(item, index) in businessList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="city" label="城市">
          <el-cascader
            :props="{ value: 'label' }"
            v-model="formInline.city"
            size="large"
            :options="options"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item prop="type" label="题型">
          <el-radio
            v-model="formInline.type"
            v-for="(value, key, index) in objType"
            :key="index"
            :label="value"
            :index="key"
          >
          </el-radio>
        </el-form-item>
        <el-form-item prop="difficulty" label="难度">
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
        <el-form-item prop="title" label="试题标题">
          <quillEditor
            v-model="formInline.title"
            @change="validateRules('title')"
            :options="{ placeholder: '请在这里输入...' }"
          ></quillEditor>
        </el-form-item>
        <el-form-item
          :prop="typeObj[formInline.type]"
          :label="objType[formInline.type]"
        >
          <allSelect
            :formInline="formInline"
            @validateRules="validateRules"
          ></allSelect
        ></el-form-item>
        <el-form-item prop="video" label="解析视频">
          <elUpload type="video" v-model="formInline.video"></elUpload>
        </el-form-item>
        <el-form-item prop="answer_analyze" label="答案解析">
          <quillEditor
            @change="validateRules('answer_analyze')"
            v-model="formInline.answer_analyze"
            :options="{ placeholder: '请在这里输入...' }"
          ></quillEditor>
        </el-form-item>
        <hr />
        <el-form-item prop="remark" label="试题备注">
          <el-input
            type="textarea"
            rows="2"
            v-model="formInline.remark"
          ></el-input>
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
import { addQuestion, editQuestion } from '@/api/question'
import allSelect from './allSelect'
import elUpload from '@/components/elUpload'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  watch: {
    isShow (newVal) {
      if (newVal === false) {
        this.formInline = {
          subject: '', // 是 int 学科id标识
          step: '', // 是 int 阶段1、初级 2、中级 3、高级
          enterprise: '', // 是 int 企业id标识
          city: [], // 是 array [省、市、区县]
          title: '', // 是 string 标题
          type: 1, // 是 string 题型 1单选 、2多选 、3简答
          difficulty: 1, // 是 int 题目难度 1简单 、2一般 、3困难
          single_select_answer: '', // 是 string 单选题答案
          multiple_select_answer: [], // 是 array 多选题答案
          short_answer: '', // 是 string 简答题答案
          video: '', // 否 string 解析视频地址
          answer_analyze: '', // 是 string 答案解析
          remark: '', // 是 string 答案备注
          select_options: [
            {
              label: 'A',
              text: '',
              image: ''
            },
            {
              label: 'B',
              text: '',
              image: ''
            },
            {
              label: 'C',
              text: '',
              image: ''
            },
            {
              label: 'D',
              text: '',
              image: ''
            }
          ]
        }
        // 清除验证
        this.$nextTick(() => {
          this.$refs.formInline.clearValidate()
        })
      }
    },
    components: { quillEditor, allSelect, elUpload },
    props: [
      'mode',
      'subjectList',
      'objStep',
      'businessList',
      'objType',
      'objDiff'
    ],
    data () {
      return {
        content: '',
        options: regionData,
        isShow: false,
        typeObj: {
          1: 'single_select_answer',
          2: 'multiple_select_answer',
          3: 'short_answer'
        },
        formInline: {
          subject: '', // 是 int 学科id标识
          step: '', // 是 int 阶段1、初级 2、中级 3、高级
          enterprise: '', // 是 int 企业id标识
          city: [], // 是 array [省、市、区县]
          title: '', // 是 string 标题
          type: 1, // 是 string 题型 1单选 、2多选 、3简答
          difficulty: 1, // 是 int 题目难度 1简单 、2一般 、3困难
          single_select_answer: '', // 是 string 单选题答案
          multiple_select_answer: [], // 是 array 多选题答案
          short_answer: '', // 是 string 简答题答案
          video: '', // 否 string 解析视频地址
          answer_analyze: '', // 是 string 答案解析
          remark: '', // 是 string 答案备注
          select_options: [
            {
              label: 'A',
              text: '',
              image: ''
            },
            {
              label: 'B',
              text: '',
              image: ''
            },
            {
              label: 'C',
              text: '',
              image: ''
            },
            {
              label: 'D',
              text: '',
              image: ''
            }
          ]
        },
        rules: {
          subject: [{ required: true, message: '必填哦~', trigger: 'change' }],
          step: [{ required: true, message: '必填哦~', trigger: 'change' }],
          enterprise: [
            { required: true, message: '必填哦~', trigger: 'change' }
          ],
          city: [{ required: true, message: '必填哦~', trigger: 'change' }],
          title: [{ required: true, message: '必填哦~', trigger: 'change' }],
          type: [{ required: true, message: '必填哦~', trigger: 'change' }],
          difficulty: [
            { required: true, message: '必填哦~', trigger: 'change' }
          ],
          single_select_answer: [
            { required: true, message: '必填哦~', trigger: 'change' }
          ],
          multiple_select_answer: [
            { required: true, message: '必填哦~', trigger: 'change' }
          ],
          short_answer: [
            { required: true, message: '必填哦~', trigger: 'change' }
          ],
          answer_analyze: [
            { required: true, message: '必填哦~', trigger: 'change' }
          ],
          remark: [{ required: true, message: '必填哦~', trigger: 'change' }]
        }
      }
    },
    created () {},
    methods: {
      // 提交
      submit () {
        this.$refs.formInline.validate(res => {
          if (res) {
            // eslint-disable-next-line eqeqeq
            if (this.mode == 'add') {
              addQuestion(this.formInline).then(res => {
                this.$message.success('新增成功~')
                // 关闭弹框
                this.isShow = false
                // 触发父组件的搜索
                this.$emit('search')
              })
            } else {
              editQuestion(this.formInline).then(res => {
                this.$message.success('编辑成功~')
                // 关闭弹框
                this.isShow = false
                // 触发父组件的搜索
                this.$emit('search')
              })
            }
          } else {
            this.$message.error('失败~')
          }
        })
      },
      // 自定义验证
      validateRules (str) {
        this.$refs.formInline.validateField(str)
      },
      handleChange (value) {
        console.log(value)
      }
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
