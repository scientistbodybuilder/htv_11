import pdfMake from "pdfmake"
import type { Content, TDocumentDefinitions } from "pdfmake/interfaces"
import pdfFonts from "pdfmake/build/vfs_fonts"
import type { ResumePreviewData } from "@/components/review/resumePreview"

let fontsRegistered = false

const sectionHeading = (title: string): Content => ({
  stack: [
    {
      text: title.toLocaleUpperCase(),
      fontSize: 10,
      margin: [0, 0, 0, 2],
    },
    {
      canvas: [
        {
          type: "line",
          x1: 0,
          y1: 0,
          x2: 511,
          y2: 0,
          lineWidth: 0.7,
        },
      ],
      margin: [0, 0, 0, 4],
    },
  ],
  margin: [0, 0, 0, 4],
})

const entryHeading = (title: string, dates: string): Content => ({
  columns: [
    { text: title, width: "*", bold: true },
    { text: dates, width: "auto", alignment: "right" },
  ],
  columnGap: 8,
  margin: [0, 2, 0, 0],
})

const buildDocumentDefinition = (resume: ResumePreviewData): TDocumentDefinitions => {
  const content: Content[] = [
    {
      text: resume.name,
      alignment: "center",
      bold: true,
      fontSize: 22,
      margin: [0, 0, 0, 2],
    },
  ]

  if (resume.contactLine.length > 0) {
    content.push({
      text: resume.contactLine.join(" | "),
      alignment: "center",
      fontSize: 8.5,
      margin: [0, 0, 0, 8],
    })
  } else {
    content.push({
      text: "Add contact information in the previous step.",
      alignment: "center",
      italics: true,
      fontSize: 8,
      margin: [0, 0, 0, 8],
    })
  }

  content.push(sectionHeading("Education"))
  if (resume.education.length > 0) {
    resume.education.forEach((entry) => {
      content.push(entryHeading(entry.school, entry.dates))
      if (entry.program) {
        content.push({
          text: entry.program,
          italics: true,
          fontSize: 9,
          margin: [0, 0, 0, 1],
        })
      }
      if (entry.gpa) {
        content.push({
          text: `GPA: ${entry.gpa}`,
          fontSize: 8.5,
          margin: [0, 0, 0, 2],
        })
      }
    })
  } else {
    content.push({
      text: "No education details added.",
      italics: true,
      fontSize: 8.5,
      margin: [0, 0, 0, 3],
    })
  }

  if (resume.sections.length === 0) {
    content.push({
      text: "No resume sections have been added in the builder.",
      italics: true,
      fontSize: 8.5,
      margin: [0, 0, 0, 3],
    })
  }

  resume.sections.forEach((section) => {
    content.push(sectionHeading(section.title))
    if (section.entries.length === 0) {
      content.push({
        text: "No entries added to this section.",
        italics: true,
        fontSize: 8.5,
        margin: [0, 0, 0, 3],
      })
      return
    }

    section.entries.forEach((entry) => {
      content.push(entryHeading(entry.title, entry.dates))
      if (entry.subtitle) {
        content.push({
          text: entry.subtitle,
          italics: true,
          fontSize: 9,
          margin: [0, 0, 0, 1],
        })
      }
      if (entry.bullets.length > 0) {
        content.push({
          ul: entry.bullets.map((bullet) => ({ text: bullet })),
          fontSize: 8.5,
          lineHeight: 1.1,
          margin: [12, 0, 0, 2],
        })
      }
    })
  })

  content.push(sectionHeading("Skills"))
  content.push(
    resume.skills.length > 0
      ? { text: resume.skills.join(", "), fontSize: 8.5 }
      : {
          text: "No skills added.",
          italics: true,
          fontSize: 8.5,
        }
  )

  return {
    pageSize: "A4",
    pageMargins: [42, 38, 42, 38],
    content,
    defaultStyle: {
      font: "Roboto",
      fontSize: 9,
      color: "#171717",
      lineHeight: 1.1,
    },
  }
}

export const downloadResumePdf = async (resume: ResumePreviewData) => {
  if (!fontsRegistered) {
    pdfMake.addVirtualFileSystem(pdfFonts)
    fontsRegistered = true
  }

  const safeName = resume.name
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, "")
    .trim()
    .replace(/\s+/g, "-")
  const fileName = `${safeName || "resume"}.pdf`

  await pdfMake.createPdf(buildDocumentDefinition(resume)).download(fileName)
}
