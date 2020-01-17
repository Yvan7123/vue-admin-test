import request from "@/utils/request"

export function getEquipList () {
  return request({
    url: "/equipNoInstall",
    method: "get",
  })
}