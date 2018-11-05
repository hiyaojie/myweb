<template>
  <div class="showCustomer">
    <div class="listByname">
      <el-input v-model="inputName" placeholder="请输入姓名" class="input" clearable="true"></el-input>
      <el-button type="primary" @click="lookup" class="button">查询</el-button>
    </div>
    <el-table :data="tabledata" >
      <!--<el-table :data="tabledata.slice((currentPage-1)*pagesize,currentPage*pagesize)" align="left">-->
      <!--<el-table-column prop="id" label="序号" width="80" align="right"></el-table-column>-->
      <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="姓名">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="电话号码">
            <span>{{ props.row.phone }}</span>
          </el-form-item>
          <!--<el-form-item label="店铺 ID">-->
            <!--<span>{{ props.row.shopId }}</span>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="商品分类">-->
            <!--<span>{{ props.row.category }}</span>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="店铺地址">-->
            <!--<span>{{ props.row.address }}</span>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="商品描述">-->
            <!--<span>{{ props.row.desc }}</span>-->
          <!--</el-form-item>-->
        </el-form>
      </template>
      </el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="name" label="姓名" width="100"></el-table-column>
      <el-table-column prop="gender" label="性别" :formatter="formatRole" width="100"></el-table-column>
      <el-table-column prop="phone" label="电话号码"></el-table-column>
      <el-table-column prop="source" label="来源" :formatter="formatSource" width="100"></el-table-column>
      <el-table-column prop="province" label="省份" :formatter="formatProvince"></el-table-column>
      <el-table-column prop="city" label="城市" :formatter="formatCity"></el-table-column>
      <!--<el-table-column prop="address" label="地址"></el-table-column>-->
      <el-table-column prop="createdAt" label="创建时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link :to="{name:'修改客户信息',params:{id: scope.row.id}}"><el-button type="text" size="medium">修改</el-button></router-link>
          <el-button type="text" @click="open(scope.row)">删除</el-button>
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
  import { CodeToText } from 'element-china-area-data'
export default {
  name: 'showCustomers',
  data () {
    return {
      tabledata:null,
      total:null,
      currentPage:1,
      pagesize:10,
      inputName: '',
    }
  },
  mounted() {
    this.$http.get("http://localhost:9027/api/customer/listByName",{params: {page: 1,size: 10,name: this.inputName}})
            .then(response => {
              this.tabledata = response.data.data.data;
              // for (var i=0;i<this.tabledata.length;i++){
              //   if (this.tabledata[i].isStudied==null){
              //     this.tabledata[i].isStudied='暂未学习';
              //   }
              //   else {
              //     this.tabledata[i].isStudied='已学习';
              //   }
              // }
              this.total = response.data.data.count;
            })
  },
  methods: {
    handleSizeChange: function (size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      this.$http.get("http://localhost:9027/api/customer/listByName",{params: {page: currentPage,size: 10,name: this.inputName}}).
              then(res => {
                this.tabledata = res.data.data.data;
                this.total = res.data.data.count;
              //   for (var i=0;i<this.tabledata.length;i++){
              //   if (this.tabledata[i].isStudied==null){
              //     this.tabledata[i].isStudied='暂未学习';
              //   }
              //   else {
              //     this.tabledata[i].isStudied='已学习';
              //   }
              // }
      });
    },
    open: function (row) {
      this.$confirm('此操作将永久删除该客户记录?', '提示', {
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
      this.$http.get("http://localhost:9027/api/customer/delete",{params: {id: row.id}}).
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
    formatRole: function(row, column) {
                return row.gender == 'male' ? "男" : row.gender == 'female' ? "女" : "未知";
    },
    formatSource: function (row) {
      if (row.source=='tb'){
        return '淘宝';
      }
      else if (row.source=='gw'){
        return '官网';
      }
      else if (row.source=='wx'){
        return '微信';
      }
      else if (row.source=='qt'){
        return '其他';
      }
    },

    formatProvince: function (row) {
      return CodeToText[row.province];
    },

    formatCity: function (row) {
      return CodeToText[row.city];
    },

    lookup: function () {
      this.$http.get("http://localhost:9027/api/customer/listByName",{params: {name: this.inputName,size: 10, page: 1}})
              .then(response => {
                this.tabledata = response.data.data.data;
                // for (var i=0;i<this.tabledata.length;i++){
                //   if (this.tabledata[i].isStudied==null){
                //     this.tabledata[i].isStudied='暂未学习';
                //   }
                //   else {
                //     this.tabledata[i].isStudied='已学习';
                //   }
                // }
                this.total = response.data.data.count;
              })
    }

    // tableRowClassName: function(row) {
    //     if (row.row.isStudied == '暂未学习') {
    //       return 'warning-row';
    //     } else if (row.row.isStudied == '已学习') {
    //       return 'success-row';
    //     }
    //     return '';
    // },

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

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
  .listByname {
    float: left;
    width: 350px;
  }
  .input {
    float: left;
    width: 200px;
  }
  .button {
    margin-left: 10px;
    width: 90px;

  }

</style>
