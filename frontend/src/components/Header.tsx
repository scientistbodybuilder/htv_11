import { UserRound } from "lucide-react"

const Header = () => (
  <header className="flex h-[52px] w-full shrink-0 items-center justify-between bg-[#fff1e9] px-5 text-xs text-[#2b1e1a] md:px-7">
    <div className="flex items-center gap-2 rounded-full bg-[#f8e7de] px-4 py-1.5">
      <span className="size-1.5 rounded-full bg-[#984629]" />
      <span className="font-medium">Daily Capacity:</span>
      <span className="text-[#984629]">3.5 hrs available</span>
    </div>
    <div className="flex items-center gap-3">
      <span className="font-medium">Ousman</span>
      <div
        aria-label="Ousman's account"
        className="flex size-7 items-center justify-center rounded-full bg-[#170f0d] text-white"
      >
        <UserRound className="size-3.5" />
      </div>
    </div>
  </header>
)

export default Header
