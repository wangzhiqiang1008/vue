import request from '@/utils/request'
export default {

    getConfList(current, limit, ConfQuery) {
        return request({
          url: `/anymock/env-synchronization/pageConfByParam/${current}/${limit}`,
          method: 'post',
          // data 表示对象转json
          data: ConfQuery
        })
      },
     
      // 添加
      addConf(conf) {
        return request({
          url: `/anymock/env-synchronization/addConf`,
          method: 'post',
          data: conf
    
        })
      },
      queryConf(id){
        return request({
            url: `/anymock/env-synchronization/getConf/${id}`,
            method: 'get',
      
          })
      },
      updateConf(conf){
        return request({
            url: `/anymock/rule-info/confSyn`,
            method: 'post',
            data: conf
          })
      },
      pullConf(){
        return request({
            url: `/anymock/rule-info/pullConf`,
            method: 'get',
          })
      }
}