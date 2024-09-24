/* eslint-disable no-mixed-spaces-and-tabs */
import Cookie from 'js-cookie'
import { aesDecrypt4User, aesEncryption4User } from '../aesTools/aboutUserInfo'
const ll = window.localStorage

/**
 * 把用户信息存放在本地
 * @param user
 */
export const setUser = (user) => {
  if (!user || user.toString() === '{}') {
    return
  }
  const u = aesEncryption4User(user)
  ll.setItem('user', u)
  if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.coverUserInfo) {
    window.webkit.messageHandlers.coverUserInfo.postMessage(u)
  }
}

/**
 * 获取用户信息
 * @returns {null|any}
 */
export const getUser = () => {
  // 老版本是使用cookie存用户信息的，如果cookie里面有用户信息，存到localStorage并删除cookie上的用户信息
  let ou = Cookie.get('user')
  if (ou) {
    ou = JSON.parse(ou)
    setUser(ou)
    Cookie.remove('user')
    return ou
  }

  const user = ll.getItem('user')
  if (!user) {
    return null
  }
  const a = aesDecrypt4User(user)
  return JSON.parse(a)
}

/**
 * 删除用户信息
 * @returns {this | this | parser.Container | ActiveX.IXMLDOMNode | string}
 */
export const removeUser = () => ll.removeItem('user')

/**
 * 可以根据转入的天数获取前面某天的开始与结束时间戳
 * @param {number} num 前面几天
 */
export const getStartEndTime = (num) =>{
  // 一天的毫秒数
  const MillisecondsADay = 24*60*60*1000 * num
  // 今日开始时间戳
  const todayStartTime = new Date(new Date().setHours(0, 0, 0, 0)).getTime()
  // 今日结束时间戳
  const todayEndTime = new Date(new Date().setHours(23,59,59,999)).getTime()
  
  // 昨日开始时间戳
  const yesterdayStartTime = todayStartTime - MillisecondsADay
  // 昨日结束时间戳
  const yesterdayEndTime = todayEndTime - MillisecondsADay
  console.log(`
    ${todayStartTime} =>今日时间戳
    ${todayEndTime} => 结束时间戳
    ${yesterdayStartTime} =>  昨日开始时间戳
    ${yesterdayEndTime} =>  昨日结束时间戳
  `)
  return [yesterdayStartTime,yesterdayEndTime]
}

export const getPreviousDaysDates  = (days) =>{
  const today = new Date();
  const startDate = new Date(today);
  const endDate = new Date(today);
 
  // 设置开始日期为几天前
  startDate.setDate(today.getDate() - days);
  // 设置结束日期为当天
  endDate.setDate(today.getDate() - days);
 
  // 格式化日期为YYYY-MM-DD
  const startDateStr = [
    startDate.getFullYear(),
    ('0' + (startDate.getMonth() + 1)).slice(-2),
    ('0' + startDate.getDate()).slice(-2),
  ].join('-')+  ' 00:00:00';
  const endDateStr = [
    endDate.getFullYear(),
    ('0' + (endDate.getMonth() + 1)).slice(-2),
    ('0' + endDate.getDate()).slice(-2)
  ].join('-') +  ' 23:59:59';
 
  return {
    start: startDateStr,
    end: endDateStr,
  };
}
