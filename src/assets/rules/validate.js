// 验证IP地址是否合法
export function validateIP(rule, value, callback) {
    if (value == '' || value == undefined || value == null) {
        callback()
    } else {
        const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        if ((!reg.test(value)) && value != '') {
            callback(new Error('请输入正确IP地址'))
        } else {
            callback()
        }
    }
}

export function validatePort(rule, value, callback) {
    if (value == '' || value == undefined || value == null) {
        callback()
    } else {
        const reg = /^[0-9]*[1-9][0-9]*$/;
        if (!reg.test(value)) {
            callback(new Error("端口只能是数字"))
        } else {
            callback()
        }

    }
}

export function validateName(rule, value, callback) {
    if (value == '' || value == undefined || value == null) {
        callback()
    }
}

export function validateUser(rule, value, callback) {
    if (value == '' || value == undefined || value == null) {
        callback()
    }
}

export function validatePass(rule, value, callback) {
    if (value == '' || value == undefined || value == null) {
        callback()
    }
}