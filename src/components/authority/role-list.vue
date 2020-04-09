<template>
  <el-card>
    <!-- 面包屑 -->
    <breadcrumb class="breadcrumb" :breadlist="breadlist"></breadcrumb>
    <el-button size="small" plain>添加角色</el-button>
    <!-- 表格 -->
    <el-table :data="rolelist" style="width: 100%">
      <el-table-column type="expand" width="30">
        <template slot-scope="scope">
          <el-row v-for="(item1,index) in scope.row.children.filter(item => item.level ===0)"
           :key="index">
            <!-- 一级权限 -->
            <el-col :span="4">
              <!-- 给delAuth（）传角色id 和权限id -->
              <el-tag @close="delAuth(scope.row,item1)" closable v-if="item1.pid === 0">{{item1.name}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(item2,index) in scope.row.children.filter(item => item.level ===1 && item.pid === item1.id)" :key="index">
                <!-- 二级权限 -->
                <el-col :span="5">
                  <el-tag @close="delAuth(scope.row,item2)" closable type="success">{{item2.name}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="19">
                  <el-tag @close="delAuth(scope.row,item3)" v-for="(item3,index) in scope.row.children.filter(item => item.level ===2 && item.pid ===item2.id)"
                   :key="index" type="warning" closable>{{item3.name}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <!-- 无分配权限显示 -->
          <span v-if="scope.row.children.length === 0">未分配权限</span>
        </template>
      </el-table-column>
      <el-table-column type="index" label="#" width="130">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180">
      </el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="180">
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
           icon="el-icon-s-custom" circle @click="showChangeAuth(scope.row)">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改权限对话框 -->
    <el-dialog
      title="修改权限"
      :visible.sync="dialogchangeauth"
      width="50%">
      <!-- 树形结构 -->
      <!-- default-expand-all :默认展开所有节点 -->
      <!-- 默认展开的节点数组:default-expanded-keys="[]" -->
      <!-- 选中的节点:default-checked-keys="[]" -->
      <el-tree ref="tree" :data="authtree" show-checkbox node-key="id"
       default-expand-all :default-checked-keys="checkarr" :props="defaultProps">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogchangeauth = false">取 消</el-button>
        <el-button type="primary" @click="changeRoleAuth()">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
 </template>
<script>
import breadcrumb from '../common/breadcrumb/breadcrumb.vue'
export default {
  components: {
    breadcrumb
  },
  created () {
    this.getRolelist()
    this.getAuthlist()
  },
  data () {
    return {
      breadlist: ['首页', '权限管理', '角色列表'],
      rolelist: [],
      authtree: [],
      // 默认选中的数组
      checkarr: [],
      dialogchangeauth: false,
      // 当前权限对象
      defaultProps: {
        // 权限对象名
        label: 'name',
        // 子权限对象
        children: 'children'
      },
      currentRoleId: 0
    }
  },
  methods: {
    // 发送修改权限请求
    changeRoleAuth () {
      // 取出当前角色id
      console.log(this.currentRoleId)
      // 获取当前选中权限，需要先为多选框绑定ref属性,通过ref属性调用多选框的方法getCheckedKeys()
      // 获取全选的id的数组arr1 （el官方提供）方法：getCheckedKeys()
      const arr1 = this.$refs.tree.getCheckedKeys()
      console.log(arr1)
      // 获取半选的id的数组arr2 （el官方提供）方法：getHalfCheckedKeys()
      const arr2 = this.$refs.tree.getHalfCheckedKeys()
      console.log(arr2)
      // 合并数组
      // 第一种方法： arr1.concat(arr2)
      // 第二种方法: ES6的...展开符
      const arr = [...arr1, ...arr2]
      console.log(arr)
      // 发送请求，由于没有合适的接口，此功能暂未实现o(╥﹏╥)o
      // 关闭对话框
      this.dialogchangeauth = false
      // 更新视图
      // this.getRolelist()
    },
    // 显示修改权限对话框
    showChangeAuth (role) {
      this.dialogchangeauth = true
      // 将当前角色id传给changeRoleAuth方法
      this.currentRoleId = role.id
      // 遍历角色的权限,将权限id取出来
      const arr = []
      role.children.forEach(item1 => {
        arr.push(item1.id)
        role.children.forEach(item2 => {
          arr.push(item2.id)
          role.children.forEach(item3 => {
            arr.push(item3.id)
          })
        })
      })
      // console.log(arr)
      this.checkarr = arr
    },
    // 删除角色权限
    async delAuth (role, auth) {
      console.log('删除' + role.rolename + '的' + auth.name + '权限')
      this.$message.success('删除' + role.rolename + '的' + auth.name + '权限')
      // 优化建议：如果删除成功了可以将返回的该角色的权限赋值给该角色的children数组
      // 这样就可以不用每次删除都更新整个页面
    },
    // 获取角色列表
    async getRolelist () {
      const res = await this.$http.get('/role')
      // console.log(res.data)
      this.rolelist = res.data
    },
    // 获取权限列表
    async getAuthlist () {
      const res = await this.$http.get('/authtree')
      // console.log(res.data)
      this.authtree = res.data
    }
  }
}
</script>

<style scoped>
  .breadcrumb{
    margin-bottom: 0.625rem;
  }
</style>
