<template>
  <div class="app-container">
      <!-- Form -->
    <el-dialog title="配置文件修改"  width="80%" :visible.sync="dialogFormVisible">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">所有环境全部同步</el-checkbox>
        <div style="margin: 10px 15px;"></div>
        <el-checkbox-group v-model="envList" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
         <el-divider></el-divider>
        <el-form ref="form" :model="conf1" label-width="1500px" size="medium">
            <el-input type="textarea" autosize v-model="conf1.contents"/>
        </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>
    <!---展示历史配置文件--->
   <el-dialog title="历史配置文件"  width="80%" :visible.sync="dialogFormVisibleView">
        <el-form ref="form" :model="historyconf" label-width="1500px" size="medium">
            <el-input type="textarea" autosize v-model="historyconf"/>
        </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisibleView = false">关闭</el-button>
      </div>
    </el-dialog>


   <el-dialog title="配置文件历史版本"  width="80%" :visible.sync="dialogFormVisible1">
        
        <el-table
          v-loading="listLoading"
          :data="queryHistoryConfList"
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
          <el-table-column align="center" prop="modularName" label="模块名称" width="250" />
          <el-table-column align="center" prop="applicationName" label="配置名称" width="210" /> 
          <el-table-column align="center" prop="createTime" label="创建时间" width="160" />
          <el-table-column align="center" prop="updateTime" label="更新时间" width="160" />
          <el-table-column label="操作" width="270" align="center">
            <template slot-scope="scope">
                <el-button type="primary" size="mini" icon="el-icon-view" @click="viewData(scope.row.contents)">查看</el-button>
                <el-button type="warning" size="mini" icon="el-icon-refresh-left" @click="rollBackDataById(scope.row.id)">回滚到此版本</el-button>
            </template>
          </el-table-column>

        </el-table>
    </el-dialog>

    <!--查询表单-->
  <el-row :gutter="20">
        <el-col :span="4">
            <div class="grid-content bg-purple" align="center">
                <el-button type="success" icon="el-icon-refresh-right" @click="pullConfList()">更新配置</el-button>
            </div>
        </el-col>
        <el-col :span="16">
        <div class="grid-content bg-purple">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" align="center">
            <el-form-item>
                <el-input v-model="confQuery.modularName" clearable placeholder="模块名" />
            </el-form-item>
            <el-form-item>
                <el-input v-model="confQuery.applicationName" clearable placeholder="配置名" />
            </el-form-item>
            <el-form-item label="">
                    <el-select v-model="confQuery.envTag" clearable placeholder="环境信息">
                    <el-option :value="1" label="AllInOne 环境" />
                    <el-option :value="2" label="环境二" />
                    <el-option :value="3" label="环境三" />
                    <el-option :value="4" label="环境四" />
                    </el-select>
                </el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
            <el-button type="default" @click="resetData()">清空</el-button>
            </el-form>
        </div>
        </el-col>
  </el-row>
    <!---表格---->

    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      style="width: 100%"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>
      <el-table-column label="序号" width="80" align="center">
        <template slot-scope="scope">
          {{ (page-1)* limit +scope.$index +1 }}

        </template>
      </el-table-column>
      <el-table-column prop="modularName" label="模块名" width="250" align="center" />
      <el-table-column prop="applicationName" label="配置名" width="180" align="center"/>
      <el-table-column prop="envTag" label="环境" width="110" align="center">
        <template slot-scope="scope">
          {{ envJson[scope.row.envTag]}}
        </template>
      </el-table-column>
      <el-table-column prop="user" label="操作人" width="80" align="center"/>
      <el-table-column prop="createTime" label="创建时间" width="160" align="center"/>
      <el-table-column prop="updateTime" label="更新时间" width="160" align="center"/>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
            <el-button type="primary" size="mini"  @click="changeDataById(scope.row.id)">同步配置</el-button>
             <el-button type="warning" size="mini"  @click="showHistoryById(scope.row.id)">历史版本</el-button>
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
const cityOptions = ['copy_env1', 'env2', 'env3', 'env4'];
// 引入synchronization.js文件
import synchronization from '@/api/env/synchronization'
export default {
  // 写核心代码
  // data:{
  // },

  data() { // 定义变量 初始值
    return {
        checkAll: false,
        envList: [],
        cities: cityOptions,
        isIndeterminate: true,

      envJson:{
          '1':'AllInOne 环境',
          '2':'环境二',
          '3':'环境三',
          '4':'环境四',
      },
      list: null,
      historyconf: null,
      page: 1,
      limit: 10, // 每页记录数
      total: 0,
      confQuery: {}, // 条件封装对象
      conf1: {},
      queryHistoryConfList: null,
      updateConfParams: {
          modularName: '',
          applicationName: '',
          envTag: '',
          user: '',
          contents: '',
          version: '',
          envList: [],
      },
      // 新增
        dialogFormVisible: false,
        dialogFormVisible1: false,
        dialogFormVisibleView: false,

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
    handleCheckAllChange(val) {
        this.envList = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    getList(page =1) {
      this.page = page
      synchronization.getConfList(this.page, this.limit, this.confQuery)
        .then(response => {
          this.list = response.data.rows
          this.total = response.data.total
        })
        .catch(error => {
          console.log(error)
        })
    },
    pullConfList(){
       synchronization.pullConf( )
        .then(response => {
          // 提示成功
          this.$message({
            type: 'success',
            message: '同步成功!'
          })
        })
         .catch(error => {
          console.log(error)
        })
    },
    saveOrUpdate() {
      this.dialogFormVisible = false
      this.updateConf()     
    },
    changeDataById(id) {
       this.dialogFormVisible = true
       synchronization.queryConf(id)
        .then(response => {
          this.conf1 = response.data.envSynchronization
        })
    },
    //历史展示页面
    saveOrUpdateHistory() {
      this.dialogFormVisible1 = false
      this.updateConf()     
    },
    showHistoryById(id) {
      this.dialogFormVisible1 = true
      synchronization.queryHistoryConf(id)
      .then(response => {
        this.queryHistoryConfList = response.data.envSynchronization
      })
      },   
   viewData(contents){
        this.dialogFormVisibleView = true
        console.log(contents)
        this.historyconf = contents
   },

    // 更新
    updateConf() {
      this.updateConfParams.modularName=this.conf1.modularName
      this.updateConfParams.applicationName=this.conf1.applicationName
      this.updateConfParams.envTag=this.conf1.envTag
      this.updateConfParams.user=this.conf1.user
      this.updateConfParams.contents=this.conf1.contents
      this.updateConfParams.version=this.conf1.version
      this.updateConfParams.envList=this.envList
      synchronization.updateConf(this.updateConfParams)
        .then(response => {
          // 提示成功
          this.$message({
            type: 'success',
            message: '同步成功!'
          })
       // this.$router.push({ path: '/restart/list' })
        this.getList()
        })
    },

    resetData() {
      this.confQuery = {}
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
    },
    rollBackDataById(id) {
      console.log(id)
      this.$confirm('此操作会将配置回滚, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        synchronization.rollBackById(id)
          .then(response => {
            this.getList()
          })
          .catch(error => {
            console.log(error)
          })
        this.$message({
          type: 'success',
          message: '回滚成功!'
        })
      })

  }

}
}
</script>