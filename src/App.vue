<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <el-container style="height: 800px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">

        <el-menu :default-openeds="['1','2', '3','4']" @select="handleSelect">
          <h1>Element UI</h1>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>导航一</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">首页</el-menu-item>
              <el-menu-item index="1-2">每日学习</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-4">录入学生信息</el-menu-item>
              <el-menu-item index="1-3">查看学生信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>数据报表</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">报表1</el-menu-item>
              <el-menu-item index="2-2">报表2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>导航三</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <!--TodoList:实现动态路由-->
        <el-header style="text-align: right; font-size: 12px">
          <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 20px">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
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
          <!--<el-table :data="tableData">-->
            <!--<el-table-column prop="date" label="日期" width="140">-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="name" label="姓名" width="120">-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="address" label="地址">-->
            <!--</el-table-column>-->
          <!--</el-table>-->
        </el-main>
      </el-container>
    </el-container>


  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    handleIconClick(ev) {
      console.log(ev);
    },
    handleSelect(key, keyPath){
      switch(key){
        case '1-1':
          this.$router.push('/');
          break;
        case '1-2':
          this.$router.push('/learning');
          break;
        case '1-3':
          this.$router.push('/showStudents');
          break;
        case '1-4':
          this.$router.push('/newstudent');
          break;
        case '2-1':
          this.$router.push('/char');
          break;
        case '2-2':
          this.$router.push('/');
          break;
      }
    },
  }
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
