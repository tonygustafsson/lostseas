import DefaultLayout from "@/components/layouts/default"
import Table from "@/components/ui/Table"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { capitalize } from "@/utils/string"

const Inventory = () => {
  const { data: player } = useGetPlayer()

  const rows = Object.entries(player?.inventory || []).map(
    ([item, possession]) => [capitalize(item), possession]
  )

  return (
    <DefaultLayout>
      <h1 className="text-3xl font-serif text mb-8">Inventory</h1>

      <Table headings={["Item", "Possession"]} rows={rows} />
    </DefaultLayout>
  )
}

export default Inventory
