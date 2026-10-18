import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
export interface ResumeBlock {
  id: number
  type: string
  startDate: string
  endDate: string
  organization: string|null
  role: string|null
  projectName: string|null
  bullets: string[]
}

interface ResumeStore {
  resumeBlocks: ResumeBlock[]
  addBlock: (block: ResumeBlock) => void
  addBlocks: (blocks: ResumeBlock[]) => void
  removeBlock: (id: number) => void
  clearBlocks: () => void
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resumeBlocks: [],
      addBlock: (block) =>
        set((state) => ({ resumeBlocks: [...state.resumeBlocks, block] })),
      addBlocks: (blocks) =>
        set((state) => ({ resumeBlocks: [...state.resumeBlocks, ...blocks] })),
      removeBlock: (id) =>
        set((state) => ({
          resumeBlocks: state.resumeBlocks.filter((b) => b.id !== id),
        })),
      clearBlocks: () => set({ resumeBlocks: [] }),
    }),
    {
      name: "resume-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ resumeBlocks: state.resumeBlocks }),
      version: 1,
    }
  )
)