import NumberField from "./NumberField"
import RangeField from "./RangeField"
import type { GodModeTabProps } from "./types"

const CrewTab = ({ draft, update }: GodModeTabProps) => {
  const { crewMembers } = draft

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <NumberField
        label="Crew members"
        value={crewMembers.count}
        onChange={(count) => update((d) => void (d.crewMembers.count = count))}
      />

      <RangeField
        label="Health"
        value={crewMembers.health}
        onChange={(health) =>
          update((d) => void (d.crewMembers.health = health))
        }
      />

      <RangeField
        label="Mood"
        value={crewMembers.mood}
        onChange={(mood) => update((d) => void (d.crewMembers.mood = mood))}
      />
    </div>
  )
}

export default CrewTab
