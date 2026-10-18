import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

export interface PersonalDetails {
  name: string
  email: string
  phone: string
  location: string
  linkedinUrl: string
  githubUrl: string
  websiteUrl: string
}

export interface EducationEntry {
  id: string
  school: string
  degree: string
  program: string
  startDate: string
  endDate: string
  gpa: string
}

interface PolishStore {
  personalDetails: PersonalDetails
  education: EducationEntry[]
  skills: string[]
  updatePersonalDetails: (details: Partial<PersonalDetails>) => void
  addEducation: () => void
  updateEducation: (id: string, details: Partial<Omit<EducationEntry, "id">>) => void
  removeEducation: (id: string) => void
  addSkill: (skill: string) => void
  removeSkill: (skill: string) => void
}

const createEducationEntry = (): EducationEntry => ({
  id: crypto.randomUUID(),
  school: "",
  degree: "",
  program: "",
  startDate: "",
  endDate: "",
  gpa: "",
})

export const usePolishStore = create<PolishStore>()(
  persist(
    (set) => ({
      personalDetails: {
        name: "",
        email: "",
        phone: "",
        location: "",
        linkedinUrl: "",
        githubUrl: "",
        websiteUrl: "",
      },
      education: [createEducationEntry()],
      skills: [],
      updatePersonalDetails: (details) =>
        set((state) => ({
          personalDetails: { ...state.personalDetails, ...details },
        })),
      addEducation: () =>
        set((state) => ({ education: [...state.education, createEducationEntry()] })),
      updateEducation: (id, details) =>
        set((state) => ({
          education: state.education.map((entry) =>
            entry.id === id ? { ...entry, ...details } : entry
          ),
        })),
      removeEducation: (id) =>
        set((state) => ({
          education: state.education.filter((entry) => entry.id !== id),
        })),
      addSkill: (skill) =>
        set((state) => {
          const normalizedSkill = skill.trim()
          if (
            !normalizedSkill ||
            state.skills.some((existingSkill) =>
              existingSkill.toLocaleLowerCase() === normalizedSkill.toLocaleLowerCase()
            )
          ) {
            return state
          }
          return { skills: [...state.skills, normalizedSkill] }
        }),
      removeSkill: (skill) =>
        set((state) => ({ skills: state.skills.filter((existingSkill) => existingSkill !== skill) })),
    }),
    {
      name: "polish-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        personalDetails: state.personalDetails,
        education: state.education,
        skills: state.skills,
      }),
      version: 1,
    }
  )
)
