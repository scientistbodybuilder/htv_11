import type { SectionBlock } from "@/store/builder-store"
import type { EducationEntry, PersonalDetails } from "@/store/polish-store"
import type { ResumeBlock } from "@/store/resume-store"

export interface ResumePreviewEntry {
  id: string
  title: string
  dates: string
  subtitle: string
  bullets: string[]
}

export interface ResumePreviewSection {
  id: string
  title: string
  entries: ResumePreviewEntry[]
}

export interface ResumePreviewEducation {
  id: string
  school: string
  dates: string
  program: string
  gpa: string
}

export interface ResumePreviewData {
  name: string
  contactLine: string[]
  sections: ResumePreviewSection[]
  education: ResumePreviewEducation[]
  skills: string[]
}

export const formatResumeDate = (value: string) => {
  if (!value) return ""
  const match = /^(\d{4})-(\d{2})(?:-\d{2})?$/.exec(value)
  if (!match) return value

  const date = new Date(Number(match[1]), Number(match[2]) - 1, 1)
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(date)
}

const formatDateRange = (startDate: string, endDate: string) => {
  const start = formatResumeDate(startDate)
  const end = formatResumeDate(endDate)
  if (start && end) return `${start} – ${end}`
  return start || end
}

const toPreviewEntry = (
  id: string,
  block: ResumeBlock
): ResumePreviewEntry => {
  const title = block.role || block.projectName || block.organization || "Resume entry"
  const subtitle = [block.organization, block.projectName]
    .filter((value) => value && value !== title)
    .join(" | ")

  return {
    id,
    title,
    dates: formatDateRange(block.startDate, block.endDate),
    subtitle,
    bullets: block.bullets.filter(Boolean),
  }
}

export const createResumePreviewData = (
  personalDetails: PersonalDetails,
  educationEntries: EducationEntry[],
  skills: string[],
  sectionBlocks: Record<string, SectionBlock>
): ResumePreviewData => ({
  name: personalDetails.name.trim() || "Your Name",
  contactLine: [
    personalDetails.phone,
    personalDetails.email,
    personalDetails.location,
    personalDetails.linkedinUrl,
    personalDetails.githubUrl,
    personalDetails.websiteUrl,
  ].map((value) => value.trim()).filter(Boolean),
  sections: Object.values(sectionBlocks)
    .filter((section) => section.visible)
    .sort((first, second) => first.index - second.index)
    .map((section) => ({
      id: section.id,
      title: section.header,
      entries: [...section.blocks]
        .sort((first, second) => (first.index ?? 0) - (second.index ?? 0))
        .map(({ id, block }) => toPreviewEntry(id, block)),
    })),
  education: educationEntries
    .filter((entry) =>
      [entry.school, entry.degree, entry.program, entry.startDate, entry.endDate, entry.gpa]
        .some((value) => value.trim())
    )
    .map((entry) => ({
      id: entry.id,
      school: entry.school.trim() || "School",
      dates: formatDateRange(entry.startDate, entry.endDate),
      program: [entry.degree, entry.program].filter((value) => value.trim()).join(", "),
      gpa: entry.gpa.trim(),
    })),
  skills: skills.map((skill) => skill.trim()).filter(Boolean),
})
