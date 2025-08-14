import { LucideProps } from "lucide-react";
import React from "react";

type tabHeaderType = {
    name: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}[]


export function Commontable ({
    tabHeader,
    children
}:{
    tabHeader: tabHeaderType,
    children: React.ReactNode
}) {
    return (
        <table className="border-sidebar-border/50 w-full overflow-y-visible text-start mt-8">
            <thead>
                <tr className="text-textprimary3">
                {tabHeader.map((item, index) => (
                        <td key={index} className="border-l border-r border-b border-sidebar-border/50 pl-4">
                            <div className="flex items-center gap-2 text-sm py-2">
                                <item.icon size={16} className="block"/><p>{item.name}</p>
                            </div>
                        </td>
                    ))}
                </tr>
            </thead>
            <tbody>
                {children}
            </tbody>
        </table>
    )
}