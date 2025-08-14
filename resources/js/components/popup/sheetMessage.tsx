import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { LoaderCircle } from "lucide-react"
import { Input } from "../ui/input"
import { useForm } from "@inertiajs/react"

type message = {
    salutation: string;
    closing: string;
    content: string;
    subject: string;
}

export function SheetMessage ({children}:{children: React.ReactNode}) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<message>>({
        salutation: '',
        closing: '',
        content: '',
        subject:''
    });
    function submit () {

    }
    return (
        <Sheet>
        <SheetTrigger asChild>
          {children}
        </SheetTrigger>
        <SheetContent side="right" className="w-xl">
        <form onSubmit={submit} className="space-y-8 p-8 overflow-auto sidebar-hide">
            <Input
                id="subject"
                type="text"
                required
                autoFocus
                tabIndex={1}
                autoComplete="subject"
                value={data.subject}
                onChange={(e) => setData('subject', e.target.value)}
                disabled={processing}
                className="w-full border-none !outline-none !text-3xl focus-visible:ring-[0px] placeholder:text-textprimary bg-transparent text-textprimary"
                placeholder="subject"
            />
            <Input
                id="salutation"
                type="text"
                required
                autoFocus
                tabIndex={1}
                autoComplete="salutation"
                value={data.salutation}
                onChange={(e) => setData('salutation', e.target.value)}
                disabled={processing}
                className="w-full border-none !outline-none !text-lg focus-visible:ring-[0px] placeholder:text-textprimary bg-transparent text-textprimary"
                placeholder="greeting"
            />
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <Textarea 
              id='content'
              required
              autoFocus
              value={data.content}
              disabled={processing}
              autoComplete="content"
              onChange={(e) => setData('content', e.target.value)}
              placeholder="Body"
              className="min-h-[300px] !bg-transparent"
              >
            </Textarea>
          </div>
          <Input
                id="closing"
                type="text"
                required
                autoFocus
                tabIndex={1}
                autoComplete="closing"
                value={data.closing}
                onChange={(e) => setData('closing', e.target.value)}
                disabled={processing}
                className="w-full border-none !outline-none !text-lg focus-visible:ring-[0px] placeholder:text-textprimary bg-transparent text-textprimary"
                placeholder="closing"
            />
          <SheetFooter>
          <Button type="submit" className="cursor-pointer">
            <LoaderCircle className="h-4 w-4 animate-spin" />
              Add comment
            </Button>
          </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    )
}