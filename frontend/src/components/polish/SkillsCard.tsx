import { useState, type FormEvent } from "react"
import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { usePolishStore } from "@/store/polish-store"
import PolishSectionCard, { polishFieldClassName } from "./PolishSectionCard"

const skillSuggestions = [
  "TypeScript",
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "Java",
  "SQL",
  "PostgreSQL",
  "AWS",
  "Azure",
  "Docker",
  "Kubernetes",
  "Project Management",
  "Communication",
  "Leadership",
]

const SkillsCard = () => {
  const skills = usePolishStore((state) => state.skills)
  const addSkill = usePolishStore((state) => state.addSkill)
  const removeSkill = usePolishStore((state) => state.removeSkill)
  const [skillInput, setSkillInput] = useState("")

  const addSkillFromInput = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!skillInput.trim()) return
    addSkill(skillInput)
    setSkillInput("")
  }

  return (
    <PolishSectionCard
      title="Skills"
      description="Add relevant skills. Start typing to see suggestions."
    >
      <form onSubmit={addSkillFromInput} className="flex gap-2">
        <Input
          list="resume-skill-suggestions"
          value={skillInput}
          onChange={(event) => setSkillInput(event.target.value)}
          placeholder="e.g. React, communication, data analysis"
          aria-label="Add a skill"
          className={`${polishFieldClassName} mt-0`}
        />
        <datalist id="resume-skill-suggestions">
          {skillSuggestions.map((skill) => (
            <option key={skill} value={skill} />
          ))}
        </datalist>
        <Button
          type="submit"
          disabled={!skillInput.trim()}
          className="h-10 gap-1.5 bg-[#2b1e1a] px-3 text-xs text-white hover:bg-[#49342d]"
        >
          <Plus />
          Add
        </Button>
      </form>
      {skills.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2 p-0" aria-label="Added skills">
          {skills.map((skill) => (
            <li
              key={skill}
              className="inline-flex list-none items-center gap-1.5 rounded-full border border-[#eadbd4] bg-[#fff8f5] py-1 pl-3 pr-1.5 text-xs font-medium text-[#51423d]"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                aria-label={`Remove ${skill}`}
                className="rounded-full p-1 text-[#817773] transition hover:bg-[#f1dfd6] hover:text-[#773b25] focus-visible:outline-2 focus-visible:outline-[#984629]"
              >
                <X className="size-3" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-0 mt-3 text-xs text-[#9b8b84]">
          Your skills will appear here.
        </p>
      )}
    </PolishSectionCard>
  )
}

export default SkillsCard
