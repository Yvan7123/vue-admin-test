import request from "@/utils/request"

export function deleteMachinePost(data) {
    return request({
        url:"/machine/" + data,
        method:"delete",

    })
}

