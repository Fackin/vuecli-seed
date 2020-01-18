<template>
  <ex-view>
    <ex-breadcrumb>新增</ex-breadcrumb>
    <div class="content">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed label="日期" min-width="150" prop="date"></el-table-column>
        <el-table-column label="姓名" min-width="120" prop="name"></el-table-column>
        <el-table-column label="省份" min-width="120" prop="province"></el-table-column>
        <el-table-column label="市区" min-width="120" prop="city"></el-table-column>
        <el-table-column label="地址" min-width="300" prop="address"></el-table-column>
        <el-table-column label="邮编" min-width="120" prop="zip"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" size="small" type="text">查看</el-button>
            <el-button size="small" type="text">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </ex-view>
</template>
<script>
export default {
  methods: {
    handleClick(row) {
      // console.log(row);
    }
  },

  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }
      ]
    };
  },
  mounted() {
    // console.log(this.$route, 'example-list');
  }
};
</script>

<style lang="stylus" scoped>
.content
  padding 20px
</style>
