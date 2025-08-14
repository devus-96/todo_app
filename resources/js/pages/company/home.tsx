import { NavUser } from "@/components/nav-user";
import { SheetTeam } from "@/components/popup/sheetTeam";
import { Input } from "@/components/ui/input";
import TeamLayout from "@/layouts/team-layout";
import { verifyCompanyId } from "@/lib/global";
import { BreadcrumbItem, Company, teamType } from "@/types";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { format } from "date-fns";
import { Home, HomeIcon, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'new company',
        href: '/company',
    },
];

export default function NewCompany ({userRole, company}:{userRole: string, company: Company}) {
    const missionRef = useRef<string>('')
    const companyIdRef = useRef<string | null>(null)

    const [teams, setTeams] = useState<teamType[]>([])

    if (company.mission) {
        const mission = JSON.parse(company.mission) as string[]
        for (let i = 0; i <= mission.length -1; i++) {
            missionRef.current = missionRef.current + mission[i] + '.'
        }
    }

    companyIdRef.current = verifyCompanyId() as string

    useEffect(() => {
        axios.get(`/company/${companyIdRef.current}/teams`).then((response) => {
            setTeams(response.data.teams)
        })
    }, [])

    return (
        <TeamLayout breadcrumbs={breadcrumbs}>
            <Head title="new company" />

            <section className="flex items-center justify-between px-4">
                <div className="flex items-center space-x-0.5">
                    <HomeIcon size={14} />
                    <p className="capitalize">Home / {userRole}</p>
                </div>
                <div className="w-[200px]">
                    <NavUser />
                </div>
                
            </section>

            <section className='w-full h-[200px] relative bg-[url(/company.jpg)] bg-no-repeat bg-center bg-cover mb-8'>

            </section>
            <section className="px-16 space-y-8">
                <div className="flex items-center">
                    <Home className="text-textprimary" />
                    <Input
                        id="name"
                        type="text"
                        required
                        autoFocus
                        tabIndex={1}
                        autoComplete="name"
                        value={company.name}
                        onChange={(e) => {}}
                        disabled={false}
                        className="w-full border-none !outline-none focus-visible:bg-todoprimary focus-visible:ring-[0px] placeholder:text-textprimary !text-3xl bg-transparent text-textprimary"
                        placeholder="Give a name to your project"
                    />
                </div>

                <div className="w-full space-y-4 text-textprimary">
                    <h1 className="text-2xl text-textprimary">Mission, Values, Goals</h1>
                    <div className="p-4 bg-todosecondary rounded">
                    {JSON.parse(company.mission).map((item: string, index: number) => (
                        <div key={index}>
                            <p>{item}</p>
                        </div>
                    ))}
                    </div>
                </div>

                <div className="w-full">
                    <div className="flex items-center justify-between space-x-4 w-[300px]">
                        <h1 className="text-2xl text-textprimary">Teams</h1>
                        <SheetTeam setTeams={setTeams}>
                            <div className="flex items-center text-sm text-black space-x-1 py-2 px-2 cursor-pointer bg-todoterciary rounded">
                                <Plus size={16} /> <p>New</p>
                            </div>
                        </SheetTeam>
                    </div>
                    <div className='grid grid-cols-3 px-4 gap-3 mb-8 mt-8'>
                        {teams.map((item, index) => (
                            <div onClick={() => {
                                localStorage.setItem('team_id', `${item.id}`)
                                localStorage.setItem('team_name', item.name)
                                window.location.assign(`/company/${companyIdRef.current}/team/${item.id}`)
                            }} className="bg-amber-300/20 hover:bg-amber-300/30 p-4 rounded-lg text-textprimary cursor-pointer" key={index}>
                                <div className="border-b border-textprimary py-2">
                                    <p className="text-xs">{format(item.created_at, 'PPP')}</p>
                                    <p className="font-bold text-xl">{item.name}</p>
                                </div>
                                <div className="py-2 text-textprimary2 font-light">
                                    <p>{item.description}</p>
                                </div>
                                <div className="flex items-center space-x-2 mt-4">
                                    <div className="flex items-center justify-center bg-neutral-900 cursor-pointer font-normal border-none text-sm text-textprimary2 h-6 w-6 !rounded">
                                        <p>{item.author.email.slice(0, 1)}</p>
                                    </div>
                                    <p>{item.author.email}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
            </section>
        </TeamLayout>
    )
}