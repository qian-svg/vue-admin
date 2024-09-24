import request from '@/utils/request'
import { setUser, removeUser } from './tools'

export const login = async(param) => {
  const req = await request.post('/api/login/', param)
  if (!req.code && req.code !== 200) {
    return false
  }
  const code = req.code.toString()
  if (code === '200') {
    console.log('1111')
    const user = {
      token: req.data.token,
      mobile: req.data.userDetailVO.mobile,
      account: req.data.userDetailVO.account,
      id: req.data.userDetailVO.id,
      name: req.data.userDetailVO.name,
      photoUrl: req.data.userDetailVO.photoUrl
    }
    setUser(user)
  }
  return req
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-simple/user/info',
    method: 'get',
    params: { token }
  })
}

export const logout = async() => {
  const req = await request.post('/api/login/logout')
  if (!req.code && req.code !== 200) {
    return false
  }
  const code = req.code.toString()
  if (code === '200') {
    removeUser()
  }
  return req
}
