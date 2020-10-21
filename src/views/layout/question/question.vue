<template>
  <div class="question">
    <el-card>
      <el-form
        inline
        :model="formInline"
        class="demo-form-inline"
        label-width="50px"
      >
        <el-row>
          <el-col :span="5">
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
          </el-col>
          <el-col :span="5">
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
          </el-col>
          <el-col :span="5">
            <el-form-item label="企业">
              <el-select
                v-model="formInline.enterprise"
                placeholder="请选择企业"
              >
                <el-option
                  v-for="(item, index) in businessList"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="题型">
              <el-select v-model="formInline.type" placeholder="请选择题型">
                <el-option
                  v-for="(value, key, index) in objType"
                  :key="index"
                  :label="value"
                  :value="+key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="难度">
              <el-select
                v-model="formInline.difficulty"
                placeholder="请选择难度"
              >
                <el-option
                  v-for="(value, key, index) in Objdiff"
                  :key="index"
                  :label="value"
                  :value="key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="阶段">
              <el-input
                v-model="formInline.username"
                placeholder="请输入作者"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="状态">
              <el-select v-model="formInline.status" placeholder="请选择状态">
                <el-option label="禁用" :value="0"></el-option>
                <el-option label="启用" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="日期">
              <el-date-picker
                v-model="formInline.create_date"
                placeholder="请选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="标题">
              <el-input v-model="formInline.title" placeholder="请输入标题" />
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item>
              <el-button class="btn" type="primary">搜索</el-button>
              <el-button>清除</el-button>
              <el-button type="primary">+新增试题</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="序号" width="50">
          <template v-slot="scope"> {{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column prop="title" label="题目">
          <template v-slot="scope">
            <div v-html="scope.row.title"></div>
          </template>
        </el-table-column>
        <el-table-column prop="subject_name" label="学科.阶段">
          <template v-slot="scope">
            {{ scope.row.subject_name }}.{{ objStep[scope.row.step] }}</template
          >
        </el-table-column>
        <el-table-column prop="type" label="题型">
          <template v-slot="scope"> {{ objType[scope.row.type] }}</template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业"> </el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <template v-slot="scope">
            {{ scope.row.status == 0 ? '禁用' : '启用' }}
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"> </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button>添加</el-button>
            <el-button>{{ scope.row.status == 1 ? '禁用' : '启用' }}</el-button>
            <el-button>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import { getSubList } from '@/api/subject'
import { getBusinessList } from '@/api/business'
import { getQuestionList } from '@/api/question'
export default {
  data () {
    return {
      formInline: {
        subject: '', // 否 int 学科id
        step: '', // 否 string 题目阶段:1(初级),2(中级),3(高级)
        enterprise: '', // 否 int 企业id
        type: '', // 否 int 题目类型:1(单选),2(多选),3(简答)
        difficulty: '', // 否 int 题目难度: 1(简单),2(一般),3(困难)
        username: '', // 否 string 作者
        status: '', // 否 int 状态:0(禁用),1(启用)
        create_date: '', // 否 string 创建日期
        title: '', // 否 string 标题名称
        page: '', // 否 string 页码 默认为1
        limit: '' // 否 string 页尺寸 默认为10
      },
      subjectList: [], // 学科列表
      businessList: [], // 学科列表
      objStep: {
        1: '初级',
        2: '中级',
        3: '高级'
      },
      objType: {
        1: '单选',
        2: '多选',
        3: '简答'
      },
      Objdiff: {
        1: '简单',
        2: '一般',
        3: '困难'
      },
      tableData: []
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    getList () {
      const _query = {
        ...this.formInline,
        page: 1,
        limit: 1
      }
      getQuestionList(_query).then(res => {
        this.tableData = res.data.items
        window.console.log('题库列表', res)
      })
    }
  },
  created () {
    getSubList().then(res => {
      this.subjectList = res.data.items
      // window.console.log('获取学科列表', res)
    })
    getBusinessList().then(res => {
      this.businessList = res.data.items
      // window.console.log('获取企业列表', res)
    })
    this.getList()
  }
}
</script>

<style></style>
