<template>
  <div class="app-container">
    <div>
      <el-row>
        <el-col :span="6">
          激活码批次：<el-input clearable v-model="filename" placeholder="激活码批次" style="width:150px;" />
        </el-col>
        <el-col :span="6">
          实例等级：
          <el-select
            clearable
            ref="optionRef"
            v-model="searchlevel"
            placeholder="请选择"
            style="width: 200px"
            @change="selectlevel"
          >
            <el-option v-for="item in leveloptions" :key="item.id" :label="item.name" :value="item.name" />
          </el-select>
        </el-col>
        <el-col :span="5" class="text-center">
          备注: <el-input clearable v-model="remark" placeholder="备注" style="width:150px;" />
        </el-col>
        <el-button type="" @click="ClickSearch"> 清空 </el-button>
        <el-button type="primary" @click="activateList('search')">
          搜索
        </el-button>
        <el-button type="primary" @click="handleAdd">
          新增
        </el-button>
      </el-row>
    </div>
    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column type="selection" align="center" />
      <el-table-column align="center" label="激活码批次" width="220">
        <template slot-scope="scope">
          {{ scope.row.batchCode }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="到期时间" width="220">
        <template slot-scope="scope">
          {{ scope.row.expireTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="使用天数" width="220">
        <template slot-scope="scope">
          {{ scope.row.useDay }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="实例等级">
        <template slot-scope="scope">
          {{ scope.row.levelName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="有效范围">
        <template slot-scope="scope">
          开始时间：{{ scope.row.createTime }}<br>
          结束时间：{{ scope.row.expireTime }}<br>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template slot-scope="scope">
          {{ scope.row.remark }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增激活码弹窗 -->
    <el-dialog :visible.sync="dialogVisible" title="新增激活码批次" append-to-body>
      <el-form label-width="120px" label-position="left">
        <el-form-item label="激活码批次">
          <el-input clearable v-model="addList.batchCode" placeholder="激活码批次" style="width:150px;" />
        </el-form-item>
        <el-form-item label="到期时长">
          <el-date-picker v-model="addList.expireTime" type="date" placeholder="选择时长" style="width:150px;" value-format="yyyy-MM-dd" :picker-options="pickerOptions" />
        </el-form-item>
        <el-form-item label="使用时长">
          <el-input clearable v-model="addList.useDay" style="width:150px;" />
        </el-form-item>
        <el-form-item label="激活数量">
          <el-input clearable v-model="addList.num" placeholder="激活数量" style="width:150px;" />
        </el-form-item>
        <el-form-item label="实例等级">
          <el-select
            clearable
            ref="optionRef"
            v-model="instanceLevel"
            placeholder="请选择"
            style="width: 250px"
            @change="selectChange1"
          >
            <el-option v-for="item in leveloptions" :key="item.id" :label="item.name" :value="item.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input clearable v-model="addList.remark" placeholder="备注" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" />
        </el-form-item>
        <el-button style="margin:20px 0 0px 20px;" :loading="btnLoading" type="primary" @click="Addactivate">
          提交
        </el-button>
        <el-button style="margin:20px 0 0px 20px;" @click="dialogVisible = false">
          取消
        </el-button>
      </el-form>
    </el-dialog>

    <!-- 详情弹窗 -->
    <el-dialog :visible.sync="dialogdetail" title="激活码详情" append-to-body width="80%">
      <div>
        <el-row>
          <el-col :span="5">
            使用方式:
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
            激活码: <el-input clearable v-model="search.batchCode" placeholder="激活码" style="width:150px;" />
          </el-col>
          <el-button type="" @click="ClickDetailSearch"> 清空 </el-button>
          <el-button type="primary" @click="handleSearch">
            搜索
          </el-button>
          <el-button type="primary"  :loading="btnLoading" @click="handleUse(true)">
            更新已使用
          </el-button>
          <el-button type="primary"  :loading="btnLoading" @click="handleUse(false)">
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
      <pagination v-show="total1>0" :total="total1" :page.sync="page1" :limit.sync="limit1" v-on="$listeners" @pagination="refresh1" />
    </el-dialog>
    <pagination v-show="total>0" :total="total" :page.sync="page" :limit.sync="limit" v-on="$listeners" @pagination="refresh" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { batchList, generate, detailsList, exportList, levelList, updateUse } from '@/api/activate'

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
      total1: 1,
      page1: 1,
      limit1: 10,
      filename: '',
      remark: '',
      rolesList: [],
      addList: {},
      dialogVisible: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
      batchCode: '',
      level: '',
      detailsList: [],
      dialogdetail: false,
      row: {},
      searchlevel: '',
      leveloptions: [],
      search: {
        batchCode: ''
      },
      isRenew: '',
      statusoptions: [
        { name: '续费', status: true },
        { name: '购买', status: false }
      ],
      instanceLevel: '',
      targetSelectArr: [], // 勾选数据
      btnLoading: false
    }
  },
  created() {
    this.levelList()
    this.activateList()
  },
  methods: {
    // 详情勾选的数据
    handleSelectionChange(selectionArr) {
      this.targetSelectArr = selectionArr
    },
    refresh(opt = {}) {
      this.limit = opt.limit
      this.page = opt.page
      this.activateList()
      console.log('refresh:', opt)
    },
    refresh1(opt = {}) {
      this.limit1 = opt.limit
      this.page1 = opt.page
      this.handleEdit(this.row)
      console.log('refresh:', opt)
    },
    async levelList() {
      const req = await levelList()
      this.leveloptions = req.data
    },
    // 新增
    handleAdd() {
      this.dialogVisible = true
    },
    // 新增激活码
    async Addactivate() {
      this.btnLoading = true
      const req = await generate({
        batchCode: this.addList.batchCode,
        expireTime: (Date.parse(new Date(this.addList.expireTime))),
        useDay: this.addList.useDay,
        num: this.addList.num,
        level: this.addList.level,
        remark: this.addList.remark
      })
      if (req.code === 200) {
        this.activateList()
        this.dialogVisible = false
        this.addList = {}
        this.btnLoading = false
        this.$message(req.message)
        return
      }
      this.btnLoading = false
      this.$message(req.message)
    },
    // 列表数据
    async activateList() {
      // eslint-disable-next-line no-undef
      const req = await batchList({
        page: this.page,
        pageSize: this.limit,
        batchCode: this.filename,
        remark: this.remark,
        level: this.level
      })
      const data = req.data.records
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < this.leveloptions.length; j++) {
          if (data[i].level === this.leveloptions[j].id) {
            data[i].levelName = this.leveloptions[j].name
          }
        }
      }
      this.rolesList = data
      this.total = req.data.records.length
      this.$forceUpdate()
      console.log(req)
    },

    // 详情搜索
    async handleSearch() {
      let batchCode = []
      console.log(this.search.batchCode)
      if (this.search.batchCode.length !== 0) batchCode = this.search.batchCode.split(/\s+/)
      const req = await detailsList({
        page: this.page1,
        pageSize: this.limit1,
        isRenew: this.search.isRenew,
        codeList: batchCode,
        batchId: this.row.id
      })
      this.detailsList = req.data.records
      this.total1 = req.data.total
      this.$forceUpdate()
    },

    // 导出
    async handleDownload() {
      this.btnLoading = true
      window.localStorage.setItem('type', 'exp')
      let batchCode = []
      console.log(this.search.batchCode)
      if (this.search.batchCode.length !== 0) batchCode = this.search.batchCode.split(/\s+/)
      const req = await exportList({
        page: 1,
        pageSize: 5000,
        batchId: this.row.id,
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
    // 详情
    async handleEdit(row) {
      this.row = row
      this.dialogdetail = true
      const req = await detailsList({
        page: this.page1,
        pageSize: this.limit1,
        batchId: row.id
      })
      this.detailsList = req.data.records
      this.total1 = req.data.total
    },
    selectlevel() {
      const obj = this.leveloptions.find((item) => item.name === this.searchlevel)
      this.level = obj.id
    },
    selectChange1() {
      const obj = this.leveloptions.find((item) => item.name === this.instanceLevel)
      this.addList.level = obj.id
    },
    // 是否使用
    selectChange2() {
      const obj = this.statusoptions.find((item) => item.name === this.isRenew)
      this.search.isRenew = obj.status
    },
    // 清空搜索
    ClickSearch() {
      this.level = ''
      this.filename = ''
      this.searchlevel = ''
      this.activateList()
    },
    ClickDetailSearch() {
      this.search.batchCode = ''
      this.search.isRenew = ''
      this.isRenew = ''
      this.handleSearch()
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
        this.handleEdit(this.row)
      } else {
        this.btnLoading = false
        this.$message(req.message)
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
