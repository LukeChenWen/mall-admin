<template>
  <el-card>
    <!-- 面包屑 -->
    <breadcrumb class="breadcrumb" :breadlist="breadlist"></breadcrumb>
    <!-- 表格 -->
     <el-table class="authlist" height="300px" :data="authlist" border style="width: 100%">
       <el-table-column align="center" type="index" width="60">
       </el-table-column>
        <el-table-column align="center" prop="name" label="权限名称" width="220">
        </el-table-column>
        <el-table-column align="center" prop="path" label="路径" width="220">
        </el-table-column>
        <el-table-column label="层级" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.level === 0">一级</span>
            <span v-if="scope.row.level === 1">二级</span>
            <span v-if="scope.row.level === 2">三级</span>
          </template>
        </el-table-column>
      </el-table>
  </el-card>
</template>

<script>
import breadcrumb from '../common/breadcrumb/breadcrumb.vue'
export default {
  components: {
    breadcrumb
  },
  created () {
    this.getAuthlist()
  },
  data () {
    return {
      breadlist: ['首页', '权限管理', '权限列表'],
      authlist: []
    }
  },
  methods: {
    async getAuthlist () {
      const res = await this.$http.get('/auth')
      // console.log(res.data)
      this.authlist = res.data
    }
  }
}
</script>

<style scoped>
  .breadcrumb{
    margin-bottom: 1.25rem;
  }
</style>
