<template>
    <div class="login-wrap">
      <el-form label-position="top" label-width="80px" :model="formdata" class="login-form">
        <h2 class="login-title">Login</h2>
        <el-form-item label="用户名">
          <el-input v-model="formdata.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formdata.password"></el-input>
        </el-form-item>
        <el-button class="login-btn" type="primary" @click.prevent="handlerLogin()">登 录</el-button>
      </el-form>
    </div>
</template>

<script>
// import axios from 'axios'
export default {
  data () {
    return {
      formdata: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    // 登录请求
    handlerLogin () {
      this.$http.get('http://localhost:3000/user/', {
        params: { name: this.formdata.username }
      }).then((res) => {
        console.log(res.data[0].name + '--' + res.data[0].password + '--' + res.data[0].id)
        if (res.status === 200) {
          this.$message({
            showClose: true,
            message: '登录成功',
            type: 'success'
          })
          this.$router.push({ name: 'Home' })
        }
      })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: '登录失败',
            type: 'error'
          })
          console.log(err)
        })
    }
  }
}
</script>

<style>
.login-wrap{
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrap .login-form{
  width: 18.75rem;
  background-color: #FFFFFF;
  border-radius: 0.3125rem;
  padding: 0 1.25rem 1.25rem 1.25rem;
}
.login-form .login-title{
  text-align: center;
  margin: 0.625rem 0;
}
.login-form .login-btn{
  width: 100%;
}
</style>
