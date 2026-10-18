import { useMemo, useState } from "react"
import { ArrowLeft, Download } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useBuilderStore } from "@/store/builder-store"
import { usePolishStore } from "@/store/polish-store"
import { downloadResumePdf } from "@/services/resumePdf"
import { createResumePreviewData } from "./resumePreview"

const Review = () => {
  const navigate = useNavigate()
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState("")
  const personalDetails = usePolishStore((state) => state.personalDetails)
  const education = usePolishStore((state) => state.education)
  const skills = usePolishStore((state) => state.skills)
  const sectionBlocks = useBuilderStore((state) => state.sectionBlocks)
  const resume = useMemo(
    () => createResumePreviewData(personalDetails, education, skills, sectionBlocks),
    [personalDetails, education, skills, sectionBlocks]
  )

  const handleDownload = async () => {
    setIsDownloading(true)
    setDownloadError("")
    try {
      await downloadResumePdf(resume)
    } catch (error) {
      console.error("Failed to download resume PDF:", error)
      setDownloadError("The PDF could not be created. Please try again.")
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <section className="h-[calc(100dvh-52px)] min-h-0 overflow-y-auto bg-[#fff8f5] text-[#2b1e1a]">
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-5 px-4 py-7 md:px-8 md:py-10">
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-[#984629]">
            Resume preview
          </p>
          <h1 className="m-0 text-2xl font-semibold tracking-tight text-[#2b1e1a]">
            Review your resume
          </h1>
          <p className="mb-0 mt-2 text-sm text-[#817773]">
            Check the layout and details below. This preview follows the same structure as the downloaded PDF.
          </p>
        </div>

        <article
          className="mx-auto min-h-[1000px] w-full max-w-[800px] border border-[#e9ddd7] bg-white px-7 py-10 shadow-md sm:px-12 sm:py-12"
          style={{ fontFamily: '"Times New Roman", Times, serif' }}
        >
          <header className="mb-5 text-center">
            <h2 className="m-0 text-[30px] font-bold leading-tight text-black">
              {resume.name}
            </h2>
            {resume.contactLine.length > 0 ? (
              <p className="mb-0 mt-1 break-words text-[11px] leading-4 text-black">
                {resume.contactLine.join(" | ")}
              </p>
            ) : (
              <p className="mb-0 mt-1 text-[11px] italic leading-4 text-[#777]">
                Add contact information in the previous step.
              </p>
            )}
          </header>

          <div className="space-y-4 text-black">
            <section>
              <h3 className="mb-1 border-b border-black pb-0.5 text-[13px] font-normal uppercase leading-tight tracking-wide">
                Education
              </h3>
              {resume.education.length > 0 ? (
                <div className="space-y-2">
                  {resume.education.map((entry) => (
                    <div key={entry.id} className="text-[12px] leading-[1.25]">
                      <div className="flex items-baseline justify-between gap-3">
                        <h4 className="m-0 font-bold">{entry.school}</h4>
                        {entry.dates && (
                          <span className="shrink-0 text-right">{entry.dates}</span>
                        )}
                      </div>
                      <div className="flex items-baseline justify-between gap-3">
                        {entry.program ? <p className="m-0 italic">{entry.program}</p> : <span />}
                        {entry.gpa && <span className="shrink-0">GPA: {entry.gpa}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="m-0 text-[11px] italic text-[#777]">No education details added.</p>
              )}
            </section>

            {resume.sections.map((section) => (
              <section key={section.id}>
                <h3 className="mb-1 border-b border-black pb-0.5 text-[13px] font-normal uppercase leading-tight tracking-wide">
                  {section.title}
                </h3>
                {section.entries.length > 0 ? (
                  <div className="space-y-2">
                    {section.entries.map((entry) => (
                      <div key={entry.id} className="text-[12px] leading-[1.25]">
                        <div className="flex items-baseline justify-between gap-3">
                          <h4 className="m-0 font-bold">{entry.title}</h4>
                          {entry.dates && (
                            <span className="shrink-0 text-right">{entry.dates}</span>
                          )}
                        </div>
                        {entry.subtitle && (
                          <p className="mb-0 mt-0.5 italic">{entry.subtitle}</p>
                        )}
                        {entry.bullets.length > 0 && (
                          <ul className="mb-0 mt-0.5 list-disc space-y-0 pl-5">
                            {entry.bullets.map((bullet, index) => (
                              <li key={`${entry.id}-bullet-${index}`} className="pl-0.5">
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="m-0 text-[11px] italic text-[#777]">
                    No entries added to this section.
                  </p>
                )}
              </section>
            ))}

            {resume.sections.length === 0 && (
              <p className="m-0 text-[11px] italic text-[#777]">
                No resume sections have been added in the builder.
              </p>
            )}

            <section>
              <h3 className="mb-1 border-b border-black pb-0.5 text-[13px] font-normal uppercase leading-tight tracking-wide">
                Skills
              </h3>
              {resume.skills.length > 0 ? (
                <p className="m-0 text-[11px] leading-[1.35]">{resume.skills.join(", ")}</p>
              ) : (
                <p className="m-0 text-[11px] italic text-[#777]">No skills added.</p>
              )}
            </section>
          </div>
        </article>

        {downloadError && (
          <p role="alert" className="m-0 text-right text-sm text-red-700">
            {downloadError}
          </p>
        )}

        <div className="flex justify-between border-t border-[#f0e3dd] pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate("/polish")}
            className="gap-1.5 text-xs cursor-pointer text-muted-foreground hover:underline"
          >
            <ArrowLeft />
            Back to details
          </Button>
          <Button
            type="button"
            onClick={handleDownload}
            disabled={isDownloading}
            className="gap-1.5 bg-[#2b1e1a] text-xs cursor-pointer text-white hover:bg-[#49342d]"
          >
            {isDownloading ? "Creating PDF…" : "Download PDF"}
            <Download />
          </Button>
        </div>
      </main>
    </section>
  )
}

export default Review
