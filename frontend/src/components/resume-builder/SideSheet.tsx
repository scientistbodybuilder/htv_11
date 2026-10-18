import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useResumeStore } from "@/store/resume-store"
import SheetCard from "./SheetCard"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const SideSheet = () => {
    const [query, setQuery] = useState("")
    const resumeBlocks = useResumeStore((state) => state.resumeBlocks)
    const normalizedQuery = query.trim().toLocaleLowerCase()
    const visibleBlocks = useMemo(
        () => normalizedQuery
            ? resumeBlocks.filter((block) =>
                [block.role, block.organization, block.projectName]
                    .some((value) => value?.toLocaleLowerCase().includes(normalizedQuery))
            )
            : resumeBlocks,
        [normalizedQuery, resumeBlocks]
    )
    const suggestions = useMemo(
        () => [...new Set(resumeBlocks.flatMap((block) =>
            [block.role, block.organization, block.projectName]
                .filter((value): value is string => Boolean(value?.trim()))
        ))],
        [resumeBlocks]
    )

    return(
        <Sheet>
            <SheetTrigger className="flex items-center justify-center rounded-md text-xs cursor-pointer p-2 text-(--primary) transition duration-100 hover:text-(--primary)/80 focus-visible:outline-none">
                Resume Blocks
            </SheetTrigger>
            <SheetContent
            side="right"
            className="w-[85vw] max-w-sm border-l border-(--primary)/10 bg-(--background) py-0 px-4">
                <SheetHeader className="px-0!">
                    <SheetTitle className="text-(--primary) m-0! p-0!">Resume Blocks</SheetTitle>
                </SheetHeader>
                <div className="flex min-h-0 flex-1 flex-col gap-4 py-5">
                    <label className="relative block shrink-0">
                        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-(--secondary)" />
                        <Input
                            type="search"
                            list="resume-block-search-options"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search role, organization, or project"
                            aria-label="Search resume blocks by role, organization, or project"
                            className="h-10 border-(--primary)/15 bg-white pl-9 text-sm placeholder:text-(--secondary)/70 focus-visible:border-(--secondary) focus-visible:ring-(--secondary)/20"
                        />
                        <datalist id="resume-block-search-options">
                            {suggestions.map((suggestion) => (
                                <option key={suggestion} value={suggestion} />
                            ))}
                        </datalist>
                    </label>

                    {resumeBlocks.length === 0 ? (
                        <p className="m-0 rounded-lg bg-white p-4 text-sm text-(--secondary)" role="status">
                            No resume blocks yet. Upload a resume to see your blocks here.
                        </p>
                    ) : visibleBlocks.length === 0 ? (
                        <p className="m-0 rounded-lg bg-white p-4 text-sm text-(--secondary)" role="status">
                            No resume blocks match “{query.trim()}”.
                        </p>
                    ) : (
                        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1" aria-label="Resume blocks">
                            {visibleBlocks.map((block) => (
                                <SheetCard key={block.id} block={block} />
                            ))}
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default SideSheet