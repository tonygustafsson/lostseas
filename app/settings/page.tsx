import DefaultLayout from "@/components/layouts/default"
import SettingsPanel from "@/components/settings/SettingsPanel"
import { getLoggedInPlayer } from "@/utils/next/getLoggedInServerSidePropsApp"

export const metadata = {
  title: "Settings",
}

export default async function Page() {
  const player = await getLoggedInPlayer()

  if (!player) {
    return <p>Access denied</p>
  }

  return (
    <DefaultLayout>
      <h1 className="text mb-6 font-serif text-3xl">Settings</h1>

      <SettingsPanel playerId={player.id} createdDate={player.createdDate} />
    </DefaultLayout>
  )
}
