import useModal from "@/app/stores/modals"
import { Button } from "@/components/ui/button"

import AdvisorTips from "./AdvisorTips"

const DepartureWarnings = () => {
  const { removeModal } = useModal()

  return (
    <>
      <AdvisorTips title="Resolve these problems before setting sail." />

      <Button
        size="sm"
        className="justify-self-end"
        onClick={() => removeModal("departureWarnings")}
      >
        Stay in town
      </Button>
    </>
  )
}

export default DepartureWarnings
