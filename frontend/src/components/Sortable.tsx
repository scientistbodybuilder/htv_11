import { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GripVertical, X, ChevronUp, ChevronDown } from 'lucide-react'
import {useSortable} from '@dnd-kit/react/sortable';
import {useBuilderStore} from '../store/builder-store'
import ExperienceCard from './resume-builder/ExperienceCard';
import { CollisionPriority } from "@dnd-kit/abstract"

export interface SortableProps {
    id: string
    index:number
    sectionName: string
}

export default function Sortable({ id, index, sectionName }: SortableProps) {
    const [element, setElement] = useState<Element | null>(null);
    const handleRef = useRef<HTMLButtonElement | null>(null);
    const {isDragging} = useSortable({
        id,
        index,
        element,
        handle: handleRef,
        group: "resume-sections",
        type:"section",
        collisionPriority: CollisionPriority.Low
    });
    const [open, setOpen] = useState(false);
    const blocks = useBuilderStore(
        (state) => state.sectionBlocks[sectionName]?.blocks ?? []
    )

    return (
        <Card ref={setElement} data-shadow={isDragging || undefined} className="w-full border border-(--primary)/10 bg-white text-(--primary) shadow-sm ring-0">
            <CardHeader className="w-full flex justify-between items-center">
            <CardTitle className="text-lg text-(--primary) font-semibold">{sectionName}</CardTitle>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        aria-label={`${open ? "Collapse" : "Expand"} ${sectionName}`}
                        aria-expanded={open}
                        className="cursor-pointer text-muted-foreground hover:text-foreground"
                        onClick={() => setOpen((value) => !value)}
                    >
                        {open
                            ? <ChevronUp className="size-4" />
                            : <ChevronDown className="size-4" />}
                    </button>
                    <X className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground" />
                    <button ref={handleRef} aria-label="Drag section to reorder" className="drag-handle cursor-grab text-(--secondary)">
                        <GripVertical className="size-4" />
                    </button>
                </div>
            </CardHeader>
            {open && (
                <CardContent>
                    <div className="w-full flex flex-col gap-1">
                        {blocks.map((block,blockIndex) => (
                            <ExperienceCard
                                key={block.id}
                                block={block.block}
                                id={block.id}
                                index={blockIndex}
                                group={`section-experiences-${sectionName}`}
                            />
                        ))}
                    </div>
                </CardContent>
            )}
        </Card>
    )
}