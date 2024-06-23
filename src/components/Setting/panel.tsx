import { useEffect, useState } from "react"
import pubsub from 'pubsub-js'
import { Image, Modal} from "antd"
import PhoneDrag from "../common/PhoneDrag"
import Divider from "../common/Divider"
import getUserData from "../../utils/auth/getUserData"
import ShowBeta from "../common/showBeta"
import SimbriefUsername from "../User/simbriefUsername"
import { getSimbriefUser } from "../../hooks/user/useSimbrief"
import getPoints from "../../hooks/user/getPoints"
import getUserPoint from "../../utils/getUserPoint"
import logo from "../../assets/logo-b.png"

export default () => {
    // @ts-ignore
    const isTauri = window.__TAURI__ ? true : false
    const WINDOW = 'setting-panel'
    const [isShow, setIsShow] = useState(false)
    const [isHide, setIsHide] = useState(false)
    const [isMax, setIsMax] = useState(false)
    const [phone, setPhone] = useState(false)
    const [user, setUser] = useState<UserData>()
    const [point, setPoint] = useState(getPoints())
    const [simbrief, setSimbrief] = useState(getSimbriefUser())
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isAdminOpen, setIsAdminOpen] = useState(localStorage.getItem('123lic'))
    const version = 'V7.3.3'
    const admin = [
        '6189', '2287', '1398', '0732', '1082', '4790', '0407'
    ]

    type AdminField = {
        key: string
    }

    const formatTimeToHours = (time: number) =>{
        return parseFloat((time/3600).toFixed(2))
    }

    useEffect(() => {
        pubsub.subscribe('click-setting', (_,data: number) => {
            if (!data){
                setIsShow(false)
            }else{
                setIsShow(true)
                setIsHide(false)
                pubsub.publish('open-window', WINDOW)
            }
        })
        pubsub.subscribe('setting-panel-drag-up',() => {
            setIsMax(true)
        })
    
        pubsub.subscribe('setting-panel-drag-down',() => {
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
    },[])

    const handleClose = () => {
        setIsShow(false)
        pubsub.publish('common-close',2)
    }

    useEffect(() => {
        const setWidth = () => {
            const width = document.body.scrollWidth
            width > 700 ? setPhone(false) : setPhone(true)
        }
        setWidth()
        addEventListener('resize', setWidth)
    },[])

    useEffect(() => {
        const u = getUserData()
        setUser(u)
        pubsub.subscribe('simbrief-edit-over',(_, username: string) => {
            setSimbrief(username)
        })
        setInterval(() => setPoint(getPoints()), 5000)
        pubsub.subscribe('have-point',(_,point: number) => {
            setPoint(point)
        })
    }, [])

    const logOut = () => {
        localStorage.removeItem('cert_demo')
        localStorage.removeItem('access_token')
        // localStorage.removeItem('userInfo')
        localStorage.removeItem('refresh_time')
        pubsub.publish('logout-user', 1)
    }

    const changeSimbrief = () => {
        pubsub.publish('show-simbrief-edit-panel', 1)
    }

    const uploadData = () => {
        pubsub.publish('show-file-upload-panel', 1)
    }

    // const openDataManagement = () => {
    //     pubsub.publish('open-data-shp', 1)
    // }

    const gotoDonate = () => {
        open('https://www.avion-ai.com/',"menubar=no,toolbar=no,location=no,status=no")
    }

    const refreshPoint = () => {
        getUserPoint()
    }

    // const adminAuth = (data: AdminField) => {
    //     setIsModalOpen(false)
    //     try {
    //         let authName = dataDecrypt(data.key)
    //         if (authName === getUserData()?.Username){
    //             localStorage.setItem('123lic', data.key)
    //             setIsAdminOpen(data.key)
    //             message.success('Auth successful')
    //         }
    //     } catch (error) {
    //         message.error('Auth failed')
    //     }
    // }

    const cancelAdminAuth = () => {
        localStorage.removeItem('123lic')
        setIsAdminOpen(null)
    }

    return (
        <>
        <Modal title="Basic Modal" open={isModalOpen} onCancel={() => setIsModalOpen(false)}>
        {/* <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={adminAuth}
            autoComplete="off"
        >
            <Form.Item<AdminField>
            label="Authorization key"
            name="key"
            rules={[{ required: true, message: '请输入授权密钥' }]}
            >
            <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                激活设备
            </Button>
            </Form.Item>
        </Form> */}
        </Modal>
        {
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
                  select-none phone:mt-[-30px] mb-[12px]">User setting</div>
                  <div onClick={handleClose} className="absolute top-[4px] right-[16px] w-[60px] mt-[4px]
                        text-[#66a5f7] text-[18px] select-none rounded text-center leading-[20px] 
                        cursor-pointer duration-200 hover:text-[#6084d9] phone:mt-[5px]">&lt;&nbsp;Back</div>
                    <div className="relative common-window-height w-full overflow-x-hidden overflow-y-auto">
                        <div className="relative m-1 ml-3 text-white font-bold text-[15px] select-none">UserInfo</div>
                        <div className="relative m-2 flex items-center justify-around">
                            <div className="avatar w-[100px] h-[100px] rounded-[50%] overflow-hidden">
                                <Image width={100} src={logo} />
                            </div>
                            {/* <span className="relative left-[-40px] top-[20px] w-[20px] h-[20px] select-none">
                                {
                                    user?.AuthorizeType &&
                                    <img src={
                                        `./AuthIcon/${user?.AuthorizeType === 'developAuthorize' ? 'admin' : user?.AuthorizeType === 'personalAuthorize' ? 'personal' : ''}.svg`
                                    } alt="auth_icon" />
                                }
                            </span> */}
                            <div className="relative" style={{'width': `calc(90% - 120px)`}}>
                                <div className="relative w-full flex justify-around text-white select-none">
                                    <div className="relative text-gray-400">Username</div>
                                    <div className="relative text-white">Avion-AI</div>
                                </div>
                                <div className="relative w-full flex justify-around text-white select-none">
                                    <div className="relative text-gray-400">Server</div>
                                    <div className="relative text-white">Official</div>
                                </div>
                                {/* <div className="relative w-full flex justify-around text-white select-none">
                                    <div className="relative text-gray-400">管制时长</div>
                                    <div className="relative text-white">{formatTimeToHours(user?.ATCTIME as number)}h</div>
                                </div>
                                <div className="relative w-full flex justify-around text-white select-none">
                                    <div className="relative text-gray-400">当前积分</div>
                                    <div className="relative text-white">{point}</div>
                                </div> */}
                            </div>
                        </div>
                        {/* <div role="button" className="relative mt-3 h-[30px] w-[60%] left-[20%] text-center bg-pink-500 rounded-lg select-none text-white
                        text-[14px] leading-[20px] p-[4px] mb-2 cursor-pointer hover:bg-pink-600" onClick={refreshPoint}>刷新积分数据</div>
                        {
                            admin.includes(getUserData()?.Username as string) && !isAdminOpen &&
                            <div role="button" className="relative mt-3 h-[30px] w-[60%] left-[20%] text-center
                            bg-green-500 rounded-lg select-none text-white text-[14px] leading-[20px]
                            p-[4px] mb-2 cursor-pointer hover:bg-green-600" onClick={() => setIsModalOpen(true)}>激活授权设备</div>
                        }
                        {
                            admin.includes(getUserData()?.Username as string) && isAdminOpen &&
                            <div role="button" className="relative mt-3 h-[30px] w-[60%] left-[20%] text-center
                            bg-green-500 rounded-lg select-none text-white text-[14px] leading-[20px]
                            p-[4px] mb-2 cursor-pointer hover:bg-green-600" onClick={cancelAdminAuth}>取消激活授权</div>
                        } */}
                        {/* <div role="button" className="relative mt-3 h-[30px] w-[60%] left-[20%] text-center bg-sky-500 rounded-lg select-none text-white
                        text-[14px] leading-[20px] p-[4px] mb-2 cursor-pointer hover:bg-sky-600" onClick={gotoDonate}>View Homepage</div>
                        <div className="relative m-1 ml-3 text-white font-bold text-[15px] select-none">积分规则</div>
                        <div className="relative text-white text-[14px] m-2 ml-3">EFB运行一小时消耗1积分</div>
                        <div className="relative text-white text-[14px] m-2 ml-3">同时使用Navlink一小时消耗8积分(已连接在线服务器则不消耗)</div>
                        <div className="relative text-white text-[14px] m-2 ml-3">在线服务器联飞一小时可获得5积分</div>
                        <div className="relative text-white text-[14px] m-2 ml-3">管制服务下联飞一小时可获得15积分</div>
                        <div className="relative text-white text-[14px] m-2 ml-3">赞助平台额外奖励积分(￥30=100积分，可累加)</div>
                        <div className="relative m-1 ml-3 text-white font-bold text-[15px] select-none">客制化
                            <ShowBeta text='Coming soon' content="用户客制化包括允许自定义修改EFB主题颜色、自定义上传文档等内容、自定义航图数据、自定义配置数据等。该功能目前还在测试中，将在未来的版本中上线发布" />
                        </div>
                        <div style={{display: 'none'}} role="button" onClick={uploadData} className="relative mt-3 h-[30px] w-[60%] left-[20%] text-center bg-green-500 rounded-lg select-none text-white
                        text-[14px] leading-[20px] p-[4px] mb-2 cursor-pointer hover:bg-green-700">上传客制化PDF文档</div>
                        <div className="relative m-1 ml-3 text-white font-bold text-[15px] select-none">登录设置</div>
                        <div className="relative text-white text-[15px] m-2 ml-3 select-none">Simbrief用户名： { simbrief ? simbrief : '未登录' }</div>
                        <div role="button" className="relative mt-3 h-[30px] w-[60%] left-[20%] text-center bg-blue-500 rounded-lg select-none text-white
                        text-[14px] leading-[20px] p-[4px] mb-2 cursor-pointer hover:bg-blue-600" onClick={changeSimbrief}>修改Simbrief用户名</div> */}
                        <div role="button" className="relative mt-3 h-[30px] w-[60%] left-[20%] text-center bg-orange-600 rounded-lg select-none text-white
                        text-[14px] leading-[20px] p-[4px] mb-2 cursor-pointer hover:bg-orange-700" onClick={logOut}>Log out</div>

                        <div className="relative m-1 ml-3 text-white font-bold text-[15px] select-none">System Info</div>
                        <div className="relative text-white text-[15px] m-2 ml-3 select-none">Version： 0.1.0 demo</div>

                        <div className="relative m-1 ml-3 text-white font-bold text-[15px] select-none">Third-Party Data Sources</div>
                        <div className="relative text-white text-[15px] m-2 ml-3 select-none">Enroute： Mapbox</div>
                        <div className="relative text-white text-[15px] m-2 ml-3 select-none">Charts：Jeppesen</div>
                        <div className="relative text-white text-[15px] m-2 ml-3 select-none">Navdata：Jeppesen</div>
                        <div className="relative text-white text-[15px] m-2 ml-3 select-none">AIP Charts：CAAC ATMB</div>
                        <div className="relative text-white text-[15px] m-2 ml-3 select-none">Airport Diagram：OpenStreetMap</div>
                        <div className="relative text-white text-[15px] m-2 ml-3 select-none">Weather Radar：Rain Viewer</div>

                        <div className="relative text-orange-400 text-[14px] m-2 ml-3 select-none">Avion-AI EFB System. <br /> 
                        Copyright &copy; 2021-{new Date().getFullYear()} Avion-AI All rights reserved</div>

                        {/* <div className="relative m-1 ml-3 text-white font-bold text-[15px] select-none">更新日志</div>
                        <div className="relative text-white text-[15px] m-2 ml-3 select-none font-bold">- V7.3.3 航路图数据</div>
                        <div className="relative text-gray-400 text-[14px] m-2 ml-4 select-none">- 取消本地数据，不同设备使用EFB无需下载航路图数据</div>
                        <div className="relative text-gray-400 text-[14px] m-2 ml-4 select-none">- 修复手机端搜索框问题</div>
                        <div className="relative text-gray-400 text-[14px] m-2 ml-4 select-none">- 修改一些UI效果</div>
                        <div className="relative text-white text-[15px] m-2 ml-3 select-none font-bold">- V7.3.2  bug修复</div>
                        <div className="relative text-gray-400 text-[14px] m-2 ml-4 select-none">- 修复AIP图层添加后遮盖航路显示的问题</div>
                        <div className="relative text-gray-400 text-[14px] m-2 ml-4 select-none">- 修复进离场推荐程序选择</div>
                        <div className="relative text-gray-400 text-[14px] m-2 ml-4 select-none">- 修改部分显示效果</div>
                        <div className="relative text-white text-[15px] m-2 ml-3 select-none font-bold">- V7.3.1  部分UI更改、bug修复</div>
                        <div className="relative text-gray-400 text-[14px] m-2 ml-4 select-none">- 新增AIP航路图夜间模式图层</div>
                        <div className="relative text-gray-400 text-[14px] m-2 ml-4 select-none">- 修复卫星图放大显示的问题</div>
                        <div className="relative text-gray-400 text-[14px] m-2 ml-4 select-none">- 调整跑道选择、进离场选择UI样式</div>
                        <div className="relative text-gray-400 text-[14px] m-2 ml-4 select-none">- 调整部分文字提示内容方向</div>
                        <div className="relative text-gray-400 text-[14px] m-2 ml-4 select-none">- 更改部分已知问题</div>
                        <div className="relative text-white text-[15px] m-2 ml-3 select-none font-bold">- V7.3.0  AIP图层、进离场绘制等</div>
                        <div className="relative text-gray-400 text-[14px] m-2 ml-4 select-none">- 新增AIP航路图图层</div>
                        <div className="relative text-gray-400 text-[14px] m-2 ml-4 select-none">- 支持进离场程序绘制(实验性功能，还在不断完善，航迹仅作参考)</div>
                        <div className="relative text-gray-400 text-[14px] m-2 ml-4 select-none">- 支持显示积分规则</div>
                        <div className="relative text-gray-400 text-[14px] m-2 ml-4 select-none">- 支持自定义航路点上传机场类型数据</div>
                        <div className="relative text-gray-400 text-[14px] m-2 ml-4 select-none">- 修改部分UI效果</div>
                        <div className="relative text-white text-[15px] m-2 ml-3 select-none font-bold">- V7.2.0  Android软件、离线版数据</div>
                        <div className="relative text-gray-400 text-[14px] m-2 ml-4 select-none">- 发布Android版本软件</div>
                        <div className="relative text-gray-400 text-[14px] m-2 ml-4 select-none">- Android和Web版也可以离线保存数据</div>
                        <div className="relative text-gray-400 text-[14px] m-2 ml-4 select-none">- 新增Navlink功能，不参与联飞也可以使用Ownship功能</div>
                        <div className="relative text-gray-400 text-[14px] m-2 ml-4 select-none">- 修改航班创建失败的提示效果</div>
                        <div className="relative text-gray-400 text-[14px] m-2 ml-4 select-none">- 修复航班列表里QNH显示效果问题</div>
                        <div className="relative text-gray-400 text-[14px] m-2 ml-4 select-none">- 修复机场信息加载问题</div>
                        <div className="relative text-gray-400 text-[14px] m-2 ml-4 select-none">- 修复Simbrief性能数据问题</div>
                        <div className="relative text-white text-[15px] m-2 ml-3 select-none">- V7.1.1  Alpha-bug修复</div>
                        <div className="relative text-white text-[15px] m-2 ml-3 select-none">- V7.1.0  Alpha-增加离线版数据</div>
                        <div className="relative text-white text-[15px] m-2 ml-3 select-none">- V7.0.1  Alpha内测版本更新</div>
                        <div className="relative text-white text-[15px] m-2 ml-3 select-none">- V7.0.0  初次发布</div> */}
                    </div>
                <Divider />
                <SimbriefUsername />
              </div>
        } </>
    )
}