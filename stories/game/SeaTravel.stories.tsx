import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react"

import useModal from "@/app/stores/modals"
import Harbor from "@/components/location/Harbor"
import SeaEventDialog from "@/components/location/Sea/SeaEventDialog"
import { PLAYER_QUERY_KEY } from "@/hooks/queries/usePlayer"

import { player } from "../fixtures"

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
    medicine: 6,
    rum: 10,
    repairKits: 1,
  },
  ships: {
    endeavour: { ...player.ships.endeavour, health: 65 },
  },
  locationStates: {
    sea: {
      shipMeeting: null,
      attackFailureReport: {
        inventoryPercentageLoss: 50,
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
    medicine: 0,
    rum: 0,
    repairKits: 0,
  },
  locationStates: {
    sea: {
      shipMeeting: null,
      attackFailureReport: {
        inventoryPercentageLoss: 100,
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

const harborArrival: Player = {
  ...player,
  character: { ...player.character, location: "Harbor" },
  crewMembers: { ...player.crewMembers, mood: 20 },
  inventory: { ...player.inventory, food: 5 },
  locationStates: { harbor: { lastHarborReason: "arrived" } },
}

const PlayerPreview = ({
  data,
  children,
}: {
  data: Player
  children: ReactNode
}) => {
  const [queryClient] = useState(() => {
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false, staleTime: Infinity } },
    })
    client.setQueryData([PLAYER_QUERY_KEY], data)
    return client
  })

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

const meta = {
  title: "game/SeaTravel",
  component: SeaEventDialog,
  parameters: { player },
  beforeEach() {
    useModal.setState(useModal.getInitialState(), true)
  },
  decorators: [
    (Story, context) => (
      <PlayerPreview key={context.id} data={context.parameters.player}>
        <Story />
      </PlayerPreview>
    ),
  ],
} satisfies Meta<typeof SeaEventDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Victory: Story = { parameters: { player: victory } }
export const Defeat: Story = { parameters: { player: defeat } }
export const TotalLoss: Story = { parameters: { player: totalLoss } }
export const FleetVictory: Story = { parameters: { player: fleetVictory } }
export const EnemyShip: Story = { parameters: { player: enemyShip } }
export const AlliedShip: Story = { parameters: { player: alliedShip } }
export const PirateShip: Story = { parameters: { player: pirateShip } }
export const HarborArrival: Story = {
  parameters: { player: harborArrival },
  render: () => <Harbor />,
}
