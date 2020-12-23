<template>

    <div class="content-wrapper">
       <el-row :gutter="19">
        <el-col :span="11">
        <div class="titleline" style="text-align:center">
            <el-tag type="danger" size="medium" color="#409EFF">环境二创建MQ</el-tag>
        </div>
        <el-card class="box-card">
          <div class="grid-content bg-purple">
            <el-form ref="form" :model="mq2" label-width="130px" size="medium">
            <el-form-item label="topic名称">
                <el-input v-model="mq2.topicName" placeholder="eg: ****_xw" />
            </el-form-item>
            <el-form-item label="group名称">
                <el-input v-model="mq2.groupName" placeholder="eg: cg_****_xw" />
            </el-form-item>
            <el-form-item label="负责人">
                <el-input v-model="mq2.contractors" placeholder="邮箱前缀 分号分隔 eg: chrismatemating_v;arlenechenmeng_v" />
            </el-form-item>
            <el-form-item label="MQ描述">
                <el-input v-model="mq2.desc" placeholder="描述一下这个MQ的用途" />
            </el-form-item>
            <el-form-item label="cpoy集群MQ后缀">
                <el-input v-model="mq2.suffix" placeholder="逗号分隔 必须带COPY eg: COPY_test_xiaoma,COPY_test_wzq" />
            </el-form-item>
            <el-form-item label="其他环境MQ标识">
                <el-input v-model="mq2.envTag" placeholder="逗号分隔 用这些标识替换_xw eg: _gj,_cm" />
            </el-form-item>
            <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="saveMqEnv2">保存</el-button>
            </el-form-item>
            </el-form>
         </div>
        
        </el-card>
        </el-col>

        <el-col :span="11">
         
            <div class="titleline" style="text-align:center">
                <el-tag type="warning" size="medium" color="#409EFF">其他环境创建MQ</el-tag>
            </div>
             <el-card class="box-card">
            <div class="grid-content bg-purple-light">
                <el-form ref="form" :model="mq3" label-width="120px" size="medium">
                <el-form-item label="topic名称">
                    <el-input v-model="mq3.topicName" placeholder="eg: ****_gj" />
                </el-form-item>
                <el-form-item label="group名称">
                    <el-input v-model="mq3.groupName" placeholder="eg: cg_****_gj" />
                </el-form-item>
                <el-form-item label="负责人">
                    <el-input v-model="mq3.contractors" placeholder="邮箱前缀 分号分隔 eg: chrismatemating_v;arlenechenmeng_v" />
                </el-form-item>
                <el-form-item label="MQ描述">
                    <el-input v-model="mq3.desc" placeholder="描述一下这个MQ的用途" />
                </el-form-item>
                <el-form-item>
                    <el-button :disabled="saveBtnDisabled" type="primary" @click="saveMqEnv3">保存</el-button>
                </el-form-item>
                </el-form>
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
      mq2: {
        topicName: null,
        groupName: null,
        contractors: null,
        desc: null,
        suffix: null,
        envTag: null
      },
      mq3: {

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
    saveMqEnv2() {
      this.mq2.suffix = this.mq2.suffix.split(',')
      this.mq2.envTag = this.mq2.envTag.split(',')
      console.log('----------------')
      console.log(this.mq2)
      mqApi.createMq(this.mq2)
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
    saveMqEnv3() {
      mqApi.createMq(this.mq3)
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
          this.$router.push({ path: '/env/tree' })
        })
    }

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

