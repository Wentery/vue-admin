class Utils {
    //校验身份证
    isCardNo(card) {
        const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        return reg.test(card);
    }
    //校验手机号
    isPhoneNum(phone) {
        const reg = /^1[3456789]\d{9}$/
        return reg.test(phone)
    }
    //校验数字
    isNumber(num) {
        if (typeof num === 'string' && num.length == 0) {
            return;
        } else if (num === undefined) {
            return;
        }
        const reg = /^\d{1,}$/
        return reg.test(num)
    }
    //校验邮箱
    isEmail(email) {
        const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        return reg.test(email);
    }
}


export default new Utils;