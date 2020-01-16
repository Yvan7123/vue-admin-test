import request from "@/utils/request"


export function getPosListByMachine (query) {
  return request({
    url: "/posByMachine",
    method: "get",
    params: query
  })
} 