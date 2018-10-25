<template>
  <div class="chartElem">
    <div class="row">
      <highcharts class="chart" :options="chartOptions" :updateArgs="updateArgs" ></highcharts>
      <!--<div>-->
        <!--<h3>Flexibly change the value of each point:</h3>-->
        <!--<h4>Points:</h4>-->
        <!--<form class="row points">-->
          <!--<div v-for="index in 8" :key="index">-->
            <!--<p>{{index}}</p>-->
            <!--<input v-model.number="points[index-1]" type="number" class="numberInput">-->
          <!--</div>-->
        <!--</form>-->
      <!--</div>-->
    </div>
    <!--<div class="row">-->
      <div id="title" v-show="false">
        <h3>Set chart title dynamically:</h3>
        <input type="text" v-model="title">
      </div>
      <!--<div id="chartType">-->
        <!--<h3>Select chart type:</h3>-->
        <!--<select v-model="chartType">-->
          <!--<option>Spline</option>-->
          <!--<option>AreaSpline</option>-->
          <!--<option>Line</option>-->
          <!--<option>Scatter</option>-->
          <!--<option>Column</option>-->
          <!--<option>Area</option>-->
        <!--</select>-->
      <!--</div>-->
      <!--<div id="animationDuration">-->
        <!--<h3>Select update animation duration:</h3>-->
        <!--<select v-model="animationDuration" type="number">-->
          <!--<option>0</option>-->
          <!--<option>500</option>-->
          <!--<option>1000</option>-->
          <!--<option>2000</option>-->
        <!--</select>-->
      <!--</div>-->
      <!--<div id="seriesColor">-->
        <!--<h3>Select color of the series:</h3>-->
        <!--<div class="row">-->
          <!--<input id="colorPicker" v-if="colorInputIsSupported" type="color" value="#6fcd98" v-model="seriesColor">-->
          <!--<select v-else v-model="seriesColor">-->
            <!--<option>Red</option>-->
            <!--<option>Green</option>-->
            <!--<option>Blue</option>-->
            <!--<option>Pink</option>-->
            <!--<option>Orange</option>-->
            <!--<option>Brown</option>-->
            <!--<option>Black</option>-->
            <!--<option>Purple</option>-->
          <!--</select>-->
        <!--</div>-->
        <!--<p>Current color: {{seriesColor}}</p>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>

  export default {
    data () {
      return {
        title: '',
        points: [10, 0, 8, 2, 6, 4, 5, 5],
        chartType: 'column',
        seriesColor: '#6fcd98',
        colorInputIsSupported: null,
        animationDuration: 1000,
        updateArgs: [true, true, {duration: 1000}],
        num: [],
        chartOptions: {
          chart: {
            type: 'column'
          },
          title: {
            text: 'watch'
          },
//          subtitle: {
//            text: '数据来源: WorldClimate.com'
//          },
          xAxis: {
            categories: ['少年','青年','中年','老年'],
            crosshair: true
          },
          yAxis: {
            min: 0,
            title: {
              text: '人数（名）'
            }
          },
          tooltip: {
            // head + 每个 point + footer 拼接成完整的 table
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
          },
          plotOptions: {
            column: {
              borderWidth: 0
            }
          },
          series: [{
            name: '人数',
            data: [5,6,5,4]
          }],
          credits: {
            enabled: false
          }
        }
      }
    }
//        {
//          chart: {
//            type: 'spline'
//          },
//          title: {
//            text: 'Sin chart'
//          },
//          series: [{
//            data: [10, 0, 8, 2, 6, 4, 5, 5],
//            color: '#6fcd98'
//          },
//            {
//              data: null,
//              color: '#6fcd98'
//            }],
//          credits: {
//            enabled: false
//          }
//        }
//      }
//    }
    ,
    mounted() {
      this.$http.get("http://localhost:9027/api/user/staticGender")
              .then(res => {
                for (let index in res.data.data){
                  this.chartOptions.xAxis.categories[index] = res.data.data[index]['ssex'];
                  this.chartOptions.series[0].data[index] = res.data.data[index]['num'];
                }
                this.title = '学生性别分布';
              })
    },
    watch: {
      title (newValue) {
        this.chartOptions.title.text = newValue
      },
//      points (newValue) {
//        this.chartOptions.series[1].data = newValue
//      },
//      chartType (newValue) {
//        this.chartOptions.chart.type = newValue.toLowerCase()
//      },
//      seriesColor (newValue) {
//        this.chartOptions.series[0].color = newValue.toLowerCase()
//      },
//      animationDuration (newValue) {
//        this.updateArgs[2].duration = Number(newValue)
//      }
    }
  }
</script>

<style scoped>
  input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  #colorPicker {
    border: 0;
    padding: 0;
    margin: 0;
    width: 30px;
    height: 30px;
  }
  .numberInput {
    width: 30px;
  }
</style>
