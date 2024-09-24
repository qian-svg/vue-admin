<template>
    <div ref="charts" :class="className1" :style="{height:height,width:width}" />
</template>

<script>
import resize from './mixins/resize'
import { UserList } from '@/api/home.js'
import {getPreviousDaysDates} from '@/api/tools.js'

export default {
  mixins: [resize],
  props: {
    className1: {
      type: String,
      default: 'charts'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    list1: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      charts: null
    }
  },
  watch:{
    list1(val) {
        if (val) {
            this.initData(val)
        }
    }
  },
  mounted() {
    this.initData()
  },
  beforeDestroy() {
    if (!this.charts) {
      return
    }
    this.charts.dispose()
    this.charts = null
  },
  methods: {
    async initData(val) {
      var list = {}
      var list1 = {}
      if(val) {
         list1.start = val[0] + ' 00:00:00' 
         list.end = val[1] + ' 23:59:59'
      } else {
        list = getPreviousDaysDates(1)
        list1 = getPreviousDaysDates(7)
      }
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
        const payNum = arr.map(obj => {return obj.payNum}) === null ? " 0 " : arr.map(obj => {return obj.payNum})
        const payAmount = arr.map(obj => {return obj.payAmount}) === null ? " 0 " : arr.map(obj => {return obj.payAmount})
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
                name: '金额(单位：元)',
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
                },
                {
                type: 'value',
                position: 'right',
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
            yAxisIndex: 0,
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
             yAxisIndex: 1,
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
