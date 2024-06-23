import { useState } from 'react';
import { Modal , Form , Input , Button , message } from 'antd';
// import axios from 'axios'
import pubsub from 'pubsub-js'
// import apiUrl from '../../config/api/apiUrl';
import background from '../../assets/loginBase64'
import NewItem from './NewItem'
// import { dataEncrypt } from '../../utils/crypto';
// import oAuth2 from '../../config/oAuth2';

// 图片
import global from '../../assets/preview/global.png'
import taxiway from '../../assets/preview/taxiway.png'
import plan from '../../assets/preview/plan.png'
import vfr from '../../assets/preview/vfr.png'
import aip from '../../assets/preview/aip.png'
import d3 from '../../assets/preview/3d.png'
import chinese from '../../assets/preview/chinese.png'
import notam from '../../assets/preview/notam.png'
import ownship from '../../assets/preview/ownship.png'
import pinboard from '../../assets/preview/pinboard.png'
import { dataEncrypt } from '../../utils/crypto';


export default () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    // const handleRegister = () => {
    //     return
    //     // window.open('https://pilot.skylineflyleague.cn/Register','SKYline Flyleague-注册飞行员中心编号',
    //     // "width=600,height=900,menubar=no,toolbar=no,location=no,status=no")
    // }
    
    const onFinish = (form: LoginForm) => {
        // form.time = Date.now()
        // const cert = dataEncrypt(form)
        // setIsModalOpen(false)
        // axios.post(apiUrl.login, {
        //     ...oAuth2,
        //     code_challenge: cert,
        //     code_verifier: dataEncrypt(Date.now().toString())
        // }).then(res => {
        //     if (res.data.code === 200){
        //         // 登录成功   保存登录证书、token、用户信息、时间
        //         const d = res.data
        //         localStorage.setItem('certificate', cert)
        //         localStorage.setItem('access_token', d.access_token)
        //         localStorage.setItem('userInfo', dataEncrypt(d.user))
        //         localStorage.setItem('refresh_time', d.login_time)
        //         message.success('登录成功！')
        //         pubsub.publish('token-ok', 1)
        //         pubsub.publish('login-success', 1)
        //     }else{
        //         message.error('登录失败，账号或密码错误')
        //     }
        // }).catch(() => {
        //     message.error('登录失败，账号或密码错误！')
        // })
        setIsModalOpen(false)
        if (form.username === 'AvionAI' && form.password === 'AvionAI-2024'){
            localStorage.setItem('cert_demo', dataEncrypt(form))
            pubsub.publish('login-success', 1)
        }else{
            message.error('Login failed!')
        }
    }

    return (
        <div className="fixed left-0 top-0 w-full h-full z-[100] select-none"
        style={{backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <div className="login-container relative left-[10%] w-[80%] rounded-[10px] z-[101] overflow-x-hidden overflow-y-auto"
            style={{backgroundImage: `linear-gradient(30deg,rgb(9 96 195 / 22%) 40%, rgb(24 221 201 / 39%)80%)`,
            backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)'}}>
                <div className="relative pt-[40px] text-white text-[28px] font-bold text-center phone:text-[20px] small:text-[18px]">Welcome to Avion-AI EFB</div>
                <div className="relative flex flex-wrap justify-between items-center w-[90%] left-[5%]">
                    <NewItem intro='Global Projection'>
                        <img src={global} alt='Global Projection' />
                    </NewItem>
                    <NewItem intro='Airport Diagram'>
                        <img src={taxiway} alt='Airport Diagram' />
                    </NewItem>
                    <NewItem intro='Flight Planning'>
                        <img src={plan} alt='Flight Planning' />
                    </NewItem>
                    <NewItem intro='VFR Feature Map'>
                        <img src={vfr} alt='VFR Feature Map' />
                    </NewItem>
                    <NewItem intro='Worldwide Charts'>
                        <img src={aip} alt='Worldwide Charts' />
                    </NewItem>
                    <NewItem intro='3D Terrain'>
                        <img src={d3} alt='3D Terrain' />
                    </NewItem>
                    <NewItem intro='Detail Information'>
                        <img src={chinese} alt='Detail Information' />
                    </NewItem>
                    <NewItem intro='NOTAM Data'>
                        <img src={notam} alt='NOTAM Data' />
                    </NewItem>
                    <NewItem intro='OwnShip Director'>
                        <img src={ownship} alt='OwnShip Director' />
                    </NewItem>
                    <NewItem intro='Charts Pinboard'>
                        <img src={pinboard} alt='Charts Pinboard' />
                    </NewItem>
                </div>
            </div>
            <div className="relative pt-[180px] mb-[30px] flex justify-center flex-wrap w-[60%] left-[20%] z-[104] phone:w-[90%] phone:left-[5%] text-white">
                {/* <div role='buttom' className="relative cursor-pointer h-[35px] leading-[35px] align-middle rounded-lg mb-3
                w-[150px] text-center text-[14px] small:text-[12px] bg-[#409EFF] hover:bg-[rgb(51,126,204)]" onClick={handleRegister}>没有账号?立即注册</div> */}
                <div role='buttom' className="relative cursor-pointer h-[35px] leading-[35px] align-middle rounded-lg
                w-[150px] text-center text-[14px] small:text-[12px] bg-[#67C23A] hover:bg-[rgb(82,155,46)]" onClick={() => setIsModalOpen(true)}>Login</div>
            </div>
            <Modal title="Please login" open={isModalOpen} onCancel={() => setIsModalOpen(false)}>
            <Form
                        name="new-waypoint"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item<LoginForm>
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please enter username' }]}
                        >
                        <Input />
                        </Form.Item>
                        <Form.Item<LoginForm>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please enter password'}]}
                        >
                        <Input type='password' />
                        </Form.Item>
                        <Form.Item
                        wrapperCol={{ span: 16, offset: 8 }}>
                        <Button className="login-form-submit" type="primary" htmlType="submit">
                            Login
                        </Button>
                        </Form.Item>
                    </Form>
            </Modal>
        </div>
    )
}