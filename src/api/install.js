import request from "@/utils/request"

export function PostInstallEquip (data) {
  return request({
    url: "/installEquip",
    method: "post",
    data: data
  })
}