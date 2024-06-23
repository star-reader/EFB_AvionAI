import { dataDecrypt } from "../crypto"
import getUserData from "./getUserData"

export default (): boolean => {
    const d = localStorage.getItem('123lic')
    if (!d) return false
    try {
        const user = dataDecrypt(d)
        return user === getUserData()?.Username
    } catch (error) {
        return false
    }
}