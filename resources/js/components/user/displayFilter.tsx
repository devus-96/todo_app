import { X } from "lucide-react"
import { filterType } from "./filters"

export function DisplayFilter ({
    filterTab,
    setFilterTab
}:{
    filterTab: filterType,
    setFilterTab: React.Dispatch<React.SetStateAction<filterType>>,
}) {
    return (
        <section className="w-full h-fit">
            {Object.values(filterTab).filter((item) => item !== '').length !== 0 &&
            <section className="w-full flex items-center border-b border-borderCard px-4 py-2 space-x-4">
                {Object.entries(filterTab).filter((item) => item[1] !== '').map((item, index) => {
                return (
                <div key={index} className="text-xs flex items-center justify-between px-4 py-1 rounded-full border border-btnColor text-btnColor">
                    <p className="mr-4">{item[0]}: {item[1]}</p>
                    <X className="cursor-pointer" size={12} onClick={() => {
                        setFilterTab((list) => {
                            const newValue = {[item[0]]: ''}
                            return {...list, ...newValue}
                        })
                    }} />
                </div>
                )
                })} 
            </section>
            }
        </section>
    )
}