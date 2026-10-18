import { useState, useEffect } from "react"
import SideSheet from './SideSheet'
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useNavigate } from 'react-router-dom'
import UploadCard from './UploadCard'
import { retrieveMasterResume } from '../../services/resumBuilderServices'
import {useResumeStore} from '../../store/resume-store'
import { useBuilderStore } from '@/store/builder-store'

const UploadResume = () => {
    const navigate = useNavigate()
    const { addBlocks, clearBlocks } = useResumeStore()
    const { resetSectionBlocks } = useBuilderStore()
    const [resumeAvailable, setResumeAvailable] = useState<null | boolean>(null)
    const [loadingResume, setLoadingResume] = useState(false)

    const goToBuilderPage = () => {
        resetSectionBlocks()
        navigate('/builder')
    }
    
    useEffect(() => {
        const checkResumeAvailability = async () => {
            try {
                setLoadingResume(true);
                // Example userId, replace with actual user ID
                const userId = 1;
                const masterResume = await retrieveMasterResume(userId);
                if (masterResume.success) {
                    //add blocks to state
                    clearBlocks()
                    addBlocks(masterResume.data);
                    setResumeAvailable(true);

                } else {
                    setResumeAvailable(false)
                }
            } catch (error) {
                console.error('Error checking resume availability:', error);
                setResumeAvailable(false);
            } finally {
                setLoadingResume(false);
            }
        };

        checkResumeAvailability();
    }, []);

    return (
        <section className="h-[calc(100dvh-52px)] min-h-0 w-full overflow-hidden bg-[#fff8f5] text-[#2b1e1a]">
        <div className="flex h-full min-h-0 w-full flex-col items-center justify-start">
            {loadingResume && <div className="flex items-center justify-center p-4 gap-2">
                <p className="text-xs text-(--priamry) m-0">Looking for your resume</p>
                <Spinner className="text-(--primary)" />
                </div>}
            {resumeAvailable === true && <div className="p-4 text-sm text-(--primary)">Resume available. <span className="underline cursor-pointer hover:text-(--primary)/60" onClick={() => goToBuilderPage()}>continue</span></div>}
            {resumeAvailable === false && <div className="p-4 text-xs text-(--priamry)">No resume available. Please upload one.</div>}
            <main className="min-h-0 w-full overflow-y-auto p-4 md:p-6">
            
            
            <div className={`${loadingResume ? 'opacity-50 pointer-events-none' : ''} w-auto h-auto`}>
                <UploadCard />
            </div>

            
            </main>

            
        </div>
        </section>
    )
}

export default UploadResume