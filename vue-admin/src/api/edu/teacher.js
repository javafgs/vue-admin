import request from '@/utils/request'
export default{
  getTeacherPageList(current, limit, teacherQuery) {
    return request({
      url: `/eduservice/teacher/pageCondition/${current}/${limit}`,
      method: 'post',
      // 用来传递json数据
      data: teacherQuery
    })
  }
}
