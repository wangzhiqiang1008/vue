import request from '@/utils/request'
// import { data } from 'autoprefixer'
export default {
// 分页查询
  getTeacherList(current, limit, teacherQuery) {
    return request({
      url: `/edu/teacher/pageTeacherByParam/${current}/${limit}`,
      method: 'post',
      // data 表示对象转json
      data: teacherQuery
    })
  },
  // 删除讲师
  deleteTeacherId(id) {
    return request({
      url: `/edu/teacher/${id}`,
      method: 'delete'

    })
  },
  // 添加讲师
  addTeacher(teacher) {
    return request({
      url: `/edu/teacher/addTeacher`,
      method: 'post',
      data: teacher

    })
  },
  // 查询讲师
  queryTeacher(id) {
    return request({
      url: `/edu/teacher/getTeacher/${id}`,
      method: 'get'
    })
  },
  updateTeacher(teacher) {
    return request({
      url: `/edu/teacher/updateTeacher`,
      method: 'post',
      data: teacher
    })
  }
}
