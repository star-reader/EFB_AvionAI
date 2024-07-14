import { useEffect , useState } from 'react'
import { Progress ,  message } from "antd"
import pubsub from 'pubsub-js'
import useAirac from '../../hooks/useAirac'
//import useGetAirac from '../../hooks/tauri/useGetAirac'
import { downloadData } from '../../hooks/map/useMapStyle'
//import useSaveEnrouteData from '../../hooks/tauri/useSaveEnrouteData'
import useGetAiracDB from '../../hooks/indexedDB/useGetAiracDB'
import useSaveEnrouteDataDB from '../../hooks/indexedDB/useSaveEnrouteDataDB'

// @ts-ignore
const isTauri = window.__TAURI__ ? true : false

export default () => {
    const [isShow, setIsShow] = useState(false)
    const [error, setError] = useState(false)
    const [percent, setPercent] = useState<number>(0)
    const [serverCurrent, setServerCurrent] = useState<AIRAC | undefined>()
    const [localCurrent, setLocalCurrent] = useState<AIRAC | undefined>()
    const [isDownloading, setIsDownloading] = useState(false)

    useEffect(() => {
        useAirac().then((d: AIRAC) => {
            if (d) return setServerCurrent(d)
        })

        const setAIRAC = () => {
            useGetAiracDB().then(d => {
                if (d) return setLocalCurrent(d)
            }).catch(() => {})
        }

        setAIRAC()

        pubsub.subscribe('open-data-shp',() => {
            setIsShow(true)
        })

        pubsub.subscribe('shp-fetch-err',() => {
            setError(false)
            setIsShow(true)
        })
        pubsub.subscribe('enroute-data-load',(_, data: number) => {
            setPercent(data)
        })
        pubsub.subscribe('save-shp-success',() => {
            message.success('Data download successful!')
            setIsDownloading(false)
            //setAIRAC()
            setTimeout(() => {
                location.reload()
            }, 1000)
        })
        pubsub.subscribe('save-shp-fail',() => {
            setIsDownloading(false)
            message.error('Data download failed!')
        })
    }, [])

    const isOutdated = (server: number | undefined, local: number | undefined) => {
        if (!server || !local) return false
        return server > local
    }

    const handleClose = () => setIsShow(false)

    const handleDownload = async () => {
        setIsDownloading(true)
        const d = await downloadData()
        useSaveEnrouteDataDB(d)
    }

    return (
        <>
            {
                isShow &&
                    <div className="absolute w-[400px] z-[60] t-calc-50-minus-50px-2 select-none mb-3
                    bg-[#223958] left-calc-50-minus-150px data-management rounded-md ani-[loading-alert]-4 phone:w-[90%]">
                        <div className="relative w-full text-center text-white text-[18px] mt-2 select-none">EFB Data Management</div>
                        <div onClick={handleClose} className="absolute top-[10px] right-[6px] mt-[3px] 
                            text-[13px] bg-[#e26e4b] rounded text-white select-none
                             text-center hover:bg-[#bd5d40] leading-[16px] 
                            cursor-pointer duration-200 phone:mt-[5px] pt-[-2px] pb-[2px] pl-[6px] pr-[6px]">Close
                        </div>
                        {/* 左侧显示本地数据、右侧显示服务器的数据有效期 */}
                        <div className="relative h-[65px] mt-2 flex w-full justify-around">
                            <div className="relative w-[46%] text-center rounded bg-[#2a476d] hover:bg-[#355886] duration-200">
                                {
                                    serverCurrent && serverCurrent.cycle_parse ?
                                    <>
                                        <div className="text-white mt-1 text-[14px]">Server Data：{serverCurrent.cycle}</div>
                                        <div className="relative text-gray-400 text-[12px]">Effective Date：{serverCurrent.effective}</div>
                                        <div className="relative text-gray-400 text-[12px]">Expiry Date：{serverCurrent.expire}</div>
                                    </> :
                                        <div className="relative text-white text-[15px]">No server data retrieved</div>
                                }
                            </div>
                            <div className="relative w-[46%] text-center rounded bg-[#2a476d] hover:bg-[#355886] duration-200">
                                {
                                    localCurrent && localCurrent.cycle_parse ? 
                                    <>
                                        <div className="text-white mt-1 text-[14px]"
                                    style={{color: isOutdated(serverCurrent?.cycle_parse, localCurrent?.cycle_parse) ? 'orangered' : '#87d068'}}>Local Data：{localCurrent.cycle}</div>
                                    <div className="relative text-gray-400 text-[12px]">Effective Date：{localCurrent.effective}</div>
                                    <div className="relative text-gray-400 text-[12px]">Expiry Date：{localCurrent.expire}</div>
                                    </> : 
                                        <div className="relative text-white text-[15px]" style={{color: 'orangered'}}>No local data trtrieved</div>
                                }
                            </div>
                        </div>
                        {
                            !isDownloading &&
                            <div className="relative flex w-full mt-2 mb-2 flex-nowrap justify-around">
                                <div onClick={handleDownload} className="relative w-[100px] cursor-pointer text-center text-[15px] rounded h-[22px]
                                leading-[22px] bg-[#51b2f7] duration-300 hover:bg-[#468fc4] text-black">Update Data</div>
                            </div>
                        }
                        {/* 仅在加载数据时显示进度条或error字样 */}
                        {
                            isDownloading &&
                            <div className="relative w-[80%] left-[10%] mt-[10px]">
                                {
                                    error ? <span className="text=[17px] text-center text-red-500 select-none">Data loading failed, please try again</span> : 
                                    <>
                                        <div className="relative flex justify-between text-white">
                                            <div className="relative text-[13px]">Downloading latest data...</div>
                                            <div className="relative text-[13px]">Downloading 7 data packages, total 30M</div>
                                        </div>
                                        <Progress percent={percent} showInfo={false} size={[340, 10]} 
                                        strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} />
                                    </>
                                }
                            </div>
                        }
                    </div>
            }
        </>
    )
}