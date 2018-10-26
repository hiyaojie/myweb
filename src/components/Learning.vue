<template>
  <div class="learning">
    <h1 align="center">每日Learning路线</h1>
    <el-steps :active="active" finish-status="success">
      <!--<el-step title="步骤 1"></el-step>-->
      <!--<el-step title="步骤 2"></el-step>-->
      <!--<el-step title="步骤 3"></el-step>-->
      <el-step v-for="step in steps" :key="step.num" v-bind:title="'步骤'+step.num"
               v-bind:description="step.desc"></el-step>

    </el-steps>
    <div v-show="active==1" class="content">
      <el-row>
        <el-col :span="5" v-for="(o, index) in words" :key="index" :offset="index > 0 ? 3 : 0">
          <el-card :body-style="{ padding: '10px' }" style="height: 200px">
            <!--<img src="../assets/logo.png" class="image">-->
            <div style="padding: 10px;">
              <b>{{ o.word }}</b>
              <p>{{ o.definition}}</p>
              <p>{{ o.translation }}</p>
              <!--<span>{{o.char}}</span>-->
              <!--<p v-for="e in o.explian">{{e}}</p>-->
              <!--<p>vt. 原谅;为…申辩;免除，宽免;给…免去</p>-->
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div v-show="active==2">danci2</div>
    <div v-show="active==3">danci3</div>
    <div v-show="active==4">danci3</div>
    <div v-show="active==5">danci3</div>

    <!--<div v-for="word in words" class="word">-->
      <!--<div v-show="active==word.num">{{word.word}}</div>-->
    <!--</div>-->

    <el-button style="margin-top: 12px;" @click="pre">上一步</el-button>
    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
  </div>
</template>


<script>
  import moment from "moment"
    export default {
        name: "learning",
        data() {
          return {
            active: 1,
            steps: [
              {num:1,word:'hello',desc:'学习5个英语单词'},
              {num:2,word:'world',desc:'学习3个Linux指令'},
              {num:3,word:'nice to meet you',desc:'学习1个Java面试题'},
              {num:4,word:'how are you',desc:'学习1个Pandas函数'},
              {num:5,word:'I am fine',desc:'看5页编程书籍'},

            ],
            words: [],
//            words: [
//              {char:'excuse',
//                explian:['vt 原谅;为…申辩;免除，宽免;给…免去',
//                'n 辩解;借口，托辞;道歉，歉意;请假条',
//                  'vi 作为借口;请示宽恕;表示宽恕'
//                ]},
//              {char:'excuse',
//                explian:['vt 原谅;为…申辩;免除，宽免;给…免去',
//                'n 辩解;借口，托辞;道歉，歉意;请假条',
//                  'vi 作为借口;请示宽恕;表示宽恕'
//                ]},
//              {char:'excuse',
//                explian:['vt 原谅;为…申辩;免除，宽免;给…免去',
//                'n 辩解;借口，托辞;道歉，歉意;请假条',
//                  'vi 作为借口;请示宽恕;表示宽恕'
//                ]}],
            currentDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          }
        },
      mounted() {
        this.$http.get("http://localhost:9027/api/ecdict/showWords?num=3")
                .then(response =>
                {
                  this.words = response.data.data;
                });
      },
        methods: {
          next() {
            if (this.active++ > this.steps.length-1) this.active = 1;

          },
          pre() {
            if (this.active-- < 2) this.active = 1;
          }
        }

    }
</script>

<style scoped>
  .learning{
    /*margin-top: 60px;*/
  }
  .content{
    margin-top: 60px;
  }

  .word{
    width: 200px;
    align-content: center;
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
    width: 50%;
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
