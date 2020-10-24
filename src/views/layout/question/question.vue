<template>
  <div class="question">
    <el-card>
      <el-form
        inline
        :model="formInline"
        class="demo-form-inline"
        label-width="50px"
        ref="formInline"
      >
        <el-row>
          <el-col :span="5">
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
          </el-col>
          <el-col :span="5">
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
          </el-col>
          <el-col :span="5">
            <el-form-item prop="enterprise" label="企业">
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
            <el-form-item prop="type" label="题型">
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
            <el-form-item prop="difficulty" label="难度">
              <el-select
                v-model="formInline.difficulty"
                placeholder="请选择难度"
              >
                <el-option
                  v-for="(value, key, index) in objDiff"
                  :key="index"
                  :label="value"
                  :value="key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="username" label="阶段">
              <el-input
                v-model="formInline.username"
                placeholder="请输入作者"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="status" label="状态">
              <el-select v-model="formInline.status" placeholder="请选择状态">
                <el-option label="禁用" :value="0"></el-option>
                <el-option label="启用" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="create_date" label="日期">
              <el-date-picker
                v-model="formInline.create_date"
                placeholder="请选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item prop="title" label="标题">
              <el-input v-model="formInline.title" placeholder="请输入标题" />
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item>
              <el-button class="btn" type="primary" @click="search"
                >搜索</el-button
              >
              <el-button @click="reset">清除</el-button>
              <el-button type="primary" @click="add">+新增试题</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="tableCard">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="序号" width="50">
          <template v-slot="scope">
            {{
              (pagination.currentPage - 1) * pagination.pageSize +
                scope.$index +
                1
            }}</template
          >
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
            {{ scope.row.status == 0 ? 'X' : '√' }}
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"> </el-table-column>
        <el-table-column label="操作" width="250">
          <template v-slot="scope">
            <el-button
              @click="edit(scope.row)"
              type="primary"
              icon="el-icon-edit"
              circle
            ></el-button>
            <el-button type="success" circle @click="setStatus(scope.row.id)">{{
              scope.row.status == 1 ? 'X' : '√'
            }}</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="del(scope.row.id)"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
      >
      </el-pagination>
    </el-card>
    <addQuestion
      ref="addQuestion"
      :subjectList="subjectList"
      :objStep="objStep"
      :businessList="businessList"
      :objType="objType"
      :objDiff="objDiff"
      @search="search"
      :mode="mode"
    ></addQuestion>
  </div>
</template>
<script>
import { getSubList } from '@/api/subject'
import { getBusinessList } from '@/api/business'
import { getQuestionList, statusQuestion, delQuestion } from '@/api/question'
import addQuestion from './addQuestion'
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { addQuestion },
  data () {
    return {
      mode: 'add',
      formInline: {
        subject: '', // 否 int 学科id
        step: '', // 否 string 题目阶段:1(初级),2(中级),3(高级)
        enterprise: '', // 否 int 企业id
        type: 1, // 否 int 题目类型:1(单选),2(多选),3(简答)
        difficulty: 1, // 否 int 题目难度: 1(简单),2(一般),3(困难)
        username: '', // 否 string 作者
        status: '', // 否 int 状态:0(禁用),1(启用)
        create_date: '', // 否 string 创建日期
        title: '', // 否 string 标题名称
        page: '', // 否 string 页码 默认为1
        limit: '' // 否 string 页尺寸 默认为10
      },
      subjectList: [], // 学科列表
      businessList: [], // 企业列表
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
      objDiff: {
        1: '简单',
        2: '一般',
        3: '困难'
      },
      tableData: [],
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      }
    }
  },
  methods: {
    // 设置状态
    setStatus (id) {
      statusQuestion({ id }).then(res => {
        this.$message.success('设置状态成功~')
        this.getList()
      })
    },
    // 删除
    del (id) {
      this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delQuestion({ id }).then(() => {
          this.$message.success('删除成功~')
          this.getList()
        })
      })
    },
    // 新增
    add () {
      this.mode = 'add'
      this.$refs.addQuestion.isShow = true
    },
    // 编辑
    edit (row) {
      this.mode = 'edit'
      this.$refs.addQuestion.isShow = true
      this.$refs.addQuestion.formInline = JSON.parse(JSON.stringify(row))
    },
    // 搜索
    search () {
      this.pagination.currentPage = 1
      this.getList()
    },
    // 清空表单
    reset () {
      this.$refs.formInline.resetFields()
      this.search()
    },
    // 当前页码改变
    handleCurrentChange (page) {
      this.pagination.currentPage = page
      this.getList()
    },
    // 页容量改变
    handleSizeChange (size) {
      this.pagination.pageSize = size
      this.pagination.currentPage = 1
      this.getList()
    },
    // 获取列表
    getList () {
      const _query = {
        ...this.formInline,
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize
      }
      getQuestionList(_query).then(res => {
        // eslint-disable-next-line no-unused-vars

        const _temp = res.data.items
        _temp.forEach(item => {
          item.city = item.city.split(',')
          item.multiple_select_answer = item.multiple_select_answer.split(',')
        })
        this.tableData = _temp
        this.pagination.total = res.data.pagination.total
        window.console.log('题库列表', res)
      })
    }
  },
  created () {
    // 获取学科列表
    getSubList().then(res => {
      this.subjectList = res.data.items
      // window.console.log('获取学科列表', res)
    })
    // 获取企业列表
    getBusinessList().then(res => {
      this.businessList = res.data.items
      // window.console.log('获取企业列表', res)
    })
    this.getList()
  }
}
</script>

<style lang="less">
.question {
  .tableCard {
    margin-top: 10px;
  }
  .pagination {
    margin-top: 5px;
    text-align: center;
  }
}
</style>
