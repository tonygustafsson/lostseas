import DefaultLayout from "@/components/layouts/default"
import LocationHero from "@/components/LocationHero"
import LoggedOutHero from "@/components/LoggedOutHero"

const Home = () => (
  <DefaultLayout>
    <LocationHero />
    <LoggedOutHero />
  </DefaultLayout>
)

export default Home
