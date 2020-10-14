<template>
  <el-container class="container">
    <el-header class="header">
      <ul class="header-ul">
        <li class="el-icon-s-fold iCon"></li>
        <li
          class="logo
        "
        >
          <img src="@/assets/img/loginLogo.png" alt="" />
        </li>
        <li class="title">阿宽面面</li>
        <li class="mid"></li>
        <li class="avator"><img src="@/assets/img/home_logo.jpg" alt="" /></li>
        <li class="name">李达,你好</li>
        <li><el-button type="primary" size="mini">退出</el-button></li>
      </ul>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">Aside</el-aside>
      <el-container>
        <el-main class="main">Main</el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {}
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
  .aside {
    background-color: palevioletred;
  }
  .main {
    background-color: green;
  }
}
</style>
