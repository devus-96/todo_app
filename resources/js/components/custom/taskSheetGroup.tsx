import type { LucideIcon, LucideProps } from "lucide-react";

type IconProps = LucideProps & {
    icon: LucideIcon
    name: string,
    children: React.ReactNode,
    width?:number,
  }

export function TaskSheetGroup ({
    icon: Icon,
    name,
    children,
    width
}:IconProps) {
    return (
        <div style={{width: width ? `${width}px` : "auto"}} className="flex items-center justify-between gap-3 px-4 text-textprimary2 space-x-6">
            <div className="flex items-center space-x-2 !text-textprimary2 text-sm whitespace-nowrap">
                <Icon size={14} />
                <p>{name}</p>
            </div>
           {children}
        </div>
    )
}