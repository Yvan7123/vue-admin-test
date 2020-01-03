import request from '@/utils/request'

export function getList() {
  return request({
    url: '/machines',
    method: 'get',
  })
}
