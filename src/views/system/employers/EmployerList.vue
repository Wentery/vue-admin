<template>
  <div class="employer-list">
    <el-table :data="tableData">
      <el-table-column label='id' prop='id'></el-table-column>
      <el-table-column label='姓名' prop='name'></el-table-column>
      <el-table-column label='职业' prop='job'></el-table-column>
    </el-table>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss">
  @import './index.scss';
</style>
