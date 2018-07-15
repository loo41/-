import request from '../util/request.js'

export function login (data) {
  return request({
    url: '/pedestal/login',
    method: 'post',
    data
  })
}

export function submit (data) {
  return request({
    url: '/pedestal/submit',
    method: 'post',
    data
  })
}

export function pedestalRecord (params) {
  return request({
    url: '/pedestal/pedestal-record',
    method: 'get',
    params
  })
}

export function format (params) {
  return request({
    url: '/pedestal/format',
    method: 'get',
    params
  })
}

export function cancelPed (params) {
  return request({
    url: '/pedestal/cancel-ped',
    method: 'get',
    params
  })
}

export function removePed (params) {
  console.log(params)
  return request({
    url: '/pedestal/remove-ped',
    method: 'get',
    params
  })
}
