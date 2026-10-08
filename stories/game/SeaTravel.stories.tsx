import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react"

import useModal from "@/app/stores/modals"
import SeaEventDialog from "@/components/game-ui/ShowLocation/SeaEventDialog"
import Map from "@/components/Map"
import Modal from "@/components/Modal"
import { Button } from "@/components/ui/button"
import { PLAYER_QUERY_KEY } from "@/hooks/queries/usePlayer"

import { player } from "../fixtures"

const victory: Player = {
  ...player,
  character: { ...player.character, location: "Sea", town: undefined },
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
        foundTreasure: { name: "Inca mask", rewarder: "Havana" },
      },
    },
  },
}

const defeat: Player = {
  ...victory,
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

const blocked: Player = {
  ...player,
  ships: { endeavour: { ...player.ships.endeavour, health: 0 } },
  inventory: { ...player.inventory, food: 0, water: 0 },
  crewMembers: { ...player.crewMembers, mood: 0, health: 0 },
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

const DeparturePreview = () => {
  const { setModal } = useModal()

  return (
    <>
      <p>Current location: Shop, Port Royale</p>

      <Button
        onClick={() =>
          setModal({
            id: "map",
            title: "Map",
            fullWidth: true,
            content: <Map currentTown="Port Royale" />,
          })
        }
      >
        Open map
      </Button>

      <Modal />
    </>
  )
}

const meta = {
  title: "game/SeaTravel",
  component: SeaEventDialog,
  parameters: { player: victory },
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

export const Victory: Story = {}
export const Defeat: Story = { parameters: { player: defeat } }
export const BlockedDeparture: Story = {
  parameters: { player: blocked },
  render: () => <DeparturePreview />,
}
