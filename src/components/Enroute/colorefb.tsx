import L from 'leaflet'
import { useEffect, useState } from 'react'
import pubsub from 'pubsub-js'
import apiUrl from '../../config/api/apiUrl'
import { dataDecrypt, dataEncrypt } from '../../utils/crypto'
import getUserData from '../../utils/auth/getUserData'
import { urlizeBase64 } from '../../utils/base64'

export default () => {

    const [isShow, setIsShow] = useState(false)
    const [isHide, setIsHide] = useState(false)

    useEffect(() => {
        pubsub.subscribe('click-enroute',(_,data: number) => {
            if (!data){
                setIsHide(true)
            }else{
                setIsShow(true)
                setIsHide(false)
            }
        })
    },[])

    useEffect(() => {
        if (isShow){
            // init map
            const map = L.map('EnrouteMap').setView([2.94,363.9],9)
            map.setMaxZoom(12)
            map.setMinZoom(8)
            L.tileLayer(`${dataDecrypt(apiUrl.enroute.colormap)}/${urlizeBase64(dataEncrypt(getUserData()?.Username))}/{z}/{x}/{y}`,{
                'maxZoom': 12,
                'attribution': 'API © SKYline Flyleague | Source Data from CAAC ATMB AISC',
            }).addTo(map)
            map.invalidateSize()

            addEventListener('resize', () => map.invalidateSize())
        }
    },[isShow])

    return (
        <>
            {
                isShow &&
                <div style={{display: isHide ? 'none' : 'block'}}
                className="absolute left-0 w-full top-0 h-full z-[13]" id="EnrouteMap"></div>
            }
        </>
    )
}