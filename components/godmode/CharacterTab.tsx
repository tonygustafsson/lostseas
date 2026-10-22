import Flag from "@/components/icons/Flag"
import Select from "@/components/Select"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CHARACTERS, getCharacterById } from "@/constants/characters"

import {
  LOCATION_OPTIONS,
  NATION_OPTIONS,
  NATION_OR_PIRATE_OPTIONS,
  NONE,
  TITLE_OPTIONS,
  TOWN_OPTIONS,
} from "./constants"
import NumberField from "./NumberField"
import TextInputField from "./TextInputField"
import type { GodModeTabProps } from "./types"

const CharacterTab = ({ draft, update }: GodModeTabProps) => {
  const { character } = draft

  const setBattles = (
    nation: Nation | "Pirate",
    field: "won" | "lost",
    value: number
  ) =>
    update((d) => {
      const battles = (d.character.battles ??= {} as NonNullable<
        Character["battles"]
      >)

      battles[nation] = { ...battles[nation], [field]: value }
    })

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextInputField
          label="Name"
          value={character.name}
          onChange={(name) => update((d) => void (d.character.name = name))}
        />

        <Select
          label="Character"
          name="characterId"
          value={getCharacterById(character.characterId)?.name}
          options={CHARACTERS.map((c) => c.name)}
          onChange={(name) =>
            update((d) => {
              const found = CHARACTERS.find((c) => c.name === name)

              if (found) d.character.characterId = found.id
            })
          }
        />

        <Select
          label="Nationality"
          name="nationality"
          value={character.nationality}
          options={NATION_OPTIONS}
          onChange={(nationality) =>
            update(
              (d) => void (d.character.nationality = nationality as Nation)
            )
          }
        />

        <Select
          label="Title"
          name="title"
          value={character.title}
          options={TITLE_OPTIONS}
          onChange={(title) =>
            update((d) => void (d.character.title = title as Title))
          }
        />

        <Select
          label="Highest rewarded title"
          name="highestRewardedTitle"
          value={character.highestRewardedTitle ?? NONE}
          options={[NONE, ...TITLE_OPTIONS]}
          onChange={(title) =>
            update((d) => {
              d.character.highestRewardedTitle =
                title === NONE ? undefined : (title as Title)
            })
          }
        />

        <Select
          label="Town"
          name="town"
          value={character.town ?? NONE}
          options={[NONE, ...TOWN_OPTIONS]}
          onChange={(town) =>
            update((d) => {
              d.character.town = town === NONE ? undefined : (town as Town)
            })
          }
        />

        <Select
          label="Location"
          name="location"
          value={character.location}
          options={LOCATION_OPTIONS}
          onChange={(location) =>
            update(
              (d) =>
                void (d.character.location = location as Character["location"])
            )
          }
        />

        <NumberField
          label="Day"
          value={character.day}
          onChange={(day) => update((d) => void (d.character.day = day))}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-2">
          <NumberField
            label="Gold"
            value={character.gold}
            onChange={(gold) => update((d) => void (d.character.gold = gold))}
          />

          <div className="flex gap-2">
            {[1000, 10000].map((amount) => (
              <Button
                key={`gold-${amount}`}
                variant="secondary"
                size="sm"
                onClick={() => update((d) => void (d.character.gold += amount))}
              >
                +{amount.toLocaleString("en-GB")}
              </Button>
            ))}
          </div>
        </div>

        <NumberField
          label="Bank account"
          value={character.account ?? 0}
          onChange={(account) =>
            update((d) => void (d.character.account = account || undefined))
          }
        />

        <NumberField
          label="Loan"
          value={character.loan ?? 0}
          onChange={(loan) =>
            update((d) => void (d.character.loan = loan || undefined))
          }
        />
      </div>

      <div>
        <h3 className="mb-4 font-serif text-lg">Battles</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          {NATION_OR_PIRATE_OPTIONS.map((nation) => (
            <Card key={`battles-${nation}`} className="gap-2 p-4">
              <p className="flex items-center gap-2 text-xs tracking-wide uppercase">
                <Flag nation={nation} size={16} decorative />
                {nation}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <NumberField
                  label="Won"
                  value={character.battles?.[nation]?.won ?? 0}
                  onChange={(won) => setBattles(nation, "won", won)}
                />

                <NumberField
                  label="Lost"
                  value={character.battles?.[nation]?.lost ?? 0}
                  onChange={(lost) => setBattles(nation, "lost", lost)}
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CharacterTab
