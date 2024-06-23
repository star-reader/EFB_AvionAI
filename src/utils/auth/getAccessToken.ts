import axios from 'axios'
import pubsub from 'pubsub-js'
import apiUrl from '../../config/api/apiUrl'
import oAuth2 from '../../config/oAuth2'
import { dataEncrypt } from '../crypto'
import getRandom from '../getRandom'

export default () => {
    // const cert = localStorage.getItem('certificate')
    // if (!cert) return pubsub.publish('token-error', 1)
    // axios.post(apiUrl.login, {
    //     ...oAuth2,
    //     code_challenge: cert,
    //     code_verifier: dataEncrypt(Date.now().toString())
    // }).then(res => {
    //     if (res.data.code === 200){
    //         // 登录成功   保存登录证书、token、用户信息、时间
    //         const d = res.data
    //         //localStorage.setItem('certificate', cert)
    //         localStorage.setItem('access_token', d.access_token)
    //         localStorage.setItem('userInfo', dataEncrypt(d.user))
    //         //localStorage.setItem('refresh_time', d.login_time)
    //         pubsub.publish('token-ok', 1)
    //     }else{
    //         return pubsub.publish('token-error', 1)
    //     }
    // }).catch(() => {
    //     return pubsub.publish('token-error', 1)
    // })
    axios.post(apiUrl.login,{
        ...oAuth2,
        code_verifier: dataEncrypt(Date.now().toString(), true),
        userid: 'avion-ai',
        state: getRandom(18)
    }).then(res => {
        const token = res.data.access_token
        localStorage.setItem('access_token', token)
        pubsub.publish('token-ok', 1)
    }).catch(() => {
        return pubsub.publish('token-error', 1)
    })
}