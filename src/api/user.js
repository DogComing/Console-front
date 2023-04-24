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
// var url1='https://41216.pamperdog.club/admin-api';
// var url1='https://g5y8627140.goho.co/admin-api'
var url1 = 'http://192.168.0.77:41216/admin-api'
// 登录
export function login(data) {
  return request({
    url: '/auth',
    method: 'post',
    baseURL: url1,
    data
  })
}
// 获取用户信息
export function userAll(data) {
  return request({
    url: '/user/all',
    method: 'get',
    baseURL: url1,
    params: data
  })
}
// 修改用户信息
export function userUpdate(id, data) {
  return request({
    url: 'user/update/' + id,
    method: 'put',
    baseURL: url1,
    data
  })
}
// 获取狗狗信息
export function dogAll(data) {
  return request({
    url: 'dog/all',
    method: 'get',
    baseURL: url1,
    params: data
  })
}
// 修改狗狗信息
export function dogUpdate(id, data) {
  return request({
    url: 'dog/update/' + id,
    method: 'put',
    baseURL: url1,
    data
  })
}

// 获取野生信息
export function wildAll(data) {
  return request({
    url: 'wild/all',
    method: 'get',
    baseURL: url1,
    params: data
  })
}
// 修改野生信息
export function wildUpdate(id, data) {
  return request({
    url: 'wild/update/' + id,
    method: 'put',
    baseURL: url1,
    data
  })
}

// 获取饲料信息
export function forageAll(data) {
  return request({
    url: 'forage/all',
    method: 'get',
    baseURL: url1,
    params: data
  })
}
// 修改饲料信息
export function forageUpdate(id, data) {
  return request({
    url: 'forage/update/' + id,
    method: 'put',
    baseURL: url1,
    data
  })
}
// 获取捕捉信息
export function catchEquipAll(data) {
  return request({
    url: 'catch/equip/all',
    method: 'get',
    baseURL: url1,
    params: data
  })
}
// 修改捕捉信息
export function catchEquipUpdate(id, data) {
  return request({
    url: 'catch/equip/update/' + id,
    method: 'put',
    baseURL: url1,
    data
  })
}
// 获取战斗装备信息
export function fightEquipAll(data) {
  return request({
    url: 'fight/equip/all',
    method: 'get',
    baseURL: url1,
    params: data
  })
}
// 修改战斗装备信息
export function fightEquipUpdate(id, data) {
  return request({
    url: 'fight/equip/update/' + id,
    method: 'put',
    baseURL: url1,
    data
  })
}

// 获取战斗装备信息 GET /admin-api/prop/all
export function propAll(data) {
  return request({
    url: 'prop/all',
    method: 'get',
    baseURL: url1,
    params: data
  })
}
// 修改战斗装备信息
export function propUpdate(id, data) {
  return request({
    url: 'prop/update/' + id,
    method: 'put',
    baseURL: url1,
    data
  })
}

// 获取战斗装备信息 GET /admin-api/produce/all
export function produceAll(data) {
  return request({
    url: 'produce/all',
    method: 'get',
    baseURL: url1,
    params: data
  })
}
// 修改战斗装备信息
export function produceUpdate(id, data) {
  return request({
    url: 'produce/update/' + id,
    method: 'put',
    baseURL: url1,
    data
  })
}

// 获取战斗装备信息 setting/all
export function settingAll() {
  return request({
    url: 'setting/all',
    method: 'get',
    baseURL: url1
  })
}
// 修改战斗装备信息
export function settingUpdate(data) {
  return request({
    url: 'setting/update',
    method: 'put',
    baseURL: url1,
    data
  })
}

// 获取战斗装备信息 map/all
export function mapAll() {
  return request({
    url: 'map/all',
    method: 'get',
    baseURL: url1
  })
}
// 修改战斗装备信息
export function mapUpdate(id, data) {
  return request({
    url: 'map/update/' + id,
    method: 'put',
    baseURL: url1,
    data
  })
}
