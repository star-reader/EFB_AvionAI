import { LightHouse , HeavyRain , MessageSuccess,
         InFlight , PersonalPrivacy } from '@icon-park/react'
import { useState , useEffect } from 'react'
import { Tooltip } from 'antd'
import pubsub from 'pubsub-js'
import LeftButton from "../../components/common/LeftButton"


export default () => {
    const [status, setStatus] = useState(Array(8).fill(false))
    const [phone, setPhone] = useState(false)

    const handleClick = (index: number) => {
        const arr = Array(8).fill(false)
        arr[index] = 1
        
        switch (index) {
            case 0:
                if (status[index] === 1){
                    //之前已经打开了，点击关闭
                    arr[index] = false
                    pubsub.publish('click-airport',0)
                }else{
                    pubsub.publish('click-airport',1)
                    pubsub.publish('open-common-window','airport-panel')
                }
                break;
            case 1:
                if (status[index] === 1){
                    //之前已经打开了，点击关闭
                    arr[index] = false
                    pubsub.publish('click-flight',0)
                }else{
                    pubsub.publish('click-flight',1)
                    pubsub.publish('open-common-window','flight-panel')
                }
                break;
            case 2:
                if (status[index] === 1){
                    //之前已经打开了，点击关闭
                    arr[index] = false
                    pubsub.publish('click-weather',0)
                }else{
                    pubsub.publish('click-weather',1)
                    pubsub.publish('open-common-window','weather-panel')
                }
                break;
            case 3:
                if (status[index] === 1){
                    //之前已经打开了，点击关闭
                    arr[index] = false
                    pubsub.publish('click-notam',0)
                }else{
                    pubsub.publish('click-notam',1)
                    pubsub.publish('open-common-window','notam-panel')
                }
                break;
            case 4:
                if (status[index] === 1){
                    //之前已经打开了，点击关闭
                    arr[index] = false
                    pubsub.publish('click-docs',0)
                }else{
                    pubsub.publish('click-docs',1)
                    pubsub.publish('open-common-window','docs-panel')
                }
                break;
            case 5:
                if (status[index] === 1){
                    //之前已经打开了，点击关闭
                    arr[index] = false
                    pubsub.publish('click-setting',0)
                }else{
                    pubsub.publish('click-setting',1)
                    pubsub.publish('open-common-window','setting-panel')
                }
                break;
            case 6:
                if (status[index] === 1){
                    //之前已经打开了，点击关闭
                    arr[index] = false
                    pubsub.publish('click-enroute',0)
                }else{
                    pubsub.publish('click-enroute',1)
                    // pubsub.publish('open-common-window','setting-panel')
                }
                break;
        
            default:
                break;
        }
        setStatus(arr)
    }

    useEffect(() => {
        pubsub.subscribe('common-close',() => {
            const arr = Array(8).fill(false)
            setStatus(arr)
        })
    },[])

    useEffect(() => {
        const setIsPhone = () => {
            const width = document.body.clientWidth
            if (width < 700){
                setPhone(true)
            }else{
                setPhone(false)
            }
        }

        setIsPhone()
        addEventListener('resize', () => setIsPhone())
    })

    return (
        <div className="nav-left fixed top-0 left-0 w-[50px] h-[100%] bg-[#3a4d69] z-[55] select-none
        phone:h-[50px] t-calc-full-minus-50px phone:w-full">
            <div className="relative mt-[80px] ml-[9px] phone:flex phone:justify-around phone:mt-[-6px]">
                <LeftButton isActive={status[0]} index={0} handleClick={handleClick}>
                    <Tooltip placement={phone ? 'top' : 'right'} title="Airport">
                        <LightHouse theme="outline" size="30" fill="#ffffff"/>
                    </Tooltip>
                </LeftButton>
                <LeftButton isActive={status[1]} index={1} handleClick={handleClick}>
                    <Tooltip placement={phone ? 'top' : 'right'} title="Flight">
                        <InFlight theme="outline" size="28" fill="#ffffff"/>
                    </Tooltip>
                </LeftButton>
                <LeftButton isActive={status[2]} index={2} handleClick={handleClick}>
                    <Tooltip placement={phone ? 'top' : 'right'} title="Weather">
                        <HeavyRain theme="outline" size="30" fill="#ffffff"/>
                    </Tooltip>
                </LeftButton>
                <LeftButton isActive={status[3]} index={3} handleClick={handleClick}>
                    <Tooltip placement={phone ? 'top' : 'right'} title="NOTAM">
                        <MessageSuccess theme="outline" size="30" fill="#ffffff"/>
                    </Tooltip>
                </LeftButton>
                <LeftButton isActive={status[5]} index={5} handleClick={handleClick}>
                    <Tooltip placement={phone ? 'top' : 'right'} title="Setting">
                        <PersonalPrivacy theme="outline" size="28" fill="#ffffff"/>
                    </Tooltip>
                </LeftButton>
            </div>
        </div>
    )
}