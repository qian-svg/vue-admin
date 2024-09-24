<!-- eslint-disable no-undef -->
<template>
  <div class="app-container">
    <div>
      <el-row :gutter="24">
        <el-col :span="6" class="text-center cent">
          商品类型：<el-input clearable v-model="filename" placeholder="商品类型" style="width:150px;" />
        </el-col>
        <el-col :span="6" class="text-center">
          商品名称：<el-input clearable v-model="filename" placeholder="商品名称" style="width:150px;" />
        </el-col>
        <el-col :span="12" class="text-center">
          <el-button type="primary">
            搜索
          </el-button>
          <el-button type="primary" @click="handleAdd">
            新增
          </el-button>
          <el-button type="primary" @click="handleStatus('1')">
            启用
          </el-button>
          <el-button type="primary" @click="handleStatus('2')">
            禁用
          </el-button>
          <el-button  type="primary" :disabled="Details" @click="handleDetails">
            编辑
          </el-button>
          <el-button  type="primary" @click="handleDel">
            删除
          </el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center" />
      <el-table-column align="center" label="商品信息" width="220">
        <template slot-scope="scope">
          商品名称：{{ scope.row.name }}<br>
          商品类型：{{ scope.row.level }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品价格" width="220">
        <template slot-scope="scope">
          商品原价：{{ scope.row.price }}<br>
          商品展示价：{{ scope.row.activityPrice }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="商品参数">
        <template slot-scope="scope">
          实例系统：{{ scope.row.instanceLevel }}<br>
          在线时长：{{ scope.row.useDay }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="商品详情">
        <template slot-scope="scope">
          商品描述：{{ scope.row.remark }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="启用状态">
        <template slot-scope="scope">
          {{ scope.row.isEnable | isEnable }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="备注">
        <template slot-scope="scope">
          {{ scope.row.remark }}
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增套餐弹窗 -->
    <el-dialog :visible.sync="dialogVisible" :title="dialogTableitle" append-to-body>
      <el-form label-width="120px" label-position="left">
        <el-form-item label="商品名称">
          <el-input clearable v-model="addList.name" placeholder="商品名称" style="width:150px;" />
        </el-form-item>
        <el-form-item label="商品类型">
          <el-select
            clearable
            ref="optionRef"
            v-model="value"
            placeholder="请选择"
            style="width: 250px"
            @change="selectChange"
          >
            <el-option v-for="item in leveloptions" :key="item.id" :label="item.name" :value="item.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="实例级别">
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
        <el-form-item label="商品展示价格">
          <el-input clearable v-model="addList.activityPrice" placeholder="商品展示价格" style="width:150px;" />/元
        </el-form-item>
        <el-form-item label="商品原价格">
          <el-input clearable v-model="addList.price" placeholder="商品原价格" style="width:150px;" />/元
        </el-form-item>
        <el-form-item label="在线时长">
          <el-input clearable v-model="addList.useDay" placeholder="在线时长" style="width:150px;" />/天
        </el-form-item>
        <el-form-item prop="image" label="上传图片">
          <el-upload
            class="avatar-uploader"
            :action="qiniuURL"
            :show-file-list="false"
            :http-request="imgUploadLicense"
            accept=".png,.jpg,.gif"
          >
              <img v-if="addList.url" :src="addList.url" style="max-height:200px"/>
              <i v-else class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input clearable v-model="addList.remark" placeholder="商品描述" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" />
        </el-form-item>
        <el-button style="margin:20px 0 0px 20px;" :loading="btnLoading" type="primary" @click="AddGoods">
          确认
        </el-button>
        <el-button style="margin:20px 0 0px 20px;" @click="dialogVisible = false">
          取消
        </el-button>
      </el-form>
    </el-dialog>
    <pagination v-show="total>0" :total="total" :page.sync="page" :limit.sync="limit" v-on="$listeners" @pagination="refresh" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { goodsList, addGoods, levelList, deletList, enableList, updateList, upload } from '@/api/activate'

export default {
  components: { Pagination },
  filters: {
    isEnable(value) {
      if (value === true) return '启用'
      // eslint-disable-next-line no-return-assign
      return value = '禁用'
    }
  },
  data() {
    return {
      total: 1,
      page: 1,
      limit: 10,
      filename: '',
      rolesList: [],
      dialogVisible: false,
      addList: {},
      targetSelectArr: [], // 表格勾选数据
      leveloptions: [],
      value: '',
      instanceLevel: '',
      Details: true,
      dialogTableitle: '新增套餐',
      table: 'add',
      qiniuURL:'',
      btnLoading: false
    }
  },
  created() {
    this.levelList()
    this.creadGoods()
  },
  methods: {
    handleSelectionChange(selectionArr) {
      // 遍历已选择数据id
      this.targetSelectArr = selectionArr
      // eslint-disable-next-line no-return-assign
      if (selectionArr.length === 1) return this.Details = false
      this.Details = true
    },
    refresh(opt = {}) {
      this.limit = opt.limit
      this.page = opt.page
      this.creadGoods()
      console.log('refresh:', opt)
    },
    async creadGoods() {
      const req = await goodsList({
        page: this.page,
        pageSize: this.limit,
        level: this.level
      })
      const data = req.data.records
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < this.leveloptions.length; j++) {
          if (data[i].level === this.leveloptions[j].id) {
            data[i].level = this.leveloptions[j].name
          }
          if (data[i].instanceLevel === this.leveloptions[j].id) {
            data[i].instanceLevel = this.leveloptions[j].name
          }
        }
      }
      this.rolesList = data
      this.total = req.data.total
      this.$forceUpdate()
      console.log(req)
    },
    async levelList() {
      const req = await levelList()
      this.leveloptions = req.data
    },
    handleDownload() {},
    selectChange() {
      const obj = this.leveloptions.find((item) => item.name === this.value)
      this.addList.level = obj.id
    },
    selectChange1() {
      const obj = this.leveloptions.find((item) => item.name === this.instanceLevel)
      this.addList.instanceLevel = obj.id
    },
    // 新增套餐
    async AddGoods() {
      if (this.table === 'edit') return this.editGoods()
      this.btnLoading = true
      const req = await addGoods({
        activityPrice: this.addList.activityPrice,
        level: this.addList.level,
        name: this.addList.name,
        price: this.addList.price,
        remark: this.addList.remark,
        useDay: this.addList.useDay,
        instanceLevel: this.addList.instanceLevel,
        url: this.addList.url,
      })
      this.btnLoading = false
      this.$message(req.message)
      this.dialogVisible = false
      this.creadGoods()
    },

    // 编辑套餐
    async editGoods() {
      this.btnLoading = true
      const obj1 = this.leveloptions.find((item) => item.name === this.instanceLevel)
      const obj = this.leveloptions.find((item) => item.name === this.value)
      const req = await updateList({
        activityPrice: this.addList.activityPrice,
        level: obj.id,
        name: this.addList.name,
        price: this.addList.price,
        remark: this.addList.remark,
        useDay: this.addList.useDay,
        instanceLevel: obj1.id,
        id: this.targetSelectArr[0].id,
        url: this.addList.url,
      })
      this.$message(req.message)
      this.dialogVisible = false
      this.btnLoading = false
      this.creadGoods()
      console.log('11111')
    },
    // 点击新增
    async handleAdd() {
      console.log(this.leveloptions)
      this.dialogVisible = true
      this.dialogTableitle = '新增套餐'
      this.table = 'add'
      this.addList = {}
      this.value = ''
      this.instanceLevel = ''
    },
    // 删除
    async handleDel() {
      console.log(this.targetSelectArr)
      const ids = this.targetSelectArr.map(item => {
        return item.id
      })
      const req = await deletList(ids)
      this.$message(req.message)
      this.creadGoods()
    },
    // 点击编辑
    handleDetails() {
      if (this.targetSelectArr.length > 1) return this.$message({ message: '编辑只能勾选一条数据哦', showClose: true })
      this.addList = this.targetSelectArr[0]
      this.value = this.targetSelectArr[0].level
      console.log(this.targetSelectArr)
      this.instanceLevel = this.targetSelectArr[0].instanceLevel
      this.dialogTableitle = '编辑套餐'
      this.table = 'edit'
      this.dialogVisible = true
      console.log(this.targetSelectArr)
    },
    async handleStatus(type) {
      const ids = this.targetSelectArr.map(item => {
        return item.id
      })
      let isstatus = true
      if (type === '1') isstatus = true
      else isstatus = false
      const req = await enableList(isstatus,
        ids
      )
      this.$message(req.message)
      this.creadGoods()
    },
    async imgUploadLicense(e) {
      //e 图片文件
      if (e.file.size > 2000000 || e.file.type.indexOf("image/") == -1) {
        this.$message("请上传小于2Mb的图片");
      } else {
        let FormDatas = new FormData();
        FormDatas.append("file", e.file);
        const res =await upload(FormDatas)
        this.addList.url = res.data
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
.cent {
    display: flex;
    align-items: center;
}

.el-col-6 {
  padding: 0 ;
}
</style>