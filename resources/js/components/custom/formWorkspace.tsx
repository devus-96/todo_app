import { Input } from "../ui/input"
import { SetDataAction } from "@inertiajs/react"
import { companyForm } from "../popup/sheetCompany"
import { LoaderCircle, Plus } from "lucide-react"
import { Button } from "../ui/button"
import { teamForm } from "@/pages/company/newTeams"
import { useRef, useState } from "react"

export function FormWorkSpace ({
    data,
    submit,
    processing,
    setData,
    placeholder
}:{
    data: teamForm | companyForm,
    submit: React.FormEventHandler,
    processing: boolean,
    setData: SetDataAction<Required<companyForm | teamForm>>,
    placeholder: string
}) {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const [number, setNumber] = useState(1)
    const objectifRef = useRef<{[key: number]: string}>({})

    function handeChangeMission (value: string) {
        const newObjectif  = {[`${number}`]: value};
        objectifRef.current = {...objectifRef.current, ...newObjectif}
        setData('mission', JSON.stringify(Object.values(objectifRef.current)))
    }
    return  (
        <form onSubmit={submit}>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <Input
              id="name"
              type="text"
              required
              autoFocus
              tabIndex={1}
              autoComplete="name"
              value={data.name}
              onChange={(e) => {setData('name', e.target.value)}}
              disabled={processing}
              className="w-full border-none !outline-none focus-visible:bg-todoprimary focus-visible:ring-[0px] placeholder:text-textprimary3 placeholder:font-bold !text-4xl bg-transparent text-textprimary"
              placeholder={placeholder}
            />

            <div>
                <p className="text-xs ml-2 text-text">Description</p>
                <textarea 
                  id="description"
                  autoFocus
                  tabIndex={2}
                  autoComplete="description"
                  value={data.description}
                  onChange={(e) => {setData('description', e.target.value)}}
                  disabled={processing}
                  className="border-b w-full p-2 rounded-none text-textprimary outline-none placeholder:font-light"
                  placeholder='add description'
               ></textarea>
            </div>

            <div className="flex flex-col gap-1 px-4">
            {Array.from({ length: number }).map((_,index) => (
                <div key={index} className="flex items-start gap-1 px-4">
                    <div onClick={() => setNumber((prev) => prev+1)} className="w-8 h-8 cursor-pointer flex items-center justify-center rounded bg-todosecondary hover:bg-todoprimary text-textprimary3 hover:text-textprimary">
                        <Plus />
                    </div>
                    <textarea 
                        id="description"
                        autoFocus
                        tabIndex={2}
                        ref={textareaRef}
                        autoComplete="description"
                        onChange={(e) => handeChangeMission(e.target.value)}
                        disabled={processing}
                        className="border-none resize-none overflow-hidden text-textprimary w-full p-2 rounded-none outline-none placeholder:font-light"
                        placeholder='add mission'
                    ></textarea>
                </div>
            ))}
            </div>
          </div>

          <Button type="submit" className="cursor-pointer ml-4 w-[]">
            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
              Create
            </Button>
        </form>
    )
}