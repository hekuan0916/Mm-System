<template>
  <el-dialog
    :visible.sync="isShow"
    width="600px"
    class="register"
    :show-close="false"
  >
    <div slot="title" class="dialog-title">
      用户登录
    </div>
    <el-form :model="form" label-width="100px" :rules="rules" ref="form">
      <el-form-item prop="avatar" label="头像">
        <el-upload
          class="avatar-uploader"
          :action="baseUrl + '/uploads'"
          name="image"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item prop="username" label="昵称">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item prop="phone" label="手机">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item prop="code" label="图形码">
        <el-row>
          <el-col :span="14"><el-input v-model="form.code"></el-input> </el-col>
          <el-col :span="9" :offset="1">
            <img
              class="codeImg"
              :src="codeImg"
              alt=""
              @click="codeClick"
              v-if="bol"
            />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item prop="rcode" label="验证码">
        <el-row>
          <el-col :span="14"
            ><el-input v-model="form.rcode"></el-input>
          </el-col>
          <el-col :span="9" :offset="1">
            <el-button @click="getRcode" :disabled="totalTime < 5"
              >获取用户验证码<span v-if="totalTime != 5"
                >({{ totalTime + 1 }}秒)</span
              ></el-button
            >
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="isShow = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getRcode, registerUser } from '@/api/login.js'
export default {
  // 侦听器
  watch: {
    isShow (newVal) {
      // eslint-disable-next-line eqeqeq
      if (newVal == false) {
        this.$refs.form.resetFields()
        this.imageUrl = ''
      }
    }
  },
  data () {
    return {
      totalTime: 5,
      bol: true,
      imageUrl: '',
      isShow: false,
      baseUrl: process.env.VUE_APP_URL,
      codeImg: process.env.VUE_APP_URL + '/captcha?type=sendsms',
      form: {
        avatar: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        code: '',
        rcode: ''
      },
      rules: {
        avatar: [{ required: true, message: '请上传头像~', trigger: 'change' }],
        username: [
          { required: true, message: '请填写用户姓名~', trigger: 'change' }
        ],
        email: [
          { required: true, message: '请输入邮箱~', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
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
        password: [
          { required: true, message: '请填写密码~', trigger: 'change' },
          {
            min: 6,
            max: 12,
            message: '请填写6-12位密码~',
            trigger: 'change'
          }
        ],
        code: [{ required: true, message: '请填写图形码~', trigger: 'change' }],
        rcode: [
          { required: true, message: '请输入手机验证码~', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    // 获取验证码
    // getRcode () {
    //   let num = 0
    //   this.$refs.form.validateField(['phone', 'code'], errorMessage => {
    //     if (errorMessage == '') {
    //       num++
    //     }
    //     window.console.log('错误信息', errorMessage)
    //     // 验证通过接口获取手机验证码
    //     if (num == 2) {
    //       getRcode({
    //         phone: this.form.phone,
    //         code: this.form.code
    //       }).then(res => {
    //         console.log('成功', res)
    //         // this.$message.success(res.data.captcha + '')
    //         this.$message.success('验证通过')
    //       })
    //     } else {
    //       this.$message.error('验证不通过')
    //     }
    //   })
    // },
    getRcode () {
      let num = 0
      this.$refs.form.validateField(['phone', 'code'], errorMessage => {
        // eslint-disable-next-line eqeqeq
        if (errorMessage == '') {
          num++
        }
        window.console.log('错误信息', errorMessage)
      })
      // eslint-disable-next-line eqeqeq
      if (num == 2) {
        this.totalTime--
        const _interval = setInterval(() => {
          this.totalTime--
          if (this.totalTime <= -1) {
            clearInterval(_interval)
            this.totalTime = 5
          }
        }, 1000)
        getRcode({
          code: this.form.code,
          phone: this.form.phone
        }).then(res => {
          this.$message.success(res.data.captcha + '')
          window.console.log('通过', res)
        })
      } else {
        this.$message.error('验证不通过')
      }
    },
    //  刷新图形码
    codeClick () {
      //   this.bol = false
      //   this.$nextTick(() => {
      //     this.bol = true
      //   })
      this.codeImg =
        process.env.VUE_APP_URL + '/captcha?type=sendsms&asdasd' + Date.now()
    },
    // 上传成功处理
    handleAvatarSuccess (res) {
      window.console.log(res)
      this.imageUrl = this.baseUrl + '/' + res.data.file_path
      this.form.avatar = res.data.file_path
    },
    // 上传前处理
    beforeAvatarUpload (file) {
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 jpg/png/gif 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      // 它return的值就是控制让不让你通过  true通过  false不通过
      return isJPG && isLt2M
    },
    // 表单验证
    submit () {
      this.$refs.form.validate(res => {
        if (res) {
          registerUser(this.form).then(res => {
            window.console.log('注册返回信息:'.res)
            this.$message.success('注册成功~')
            this.isShow = false
          })
        } else {
          this.$message.error('注册失败')
        }
      })
    }
  }
}
</script>

<style lang="less">
.register {
  .dialog-title {
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #ffffff;
    background: linear-gradient(to right, #00c2f9, #1294fb);
  }
  .el-dialog__header {
    padding: 0;
  }
  .dialog-footer {
    text-align: center;
  }
  .codeImg {
    width: 100%;
  }
  el-form-item__content {
    width: 100px;
    margin: 0 auto;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
