<template>
  <!--<div>{{tabledata}}</div>-->
  <div class="showstudents">
    <el-table :data="tabledata.slice((currentPage-1)*pagesize,currentPage*pagesize)" align="left">
      <el-table-column prop="sname" label="姓名"></el-table-column>
      <el-table-column prop="sage" label="年龄"></el-table-column>
      <el-table-column prop="ssex" label="性别"></el-table-column>
    </el-table>
    <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pagesize"
            layout="total, prev, pager, next, jumper"
            :total="tabledata.length">
    </el-pagination>
    <!--layout="total, sizes, prev, pager, next, jumper"-->
  </div>
</template>

<script>
export default {
  name: 'showStudents',
  data () {
    return {
      tabledata:null,
      currentPage:1,
      pagesize:10,
    }
  },
  mounted() {
    this.$http.get("http://localhost:9027/api/user/selectAll")
            .then(response => (this.tabledata = response.data.data))
  },
  methods: {
    handleSizeChange: function (size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*h1, h2 {*/
  /*font-weight: normal;*/
/*}*/
/*ul {*/
  /*list-style-type: none;*/
  /*padding: 0;*/
/*}*/
/*li {*/
  /*display: inline-block;*/
  /*margin: 0 10px;*/
/*}*/
/*a {*/
  /*color: #42b983;*/
/*}*/
</style>
