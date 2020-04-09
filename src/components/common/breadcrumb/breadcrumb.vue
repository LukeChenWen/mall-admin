<template>
  <!-- 面包屑组件 -->
  <el-breadcrumb>
    <el-breadcrumb-item v-for="(item,index) in breadlist" :key="index">{{item}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  props: {
    breadlist: Array
  }
}
</script>

<style>
</style>
