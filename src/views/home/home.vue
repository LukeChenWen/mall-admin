<template>
  <el-container class="home-container">
    <el-header class="home-header">
      <el-row>
        <el-col :span="4">
          <div class="top-img">
              <img src="../../assets/img/officepet.png" alt="无法显示图片" />
          </div>
        </el-col>
        <el-col :span="18" class="top-title">
          <h3>电商后台管理系统</h3>
        </el-col>
        <el-col :span="2">
          <div class="top-loginout">
            <a class="loginout" href="#" @click.prevent="quit()">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="home-aside" width="200px">
        <!-- 菜单导航 -->
        <el-menu unique-opened="true">
          <!-- 1 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>用户管理</span>
            </template>
              <el-menu-item index="1-1">
                <i class="el-icon-ticketsn"></i>用户列表
              </el-menu-item>
          </el-submenu>
          <!-- 2 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-key"></i>
              <span>权限管理</span>
            </template>
              <el-menu-item index="2-1">
                <i class="el-icon-menu"></i>角色列表
              </el-menu-item>
              <el-menu-item index="2-2">
                <i class="el-icon-menu"></i>权限列表
              </el-menu-item>
          </el-submenu>
          <!-- 3 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-shopping-cart-2"></i>
              <span>商品管理</span>
            </template>
              <el-menu-item index="3-1">
                <i class="el-icon-sell"></i>商品列表
              </el-menu-item>
              <el-menu-item index="3-2">
                <i class="el-icon-more-outline"></i>分类参数
              </el-menu-item>
              <el-menu-item index="3-3">
                <i class="el-icon-s-grid"></i>商品分类
              </el-menu-item>
          </el-submenu>
          <!-- 4 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-claim"></i>
              <span>订单管理</span>
            </template>
              <el-menu-item index="4-1">
                <i class="el-icon-s-order"></i>订单列表
              </el-menu-item>
          </el-submenu>
          <!-- 5 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span>数据统计</span>
            </template>
              <el-menu-item index="5-1">
                <i class="el-icon-s-data"></i>数据报表
              </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="home-main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  beforeCreate () {
  // 获取token判断是否登录
    const token = localStorage.getItem('token')
    // 如果没有token,跳回登录
    if (!token) {
      this.$router.replace({ name: 'login' })
    }
    // 如果有,继续渲染组件
  },
  methods: {
    quit () {
      // 退出时清除token
      localStorage.clear()
      // 提示退出成功
      this.$message({ message: '退出成功', type: 'success' })
      // 跳转登录页
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style>
  .home-container {
    height: 100%;
  }

  .home-header {
    background-color: #b3c0d1;
  }

  .home-aside {
    background-color: #d3dce6;
  }

  .home-main {
    background-color: #e9eef3;
  }
  .top-img>img{
    height: 3.75rem;
  }
  .top-title{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .top-loginout{
    text-align: end;
  }
  .loginout{
    line-height: 3.75rem;
    text-decoration: none;
  }
</style>
