import {useState, useEffect} from 'react'
import { LoadingOutlined } from "@ant-design/icons"
import logoBase64 from "../assets/logoBase64"

export default () => {
    const [isShow, setIsShow] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsShow(false)
        }, 1900);
    })

    return (
        <>
        {
            isShow &&
            <div className="fixed left-0 top-0 w-full h-full z-[110] bg-[rgb(40,59,87)] select-none text-white">
                <div className="relative mt-[120px] w-full text-center h-[100px] flex justify-center">
                    <img src={logoBase64} alt="logo" style={{height: '100px'}} />
                </div>
                <div className="relative mt-[60px] text-[24px] text-center">Welcome to Avion-AI EFB</div>
                <div className="relative mt-[50px] w-full text-center">
                    <LoadingOutlined style={{fontSize: '30px', color: '#6495ED', fontWeight: 'bold'}} />
                </div>
                <div className="relative text-orange-400 text-[17px] mt-[25px] text-center">Avion-AI EFB System. <br /> 
                            Copyright &copy; 2021-{new Date().getFullYear()} Avion-AI All rights reserved</div>
            </div>
        }
        </>
    )
}