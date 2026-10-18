import { Input } from "@/components/ui/input"
import { usePolishStore } from "@/store/polish-store"
import PolishSectionCard, {
  polishFieldClassName,
  polishLabelClassName,
} from "./PolishSectionCard"

const PersonalDetailsCard = () => {
  const personalDetails = usePolishStore((state) => state.personalDetails)
  const updatePersonalDetails = usePolishStore((state) => state.updatePersonalDetails)

  return (
    <PolishSectionCard
      title="Personal details"
      description="How employers can reach and learn more about you."
      contentClassName="grid gap-x-5 gap-y-4 px-5 py-5 md:grid-cols-2 md:px-6"
    >
      <label className={polishLabelClassName}>
        Full name
        <Input
          autoComplete="name"
          value={personalDetails.name}
          onChange={(event) => updatePersonalDetails({ name: event.target.value })}
          placeholder="e.g. Alex Morgan"
          className={polishFieldClassName}
        />
      </label>
      <label className={polishLabelClassName}>
        Email
        <Input
          type="email"
          autoComplete="email"
          value={personalDetails.email}
          onChange={(event) => updatePersonalDetails({ email: event.target.value })}
          placeholder="alex@example.com"
          className={polishFieldClassName}
        />
      </label>
      <label className={polishLabelClassName}>
        Phone number
        <Input
          type="tel"
          autoComplete="tel"
          value={personalDetails.phone}
          onChange={(event) => updatePersonalDetails({ phone: event.target.value })}
          placeholder="+1 (555) 000-0000"
          className={polishFieldClassName}
        />
      </label>
      <label className={polishLabelClassName}>
        Location
        <Input
          autoComplete="address-level2"
          value={personalDetails.location}
          onChange={(event) => updatePersonalDetails({ location: event.target.value })}
          placeholder="City, Country"
          className={polishFieldClassName}
        />
      </label>
      <label className={polishLabelClassName}>
        LinkedIn URL
        <Input
          type="url"
          value={personalDetails.linkedinUrl}
          onChange={(event) => updatePersonalDetails({ linkedinUrl: event.target.value })}
          placeholder="https://linkedin.com/in/yourname"
          className={polishFieldClassName}
        />
      </label>
      <label className={polishLabelClassName}>
        GitHub URL
        <Input
          type="url"
          value={personalDetails.githubUrl}
          onChange={(event) => updatePersonalDetails({ githubUrl: event.target.value })}
          placeholder="https://github.com/yourname"
          className={polishFieldClassName}
        />
      </label>
      <label className={`${polishLabelClassName} md:col-span-2`}>
        Personal website or portfolio
        <Input
          type="url"
          value={personalDetails.websiteUrl}
          onChange={(event) => updatePersonalDetails({ websiteUrl: event.target.value })}
          placeholder="https://yourportfolio.com"
          className={polishFieldClassName}
        />
      </label>
    </PolishSectionCard>
  )
}

export default PersonalDetailsCard
