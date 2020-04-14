<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <breadcrumb :breadlist="breadlist"></breadcrumb>
    <!-- 表格 -->
    <el-table :data="orderlist" style="width: 100%">
      <el-table-column type="index" label="#" width="50">
      </el-table-column>
      <el-table-column prop="order_num" label="订单编号" width="180" align="center">
      </el-table-column>
      <el-table-column prop="order_price" label="订单价格" width="100" align="center">
      </el-table-column>>
      <el-table-column label="是否付款" width="100">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.order_pay === '0'">未付款</el-tag>
          <el-tag v-if="scope.row.order_pay === '1'">已付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是否发货" width="80" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.order_shipment === '0'">否</span>
          <span v-if="scope.row.order_shipment === '1'">是</span>
        </template>
      </el-table-column>
      <el-table-column label="下单时间" width="130">
        <!-- 如果单元格内显示的不是字符串（文本），需要在内容外层包一个template -->
        <!-- template内部要用数据，需设置slot-scope属性-->
        <!-- 该属性的值是这里的createDate最外层的数据源userList(取名一般都为scope) -->
        <!-- userList.row就是数组中的每一个对象 -->
        <template slot-scope="scope">
          {{scope.row.order_time | fmtdate}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" :plain="true" type="primary"
           icon="el-icon-edit" circle @click="showEditOrder(scope.row)">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="省市区" label-width="120px">
          <el-cascader v-model="value" :options="options"
              :props="{ expandTrigger: 'hover' }" @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" label-width="120px">
          <el-input v-model="form.detailAddress" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
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
      breadlist: ['首页', '订单管理', '订单列表'],
      orderlist: [],
      dialogFormVisible: false,
      form: {
        detailAddress: ''
      },
      // 级联选择器
      value: [],
      options: [
        {
          value: 'BJ',
          label: '北京',
          children: [
            {
              value: 'YIHUAN',
              label: '一环'
            },
            {
              value: 'ERHUAN',
              label: '二环'
            },
            {
              value: 'CHAOYANG',
              label: '朝阳区'
            }
          ]
        },
        {
          value: 'GD',
          label: '广东省',
          children: [
            {
              value: 'GUANGZHOU',
              label: '广州市',
              children: [
                {
                  value: 'TIANHE',
                  label: '天河区'
                },
                {
                  value: 'BAIYUN',
                  label: '白云区'
                }
              ]
            },
            {
              value: 'SHENZHEN',
              label: '深圳市',
              children: [
                {
                  value: 'FUTIAN',
                  label: '福田区'
                },
                {
                  value: 'NANSHAN',
                  label: '南山区'
                },
                {
                  value: 'LONGHUA',
                  label: '龙华区'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    showEditOrder () {
      this.dialogFormVisible = true
    },
    // 获取订单列表
    async getOrderList () {
      const res = await this.$http.get('orderList/')
      console.log(res.data)
      this.orderlist = res.data
    }
  },
  mounted () {
    this.getOrderList()
  }
}
</script>

<style>
  .box-card {
    height: 100%;
  }
</style>
