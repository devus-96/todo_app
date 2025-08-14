import { SheetMessage } from "@/components/popup/sheetMessage";
import { Button } from "@/components/ui/button";
import { MessageReceiver } from "@/components/user/messageReceiver";
import { messageJson } from "@/constant/fakejson";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import { Search } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'inbox',
        href: '/user/inbox',
    },
];

export default function Inbox () {
    return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="inbox" />
        
        <section className="grid grid-cols-5 max-h-screen overflow-hidden">
            <div className="col-span-2 bg-todoprimary text-textprimary3 max-h-screen scrollbar-hide border-r border-l space-y-3 overflow-auto pb-4">
            <div className="flex items-center gap-4">
                <select onChange={(e) => {
                    }} name="" id="" className="w-1/2 p-2 outline-none rounded border-none cursor-pointer text-textprimary2">
                    <option className="bg-todosecondary rounded-md shadow-lg py-1 z-10" value="task">task</option>
                    <option className="bg-todosecondary rounded-md shadow-lg py-1 z-10" value="project">habit</option>
                </select>
                <div className="flex items-center shadow-sm justify-between px-2 py-1.5 space-x-2 rounded-full text-textprimary">
                  <Search size={16} />
                  <input 
                      type="text" 
                      className="w-[90%] outline-none placeholder:text-textprimary2 placeholder:text-xs"
                      placeholder="search a task"
                      onChange={() => {}}
                  />
              </div>
            </div>
            {messageJson.map((item, index) => (
                <MessageReceiver data={item} key={index} />
            ))}
            </div>
            <div className="col-span-3 bg-todosecondary min-h-screen text-textprimary overflow-auto max-h-screen scrollbar-hide">
                <div className="p-12 space-y-8">
                    <div className="flex items-center space-x-1">
                        <div className="mt-1 h-8 w-8 overflow-hidden rounded-full bg-blue-500/55 text-blue-500 flex justify-center items-center">
                            <p>JN</p>
                        </div>
                        <div>
                            <p>Samuel Henderson</p>
                            <p>2020-08-05</p>
                        </div>
                    </div>
                    <p className="text-3xl">Projects onboarding</p>
                    <p>Hello thierry</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint assumenda doloribus minus molestias quasi! Reiciendis, amet voluptatem voluptas eius error distinctio dignissimos mollitia labore, animi commodi odit sint quae quis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint assumenda doloribus minus molestias quasi! Reiciendis, amet voluptatem voluptas eius error distinctio dignissimos mollitia labore, animi commodi odit sint quae quis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint assumenda doloribus minus molestias quasi! Reiciendis, amet voluptatem voluptas eius error distinctio dignissimos mollitia labore, animi commodi odit sint quae quis.</p>
                    <p>Good bye</p>
                    <div>
                        <SheetMessage>
                            <Button className="bg-todoterciary rounded">
                                Write a new message
                            </Button>
                        </SheetMessage>
                    </div>
                </div>
            </div>
        </section>
    </AppLayout>
    )
} 