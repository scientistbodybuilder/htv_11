import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { usePolishStore } from "@/store/polish-store"
import PolishSectionCard, {
  polishFieldClassName,
  polishLabelClassName,
} from "./PolishSectionCard"

const EducationCard = () => {
  const education = usePolishStore((state) => state.education)
  const addEducation = usePolishStore((state) => state.addEducation)
  const updateEducation = usePolishStore((state) => state.updateEducation)
  const removeEducation = usePolishStore((state) => state.removeEducation)

  return (
    <PolishSectionCard
      title="Education"
      description="Add your schools, programs, and dates of study."
      action={
        <Button
          type="button"
          variant="outline"
          onClick={addEducation}
          className="h-8 shrink-0 gap-1.5 border-[#eadbd4] px-2.5 text-xs text-[#773b25] hover:bg-[#fff8f5]"
        >
          <Plus />
          Add school
        </Button>
      }
      contentClassName="space-y-4 px-5 py-5 md:px-6"
    >
      {education.length === 0 ? (
        <p className="m-0 rounded-lg bg-[#fff8f5] p-4 text-sm text-[#817773]">
          No education added yet. Select “Add school” to include your education.
        </p>
      ) : (
        education.map((entry, index) => (
          <div
            key={entry.id}
            className="rounded-xl border border-[#f0e3dd] bg-[#fffdfc] p-4 md:p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="m-0 text-sm font-semibold text-[#51423d]">
                School {index + 1}
              </h3>
              <button
                type="button"
                onClick={() => removeEducation(entry.id)}
                aria-label={`Remove school ${index + 1}`}
                className="rounded-md p-1.5 text-[#817773] transition hover:bg-[#f8e7de] hover:text-[#773b25] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#984629]"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="grid gap-x-5 gap-y-4 md:grid-cols-2">
              <label className={polishLabelClassName}>
                School
                <Input
                  value={entry.school}
                  onChange={(event) => updateEducation(entry.id, { school: event.target.value })}
                  placeholder="e.g. University of Toronto"
                  className={polishFieldClassName}
                />
              </label>
              <label className={polishLabelClassName}>
                Degree
                <Input
                  value={entry.degree}
                  onChange={(event) => updateEducation(entry.id, { degree: event.target.value })}
                  placeholder="e.g. Bachelor of Science"
                  className={polishFieldClassName}
                />
              </label>
              <label className={polishLabelClassName}>
                Program or field of study
                <Input
                  value={entry.program}
                  onChange={(event) => updateEducation(entry.id, { program: event.target.value })}
                  placeholder="e.g. Computer Science"
                  className={polishFieldClassName}
                />
              </label>
              <label className={polishLabelClassName}>
                GPA <span className="font-normal text-[#9b8b84]">(optional)</span>
                <Input
                  value={entry.gpa}
                  onChange={(event) => updateEducation(entry.id, { gpa: event.target.value })}
                  placeholder="e.g. 3.8 / 4.0"
                  className={polishFieldClassName}
                />
              </label>
              <label className={polishLabelClassName}>
                Start date
                <Input
                  type="month"
                  value={entry.startDate}
                  onChange={(event) => updateEducation(entry.id, { startDate: event.target.value })}
                  className={polishFieldClassName}
                />
              </label>
              <label className={polishLabelClassName}>
                End date
                <Input
                  type="month"
                  value={entry.endDate}
                  onChange={(event) => updateEducation(entry.id, { endDate: event.target.value })}
                  className={polishFieldClassName}
                />
              </label>
            </div>
          </div>
        ))
      )}
    </PolishSectionCard>
  )
}

export default EducationCard
