import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

  
export function HistoryAccordion({
    dateLabel,
    children
  }:{
    dateLabel: string,
    children: React.ReactNode
  }) {

    return (
      <Accordion
        type="single"
        collapsible
        defaultValue=""
        className="px-16"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="cursor-pointer">
            <div>
                <p className="text-lg">{dateLabel}</p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            {children}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
  