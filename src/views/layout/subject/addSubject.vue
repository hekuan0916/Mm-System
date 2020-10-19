/* eslint-disable eqeqeq */
<template>
  <el-dialog class="subjectAdd" :visible.sync="dialogFormVisible" width="500px">
    <div slot="title" class="title">新增学科</div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item prop="rid" label="学科编号">
        <el-input v-model="form.rid"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="学科名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item prop="short_name" label="学科简称">
        <el-input v-model="form.short_name"></el-input>
      </el-form-item>
      <el-form-item prop="intro" label="学科介绍">
        <el-input v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item prop="remark" label="学科备注">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitClick">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addSub, editSub } from '@/api/subject'
export default {
  props: ['modeSon'],
  // 侦听器
  watch: {
    dialogFormVisible (newVal) {
      // eslint-disable-next-line eqeqeq
      if (newVal == false) {
        // 清理表单
        this.form = {
          rid: '', // 学科编号
          name: '', // 学科名称
          short_name: '', // 学科简称
          intro: '', // 学科简介
          remark: '' // 备注
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
        rid: '', // 学科编号
        name: '', // 学科名称
        short_name: '', // 学科简称
        intro: '', // 学科简介
        remark: '' // 备注
      },
      rules: {
        rid: [
          { required: true, message: '请填写学科编号~', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请填写学科名称~', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitClick () {
      this.$refs.form.validate(res => {
        if (res) {
          // eslint-disable-next-line eqeqeq
          if (this.modeSon == 'edit') {
            editSub(this.form).then(() => {
              this.$message.success('编辑成功')
              this.dialogFormVisible = false
              this.$emit('sonSearch')
            })
          } else {
            addSub(this.form).then(res => {
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
.subjectAdd {
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
