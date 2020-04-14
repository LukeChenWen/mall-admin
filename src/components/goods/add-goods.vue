<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <breadcrumb class="breadcrumb" :breadlist="breadlist"></breadcrumb>
    <el-alert
      title="添加商品信息"
      type="success"
      center
      show-icon>
    </el-alert>
    <!-- 进度条 -->
    <el-steps class="steps" :active="1*active" finish-status="success" align-center>
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <el-form label-position="top" label-width="80px" :model="form"
    style="height: 300px;overflow: auto;">
      <el-tabs v-model="active" tab-position="left" @tab-click="tabclick()">
        <el-tab-pane name="0" label="基本信息">
          <el-form-item label="商品名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="form.number"></el-input>
          </el-form-item>
          <el-form-item label="商品类别">
            <!-- 级联选择器 -->
            <el-cascader ref="cascader" v-model="selectOptions" :options="options"
               :props="props" @change="handleChange()" clearable></el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="1" label="商品参数">
          <!-- 多选框组 -->
          <el-form-item :label="item.attrname" v-for="(item,index) in goodsAttributes" :key="index">
           <el-checkbox-group v-model="checklist">
               <el-checkbox :label="val" v-for="(val,index) in item.attrval"
                :key="index" border>
                </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="2" label="商品属性">
          <el-form-item :label="item.proname" v-for="(item,index) in goodsProperties" :key="index">
            <el-input v-model="item.proval"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="3" label="商品图片">
          <el-form-item>
            <!-- action需要填写全路径请求地址，因为action用的不是axios，所以不能使用baseURL -->
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
             :on-remove="handleRemove" :on-success="handleSuccess" list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="4" label="商品内容">
          <el-form-item>
            <el-button type="primary" size="small" style="margin-bottom: 0.625rem;"
            @click="addNewGoods">添加商品
            </el-button>
            <quill-editor></quill-editor>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
import breadcrumb from '../common/breadcrumb/breadcrumb.vue'
// 富文本编辑器样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 富文本编辑器
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    breadcrumb,
    quillEditor
  },
  data () {
    return {
      breadlist: ['首页', '商品管理', '商品列表', '添加商品'],
      // 活跃的标签
      active: 0,
      form: {
        id: 0,
        name: '',
        categoryName: '',
        price: '',
        weight: '',
        number: ''
      },
      // 级联选择器数据
      options: [],
      selectOptions: [],
      props: {
        expandTrigger: 'hover',
        value: 'id',
        label: 'label',
        children: 'children'
      },
      // 商品参数
      goodsAttributes: [],
      // 选中的参数值
      checklist: [],
      // 商品属性
      goodsProperties: []
    }
  },
  mounted () {
    this.getGoodsCategories()
  },
  methods: {
    // 添加商品
    addNewGoods () {
      console.log('添加商品')
    },
    // 上传图片成功
    handleSuccess (file) {
      console.log('成功')
      console.log(file)
    },
    // 移除图片
    handleRemove (file) {
      console.log('移除')
      console.log(file)
    },
    // 预览图片
    handlePreview (file) {
      console.log('预览')
      console.log(file)
    },
    // 点击触发
    async tabclick () {
      // 判断点击第二个的操作
      if (this.active !== '0') {
        if (this.selectOptions.length !== 3) {
          this.$message.warning('请先选择商品的三级分类')
        }
        const res = await this.$http.get('/goodsAttribute')
        // console.log(res.data)
        this.goodsAttributes = res.data
        // 给每个参数的参数值字符串转成数组
        this.goodsAttributes.forEach(item => {
          // 如果为空,就将空数组赋值过去,因为v-for遍历空数组不会报错
          item.attrval = item.attrval.length === 0 ? [] : item.attrval.trim().split(',')
        })
        // console.log(this.goodsAttributes)
      }
      if (this.active === '2') {
        const res1 = await this.$http.get('/goodsProperties')
        this.goodsProperties = res1.data
        // console.log(this.goodsProperties)
      }
    },
    // 级联选择器触发方法
    handleChange () {
      console.log(this.selectOptions)
    },
    // 获取商品分类列表
    async getGoodsCategories () {
      const res = await this.$http.get('/goodsCategories')
      const arr = []
      res.data.forEach(item => {
        arr.push(item)
        item.children.forEach(item1 => {
          arr.push(item1)
          item1.children.forEach(item2 => {
            arr.push(item2)
          })
        })
      })
      this.options = arr
      // console.log(arr)
    }
  }
}
</script>

<style>
  .box-card {
    height: 100%;
  }
  .breadcrumb{
    margin-bottom: 0.625rem;
  }
  .steps{
    margin-top: 0.625rem;
    margin-bottom: 0.625rem;
  }
  /* 富文本 */
  .ql-editor{
    min-height: 12.5rem;
  }
</style>
