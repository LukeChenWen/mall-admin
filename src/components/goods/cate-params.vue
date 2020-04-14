<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <breadcrumb class="breadcrumb" :breadlist="breadlist"></breadcrumb>
    <el-alert title="只允许第三级分类设置参数" type="warning" center show-icon style="margin-bottom: 0.625rem;"></el-alert>
    <!-- 级联选择器 -->
    <span>商品分类 </span>
    <el-cascader ref="cascader" v-model="selectOptions" :options="options"
       :props="props" @change="handleChange()" clearable></el-cascader>
       <!-- 选项卡 -->
       <el-tabs v-model="tabActive" type="card" style="margin-top: 0.625rem;">
          <el-tab-pane label="动态参数" name="1">
            <el-button type="danger">设置动态参数</el-button>
            <!-- 表格 -->
            <el-table :data="dynamicData" style="width: 100%" :row-key="getRowKeys" :expand-row-keys="expands" @expand-change="expandSelect">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-tag :key="tag" v-for="tag in props.row.colVal"
                    closable :disable-transitions="false" @close="handleClose(props.row, tag)">
                    {{tag}}
                  </el-tag>
                  <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue"
                    ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(props.row)"
                    @blur="handleInputConfirm(props.row)">
                  </el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                </template>
              </el-table-column>
              <el-table-column label="商品名称" prop="name">
              </el-table-column>
              <el-table-column label="操作">
                <template>
                  <el-button type="primary" size="small" icon="el-icon-edit" circle></el-button>
                  <el-button type="danger" size="small" icon="el-icon-delete" circle></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="静态参数" name="2">
            <el-button type="danger">设置静态参数</el-button>
            <!-- 表格 -->
            <el-table :data="staticData" style="width: 100%">
              <el-table-column prop="id" label="#" width="100">
              </el-table-column>
              <el-table-column prop="name" label="属性名称" width="180">
              </el-table-column>
              <el-table-column prop="attr_val" label="属性值" width="180">
              </el-table-column>
              <el-table-column label="操作">
                <template>
                  <el-button type="primary" size="small" icon="el-icon-edit" circle></el-button>
                  <el-button type="danger" size="small" icon="el-icon-delete" circle></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
         </el-tabs>
  </el-card>
</template>

<script>
import breadcrumb from '../common/breadcrumb/breadcrumb.vue'
export default {
  data () {
    return {
      breadlist: ['首页', '商品管理', '分类参数'],
      // 级联选择器数据
      options: [],
      selectOptions: [],
      props: {
        expandTrigger: 'hover',
        value: 'id',
        label: 'label',
        children: 'children'
      },
      // 选项卡
      tabActive: '1',
      // 表格
      expands: [],
      // 动态参数
      dynamicData: [{
        id: '12987122',
        name: '颜色',
        colVal: ['aaa', 'sdf', 'www', '12cvds3']
      }, {
        id: '12987123',
        name: '性能',
        colVal: ['sdf', '12sdfsd3', 'sdf123', 'fff']
      }, {
        id: '12987125',
        name: 'CPU',
        colVal: ['bbb', '1sdf23', '123sd', '12cv3']
      }, {
        id: '12987126',
        name: '内存',
        colVal: ['1asf23', '12sdf3', '12sd3', '12sf3']
      }],
      // 标签卡
      inputVisible: false,
      inputValue: '',
      // 动态参数表格
      staticData: [
        {
          id: '1',
          name: '主体商品名称',
          attr_val: 'TCL电视 53C94A'
        },
        {
          id: '2',
          name: '显示-曲面',
          attr_val: '是'
        },
        {
          id: '3',
          name: '系统-智能电视',
          attr_val: '智能电视'
        }
      ]
    }
  },
  mounted () {
    this.getGoodsCategories()
    console.log(this.options)
  },
  methods: {
    handleClose (row, tag) {
      row.colVal.splice(row.colVal.indexOf(tag), 1)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm (row) {
      const inputValue = this.inputValue
      if (inputValue) {
        row.colVal.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    getRowKeys (row) {
      return row.id
    },
    expandSelect (row, expandedRows) {
      console.log(this)
      var that = this
      if (expandedRows.length) {
        that.expands = []
        if (row) {
          that.expands.push(row.id)
        }
      } else {
        that.expands = []
      }
    },
    // 切换选项事件
    handleClick (tab, event) {
      console.log('切换')
      // console.log(tab, event)
    },
    // 获取分类参数
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
  },
  components: {
    breadcrumb
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
  /* 标签卡 */
   .el-tag + .el-tag {
      margin-left: 10px;
    }
    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }
</style>
