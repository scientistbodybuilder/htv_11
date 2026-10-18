import { useState, useEffect } from "react"
import SideSheet from './SideSheet'
import { Button } from "@/components/ui/button"
import Builder from './Builder'
type ResumeFile = {
  name: string
  size: string
  status: string
}

const ResumeBuilder = () => {
  
  const [resumeReady, setResumeReady] = useState(false)
  

  return (
    <section className="h-[calc(100dvh-52px)] min-h-0 w-full overflow-hidden bg-[#fff8f5] text-[#2b1e1a]">
      <div className="flex h-full min-h-0 w-full flex-col items-center justify-start">
        <div className="w-full justify-end flex m-0 cursor-pointer px-3">
          <SideSheet />
        </div>

        <main className="min-h-0 w-full max-w-[900px] overflow-y-auto flex flex-col items-center justify-start p-4 md:p-6">
          <h3 className="font-semibold text-xl md:text-2xl text-(--primary) mb-6">Resume Builder</h3>
          <Builder />

        </main>

        
      </div>
    </section>
  )
}

export default ResumeBuilder
