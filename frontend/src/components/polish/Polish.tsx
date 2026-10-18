import { ArrowLeft, ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import EducationCard from "./EducationCard"
import PersonalDetailsCard from "./PersonalDetailsCard"
import SkillsCard from "./SkillsCard"

const Polish = () => {
  const navigate = useNavigate()

  return (
    <section className="h-[calc(100dvh-52px)] min-h-0 overflow-y-auto bg-[#fff8f5] text-[#2b1e1a]">
      <main className="mx-auto flex flex-col w-full h-auto max-w-3xl gap-5 px-4 py-7 md:px-8 md:py-10 mb-24">
        <div className="flex flex-col items-center justify-start gap-4">
          <h3 className="mb-6 text-xl font-semibold text-(--primary) md:text-2xl">
            Resume Builder
          </h3>
          <div className="w-full">
            <p className="mb-0 mt-2 max-w-xl text-sm leading-6 text-[#817773]">
              Add your contact information, education, and skills. Your changes are saved automatically.
            </p>
          </div>
        </div>

        <PersonalDetailsCard />
        <EducationCard />
        <SkillsCard />

        <div className="flex items-center justify-between border-t border-[#f0e3dd] pt-4 mb-20">
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate("/builder")}
            className="text-xs text-muted-foreground cursor-pointer hover:underline gap-1.5"
          >
            <ArrowLeft />
            Back to builder
          </Button>
          <Button
            type="button"
            onClick={() => navigate("/review")}
            className="gap-1.5 bg-[#2b1e1a] text-xs cursor-pointer text-white hover:bg-[#49342d]"
          >
            Review
            <ArrowRight />
          </Button>
        </div>
      </main>
    </section>
  )
}

export default Polish
