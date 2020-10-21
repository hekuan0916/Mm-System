/* eslint-disable no-unused-vars */
<template>
  <div class="userList">
    <el-card>
      <el-form
        inline
        :model="formInline"
        class="demo-form-inline"
        ref="formInline"
      >
        <el-form-item prop="username" label="用户名称">
          <el-input
            v-model="formInline.username"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item prop="email" label="用户邮箱">
          <el-input v-model="formInline.email" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="role" label="角色">
          <el-select v-model="formInline.role" placeholder="请选择">
            <el-option label="超级管理员" value="1"></el-option>
            <el-option label="管理员" value="2"></el-option>
            <el-option label="教师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
          <el-button
            type="primary"
            @click="addUser"
            v-if="['超级管理员', '管理员'].includes($store.state.role)"
            >╋ 新增用户</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="card2">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="序号" width="60">
          <template v-slot="scope">
            {{
              (pagination.currentPage - 1) * pagination.pageSize +
                scope.$index +
                1
            }}
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="180">
        </el-table-column>
        <el-table-column prop="phone" label="电话"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="role" label="角色"> </el-table-column>
        <el-table-column prop="remark" label="备注"> </el-table-column>
        <el-table-column prop="status" label="状态" width="80">
          <template v-slot="scope">
            {{ scope.row.status == 0 ? '禁用' : '启用' }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="250">
          <template slot-scope="scope">
            <el-button
              @click="edit(scope.row)"
              size="small"
              v-if="
                ['超级管理员', '管理员', '老师'].includes($store.state.role)
              "
              >编辑</el-button
            >
            <el-button
              size="small"
              @click="setStatus(scope.row.id)"
              v-if="
                ['超级管理员', '管理员', '老师'].includes($store.state.role)
              "
              >{{ scope.row.status == 1 ? '禁用' : '启用' }}</el-button
            >
            <el-button
              size="small"
              v-if="$store.state.role.includes('管理员')"
              @click="del(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card>
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
    <addUser ref="addUser" :modeSon="modeFather" @sonSearch="search"></addUser>
  </div>
</template>

<script>
import addUser from './addUser'
import { getUserList, subStatus, removeUser } from '@/api/userList.js'
export default {
  components: {
    addUser
  },
  data () {
    return {
      modeFather: 'add',
      // 页码
      pagination: {
        // 当前页码
        currentPage: 1,
        // 每页显示的条数
        pageSize: 10,
        // 总条数
        total: 100
      },
      formInline: {
        username: '',
        email: '',
        role: '',
        page: '', // 页码 默认为1
        limit: '', // 0(禁用) 1(启用) // 页尺寸 默认为10
        status: ''
      },
      tableData: []
    }
  },
  methods: {
    // 改变状态
    setStatus (id) {
      subStatus({ id }).then(() => {
        this.$message.success('设置状态成功')
        this.search()
      })
    },
    // 当前条数
    handleSizeChange (size) {
      this.pagination.pageSize = size
      this.pagination.currentPage = 1
      this.getList()
      window.console.log('每条页数', size)
    },
    // 当前页码
    handleCurrentChange (page) {
      this.pagination.currentPage = page
      this.getList()
      window.console.log('当前页码', page)
    },
    // 删除
    del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeUser({ id }).then(() => {
          this.$message.success('删除成功')
          this.search()
        })
      })
    },
    // 编辑
    edit (row) {
      this.modeFather = 'edit'
      this.$refs.addUser.dialogFormVisible = true
      this.$refs.addUser.form = JSON.parse(JSON.stringify(row))
    },
    // 查询
    search () {
      this.pagination.currentPage = 1
      this.getList()
    },
    // 重置
    reset () {
      this.$refs.formInline.resetFields()
      this.search()
    },
    // 新增用户
    addUser () {
      this.modeFather = 'add'
      this.$refs.addUser.dialogFormVisible = true
    },
    // 获取用户列表
    getList () {
      // eslint-disable-next-line no-unused-vars
      const _pageInfo = {
        ...this.formInline,
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize
      }
      getUserList(_pageInfo).then(res => {
        this.tableData = res.data.items
        this.pagination.total = res.data.pagination.total
        // window.console.log('用户列表', res)
      })
    }
  },
  created () {
    // eslint-disable-next-line no-undef
    this.getList()
  }
}
</script>

<style lang="less">
.userList {
  .card2 {
    margin-top: 20px;
  }
}
</style>
