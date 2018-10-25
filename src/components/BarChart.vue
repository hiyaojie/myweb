<template>
  <highcharts class="chart" :options="chartOptions" :updateArgs="updateArgs" ></highcharts>
</template>

<script>
export default {
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'bar'
        },
        title: {
          text: '堆叠条形图'
        },
        xAxis: {
          categories: ['苹果', '橘子', '梨', '葡萄', '香蕉']
        },
        yAxis: {
          min: 0,
          title: {
            text: '水果消费总量'
          }
        },
        legend: {
          /* 图例显示顺序反转
               * 这是因为堆叠的顺序默认是反转的，可以设置
               * yAxis.reversedStacks = false 来达到类似的效果
               */
          reversed: true
        },
        plotOptions: {
          series: {
            stacking: 'normal'
          }
        },
        series: [{
          name: '小张',
          data: [5, 3, 4, 7, 2]
        }, {
          name: '小彭',
          data: [2, 2, 3, 2, 1]
        }, {
          name: '小潘',
          data: [3, 4, 4, 2, 5]
        }],
        credits: {
          enabled: false
        }
      }
    }
  }
}
</script>
<style scoped>
.chart {
  min-width:400px;
  height:400px
}
</style>
