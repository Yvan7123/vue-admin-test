import request from "@/utils/request"

export function deleteMachinePost(data) {
    return request({
        url:"/machine/" + data,
        method:"delete"
    })
}

export function getListBySection(query){
    return request({
        url:"/machinesBySection",
        method:"get",
        params: query
    })
}

export function updateMachine(data) {
    return request({
        url: '/machine/update',
        method: 'post',
        data
    })
}