<template>
  <div class="app-container">
      <!-- Form -->
    <el-dialog title="配置文件修改"  width="45%" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="conf1" label-width="150px" size="medium">
          <el-form-item label="mqTag">
            <el-input v-model="conf1.mqTag" />
          </el-form-item>
          <el-form-item label="hulk">
            <el-input v-model="conf1.hulk" />
          </el-form-item>
          <el-form-item label="plan">
            <el-input v-model="conf1.plan" />
          </el-form-item>
           <el-form-item label="activity">
            <el-input v-model="conf1.activity" />
           </el-form-item>
           <el-form-item label="accidentInsurance">
            <el-input v-model="conf1.accidentInsurance" />
          </el-form-item>
           <el-form-item label="accidentCenter">
            <el-input v-model="conf1.accidentCenter" />
          </el-form-item>
           <el-form-item label="hawkeye">
            <el-input v-model="conf1.hawkeye" />
          </el-form-item>
           <el-form-item label="quicksilver">
            <el-input v-model="conf1.quicksilver" />
          </el-form-item>
           <el-form-item label="orderCollector">
            <el-input v-model="conf1.orderCollector" />
          </el-form-item>
           <el-form-item label="orderCenter">
            <el-input v-model="conf1.orderCenter" />
          </el-form-item>
           <el-form-item label="orderCenterTimer">
            <el-input v-model="conf1.orderCenterTimer" />
          </el-form-item>
           <el-form-item label="policyCenter">
            <el-input v-model="conf1.policyCenter" />
          </el-form-item>
           <el-form-item label="policyCore">
            <el-input v-model="conf1.policyCore" />
          </el-form-item>
           <el-form-item label="policyTimer">
            <el-input v-model="conf1.policyTimer" />
          </el-form-item>
           <el-form-item label="insuranceCenter">
            <el-input v-model="conf1.insuranceCenter" />
          </el-form-item>
           <el-form-item label="instalment">
            <el-input v-model="conf1.instalment" />
          </el-form-item>
           <el-form-item label="accidentClaim">
            <el-input v-model="conf1.accidentClaim" />
          </el-form-item>
           <el-form-item label="manhattanSeven">
            <el-input v-model="conf1.manhattanSeven" />
          </el-form-item>
           <el-form-item label="mailman">
            <el-input v-model="conf1.mailman" />
          </el-form-item>
           <el-form-item label="groot">
            <el-input v-model="conf1.groot" />
          </el-form-item>
           <el-form-item label="wolverine">
            <el-input v-model="conf1.wolverine" />
          </el-form-item>
           <el-form-item label="winnie">
            <el-input v-model="conf1.winnie" />
          </el-form-item>
           <el-form-item label="redenvelope">
            <el-input v-model="conf1.redenvelope" />
          </el-form-item>
           <el-form-item label="productCenter">
            <el-input v-model="conf1.productCenter" />
          </el-form-item>
           <el-form-item label="deductCenter">
            <el-input v-model="conf1.deductCenter" />
          </el-form-item>
           <el-form-item label="policyRenew">
            <el-input v-model="conf1.policyRenew" />
          </el-form-item>
           <el-form-item label="mixProy">
            <el-input v-model="conf1.mixProy" />
          </el-form-item>
           <el-form-item label="ultron">
            <el-input v-model="conf1.ultron" />
          </el-form-item>
           <el-form-item label="packCenter">
            <el-input v-model="conf1.packCenter" />
          </el-form-item>
           <el-form-item label="member">
            <el-input v-model="conf1.member" />
          </el-form-item>
           <el-form-item label="wechatGateway">
            <el-input v-model="conf1.wechatGateway" />
          </el-form-item>
           <el-form-item label="oppenProduct">
            <el-input v-model="conf1.oppenProduct" />
          </el-form-item>
           <el-form-item label="oppenVision">
            <el-input v-model="conf1.oppenVision" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
        </div>
    </el-dialog>

    <!--查询表单-->

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
      <el-table-column prop="envTag" label="环境" width="110" align="center">
        <template slot-scope="scope">
          {{ envJson[scope.row.envTag]}}
        </template>
      </el-table-column>
      <el-table-column prop="mqTag" label="MQ标识" width="180" align="center" />
      <el-table-column prop="hulk" label="hulk" width="150" align="center"/>
      <el-table-column prop="plan" label="plan" width="150" align="center"/>
      <el-table-column prop="activity" label="activity" width="150" align="center"/>
      <el-table-column prop="accidentInsurance" label="accidentInsurance" width="150" align="center"/>
      <el-table-column prop="accidentCenter" label="accidentCenter" width="150" align="center" />
      <el-table-column prop="hawkeye" label="hawkeye" width="150" align="center" />
      <el-table-column prop="quicksilver" label="quicksilver" width="150" align="center" />
      <el-table-column prop="orderCollector" label="orderCollector" width="150" align="center" />
      <el-table-column prop="orderCenter" label="orderCenter" width="150" align="center" />
      <el-table-column prop="orderCenterTimer" label="orderCenterTimer" width="150" align="center" />
      <el-table-column prop="policyCenter" label="policyCenter" width="150" align="center" />
      <el-table-column prop="policyCore" label="policyCore" width="150" align="center" />
      <el-table-column prop="policyTimer" label="policyTimer" width="150" align="center" />
      <el-table-column prop="insuranceCenter" label="insuranceCenter" width="150" align="center" />     
      <el-table-column prop="instalment" label="instalment" width="150" align="center" />
      <el-table-column prop="accidentClaim" label="accidentClaim" width="150" align="center" />
      <el-table-column prop="manhattanSeven" label="manhattanSeven" width="150" align="center" />
      <el-table-column prop="mailman" label="mailman" width="150" align="center" />
      <el-table-column prop="groot" label="groot" width="150" align="center" />
      <el-table-column prop="wolverine" label="wolverine" width="150" align="center" />
      <el-table-column prop="redenvelope" label="redenvelope" width="150" align="center" />
      <el-table-column prop="productCenter" label="productCenter" width="150" align="center" />
      <el-table-column prop="deductCenter" label="deductCenter" width="150" align="center" />
      <el-table-column prop="policyRenew" label="policyRenew" width="150" align="center" />
      <el-table-column prop="mixProy" label="mixProy" width="150" align="center" />
      <el-table-column prop="ultron" label="ultron" width="150" align="center" />
      <el-table-column prop="packCenter" label="packCenter" width="150" align="center" /> 
      <el-table-column prop="member" label="member" width="150" align="center" />
      <el-table-column prop="wechatGateway" label="wechatGateway" width="150" align="center" />
      <el-table-column prop="oppenProduct" label="oppenProduct" width="150" align="center" />
      <el-table-column prop="oppenVision" label="oppenVision" width="150" align="center" />     
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
            <el-button type="primary" size="mini"  @click="changeDataById(scope.row.id)">更改配置</el-button>
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
// 引入synchronization.js文件
import synchronization from '@/api/env/synchronization'
export default {
  // 写核心代码
  // data:{
  // },

  data() { // 定义变量 初始值
    return {
      envJson:{
          '1':'AllInOne 环境',
          '2':'环境二',
          '3':'环境三',
          '4':'环境四',
      },
      list: null,
      page: 1,
      limit: 10, // 每页记录数
      total: 0,
      confQuery: {}, // 条件封装对象
      conf1: {},
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
      synchronization.getRuleList(this.page, this.limit)
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
      this.updateRule()     
    },
    changeDataById(id) {
       this.dialogFormVisible = true
       synchronization.queryRule(id)
        .then(response => {
          this.conf1 = response.data.ruleInfo
        })
    },
    // 更新
    updateRule() {
      synchronization.updateRule(this.conf1)
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
    }

  }

}
</script>

