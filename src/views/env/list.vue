<template>
  <div class="app-container">
      <!-- Form -->
    <el-dialog title="MQ信息修改" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="mq1" label-width="120px" size="medium">
          <el-form-item label="topic名称">
            <el-input v-model="mq1.topicName" />
          </el-form-item>
          <el-form-item label="group名称">
            <el-input v-model="mq1.groupName" />
          </el-form-item>
          <el-form-item label="MQ描述">
            <el-input v-model="mq1.info" />
          </el-form-item>
          <el-form-item label="环境信息">
            <el-select v-model="mq1.envTag" clearable placeholder="环境信息">
              <el-option :value="2" label="环境二" />
              <el-option :value="3" label="其他环境" />
            </el-select>
          </el-form-item>
        </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <!--查询表单-->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="mqQuery.topicName" clearable placeholder="生产者名字" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="mqQuery.groupName" clearable placeholder="消费者名字" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="mqQuery.info" clearable placeholder="MQ描述" />
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="mqQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="mqQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <!---表格---->

    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      style="width: 100%"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
        >
      <el-table-column label="序号" width="80" align="center">
        <template slot-scope="scope">
          {{ (page-1)* limit +scope.$index +1 }}

        </template>
      </el-table-column>
      <el-table-column prop="topicName" label="生产者名字" width="180" />
      <el-table-column prop="groupName" label="消费者名字" width="180" />
      <el-table-column prop="info" label="MQ描述" width="180" />
      <el-table-column prop="envTag" label="环境" width="180">
        <template slot-scope="scope">
          {{ scope.row.envTag===2?'环境二':'其他环境' }}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column prop="updateTime" label="更新时间" width="180" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="changeDataById(scope.row.id)">修改</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />

  </div>
</template>

<script>
// 引入mq.js文件
import mq from '@/api/env/mq'
export default {
  // 写核心代码
  // data:{

  // },

  data() { // 定义变量 初始值
    return {
      list: null,
      page: 1,
      limit: 10, // 每页记录数
      total: 0,
      mqQuery: {}, // 条件封装对象
      mq1: {},
      // 新增
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'


    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(page =1) {
      this.page = page
      mq.getMqList(this.page, this.limit, this.mqQuery)
        .then(response => {
          this.list = response.data.rows
          this.total = response.data.total
        })
        .catch(error => {
          console.log(error)
        })
    },
    saveOrUpdate() {
      this.dialogFormVisible = false
      this.updateMq()     
    },
    changeDataById(id) {
       this.dialogFormVisible = true
       mq.queryMq(id)
        .then(response => {
          this.mq1 = response.data.insuranceMq
        })
    },
    // 更新
    updateMq() {
      mq.updateMq(this.mq1)
        .then(response => {
          // 提示成功
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
        // this.$router.push({ path: '/restart/list' })
        this.getList()
        })
    },

    resetData() {
      this.mqQuery = {}
      this.getList()
    },
    removeDataById(id) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        mq.deleteMqId(id)
          .then(response => {
            this.getList()
          })
          .catch(error => {
            console.log(error)
          })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    }

  }

}
</script>
