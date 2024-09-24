import request from "@/utils/request";
import http from "@/utils/http";

// 用户信息列表
export const UserList = async(param) => {
    const req = await request.get('/api/report/user/list', param)
    if (!req.code && req.code !== 200) {
      return false
    }
    return req
}

// 用户信息列表
export const deviceList = async(param) => {
    const req = await request.get('/api/report/device/list', param)
    if (!req.code && req.code !== 200) {
      return false
    }
    return req
}

// 实时设备数据
export const devicesList = async(param) => {
    const req = await request.get('/api/report/device/real', param)
    if (!req.code && req.code!== 200) {
      return false
    }
    return req
}

// 会员信息导出
export const exportUserList = async(param) => {
    const req = await http.get('/api/report/member/export',param)
    return req
  }

  
// 付费信息导出
export const exportPayList = async(param) => {
  const req = await http.get('/api/report/pay/export',param)
  return req
}
