import CrewBoard from "@/components/crew/CrewBoard"
import DefaultLayout from "@/components/layouts/default"
import { getLoggedInPlayer } from "@/utils/app/getLoggedInPlayer"

export const metadata = {
  title: "Crew",
}

export default async function Page() {
  const player = await getLoggedInPlayer()

  if (!player) {
    return <p>Access denied</p>
  }

  return (
    <DefaultLayout>
      <>
        <h1 className="text mb-8 font-serif text-3xl">Crew members</h1>
        <CrewBoard />
      </>
    </DefaultLayout>
  )
}
