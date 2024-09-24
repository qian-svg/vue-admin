import request from '@/utils/request'

// 公告列表
export const noticeList = async(param) => {
  const req = await request.get('/api/notice/list', param)
  if (!req.code && req.code !== 200) {
    return false
  }
  return req
}

// 公告新增
export const addnotice = async(param) => {
    const req = await request.post('/api/notice/create', param)
    if (!req.code && req.code !== 200) {
      return false
    }
    return req
}

// 删除
export const delnotice = async(param) => {
    const req = await request.get('/api/notice/delete/'+ param)
    if (!req.code && req.code !== 200) {
      return false
    }
    return req
}
