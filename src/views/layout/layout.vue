<template>
  <el-container class="container" v-if="isShow">
    <el-header class="header">
      <ul class="header-ul">
        <li @click="isCollapse = !isCollapse" class="el-icon-s-fold iCon"></li>
        <li class="logo">
          <img src="@/assets/img/loginLogo.png" alt="" />
        </li>
        <li class="title">阿宽面面</li>
        <li class="mid"></li>
        <li class="avator">
          <img
            v-if="$store.state.userInfo != ''"
            :src="baseUrl + '/' + $store.state.userInfo.avatar"
            alt=""
          />
        </li>
        <li class="name">{{ $store.state.userInfo.username }}</li>
        <li><el-button type="primary" @click="exit">退出</el-button></li>
      </ul>
    </el-header>
    <el-container>
      <el-aside class="aside" width="auto">
        <el-menu
          :default-active="$route.path"
          :collapse="isCollapse"
          class="el-menu-vertical-demo"
          router
        >
          <template
            v-for="(item, index) in this.$router.options.routes[2].children"
          >
            <el-menu-item
              :index="item.path"
              :key="index"
              v-if="item.meta.roles.includes($store.state.role)"
            >
              <i :class="item.meta.icon"></i>
              <span slot="title">{{ item.meta.title }}</span>
            </el-menu-item>
          </template>
          <!-- <el-menu-item index="/layout/userList">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/layout/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/layout/business">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/layout/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item> -->
        </el-menu>
      </el-aside>
      <el-container>
        <el-main class="main"><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { getUserInfo, logout } from '@/api/layout'
import { removeToken } from '@/utils/local'
export default {
  data () {
    return {
      isShow: false,
      userInfo: '',
      isCollapse: false,
      baseUrl: process.env.VUE_APP_URL
    }
  },
  created () {
    getUserInfo().then(res => {
      this.$store.state.userInfo = res.data
      this.$store.state.role = res.data.role
      this.isShow = true
      // 执行判断
      // 当前理由是否有权限让该角色,访问的处理
      if (this.$route.meta.roles.includes(this.$store.state.role) === false) {
        this.$message.error('您无权访问该页面')
        removeToken()
        this.$router.push('/login')
      }
      // eslint-disable-next-line eqeqeq
      if (res.data.status == 0) {
        this.$message.error('账号被禁用,请联系管理员')
        // 清理Token
        removeToken()
        // 跳转登录页
        this.$router.push('/login')
      }
      // window.console.log('用户信心', res)
      // window.console.log('路由信息', this.$router)
    })
  },
  methods: {
    exit () {
      this.$confirm('这就走啦?', '提示', {
        confirmButtonText: '走起',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        logout().then(() => {
          removeToken()
          this.$router.push('/')
        })
      })
    }
  }
}
</script>

<style lang="less">
.container {
  height: 100%;
  .header {
    background: rgba(232, 233, 236, 1);
    .header-ul {
      display: flex;
      align-items: center;
      text-align: center;
      padding: 10px;
      .iCon {
        margin-right: 20px;
        font-size: 24px;
      }
      .logo {
        margin-right: 20px;
      }
      .title {
        width: 92px;
        height: 22px;
        font-size: 22px;
        font-weight: 600;
        margin-bottom: 10px;
        color: rgba(73, 161, 255, 1);
      }
      .mid {
        flex: 1;
      }
      .avator {
        img {
          width: 43px;
          height: 43px;
          border-radius: 50%;
        }
      }
      .name {
        color: #3f3f3f;
        margin-left: 15px;
        margin-right: 20px;
      }
    }
  }
  .main {
    background-color: gray;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
}
</style>
