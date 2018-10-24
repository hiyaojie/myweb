<template>
  <div id="newStudent">
    <el-form ref="form2" :model="form2" label-width="80px">
      <el-form-item label="姓名" prop="sname">
        <el-input v-model="form2.sname"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="ssex">
        <el-input v-model="form2.ssex"></el-input>
      </el-form-item>
      <el-form-item label="出生日期" prop="sage">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="出生日期" v-model="form2.sage" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="insertStudent">立即创建</el-button>
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
          sname:'',
          ssex:'',
          sage:''
        },
        code: '',

      }
    },
    methods: {//添加在data(){...},的后面
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      insertStudent() {
//      var formData2 = JSON.stringify(this.form2);
        this.$http.post("http://localhost:9027/api/user/insert",this.form2,{
          'headers':{
            'Content-Type': 'application/json; charset=utf-8'
          }
        })
                .then(function (response) {
                  console.log(response.data.code);
                    alert("数据添加成功");
//                    this.$refs['form2'].resetFields();
//                    this.resetForm("form2");
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
