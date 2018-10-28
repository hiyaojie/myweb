<template>
  <!--<div>{{tabledata}}</div>-->
  <div class="showstudents">
    <el-table :data="tabledata" align="left">
      <!--<el-table :data="tabledata.slice((currentPage-1)*pagesize,currentPage*pagesize)" align="left">-->
      <el-table-column prop="sname" label="姓名"></el-table-column>
      <el-table-column prop="sage" label="年龄"></el-table-column>
      <el-table-column prop="ssex" label="性别"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="open(scope.row)" type="text" size="medium">删除</el-button>
          <router-link :to="{name:'editStudent',params:{id: scope.row.id}}"><el-button type="text" size="small">编辑</el-button></router-link>
          <!--<el-button type="text" size="small">编辑</el-button>-->
        </template>
      </el-table-column>

    </el-table>
    <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pagesize"
            layout="total, prev, pager, next, jumper"
            :total="total">
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
      total:null,
      currentPage:1,
      pagesize:10,
    }
  },
  mounted() {
    this.$http.get("http://localhost:9027/api/user/listStudents?page=1&size=10")
            .then(response => {
              this.tabledata = response.data.data.data;
              this.total = response.data.data.count;
            })
  },
  methods: {
    handleSizeChange: function (size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      this.$http.get("http://localhost:9027/api/user/listStudents",{params: {page: currentPage,size: 10}}).
              then(res => {
                this.tabledata = res.data.data.data;
                this.total = res.data.data.count;
      });
    },
    open: function (row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleClick(row);
      }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });}
        )},
    handleClick: function(row) {
      console.log(row.id);
      this.$http.get("http://localhost:9027/api/user/delete",{params: {id: row.id}}).
      then(res => {
        if (res.data.code==0){
          this.$message({
            type: "success",
            message: "删除成功！"
          });
          this.handleCurrentChange(this.currentPage);
        }else {
          this.$message({
            type: "error",
            message: res.data.msg
          });
        }
      });

    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
