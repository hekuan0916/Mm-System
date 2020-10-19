<template>
  <el-dialog :visible.sync="dialogFormVisible" class="addUser" width="500px">
    <div slot="title" class="title">
      新增用户
    </div>
    <el-form :model="form" label-width="80px" :rules="rules" ref="form">
      <el-form-item label="用户名">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="form.role_id" placeholder="请选择角色">
          <el-option label="超级管理员" value="1"></el-option>
          <el-option label="管理员" value="2"></el-option>
          <el-option label="教师" value="3"></el-option>
          <el-option label="学生" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户备注">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitClick">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addUser, editUser } from '@/api/userList'
export default {
  props: ['modeSon'],
  // 侦听器
  watch: {
    dialogFormVisible (newVal) {
      // eslint-disable-next-line eqeqeq
      if (newVal == false) {
        // 清理表单
        this.form = {
          username: '', //  用户名
          email: '', //  邮箱
          phone: '', //  手机号
          role_id: '', //  角色 、2 管理员、3 老师、4 学生
          status: '', //  1(启用)0(禁用)
          remark: '' //  备注
        }
        this.$nextTick(() => {
          this.$refs.form.clearValidate()
        })
      }
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      form: {
        username: '', //  用户名
        email: '', //  邮箱
        phone: '', //  手机号
        role_id: '', //  角色 、2 管理员、3 老师、4 学生
        status: '', //  1(启用)0(禁用)
        remark: '' //  备注
      },
      rules: {
        username: [
          { required: true, message: '请填写用户名~', trigger: 'change' }
        ],
        email: [
          { required: true, message: '请填写邮箱~', trigger: 'change' },
          {
            validator: (rules, value, callback) => {
              const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
              if (reg.test(value)) {
                callback()
              } else {
                // eslint-disable-next-line standard/no-callback-literal
                callback('请输入正确的邮箱~')
              }
            },
            trigger: 'change'
          }
        ],
        phone: [
          { required: true, message: '请输入手机号码~', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
              if (reg.test(value)) {
                callback()
              } else {
                // eslint-disable-next-line standard/no-callback-literal
                callback('请输入正确的手机号码~')
              }
            },
            trigger: 'change'
          }
        ],
        role_id: [
          { required: true, message: '请选择角色~', trigger: 'change' }
        ],
        status: [{ required: true, message: '请选择状态~', trigger: 'change' }]
      }
    }
  },
  methods: {
    // 确认新增
    submitClick () {
      this.$refs.form.validate(res => {
        if (res) {
          // eslint-disable-next-line eqeqeq
          if (this.modeSon == 'edit') {
            editUser(this.form).then(res => {
              this.$message.success('编辑成功')
              this.dialogFormVisible = false
              this.$emit('sonSearch')
            })
          } else {
            addUser(this.form).then(res => {
              this.$message.success('新增成功')
              this.dialogFormVisible = false
              this.$parent.search()
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="less">
.addUser {
  .title {
    height: 53px;
    line-height: 53px;
    text-align: center;
    color: #fff;
    background-color: rgb(16, 158, 249);
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .el-dialog__headerbtn .el-dialog__close:hover {
    color: red;
  }
  .footer {
    text-align: center;
  }
}
</style>
