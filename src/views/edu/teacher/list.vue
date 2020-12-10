<template>
  <div class="app-container">

    <!--查询表单-->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teacherQuery.name" placeholder="讲师名" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="teacherQuery.level" clearable placeholder="讲师头衔">
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="teacherQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="teacherQuery.end"
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
      <el-table-column label="序号" width="180" align="center">
        <template slot-scope="scope">
          {{ (page-1)* limit +scope.$index +1 }}

        </template>
      </el-table-column>
      <el-table-column prop="name" label="讲师姓名" width="180" />
      <el-table-column prop="intro" label="讲师简介" width="180" />
      <el-table-column prop="career" label="讲师资历" width="180" />
      <el-table-column prop="level" label="头衔" width="180">
        <template slot-scope="scope">
          {{ scope.row.level===1?'高级讲师':'首席讲师' }}
        </template>
      </el-table-column>
      <el-table-column prop="avatar" label="讲师头像" width="180" />
      <el-table-column prop="sort" label="排序" width="180" />
      <el-table-column prop="gmtCreate" label="创建时间" width="180" />
      <el-table-column prop="gmtModified" label="更新时间" width="180" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/'+scope.row.id">
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
// 引入teacher.js文件
import teacher from '@/api/edu/teacher'
export default {
  // 写核心代码
  // data:{

  // },

  data() { // 定义变量 初始值
    return {
      list: null,
      page: 1,
      limit: 5, // 每页记录数
      total: 0,
      teacherQuery: {} // 条件封装对象

    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(page = 1) {
      this.page = page
      teacher.getTeacherList(this.page, this.limit, this.teacherQuery)
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
      this.teacherQuery = {}
      this.getList()
    },
    removeDataById(id) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        teacher.deleteTeacherId(id)
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
