<template>
  <div>
    <div>
      <el-row> 
        <el-col> 
          <div class="title-text">昨日关键情况</div> 
        </el-col>
      </el-row>
      <el-row style="margin-top:.5rem">
        <!-- 活跃会员数 -->
        <el-col :span="8" class="list">
          <div class="card">
            <div class="t1">
              <span class="t1-title">活跃用户数</span>
              <span class="el-tag el-day">
                <span class="el-tag__content">昨日</span>
              </span>
            </div>
            <div class="text-number">
              <span>{{userList.survivalNum}}</span>
            </div>
            <div>
              <span class="desc">环比</span>
              <span :class="{'gre': form.survivalNum < 0,'red': form.survivalNum > 0,'gray': form.survivalNum == 0}">
                {{form.survivalNum}}%
                <i :class="{'el-icon-caret-bottom': form.survivalNum <= 0,'el-icon-caret-top': form.survivalNum > 0}" />
              </span>
            </div>
          </div>
        </el-col>
        <!-- 付费 -->
        <el-col :span="8" class="list">
          <div class="card">
            <div class="t1">
              <span class="t1-title">付费金额（元）</span>
              <span class="el-tag el-day">
                <span class="el-tag__content">昨日</span>
              </span>
            </div>
            <div class="text-number">
              <span>{{userList.payAmount}}</span>
            </div>
            <div>
              <span class="desc">环比</span>
              <span :class="{'gre': form.payAmount <0,'red': form.payAmount >0,'gray': form.payAmount == 0}">
                {{form.payAmount}}%
                <i :class="{'el-icon-caret-bottom': form.payAmount <= 0,'el-icon-caret-top': form.payAmount > 0}" />
              </span>
            </div>
          </div>
        </el-col>
        <!-- 新增会员 -->
        <el-col :span="8" class="list">
          <div class="card">
            <div class="t1">
              <span class="t1-title">新增用户</span>
              <span class="el-tag el-day">
                <span class="el-tag__content">昨日</span>
              </span>
            </div>
            <div class="text-number">
              <span>{{userList.addUserNum}}</span>
            </div>
            <div>
              <span class="desc">环比</span>
              <span :class="{'gre': form.addUserNum < 0,'red': form.addUserNum > 0,'gray': form.addUserNum == 0}">
                {{form.addUserNum}}%
                <i :class="{'el-icon-caret-bottom': form.payAmount <= 0,'el-icon-caret-top': form.payAmount > 0}" />
              </span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row style="margin-top:1rem"> 
      <el-col> 
        <div class="title-text">会员情况</div> 
      </el-col>
      <el-col align="right">
        <el-button icon="el-icon-download" class="down" @click="exportUser"> 下载 </el-button>
        <el-date-picker
          style="width:200px"
          v-model="daterangeBizOccurDate"
          type="daterange"
          :picker-options="pickerOptions"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          @change="chooseTimeRange"
          align="center">
        </el-date-picker>
       </el-col>
    </el-row>
    <el-row style="margin-top:1rem"> 
      <el-col :span="24" class="list"> 
       <div class="chart-container">
         <chart height="100%" width="100%" :list="list"/>
      </div>
      </el-col>
    </el-row>
    <div style="margin-top: 1rem;">
      <el-row style="margin-top:.5rem">
        <!-- 活跃会员数 -->
        <el-col :span="8" class="list">
          <div class="card">
            <div class="t1">
              <span class="t1-title">活跃用户数</span>
              <span class="el-tag el-day">
                <span class="el-tag__content">昨日</span>
              </span>
            </div>
            <div class="text-number">
              <span>{{userList.survivalNum}}</span>
            </div>
            <div>
              <span class="desc">环比</span>
              <span :class="{'gre': form.survivalNum < 0,'red': form.survivalNum > 0,'gray': form.survivalNum == 0}">
                {{form.survivalNum}}%
                <i :class="{'el-icon-caret-bottom': form.survivalNum <= 0,'el-icon-caret-top': form.survivalNum > 0}" />
              </span>
            </div>
          </div>
        </el-col>
        <!-- 新增会员 -->
        <el-col :span="8" class="list">
          <div class="card">
            <div class="t1">
              <span class="t1-title">新增用户</span>
              <span class="el-tag el-day">
                <span class="el-tag__content">昨日</span>
              </span>
            </div>
            <div class="text-number">
              <span>{{userList.addUserNum}}</span>
            </div>
            <div>
              <span class="desc">环比</span>
              <span :class="{'gre': form.addUserNum < 0,'red': form.addUserNum > 0,'gray': form.addUserNum == 0}">
                {{form.addUserNum}}%
                <i :class="{'el-icon-caret-bottom': form.addUserNum <= 0,'el-icon-caret-top': form.addUserNum > 0}" />
              </span>
            </div>
          </div>
        </el-col>
        <!-- 累计会员数 -->
        <el-col :span="8" class="list">
          <div class="card">
            <div class="t1">
              <span class="t1-title">累计会员数</span>
              <span class="el-tag el-day">
                <span class="el-tag__content">昨日</span>
              </span>
            </div>
            <div class="text-number">
              <span>{{userList.userTotal}}</span>
            </div>
            <div>
              <span class="desc">环比</span>
              <span :class="{'gre': form.userTotal <0,'red': form.userTotal >0,'gray': form.userTotal == 0}">
                {{form.userTotal}}%
                <i :class="{'el-icon-caret-bottom': form.userTotal <= 0,'el-icon-caret-top': form.userTotal > 0}" />
              </span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="margin-top: 1rem;">
      <el-row> 
        <el-col> 
          <div class="title-text">付费情况</div> 
        </el-col>
        <el-col align="right">
          <el-button  icon="el-icon-download" class="down" @click="exportPay"> 下载 </el-button>
          <el-date-picker
            style="width:200px"
            v-model="daterangeBizOccurDate1"
            type="daterange"
            :picker-options="pickerOptions1"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            @change="chooseTimeRange1"
            align="center">
          </el-date-picker>
       </el-col>
      </el-row>
      <el-row style="margin-top:1rem"> 
        <el-col :span="24" class="list"> 
        <div class="chart-container">
          <charts height="100%" width="100%" :list1="list1"/>
        </div>
        </el-col>
      </el-row>
      <el-row style="margin-top: 1rem">
        <!-- 付费金额 -->
        <el-col :span="8" class="list">
          <div class="card">
            <div class="t1">
              <span class="t1-title">付费金额</span>
              <span class="el-tag el-day">
                <span class="el-tag__content">昨日</span>
              </span>
            </div>
            <div class="text-number">
              <span>{{userList.payAmount}}</span>
            </div>
            <div>
              <span class="desc">环比</span>
              <span :class="{'gre': form.payAmount < 0,'red': form.payAmount > 0,'gray': form.payAmount == 0}">
                {{form.payAmount}}%
                <i :class="{'el-icon-caret-bottom': form.payAmount <= 0,'el-icon-caret-top': form.payAmount > 0}" />
              </span>
            </div>
          </div>
        </el-col>
        <!-- 新增会员 -->
        <el-col :span="8" class="list">
          <div class="card">
            <div class="t1">
              <span class="t1-title">付费会员人数</span>
              <span class="el-tag el-day">
                <span class="el-tag__content">昨日</span>
              </span>
            </div>
            <div class="text-number">
              <span>{{userList.payNum}}</span>
            </div>
            <div>
              <span class="desc">环比</span>
              <span :class="{'gre': form.payNum < 0,'red': form.payNum > 0,'gray': form.payNum == 0}">
                {{form.payNum}}%
                <i :class="{'el-icon-caret-bottom': form.payNum <= 0,'el-icon-caret-top': form.payNum > 0}" />
              </span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="margin-top: 1rem;">
      <el-row style="margin-top: 1rem;"> 
        <el-col> 
          <div class="title-text">设备情况</div> 
        </el-col>
      </el-row>
      <el-row style="margin-top:.5rem" :gutter="20">
        <!-- 付费金额 -->
        <el-col :span="4" class="list" v-for="(item, index) in cols" :key="index">
          <div class="card">
            <div class="t1">
              <span class="t1-title">{{item.name}}</span>
            </div>
            <div class="text-number">
              <span>{{item.num}}</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { UserList, devicesList, exportUserList, exportPayList } from '@/api/home.js'
import { levelList } from '@/api/activate'
import {getPreviousDaysDates} from '@/api/tools.js'
import Chart from '@/components/Charts/Line'
import Charts from '@/components/Charts/Line1'

export default {
  components: { Chart,Charts },
  data() {
    return {
      form: {
        survivalNum: 0,
        payAmount: 0,
        addUserNum: 0,
        userTotal: 0,
        payNum: 0,
      },
      userList:{
        survivalNum: 0,
        payAmount: 0,
        addUserNum: 0,
        userTotal: 0,
        payNum: 0,
      },
      dataFromParent: [],
      cols: [],
      intervalId: null,
      leveloptions:[],
      daterangeBizOccurDate: [],
      pickerOptions: {
      },
      daterangeBizOccurDate1:[],
      pickerOptions1: {
      },
      list:[],
      list1:[]
    }
  },
  mounted(){
  },
  created() {
    this.levelList()
    this.getUserList()
    this.fetchData()
    this.intervalId = setInterval(this.fetchData, 2 * 60 * 60 * 1000)
  },
  destroyed() {
    if (this.intervalId) {
      clearInterval(this.intervalId); // 清除定时器
    }
  },
  methods: {
    chooseTimeRange(t) {
      this.list = t
    },
    chooseTimeRange1(t) {
      this.list1 = t
    },
    // 实例等级
    async levelList() {
      const req = await levelList()
      this.leveloptions = req.data
    },
    // 昨日用户数据
    async getUserList() {
      const list = getPreviousDaysDates(1)
      const req = await UserList({
        endTime : list.end,
        startTime : list.start
      })
      this.userList = req.data[0]
      this.getUserList1()
    },
    // 前日用户数据
     async getUserList1() {
      const list = getPreviousDaysDates(2)
      const req = await UserList({
        endTime : list.end,
        startTime : list.start
      })
      const arr = req.data[0]
      if(arr == undefined) return
      const res = {}
      res.survivalNum = this.calculatePercentageChange (this.userList.survivalNum,arr.survivalNum)
      res.payAmount = this.calculatePercentageChange (this.userList.payAmount,arr.payAmount)
      res.addUserNum = this.calculatePercentageChange (this.userList.addUserNum,arr.addUserNum)
      res.userTotal = this.calculatePercentageChange (this.userList.userTotal,arr.userTotal)
      res.payNum = this.calculatePercentageChange (this.userList.payNum,arr.payNum)
      this.form = res
    },
    // 计算环比数据
    calculatePercentageChange (newValue, oldValue) {
        if (oldValue === 0) {
          // 处理分母为0的情况
          if (newValue === 0) {
              return 0; // 如果当前值也为0，则返回0
          } else {
              return Math.round(newValue * 100); // 如果当前值不为0，则无法计算百分比
          }
        } else if (oldValue > newValue) {
          var percentage = ((newValue - oldValue) / oldValue) * 100;
          return Math.round(percentage * 100) / 100
        } else {
            // 计算百分比
            var percentage = ((newValue - oldValue) / oldValue) * 100;
            return Math.round(percentage * 100) / 100; // 四舍五入到小数点后两位
        }
    },
    // 设备数据
    async fetchData() {
      const response = await devicesList();
      var arr = this.leveloptions
      var list = response.data
      arr.forEach(item => {
        item.name = item.name + '绑定数'
        item.num = 0
        list.forEach(item1 => {
          if (item.id === item1.level) {
            item.num = item.num+1
          }
        })
      })
      this.cols = arr
      this.$forceUpdate()

    },
    // 用户信息导出
    async exportUser() {
      var list = {}
      var list1 = {}
      if(this.list.length > 0) {
         list1.start = this.list[0] + ' 00:00:00' 
         list.end = this.list[1] + ' 23:59:59'
      } else {
        list = getPreviousDaysDates(1)
        list1 = getPreviousDaysDates(7)
      }
      const req = await exportUserList({
        endTime : list.end,
        startTime : list1.start
      })
      const blob = new Blob([req], { type: 'application/vnd.ms-excel' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a') // 创建a标签
      link.href = url
      link.download = '会员信息'
      link.click()
      URL.revokeObjectURL(url)
      this.$forceUpdate()
    },
    // 付费数据导出
    async exportPay() {
      var list = {}
      var list1 = {}
      if(this.list1.length > 0) {
         list1.start = this.list1[0] + ' 00:00:00' 
         list.end = this.list1[1] + ' 23:59:59'
      } else {
        list = getPreviousDaysDates(1)
        list1 = getPreviousDaysDates(7)
      }
      const req = await exportPayList({
        endTime : list.end,
        startTime : list1.start
      })
      const blob = new Blob([req], { type: 'application/vnd.ms-excel' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a') // 创建a标签
      link.href = url
      link.download = '付费信息'
      link.click()
      URL.revokeObjectURL(url)
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped>
  .title-text {
    font-size: 1.5rem;
    font-weight: 500;
  }
  .list {
    padding-right: 8px;
    padding-left: 8px;
  }
  .card {
    background-color: #fff;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    flex-wrap: nowrap;
    gap: .5rem;
  }
  .t1 {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
  }
  .text-number {
    font-size: 2rem;
    line-height: 2.25rem;
    display: flex;
  }
  .t1-title {
    color: gray
  }
  .el-day {
    height: 24px;
    line-height: 1;
    padding: 0 9px;
    align-items: center;
    display: inline-flex;
  }
  .desc {
    color: gray;
    font-size: .875rem;
    line-height: 1.25rem;
  }
  .gre {
    font-size: .9rem;
    line-height: 1.3rem;
    color: rgb(34,197,94);
  }
  .red {
    font-size: .9rem;
    line-height: 1.3rem;
    color: red;
  }
  .gray {
    font-size: .9rem;
    line-height: 1.3rem;
    color: gray;
  }
  .chart-container{
    position: relative;
    width: 100%;
    height: calc(100vh - 60vh);
    margin: auto;
  }
  .down {
    background-color: #ecf5ff;
    border-color: #d9ecff;
    display: inline-block;
    width: 80px;
    height: 32px;
    padding: 0 10px;
    margin-right: 10px;
    line-height: 30px;
    font-size: 12px;
    color: #409EFF;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: nowrap;
  }
</style>

