/* eslint-disable prefer-const */ /* eslint-disable no-unused-vars */
<template>
  <div class="chart">
    <el-card>
      <ul class="list">
        <li class="item color1">
          <div class="itemContent">{{ info.increment_users }}</div>
          <p>今日新增用户</p>
        </li>
        <li class="item color1">
          <div class="itemContent">{{ info.total_users }}</div>
          <p>总用户数</p>
        </li>
        <li class="item color2">
          <div class="itemContent">{{ info.increment_questions }}</div>
          <p>新增试题</p>
        </li>
        <li class="item color2">
          <div class="itemContent">{{ info.total_questions }}</div>
          <p>总试题量</p>
        </li>
        <li class="item color3">
          <div class="itemContent">{{ info.total_done_questions }}</div>
          <p>总刷题量</p>
        </li>
        <li class="item color3">
          <div class="itemContent">{{ info.personal_questions }}</div>
          <p>人均刷题量</p>
        </li>
      </ul>
    </el-card>
    <el-card>
      <div class="echarts" ref="echarts"></div>
    </el-card>
  </div>
</template>

<script>
import { getChart, getStatistics } from '@/api/chart'
import echarts from 'echarts'
export default {
  data () {
    return {
      info: ''
    }
  },
  created () {
    getChart().then(res => {
      this.info = res.data
      window.console.log('获取', res)
    })
  },
  mounted () {
    // eslint-disable-next-line prefer-const
    let myEcharts = echarts.init(this.$refs.echarts)
    getStatistics().then(res => {
      window.console.log('饼状图数据', res)
      // eslint-disable-next-line no-unused-vars
      var lengendData = res.data.map(item => {
        return item.name
      })
      // eslint-disable-next-line prefer-const
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 80,
          data: lengendData
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: res.data
          }
        ]
      }
      myEcharts.setOption(option)
    })
  }
}
</script>

<style lang="less">
.chart {
  .list {
    display: flex;
    text-align: center;
    justify-content: space-around;
    .item {
      width: 100px;
      height: 100px;
      line-height: 100px;
      border-radius: 50%;
    }
    .color1 {
      border: 3px solid #0086fa;
    }
    .color2 {
      border: 3px solid #f76137;
    }
    .color3 {
      border: 3px solid #55cd78;
    }
  }
  .echarts {
    height: 500px;
  }
}
</style>
