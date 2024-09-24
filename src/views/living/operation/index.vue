<template>
  <div class="app-container">
    <div>
      <el-row :gutter="24">
        <el-col :span="6" class="text-center cent">
          <label for="" style="width:80px">实例编号：</label>
          <el-col :span="12"><el-input clearable v-model="search.no"  @input="changeMessage($event)" placeholder="实例编号" style="width:250px;" /></el-col>
        </el-col>
         <el-col :span="6" class="text-center cent">
          <label for="" style="width:80px">物理机IP：</label>
          <el-col :span="12"><el-input clearable v-model="search.entityip"  @input="changeMessage($event)" placeholder="物理机IP" style="width:250px;" /></el-col>
        </el-col>
        <el-col :span="6" class="text-center cent">
          <label for="" style="width:80px">用户手机：</label>
          <el-col :span="12"><el-input clearable v-model="search.mobile"  @input="changeMessage($event)" placeholder="用户手机号" style="width:250px;" /></el-col>
        </el-col>
        <el-col :span="6" class="text-center cent">
          <label for="" style="width:80px">实例池：</label>
          <el-col :span="12">
            <el-select
            clearable
            ref="optionRef"
            v-model="pool"
            placeholder="请选择实例池"
            style="width: 250px"
            @change="selectChange3"
          >
            <el-option v-for="item in poolList" :key="item.status" :label="item.name" :value="item.name" />
          </el-select></el-col>
        </el-col>
      </el-row >
      <el-row :gutter="24" style="margin-top:10px">
        <el-col :span="6" class="text-center cent">
          <label for="" style="width:80px">绑定状态：</label>
          <el-col :span="12">
            <el-select
              clearable
              ref="optionRef"
              v-model="isBindstatus"
              placeholder="请选择绑定状态"
              style="width: 250px"
              @change="selectChange2"
            >
              <el-option v-for="item in statusoptions1" :key="item.status" :label="item.name" :value="item.name" />
            </el-select>
          </el-col>
        </el-col>
         <el-col :span="6" class="text-center cent">
          <label for="" style="width:80px">可用状态：</label>
          <el-col :span="12">
            <el-select
            clearable
            ref="optionRef"
            v-model="addstatus"
            placeholder="请选择可用状态"
            style="width: 250px"
            @change="selectChange1"
          >
            <el-option v-for="item in statusoptions" :key="item.status" :label="item.name" :value="item.name" />
          </el-select>
          </el-col>
        </el-col>
        <el-col :span="6" class="text-center cent">
          <label for="" style="width:80px">实例等级：</label>
          <el-col :span="12">
            <el-select
              clearable
              ref="optionRef"
              v-model="searchlevel"
              placeholder="请选择"
              style="width: 250px"
              @change="selectlevel"
            >
              <el-option v-for="item in leveloptions" :key="item.id" :label="item.name" :value="item.name" />
            </el-select>
            </el-col>
        </el-col>
        <el-col :span="6" class="text-center cent">
          <label for="" style="width:80px">绑定时间：</label>
          <el-col :span="18">
            <el-date-picker v-model="search.startTime" type="datetime" placeholder="开始时间" style="width:125px;" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptions" />
            <el-date-picker v-model="search.endTime" type="datetime" placeholder="结束时间" style="width:125px;" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptions" />
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-button type="primary" :disabled="newPad" @click="RestClick">
          恢复出厂设置
        </el-button>
        <el-button type="primary" :disabled="newPad" @click="RebootClick">
          重启
        </el-button>
        <el-button type="primary" :disabled="newPad" @click="BangClick">
          绑定
        </el-button>
        <el-button type="primary" :disabled="newPad" @click="NoBangClick">
          解绑
        </el-button>
         <el-button type="primary" :disabled="newPad" :loading="PhonesLoading" @click="replacePhones">
          更换云机
        </el-button>
        <el-button type="primary" :disabled="newPad" @click="UpdataTime">
          更换到期时间
        </el-button>
        <el-button type="primary" @click="dialogaddTime = true">
          增加到期时间
        </el-button>
        <el-button type="primary" :loading="btnLoading" @click="exportClick">导出</el-button>
        <el-upload
          class="upload-demo"
          action="#"
          :show-file-list="false"
          :on-change="handleChange"
          accept=".xls,.xlsx"
          :auto-upload="false"
        >
          <el-button type="primary">
            <i class="iconfont icon-daoru" />
            导入</el-button>
        </el-upload>
        <el-button style="margin-left:10px" type="primary" @click="exampleList"> 搜索 </el-button>
        <el-button  @click="SearchNull"> 清空 </el-button>
      </el-row>
    </div>
    <el-table :data="livingList" style="width: 100%;margin-top:30px;" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center" />
      <el-table-column align="center" label="实例编号" width="220">
        <template slot-scope="scope">
          {{ scope.row.no }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="实例信息" width="220">
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
          绑定状态：{{ scope.row.isBind | capitalize }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="绑定信息">
        <template slot-scope="scope">
          绑定用户uid：{{ scope.row.account }} <br>
          绑定会员等级：{{ scope.row.levelName }} <br>
          实例名称：{{ scope.row.name }} <br>
          绑定时间：{{ scope.row.createTime }} <br>
          到期时间：{{ scope.row.expireTime }} <br>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogdetail" title="绑定实例" :close-on-click-modal="false" append-to-body width="40%">
      <el-form label-width="120px" label-position="left">
        <el-form-item label="到期时间">
          <el-date-picker v-model="addList.expireTime" type="datetime" placeholder="选择时长" style="width:150px;" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptions" />
        </el-form-item>
        <el-form-item label="绑定用户">
          <el-input clearable v-model="addList.account" placeholder="绑定用户" style="width:150px;" />
        </el-form-item>
        <el-form-item label="绑定实例">
          <template>
            共 {{ targetSelectArr.length }} 个 <br>
          </template>
        </el-form-item>
        <el-form-item>
          <template v-for="item in targetSelectArr">
            {{ item.no }}
          </template>
        </el-form-item>
      </el-form>
      <div>
        <el-input clearable v-model="keyWord" placeholder="请输入绑定用户" style="width:150px;" />
        <el-button style="margin:20px 0 0px 20px;" type="primary" @click="user">
          <i data-v-31ea41b3="" class="el-icon-search" />
        </el-button>
      </div>
      <el-button style="margin:20px 0 0px 20px;" :loading="btnLoading" type="primary" @click="BingClick">
        绑定
      </el-button>
      <el-table :data="userListS" style="width: 100%;margin-top:30px;" border>
        <el-table-column label="序号" type="index" width="60px">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户账号">
          <template slot-scope="scope">
            {{ scope.row.account }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户手机号">
          <template slot-scope="scope">
            {{ scope.row.mobile }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户名称">
          <template slot-scope="scope">
            {{ scope.row.nickName }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户ID">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="AddUser(scope.row)">添加
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <pagination v-show="total1>0" :total="total1" :page.sync="page1" :limit.sync="limit1" v-on="$listeners" @pagination="refresh" /> -->
    </el-dialog>
    <el-dialog :visible.sync="dialogTime" title="更换实例绑定到期时间" append-to-body width="40%">
      <el-form label-width="120px" label-position="left">
        <el-form-item label="选中实例">
          <template>
            共 {{ targetSelectArr.length }} 个 <br>
          </template>
        </el-form-item>
        <el-form-item label="到期时间">
          <el-date-picker v-model="timeList.expireTime" type="datetime" placeholder="选择时长" style="width:150px;" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptions" />
        </el-form-item>
        <el-button style="margin:20px 0 0px 20px;" type="" @click="dialogTime = false">
          取消
        </el-button>
        <el-button style="margin:20px 0 0px 20px;" :loading="btnLoading" type="primary" @click="UpdataClick">
          提交
        </el-button>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="dialogaddTime" title="增加实例绑定到期时间" append-to-body width="40%">
      <el-form label-width="120px" label-position="left">
        <el-form-item label="绑定实例">
          <template>
            共 {{ targetSelectArr.length }} 个 <br>
          </template>
        </el-form-item>
        <el-form-item label="增加时间">
          <el-input clearable v-model="timeList.time" style="width:200px" placeholder="请输入增加时间" type="number" />单位：分钟
        </el-form-item>
        <el-button style="margin:20px 0 0px 20px;" type="" @click="dialogTime = false">
          取消
        </el-button>
        <el-button style="margin:20px 0 0px 20px;" :loading="btnLoading" type="primary" @click="UpdataAddClick">
          提交
        </el-button>
      </el-form>
    </el-dialog>
    <pagination v-show="total>0" :total="total" :page.sync="page" :limit.sync="limit" v-on="$listeners" @pagination="refresh" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { replaceCloud, exportOperation, levelList, instanceList, userList, bind, unbind, reboot, reset, expireTime, renewTime, importFile, poolList } from '@/api/activate'

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
    }
  },
  data() {
    return {
      total: 1,
      page: 1,
      limit: 10,
      newPad: true,
      filename: '',
      livingList: [],
      search: {
        no: '',
        entityip: ''
      },
      dialogdetail: false,
      addList: {},
      modelist: [],
      targetSelectArr: [], // 表格勾选数据
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 3600 * 1000
        }
      },
      userListS: [],
      noList: [],
      keyWord: '',
      timeList: {},
      dialogTime: false,
      dialogaddTime: false,
      statusoptions: [
        { name: '启用', status: true },
        { name: '禁用', status: false }
      ],
      statusoptions1: [
        { name: '已绑定', status: true },
        { name: '未绑定', status: false }
      ],
      addstatus: '',
      isBindstatus: '',
      poolList: [],
      pool: '',
      startTime: '',
      endTime: '',
      leveloptions: [],//实例等级数组
      searchlevel: '',
      btnLoading : false,
      PhonesLoading: false
    }
  },
  created() {
    this.levelList()
    this.exampleList()
    this.getPoolList()
  },
  methods: {
    // 导出
    async exportClick () {
      this.btnLoading = true
      window.localStorage.setItem('type', 'exp')
      let no = []
      let ip = []
      if (this.search.no.length !== 0) no = this.search.no.split(/\s+/)
      if (this.search.entityip.length !== 0) ip = this.search.entityip.split(/\s+/)
      const params = {
        page: 1,
        pageSize: 5000,
        ipList: ip,
        noList: no,
        isEnable: this.search.isEnable,
        isBind: this.search.isBind,
        poolName: this.search.poolName,
        mobile: this.search.mobile
      }
      if(this.search.level !== 0) params.level = this.search.level
      const endTime = (Date.parse(new Date(this.search.endTime)))
      const startTime = (Date.parse(new Date(this.search.startTime)))
      if (!isNaN(endTime) && !isNaN(startTime)) {
        params.endTime = endTime
        params.startTime = startTime
      }
      const req = await exportOperation(params)
      const blob = new Blob([req], { type: 'application/vnd.ms-excel' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a') // 创建a标签
      link.href = url
      link.download = '实例运营'
      link.click()
      URL.revokeObjectURL(url)
      this.btnLoading = false
      this.$forceUpdate()
    },
    // 获取示例列表
    async levelList() {
      const req = await levelList()
      this.leveloptions = req.data
      this.leveloptions.unshift({
        name: '全部',
        id: 0
      })
    },
    selectlevel() {
      const obj = this.leveloptions.find((item) => item.name === this.searchlevel)
      this.search.level = obj.id
    },
    selectChange1() {
      const obj = this.statusoptions.find((item) => item.name === this.addstatus)
      this.search.isEnable = obj.status
    },
    selectChange2() {
      const obj = this.statusoptions1.find((item) => item.name === this.isBindstatus)
      this.search.isBind = obj.status
    },
    selectChange3() {
      const obj = this.poolList.find((item) => item.name === this.pool)
      this.search.poolName = obj.name
    },
    // 清空搜索数据
    SearchNull() {
      this.search = {}
      this.addstatus = ''
      this.isBindstatus = ''
      this.pool = ''
      this.searchlevel = ''
      this.search.no = ''
      this.search.entityip = ''
      this.exampleList()
    },
    // 勾选框
    handleSelectionChange(selectionArr) {
      // 遍历已选择数据id
      this.targetSelectArr = selectionArr
      // eslint-disable-next-line no-return-assign
      if (selectionArr.length === 0) return this.newPad = true
      this.newPad = false
    },
    refresh(opt = {}) {
      this.limit = opt.limit
      this.page = opt.page
      this.exampleList()
      console.log('refresh:', opt)
    },
    async getPoolList() {
      const req = await poolList({
        page: 1,
        pageSize: 100
      })
      if (req.code === 200) {
        this.poolList = req.data.records
      }
    },
    // 获取用户列表
    async user() {
      const req = await userList({
        page: 1,
        pageSize: 100,
        mobile: this.keyWord,
        account: this.keyWord
      })
      this.userListS = req.data.records
    },

    // 获取实例列表
    async exampleList() {
      // eslint-disable-next-line no-undef
      let no = []
      let ip = []
      if (this.search.no.length !== 0) no = this.search.no.split(/\s+/)
      if (this.search.entityip.length !== 0) ip = this.search.entityip.split(/\s+/)
      const params = {
        page: this.page,
        pageSize: this.limit,
        // entityNo: this.search.entityNo,
        ipList: ip,
        noList: no,
        isEnable: this.search.isEnable,
        isBind: this.search.isBind,
        poolName: this.search.poolName,
        mobile: this.search.mobile
      }
      if(this.search.level !== 0) params.level = this.search.level
      const endTime = (Date.parse(new Date(this.search.endTime)))
      const startTime = (Date.parse(new Date(this.search.startTime)))
      if (!isNaN(endTime) && !isNaN(startTime)) {
        params.endTime = endTime
        params.startTime = startTime
      }
      const req = await instanceList(params)
      this.livingList = req.data.records
      this.total = req.data.total
    },

    // 绑定
    BangClick() {
      var arr = this.targetSelectArr.filter((item) => {
        return item.isBind
      })
      if (arr.length > 0) return this.$message({ message: '请选择未绑定设备', showClose: true })
      this.dialogdetail = true
      this.noList = this.targetSelectArr.map(item => {
        return item.no
      })
    },
    // 解绑
    async NoBangClick() {
      var arr = this.targetSelectArr.filter((item) => {
        return !item.isBind
      })
      if (arr.length > 0) return this.$message({ message: '请选择解绑设备', showClose: true })
      this.$confirm('确定解绑吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'custom-cancel-button',
        type: 'warning'
      }).then(async() => {
        const userInstanceId = this.targetSelectArr.map(item => {
          return item.id
        })
        const req = await unbind(
          userInstanceId
        )
        this.$message(req.message)
      }).catch(() => {
      })
    },
    // 添加用户
    AddUser(row) {
      this.addList.account = row.account
      this.addList.id = row.id
      this.$forceUpdate()
      console.log(row)
    },
    // 确定绑定
    async BingClick() {
      const noList = this.targetSelectArr.map(item => {
        return item.no
      })
      console.log(this.targetSelectArr)
      this.btnLoading = true
      const req = await bind({
        expireTime: (Date.parse(new Date(this.addList.expireTime))),
        noList,
        userId: this.addList.id
      }).then(res => {
        if (res.code === 200) {
          this.addList = {}
          this.dialogdetail = false
          this.btnLoading = false
          this.exampleList()
          this.$message(req.message)
          return
        }
        this.btnLoading = false
        this.$message(req.message)
      }).catch(err => {
        this.btnLoading = false
      });
    },
    // 重启
    async RebootClick() {
      this.$confirm('确定重启吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'custom-cancel-button',
        type: 'warning'
      }).then(async() => {
        this.btnLoading = true
        const noList = this.targetSelectArr.map(item => {
          return item.no
        })
        const req = await reboot(
          noList
        )
        if (req.code === 200) {
          this.exampleList()
          this.$message(req.message)
          this.btnLoading = false
          return
        }
        this.$message(req.message)
        this.btnLoading = false
      }).catch(() => {
        this.btnLoading = false
      })
    },
    // 重置
    async RestClick() {
      this.$confirm('确定恢复出厂设置吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'custom-cancel-button',
        type: 'warning'
      }).then(async() => {
        this.btnLoading = true
        const noList = this.targetSelectArr.map(item => {
          return item.no
        })
        const req = await reset(
          noList
        )
        if (req.code === 200) {
          this.exampleList()
          this.$message(req.message)
          this.btnLoading = false
          return
        }
        this.$message(req.message)
        this.btnLoading = false
      }).catch(() => {
      })
    },
    UpdataTime() {
      this.dialogTime = true
    },
    // 确定更换到期时间
    async UpdataClick() {
      const noList = this.targetSelectArr.map(item => {
        return item.no
      })
      this.btnLoading = true
      const req = await expireTime({
        noList,
        expireTime: (Date.parse(new Date(this.timeList.expireTime)))
      })
      if (req.code === 200) {
        this.dialogTime = false
        this.exampleList()
        this.btnLoading = false
        this.$message(req.message)
        return
      }
      this.btnLoading = false
      this.$message(req.message)
    },
    // 增加到期时间
    async UpdataAddClick() {
      const noList = this.targetSelectArr.map(item => {
        return item.no
      })
      this.btnLoading = true
      const req = await renewTime({
        noList,
        time: Number(this.timeList.time)
      })
      if (req.code === 200) {
        this.timeList.time = ''
        this.dialogaddTime = false
        this.exampleList()
        this.$message(req.message)
        this.btnLoading = false
        return
      }
      this.btnLoading = false
      this.$message(req.message)
    },
    handleChange(file, fileList) {
      this.fileTemp = file.raw
      this.ImportClick()
    },
    // 导入
    async ImportClick() {
      if (this.fileTemp.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        this.fileTemp.type === 'application/vnd.ms-excel'
      ) {
        this.disbtn = true
        var formdata = new FormData()
        formdata.append('file', this.fileTemp)
        console.log(formdata)
        const req = await importFile(formdata)
        this.exampleList()
        console.log(req)
        this.$message('成功')
      }
    },
    changeMessage() {
        this.$forceUpdate()
    },
    // 更换云机
    replacePhones() {
      this.$confirm('确定更换云机吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'custom-cancel-button',
        type: 'warning'
      }).then(async() => {
        this.PhonesLoading = true
        const idList = this.targetSelectArr.map(item => {
          return item.id
        })
        const req = await replaceCloud(
          idList
        )
        if (req.code === 200) {
          this.PhonesLoading = false
          var arr = req.data
          var list = arr.filter((item) => item.isSuccess !== true)
          var st = list.map((obj)=>{return obj.instanceId}).join(",");
          if(list.length >= 1) {
            this.$confirm(st, '以下实例更换失败', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              cancelButtonClass: 'custom-cancel-button',
            })
            this.exampleList()
            return
          }
          this.exampleList()
          this.$message(req.message)
          return
        }
        this.$message(req.message)
        this.PhonesLoading = false
      }).catch(() => {
        this.PhonesLoading = false
      })
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
.upload-demo {
  display: inline;
  margin-left: 20px;
}

.cent {
    display: flex;
    align-items: center;
}

.el-col-6 {
  padding: 0 ;
}

.upload-demo {
  margin-left: 10px;
}
</style>
