<template>
  <el-container class="home-container">
    <el-header class="home-header">
      <el-row>
        <el-col :span="4">
          <div class="top-img">
              <img src="../../assets/img/officepet.png" alt="无法显示图片" />
          </div>
        </el-col>
        <el-col :span="16" class="top-title">
          <h3>电商后台管理系统</h3>
        </el-col>
        <el-col :span="4">
          <div class="top-loginout">
            <span>用户：{{name}}</span>&nbsp;
            <a class="loginout" href="#" @click.prevent="quit()">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="home-aside" width="200px">
        <!-- 菜单导航 -->
        <el-menu :unique-opened="true" :router="true">
          <!-- 菜单列表 -->
          <el-submenu :index="''+ item.id" v-for="(item,index) in menus" :key="index">
            <template slot="title">
              <i class="el-icon-add-location"></i>
              <span>{{item.name}}</span>
            </template>
              <el-menu-item :index="item1.path" v-for="(item1,index) in item.children" :key="index">
                <i class="el-icon-position"></i>{{item1.name}}
              </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="home-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      menus: []
    }
  },
  mounted () {
  // 获取token判断是否登录
    const token = JSON.parse(localStorage.getItem('token'))
    this.name = token.username
    // 如果没有token,跳回登录
    if (!token) {
      this.$router.push({ name: 'login' })
    }
    // 如果有,继续渲染组件
  },
  created () {
    this.getMenus()
  },
  methods: {
    // 获取左侧导航栏列表
    async getMenus () {
      const res = await this.$http.get('/menus')
      // console.log(res.data)
      this.menus = res.data
    },
    // 用户退出
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
    height: 100%;
  }
  .top-img>img{
    height: 3.75rem;
  }
  .top-title{
    text-align: center;
  }
  .top-loginout{
    text-align: end;
  }
  .loginout{
    line-height: 3.75rem;
    text-decoration: none;
  }
</style>
