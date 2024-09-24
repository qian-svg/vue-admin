<template>
  <div class="app-container">
    <div>
      <el-row>
        <el-col :span="6" class="text-center">
          实例池名称：<el-input clearable v-model="search.name" placeholder="实例池名称" style="width:150px;" />
        </el-col>
        <el-col :span="6" class="text-center">
          <el-button type="primary" @click="exampleList"> 搜索 </el-button>
          <el-button type="primary" @click="AddClick">新增</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="poolLists" style="width: 100%;margin-top:30px;" border>
      <el-table-column type="selection" align="center" />
      <el-table-column align="center" label="实例池名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="实例池ID">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建人">
        <template slot-scope="scope">
          {{ scope.row.createBy }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="updatePool(scope.row)">编辑
          </el-button>
          <el-button type="text"  style="color:red" @click="deletePool(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogAdd" :title="dialogTableitle" append-to-body width="40%">
      <el-form label-width="120px" label-position="left">
        <el-form-item label="实例池id">
          <el-input clearable v-model="addList.id" :disabled="updateId" placeholder="实例池id" style="width:200px;" />
        </el-form-item>
        <el-form-item label="实例池名称">
          <el-input clearable v-model="addList.name" placeholder="实例池名称" style="width:200px;" />
        </el-form-item>
      </el-form>
      <el-button style="margin:20px 0 0px 20px;" type="" @click="dialogAdd = false">
        取消
      </el-button>
      <el-button style="margin:20px 0 0px 20px;" :loading="btnLoading" type="primary" @click="poolAddClick">
        确定
      </el-button>
    </el-dialog>
    <pagination v-show="total>0" :total="total" :page.sync="page" :limit.sync="limit" v-on="$listeners" @pagination="refresh" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { poolList, poolAdd, poolUpdate, poolDelete } from '@/api/activate'

export default {
  components: { Pagination },
  filters: {
  },
  data() {
    return {
      total: 1,
      page: 1,
      limit: 10,
      poolLists: [],
      search: {},
      addList: {},
      dialogAdd: false,
      dialogTableitle: '新增实例',
      table: 'add',
      updateId: false,
      btnLoading: false
    }
  },
  created() {
    this.getPoolList()
  },
  methods: {
    refresh(opt = {}) {
      this.limit = opt.limit
      this.page = opt.page
      this.getPoolList()
    },
    async getPoolList() {
      const req = await poolList({
        page: this.page,
        pageSize: this.limit
      })
      if (req.code === 200) {
        this.poolLists = req.data.records
        this.total = req.data.total
      }
    },
    // 点击新增按钮
    AddClick() {
      this.dialogAdd = true
      this.dialogTableitle = '新增实例池'
      this.table = 'add'
      this.addList = {}
    },
    exampleList() {},
    async poolAddClick() {
      if (this.table === 'edit') return this.editpool()
      this.btnLoading = true
      const req = await poolAdd({
        id: Number(this.addList.id),
        name: this.addList.name
      })
      if (req.code === 200) {
        this.$message(req.message)
        this.dialogAdd = false
        this.addList = {}
        this.btnLoading = false
        this.getPoolList()
      }
      this.btnLoading = false
      this.$message(req.message)
    },
    // 确定修改实例池
    async editpool() {
      this.btnLoading = true
      const req = await poolUpdate({
        id: Number(this.addList.id),
        name: this.addList.name
      })
      if (req.code === 200) {
        this.$message(req.message)
        this.dialogAdd = false
        this.addList = {}
        this.btnLoading = false
        this.getPoolList()
      }
      this.btnLoading = false
      this.$message(req.message)
    },
    // 编辑实例池
    updatePool(row) {
      this.dialogAdd = true
      this.dialogTableitle = '编辑实例池'
      this.table = 'edit'
      this.addList = row
      this.updateId = true
    },
    // 删除实例池
    async deletePool(row) {
      this.$confirm('此操作将永久删除该实例池, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const req = await poolDelete(row.id)
        if (req.code === 200) {
          this.$message(req.message)
          this.getPoolList()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
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
</style>
