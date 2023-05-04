import request from '@/utils/request'
export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

//登录
export function login(data) {
  return request({
    url:'/auth',
    method: 'post',
    baseURL:url1,
    data
  })
}
//获取用户信息
export function userAll(data) {
  return request({
    url:'/user/all',
    method: 'get',
    baseURL:url1,
    params:data
  })
}
//修改用户信息
export function userUpdate(id,data) {
  return request({
    url:'user/update/'+id,
    method: 'put',
    baseURL:url1,
    data
  })
}
//获取狗狗信息
export function dogAll(data) {
  return request({
    url:'dog/all',
    method: 'get',
    baseURL:url1,
    params:data
  })
}
//修改狗狗信息
export function dogUpdate(id,data) {
  return request({
    url:'dog/update/'+id,
    method: 'put',
    baseURL:url1,
    data
  })
}

//获取野生信息
export function wildAll(data) {
  return request({
    url:'wild/all',
    method: 'get',
    baseURL:url1,
    params:data
  })
}
//修改野生信息
export function wildUpdate(id,data) {
  return request({
    url:'wild/update/'+id,
    method: 'put',
    baseURL:url1,
    data
  })
}

//获取饲料信息
export function forageAll(data) {
  return request({
    url:'forage/all',
    method: 'get',
    baseURL:url1,
    params:data
  })
}
//修改饲料信息
export function forageUpdate(id,data) {
  return request({
    url:'forage/update/'+id,
    method: 'put',
    baseURL:url1,
    data
  })
}
//获取捕捉信息
export function catchEquipAll(data) {
  return request({
    url:'catch/equip/all',
    method: 'get',
    baseURL:url1,
    params:data
  })
}
//修改捕捉信息
export function catchEquipUpdate(id,data) {
  return request({
    url:'catch/equip/update/'+id,
    method: 'put',
    baseURL:url1,
    data
  })
}
//获取战斗装备信息 
export function fightEquipAll(data) {
  return request({
    url:'fight/equip/all',
    method: 'get',
    baseURL:url1,
    params:data
  })
}
//修改战斗装备信息
export function fightEquipUpdate(id,data) {
  return request({
    url:'fight/equip/update/'+id,
    method: 'put',
    baseURL:url1,
    data
  })
}

//获取战斗装备信息 GET /admin-api/prop/all
export function propAll(data) {
  return request({
    url:'prop/all',
    method: 'get',
    baseURL:url1,
    params:data
  })
}
//修改战斗装备信息
export function propUpdate(id,data) {
  return request({
    url:'prop/update/'+id,
    method: 'put',
    baseURL:url1,
    data
  })
}



//获取平台配置
export function settingAll() {
  return request({
    url:'setting/all',
    method: 'get',
    baseURL:url1,
  })
}
//获取平台配置
export function settingInfo(key) {
  return request({
    url:'setting/info/'+key,
    method: 'get',
    baseURL:url1,
  })
}
//平台配置修改
export function settingUpdate(data) {
  return request({
    url:'setting/update',
    method: 'put',
    baseURL:url1,
    data
  })
}

//获取地图
export function mapAll() {
  return request({
    url:'map/all',
    method: 'get',
    baseURL:url1,
  })
}
//修改地图属性
export function mapUpdate(id,data) {
  return request({
    url:'map/update/'+id,
    method: 'put',
    baseURL:url1,
    data
  })
}

//地图概率
export function produceAll(data) {
  return request({
    url:'produce/all',
    method: 'get',
    baseURL:url1,
    params:data
  })
}
//地图概率修改
export function produceUpdate(id,data) {
  return request({
    url:'produce/update/'+id,
    method: 'put',
    baseURL:url1,
    data
  })
}
//记录相关控制层————————————————————————————————————————————————
//用户ASG记录
export function logAsg(data) {
  return request({
    url:'log/asg',
    method: 'get',
    baseURL:url1,
    params:data
  })
}
//用户押注记录
export function logAward(data) {
  return request({
    url:'log/award',
    method: 'get',
    baseURL:url1,
    params:data
  })
}
//用户支付记录
export function logPay(data) {
  return request({
    url:'log/pay',
    method: 'get',
    baseURL:url1,
    params:data
  })
}
//用户返佣记录
export function logRake(data) {
  return request({
    url:'log/rake',
    method: 'get',
    baseURL:url1,
    params:data
  })
}
//用户赞助记录
export function logSupport(data) {
  return request({
    url:'log/support',
    method: 'get',
    baseURL:url1,
    params:data
  })
}
//广告——————————————————————————————————————————————————————————————————
//广告列表
export function adAll(data) {
  return request({
    url:'ad/all',
    method: 'get',
    baseURL:url1,
    params:data
  })
}
//广告列表修改
export function adUpdate(id,data) {
  return request({
    url:'ad/update/'+id,
    method: 'put',
    baseURL:url1,
    data
  })
}
//广告列表新增
export function adAdd(data) {
  return request({
    url:'ad/update',
    method: 'post',
    baseURL:url1,
    data
  })
}
//广告列表删除
export function adDelete(id) {
  return request({
    url:'ad/delete/'+id,
    method: 'delete',
    baseURL:url1,
    data
  })
}
//测试日本服务器
var url1='https://41216.pamperdog.club/admin-api';
//不同地方的本地服务器
//var url1='https://g5y8627140.goho.co/admin-api'
//本地服务器
//var url1='http://192.168.0.106:41216/admin-api'