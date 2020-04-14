<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <breadcrumb class="breadcrumb" :breadlist="breadlist"></breadcrumb>
    <el-button type="success" size="small" style="margin-bottom: 0.625rem;"
    @click="showaddNewCateDialog">添加分类
    </el-button>
    <!-- 表格 -->
    <el-table :data="categoryData" style="width: 100%"
     :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
     row-key="id">
      <el-table-column prop="label" label="分类名称" width="180">
      </el-table-column>
      <el-table-column prop="level" label="级别" width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="primary" size="small" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加分类对话框 -->
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="form.label" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类" label-width="120px">{{value}}
          <el-cascader v-model="value" :options="options"
              :props="{ expandTrigger: 'hover' }"></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewCate">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import breadcrumb from '../common/breadcrumb/breadcrumb.vue'
export default {
  data () {
    return {
      breadlist: ['首页', '商品管理', '商品分类'],
      // 表格数据
      categoryData: [],
      // 对话框
      dialogFormVisible: false,
      form: {
        id: -1,
        pid: 0,
        label: '',
        level: '',
        children: []
      },
      // 级联选择器
      value: [],
      options: [
        {
          value: 'remen',
          label: '热门推荐',
          children: [
            {
              value: 'shengdankuanghuan',
              label: '圣诞狂欢',
              children: [
                {
                  value: 'shengdanshu',
                  label: '圣诞树'
                }
              ]
            },
            {
              value: 'chaoliu',
              label: '潮流',
              children: [
                {
                  value: 'xinkuan',
                  label: '新款'
                }
              ]
            }
          ]
        },
        {
          value: 'dajiadian',
          label: '大家电',
          children: [
            {
              value: 'dianshi',
              label: '电视',
              children: [
                {
                  value: 'TCL',
                  label: '53CA'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    // 显示添加分类对话框
    showaddNewCateDialog () {
      this.dialogFormVisible = true
    },
    // 添加分类
    async addNewCate () {
      this.form.id = this.categoryData.length + 1
      this.form.level = 0
      const res = await this.$http.post('goodsCategories/?', this.form)
      console.log(res)
      // 更新视图
      this.getGoodsCategories()
      // 关闭对话框
      this.dialogFormVisible = false
      // 清空表单
      this.form.id = -1
      this.form.level = ''
    },
    // 获取分类
    async getGoodsCategories () {
      const res = await this.$http.get('/goodsCategories')
      res.data.forEach(item => {
        if (item.level === 0) {
          item.level = '一级'
        }
        if (item.children.length > 0) {
          item.children.forEach(item1 => {
            if (item1.level === 1) { item1.level = '二级' }
            if (item1.children.length > 0) {
              item1.children.forEach(item2 => {
                if (item2.level === 2) { item2.level = '三级' }
              })
            }
          })
        }
      })
      this.categoryData = res.data
    }
  },
  mounted () {
    this.getGoodsCategories()
  },
  components: {
    breadcrumb
  }
}
</script>

<style>
</style>
