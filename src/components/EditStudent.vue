<template>
  <div id="editStudent">
    <el-form ref="form2" :model="form2" label-width="80px">
      <el-form-item label="姓名" prop="sname">
        <el-input v-model="form2.sname"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="ssex">
        <el-radio-group v-model="form2.ssex">
          <el-radio label="male">男</el-radio>
          <el-radio label="female">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期" prop="sage">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="出生日期" v-model="form2.sage" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="insertStudent">确认更新</el-button>
        <el-button @click="resetForm('form2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
  export default {
    name: "newStudent",
    data(){
      return {
        form2: {
          id: this.$route.params.id,
          sname:'',
          ssex:'',
          sage:''
        },
        code: '',

      }
    },
    mounted() {
      this.$http.get("http://localhost:9027/api/user/selectStudentById",{params:{id: this.$route.params.id}})
              .then(response => {
                this.form2 = response.data.data;
                console.log(this.form2)
              })
    },
    methods: {//添加在data(){...},的后面
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      insertStudent() {
//      var formData2 = JSON.stringify(this.form2);
        this.$http.post("http://localhost:9027/api/user/update",this.form2,{
          'headers':{
            'Content-Type': 'application/json; charset=utf-8'
          }
        })
                .then(res => {
                  if (res.data.code==0){
                    this.$message({
                      type: "success",
                      message: "修改成功！"
                    });
//                    this.resetForm('form2');
                  }else {
                    this.$message({
                      type: "error",
                      message: res.data.msg
                    });
                  }
                })
                .catch(function (error) {
                  console.log(error);
                  alert("数据为空!");
                });
      },

    }
  }
</script>
<style>

</style>
