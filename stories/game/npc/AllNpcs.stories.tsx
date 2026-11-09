import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import Image from "next/image"
import type { ReactNode } from "react"

import Flag from "@/components/icons/Flag"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NPC_LINES, PERSONALITIES } from "@/constants/dialogue"
import { TOWNS } from "@/constants/locations"
import { getNpcImage, NPCS, PLACEMENT_LOCATION } from "@/constants/npcs"

const towns = Object.keys(TOWNS) as Town[]
const placements = Object.keys(PLACEMENT_LOCATION) as NpcPlacement[]

const Portrait = ({ npc }: { npc: Npc }) => (
  <div className="border-gold/30 relative aspect-square w-full overflow-hidden rounded-xl border">
    <Image
      src={getNpcImage(npc)}
      alt={npc.name}
      fill
      sizes="256px"
      className="object-cover"
    />
  </div>
)

const DialogueList = ({ entries }: { entries: DialogueEntry[] }) => (
  <ol className="flex flex-col gap-4">
    {entries.map((entry) => (
      <li key={entry.id} className="flex flex-col gap-2">
        <span className="text-muted-foreground font-mono text-xs">
          {entry.id}
        </span>

        <p className="text-foreground">{entry.text}</p>

        {entry.answers?.map((answer) => (
          <div
            key={answer.text}
            className="border-border flex flex-col gap-1 border-l-2 pl-4"
          >
            <p className="text-parchment">{answer.text}</p>

            <ul className="text-muted-foreground list-disc pl-4">
              {answer.replies.map((reply) => (
                <li key={reply}>{reply}</li>
              ))}
            </ul>
          </div>
        ))}
      </li>
    ))}
  </ol>
)

const Field = ({ label, value }: { label: string; value: ReactNode }) => (
  <div className="flex flex-col">
    <dt className="text-muted-foreground text-xs">{label}</dt>
    <dd className="text-foreground">{value}</dd>
  </div>
)

const NpcDetails = ({ npc }: { npc: Npc }) => {
  const ownLines = NPC_LINES[npc.id] ?? []
  const personalityLines = PERSONALITIES[npc.personality]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif text-xl">{npc.name}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <div className="grid gap-6 sm:grid-cols-[minmax(0,12rem)_1fr]">
          <Portrait npc={npc} />

          <dl className="grid grid-cols-2 gap-4 text-sm">
            <Field label="Building" value={PLACEMENT_LOCATION[npc.placement]} />
            <Field label="Placement" value={npc.placement} />
            <Field label="Town" value={npc.town} />
            <Field label="Nationality" value={TOWNS[npc.town].nation} />
            <Field label="Gender" value={npc.gender} />
            <Field label="Age" value={npc.age} />
            <Field label="Personality" value={npc.personality} />
            <div className="col-span-2">
              <Field
                label="Id"
                value={<span className="font-mono text-xs">{npc.id}</span>}
              />
            </div>
          </dl>
        </div>

        <p className="text-muted-foreground text-sm">{npc.description}</p>

        <Accordion type="multiple">
          <AccordionItem value="own">
            <AccordionTrigger>Own lines ({ownLines.length})</AccordionTrigger>

            <AccordionContent>
              <DialogueList entries={ownLines} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="personality">
            <AccordionTrigger>
              Personality lines, {npc.personality} ({personalityLines.length})
            </AccordionTrigger>

            <AccordionContent>
              <DialogueList entries={personalityLines} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}

type Args = {
  town: Town | "All"
  placement: NpcPlacement | "All"
}

const AllNpcs = ({ town, placement }: Args) => {
  const shownTowns = towns.filter((name) => town === "All" || name === town)

  return (
    <div className="flex flex-col gap-16">
      {shownTowns.map((name) => (
        <section key={name} className="flex flex-col gap-6">
          <h2 className="text-parchment flex items-center gap-2 font-serif text-3xl">
            <Flag nation={TOWNS[name].nation} size={32} decorative />
            {name}
          </h2>

          <div className="grid gap-6 xl:grid-cols-3">
            {NPCS.filter(
              (npc) =>
                npc.town === name &&
                (placement === "All" || npc.placement === placement)
            ).map((npc) => (
              <NpcDetails key={npc.id} npc={npc} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

const meta = {
  title: "game/Townsfolk/All NPCs",
  component: AllNpcs,
  args: { town: "All", placement: "All" },
  argTypes: {
    town: { control: "select", options: ["All", ...towns] },
    placement: { control: "select", options: ["All", ...placements] },
  },
} satisfies Meta<typeof AllNpcs>

export default meta

type Story = StoryObj<typeof meta>

export const AllTowns: Story = {}

export const OneTown: Story = {
  args: { town: "Port Royale" },
}

export const Governors: Story = {
  args: { placement: "governor" },
}
