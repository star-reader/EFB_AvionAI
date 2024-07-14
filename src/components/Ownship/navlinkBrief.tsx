interface Props {
    d: NavLink
}

export default ({d}: Props) => {
    //TODO 显示航班总体概览：人数、油量、机型等
    return (
        <div className="relative w-full flex justify-around items-center flex-wrap text-white">
            <div className="relative mt-2 w-[48%] flex justify-between items-center">
                <div className="relative w-[48%] font-bold text-left select-none">Heading</div> {/* 航向 */}
                <div className="relative w-[48%] text-center">{d.heading.toFixed()}°</div>
            </div>  
            <div className="relative mt-2 w-[48%] flex justify-between items-center">
                <div className="relative w-[48%] font-bold text-left select-none">Transponder</div> {/* 应答机 */}
                <div className="relative w-[48%] text-center">{d.transponder}</div>
            </div>
            <div className="relative mt-2 w-[48%] flex justify-between items-center">
                <div className="relative w-[48%] font-bold text-left select-none">Ground Speed</div> {/* 地速 */}
                <div className="relative w-[48%] text-center">{d.groundspeed} knots</div>
            </div>  
            <div className="relative mt-2 w-[48%] flex justify-between items-center">
                <div className="relative w-[48%] font-bold text-left select-none">Altitude</div> {/* 高度 */}
                <div className="relative w-[48%] text-center">{d.altitude}ft</div>
            </div>
            <div className="relative mt-2 w-[48%] flex justify-between items-center">
                <div className="relative w-[48%] font-bold text-left select-none">Bank Angle</div> {/* 倾角 */}
                <div className="relative w-[48%] text-center">{d.bank.toFixed(2)}°</div>
            </div>  
            <div className="relative mt-2 w-[48%] flex justify-between items-center">
                <div className="relative w-[48%] font-bold text-left select-none">Pitch Angle</div> {/* 仰角 */}
                <div className="relative w-[48%] text-center">{d.pitch.toFixed(2)}°</div>
            </div>
            {/* <div className="relative mt-2 w-[48%] flex justify-between items-center">
                <div className="relative w-[48%] font-bold text-left select-none">latitude</div>
                <div className="relative w-[48%] text-center">{d.groundspeed}</div>
            </div>  
            <div className="relative mt-2 w-[48%] flex justify-between items-center">
                <div className="relative w-[48%] font-bold text-left select-none">longitude</div>
                <div className="relative w-[48%] text-center">{d.altitude}</div>
            </div> */}
            {/* <div className="relative mt-2 w-[48%] flex justify-between items-center">
                <div className="relative w-[48%] font-bold text-left select-none">Departure Airport</div>
                <div className="relative w-[48%] text-center">{d.departure}</div>
            </div>  
            <div className="relative mt-2 w-[48%] flex justify-between items-center">
                <div className="relative w-[48%] font-bold text-left select-none">Landing Airport</div>
                <div className="relative w-[48%] text-center">{d.arrival}</div>
            </div> */}
        </div>
    )
}