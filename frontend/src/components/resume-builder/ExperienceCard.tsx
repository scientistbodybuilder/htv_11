import { Card, CardContent } from "@/components/ui/card"
import type { ResumeBlock } from "@/store/resume-store"

interface ExperienceCardProps {
  block: ResumeBlock|null
}

const ExperienceCard = ({ block }: ExperienceCardProps) => {
    if (!block) return null
    return (
        <Card className="w-full cursor-grab border border-(--primary)/10 bg-white text-(--primary) shadow-none ring-0 active:cursor-grabbing">
            <CardContent className="flex items-start gap-2 p-3">
                <div className="min-w-0 flex-1">
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
                </div>
            </CardContent>
        </Card>
    )

}

export default ExperienceCard