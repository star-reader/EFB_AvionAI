import { dataDecrypt } from "../crypto"
import * as airac from './airacAssist'
import queryVORDME from "./queryInfo/queryVORDME"

let coords: number[][] = []
let tempCoord:Coordinate[] = []

const transCoord = (coord: Coordinate[]) => {
    tempCoord = [coord[coord.length - 1]]
    for (let i of coord){
        coords.push([
            i.longitude,
            i.latitude
        ])
    }
}

/**根据程序生成坐标序列 */
export default async (proc: string[]) => {
    // 每个proc都是加密的，需要解密
    coords = []
    let last_lat = 0
    let last_lon = 0
    for (let i = 0; i < proc.length; i++){
        let d = dataDecrypt(proc[i]).split(',')
        console.log(dataDecrypt(proc[i]))
        let latitude = 0
        let longitude = 0
        try {
            if (d[2]) latitude = parseFloat(d[2])
            if (d[3]) longitude = parseFloat(d[3])
        } catch (error) {
            latitude = 0
            longitude = 0
        }
        const type = d[0]
        switch (type) {
            case 'IF':
                transCoord(airac.IF({
                    latitude, longitude
                }))
                break
            case 'TF':{
                if (!last_lat || !last_lon) break
                transCoord(airac.TF({
                    latitude: last_lat, longitude: last_lon
                }, {latitude, longitude}))
                break
            }
            case 'FA':{
                if (!last_lat || !last_lon) break
                transCoord(airac.FA({
                    latitude: last_lat, longitude: last_lon
                }, {latitude, longitude}, parseInt(d[10])))
                break
            }
            case 'FM':{
                // KIDN GIIBS 3 ARR WONOK
                transCoord(airac.FM({
                    latitude, longitude
                }, parseFloat(d[8])))
                break
            }
            case 'FC':{
                // ANYN VOR/DME 12 NI2
                if (!last_lat || !last_lon) break
                transCoord(airac.FC({
                    latitude: last_lat, longitude: last_lon
                },{latitude, longitude}, parseFloat(d[9])))
                break
            }
            case 'FD':{
                // ZYHB VOR/DME 05
                const dmes = await queryVORDME(d[5])
                for (let j = 0; j < dmes.length; j++){
                    let lat = dmes[j].location.latitude
                    let lon = dmes[j].location.longtitude
                    if (Math.abs(lat - last_lat) < 1 && Math.abs(lon - last_lon) < 1){
                        transCoord(airac.FD({latitude: last_lat, longitude: last_lon},{
                            latitude: lat, longitude: lon
                        },parseFloat(d[9])))
                        break
                    }
                }
                break
            }
            case 'CF':{
                if (!last_lat || !last_lon) break
                transCoord(airac.CF({
                    latitude: last_lat,
                    longitude: last_lon
                },parseFloat(d[6]), {latitude, longitude}))
                break
            }
            case 'CA':{
                if (!last_lat || !last_lon) break
                transCoord(airac.CA({
                    latitude: last_lat, longitude: last_lon
                }, parseFloat(d[2]), parseFloat(d[4])))
                break
            }
            case 'CD':{
                const dmes = await queryVORDME(d[5])
                for (let j = 0; j < dmes.length; j++){
                    let lat = dmes[j].location.latitude
                    let lon = dmes[j].location.longtitude
                    let _lat
                    let _lon
                    if (last_lat === 0 || last_lon === 0){
                        const start = dataDecrypt(proc[1]).split(',')
                        _lat = parseFloat(start[2])
                        _lon = parseFloat(start[3])
                    }else{
                        _lat = last_lat
                        _lon = last_lon
                    }
                    if (Math.abs(lat - _lat) < 1 && Math.abs(lon - _lon) < 1){
                        transCoord(airac.CD({
                            latitude: lat, longitude: lon
                        }, parseFloat(d[8]), parseFloat(d[9])))
                        break
                    }
                }
                break
            }
            case 'VA':{
                if (!last_lat || !last_lon) break
                const dmes = await queryVORDME(d[5])
                for (let j = 0; j < dmes.length; j++){
                    let lat = dmes[j].location.latitude
                    let lon = dmes[j].location.longtitude
                    if (Math.abs(lat - last_lat) < 1 && Math.abs(lon - last_lon) < 1){
                        transCoord(airac.VA({
                            latitude: last_lat, longitude: last_lon
                        },parseFloat(d[7]),{
                            latitude: lat, longitude: lon
                        }))
                        break
                    }
                }
                break
            }
            case 'VM':{
                if (!last_lat || !last_lon) break
                transCoord(airac.VM({
                    latitude: last_lat, longitude: last_lon
                }, parseFloat(d[4])))
                break
            }
            case 'VD':{
                transCoord(airac.VD({
                    latitude: last_lat, longitude: last_lon
                }, parseFloat(d[8]), parseFloat(d[9])))
                break
            }
            case 'DF':{
                transCoord(airac.TF({
                    latitude: last_lat, longitude: last_lon
                },{latitude, longitude}))
                break
            }
            case 'RF':{
                transCoord(airac.TF({
                    latitude: last_lat, longitude: last_lon
                },{latitude, longitude}))
                break
            }
            case 'AF':{
                transCoord(airac.TF({
                    latitude: last_lat, longitude: last_lon
                },{latitude, longitude}))
                break
            }
            default:
                break
        }
        if (i < 2){
            last_lat = tempCoord[0].latitude
            last_lon = tempCoord[0].longitude
        }else{
            let d = dataDecrypt(proc[i-2]).split(',')
            last_lat = tempCoord[0].latitude === 0 ? parseFloat(d[2]) : tempCoord[0].latitude
            last_lon = tempCoord[0].longitude === 0 ? parseFloat(d[3]) : tempCoord[0].longitude
        }
        
    }
    return coords
}