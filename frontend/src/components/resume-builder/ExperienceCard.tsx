import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { ResumeBlock } from "@/store/resume-store"
import {useSortable} from '@dnd-kit/react/sortable';
import { GripVertical, X } from 'lucide-react'
import { useRef, useState } from "react";

interface ExperienceCardProps {
  block: ResumeBlock|null
  id:string
  index:number
  group: string
}

const ExperienceCard = ({ block, id, index, group }: ExperienceCardProps) => {
    const [element, setElement] = useState<Element | null>(null);
    const handleRef = useRef<HTMLButtonElement | null>(null);
    const {isDragging} = useSortable({
        id, 
        index, 
        element, 
        handle: handleRef, 
        group,
        type:group,
        accept:group
    });


    if (!block) return null
    return (
        <Card ref={setElement} data-shadow={isDragging || undefined} className="w-full border border-(--primary)/10 bg-white text-(--primary) shadow-none ring-0 active:cursor-grabbing">
            <CardHeader className="w-full flex items-center justify-end gap-2">
                <X className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground" />
                <button ref={handleRef} aria-label="Drag section to reorder" className="drag-handle cursor-grab text-(--secondary)">
                    <GripVertical className="size-4" />
                </button>
            </CardHeader>
            <CardContent className="flex items-start gap-2 p-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="m-0 text-sm font-semibold text-(--primary)">
                    {block.role || block.projectName || block.organization || "Resume block"}
                    </h3>
                    <span className="shrink-0 text-[10px] text-(--secondary)">
                    {block.startDate}{block.endDate ? ` – ${block.endDate}` : ""}
                    </span>
                </div>
                {(block.organization || block.projectName) && (
                    <p className="mb-0 mt-1 text-xs text-(--secondary)">
                    {[block.organization, block.projectName].filter(Boolean).join(" · ")}
                    </p>
                )}
                {block.bullets.length > 0 && (
                    <ul className="mb-0 mt-2 list-disc space-y-1 pl-4 text-xs leading-5 text-(--primary)/80">
                    {block.bullets.map((bullet, bulletIndex) => (
                        <li key={`${block.id}-${bulletIndex}`}>{bullet}</li>
                    ))}
                    </ul>
                )}
                </div>
            </CardContent>
        </Card>
    )

}

export default ExperienceCard