import request from '@/utils/request'

export function getSectionGet() {
    return request({
        url: "/sections/",
        method: "get"
    })
}