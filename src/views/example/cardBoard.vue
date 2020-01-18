<template>
  <div :style="{'height':`${clientHeight}px`}" class="card-board">
    <el-header style="background: green;"></el-header>
    <el-container :style="{'height':`${clientHeight-60}px`}">
      <!-- 左侧控制区 -->
      <el-aside style="background: blue;overflow-y:auto" width="200px">
        <div
          :key="index"
          @click="handleSelect(item)"
          style="background: #fff;margin:20px;height:160px;"
          v-for="(item,index) in modules"
        >{{item.name}}</div>
      </el-aside>
      <!--中间显示区 -->
      <el-main>
        <el-row :gutter="30">
          <el-col :key="index" :span="6" v-for="(view,index) in viewMods">
            <div class="top-modules">{{view.name}}</div>
          </el-col>
        </el-row>
      </el-main>
      <!-- 右侧控制区 -->
      <el-aside style="background: blue;"></el-aside>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      clientHeight: '750px',
      modules: [
        {
          name: '模块1'
        },
        {
          name: '模块2'
        },
        {
          name: '模块3'
        },
        {
          name: '模块4'
        },
        {
          name: '模块5'
        },
        {
          name: '模块6'
        },
        {
          name: '模块7'
        },
        {
          name: '模块8'
        }
      ],
      viewMods: [],
      viewSpan: 24,
      gutter: 20
    };
  },
  mounted() {
    // 适应浏览器窗口高度
    console.log(document.body.clientHeight);
    console.log(document.body.offsetHeight);
    console.log(document.body.scrollHeight);
    console.log(document.documentElement.clientHeight);
    console.log(window.screen.height);
    console.log(window.screen.availHeight);
    console.log(window);
    // this.clientHeight = `${document.body.clientHeight}px`;
    this.clientHeight = `${document.documentElement.clientHeight}`;
    const that = this;
    window.onresize = () => {
      // that.clientHeight = `${document.body.clientHeight}px`;
      that.clientHeight = `${document.documentElement.clientHeight}`;
    };
  },
  methods: {
    handleSelect: function(item) {
      if (this.viewMods.length < 4) {
        this.viewMods.push(item);
        // this.viewSpan = 24 / this.viewMods.length;
        // this.gutter = 22;
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.card-board
  margin -20px
  height 100%
  overflow hidden
  .el-main
    background red
.top-modules
  border-radius 4px
  background #fff
  height 100px
</style>