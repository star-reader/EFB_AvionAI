import getUTCString from "../../utils/getUTCString"

interface Props {
    ofp: OFP
}

export default ({ofp}: Props) => {
    //TODO 显示航班总体概览：人数、油量、机型等
    return (
        <div className="relative w-full flex justify-around items-center flex-wrap text-white">
            <div className="relative mt-2 w-[110px] flex justify-between items-center">
                <div className="relative font-bold select-none w-[160px]">Flight number</div>
                <div className="relative">{ofp.general.flightNumber}</div>
            </div>  
            <div className="relative mt-2 w-[48%] flex justify-between items-center">
                <div className="relative w-[48%] font-bold text-left select-none">Release time</div>
                <div className="relative w-[50%] text-center">{getUTCString().split(' ')[1]} UTC</div>
            </div>  
            <div className="relative mt-2 w-[48%] flex justify-between items-center">
                <div className="relative w-[48%] font-bold text-left select-none">Departure</div>
                <div className="relative w-[48%] text-center">{ofp.general.departure}</div>
            </div>  
            <div className="relative mt-2 w-[48%] flex justify-between items-center">
                <div className="relative w-[48%] font-bold text-left select-none">Arrival</div>
                <div className="relative w-[48%] text-center">{ofp.general.arrival}</div>
            </div>
            <div className="relative mt-2 w-[48%] flex justify-between items-center">
                <div className="relative w-[48%] font-bold text-left select-none">Passengers</div>
                <div className="relative w-[48%] text-center">{ofp.weight.passenger_number}</div>
            </div>  
            <div className="relative mt-2 w-[48%] flex justify-between items-center">
                <div className="relative w-[48%] font-bold text-left select-none">Cargo weight</div>
                <div className="relative w-[48%] text-center">{ofp.weight.cargo}kg</div>
            </div>
            <div className="relative mt-2 w-[48%] flex justify-between items-center">
                <div className="relative w-[48%] font-bold text-left select-none">Route distance</div>
                <div className="relative w-[48%] text-center">{ofp.general.ground_dist} nm</div>
            </div>  
            <div className="relative mt-2 w-[48%] flex justify-between items-center">
                <div className="relative w-[48%] font-bold text-left select-none">Cost index</div>
                <div className="relative w-[48%] text-center">{ofp.general.ci}</div>
            </div>
            <div className="relative mt-2 w-[48%] flex justify-between items-center">
                <div className="relative w-[48%] font-bold text-left select-none">Block fuel</div>
                <div className="relative w-[48%] text-center">{ofp.plannedFuel.block_fuel}kg</div>
            </div>  
            <div className="relative mt-2 w-[48%] flex justify-between items-center">
                <div className="relative w-[48%] font-bold text-left select-none">Final rev</div>
                <div className="relative w-[48%] text-center">{ofp.plannedFuel.finnal_rev}</div>
            </div>
            <div className="relative mt-2 w-[48%] flex justify-between items-center">
                <div className="relative w-[48%] font-bold text-left select-none">Max take off weight</div>
                <div className="relative w-[48%] text-center">{ofp.weight.take_off_weight}kg</div>
            </div>  
            <div className="relative mt-2 w-[48%] flex justify-between items-center">
                <div className="relative w-[48%] font-bold text-left select-none">Max landing weight</div>
                <div className="relative w-[48%] text-center">{ofp.weight.landing_max_weight}kg</div>
            </div>
            <div className="relative mt-2 w-[48%] flex justify-between items-center">
                <div className="relative w-[48%] font-bold text-left select-none">ZFW</div>
                <div className="relative w-[48%] text-center">{ofp.weight.ZFW}</div>
            </div>
            <div className="relative mt-2 w-[48%] flex justify-between items-center">
                <div className="relative w-[48%] font-bold text-left select-none">Payload weight</div>
                <div className="relative w-[48%] text-center">{ofp.weight.payload}kg</div>
            </div>
        </div>
    )
}