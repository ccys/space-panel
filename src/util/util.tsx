
/** 
 * param 将要转为URL参数字符串的对象 
 * encode true/false 是否进行URL编码,默认为true 
 *  
 * return URL参数字符串 
 */
export function urlEncode(param: any, encode = true) {
    if (param == null) return '';
    const paramAry = [];
    for (const i in param) {
        paramAry.push(i + '=' + (encode ? encodeURIComponent(param[i]) : param[i]))
    }
    return paramAry.join('&');
}

export function isNumber(obj: any) {
    return typeof obj === 'number' && !isNaN(obj)
}
