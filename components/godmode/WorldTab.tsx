import MerchandiseIcon from "@/components/MerchandiseIcon"
import Select from "@/components/Select"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { NATION_OR_PIRATE_OPTIONS, NONE, SHIP_TYPE_OPTIONS } from "./constants"
import NumberField from "./NumberField"
import SwitchField from "./SwitchField"
import type { GodModeTabProps } from "./types"

const Section = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => (
  <section className="flex flex-col gap-4">
    <h3 className="font-serif text-lg">{title}</h3>

    {children}
  </section>
)

const WorldTab = ({ draft, update }: GodModeTabProps) => {
  const { market, tavern, sea, harbor } = draft.locationStates ?? {}

  const updateStates = (recipe: (states: LocationStates) => void) =>
    update((d) => recipe((d.locationStates ??= {})))

  return (
    <div className="flex flex-col gap-8">
      <Section title="Market">
        {market ? (
          <>
            <SwitchField
              label="Visited"
              checked={!!market.visited}
              onChange={(visited) =>
                updateStates((s) => {
                  if (s.market) s.market.visited = visited || undefined
                })
              }
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {Object.entries(market.items ?? {}).map(([item, values]) => (
                <Card key={`market-${item}`} className="gap-2 p-4">
                  <p className="flex items-center gap-2 text-xs tracking-wide uppercase">
                    <MerchandiseIcon item={item} size="sm" />
                    {item}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <NumberField
                      label="Quantity"
                      value={values.quantity}
                      onChange={(quantity) =>
                        updateStates((s) => {
                          const found = s.market?.items[item as keyof Inventory]

                          if (found) found.quantity = quantity
                        })
                      }
                    />

                    <NumberField
                      label="Price"
                      value={values.price}
                      onChange={(price) =>
                        updateStates((s) => {
                          const found = s.market?.items[item as keyof Inventory]

                          if (found) found.price = price
                        })
                      }
                    />
                  </div>
                </Card>
              ))}
            </div>

            <div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => updateStates((s) => void delete s.market)}
              >
                Reset market
              </Button>
            </div>
          </>
        ) : (
          <p className="text-muted-foreground">
            No market state. It is generated when the player visits a market.
          </p>
        )}
      </Section>

      <Section title="Tavern">
        {tavern ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberField
                label="Sailors for hire"
                value={tavern.noOfSailors}
                onChange={(noOfSailors) =>
                  updateStates((s) => {
                    if (s.tavern) s.tavern.noOfSailors = noOfSailors
                  })
                }
              />

              <div className="flex flex-col justify-end gap-4">
                <SwitchField
                  label="Visited"
                  checked={!!tavern.visited}
                  onChange={(visited) =>
                    updateStates((s) => {
                      if (s.tavern) s.tavern.visited = visited || undefined
                    })
                  }
                />

                <SwitchField
                  label="Hostile sailors"
                  checked={tavern.isHostile}
                  onChange={(isHostile) =>
                    updateStates((s) => {
                      if (s.tavern) s.tavern.isHostile = isHostile
                    })
                  }
                />
              </div>
            </div>

            <div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => updateStates((s) => void delete s.tavern)}
              >
                Reset tavern
              </Button>
            </div>
          </>
        ) : (
          <p className="text-muted-foreground">
            No tavern state. It is generated when the player visits a tavern.
          </p>
        )}
      </Section>

      <Section title="Sea encounter">
        {sea?.shipMeeting ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              label="Nation"
              name="shipMeetingNation"
              value={sea.shipMeeting.nation}
              options={NATION_OR_PIRATE_OPTIONS as unknown as string[]}
              onChange={(nation) =>
                updateStates((s) => {
                  if (s.sea?.shipMeeting)
                    s.sea.shipMeeting.nation = nation as Nation | "Pirate"
                })
              }
            />

            <Select
              label="Ship type"
              name="shipMeetingType"
              value={sea.shipMeeting.shipType}
              options={SHIP_TYPE_OPTIONS}
              onChange={(shipType) =>
                updateStates((s) => {
                  if (s.sea?.shipMeeting)
                    s.sea.shipMeeting.shipType = shipType as ShipType
                })
              }
            />

            <NumberField
              label="Crew members"
              value={sea.shipMeeting.crewMembers}
              onChange={(crewMembers) =>
                updateStates((s) => {
                  if (s.sea?.shipMeeting)
                    s.sea.shipMeeting.crewMembers = crewMembers
                })
              }
            />

            <NumberField
              label="Cannons"
              value={sea.shipMeeting.cannons}
              onChange={(cannons) =>
                updateStates((s) => {
                  if (s.sea?.shipMeeting) s.sea.shipMeeting.cannons = cannons
                })
              }
            />
          </div>
        ) : (
          <p className="text-muted-foreground">No ship is being met.</p>
        )}

        {sea?.battle && (
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberField
              label="Player strength"
              value={sea.battle.playerStrength}
              onChange={(playerStrength) =>
                updateStates((s) => {
                  if (s.sea?.battle)
                    s.sea.battle.playerStrength = playerStrength
                })
              }
            />

            <NumberField
              label="Enemy strength"
              value={sea.battle.enemyStrength}
              onChange={(enemyStrength) =>
                updateStates((s) => {
                  if (s.sea?.battle) s.sea.battle.enemyStrength = enemyStrength
                })
              }
            />
          </div>
        )}

        {!!sea && (
          <div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => updateStates((s) => void delete s.sea)}
            >
              Clear sea state
            </Button>
          </div>
        )}
      </Section>

      <Section title="Harbor">
        <Select
          label="Last harbor reason"
          name="lastHarborReason"
          value={harbor?.lastHarborReason ?? NONE}
          options={[NONE, "arrived"]}
          onChange={(reason) =>
            updateStates((s) => {
              s.harbor = {
                ...s.harbor,
                lastHarborReason: reason === "arrived" ? "arrived" : null,
              }
            })
          }
        />
      </Section>
    </div>
  )
}

export default WorldTab
