"use client"
import React from "react"
import clsx from "clsx"
import { Plus, Search, MoreVertical, Users } from "lucide-react"
import { useContext, useState } from "react"
import TeamLayout from "@/layouts/team-layout"
import { BreadcrumbItem } from "@/types"
import { Head } from "@inertiajs/react"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'menber',
        href: '/team/menber',
    },
];


const Menbers = [
    {
      "member": "Alice Dupont",
      "Email": "alice.dupont@example.com",
      "Role": "Développeur Front-end",
      "status": "accept"
    },
    {
      "member": "Bob Martin",
      "Email": "bob.martin@example.com",
      "Role": "Développeur Back-end",
      "status": "pending"
    },
    {
      "member": "Charlie Durand",
      "Email": "charlie.durand@example.com",
      "Role": "Designer UX/UI",
      "status": "refused"
    },
      {
      "member": "David Smith",
      "Email": "david.smith@example.com",
      "Role": "Chef de projet",
      "status": "cancel"
    },
    {
      "member": "Eve Garcia",
      "Email": "eve.garcia@example.com",
      "Role": "Testeur QA",
      "status": "accept"
    },
    {
        "member": "Alice Dupont",
        "Email": "alice.dupont@example.com",
        "Role": "Développeur Front-end",
        "status": "accept"
      },
      {
        "member": "Bob Martin",
        "Email": "bob.martin@example.com",
        "Role": "Développeur Back-end",
        "status": "pending"
      },
      {
        "member": "Charlie Durand",
        "Email": "charlie.durand@example.com",
        "Role": "Designer UX/UI",
        "status": "refused"
      },
        {
        "member": "David Smith",
        "Email": "david.smith@example.com",
        "Role": "Chef de projet",
        "status": "cancel"
      },
      {
        "member": "Eve Garcia",
        "Email": "eve.garcia@example.com",
        "Role": "Testeur QA",
        "status": "accept"
      }
  ]

const MenberPage = () => {
    const [position, setPosition] = useState({x:0, top:0})
    return (
        <TeamLayout breadcrumbs={breadcrumbs}>
            <Head title="menber" />
        <div className="w-full min-h-screen pb-8">
            
            <div className="w-full flex justify-between items-center text-sidebarText px-8 mt-8">
                <div className="flex items-center text-3xl text-textprimary space-x-4">
                    <Users /><p>Menbers</p>
                </div>
                <div className="flex items-center space-x-5">
                    <div className="py-2 px-4 flex items-center shadow-sm justify-between bg-todosecondary space-x-2 rounded text-sidebarText">
                        <Search size={12} />
                        <input 
                            type="text" 
                            className="w-[90%] bg-todosecondary outline-none"
                            placeholder="search a menber"
                        />
                    </div>
                    <div className="flex items-center space-x-2 rounded bg-todosecondary p-2 text-sidebarText">
                        <Plus />
                    </div>
                </div>
            </div>
            <div className="px-8 mt-4 bg-todoprimary">
                <table className="bg-todoprimary rounded border-secondary text-textprimary2 w-full overflow-y-visible text-start">
                    <thead>
                        <tr className="text-textprimary2">
                            <th className="pl-4 py-4 text-start">Team menber</th>
                            <th className="pl-4 py-4 text-start">Email</th>
                            <th className="pl-4 py-4 text-start">Role</th>
                            <th className="pl-4 py-4 text-start">status</th>
                            <th className="pl-4 py-4 text-start"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Menbers.map((item, index) => (
                            <tr key={index} className="border-t border-b border-secondary text-sm">
                                <td className="flex items-center p-4 space-x-4">
                                    <p>{item.member}</p>
                                </td>
                                <td className="p-4">{item.Email}</td>
                                <td className="p-4">{item.Role}</td>
                                <td className="p-4">
                                    <div className={clsx("p-2 rounded-full flex items-center justify-center text-xs", {
                                        "text-emerald-600 bg-emerald-200" : item.status === 'accept',
                                        "text-red-600 bg-red-200" : item.status === 'refused',
                                        "text-gray-600 bg-gray-200" : item.status === 'cancel',
                                        "text-sky-600 bg-sky-200" : item.status === 'pending',
                                    })}>
                                        {item.status}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div onClick={(e) => {
                                       
                                    }} className="w-6 h-6 rounded flex flex-center text-xs space-x-2 cursor-pointer">
                                        <MoreVertical size={16}/>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </TeamLayout>
    )
}

export default MenberPage