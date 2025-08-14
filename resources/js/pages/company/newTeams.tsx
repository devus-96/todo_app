import { Input } from "@/components/ui/input";
import { useForm } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { FormEventHandler, useRef, useState } from "react";

export interface teamForm {
    name: string;
    description: string;
    mission: string;
}

export default function NewTeams () {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const [number, setNumber] = useState(1)
    const objectifRef = useRef<{[key: number]: string}>({})
    const { data, setData, post, processing} = useForm<Required<teamForm>>({
        name: '',
        description: '',
        mission: ''
    });
    function handeChangeMission (value: string) {
        const newObjectif  = {[`${number}`]: value};
        objectifRef.current = {...objectifRef.current, ...newObjectif}
        setData('mission', JSON.stringify(Object.values(objectifRef.current)))
    }
    
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/company');
    };
    return (
        <section>
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
              placeholder="New Team"
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
        </section>
    )
}