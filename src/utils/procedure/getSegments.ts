import { dataDecrypt } from "../crypto"

/**根据程序生成坐标序列 */
export default (proc: string[], startPoint: number[], endPoint: number[], type?: string) => {
    // 每个proc都是加密的，需要解密
    const coords: number[][] = []
    if (startPoint && type !== 'app'){
        coords.push(startPoint)
    }
    for (let i = 0; i < proc.length; i++){
        let d = dataDecrypt(proc[i]).split(',')
        let latitude = 0
        let longitude = 0
        try {
            if (d[2]) latitude = parseFloat(d[2])
            if (d[3]) longitude = parseFloat(d[3])
        } catch (error) {
            continue
        }
        if (latitude && longitude && Math.abs(latitude - startPoint[1]) < 1 && Math.abs(longitude - startPoint[0]) < 1){
            coords.push([longitude, latitude])
        }
    }
    if (endPoint){
        coords.push(endPoint)
    }
    return coords
}