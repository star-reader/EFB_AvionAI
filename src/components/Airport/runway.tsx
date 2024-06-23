import { Result, Skeleton } from "antd"
import { useEffect, useState, memo } from "react"
import pubsub from 'pubsub-js'
import axios from 'axios'
import { ArrowRightOutlined, ArrowUpOutlined, ArrowDownOutlined, QuestionCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import apiUrl from "../../config/api/apiUrl"
import createHeader from "../../utils/createHeader"
import getRandom from "../../utils/getRandom"
import useGetWindComponents from "../../hooks/weather/useGetWindComponents"
import useGetMetarInfo from "../../hooks/weather/useGetMetarInfo"

export default memo(() => {
    const [loading, setLoading] = useState(true)
    const [fail, setFail] = useState(false)
    const [comList, setComList] = useState<RunwayList[]>([])
    const [info, setInfo] = useState('')

    useEffect(() => {
        pubsub.subscribeOnce('handle-airport-runway', (_,icao: string) => {
            setLoading(true)
            setFail(false)
            axios.get(`${apiUrl.runways}?icao=${icao}`,{'headers':createHeader()}).then(async res => {
                if (res.data.code === 200){
                    const metarInfo = await useGetMetarInfo(icao)
                    setInfo(metarInfo)
                    setLoading(false)
                    setFail(false)
                    setComList(res.data.data)
                }else{
                    setLoading(false)
                    setFail(true)
                }
            }).catch(() => {
                setLoading(false)
                setFail(true)
            })
        })
    })

    return (
        <div className="relative overflow-y-auto w-full search-calc-height" style={{padding:'0 5px'}}>
            {
                loading ? <Skeleton active paragraph={{'rows': 10}} /> :
                fail || !comList.length ? <Result
                    status="warning"
                    title="Loading failed, unknown error"
                /> :
                <div className="chart-list relative">
                    {
                        comList.map(d => {
                            const wind = useGetWindComponents(d as Runway, info)
                            return (
                                <div key={getRandom(16)} className="relative h-[45px] text-white pt-1 pb-1 text-[14px] text-center text-white\
                                flex justify-around items-center select-none cursor-pointer">
                                    <div className="relative w-[13%]">{d.ident}</div>
                                    <div className="relative w-[13%] h-[30px] text-[12px] p-1 rounded"
                                    style={{backgroundColor: wind.headWind === 'var' ? 'rgb(248,205,28)' : wind.headWind < 6 ? 'rgb(74,221,127)' :
                                    wind.headWind < 12 ? 'rgb(249,148,63)' : 'rgb(246,116,115)' }}>
                                        {
                                            wind.headWind === 'var' ? 
                                            <><QuestionCircleOutlined style={{position: 'relative', 'top': '-5px'}} /> <br /></> :
                                            wind.headWind > 0 ?
                                            <ArrowUpOutlined style={{position: 'relative', 'top': '-5px'}} /> :
                                            <ArrowDownOutlined style={{position: 'relative', 'top': '-5px'}} />
                                        }
                                        <span style={{position: 'relative', 'top': '-9px','fontSize':'11px'}}>
                                            {wind.headWind === 'var' ? 'Variable' : `${Math.abs(wind.headWind).toFixed()}knots`}
                                        </span>
                                    </div>
                                    <div className="relative w-[13%] h-[30px] text-[12px] p-1 rounded"
                                    style={{backgroundColor: wind.crossWind === 'var' ? 'rgb(248,205,28)' : wind.crossWind < 6 ? 'rgb(74,221,127)' :
                                    wind.crossWind < 12 ? 'rgb(249,148,63)' : 'rgb(246,116,115)' }}>
                                    {
                                            wind.crossWind === 'var' ? 
                                            <><QuestionCircleOutlined style={{position: 'relative', 'top': '-5px'}} /> <br /></> :
                                            wind.crossWind > 0 ?
                                            <ArrowRightOutlined style={{position: 'relative', 'top': '-5px'}} /> :
                                            <ArrowLeftOutlined style={{position: 'relative', 'top': '-5px'}} />
                                        }
                                        <span style={{position: 'relative', 'top': '-9px','fontSize':'11px'}}>
                                            {wind.crossWind === 'var' ? 'Variable' : `${Math.abs(wind.crossWind).toFixed()}knots`}
                                        </span>
                                    </div>
                                    <div className="relative w-[13%]">{d.heading.toFixed()}°</div>
                                    <div className="relative w-[13%]">{d.length}ft</div>
                                    <div className="relative w-[13%]">{d.width}ft</div>
                                    <div className="relative w-[13%]">{d.elevation}ft</div>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
})