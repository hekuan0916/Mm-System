<template>
  <div class="login">
    <div class="left">
      <div class="title">
        <img src="@/assets/img/loginLogo.png" alt="" />
        <span class="titleName">阿宽面面</span>
        <span>|</span>
        <span class="titleName2">用户登录</span>
      </div>
      <el-form class="form" :model="form" ref="form" :rules="rules">
        <el-form-item prop="phone">
          <el-input
            placeholder="请输入手机号"
            prefix-icon="el-icon-user"
            v-model="form.phone"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :show-password="true"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="form.password"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-code" prop="code">
          <el-row>
            <el-col :span="16">
              <el-input
                placeholder="请输入验证码"
                prefix-icon="el-icon-key"
                v-model="form.code"
              >
              </el-input
            ></el-col>
            <el-col :span="8"> <img src="@/assets/img/key.jpg" alt=""/></el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="isCheck">
          <el-checkbox v-model="form.isCheck"
            >我已阅读并同意<el-link type="primary">用户协议</el-link> 和<el-link
              type="primary"
              >隐私条款</el-link
            >
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" round @click="submitForm()"
            >登录</el-button
          >
          <br />
          <el-button class="btn" type="primary" round>注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/img/login_banner_ele.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      form: {
        phone: '', // 手机号
        password: '', // 密码
        code: '', // 验证码
        isCheck: []
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号！', trigger: 'blur' },
          {
            min: 3,
            max: 11,
            message: '请输入11位数字的手机号码!',
            trigger: 'change'
          }
        ],
        password: [
          { required: true, message: '请填入密码！', trigger: 'blur' },
          {
            min: 6,
            max: 12,
            message: '请输入6-12位密码！',
            trigger: 'change'
          }
        ],
        code: [
          {
            required: true,
            min: 4,
            max: 4,
            message: '请填入验证码！',
            trigger: 'change'
          }
        ],
        isCheck: [{ required: true, message: '请勾选', trigger: 'change' }]
      }
    }
  },
  methods: {
    submitForm () {
      window.console.log(this.form)
      this.$refs.form.validate(res => {
        if (res) {
          this.$message.success('你成功啦')
        } else {
          this.$message.error('这是一个错误哦！！')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less">
.login {
  /* 弹性盒子布局 */
  display: flex;
  /* 水平布局 */
  justify-content: space-around;
  /* 垂直居中 */
  align-items: center;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  .left {
    width: 478px;
    height: 550px;
    padding: 42px;
    background-color: #f5f5f5;
    .title {
      display: flex;
      align-items: center;
      .titleName {
        font-size: 24px;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin: 0 15px;
      }
      .titleName2 {
        font-size: 22px;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin: 0 15px;
      }
    }
    .form {
      margin-top: 20px;
      .form-code {
        margin-top: 20px;
        img {
          height: 40px;
          width: 100%;
        }
      }
      .btn {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>
