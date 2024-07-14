import { useEffect, useState } from "react"
import pubsub from 'pubsub-js'
import { Result } from "antd"
import PhoneDrag from "../common/PhoneDrag"
import Divider from "../common/Divider"

export default () => {
    const WINDOW = 'docs-panel'
    const [isShow, setIsShow] = useState(false)
    const [isHide, setIsHide] = useState(false)
    const [isMax, setIsMax] = useState(false)
    const [phone, setPhone] = useState(false)
    const [loading, setLoading] = useState(false)
    const [detail, setDetail] = useState(false)
    const [fail, setFail] = useState(false)
    //const [list, setList] = useState<NOTAMListStore[]>(getNOTAMList())
    //const [data, setData] = useState<NOTAMInfo[]>([])

    useEffect(() => {
        pubsub.subscribe('click-docs', (_,data: number) => {
            if (!data){
                setIsShow(false)
            }else{
                setIsShow(true)
                setIsHide(false)
                pubsub.publish('open-window', WINDOW)
            }
        })
        pubsub.subscribe('docs-panel-drag-up',() => {
            setIsMax(true)
        })
    
        pubsub.subscribe('docs-panel-drag-down',() => {
            setIsMax(false)
        })
        pubsub.subscribe('open-window',(_,data: string) => {
            if (data === WINDOW) return
            const width = document.body.scrollWidth
            if (width <= 700){
                setIsShow(false)
            }
        })
        pubsub.subscribe('open-common-window',(_,data: string) => {
            if (data === WINDOW) return
            setIsHide(true)
        })
        pubsub.subscribe('start-searching',() => {
            setIsHide(true)
        })
    },[])

    const handleClose = () => {
        if (detail){
            setDetail(false)
            //setList(getNOTAMList())
        }else{
            setIsShow(false)
            //! 刚才删除的
            pubsub.publish('common-close',2)
        }
        
    }

    useEffect(() => {
        const setWidth = () => {
            const width = document.body.scrollWidth
            width > 700 ? setPhone(false) : setPhone(true)
        }
        setWidth()
        addEventListener('resize', setWidth)
    },[])

    return (
        <>{
            isShow &&
          <div className="common-panel z-[22] absolute left-[50px] w-80 top-[50px] 
              bottom-0 rounded-r-md bg-[#2f4565] ani-show-common-panel phone:w-full phone:left-0 duration-300"
              style={{
                'top': phone ? isMax ? '50px' : '' : '',
                'height': phone ? isMax ? 'calc(100% - 100px)' : '' : '',
                'display': isHide ? 'none' : 'block'
              }}
              >
                  <PhoneDrag id={WINDOW} />
                  <div className="relative text-[19px] text-white text-center w-full 
                  select-none phone:mt-[-30px] mb-[12px]">User Customization</div>
                  <div onClick={handleClose} className="absolute top-[4px] right-[16px] w-[60px] mt-[4px]
                                text-[#66a5f7] text-[18px] select-none rounded text-center leading-[20px] 
                                cursor-pointer duration-200 hover:text-[#6084d9] phone:mt-[5px]">&lt;&nbsp;Return</div>
                      <div className="relative common-window-height w-full overflow-x-hidden overflow-y-auto">
                      <Result
                            status="warning"
                            title="ustomization documents and checklist functions are under development and will be officially released in future versions"
                        />
                        <Divider />
                      </div>
                  
              </div>
        } </>
    )
}