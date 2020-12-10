<template>
  <div class="app-container">

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
      <!-- <el-form-item>
        <el-select v-model="mqQuery.level" clearable placeholder="环境">
          <el-option :value="2" label="环境二"/>
          <el-option :value="3" label="环境三"/>
        </el-select>
      </el-form-item> -->

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
          <router-link :to="'/env/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>

          </router-link>
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
      mqQuery: {} // 条件封装对象
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(page = 1) {
      this.page = page
      mq.getMqList(this.page, this.limit, this.mqQuery)
        .then(response => {
          this.list = response.data.rows
          this.total = response.data.total
          console.log('-----9999----' + this.list)
          console.log('--------' + this.total)
        })
        .catch(error => {
          console.log(error)
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
