import DefaultLayout from "@/components/layouts/default"
import CharacterInfo from "@/components/status/CharacterInfo"
import { getLoggedInPlayer } from "@/utils/app/getLoggedInPlayer"

export const metadata = {
  title: "Status",
}

export default async function Page() {
  const player = await getLoggedInPlayer()

  if (!player) {
    return <p>Access denied</p>
  }

  return (
    <DefaultLayout>
      <h1 className="text mb-6 font-serif text-3xl">Status</h1>

      <CharacterInfo />
    </DefaultLayout>
  )
}
