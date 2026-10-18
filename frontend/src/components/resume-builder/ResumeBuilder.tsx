import { useState, useEffect } from "react"
import SideSheet from './SideSheet'
import { Button } from "@/components/ui/button"
import Builder from './Builder'
import { useNavigate } from 'react-router-dom'
import { PenLine } from "lucide-react"

const ResumeBuilder = () => {
  const navigate = useNavigate()
  const [resumeReady, setResumeReady] = useState(false)
  
  

  return (
    <section className="h-[calc(100dvh-52px)] min-h-0 w-full overflow-y-auto bg-[#fff8f5] text-[#2b1e1a]">
      <div className="flex h-auto w-full flex-col items-center justify-start mb-24">
        <div className="w-full justify-end flex m-0 cursor-pointer px-3">
          <SideSheet />
        </div>

        <main className="h-auto w-full max-w-[900px] flex flex-col items-center justify-start p-4 md:p-6">
          <h3 className="font-semibold text-xl md:text-2xl text-(--primary) mb-6">Resume Builder</h3>
          <Builder />
          <div className="w-full flex items-center justify-between mt-12">
            <p className="text-xs text-muted-foreground cursor-pointer hover:underline" onClick={() => navigate('/upload')}>
              Back to Upload
            </p>
            <Button
            type="button"
            onClick={() => navigate("/review")}
            className="gap-1.5 bg-[#2b1e1a] text-xs text-white cursor-pointer hover:bg-[#49342d]"
          >
            Details
            <PenLine />
          </Button>
          </div>

        </main>

        
      </div>
    </section>
  )
}

export default ResumeBuilder
