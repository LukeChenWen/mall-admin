<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <breadcrumb :breadlist="breadlist"></breadcrumb>
    <!-- 搜索框 -->
    <el-row class="search-row">
      <el-col>
        <el-input placeholder="请输入内容" v-model="searchInput" class="search-input">
          <el-button @click="searchUser()" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button @click="showAddUser()" type="success" plain >添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 增加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="150px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="150px">
          <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="150px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="150px">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="AddSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户信息对话框 -->
    <el-dialog title="编辑信息" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="150px">
          <el-input disabled v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="150px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="150px">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="EditSubmit()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户角色对话框 -->
    <el-dialog title="用户角色" :visible.sync="dialogFormVisibleRole">
      <el-form>
        <el-form-item label="用户名" label-width="150px">
          {{currentUser.username}}
        </el-form-item>
        <el-form-item label="用户角色" label-width="150px">
          <el-select v-model="currentUser.rid" placeholder="请选择">
            <el-option label="请选择" :value="-1"></el-option>
           <el-option :label="item.rolename" :value="item.id"
           v-for="(item,index) in roles" :key="index">
           </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
        <el-button type="primary" @click="setUserRole()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 表格 -->
    <el-table :data="userList" style="width: 100%">
      <el-table-column type="index" label="#" width="30">
      </el-table-column>
      <el-table-column prop="username" label="姓名" width="80">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180">
      </el-table-column>
      <el-table-column prop="phone" label="电话" width="140">
      </el-table-column>
      <el-table-column label="创建日期" width="100">
        <!-- 如果单元格内显示的不是字符串（文本），需要在内容外层包一个template -->
        <!-- template内部要用数据，需设置slot-scope属性-->
        <!-- 该属性的值是这里的createDate最外层的数据源userList(取名一般都为scope) -->
        <!-- userList.row就是数组中的每一个对象 -->
        <template slot-scope="scope">
          {{scope.row.createdate | fmtdate}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户状态" width="80">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" active-color="#13ce66"
           inactive-color="#ff4949" @change="changeStatus(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" :plain="true" type="primary"
           icon="el-icon-edit" circle @click="showEditUser(scope.row)">
          </el-button>
          <el-button size="small" :plain="true" type="danger"
           icon="el-icon-delete" circle @click="showDeleteUser(scope.row.id)">
          </el-button>
          <el-button size="small" :plain="true" type="success"
           icon="el-icon-s-custom" circle @click="showChangeRole(scope.row)">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
    :current-page="pagenum" :page-sizes="[2, 4, 6, 8]" :page-size="pagesize"
    layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
import breadcrumb from '../common/breadcrumb/breadcrumb.vue'
export default {
  components: {
    breadcrumb
  },
  data () {
    return {
      searchInput: '',
      // 面包屑列表
      breadlist: ['首页', '用户管理', '用户列表'],
      userList: [],
      // 分页相关数据
      total: 1,
      pagenum: 1,
      pagesize: 2,
      // 添加用户对话框是否弹出属性
      dialogFormVisibleAdd: false,
      // 修改用户信息对话框是否弹出属性
      dialogFormVisibleEdit: false,
      // 用户角色对话框是否弹出属性
      dialogFormVisibleRole: false,
      // 对话框表单对象
      form: {
        username: '',
        password: '',
        email: '',
        phone: '',
        createdate: '',
        status: ''
      },
      currentUser: {
        id: -1,
        username: '',
        rid: -1,
        password: '',
        email: '',
        phone: '',
        createdate: '',
        status: ''
      },
      roles: []
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    // 分配角色
    async setUserRole () {
      // 修改角色
      const res = await this.$http.put(`user/${this.currentUser.id}`, this.currentUser)
      console.log(res)
      if (res.status === 200) {
        this.$message.success('修改成功')
        this.dialogFormVisibleRole = false
      } else {
        this.$message.error('修改失败')
      }
    },
    // 显示用户角色对话框
    async showChangeRole (user) {
      // 打开对话框
      this.dialogFormVisibleRole = true
      // 赋值属性给当前角色，从而在对话框中可以拿到数据
      this.currentUser = user
      const res = await this.$http.get('role/')
      console.log(res.data)
      this.roles = res.data
    },
    // 修改用户状态
    async changeStatus (user) {
      const res = await this.$http.put(`user/${user.id}`, user)
      if (res.status === 200) {
        console.log(user.username + '用户的用户状态修改为' + user.status)
      } else {
        this.$message.error('修改失败')
      }
    },
    // 显示编辑用户提示框
    showEditUser (user) {
      this.dialogFormVisibleEdit = true
      // 赋值给表单
      this.form = user
    },
    // 编辑用户信息提交
    async EditSubmit () {
      // 发送修改请求
      const res = await this.$http.put(`user/${this.form.id}`, this.form)
      if (res.status === 200) {
        this.$message.success('修改成功')
        // 关闭对话框
        this.dialogFormVisibleEdit = false
        // 更新视图
        this.getUserList()
      } else {
        this.$message.error('修改失败')
      }
    },
    // 提示删除用户
    showDeleteUser (id) {
      this.$confirm('是否删除用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 通过方法参数拿到当前id，发送请求
        const res = await this.$http.delete(`user/${id}`)
        this.getUserList()
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        } else {
          this.$message.error('删除失败')
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.getUserList()
      this.pagenum = 1
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getUserList()
    },
    // 显示增加用户对话框
    showAddUser () {
      // 清空表单数据
      this.form = {}
      // 显示对话框
      this.dialogFormVisibleAdd = true
    },
    // 增加用户提交
    async AddSubmit () {
      // 关闭对话框
      this.dialogFormVisibleAdd = false
      // 获取当前日期时间戳
      this.form.createdate = Math.round(new Date() / 1000)
      this.form.status = true
      // 发送表单
      const res = await this.$http.post('user/?', this.form)
      console.log(res)
      if (res.status === 201) {
        this.$message.success('提交成功')
        this.getUserList()
        // 清空表单
        this.form = {}
      } else {
        this.$message.error('提交失败')
      }
    },
    // 搜索用户
    searchUser () {
      this.$http.get().then((res) => {
        var arr = []
        var list = res.data
        for (var i = 0; i < list.length; i++) {
          if (list[i].name.indexOf(this.searchInput) >= 0) {
            arr.push(list[i])
          }
        }
        this.userList = arr
      })
    },
    // 获取用户列表
    async getUserList () {
      // // 如果是需授权API,需设置请求头使用authorization字段提供token令牌
      // const AUTH_TOKEN = localStorage.getItem('token')
      // this.$http.defaults.headers.common['{Authorization}'] = AUTH_TOKEN
      // 发送请求之前就会将请求头的认证token加入到请求中
      const res = await this.$http.get('user/')
      if (res.status === 200) {
        this.userList = res.data
        this.total = res.data.length
      } else {
        this.$message({
          message: 'fail',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style>
  .box-card {
    height: 100%;
  }

  .search-input {
    width: 18.75rem !important;
    margin-right: 0.3125rem;
  }

  .search-row {
    margin-top: 1.25rem;
  }
</style>
