import { useEffect, useState } from 'react'
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
import {DragDropProvider} from '@dnd-kit/react'
import {move} from '@dnd-kit/helpers';
import Sortable from '../Sortable'
const BLOCK_PREFIX = "section-experiences-"
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
    const { sectionBlocks, addSectionBlock } = useBuilderStore()
    // const swapy = useRef<Swapy | null>(null)
    // const container = useRef<HTMLDivElement | null>(null)
    const [sectionType, setSectionType] = useState<string | null>(null)
    const [sections, setSections] = useState<any[]>([])
    // const [slotItemMap, setSlotItemMap] = useState<SlotItemMapArray>(
    //     utils.initSlotItemMap([], 'id')
    // )
    useEffect(() => {
        console.log('section blocks:', sectionBlocks)
        const visibleSections = Object.keys(sectionBlocks).filter(key => sectionBlocks[key].visible)
        console.log('visible sections:', visibleSections)
        setSections((prev) => {
            let currentSections = [...prev].filter((section) => visibleSections.includes(section.id))
            console.log('current sections:', currentSections)
            const currentSectionIds = currentSections.map((section) => section.id)
            visibleSections.forEach((sectionId) => {
                if (!currentSectionIds.includes(sectionId)) {
                    currentSections.push(sectionBlocks[sectionId])
                }
            })
            return currentSections

        })
    },[sectionBlocks])
    // const sections = useMemo(() => {
    //     const visibleSections = Object.keys(sectionBlocks).filter(key => sectionBlocks[key].visible)
    //     console.log('visible sections:', visibleSections)
    //     if (visibleSections.length === 0) return []
    //     return visibleSections.map((sectionKey) => sectionBlocks[sectionKey])
    // },[sectionBlocks])

    // const slottedItems = useMemo(
    //     () => utils.toSlottedItems(sections, 'id', slotItemMap),
    //     [sections,slotItemMap])

    console.log('SECTIONS:', sections)
    const addResumeSection = (sectionType: string) => {
        console.log('adding resume section:', sectionType)
        addSectionBlock(sectionType)
    }

    // useEffect(
    //     () =>
    //     utils.dynamicSwapy(swapy.current, sections, 'id', slotItemMap, setSlotItemMap),
    //     [sections]
    // )

    // useEffect(() => {
    //     if (container.current) {
    //         swapy.current = createSwapy(container.current!, {
    //             manualSwap: true,
    //         })

    //         // Your event listeners
    //         swapy.current.onSwap((event) => {
    //             console.log('swap', event);
    //             setSlotItemMap(event.newSlotItemMap.asArray)
    //         })
    //     }

    //     return () => {
    //     // Destroy the swapy instance on component destroy
    //     swapy.current?.destroy()
    //     }
    // }, [])

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
            
            

            
                <DragDropProvider
                onDragEnd={(event) => {
                    const source = event.operation.source
                    if (!source) return

                    if (source.type === "section") {
                    setSections((items) => move(items, event))
                    return
                    }

                    if (typeof source.type === "string" && source.type.startsWith(BLOCK_PREFIX)) {
                    const sectionId = source.type.slice(BLOCK_PREFIX.length)
                    const store = useBuilderStore.getState()
                    const section = store.sectionBlocks[sectionId]
                    if (section) {
                        store.reorderSectionExperienceBlocks(sectionId, move(section.blocks, event))
                    }
                    }
                }}
                >
                    <div className="w-full flex flex-col gap-2">
                        {sections.map((section,index) => (
                            <Sortable key={section.id} id={section.id} index={index} sectionName={section.id} />
                        ))}

                    </div>
                </DragDropProvider>
            
        </section>
        
    )
}

export default Builder