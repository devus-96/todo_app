import { Todo } from "@/types"
import { Checkbox } from "@radix-ui/react-checkbox"

export const HistoriqueTable = ({
    item, 
}:{
    item: Todo, 
}) => {
    return (
        <tr className="border">
            <td className="border-l border-r border-t flex items-center p-2 space-x-2">
                <Checkbox className="border w-5 h-5" checked={true}></Checkbox>
                <p className="">{item.name}</p>
            </td>
            <td className="border-l border-r border-t"><p>{item.state}</p></td>
            <td className="border-l border-r border-t"><p>{item.priority}</p></td>
            <td className="border-l border-r border-t"><p>{item.start_at}</p></td>
            <td className="border-l border-r border-t"><p>{item.finish_at}</p></td>
        </tr>
    )
}