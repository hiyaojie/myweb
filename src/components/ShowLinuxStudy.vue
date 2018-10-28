<template>
  <div class="showLinuxStudy">
    <el-table :data="tabledata" :row-class-name="tableRowClassName">
      <!--<el-table :data="tabledata.slice((currentPage-1)*pagesize,currentPage*pagesize)" align="left">-->
      <el-table-column prop="id" label="序号" width="80" align="right"></el-table-column>
      <el-table-column prop="command" label="指令" width="100"></el-table-column>
      <el-table-column prop="link" label="链接" width="400">
        <template slot-scope="scope">
          <a v-bind:href="scope.row.link">{{scope.row.link}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="cate" label="类别"></el-table-column>
      <el-table-column prop="isStudied" label="是否学习"></el-table-column>
      <el-table-column prop="studiedAt" label="学习时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!--<router-link :to="{name:'editStudent',params:{id: scope.row.id}}"><el-button type="text" size="medium">重新学习</el-button></router-link>-->
          <el-button type="text" size="small" @click="open(scope.row)">重新学习</el-button>
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
    this.$http.get("http://localhost:9027/api/linux/list?page=1&size=10")
            .then(response => {
              this.tabledata = response.data.data.data;
              for (var i=0;i<this.tabledata.length;i++){
                if (this.tabledata[i].isStudied==null){
                  this.tabledata[i].isStudied='暂未学习';
                }
                else {
                  this.tabledata[i].isStudied='已学习';
                }
              }
              this.total = response.data.data.count;
            })
  },
  methods: {
    handleSizeChange: function (size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      this.$http.get("http://localhost:9027/api/linux/list",{params: {page: currentPage,size: 10}}).
              then(res => {
                this.tabledata = res.data.data.data;
                this.total = res.data.data.count;
                for (var i=0;i<this.tabledata.length;i++){
                if (this.tabledata[i].isStudied==null){
                  this.tabledata[i].isStudied='暂未学习';
                }
                else {
                  this.tabledata[i].isStudied='已学习';
                }
              }
      });
    },
    open: function (row) {
      this.$confirm('此操作将更改此条指令的状态为未学习?', '提示', {
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
      this.$http.get("http://localhost:9027/api/linux/update",{params: {id: row.id,type: "unstudied"}}).
      then(res => {
        if (res.data.code==0){
          this.$message({
            type: "success",
            message: "更新成功！"
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

    tableRowClassName: function(row) {
        if (row.row.isStudied == '暂未学习') {
          return 'warning-row';
        } else if (row.row.isStudied == '已学习') {
          return 'success-row';
        }
        return '';
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .el-table .warning-row {
    background: oldlace;
}

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

</style>
