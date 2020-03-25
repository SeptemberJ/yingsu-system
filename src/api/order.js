import request from '@/utils/request'

export function getCarType(data) {
  return request({
    url: '/typeController/tstype/2c90b4bf6c1ccde9016c1cdb2c4f000a',
    method: 'get'
  })
}

export function getCarLong(data) {
  return request({
    url: '/zCarLengthController/list',
    method: 'get'
  })
}

export function getProvince(data) {
  return request({
    url: '/tokens/regionSelect?pid=100000',
    method: 'get'
  })
}

export function getCity(data) {
  return request({
    url: '/tokens/regionSelect?pid=' + data.pid + '&ftype=0' + '&fname=' + data.fname,
    method: 'get'
  })
}

export function getArea(data) {
  return request({
    url: '/tokens/regionSelect?pid=' + data.pid + '&ftype=1' + '&fname=' + data.fname,
    method: 'get'
  })
}

export function getGoodsKind(data) {
  return request({
    url: '/typeController/list/1/200',
    method: 'get'
  })
}

export function getService(data) {
  return request({
    url: '/typeController/tstype/2c90b4576e634e80016e637fb54a0003',
    method: 'get'
  })
}

export function getContract(data) {
  return request({
    url: 'contactController/list1/' + data.currentPage + '/' + data.pageSize + '?id=' + data.userId + '&type=' + data.type,
    method: 'get'
  })
}

export function submitContact(data) {
  return request({
    url: '/contactController',
    method: 'post',
    data: data
  })
}

export function submitOrder(data) {
  return request({
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    url: '/zPcOrderController/pcOrder?orderInfo=' + encodeURI(JSON.stringify(data)),
    method: 'post',
    data: {}
  })
}
