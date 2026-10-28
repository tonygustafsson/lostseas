import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import useModal from "@/app/stores/modals"
import SeaEventDialog from "@/components/location/Sea/SeaEventDialog"
import { NATIONS } from "@/constants/locations"
import { SHIP_TYPES } from "@/constants/ship"

import { player } from "../fixtures"
import PlayerPreview from "../PlayerPreview"

type SeaTravelArgs = Partial<
  Pick<ShipMeetingState, "nation" | "shipType" | "isAggressive">
>

const victory: Player = {
  ...player,
  character: { ...player.character, location: "Sea", town: undefined },
  inventory: { ...player.inventory, repairKits: 2 },
  treasures: {
    "story-treasure": {
      id: "story-treasure",
      name: "Inca mask",
      rewarder: "Havana",
    },
  },
  locationStates: {
    sea: {
      shipMeeting: null,
      attackSuccessReport: {
        lootedGold: 250,
        crewMoodIncrease: 20,
        crewMemberRecruits: 5,
        lootedMerchandise: { food: 12, water: 8, cannons: 1, repairKits: 2 },
        crewHealthLoss: 4,
        shipHealthLoss: 7,
        foundTreasure: {
          id: "story-treasure",
          name: "Inca mask",
          rewarder: "Havana",
        },
      },
      lootOffer: { food: 12, water: 8, cannons: 1, repairKits: 2 },
    },
  },
}

const defeat: Player = {
  ...victory,
  character: { ...victory.character, gold: 0 },
  crewMembers: { ...victory.crewMembers, health: 73 },
  inventory: {
    food: 90,
    water: 120,
    cannons: 8,
    medicine: 0,
    rum: 0,
    repairKits: 1,
  },
  ships: {
    endeavour: { ...player.ships.endeavour, health: 65 },
  },
  locationStates: {
    sea: {
      shipMeeting: null,
      attackFailureReport: {
        lostMerchandise: { rum: 10, medicine: 6 },
        crewHealthLoss: 12,
        shipHealthLoss: 20,
        sunkShip: "Black Pearl",
      },
    },
  },
}

const totalLoss: Player = {
  ...defeat,
  inventory: {
    food: 0,
    water: 0,
    cannons: 8,
    medicine: 6,
    rum: 0,
    repairKits: 1,
  },
  locationStates: {
    sea: {
      shipMeeting: null,
      attackFailureReport: {
        lostMerchandise: { food: 40, water: 120, rum: 10 },
        crewHealthLoss: 12,
        shipHealthLoss: 20,
        sunkShip: false,
      },
    },
  },
}

const fleetVictory: Player = {
  ...victory,
  ships: {
    ...victory.ships,
    blackPearl: {
      id: "blackPearl",
      name: "Black Pearl",
      type: "Frigate",
      health: 53,
      createdDay: 1,
    },
  },
}

const meeting = (shipMeeting: ShipMeetingState): Player => ({
  ...player,
  character: { ...player.character, location: "Sea", town: undefined },
  locationStates: { sea: { shipMeeting } },
})

const enemyShip = meeting({
  nation: "France",
  shipType: "Galleon",
  cannons: 6,
  crewMembers: 12,
})

const alliedShip = meeting({
  nation: "England",
  shipType: "Frigate",
  cannons: 8,
  crewMembers: 16,
})

const pirateShip = meeting({
  nation: "Pirate",
  shipType: "Brig",
  cannons: 10,
  crewMembers: 20,
})

const inBattle = (battle: BattleState): Player => ({
  ...enemyShip,
  locationStates: {
    sea: {
      shipMeeting: enemyShip.locationStates?.sea?.shipMeeting,
      battle,
    },
  },
})

const battleStart = inBattle({ enemyStrength: 100, playerStrength: 100 })

const battleAfterFailedFlee = inBattle({
  enemyStrength: 100,
  playerStrength: 100,
  failedToFlee: true,
})

const battleMidway = inBattle({
  enemyStrength: 58,
  playerStrength: 82,
  rounds: [
    {
      action: "fire",
      hit: true,
      enemyDamage: 42,
      playerDamage: 0,
      shipDamage: 0,
      crewDamage: 0,
    },
    {
      action: "fire",
      hit: false,
      enemyDamage: 0,
      playerDamage: 18,
      shipDamage: 5,
      crewDamage: 4,
    },
  ],
})

const battleLastRound = inBattle({
  enemyStrength: 35,
  playerStrength: 70,
  rounds: [
    {
      action: "fire",
      hit: true,
      enemyDamage: 33,
      playerDamage: 0,
      shipDamage: 0,
      crewDamage: 0,
    },
    {
      action: "fire",
      hit: false,
      enemyDamage: 0,
      playerDamage: 21,
      shipDamage: 6,
      crewDamage: 4,
    },
    {
      action: "evade",
      hit: true,
      enemyDamage: 0,
      playerDamage: 0,
      shipDamage: 0,
      crewDamage: 0,
    },
    {
      action: "evade",
      hit: false,
      enemyDamage: 0,
      playerDamage: 9,
      shipDamage: 2,
      crewDamage: 2,
    },
  ],
})

const meta = {
  title: "game/SeaTravel",
  component: SeaEventDialog,
  parameters: { player },
  argTypes: {
    nation: {
      name: "Nation",
      control: "select",
      options: [...Object.keys(NATIONS), "Pirate"],
      if: { arg: "nation", exists: true },
    },
    shipType: {
      name: "Ship type",
      control: "select",
      options: Object.keys(SHIP_TYPES),
      if: { arg: "shipType", exists: true },
    },
    isAggressive: {
      name: "Aggressive",
      control: "boolean",
      if: { arg: "isAggressive", exists: true },
    },
  },
  beforeEach() {
    useModal.setState(useModal.getInitialState(), true)
  },
  decorators: [
    (Story, context) => {
      const data: Player = context.parameters.player
      const shipMeeting = data.locationStates?.sea?.shipMeeting

      return (
        <PlayerPreview
          key={`${context.id}-${context.args.nation}-${context.args.shipType}-${context.args.isAggressive}`}
          data={
            shipMeeting
              ? {
                  ...data,
                  locationStates: {
                    sea: {
                      ...data.locationStates?.sea,
                      shipMeeting: {
                        ...shipMeeting,
                        nation: context.args.nation ?? shipMeeting.nation,
                        shipType: context.args.shipType ?? shipMeeting.shipType,
                        isAggressive:
                          context.args.isAggressive ?? shipMeeting.isAggressive,
                      },
                    },
                  },
                }
              : data
          }
        >
          <Story />
        </PlayerPreview>
      )
    },
  ],
} satisfies Meta<SeaTravelArgs>

export default meta
type Story = StoryObj<SeaTravelArgs>

export const Victory: Story = { parameters: { player: victory } }
export const Defeat: Story = { parameters: { player: defeat } }
export const TotalLoss: Story = { parameters: { player: totalLoss } }
export const FleetVictory: Story = { parameters: { player: fleetVictory } }
export const EnemyShip: Story = {
  args: { nation: "France", shipType: "Galleon", isAggressive: false },
  parameters: { player: enemyShip },
}
export const AggressiveEnemyShip: Story = {
  args: { nation: "France", shipType: "Galleon", isAggressive: true },
  parameters: { player: enemyShip },
}
export const AlliedShip: Story = {
  args: { nation: "England", shipType: "Frigate" },
  parameters: { player: alliedShip },
}
export const PirateShip: Story = {
  args: { nation: "Pirate", shipType: "Brig", isAggressive: false },
  parameters: { player: pirateShip },
}
export const AggressivePirateShip: Story = {
  args: { nation: "Pirate", shipType: "Brig", isAggressive: true },
  parameters: { player: pirateShip },
}

export const BattleStart: Story = {
  args: { nation: "France", shipType: "Galleon" },
  parameters: { player: battleStart },
}
export const BattleAfterFailedFlee: Story = {
  args: { nation: "France", shipType: "Galleon", isAggressive: true },
  parameters: { player: battleAfterFailedFlee },
}
export const BattleMidway: Story = {
  args: { nation: "France", shipType: "Galleon" },
  parameters: { player: battleMidway },
}
export const BattleLastRound: Story = {
  args: { nation: "France", shipType: "Galleon" },
  parameters: { player: battleLastRound },
}
