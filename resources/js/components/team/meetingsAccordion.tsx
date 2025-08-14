import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

  
export function MeetingAccordion({
    dateLabel,
    children
  }:{
    dateLabel: string,
    children: React.ReactNode
  }) {
    const topicsColor = ['#34d399', '#fbbf24', '#fa6074', '#d782ff']
    return (
      <Accordion
        type="single"
        collapsible
        defaultValue=""
        className="px-8"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="cursor-pointer underline-offset-0">
            <div className="p-1 rounded" style={{
                background: `${topicsColor[Math.floor(Math.random() * 4)]}`
            }}>
                <p className="text-black">{dateLabel}</p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance text-textprimary">
            {children}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
  