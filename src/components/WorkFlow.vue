<template>
  <div id="workflow">
    <div>
      <el-steps :active="active" align-center>
        <el-step title="步骤1" description="这是一段很长很长很长的描述性文字"></el-step>
        <el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
        <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
        <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
      </el-steps>
      <el-button style="margin-top: 12px;" @click="pre">上一步</el-button>
      <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
    </div>
    <div v-if="active===1">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <!--<el-button type="primary" @click="onSubmit">立即创建</el-button>-->
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-else-if="active===2">
      <el-table :data="tabledata" align="left">
        <el-table-column prop="sname" label="姓名"></el-table-column>
        <el-table-column prop="sage" label="年龄"></el-table-column>
        <el-table-column prop="ssex" label="性别"></el-table-column>
      </el-table>
    </div>
    <div v-else-if="active===3">
      <el-form ref="form2" :model="form2" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form2.sname"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="form2.ssex"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="insertStudent">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-else="active===4">
      <el-row>
        <el-col :span="5" v-for="(o, index) in words" :key="o" :offset="index > 0 ? 3 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <!--<img src="~examples/assets/images/hamburger.png" class="image">-->
            <div style="padding: 14px;">
              <b>{{ o.word }}</b>
              <p>{{ o.definition}}</p>
              <p>{{ o.translation }}</p>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
  export default {
  name: 'workflow',
  data() {
    return {
      active: 1,
      currentDate: new Date(),
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      form2: {
        sname:'',
        ssex:''
      },
      tabledata: null,
      words: null,
    };
  },

  mounted() {
    this.$http.get("http://localhost:9027/api/user/selectAll")
            .then(response => (this.tabledata = response.data.data));

    this.$http.get("http://localhost:9027/api/ecdict/showWords?num=3")
            .then(response => (this.words = response.data.data));
  },
  methods: {
    next() {
      if (this.active++ > 3) this.active = 1;
    },
    pre() {
      if (this.active-- <= 1) this.active = 1;
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
                if (response.data.code==0){
                  alert("数据添加成功");

                }
              })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #workflow {
    text-align: left;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }


</style>
