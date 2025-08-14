import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { route_type, type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { House, StepBack, UserPlus, LucideProps } from 'lucide-react';
import { get_company_route, get_team_route, verifyTeamName } from '@/lib/global';



export function TemaSidebar() {
    const company_name = localStorage.getItem('company_name')
    const company_route = get_company_route() as route_type
    const team_route = get_team_route() as route_type
    const team_name = verifyTeamName() as string
    return (
        <Sidebar collapsible="icon" variant="inset" className='bg-[#202020]'>
            <SidebarHeader className='bg-todosecondary'>
                <SidebarMenu>
                    <SidebarMenuItem >
                        <SidebarMenuButton size="lg" asChild className=''>
                        <div className="text-sidebarText flex justify-between items-center space-x-4">
                            <div className="flex items-center justify-between w-fit space-x-2">
                                <div className=" bg-todoprimary flex items-center justify-center rounded w-6 h-6">
                                    <p className="text-textprimary">{company_name?.slice(0, 1)}</p>
                                </div>
                                <div className="w-[80px]">
                                    <p className="text-white text-sm overflow-hidden text-ellipsis whitespace-nowrap">{company_name ? company_name : 'loading...'}</p>
                                </div>
                            </div>
                            <Link href='/users' className="flex-center w-6 h-6 rounded duration-300 cursor-pointer hover:bg-sidebarText hover:text-gray-800">
                                <StepBack size={16}/>
                            </Link>
                        </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className='bg-todosecondary'>
                <NavMain items={company_route} />
                <div>
                    <p className='text-textprimary2 text-sm ml-4 mt-4 mb-4'>Teamspaces</p>
                    <div className='flex items-center px-4 text-todoterciary space-x-2'>
                        <div className="flex items-center justify-center rounded w-[20px] h-[20px]">
                            <House size={16}/>
                        </div>
                        <p>{team_name ? team_name : 'Untitled'}</p>
                    </div>
                    {(!team_name && !team_route) &&
                        <div className='p-2 bg-todoprimary text-textprimary2 text-sm rounded-lg mt-4'>
                            We appreciate your interest in the team section! To gain access, you need to be assigned a role within a team by the author or a company manager.
                            <br />
                            Please wait for them to grant you the necessary permissions. Once you have a role, the team section will become visible to you.

                        </div>
                    }
                    <div className='px-4'>
                        <NavMain items={team_route} />
                    </div>
                </div>
            </SidebarContent>

            <div className='flex items-center text-sm text-start bg-todosecondary py-4 space-x-2 text-textprimary mb-4 pl-4 cursor-pointer rounded hover:bg-todoterciary hover:text-white'>
                <UserPlus />
                <p>Invite menbers</p>
            </div>
        </Sidebar>
    );
}