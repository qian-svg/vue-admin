<template>
    <div  ref="chart" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import resize from './mixins/resize'
import { UserList } from '@/api/home.js'
import {getPreviousDaysDates} from '@/api/tools.js'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    list: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      chart: null,
    }
  },
  watch:{
    list(val) {
        if (val) {
            this.initChart(val)
        }
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    async initChart(val) {
      var list = {}
      var list1 = {}
      if(val) {
         list1.start = val[0] + ' 00:00:00' 
         list.end = val[1] + ' 23:59:59'
      } else {
        list = getPreviousDaysDates(1)
        list1 = getPreviousDaysDates(7)
      }
      this.chart = this.$echarts.init(this.$refs.chart)
      await UserList({
        endTime : list.end,
        startTime : list1.start
      }).then((req) =>{
        const arr = req.data
        const time = arr.map(obj => {
            var index = obj.createTime.indexOf(' '); // 获取空格的位置
            var result = obj.createTime.substring(0, index);
            return result
        })
        const survivalNum = arr.map(obj => {return obj.survivalNum}) === null ? " 0 " : arr.map(obj => {return obj.survivalNum})
        const addUserNum = arr.map(obj => {return obj.addUserNum}) === null ? " 0 " : arr.map(obj => {return obj.addUserNum})
        const userTotal = arr.map(obj => {return obj.userTotal}) === null ? " 0 " : arr.map(obj => {return obj.userTotal})
        this.chart.setOption({
            backgroundColor: '#fff',
            title: {
                top: 20,
                text: '会员统计',
                textStyle: {
                    fontWeight: 'bold',
                    fontSize: 18,
                },
                left: '1%'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                    color: '#57617B'
                    }
                }
            },
            grid: {
                top: 100,
                left: '4%',
                right: '4%',
                bottom: '0%',
                containLabel: true
            },
            legend: {
                top: '15%',
                left: 'center',
                data: ['活跃会员', '新增会员', '累计会员'],
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    lineStyle: {
                    color: '#57617B'
                    }
                },
                data: time
            }],
            yAxis: [{
            type: 'value',
            name: '人数',
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                color: '#57617B'
                }
            },
            axisLabel: {
                margin: 10,
                textStyle: {
                fontSize: 14
                }
            },
            splitLine: {
                lineStyle: {
                color: '#57617B'
                }
            }
            }],
            series: [{
            name: '活跃会员',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
                normal: {
                width: 1
                }
            },
            itemStyle: {
                normal: {
                color: 'rgb(137,189,27)',
                borderColor: 'rgba(137,189,2,0.27)',
                borderWidth: 12

                }
            },
            data: survivalNum
            }, {
            name: '新增会员',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
                normal: {
                width: 1
                }
            },
            itemStyle: {
                normal: {
                color: 'rgb(0,136,212)',
                borderColor: 'rgba(0,136,212,0.2)',
                borderWidth: 12

                }
            },
            data: addUserNum
            }, {
            name: '累计会员',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
                normal: {
                width: 1
                }
            },
            itemStyle: {
                normal: {
                color: 'rgb(219,50,51)',
                borderColor: 'rgba(219,50,51,0.2)',
                borderWidth: 12
                }
            },
            data: userTotal
            }]
        })
      })
    },
    async initData() {
      const list = getPreviousDaysDates(1)
      const list1 = getPreviousDaysDates(7)
      this.charts = this.$echarts.init(this.$refs.charts)
      await UserList({
        endTime : list.end,
        startTime : list1.start
      }).then((req) =>{
        const arr = req.data
        const time = arr.map(obj => {
            var index = obj.createTime.indexOf(' '); // 获取空格的位置
            var result = obj.createTime.substring(0, index);
            return result
        })
        const payNum = arr.map(obj => {return obj.payNum})
        const payAmount = arr.map(obj => {return obj.payAmount})
        this.charts.setOption({
            backgroundColor: '#fff',
            title: {
                top: 20,
                text: '交易统计',
                textStyle: {
                    fontWeight: 'bold',
                    fontSize: 18,
                },
                left: '1%'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                    color: '#57617B'
                    }
                }
            },
            grid: {
                top: 100,
                left: '4%',
                right: '4%',
                bottom: '0%',
                containLabel: true
            },
            legend: {
                top: '15%',
                left: 'center',
                data: ['付费金额', '付费会员人数'],
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    lineStyle: {
                    color: '#57617B'
                    }
                },
                data: time
            }],
            yAxis: [{
            type: 'value',
            name: '人数',
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                color: '#57617B'
                }
            },
            axisLabel: {
                margin: 10,
                textStyle: {
                fontSize: 14
                }
            },
            splitLine: {
                lineStyle: {
                color: '#57617B'
                }
            }
            }],
            series: [{
            name: '付费金额',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
                normal: {
                width: 1
                }
            },
            itemStyle: {
                normal: {
                color: 'rgb(137,189,27)',
                borderColor: 'rgba(137,189,2,0.27)',
                borderWidth: 12

                }
            },
            data: payAmount
            }, {
            name: '付费会员人数',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
                normal: {
                width: 1
                }
            },
            itemStyle: {
                normal: {
                color: 'rgb(0,136,212)',
                borderColor: 'rgba(0,136,212,0.2)',
                borderWidth: 12

                }
            },
            data: payNum
            },]
        })
      })
    }
  }
}
</script>
