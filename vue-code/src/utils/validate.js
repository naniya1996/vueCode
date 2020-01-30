// 过滤特殊字符
export function stripscript(s) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~!@#￥...&()&mdash;-|{}【】‘；：’“”。，、？]")
    var rs = "";
    for (var i = 0; i < s.lenth; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}
