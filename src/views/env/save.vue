<template>
  <el-row>
    <el-col :span="12">
     <el-card class="box-card">
      <div id="wrapper" slot="header" class="clearfix" >
          <span style="text-align: center;display:block;">修改MQ信息</span>
      </div>
      <div class="grid-content">

        <el-form ref="form" :model="mq" label-width="120px" size="medium">

          <el-form-item label="topic名称">
            <el-input v-model="mq.topicName" />
          </el-form-item>
          <el-form-item label="group名称">
            <el-input v-model="mq.groupName" />
          </el-form-item>
          <el-form-item label="MQ描述">
            <el-input v-model="mq.info" />
          </el-form-item>
          <el-form-item label="环境信息">
            <el-select v-model="mq.envTag" clearable placeholder="环境信息">
              <el-option :value="2" label="环境二" />
              <el-option :value="3" label="其他环境" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
          </el-form-item>
        </el-form>
      </div>

     </el-card>
    </el-col>
  </el-row>
</template>

<script>

import mqApi from '@/api/env/mq'
export default {
  data() {
    return {
      mq: {
      },
      saveBtnDisabled: false // 保存按钮是否禁用
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id
      this.getInfo(id)
    }
  },
  methods: {
    saveOrUpdate() {
      // 判断修改还是添加
      if (!this.mq.id) {
        this.saveMq()
      } else {
        this.updateMq()
      }
    },
    saveMq() {
      mqApi.addMq(this.mq)
        .then(response => {
          // 提示成功
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          // 路由跳转
          this.$router.push({ path: '/env/tree' })
        })
    },
    getInfo(id) {
      mqApi.queryMq(id)
        .then(response => {
          this.mq = response.data.insuranceMq
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
          this.$router.push({ path: '/restart/list' })
        })
    }

  }
}
</script>

<style >
</style>
