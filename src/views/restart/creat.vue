<template>
    
    <div class="content-wrapper">

    <el-dialog title="宕机重启" :visible.sync="dialogFormVisible">
    <el-table
                v-loading="listLoading"
                :data="serlist"
                stripe
                style="width: 100%"
                element-loading-text="数据加载中"
                border
                fit
                highlight-current-row
                align="center"
                  > 
      <el-table-column label="序号" width="100" align="center">
              <template slot-scope="scope">
                {{ scope.$index +1 }}
              </template>
            </el-table-column>
      <el-table-column prop="serviceName" label="服务名" width="400"  align="center"/>   
    </el-table>     
       <div slot="footer" class="dialog-footer">
          <el-button type="warning" @click="closeOrUpdate()">全部关闭</el-button>
          <el-button type="primary" @click="openOrUpdate()">全部开启</el-button>
       </div>

    </el-dialog>
       <el-row :gutter="19">
        <el-col :span="12">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span style="text-align: center;display:block;">添加需要自动重启的机器服务</span>
                </div>
                <!-- <br> -->
                <!-- <br> -->
                <div class="grid-content bg-purple">
                    
                <el-form ref="form" :model="env" label-width="120px" size="medium">
                    <el-form-item label="添加机器配置">
                       <el-switch v-model="machineTag" />
                    </el-form-item>
                    <el-form-item v-if="machineTag" label="机器IP">
                      <el-input v-model="env.ip"  @blur.prevent="doGetEnvData(env.ip)" />
                    </el-form-item>
                    <el-form-item v-if="machineTag" label="机器密码">
                      <el-input v-model="env.ipPassword" />
                    </el-form-item>
                    <el-form-item v-if="machineTag" label="服务所在路径">
                      <el-input v-model="env.servicePath" />
                    </el-form-item>
                    <!-- <span style="text-align: center;display:block;" v-if="machineTag" >
                      <el-button type="primary"  @click="saveMachine()">保存</el-button>
                    </span> -->
                    <el-form-item label="添加服务配置">
                       <el-switch v-model="serviceTag" />
                    </el-form-item>
                    <!-- <el-form-item v-if="serviceTag" label="机器IP">
                      <el-input  v-model="ip"/>
                    </el-form-item>  -->
                    <el-form-item v-if="serviceTag" label="服务名">
                      <el-input v-model="env.serviceList" />
                    </el-form-item>                    
                    </el-form>
                    <span style="text-align: center;display:block;" v-if="true" >
                      <el-button type="primary"  @click="saveEnv()">保存</el-button>
                    </span>
                </div>
            </el-card>
            </el-col>
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
                    <span style="text-align: center;display:block;">开启/关闭 自动重启</span>
            </div>
            <div class="grid-content bg-purple-light" >
                 <el-table
                    v-loading="listLoading"
                    :data="list"
                    stripe
                    style="width: 100%"
                    element-loading-text="数据加载中"
                    :cell-style="cellStyle" 
                    border
                    fit
                    highlight-current-row
                    align="center" 
                      >
                    <el-table-column label="序号" width="100" align="center">
                      <template slot-scope="scope">
                        {{ scope.$index +1 }}
                      </template>
                    </el-table-column>
                    <el-table-column  prop="ip" label="机器IP" width="200"  align="center"/>
                    <el-table-column label="操作" width="200" align="center">
                      <template slot-scope="scope">
                          <el-button type="primary" size="mini"  @click="startByIp(scope.row.ip)">宕机重启</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
            </div>
         </el-card>
       </el-col>
      </el-row>
    </div>
</template>
<script>

import mqApi from '@/api/env/mq'
export default {
  data() {
    return {
      service: {

      },
      serlist: {
      },
      list: {
        ip:''
      },
      machineTag: false,
      serviceTag: false,
      env: {
        servicePath: '',
        ipPassword: '',
        ip: '',
        serviceList: []
      },
      mq3: {
      },
      saveBtnDisabled: false ,// 保存按钮是否禁用
      //新增
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
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id
      this.getInfo(id)
    }
  },
  methods: {
    cellStyle(row,column,rowIndex,columnIndex){//根据报警级别显示颜色
        console.log("=========",row);
        console.log("---------",row.column);
        if(row.column.label=="机器IP"&& row.row.opend==1){
          return 'color:red'
        }
      },
    // DONE
    doGetEnvData(ip){
        console.log('失去焦点触发, : ' + ip)
        mqApi.doGetEnvData(ip)
        .then(response => {
          this.env.ipPassword = response.data.ips.ipPassword
          this.env.servicePath = response.data.ips.servicePath
        })
    },
    saveEnv(){
      this.env.serviceList = this.env.serviceList.split(',')
      console.log('----------------')
      console.log(this.env)
      mqApi.addService(this.env)
        .then(response => {
          // 提示成功
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          // 路由跳转
        })
       .catch(error => {
          console.log(error)
        })
      
    },
    getInfo(id) {
      mqApi.queryMq(id)
        .then(response => {
          this.mq = response.data.insuranceMq
        })
    },
    getList() {
      mqApi.getEnvList( )
        .then(response => {
          this.list = response.data.list
          console.log("-----------999999------"+list)
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 更新
    updateMq() {
      mqApi.updateMq(this.mq)
        .then(response => {
          // 提示成功
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          // 路由跳转
          this.$router.push({ path: '/env/tree' })
        })
    },
    startByIp(ip){
       this.dialogFormVisible = true
       console.log("-------"+ip)
       mqApi.startService(ip)
        .then(response => {
          this.serlist = response.data.ips
          this.serlist.serviceIp = response.data.serviceIp
        })
    },
    openOrUpdate(){
      this.dialogFormVisible = false
       console.log("-------"+this.serlist.serviceIp)
       mqApi.openService(this.serlist.serviceIp)
        .then(response => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          // 路由跳转
          this.$router.push({ path: '/restart/index' })
          // this.serlist = response.data.ips
        })
    },
    closeOrUpdate(){
      this.dialogFormVisible = false
       console.log("-------"+this.serlist.serviceIp)
       mqApi.stopService(this.serlist.serviceIp)
        .then(response => {

          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          // 路由跳转
          this.$router.push({ path: '/restart/index' })
          // this.serlist = response.data.ips
        })
    },



  }
}
</script>

<style>
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
</style>

