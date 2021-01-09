import request from '@/utils/request'
// import { data } from 'autoprefixer'
export default {
  // 分页查询
  getMqList(current, limit, MqQuery) {
    return request({
      url: `/anymock/insurance-mq/pageMqByParam/${current}/${limit}`,
      method: 'post',
      // data 表示对象转json
      data: MqQuery
    })
  },
  // 删除MQ
  deleteMqId(id) {
    return request({
      url: `/anymock/insurance-mq/${id}`,
      method: 'delete'
    })
  },
  // 添加MQ
  addMq(mq) {
    return request({
      url: `/anymock/insurance-mq/addMq`,
      method: 'post',
      data: mq

    })
  },
  // 创建MQ订阅关系
  createMq(mq) {
    return request({
      url: `/anymock/DiDiMq/createMQ`,
      method: 'post',
      data: mq
    })
  },
  // copy MQ订阅关系
  copyMq(mq) {
    return request({
      url: `/anymock/DiDiMq/copyMqByEnvTag`,
      method: 'post',
      data: mq
    })
  },
  // copy单个 MQ订阅关系
  copyMq2(mq) {
    return request({
      url: `/anymock/DiDiMq/copyMq`,
      method: 'post',
      data: mq
    })
  },
  // 查询MQ
  queryMq(id) {
    return request({
      url: `/anymock/insurance-mq/getMq/${id}`,
      method: 'get'
    })
  },
  updateMq(mq) {
    return request({
      url: `/anymock/insurance-mq/updateMq`,
      method: 'post',
      data: mq
    })
  },
  doGetEnvData(ip){ 
    return request({
      url: `/anymock/env-list/findMachineByIp/${ip}`,
      method: 'get'
    })
  },
   
// 添加服务信息
addService(service) {
  return request({
    url: `/anymock/env-list/addEnvIpAndService`,
    method: 'post',
    data: service
  })
 },
 getEnvList(){
  return request({
    url: `/anymock/env-list/finAllIp`,
    method: 'get',
  })
 },
 startService(ip){
  return request({
    url: `/anymock/env-list/findServiceByIp/${ip}`,
    method: 'get'
  })
 },
// TODO 
  stopService(ip){
    return request({
      url: `/anymock/env-list/stopServiceByIp/${ip}`,
      method: 'get'
    })
  } ,
// TODO 
  openService(ip){
    return request({
      url: `/anymock/env-list/startServiceByIp/${ip}`,
      method: 'get'
    })
  }
}
