<template>
  <div class="app-container">
    <div>
      <el-row>
        <el-col :span="5">
          使用方式：
          <el-select
            clearable
            ref="optionRef"
            v-model="isRenew"
            placeholder="请选择"
            style="width: 150px"
            @change="selectChange2"
          >
            <el-option v-for="item in statusoptions" :key="item.status" :label="item.name" :value="item.name" />
          </el-select>
        </el-col>
        <el-col :span="5">
          激活码：<el-input clearable v-model="search.batchCode" placeholder="激活码" style="width:150px;" />
        </el-col>
        <el-button type="primary" @click="activateList"> 搜索 </el-button>
        <el-button type="" @click="ClickSearch"> 清空 </el-button>
        <el-button type="primary" :loading="btnLoading" @click="handleUse(true)">
          更新已使用
        </el-button>
        <el-button type="primary" :loading="btnLoading" @click="handleUse(false)">
          更新未使用
        </el-button>
        <el-button type="primary" :loading="btnLoading" @click="handleDownload">
          导出
        </el-button>
      </el-row>
    </div>
    <el-table :data="detailsList" style="width: 100%;margin-top:30px" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center" />
      <el-table-column align="center" label="激活码">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="220">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="激活操作类型">
        <template slot-scope="scope">
          {{ scope.row.relateId | relateIdtype }}<br>
        </template>
      </el-table-column>
      <el-table-column align="center" label="启用状态">
        <template slot-scope="scope">
          激活状态：{{ scope.row.isBind| capitalize }} <br>
          是否启用：{{ scope.row.isBind|capitalize }} <br>
          是否已使用：{{ scope.row.isUse|capitalize }} <br>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="page" :limit.sync="limit" v-on="$listeners" @pagination="refresh" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { detailsList, updateUse, exportList } from '@/api/activate'

export default {
  components: { Pagination },
  filters: {
    // 通过自定义过滤器
    capitalize(value) {
      if (value) return '是'
      // eslint-disable-next-line no-return-assign
      return value = '否'
    },
    relateIdtype(value) {
      if (value) return '续费'
      // eslint-disable-next-line no-return-assign
      return value = '购买'
    }
  },
  data() {
    return {
      total: 1,
      page: 1,
      limit: 10,
      newPad: true,
      status1: true,
      status: true,
      filename: '',
      detailsList: [],
      dialogdetail: false,
      modelist: [],
      selectedOptions: '',
      childrenOptions: '',
      childrenList: [],
      targetSelectArr: [], // 表格勾选数据
      addList: {},
      statusoptions: [
        { name: '续费', status: true },
        { name: '购买', status: false }
      ],
      search: {
        batchCode: ''
      },
      isRenew: '',
      btnLoading: false
    }
  },
  created() {
    this.activateList()
  },
  methods: {
    handleSelectionChange(selectionArr) {
      this.targetSelectArr = selectionArr
      // eslint-disable-next-line no-return-assign
      if (selectionArr.length === 0) this.newPad = true
      else this.newPad = false
    },
    refresh(opt = {}) {
      this.limit = opt.limit
      this.page = opt.page
      this.activateList()
      console.log('refresh:', opt)
    },
    // 导出
    async handleDownload() {
      this.btnLoading = true
      window.localStorage.setItem('type', 'exp')
      let batchCode = []
      if (this.search.batchCode.length !== 0) batchCode = this.search.batchCode.split(/\s+/)
      const req = await exportList({
        page: 1,
        pageSize: 5000,
        isRenew: this.search.isRenew,
        codeList: batchCode
      })
      const blob = new Blob([req], { type: 'application/vnd.ms-excel' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a') // 创建a标签
      link.href = url
      link.download = '激活码'
      link.click()
      this.btnLoading = false
      URL.revokeObjectURL(url)
      this.$forceUpdate()
    },
    // 获取激活码列表
    async activateList() {
      console.log('1111')
      // eslint-disable-next-line no-undef
      let batchCode = []
      console.log(this.search.batchCode)
      if (this.search.batchCode.length !== 0) batchCode = this.search.batchCode.split(/\s+/)
      const req = await detailsList({
        page: this.page,
        pageSize: this.limit,
        isRenew: this.search.isRenew,
        codeList: batchCode
      })
      this.detailsList = req.data.records
      this.total = req.data.total
    },
    // 清空搜索数据
    ClickSearch() {
      this.search = {}
      this.activateList()
    },
    // 是否使用
    selectChange2() {
      const obj = this.statusoptions.find((item) => item.name === this.isRenew)
      this.search.isRenew = obj.status
    },
    // 更新使用状态
    async handleUse(type) {
      this.btnLoading = true
      const idList = this.targetSelectArr.map(item => {
        return item.id
      })
      const req = await updateUse({
        idList,
        isUse: type
      })
      if (req.code === 200) {
        this.btnLoading = false
        this.$message(req.message)
        this.activateList()
      } else {
        this.btnLoading = false
        this.$message(req.message)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
    .text-center {
        text-align: left;
    }
}
</style>
