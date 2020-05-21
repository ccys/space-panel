import { urlEncode } from "./util"

// let BASE_URL = 'http://zwb-baojia.zhaodaka.vip/api/wechat'
let BASE_URL = '/admin/product'

export function httpGet(url, params = {}) {
    params = addCommonParam(params)
    return handleResponse(fetch(BASE_URL + url + '?' + urlEncode(params), {
        mode: 'cors',
    }))
}
export function httpPost(url, formData = new FormData()) {
    formData = addCommonParam(formData)
    return handleResponse(fetch(BASE_URL + url, {
        method: 'POST',
        mode: 'cors',
        body: formData
    }))
}
function handleResponse(fetchPromise) {
    return new Promise((resolve, reject) => {
        fetchPromise.then(res => res.json()).then(Response => {
            if (Response.code === 200) {
                return resolve(Response.data)
            } else {
                return reject(Response.msg)
            }
        })
    })
}

function addCommonParam(params) {
    const token = 'babc19a9d04aec76040336681c62300d'
    if (!!token) {
        if (params.append) {
            params.append('token', token)
        } else {
            params.token = token
        }
    }
    return params
}