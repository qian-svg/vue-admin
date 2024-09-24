<!-- eslint-disable no-undef -->
<template>
  <div class="app-container">
    <el-button type="primary" @click="AddClick">新增</el-button>
    <!-- <el-button type="primary" @click="DelClick">删除</el-button> -->
    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center" />
      <el-table-column align="header-center" label="平台">
        <template slot-scope="scope">
         {{ scope.row.platform | platform }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="公告类型">
        <template slot-scope="scope">
          {{ scope.row.type | typeList }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="标题">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="内容" >
        <template slot-scope="scope">
            <div class="body padding-l scroll " v-html="scope.row.remark"></div>
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="操作" >
        <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="DelClick(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogdetail" title="新增公告" append-to-body width="40%">
      <el-form label-width="120px" label-position="left">
        <el-form-item label="标题">
            <el-input clearable v-model="addList.name" placeholder="请输入标题" style="width:150px;" />
        </el-form-item>
        <el-form-item label="公告类型">
          <el-select
            clearable
            ref="optionRef"
            v-model="value"
            placeholder="请选择"
            style="width: 250px"
            @change="selectChange"
          >
            <el-option v-for="item in statusoptions" :key="item.id" :label="item.name" :value="item.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="平台">
          <el-select
            clearable
            ref="optionRef"
            v-model="value1"
            placeholder="请选择"
            style="width: 250px"
            @change="selectChange1"
          >
            <el-option v-for="item in statusPlatform" :key="item.id" :label="item.name" :value="item.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="内容">
            <el-upload class="imgUpload" :headers="headers" accept="image/jpg,image/jpeg,image/png" :action="uploadUrl" name="file" :show-file-list="false"  :on-success="handleSuccess" multiple/>
            <quill-editor ref="quillEditor" v-model="content" class="editor" :options="editorOption" @change="onEditorChange($event)" />
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
        <el-form-item label="描述">
          <el-input clearable v-model="addList.describe" style="width:200px" placeholder="请输入描述" type="text" />
        </el-form-item>
      </el-form>
      <el-row style="float: right;">
        <el-button style="margin:20px 0 0px 20px;" type="primary" :loading="btnLoading" @click="ClickNewPad">确定</el-button>
      </el-row>
    </el-dialog>
    <pagination v-show="total>0" :total="total" :page.sync="page" :limit.sync="limit" v-on="$listeners" @pagination="refresh" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { noticeList, addnotice, delnotice } from '@/api/notice'
import { upload } from '@/api/activate'
import {getUser} from '@/api/tools';

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
  [{ 'header': 1 }, { 'header': 2 }], // 几级标题
  [{ 'list': 'ordered' }, { 'list': 'bullet' }], // 有序列表，无序列表
  [{ 'indent': '-1' }, { 'indent': '+1' }], // 缩进
  [{ 'direction': 'rtl' }], // 文字输入方向
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ 'color': [] }, { 'background': [] }], // 颜色选择
  [{ 'align': [] }], // 居中
  ['clean'], // 清除样式,
  ['image','link'], // 上传图片、上传视频
]

export default {
  components: { Pagination },
  filters: {
    typeList(value) {
      if (value == 1) return '系统公告 '
      else if (value == 2) return '活动 '
      else if (value == 3) return '更新 '
      else if (value == 4) return '资讯 '
      else if (value == 5) return '攻略 '
      else if (value == 6) return '教程 '
      // eslint-disable-next-line no-return-assign
      return value
    },
    platform(value) {
      if (value == 1) return 'PC'
      if (value == 2) return '安卓'
      if (value == 3) return 'H5'
      if (value == 4) return '官网'
      // eslint-disable-next-line no-return-assign
      return value = '全部'
    }
  },
  data() {
    return {
      total: 1,
      page: 1,
      limit: 10,
      rolesList: [],
      targetSelectArr: [],
      dialogdetail: false,
      addList: {},
      statusoptions: [
        { name: '公告', id: '1' },
        { name: '活动', id: '2' },
        { name: '更新', id: '3' },
        { name: '资讯', id: '4' },
        { name: '攻略', id: '5' },
        { name: '教程', id: '6' }

      ],
      statusPlatform: [
        { name: '全部平台', id: '0' },
        { name: 'PC', id: '1' },
        { name: '安卓', id: '2' },
        { name: 'H5', id: '3' },
        { name: '官网', id: '4' }
      ],
      value:'',
      value1:'',
      content: "",
      editorOption: {
        theme: 'snow',
        modules: {
          // toolbar: toolbarOptions,
          toolbar: {
            container: toolbarOptions,
            // 自定义处理插入图片 转为elementui的upload组件点击上传事件
            handlers: {
              'image': function(val) {
                if (val) {
                  document.querySelector('.imgUpload input').click();
                } else {
                  this.quill.format('image', false);
                }
              },
            },
          },
        },
      },
      // uploadUrl:'http://192.168.1.6:8081/admin/api/file/upload',
      uploadUrl:'https://ysyos.com/admin/api/file/upload',
      btnLoading: false,
      qiniuURL:'',
    }
  },
  created() {
   this.Getnotice()
  },
  computed: {
    headers() {
      return {
        // 请求头 token
        Authorization: `Bearer ${getUser().token}`
      };
    },
  },
  methods: {
    handleSelectionChange(selectionArr) {
      this.targetSelectArr = selectionArr
      // eslint-disable-next-line no-return-assign
    },
    refresh(opt = {}) {
      this.limit = opt.limit
      this.page = opt.page
      this.Getnotice()
      console.log('refresh:', opt)
    },
   async Getnotice() {
    const req = await noticeList({
        page: this.page,
        pageSize: this.limit
    })
    this.rolesList = req.data.records
    this.total = req.data.total
    console.log(req)
   },
   selectChange() {
    const obj = this.statusoptions.find((item) => item.name === this.value)
    this.addList.type = obj.id
   },
   selectChange1() {
    const obj = this.statusPlatform.find((item) => item.name === this.value1)
    this.addList.platform = obj.id
   },
   //新增按钮
   AddClick() {
    this.addList ={}
    this.value =''
    this.content = ''
    this.dialogdetail = true
   },
   // 新增
   async ClickNewPad() {
      // this.btnLoading = true
      const req = await addnotice({
        remark : this.content,
        title: this.addList.name,
        type: this.addList.type,
        platform: this.addList.platform,
        url: this.addList.url,
        d: this.addList.describe
      })
      if (req.code === 200) {
        this.$message(req.message)
        this.dialogdetail = false
        this.Getnotice()
        this.addList ={}
        this.value =''
        this.value1 =''
        this.content = ''
        this.btnLoading = false
        return
      }
      this.$message(req.message)
      this.btnLoading = false
   },
   onEditorChange({ quill, html, text }) {
      this.content = html;
   },
    handleSuccess(res) {
      // 获取富文本组件实例
      const quill = this.$refs.quillEditor.quill
      if (res.code === 200) {
        // 如果上传成功
        // 获取光标所在位置
        const length = quill.getSelection().index
        // 插入图片，res为服务器返回的图片链接地址
        quill.insertEmbed(length, 'image', res.data)
        // 调整光标到最后
        quill.setSelection(length + 1)
      } else {
        // 提示信息
        this.$message.error('图片插入失败')
      }
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
        this.$forceUpdate()
      }
    },
    // 删除
    async DelClick(row) {
      this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        this.btnLoading = true
        const req = await delnotice(row.id)
        if (req.code === 200) {
          this.$message(req.message)
          this.btnLoading = false
          this.Getnotice()
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
<style scoped>
 
    .body >>> img {
        max-width: 100% ;
    }
    .body {
      max-width: 200px; /* 设置最大宽度，根据需要调整 */
      max-height: 200px;
      overflow: auto; 
    }
    /* 为所有具有滚动条的元素自定义滚动条样式 */
    ::-webkit-scrollbar {
        width: 1px; /* 设置滚动条的宽度 */
        height: 1px; /* 设置滚动条的宽度 */
    }
 
    /* 设置滚动条的轨道（背景）样式 */
    ::-webkit-scrollbar-track {
        background: #f1f1f1; /* 设置轨道的背景颜色 */
    }

    /* 设置滚动条的滑块（滚动条）样式 */
    ::-webkit-scrollbar-thumb {
        background: #606266; /* 设置滑块的背景颜色 */
    }

    /* 设置滚动条滑块的hover样式 */
    ::-webkit-scrollbar-thumb:hover {
        background: #606266; /* 设置滑块的hover背景颜色 */
    }
</style>