import { useMemo, useState, type FormEvent } from "react"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar"

const filters = ["All (14)", "Backend & Infra (6)", "Data Pipelines (5)", "Leadership"]

const SidePanel = () => {
  const [query, setQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState(filters[0])
  const [customBlocks, setCustomBlocks] = useState<string[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [blockName, setBlockName] = useState("")

  const visibleBlocks = useMemo(
    () =>
      customBlocks.filter((block) =>
        block.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      ),
    [customBlocks, query]
  )

  const addCustomBlock = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const name = blockName.trim()
    if (!name) return
    setCustomBlocks((blocks) => [...blocks, name])
    setBlockName("")
    setIsDialogOpen(false)
  }

  return (
    <SidebarProvider
      defaultOpen
      className="!min-h-0 h-full min-w-0 flex-1 md:w-[400px] md:flex-none"
    >
      <Sidebar
        side="right"
        collapsible="none"
        className="w-full border-l border-[#f2e5df] bg-white text-[#2b1e1a]"
        style={{ width: "100%" }}
      >
        <SidebarHeader className="gap-0 bg-[#fff1e9] px-5 py-4 md:px-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-lg font-semibold leading-6 tracking-tight text-[#2b1e1a]">
                Master
                <br />
                Blocks
              </h2>
              <p className="mt-0.5 text-xs leading-4 text-[#817773]">
                Ready to compose into target drafts
              </p>
            </div>
            <span className="rounded-full bg-[#984629] px-3 py-1 text-center text-[10px] leading-3 text-white">
              <strong className="block font-semibold">{14 + customBlocks.length}</strong>
              Blocks
            </span>
          </div>
        </SidebarHeader>

        <SidebarContent className="gap-3 px-4 py-4 md:px-4">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#817773]" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Filter by impact keyword, Docker, AWS, latency..."
              aria-label="Filter master blocks"
              className="h-9 rounded-lg border-[#f0e1d9] bg-[#fff8f5] pl-9 text-xs shadow-none placeholder:text-[#817773] focus-visible:border-[#984629] focus-visible:ring-[#984629]/20"
            />
          </label>

          <div className="flex flex-wrap gap-1.5">
            {filters.map((filter) => {
              const isActive = activeFilter === filter
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={isActive}
                  className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors ${
                    isActive
                      ? "bg-[#170f0d] text-white"
                      : "bg-[#fff1e9] text-[#2b1e1a] hover:bg-[#f8dfd3]"
                  }`}
                >
                  {filter}
                </button>
              )
            })}
          </div>

          {visibleBlocks.length > 0 && (
            <div className="space-y-2 pt-1">
              {visibleBlocks.map((block, index) => (
                <div
                  key={`${block}-${index}`}
                  className="rounded-lg border border-[#f2e5df] bg-white p-3 text-sm"
                >
                  {block}
                </div>
              ))}
            </div>
          )}
        </SidebarContent>

        <SidebarFooter className="border-t border-[#f2e5df] bg-[#fff1e9] px-4 py-3">
          <Button
            type="button"
            onClick={() => setIsDialogOpen(true)}
            className="h-8 w-fit rounded-lg bg-[#170f0d] px-3 text-xs text-white hover:bg-[#39231d]"
          >
            <Plus />
            Custom Block
          </Button>
        </SidebarFooter>
      </Sidebar>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a custom block</DialogTitle>
            <DialogDescription>
              Create a block to add to your master resume.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={addCustomBlock} className="space-y-4">
            <Input
              autoFocus
              value={blockName}
              onChange={(event) => setBlockName(event.target.value)}
              placeholder="e.g. Reduced infrastructure costs by 30%"
              aria-label="Custom block text"
              required
            />
            <div className="flex justify-end">
              <Button type="submit" className="bg-[#170f0d] text-white hover:bg-[#39231d]">
                Add block
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}

export default SidePanel
