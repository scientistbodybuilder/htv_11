import { create } from "zustand"
import type { ResumeBlock } from "./resume-store"

interface BuilderBlock {
  id: string
  index: number|null
  block: ResumeBlock
}

export interface SectionBlock {
  visible: boolean
  index: number
  id: string
  header: string
  blocks: BuilderBlock[]
}

interface BuilderStore {
  sectionBlocks: Record<string, SectionBlock>
  addSectionBlock: (sectionKey: string) => void
  removeSectionBlock: (sectionKey: string) => void
  moveSectionBlock: (sectionKey: string, newIndex: number) => void
  addSectionExperienceBlock: (sectionKey: string, block: ResumeBlock) => void
}

export const useBuilderStore = create<BuilderStore>()((set) => ({
    sectionBlocks: {
        "Experience": {
        visible: false,
        index: 0,
        header: "Experience",
        id:"Experience",
        blocks: []
        },
        "Projects": {
        visible: false,
        index: 1,
        header: "Projects",
        id:"Projects",
        blocks: []
        },
        "Extra-Curricular": {
        visible: false,
        index: 2,
        header: "Extra-Curricular",
        id:"Extra-Curricular",
        blocks: []
        }
    },
    addSectionBlock: (sectionKey) =>
        set((state) => ({
        sectionBlocks: { ...state.sectionBlocks, [sectionKey]: {...state.sectionBlocks[sectionKey], visible: true } },
        })),
    removeSectionBlock: (sectionKey) => set((state) => ({
        sectionBlocks: { ...state.sectionBlocks, [sectionKey]: {...state.sectionBlocks[sectionKey], visible: false } },
    })),
    moveSectionBlock: (sectionKey, newIndex) => set((state) => ({
        sectionBlocks: { ...state.sectionBlocks, [sectionKey]: {...state.sectionBlocks[sectionKey], index: newIndex } },
    })),
    addSectionExperienceBlock: (sectionKey, block) => set((state) => ({
        sectionBlocks: {
            ...state.sectionBlocks,
            [sectionKey]: {
                ...state.sectionBlocks[sectionKey],
                blocks: [
                  ...state.sectionBlocks[sectionKey].blocks,
                  { id: crypto.randomUUID(), index: null, block },
                ]
            }
        }
    }))

}))