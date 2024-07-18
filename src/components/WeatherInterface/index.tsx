import { useState , useEffect } from 'react'
import pubsub from 'pubsub-js'
import Bar from './bar'

export default () => {
    // const [data, setData] = useState<Array<JeppesenChartList | AIPChartList> | undefined>()
    const [viewLeft, setViewLeft] = useState(true)
    const [phone, setPhone] = useState(false)
    const [show, setShow] = useState(false)

    useEffect(() => {
        pubsub.subscribe('click-flight', (_,view: number) => {
            if (!view){
                setViewLeft(true)
            }else{
                setViewLeft(false)
            }
        })
        pubsub.subscribe('click-notam', (_,view: number) => {
            if (!view){
                setViewLeft(true)
            }else{
                setViewLeft(false)
            }
        })
        pubsub.subscribe('click-weather', (_,view: number) => {
            if (!view){
                setViewLeft(true)
            }else{
                setViewLeft(false)
            }
        })
        pubsub.subscribe('click-airport', (_,view: number) => {
            if (!view){
                setViewLeft(true)
            }else{
                setViewLeft(false)
            }
        })
        pubsub.subscribe('click-setting', (_,view: number) => {
            if (!view){
                setViewLeft(true)
            }else{
                setViewLeft(false)
            }
        })
        pubsub.subscribe('click-docs', (_,view: number) => {
            if (!view){
                setViewLeft(true)
            }else{
                setViewLeft(false)
            }
        })
    
        //pubsub.subscribe('unload-flight',() => setData(undefined))
        pubsub.subscribe('common-close', () => setViewLeft(true))
    },[])

    useEffect(() => {
        const setWidth = () => {
            const width = document.body.scrollWidth
            width > 700 ? setPhone(false) : setPhone(true)
        }

        setWidth()
        addEventListener('resize', setWidth)
    },[])

    useEffect(() => {
        pubsub.subscribe('weather-radar', () => setShow(true))
        pubsub.subscribe('cancel-weather-radar', () => setShow(false))
    }, [])

    return (
        <>{
            show &&
            <div className="fixed bottom-0 width-calc-left right-0 h-[70px] duration-300 cursor-pointer overflow-hidden
            rounded-t-md bg-[#2d4364] z-[22] phone:left-0 phone:bottom-[50px] pb-[3px] weather-wrapper select-none"
            style={{animation: 'showWeatherButtom 0.4s', overflow: 'hidden'
            ,left: (viewLeft && !phone) ? '50px' : 'calc(20rem + 50px)'}}>
                <div className="title-area w-full h-[25px] mb-2 mt-1 flex justify-between text-white ml-[30px]">
                    <div className='relative h-[25px] pl-1 pr-1 w-[60px] text-[14px] rounded-lg cursor-pointer m-1 text-center leading-[25px]
                    hover:bg-[#176e7f]'
                    style={{'backgroundColor':'#174a7b', 'transitionDuration': '0.3s'}}>Weather</div>
                    <div className='center-title text-[15px] leading-[35px] w-[50px] font-bold'>
                      Radar
                    </div>
                    <div className='holder w-[50px]'></div>
                </div>
                <div className="relative w-[80%] left-[10%] h-[30px] m-2">
                    <Bar />
                </div>
            </div>
        }
        </>
    )
}