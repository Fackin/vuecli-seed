<template>
  <ex-view>
    <ex-breadcrumb></ex-breadcrumb>
    <div class="content">
      <div class="search-box">
        <router-link to="/example/add">
          <el-button type="primary">新增</el-button>
        </router-link>
        <el-button @click="openDialog" type="primary">
          <i class="el-icon-plus"></i>配置
        </el-button>
      </div>
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
    <el-dialog
      :before-close="handleClose"
      :visible.sync="isDialog"
      class="dialog-common"
      title="提示"
      width="30%"
    >
      <span>这是一段信息</span>
      <span class="dialog-footer" slot="footer">
        <el-button @click="isDialog = false">取 消</el-button>
        <el-button @click="isDialog = false" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </ex-view>
</template>
<script>
export default {
  methods: {
    handleClick(row) {
      // console.log(row);
    },
    openDialog: function() {
      this.isDialog = true;
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
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
      ],
      isDialog: false
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
  text-align left
  .search-box
    padding-bottom 10px
</style>
