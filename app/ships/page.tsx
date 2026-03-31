import DefaultLayout from "@/components/layouts/default"
import FittingsList from "@/components/ships/FittingsList"
import ShipList from "@/components/ships/ShipList"
import { getLoggedInPlayer } from "@/utils/app/getLoggedInPlayer"

export const metadata = {
  title: "Ships",
}

export default async function Page() {
  const player = await getLoggedInPlayer()

  if (!player) {
    return <p>Access denied</p>
  }

  return (
    <DefaultLayout>
      <h1 className="text mb-8 font-serif text-3xl">Ships</h1>
      <ShipList />

      <h2 className="mt-8 mb-4 font-serif text-2xl">Ship fittings</h2>
      <FittingsList player={player} />
    </DefaultLayout>
  )
}
