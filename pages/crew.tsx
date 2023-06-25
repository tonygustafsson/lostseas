import { GetServerSideProps } from "next"
import { useMemo, useState } from "react"
import { BsHeartPulseFill } from "react-icons/bs"
import { FaUsers } from "react-icons/fa"
import { TbMoodSmileBeam } from "react-icons/tb"

import DefaultLayout from "@/components/layouts/default"
import MerchandiseCard from "@/components/MerchandiseCard"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import TextField from "@/components/ui/TextField"
import { MERCHANDISE } from "@/constants/merchandise"
import { useCrew } from "@/hooks/queries/useCrew"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getMedicineEffectiveness } from "@/utils/crew"
import { getLoggedInServerSideProps } from "@/utils/next/getLoggedInServerSideProps"

type Item = "medicine" | "doubloons"

const Crew = () => {
  const { data: player } = useGetPlayer()
  const { giveMedicine } = useCrew()

  const [medicineQuantity, setMedicineQuantity] = useState(1)
  const [doubloonsQuantity, setDoubloonsQuantity] = useState(1)

  const changeQuantity = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: Item
  ) => {
    const setQuantity =
      item === "medicine" ? setMedicineQuantity : setDoubloonsQuantity

    if (e.target.value === "") {
      setQuantity(1)
    } else {
      setQuantity(parseInt(e.target.value))
    }
  }

  const increase = (item: Item) => {
    const setQuantity =
      item === "medicine" ? setMedicineQuantity : setDoubloonsQuantity
    setQuantity((prev) => prev + 1)
  }

  const decrease = (item: Item) => {
    const quantity = item === "medicine" ? medicineQuantity : doubloonsQuantity
    const setQuantity =
      item === "medicine" ? setMedicineQuantity : setDoubloonsQuantity

    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const medicineEffectiveness = useMemo(
    () =>
      getMedicineEffectiveness(
        player?.crewMembers.count || 0,
        player?.crewMembers.health || 0,
        medicineQuantity
      ),
    [player?.crewMembers, medicineQuantity]
  )

  const medicineIsDisabled = useMemo(
    () =>
      (player?.inventory.medicine || 0) < medicineQuantity ||
      medicineQuantity < 1,
    [player?.inventory.medicine, medicineQuantity]
  )

  const handleGiveMedicine = () => {
    giveMedicine({ playerId: player?.id || "", medicine: medicineQuantity })
  }

  return (
    <DefaultLayout>
      <>
        <h1 className="text-3xl font-serif text mb-8">Crew members</h1>
        <div className="stats bg-transparent gap-2 mt-4">
          <div className="stat bg-gray-700">
            <div className="stat-figure text-secondary">
              <FaUsers className="h-8 w-8" />
            </div>
            <div className="stat-title">Count</div>
            <div className="stat-value text-2xl">
              {player?.crewMembers.count}
            </div>
          </div>

          <div className="stat bg-gray-700">
            <div className="stat-figure text-secondary">
              <BsHeartPulseFill className="h-8 w-8" />
            </div>
            <div className="stat-title">Health</div>
            <div className="stat-value text-2xl">
              {player?.crewMembers.health}
            </div>
          </div>

          <div className="stat bg-gray-700">
            <div className="stat-figure text-secondary">
              <TbMoodSmileBeam className="h-8 w-8" />
            </div>
            <div className="stat-title">Mood</div>
            <div className="stat-value text-2xl">
              {player?.crewMembers.mood}
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-8 justify-center">
          <MerchandiseCard
            title="Give medicine"
            indicator={player?.inventory.medicine?.toString() || "0"}
            icon={<MerchandiseIcon item="Medicine" />}
            disabled={medicineIsDisabled}
            body={
              <>
                <p>{MERCHANDISE.medicine.description}</p>
                <p>
                  Your crew will have a health of{" "}
                  <strong>{medicineEffectiveness}%</strong> with the current
                  amount.
                </p>
              </>
            }
            actions={
              <>
                <div className="join">
                  <button
                    onClick={() => decrease("medicine")}
                    className="btn btn-sm btn-primary join-item"
                  >
                    -
                  </button>

                  <TextField
                    value={medicineQuantity.toString()}
                    onChange={(e) => changeQuantity(e, "medicine")}
                    type="number"
                    name={""}
                    size="sm"
                    fullWidth={false}
                    className={`join-item ${medicineQuantity < 10 && "w-9"} ${
                      medicineQuantity < 100 && "w-11"
                    } ${medicineQuantity < 1000 && "w-14"} hide-number-arrows`}
                  />

                  <button
                    onClick={() => increase("medicine")}
                    className="btn btn-sm btn-primary join-item"
                  >
                    +
                  </button>
                </div>

                <button
                  className="btn btn-primary btn-sm"
                  disabled={medicineIsDisabled}
                  onClick={handleGiveMedicine}
                >
                  Give medicine
                </button>
              </>
            }
          />

          <MerchandiseCard
            title="Give doubloons"
            indicator={player?.character.doubloons.toString() || "0"}
            icon={<MerchandiseIcon item="Doubloons" />}
            body={
              <>
                <p>
                  Give some doubloons to your crew members to improve their
                  mood. More crew members means more doubloons needed.
                </p>
              </>
            }
            actions={
              <>
                <div className="join">
                  <button
                    onClick={() => decrease("doubloons")}
                    className="btn btn-sm btn-primary join-item"
                  >
                    -
                  </button>

                  <TextField
                    value={doubloonsQuantity.toString()}
                    onChange={(e) => changeQuantity(e, "doubloons")}
                    type="number"
                    name={""}
                    size="sm"
                    fullWidth={false}
                    className={`join-item ${doubloonsQuantity < 10 && "w-9"} ${
                      doubloonsQuantity < 100 && "w-11"
                    } ${doubloonsQuantity < 1000 && "w-14"} hide-number-arrows`}
                  />

                  <button
                    onClick={() => increase("doubloons")}
                    className="btn btn-sm btn-primary join-item"
                  >
                    +
                  </button>
                </div>

                <button className="btn btn-primary btn-sm">
                  Give doubloons
                </button>
              </>
            }
          />
        </div>
      </>
    </DefaultLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) =>
  getLoggedInServerSideProps(context)

export default Crew
