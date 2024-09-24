import request from '@/utils/request'
import http from '@/utils/http'

// 激活
export const activate = async(param) => {
  const req = await request.post('/api/cdkey/activate', param)
  if (!req.code && req.code !== 200) {
    return false
  }
  return req
}

// 激活码列表
export const batchList = async(param) => {
  const req = await request.get('/api/cdkey/batch/list', param)
  if (!req.code && req.code !== 200) {
    return false
  }
  return req
}

// 激活码详情列表
export const detailsList = async(param) => {
  const req = await request.post('/api/cdkey/list', param)
  if (!req.code && req.code !== 200) {
    return false
  }
  return req
}

// 生成激活码
export const generate = async(param) => {
  const req = await request.post('/api/cdkey/generate', param)
  if (!req.code && req.code !== 200) {
    return false
  }
  return req
}

// 导出
export const exportList = async(param) => {
  const req = await http.post('/api/cdkey/export', param)
  return req
}

// 实例列表
export const instanceList = async(param) => {
  const req = await request.post('/api/instance/list', param)
  if (!req.code && req.code !== 200) {
    return false
  }
  return req
}


// 删除实例
export const instanceDelete = async(param) => {
  const req = await request.post('/api/instance/delete/'+ param)
  if (!req.code && req.code !== 200) {
    return false
  }
  return req
}

// 一键新机
export const newPad = async(param) => {
  const req = await request.post('/api/instance/newPad', param)
  if (!req.code && req.code !== 200) {
    return false
  }
  return req
}

// 型号列表
export const modelList = async(param) => {
  const req = await request.get('/api/model/list', param)
  if (!req.code && req.code !== 200) {
    return false
  }
  return req
}

// 商品列表
export const goodsList = async(param) => {
  const req = await request.get('/api/member/list', param)
  if (!req.code && req.code !== 200) {
    return false
  }
  return req
}

// 新增商品
export const addGoods = async(param) => {
  const req = await request.post('/api/member/create', param)
  if (!req.code && req.code !== 200) {
    return false
  }
  return req
}

// 会员级别
export const levelList = async() => {
  const req = await request.post('/api/level/list')
  if (!req.code && req.code !== 200) {
    return false
  }
  return req
}

// 删除商品
export const deletList = async(id) => {
  const req = await request.post('/api/member/delete', id)
  if (!req.code && req.code !== 200) {
    return false
  }
  return req
}

// 修改商品
export const updateList = async(id) => {
  const req = await request.post('/api/member/update', id)
  if (!req.code && req.code !== 200) {
    return false
  }
  return req
}

// 启用禁用
export const enableList = async(isEnable, param) => {
  const req = await request.post('/api/member/enable/' + isEnable, param)
  if (!req.code && req.code !== 200) {
    return false
  }
  return req
}

// 用户列表
export const userList = async(param) => {
  const req = await request.get('/api/user/list', param)
  if (!req.code && req.code !== 200) {
    return false
  }
  return req
}

// 绑定实例
export const bind = async(param) => {
  const req = await request.post('/api/instance/bind', param)
  if (!req.code && req.code !== 200) {
    return false
  }
  return req
}

// 绑定实例
export const unbind = async(param) => {
  const req = await request.post('/api/instance/unbind', param)
  if (!req.code && req.code !== 200) {
    return false
  }
  return req
}

// 重启
export const reboot = async(param) => {
  const req = await request.post('/api/instance/reboot', param)
  if (!req.code && req.code !== 200) {
    return false
  }
  return req
}

// 重置
export const reset = async(param) => {
  const req = await request.post('/api/instance/reset', param)
  if (!req.code && req.code !== 200) {
    return false
  }
  return req
}

// 修改到期时间
export const expireTime = async(param) => {
  const req = await request.post('/api/instance/update/expireTime', param)
  if (!req.code && req.code !== 200) {
    return false
  }
  return req
}

// 增加到期时间
export const renewTime = async(param) => {
  const req = await request.post('/api/instance/renew', param)
  if (!req.code && req.code !== 200) {
    return false
  }
  return req
}

// 实例修改接口
export const updateliving = async(param) => {
  const req = await request.post('/api/instance/update', param)
  if (!req.code && req.code !== 200) {
    return false
  }
  return req
}

// 实例导入
export const importFile = async(param) => {
  const req = await request.post('/api/instance/import', param)
  return req
}

// 实例新增
export const addInstance = async(param) => {
  const req = await request.post('/api/instance/create', param)
  if (!req.code && req.code !== 200) {
    return false
  }
  return req
}

// 激活码更新使用未使用
export const updateUse = async(param) => {
  const req = await request.post('/api/cdkey/use', param)
  if (!req.code && req.code !== 200) {
    return false
  }
  return req
}

// 实例池
export const poolList = async(param) => {
  const req = await request.get('/api/pool/list', param)
  if (!req.code && req.code !== 200) {
    return false
  }
  return req
}

// 新增实例池
export const poolAdd = async(param) => {
  const req = await request.post('/api/pool/create', param)
  if (!req.code && req.code !== 200) {
    return false
  }
  return req
}

// 编辑实例池
export const poolUpdate = async(param) => {
  const req = await request.post('/api/pool/update', param)
  if (!req.code && req.code !== 200) {
    return false
  }
  return req
}

// 删除实例池
export const poolDelete = async(id) => {
  const req = await request.post('/api/pool/delete/' + id)
  if (!req.code && req.code !== 200) {
    return false
  }
  return req
}

// 实例是否可用
export const enable = async(param, id) => {
  const req = await request.post('/api/instance/enable/' + param, id)
  if (!req.code && req.code !== 200) {
    return false
  }
  return req
}

// 上传图片
export const upload = async(param) => {
  const req = await request.post('/api/file/upload',param)
  return req
}

// 导出
export const exportOperation = async(param) => {
  const req = await http.post('/api/instance/export',param)
  return req
}

// 更换云机
  export const replaceCloud = async(param) => {
    const req = await request.post('/api/instance/replace', param)
    if (!req.code && req.code!== 200) {
      return false
    }
    return req
  }
