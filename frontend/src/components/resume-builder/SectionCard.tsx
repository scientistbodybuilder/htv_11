import { useEffect, useMemo, useRef, useState } from "react"
import { createSwapy, utils, type SlotItemMapArray, type Swapy } from "swapy"
import { ChevronDown, ChevronUp, GripVertical, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useBuilderStore } from "@/store/builder-store"
import ExperienceCard from "./ExperienceCard"


interface SectionCardProps {
  itemId: string
}

const SectionCard = ({ itemId }: SectionCardProps) => {

    const removeSectionBlock = useBuilderStore((state) => state.removeSectionBlock)
    const experienceBlocks = useBuilderStore(
        (state) => state.sectionBlocks[itemId]?.blocks ?? []
    )
    const sectionTitle = itemId
        .replace(/[-_]+/g, " ")
        .replace(/\b\w/g, (character) => character.toLocaleUpperCase())
    const [open, setOpen] = useState(false)

    const experienceContainer = useRef<HTMLDivElement | null>(null)
    const experienceSwapy = useRef<Swapy | null>(null)
    const [slotItemMap, setSlotItemMap] = useState<SlotItemMapArray>(
        () => utils.initSlotItemMap(experienceBlocks, "id")
    )
    const slottedExperienceBlocks = useMemo(
        () => utils.toSlottedItems(experienceBlocks, "id", slotItemMap),
        [experienceBlocks, slotItemMap]
    )

    useEffect(
        () => utils.dynamicSwapy(
            experienceSwapy.current,
            experienceBlocks,
            "id",
            slotItemMap,
            setSlotItemMap
        ),
        [experienceBlocks]
    )

    useEffect(() => {
        if (!open || experienceBlocks.length === 0 || !experienceContainer.current) return

        experienceSwapy.current = createSwapy(experienceContainer.current, {
            manualSwap: true,
            swapMode:'drop'
        })
        experienceSwapy.current.onSwap((event) => {
            setSlotItemMap(event.newSlotItemMap.asArray)
        })

        return () => {
            experienceSwapy.current?.destroy()
            experienceSwapy.current = null
        }
    }, [open, experienceBlocks.length])

  return (  
    <Card className="w-full border border-(--primary)/10 bg-white text-(--primary) shadow-sm ring-0">
        <CardHeader className="w-full flex justify-between items-center">
            <CardTitle className="text-lg text-(--primary) font-semibold">{sectionTitle}</CardTitle>
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    aria-label={`${open ? "Collapse" : "Expand"} ${sectionTitle}`}
                    aria-expanded={open}
                    className="cursor-pointer text-muted-foreground hover:text-foreground"
                    onClick={() => setOpen((value) => !value)}
                >
                    {open
                        ? <ChevronUp className="size-4" />
                        : <ChevronDown className="size-4" />}
                </button>
                <X onClick={() => removeSectionBlock(itemId)} className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground" />
                <div data-swapy-handle aria-label="Drag section to reorder" className="drag-handle cursor-grab text-(--secondary)">
                    <GripVertical className="size-4" />
                </div>
            </div>
        </CardHeader>
        {/* {open && (
            <CardContent className="space-y-2">
                {experienceBlocks.length === 0 ? (
                    <p className="m-0 rounded-lg bg-(--background) p-3 text-sm text-(--secondary)">
                        No experience blocks have been added to this section yet.
                    </p>
                ) : (
                    <div
                        ref={experienceContainer}
                        className="flex flex-col gap-2"
                        aria-label={`${sectionTitle} experience blocks`}
                    >
                        {slottedExperienceBlocks.map(({ slotId, itemId: experienceId, item }) => (
                            <div key={slotId} data-swapy-slot={slotId}>
                                <div data-swapy-item={experienceId}>
                                    <ExperienceCard block={item?.block ?? null} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        )} */}
    </Card>
  )
}

export default SectionCard
