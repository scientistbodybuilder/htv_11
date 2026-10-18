import { createSwapy, utils, type Swapy, type SlotItemMapArray } from 'swapy'
import { useRef, useEffect, useMemo, useState } from 'react'
import {useBuilderStore} from '../../store/builder-store'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import SectionCard from './SectionCard'

const sectionItems = [
    {
        label: 'Experience',
        value:'Experience'
    },
    {
        label: 'Projects',
        value:'Projects'
    },
    {
        label: 'Extra-Curricular',
        value:'Extra-Curricular'
    }
]

const Builder = () => {
    const { sectionBlocks, addSectionBlock, removeSectionBlock, moveSectionBlock } = useBuilderStore()
    const swapy = useRef<Swapy | null>(null)
    const container = useRef<HTMLDivElement | null>(null)
    const [sectionType, setSectionType] = useState<string | null>(null)

    const [slotItemMap, setSlotItemMap] = useState<SlotItemMapArray>(
        utils.initSlotItemMap([], 'id')
    )

    const sections = useMemo(() => {
        const visibleSections = Object.keys(sectionBlocks).filter(key => sectionBlocks[key].visible)
        console.log('visible sections:', visibleSections)
        if (visibleSections.length === 0) return []
        return visibleSections.map((sectionKey) => sectionBlocks[sectionKey])
    },[sectionBlocks])

    const slottedItems = useMemo(
        () => utils.toSlottedItems(sections, 'id', slotItemMap),
        [sections,slotItemMap])

    console.log('SECTIONS:', sections)
    const addResumeSection = (sectionType: string) => {
        console.log('adding resume section:', sectionType)
        addSectionBlock(sectionType)
    }

    useEffect(
        () =>
        utils.dynamicSwapy(swapy.current, sections, 'id', slotItemMap, setSlotItemMap),
        [sections]
    )

    useEffect(() => {
        if (container.current) {
            swapy.current = createSwapy(container.current!, {
                manualSwap: true,
            })

            // Your event listeners
            swapy.current.onSwap((event) => {
                console.log('swap', event);
                setSlotItemMap(event.newSlotItemMap.asArray)
            })
        }

        return () => {
        // Destroy the swapy instance on component destroy
        swapy.current?.destroy()
        }
    }, [])

    return (
        <section className="w-full h-auto flex flex-col gap-4 justify-start items-start">
            <div className="flex flex-col items-start gap-1">
                <p className="m-0 text-xs text-muted-foreground">Add a Resume Section</p>
                <div className="flex items-start gap-2">
                    <Select items={sectionItems} onValueChange={setSectionType}>
                        <SelectTrigger className="w-[200px] border">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            {sectionItems.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                {item.label}
                                </SelectItem>
                            ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button disabled={sectionType === null} className="text-white cursor-pointer hover:bg-(--primary)/80 bg-(--primary)" onClick={() => sectionType && addResumeSection(sectionType)}>
                        Add
                    </Button>
                </div>
            </div>
            
            

            <div ref={container} className="w-full flex flex-col gap-2">
                {slottedItems.map(({ slotId, itemId, item }) => (
                    <div key={slotId} data-swapy-slot={slotId}>
                        <div key={itemId} data-swapy-item={itemId}>
                            <SectionCard itemId={itemId} />
                        </div>
                        
                    </div>
                ))}
            </div>
        </section>
        
    )
}

export default Builder