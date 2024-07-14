import { useEffect, useState } from "react"
import { Progress } from "antd"
import pubsub from 'pubsub-js'
import { dataDecrypt } from "../../utils/crypto";
import { downloadData } from "../../hooks/map/useMapStyle";


export default () => {

    const [show, setShow] = useState(false)
    const [notAvail, setNotAvail] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false)
    const [percent, setPercent] = useState<number>(0)

    useEffect(() => {
        pubsub.subscribe('picker-start',() => {
            setShow(true)
        })
        pubsub.subscribe('no-picker-api-available',() => {
            setShow(true)
            setNotAvail(true)
        })
        pubsub.subscribe('enroute-data-load',(_, data: number) => {
            setPercent(data)
        })
    },[])

    const handleClose = () => {
        setShow(false)
    }

    const handleSelect = async () => {
        // 请求用户选择文件夹
        // @ts-ignore
        const dirHandle = await window.showDirectoryPicker()
        console.log(dirHandle)
        // 遍历文件夹内的条目
        let result: EnrouteData = {
            airports: [],
            vors: [],
            ndbs: [],
            waypoints: [],
            airways: [],
            firs: [],
            grid: []
        }
        for await (const entry of dirHandle.values()) {
            switch (entry.name) {
                case 'airports.db':
                    {
                        const file = await entry.getFile()
                        const content = await file.text()
                        result.airports = JSON.parse(dataDecrypt(content))
                        break
                    }
                case 'airways.db':
                    {
                        const file = await entry.getFile()
                        const content = await file.text()
                        result.airways = JSON.parse(dataDecrypt(content))
                        break
                    }
                case 'fir.db':
                    {
                        const file = await entry.getFile()
                        const content = await file.text()
                        result.firs = JSON.parse(dataDecrypt(content))
                        break
                    }
                case 'grid.db':
                    {
                        const file = await entry.getFile()
                        const content = await file.text()
                        result.grid = JSON.parse(dataDecrypt(content))
                        break
                    }
                case 'ndbs.db':
                    {
                        const file = await entry.getFile()
                        const content = await file.text()
                        result.ndbs = JSON.parse(dataDecrypt(content))
                        break
                    }
                case 'vors.db':
                    {
                        const file = await entry.getFile()
                        const content = await file.text()
                        result.vors = JSON.parse(dataDecrypt(content))
                        break
                    }
                case 'waypoints.db':
                    {
                        const file = await entry.getFile()
                        const content = await file.text()
                        result.waypoints = JSON.parse(dataDecrypt(content))
                        break
                    }
                default:
                    break;
            }
        }
        pubsub.publish('shp-loaded-main', result)
        setShow(false)
    }

    const downloadFromServer = async () => {
        setIsDownloading(true)
        const d = await downloadData(true)
        setIsDownloading(false)
        pubsub.publish('shp-loaded-main', d)
        setShow(false)
    }

    return (
        <>
        {
            show &&
            <div className="fixed w-full h-full flex left-0 top-0 justify-center items-center z-[40] select-none ">
                <div className="absolute w-[300px] h-[180px] pt-2 rounded-md bg-[#2f4565] phone:top-[80px] manually-picker">
                    <div className="relative text-[16px] text-white text-center">Select Enroute Data</div>
                    <div onClick={handleClose} className="absolute top-[10px] right-[6px] mt-[3px] 
                        text-[13px] bg-[#e26e4b] rounded text-white select-none
                            text-center hover:bg-[#bd5d40] leading-[16px] 
                        cursor-pointer duration-200 phone:mt-[5px] pt-[-2px] pb-[2px] pl-[6px] pr-[6px]">Close
                    </div>
                    <div className="relative text-white mt-2 text-[14px] w-[80%] left-[10%]">请选择航路图数据所在的文件夹。每期最新的数据可在QQ群文件内获取</div>
                    {
                        notAvail && <div className="relative text-[orangered] text-[14px] text-center">Due to browser version and permission control issues, the current version does not support file selection. Please try another device or browser.</div>
                    }
                    <div className="relative flex w-full mt-2 flex-nowrap justify-around items-center">
                        {
                            !notAvail &&
                            <div onClick={handleSelect} className="relative w-[100px] cursor-pointer text-center text-[15px] rounded h-[22px]
                            leading-[22px] bg-[#51b2f7] duration-300 hover:bg-[#468fc4] text-black">Select Folder</div>
                        }
                        <div onClick={downloadFromServer} className="relative w-[100px] cursor-pointer text-center text-[15px] rounded h-[22px]
                            leading-[22px] bg-[#3bd47b] duration-300 hover:bg-[#39a566] text-black">Download from Server</div>
                    </div>
                    {
                        isDownloading &&
                        <Progress percent={percent} showInfo={false} size={[340, 10]} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} style={{'marginBottom': '5px'}} />
                    }
                </div>
            </div>
        }
        </>
    )
}