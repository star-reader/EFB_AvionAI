import { dataDecrypt } from "../crypto"

export default () => {
    // const token = localStorage.getItem('access_token')
    // const user = localStorage.getItem('userInfo')
    // const cert = localStorage.getItem('certificate')
    // const time = localStorage.getItem('refresh_time')
    // if (!token || !user || !cert || !time){
    //     return 'no-login'
    // }
    // const nowTime = Date.now()
    // if (nowTime - parseInt(time) > 3600000){
    //     // 大于一小时，token已经过期
    //     return 'token-expire'
    // }
    // // 数据均完整，且token处于有效期，正常加载数据
    // return 'login-success'
    const login = localStorage.getItem('cert_demo')
    if (login && dataDecrypt(login)){
        return 'login-success'
    }else{
        return 'no-login'
    }
}