<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <breadcrumb :breadlist="breadlist"></breadcrumb>
    <!-- 搜索框 -->
    <el-row class="search-row">
      <el-col>
        <el-input placeholder="请输入内容" v-model="searchInput" class="search-input">
          <el-button @click="searchGoods()" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button @click="$router.push({name: 'addGoods'})" type="success" plain>添加商品</el-button>
      </el-col>
    </el-row>
    <!-- 商品列表 -->
    <el-table :data="goodslist" height="300px" style="width: 100%" border stripe>
      <el-table-column type="index" label="#" width="50">
      </el-table-column>
      <el-table-column prop="name" label="商品名称" width="280">
      </el-table-column>
      <el-table-column prop="price" label="食品价格" width="100">
      </el-table-column>
      <el-table-column prop="weight" label="食品重量" width="100">
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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" :plain="true" type="primary"
           icon="el-icon-edit" circle @click="showEditUser(scope.row)">
          </el-button>
          <el-button size="small" :plain="true" type="danger"
           icon="el-icon-delete" circle @click="showDeleteUser(scope.row.id)">
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
  mounted () {
    this.getGoodsList()
  },
  data () {
    return {
      searchInput: '',
      breadlist: ['首页', '商品管理', '商品列表'],
      // 商品列表
      goodslist: [],
      total: 1,
      pagenum: 1,
      pagesize: 2
    }
  },
  methods: {
    // 搜索用户
    searchGoods () {
      this.$http.get('/goods').then((res) => {
        var arr = []
        var list = res.data
        list.forEach(item => {
          if (item.name.indexOf(this.searchInput) >= 0) {
            arr.push(item)
          }
        })
        // for (var i = 0; i < list.length; i++) {
        //   if (list[i].name.indexOf(this.searchInput) >= 0) {
        //     arr.push(list[i])
        //   }
        // }
        this.goodslist = arr
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.pagenum = 1
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
    },
    // 获取商品信息
    async getGoodsList () {
      // // 如果是需授权API,需设置请求头使用authorization字段提供token令牌
      // const AUTH_TOKEN = localStorage.getItem('token')
      // this.$http.defaults.headers.common['{Authorization}'] = AUTH_TOKEN
      // 发送请求之前就会将请求头的认证token加入到请求中
      const res = await this.$http.get('/goods')
      if (res.status === 200) {
        this.goodslist = res.data
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
    margin-bottom: 0.625rem;
  }
</style>
