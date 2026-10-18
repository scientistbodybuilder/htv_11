import { useRef, useState } from "react"
import { FileText, FolderOpen, Upload } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { uploadMasterResume } from '../../services/resumBuilderServices'
import {useResumeStore} from '../../store/resume-store'
import { useBuilderStore } from '@/store/builder-store'
import { useNavigate } from 'react-router-dom'

type ResumeFile = {
  name: string
  size: string
  status: string
}

const formatFileSize = (size: number) => {
  if (size < 1024 * 1024) return `${Math.max(1, Math.round(size / 1024))} KB`
  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}

const UploadCard = () => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [file, setFile] = useState<File | null>(null)
    const [resume, setResume] = useState<ResumeFile|null>(null)
    const [error, setError] = useState("")
    const [isDragging, setIsDragging] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [resumeReady, setResumeReady] = useState(false)
    const { addBlock } = useResumeStore()
    const { resetSectionBlocks } = useBuilderStore()
    const navigate = useNavigate()
    const selectFile = (file?: File) => {
      if (!file) return
  
      const isSupported = /\.(pdf|docx)$/i.test(file.name)
      if (!isSupported) {
        setError("Choose a PDF or DOCX file to continue.")
        return
      }
  
      setError("")
      setFile(file)
      setResume({
        name: file.name,
        size: formatFileSize(file.size),
        status: "Ready to parse",
      })
    }

    const goToBuilderPage = () => {
        resetSectionBlocks()
        navigate('/builder')
    }
  
    const uploadResume = async (file: File|null) => {
      if (!file) return
      try {
        setUploading(true)
        const result = await uploadMasterResume(file)
        console.log('upload result:', result)
        //add uploaded results to zustand
        result.result.forEach((block: any) => {
          addBlock(block)
        })
        setResumeReady(true)
      } catch (err) {
        console.error('Error uploading resume:', err)
      } finally {
        setUploading(false)
      }
      
    }

    return (
          
        <Card className="mx-auto w-full max-w-3xl gap-2 rounded-xl border-0 bg-white p-6 shadow-sm ring-0 md:p-6">
            <div className="flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold tracking-wide text-[#984629]">Max file size 10 MB</span>
              </div>
              {/* <div className="flex items-center gap-1.5 text-[#726b68]">
                <span className="size-2 rounded-full bg-[#984629]" />
                In-memory sandbox
              </div> */}
            </div>

            <div
              className={`flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed px-5 py-8 text-center transition-colors md:min-h-[318px] ${
                isDragging
                  ? "border-[#984629] bg-[#fff0e8]"
                  : "border-transparent bg-[#fff8f5]"
              }`}
              onDragEnter={(event) => {
                event.preventDefault()
                setIsDragging(true)
              }}
              onDragOver={(event) => event.preventDefault()}
              onDragLeave={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  setIsDragging(false)
                }
              }}
              onDrop={(event) => {
                event.preventDefault()
                setIsDragging(false)
                selectFile(event.dataTransfer.files[0])
              }}
            >
              <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-[#f7e9e2] text-[#984629]">
                <Upload className="size-6" strokeWidth={1.8} />
              </div>
              <h1 className="text-xl font-semibold text-(--primary)">
                Drop your Master File here
              </h1>
              <p className="mt-1.5 max-w-lg text-sm leading-5 text-[#817773]">
                We parse your uncurated career history client-side into neat,
                modular achievements. No formatting gets broken.
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="sr-only"
                onChange={(event) => selectFile(event.currentTarget.files?.[0])}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-5 cursor-pointer inline-flex h-9 items-center gap-2 rounded-lg bg-(--primary) px-4 text-sm font-medium text-white transition-colors hover:bg-(--primary)/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#984629]"
              >
                <FolderOpen className="size-4" />
                Browse Document
              </button>
              {error && (
                <p role="alert" className="mt-3 text-sm text-red-700">
                  {error}
                </p>
              )}
              {file && (
                <p className="mt-2 text-xs text-(--secondary)">
                  File selected: {file.name}
                </p>
              )}
              <div className="mt-3 flex gap-2 text-[10px] font-medium uppercase tracking-wide text-[#817773]">
                <span className="rounded bg-[#f7e9e2] px-2 py-0.5">.PDF</span>
              </div>
            </div>

            <Button onClick={() => uploadResume(file)} className="cursor-pointer bg-(--primary) text-white" disabled={!resume || !file}>
                {uploading ? <Spinner /> : "Upload"}
            </Button>

            {resumeReady && (
              <button
                type="button"
                onClick={() => goToBuilderPage()}
                className="mt-4 cursor-pointer inline-flex h-9 items-center gap-2 rounded-lg bg-(--primary) px-4 text-sm font-medium text-white transition-colors hover:bg-(--primary)/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#984629]"
              >
                Continue to Builder
              </button>
            )}

          </Card>
    )
}

export default UploadCard