interface Props {
    d: TrafficData
}

export default ({d}: Props) => {
    //TODO 显示航班总体概览：人数、油量、机型等
    return (
        <div className="relative w-full flex justify-around items-center flex-wrap text-white">
            <div className="relative mt-2 w-[110px] flex justify-between items-center">
                <div className="relative font-bold select-none w-[160px]">Callsign</div> {/* 呼号 */}
                <div className="relative">{d.callsign}</div>
            </div>  
            <div className="relative mt-2 w-[48%] flex justify-between items-center">
                <div className="relative w-[48%] font-bold text-left select-none">Pilot</div> {/* 飞行员 */}
                <div className="relative w-[48%] text-center">{d.cid}</div>
            </div>  
            <div className="relative mt-2 w-[48%] flex justify-between items-center">
                <div className="relative w-[48%] font-bold text-left select-none">Heading</div> {/* 航向 */}
                <div className="relative w-[48%] text-center">{d.heading.toFixed()}°</div>
            </div>  
            <div className="relative mt-2 w-[48%] flex justify-between items-center">
                <div className="relative w-[48%] font-bold text-left select-none">Transponder</div> {/* 应答机 */}
                <div className="relative w-[48%] text-center">{d.squawk}</div>
            </div>
            <div className="relative mt-2 w-[48%] flex justify-between items-center">
                <div className="relative w-[48%] font-bold text-left select-none">Ground Speed</div> {/* 地速 */}
                <div className="relative w-[48%] text-center">{d.speed} knots</div>
            </div>  
            <div className="relative mt-2 w-[48%] flex justify-between items-center">
                <div className="relative w-[48%] font-bold text-left select-none">Altitude</div> {/* 高度 */}
                <div className="relative w-[48%] text-center">{d.altitude}ft</div>
            </div>
            <div className="relative mt-2 w-[48%] flex justify-between items-center">
                <div className="relative w-[48%] font-bold text-left select-none">Departure Airport</div> {/* 起飞机场 */}
                <div className="relative w-[48%] text-center">{d.departure}</div>
            </div>  
            <div className="relative mt-2 w-[48%] flex justify-between items-center">
                <div className="relative w-[48%] font-bold text-left select-none">Arrival Airport</div> {/* 到达机场 */}
                <div className="relative w-[48%] text-center">{d.arrival}</div>
            </div>
        </div>
    )
}