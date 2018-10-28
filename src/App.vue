<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <el-container style="height: 800px; border: 1px solid #eee">
      <sidebar></sidebar>
      <el-container>
        <!--TodoList:实现动态路由-->
        <el-header style="text-align: right; font-size: 12px">
          <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 20px">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <!--<el-breadcrumb-item>活动管理</el-breadcrumb-item>-->
            <!--<el-breadcrumb-item>活动列表</el-breadcrumb-item>-->
            <!--<el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
            <el-breadcrumb-item :to="{ path: this.$route.path}">{{this.$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <!--<el-dropdown>-->
            <!--<i class="el-icon-setting" style="margin-right: 15px"></i>-->
            <!--<el-dropdown-menu slot="dropdown">-->
              <!--<el-dropdown-item>查看</el-dropdown-item>-->
              <!--<el-dropdown-item>新增</el-dropdown-item>-->
              <!--<el-dropdown-item>删除</el-dropdown-item>-->
            <!--</el-dropdown-menu>-->
          <!--</el-dropdown>-->
          <!--<span>王小虎</span>-->
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>


  </div>
</template>

<script>
  import sidebar from './components/SideBar'
export default {
  name: 'App',
  methods: {
  },
  components: {sidebar},
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 20px;*/
}


</style>
