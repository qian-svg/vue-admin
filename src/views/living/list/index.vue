<template>
  <div class="app-container">
    <div>
      <el-row>
        <el-col :span="5" class="text-center">
          实例编号：<el-input clearable v-model="search.no"  @input="changeMessage($event)" placeholder="实例编号" style="width:150px;" />
        </el-col>
        <el-col :span="5" class="text-center">
          物理机IP：<el-input clearable v-model="search.entityip"  @input="changeMessage($event)" placeholder="物理机IP" style="width:150px;" />
        </el-col>
        <el-col :span="5" class="text-center">
          实例等级：
          <el-select
            clearable
            ref="optionRef"
            v-model="searchlevel"
            placeholder="请选择"
            style="width: 150px"
            @change="selectlevel"
          >
            <el-option v-for="item in leveloptions" :key="item.id" :label="item.name" :value="item.name" />
          </el-select>
        </el-col>
        <el-col :span="8" class="text-center">
          <el-button type="primary" @click="exampleList"> 搜索 </el-button>
          <el-button type="" @click="ClickSearch"> 清空 </el-button>
          <el-button type="primary" @click="AddClick">
          新增
        </el-button>
        <el-button type="primary" @click="StatusClick(true)">
          启用
        </el-button>
        <el-button type="primary" @click="StatusClick(false)">
          禁用
        </el-button>
        <el-button type="primary" :disabled="newPad" @click="newPadClick">
          一键新机
        </el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="livingList" style="width: 100%;margin-top:20px;" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center" />
      <el-table-column align="center" label="实例编号">
        <template slot-scope="scope">
          {{ scope.row.no }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="实例信息">
        <template slot-scope="scope">
          实例等级：{{ scope.row.levelName }} <br>
          实例类型：{{ scope.row.type |livingtype }}<br>
          所在机房：{{ scope.row.computerRoom }}<br>
          归属实例池：{{ scope.row.poolName }}<br>
          物理机IP：{{ scope.row.ip }}<br>
          物理机编号：{{ scope.row.entityNo }}<br>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          绑定状态：{{ scope.row.isBind|capitalize }}<br>
          可用状态：{{ scope.row.isEnable|enableStatus }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="updateInstance(scope.row)">编辑
          </el-button>
          <el-button style="color:red" type="text" @click="delInstance(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogdetail" title="选择新机模型" append-to-body width="40%">
      <el-select v-model="selectedOptions" placeholder="请选择品牌" @change="selectChange">
        <el-option v-for="option in modelist" :key="option.id" :label="option.brand" :value="option.id" />
      </el-select>
      <el-select v-model="childrenOptions" placeholder="请选择型号">
        <el-option v-for="option in childrenList" :key="option.id" :label="option.model" :value="option.id" />
      </el-select>
      <el-row style="float: right;">
        <el-button style="margin:20px 0 0px 20px;" type="primary" :loading="btnLoading" @click="ClickNewPad">确定</el-button>
      </el-row>
    </el-dialog>
    <el-dialog :visible.sync="dialogAdd" :title="dialogTableitle" append-to-body width="40%">
      <el-form label-width="120px" label-position="left">
        <el-form-item label="实例名称">
          <el-input clearable v-model="addList.name" placeholder="实例名称" style="width:200px;" />
        </el-form-item>
        <el-form-item label="实例池名称">
          <el-input clearable v-model="addList.poolName" placeholder="实例池名称" style="width:200px;" />
        </el-form-item>
        <el-form-item label="实例编号">
          <el-input clearable v-model="addList.no" placeholder="实例编号" style="width:200px;" />
        </el-form-item>
        <el-form-item label="物理机机房">
          <el-input clearable v-model="addList.computerRoom" placeholder="物理机机房" style="width:200px;" />
        </el-form-item>
        <el-form-item label="物理机编号">
          <el-input clearable v-model="addList.entityNo" placeholder="物理机编号" style="width:200px;" />
        </el-form-item>
        <el-form-item label="物理机IP">
          <el-input clearable v-model="addList.ip" placeholder="物理机IP" style="width:200px;" />
        </el-form-item>
        <el-form-item label="实例级别">
          <el-select
            clearable
            ref="optionRef"
            v-model="value"
            placeholder="请选择"
            style="width: 200px"
            @change="selectChange1"
          >
            <el-option v-for="item in leveloptions" :key="item.id" :label="item.name" :value="item.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="实例类型">
           <el-select
            clearable
            ref="optionRef"
            v-model="type"
            placeholder="请选择"
            style="width: 200px"
            @change="selectChangeType"
          >
            <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.name" />
          </el-select>
          <!-- <el-input clearable v-model="addList.type" placeholder="实例类型" style="width:200px;" /> -->
        </el-form-item>
        <el-form-item label="是否启用">
          <el-select
            clearable
            ref="optionRef"
            v-model="addstatus"
            placeholder="请选择"
            style="width: 200px"
            @change="selectChange2"
          >
            <el-option v-for="item in statusoptions" :key="item.status" :label="item.name" :value="item.name" />
          </el-select>
        </el-form-item>
        <el-button style="margin:20px 0 0px 20px;" type="" @click="dialogAdd = false">
          取消
        </el-button>
        <el-button style="margin:20px 0 0px 20px;" :loading="btnLoading" type="primary" @click="livingAddClick">
          确定
        </el-button>
      </el-form>
    </el-dialog>
    <pagination v-show="total>0" :total="total" :page.sync="page" :limit.sync="limit" v-on="$listeners" @pagination="refresh" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { instanceList, modelList, newPad, levelList, addInstance, updateliving, enable, instanceDelete } from '@/api/activate'

export default {
  components: { Pagination },
  filters: {
    // 通过自定义过滤器
    capitalize(value) {
      if (value) return '是'
      // eslint-disable-next-line no-return-assign
      return value = '否'
    },
    livingtype(value) {
      if (value === 1) return '安卓10'
      else if (value === 2) return '安卓12'
      else if (value === 3) return '安卓8'
      // eslint-disable-next-line no-return-assign
      return value = '暂无'
    },
    enableStatus(value) {
      if (value) return '启用'
      // eslint-disable-next-line no-return-assign
      return value = '禁用'
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
      livingList: [],
      search: {
        no: '',
        entityip: ''
      },
      dialogdetail: false,
      modelist: [],
      selectedOptions: '',
      childrenOptions: '',
      childrenList: [],
      targetSelectArr: [], // 表格勾选数据
      dialogAdd: false,
      addList: {},
      instanceLevel: '',
      leveloptions: [],
      typeList: [
        {name: '安卓10',id:1},
        {name: '安卓12',id:2},
        {name: '安卓8',id:3},
      ],
      value: '',
      type: '',
      addstatus: '',
      statusoptions: [
        { name: '启用', status: true },
        { name: '禁用', status: false }
      ],
      searchlevel: '',
      dialogTableitle: '新增实例',
      table: 'add',
      btnLoading: false
    }
  },
  created() {
    this.levelList()
    this.exampleList()
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
      this.exampleList()
      console.log('refresh:', opt)
    },
    handleDownload() {},
    async levelList() {
      const req = await levelList()
      this.leveloptions = req.data
    },
    // 获取实例列表
    async exampleList() {
      console.log('1111')
      // eslint-disable-next-line no-undef
      let no = []
      let ip = []
      if (this.search.no.length !== 0) no = this.search.no.split(/\s+/)
      if (this.search.entityip.length !== 0) ip = this.search.entityip.split(/\s+/)
      const params = {
        page: this.page,
        pageSize: this.limit,
        ipList: ip,
        noList: no,
        level: this.search.level
      }
      const req = await instanceList(params)
      this.livingList = req.data.records
      this.total = req.data.total
      console.log(req)
    },
    // 一键新机
    async newPadClick() {
      if (this.targetSelectArr.length === 0) return this.$message({ message: '请先勾选需要新机设备', showClose: true })
      this.dialogdetail = true
      const req = await modelList({
        page: this.page,
        pageSize: this.limit
      })
      this.modelist = req.data.records
      this.selectedOptions = req.data.records[0].id
      this.selectChange()
      console.log(req)
    },
    // 模型选择
    selectChange() {
      console.log(this.selectedOptions)
      const list = this.modelist
      const arr = []
      list.forEach(item => {
        if (item.id === this.selectedOptions) {
          const option = item.brand
          if (item.brand === option) {
            arr.push(item)
          }
        }
      })
      this.childrenList = arr
      console.log(this.childrenList)
    },
    // 确定一键新机
    async ClickNewPad() {
      this.$confirm('确定一键新机吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'custom-cancel-button',
        type: 'warning'
      }).then(async() => {
        this.btnLoading = true
        const noList = this.targetSelectArr.map(item => {
          return item.no
        })
        const instanceModelId = this.selectedOptions
        const req = await newPad({
          instanceModelId: instanceModelId,
          noList
        })
        this.$message(req.message)
        this.btnLoading = false
      }).catch(() => {
        this.btnLoading = false
      })
    },
    // 启用禁用
    async StatusClick(type) {
      const ids = this.targetSelectArr.map(item => {
        return item.instanceId
      })
      const req = await enable(type, ids)
      if (req.code === 200) {
        this.exampleList()
        this.$message(req.message)
        return
      }
      this.$message(req.message)
    },
    // 新增实例
    AddClick() {
      this.dialogAdd = true
      this.dialogTableitle = '新增实例'
      this.table = 'add'
      this.addList = {}
      this.value = ''
      this.type = ''
      this.addstatus = ''
    },
    selectChangeType() {
      const obj = this.typeList.find((item) => item.name === this.type)
      this.addList.type = obj.id
    },

    selectChange1() {
      const obj = this.leveloptions.find((item) => item.name === this.value)
      this.addList.level = obj.id
    },
    selectlevel() {
      const obj = this.leveloptions.find((item) => item.name === this.searchlevel)
      this.search.level = obj.id
    },
    selectChange2() {
      const obj = this.statusoptions.find((item) => item.name === this.addstatus)
      this.addList.isEnable = obj.status
    },
    // 确定新增
    async livingAddClick() {
      if (this.table === 'edit') return this.editLiving()
      this.btnLoading = true
      const req = await addInstance({
        entityNo: this.addList.entityNo,
        level: this.addList.level,
        no: this.addList.no,
        type: this.addList.type,
        computerRoom: this.addList.computerRoom,
        isEnable: this.addList.isEnable,
        poolName: this.addList.poolName,
        ip: this.addList.ip
      })
      if (req.code === 200) {
        this.exampleList()
        this.dialogAdd = false
        this.addList = {}
        this.$message(req.message)
        this.btnLoading = false
        return
      }
      this.btnLoading = false
      this.$message(req.message)
    },
    // 修改实例
    async editLiving() {
      this.btnLoading = true
      const req = await updateliving({
        entityNo: this.addList.entityNo,
        level: this.addList.level,
        no: this.addList.no,
        type: this.addList.type,
        computerRoom: this.addList.computerRoom,
        isEnable: this.addList.isEnable,
        poolName: this.addList.poolName,
        id: this.addList.instanceId,
        ip: this.addList.ip
      })
      if (req.code === 200) {
        this.exampleList()
        this.dialogAdd = false
        this.addList = {}
        this.btnLoading = false
        this.$message(req.message)
        return
      }
      this.btnLoading = false
      this.$message(req.message)
    },
    updateInstance(row) {
      this.dialogAdd = true
      this.dialogTableitle = '编辑实例'
      this.table = 'edit'
      this.addList = row
      this.value = row.levelName
      const obj = this.typeList.find((item) => item.id === row.type)
      this.type = obj.name
      if (row.isEnable === true) this.addstatus = '启用'
      else if (row.isEnable === true) this.addstatus = '禁用'
      console.log(row)
    },
    // 清空搜索数据
    ClickSearch() {
      this.search = {}
      this.searchlevel = ''
      this.search.no = ''
      this.search.entityip = ''
      this.exampleList()
    },
    // 删除实例
    async delInstance(row) {
      this.$confirm('此操作将永久删除该实例, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const req = await instanceDelete(row.instanceId)
        if (req.code === 200) {
          this.$message(req.message)
          this.exampleList()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    changeMessage() {
        this.$forceUpdate()
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
