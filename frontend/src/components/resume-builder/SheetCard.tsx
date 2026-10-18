import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useBuilderStore } from "@/store/builder-store"
import type { ResumeBlock } from "@/store/resume-store"

interface SheetCardProps {
  block: ResumeBlock
}

const sectionItems = [
  { value: "Experience", label: "Experience" },
  { value: "Projects", label: "Projects" },
  { value: "Extra-Curricular", label: "Extra-Curricular" },
]

const SheetCard = ({ block }: SheetCardProps) => {
  const [sectionType, setSectionType] = useState<string | null>(null)
  const addSectionExperienceBlock = useBuilderStore((state) => state.addSectionExperienceBlock)

  return (
    <article className="rounded-lg border border-(--primary)/10 bg-white p-3">
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
          {block.bullets.map((bullet, index) => (
            <li key={`${block.id}-${index}`}>{bullet}</li>
          ))}
        </ul>
      )}
      <div className="mt-2 flex w-full items-start justify-end gap-2">
        <Select items={sectionItems} value={sectionType} onValueChange={setSectionType}>
          <SelectTrigger className="w-[200px] border text-xs">
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
        <Button
          disabled={sectionType === null}
          className="cursor-pointer bg-(--primary) text-xs text-white hover:bg-(--primary)/80"
          onClick={() => {
            if (sectionType) addSectionExperienceBlock(sectionType, block)
          }}
        >
          Add
        </Button>
      </div>
    </article>
  )
}

export default SheetCard
