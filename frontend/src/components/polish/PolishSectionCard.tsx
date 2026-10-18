import type { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PolishSectionCardProps {
  title: string
  description: string
  action?: ReactNode
  children: ReactNode
  contentClassName?: string
}

export const polishFieldClassName =
  "mt-1.5 h-10 border-[#eadbd4] bg-white text-sm placeholder:text-[#9b8b84] focus-visible:border-[#984629] focus-visible:ring-[#984629]/20"

export const polishLabelClassName = "block text-xs font-medium text-[#51423d]"

const PolishSectionCard = ({
  title,
  description,
  action,
  children,
  contentClassName = "px-5 py-5 md:px-6",
}: PolishSectionCardProps) => (
  <Card className="gap-0 border border-[#f0e3dd] bg-white py-0 shadow-sm ring-0">
    <CardHeader
      className={`flex flex-row items-center justify-between gap-4 border-b border-[#f2e8e3] px-5 py-4 md:px-6 ${
        action ? "" : "items-start"
      }`}
    >
      <div>
        <CardTitle className="text-base font-semibold text-[#2b1e1a]">{title}</CardTitle>
        <p className="mb-0 mt-1 text-xs text-[#817773]">{description}</p>
      </div>
      {action}
    </CardHeader>
    <CardContent className={contentClassName}>{children}</CardContent>
  </Card>
)

export default PolishSectionCard
