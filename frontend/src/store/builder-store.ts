import { create } from "zustand"
import type { ResumeBlock } from "./resume-store"
import { persist, createJSONStorage } from "zustand/middleware"

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
  reorderSectionExperienceBlocks: (sectionKey: string, blocks: BuilderBlock[]) => void
  resetSectionBlocks: () => void
}

export const useBuilderStore = create<BuilderStore>()(
    persist(
        (set) => ({
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
                        { id: `${sectionKey}:${crypto.randomUUID()}`, index: null, block },
                        ]
                    }
                }
            })),
            reorderSectionExperienceBlocks: (sectionKey, blocks) => set((state) => ({
                sectionBlocks: {
                    ...state.sectionBlocks,
                    [sectionKey]: {
                        ...state.sectionBlocks[sectionKey],
                        blocks: blocks.map((builderBlock, index) => ({
                            ...builderBlock,
                            index,
                        })),
                    },
                },
            })),
            resetSectionBlocks: () => set((state) => ({
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
            }
        })),
        }),
        {
            name:"section-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ sectionBlocks: state.sectionBlocks }),
            version: 2,
        }))