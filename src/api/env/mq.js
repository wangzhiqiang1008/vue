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
  }
}
