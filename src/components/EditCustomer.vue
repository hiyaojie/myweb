<template>
  <div id="editCustomer">
    <el-form ref="form2" :model="form2" label-width="80px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form2.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="form2.gender">
          <el-radio label="male">男</el-radio>
          <el-radio label="female">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="电话号码" prop="phone">
        <el-input v-model="form2.phone"></el-input>
      </el-form-item>
      <el-form-item label="客户来源" prop="source">
        <template>
          <el-select v-model="form2.source" placeholder="请选择">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
        <!--<el-input v-model="form2.sname"></el-input>-->
      </el-form-item>
      <el-form-item label="省份/城市" prop="province" v-if="title">
        <el-cascader size="large" :options="options"
                     v-model="selectedOptions"  change-on-select>
        </el-cascader>
      </el-form-item>

      <!--<el-form-item label="省份" prop="province">-->
        <!--<el-input v-model="form2.province"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="城市" prop="city">-->
        <!--<el-input v-model="form2.city"></el-input>-->
      <!--</el-form-item>-->
      <el-form-item label="详细地址" prop="address">
        <el-input v-model="form2.address"></el-input>
      </el-form-item>
      <!--<el-form-item label="出生日期" prop="sage">-->
        <!--<el-col :span="11">-->
          <!--<el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="出生日期" v-model="form2.sage" style="width: 100%;"></el-date-picker>-->
        <!--</el-col>-->
      <!--</el-form-item>-->
      <el-form-item>
        <el-button type="primary" v-bind:disabled="bt" @click="insertCustomer">立即更新</el-button>
        <el-button @click="resetForm('form2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
  import { provinceAndCityData } from 'element-china-area-data'
  export default {
    name: "editCustomer",
    data(){
      return {

        form2: {
          id: this.$route.params.id,
          name:'',
          gender:'',
          phone:'',
          source:'',
          province:'',
          city:'',
          address:'',
        },
        bt: false,
        options1: [{
          value: 'tb',
          label: '淘宝'
        }, {
          value: 'gw',
          label: '官网'
        }, {
          value: 'wx',
          label: '微信'
        }, {
          value: 'qt',
          label: '其他'
        }],
        options: provinceAndCityData,
        selectedOptions: [],
        title: false
      }
    },
    created() {
      this.$http.get("http://localhost:9027/api/customer/selectById",{params:{id: this.$route.params.id}})
              .then(response => {
                this.form2 = response.data.data;
                this.selectedOptions[0] = this.form2.province;
                this.selectedOptions[1] = this.form2.city;
                this.title = true;
              })
    },
    methods: {//添加在data(){...},的后面
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.selectedOptions = [];
      },
      insertCustomer() {
//      var formData2 = JSON.stringify(this.form2);
//         console.log(this.form2);
        this.disabled = true;
        this.form2.province = this.selectedOptions[0];
        this.form2.city = this.selectedOptions[1];
        this.$http.post("http://localhost:9027/api/customer/update",this.form2,{
          'headers':{
            'Content-Type': 'application/json; charset=utf-8'
          }
        })
                .then(res => {
                  if (res.data.code==0){
                    this.$message({
                      type: "success",
                      message: "更新成功！"
                    });
                    this.resetForm('form2');
                    this.selectedOptions = [];
                    this.$router.push('/customer/list');
                  }else {
                    this.$message({
                      type: "error",
                      message: res.data.msg
                    });
                  }
                  this.disabled = false;
                })
                .catch(function (error) {
                  console.log(error);
                  alert("数据为空!");
                });
      },
    },
  }
</script>
<style>

</style>
