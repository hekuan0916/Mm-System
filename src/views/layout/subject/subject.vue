<template>
  <div class="subject">
    <!-- 表单 -->
    <el-card>
      <el-form
        inline
        :model="formInline"
        class="demo-form-inline"
        ref="formInline"
      >
        <el-form-item prop="rid" label="学科编号">
          <el-input
            class="inputName"
            v-model="formInline.rid"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item prop="name" label="学科名称">
          <el-input
            class="inputName"
            v-model="formInline.name"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item prop="username" label="创建者">
          <el-input
            class="inputName"
            v-model="formInline.username"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item prop="status" label="状态">
          <el-select
            class="inputName"
            v-model="formInline.status"
            placeholder="请选择"
          >
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button type="info" @click="reset">清除</el-button>
          <el-button type="primary" @click="add">+ 新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-card class="elTable">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" width="50">
          <template v-slot="scope">
            {{
              (pagination.currentPage - 1) * pagination.pageSize +
                scope.$index +
                1
            }}
          </template></el-table-column
        >
        <el-table-column prop="rid" label="学科编号" width="150 ">
        </el-table-column>
        <el-table-column prop="name" label="学科名称" width="150">
        </el-table-column>
        <el-table-column prop="short_name" label="简称" width="150">
        </el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>
        <el-table-column prop="create_time" label="创建日期"> </el-table-column>
        <el-table-column prop="status" label="状态" width="50">
          <template v-slot="scope"
            >{{ scope.row.status == 0 ? '禁用' : '启用' }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template v-slot="scope">
            <el-button @click="edit(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button size="small" @click="setStatus(scope.row.id)">{{
              scope.row.status == 1 ? '禁用' : '启用'
            }}</el-button>
            <el-button type="text" size="small" @click="del(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 页码 -->
    <el-card>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-sizes="[1, 10, 20, 30, 40]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
      >
      </el-pagination>
    </el-card>
    <addSubject
      ref="addSubject"
      :modeSon="modeFather"
      @sonSearch="search"
    ></addSubject>
  </div>
</template>

<script>
import { getSubList, setSubStatus, removeSub } from '@/api/subject'
import addSubject from './addSubject'
export default {
  components: {
    addSubject
  },
  data () {
    return {
      modeFather: 'add',
      // 页码
      pagination: {
        currentPage: 1, // 当前页
        pageSize: 10, // 每页条数
        total: 100 // 总数
      },
      tableData: [],
      formInline: {
        page: '', // 页码 默认为1
        limit: '', // 页尺寸 默认为10
        rid: '', // 学科编号
        name: '', // 学科名称
        username: '', // 创建者用户名
        status: '' // 0(禁用) 1(启用)
      }
    }
  },
  methods: {
    // 添加学科
    add () {
      this.modeFather = 'add'
      this.$refs.addSubject.dialogFormVisible = true
    },
    // 删除学科
    del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeSub({ id }).then(() => {
          this.$message.success('删除成功')
          this.search()
        })
      })
    },
    // 改变状态
    setStatus (id) {
      setSubStatus({ id }).then(res => {
        this.$message.success('状态设置成功')
        this.search()
      })
    },
    // 每页条数
    handleSizeChange (size) {
      window.console.log('每页条数', size)
      this.pagination.pageSize = size
      this.pagination.currentPage = 1
      this.getData()
    },
    // 当期页码改变
    handleCurrentChange (page) {
      this.pagination.currentPage = page
      this.getData()
      window.console.log('当期页码', page)
    },
    // 表格状态
    // tableRowClassName ({ row, rowIndex }) {
    //   if (rowIndex === 1) {
    //     return 'warning-row'
    //   } else if (rowIndex === 3) {
    //     return 'success-row'
    //   }
    //   return ''
    // },
    // 表单搜索
    search () {
      this.pagination.currentPage = 1
      this.getData()
    },
    // 表单清空
    reset () {
      this.$refs.formInline.resetFields()
      this.search()
    },
    // 编辑
    edit (row) {
      this.modeFather = 'edit'
      this.$refs.addSubject.dialogFormVisible = true
      this.$refs.addSubject.form = JSON.parse(JSON.stringify(row))
    },
    // 获取列表数据
    getData () {
      // eslint-disable-next-line prefer-const
      let _pageInfo = {
        ...this.formInline,
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize
      }
      getSubList(_pageInfo).then(res => {
        this.tableData = res.data.items
        this.pagination.total = res.data.pagination.total
        // window.console.log('获取学科列表', res)
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang="less">
.subject {
  .inputName {
    width: 120px;
  }
  .elTable {
    margin-top: 20px;
  }
  .pagination {
    margin-left: 200px;
  }
}
</style>
