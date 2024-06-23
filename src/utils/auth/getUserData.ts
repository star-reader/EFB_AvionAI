import { dataDecrypt } from "../crypto"

export default (): UserData | undefined => {
    const _user = localStorage.getItem('userInfo')
    if (!_user) return
    const user: UserData = JSON.parse(dataDecrypt(_user))
    return user
}