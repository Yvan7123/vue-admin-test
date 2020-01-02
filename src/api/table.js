import request from '@/utils/request'

export function getList(token) {
  console.log(token)
  return request({
    url: '/machines',
    method: 'get',
    params:{ token }
  })
}
