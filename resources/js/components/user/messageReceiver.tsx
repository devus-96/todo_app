import { Message } from "@/types"

export function MessageReceiver ({
   data
}:{ 
    data: Message
}) {
    return (
        <section className="w-full h-fit p-2 flex items-start justify-between border-t border-textprimary3/10 hover:bg-todosecondary cursor-pointer">
            <div className="mt-1 h-8 w-8 overflow-hidden rounded-full bg-blue-500/55 text-blue-500 flex justify-center items-center">
                <p>JN</p>
            </div>
            <div className="w-[380px]">
                <div className="flex items-center justify-between">
                    <p>John Doe</p>
                    <p className="text-xs">{data.send_at}</p>
                </div>
                <div><p className="font-bold text-lg !text-textprimary">{data.subject}</p></div>
                <div className="w-full h-[30px] text-ellipsis overflow-hidden">
                    <p className="font-semibold text-xs overflow-hidden text-ellipsis">{data.content}</p>
                </div>
            </div>
        </section>
    )
}