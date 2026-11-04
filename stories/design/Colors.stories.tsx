import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Coins, Sailboat } from "lucide-react"
import { useState } from "react"
import tailwindColors from "tailwindcss/colors"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

import { colorUsage } from "./colorUsage.data"

type Token = { name: string; text?: string }

const shadcnTokens: { title: string; tokens: Token[] }[] = [
  {
    title: "Surfaces",
    tokens: [
      { name: "background", text: "foreground" },
      { name: "card", text: "card-foreground" },
      { name: "popover", text: "popover-foreground" },
      { name: "muted", text: "muted-foreground" },
      { name: "accent", text: "accent-foreground" },
    ],
  },
  {
    title: "Actions",
    tokens: [
      { name: "primary", text: "primary-foreground" },
      { name: "secondary", text: "secondary-foreground" },
      { name: "destructive" },
    ],
  },
  {
    title: "Lines and focus",
    tokens: [{ name: "border" }, { name: "input" }, { name: "ring" }],
  },
  {
    title: "Charts",
    tokens: [1, 2, 3, 4, 5].map((n) => ({ name: `chart-${n}` })),
  },
  {
    title: "Sidebar",
    tokens: [
      { name: "sidebar", text: "sidebar-foreground" },
      { name: "sidebar-primary", text: "sidebar-primary-foreground" },
      { name: "sidebar-accent", text: "sidebar-accent-foreground" },
      { name: "sidebar-border" },
      { name: "sidebar-ring" },
    ],
  },
]

const cargo = [
  "food",
  "water",
  "porcelain",
  "spices",
  "medicine",
  "tobacco",
  "rum",
  "sugar",
  "silk",
  "tea",
  "cotton",
]

const gameTokens: { title: string; tokens: Token[] }[] = [
  {
    title: "Gold",
    tokens: [{ name: "gold" }, { name: "gold-light" }, { name: "gold-dark" }],
  },
  { title: "Sea", tokens: [{ name: "sea" }, { name: "sea-dark" }] },
  { title: "Text", tokens: [{ name: "parchment" }] },
  {
    title: "Status",
    tokens: [
      { name: "success" },
      { name: "error" },
      { name: "warning" },
      { name: "info" },
    ],
  },
  { title: "Cargo", tokens: cargo.map((good) => ({ name: `cargo-${good}` })) },
]

const Page = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-background text-foreground flex flex-col gap-12 p-6">
    {children}
  </div>
)

let canvasContext: CanvasRenderingContext2D | null = null

/** Resolves any CSS colour (oklch, var(), named) to sRGB hex through a canvas. */
const toHex = (color: string) => {
  canvasContext ??= document
    .createElement("canvas")
    .getContext("2d", { willReadFrequently: true })
  if (!canvasContext) return "?"

  canvasContext.clearRect(0, 0, 1, 1)
  canvasContext.fillStyle = color
  canvasContext.fillRect(0, 0, 1, 1)

  const [r, g, b, a] = canvasContext.getImageData(0, 0, 1, 1).data
  const hex = (n: number) => n.toString(16).padStart(2, "0")

  return `#${hex(r)}${hex(g)}${hex(b)}${a < 255 ? hex(a) : ""}`
}

type SwatchProps = {
  name: string
  css: string
  label?: string
  text?: string
  used?: boolean
}

const Swatch = ({ name, css, label, text, used }: SwatchProps) => {
  const [hex, setHex] = useState<string>()

  return (
    <div className="flex w-32 flex-col gap-1 text-xs">
      <div
        ref={(element) => {
          if (element && hex === undefined) {
            setHex(toHex(getComputedStyle(element).backgroundColor))
          }
        }}
        className="border-border flex h-16 items-center justify-center rounded-md border font-serif text-xl"
        style={{ background: css, color: text }}
      >
        {text && "Aa"}
      </div>

      <span className="flex items-center gap-1 font-semibold">
        {name}
        {used && (
          <Badge variant="secondary" className="h-4 px-1">
            used
          </Badge>
        )}
      </span>

      {label && <code className="text-muted-foreground">{label}</code>}

      <code className="text-muted-foreground uppercase">{hex}</code>
    </div>
  )
}

const TokenGroups = ({
  groups,
}: {
  groups: { title: string; tokens: Token[] }[]
}) =>
  groups.map(({ title, tokens }) => (
    <section key={title} className="flex flex-col gap-4">
      <h2 className="text-parchment font-serif text-2xl">{title}</h2>

      <div className="flex flex-wrap gap-4">
        {tokens.map(({ name, text }) => (
          <Swatch
            key={name}
            name={name}
            css={`var(--${name})`}
            label={text ? `--${name} / --${text}` : `--${name}`}
            text={text && `var(--${text})`}
          />
        ))}
      </div>
    </section>
  ))

const usedPalette = new Set(
  colorUsage
    .filter((color) => color.kind === "palette")
    .map((color) => color.name)
)

const TailwindPalette = () => {
  const scales = Object.entries(tailwindColors).flatMap(([hue, shades]) =>
    typeof shades === "object"
      ? [[hue, shades as Record<string, string>] as const]
      : []
  )

  return (
    <Page>
      <p className="text-muted-foreground max-w-prose">
        Every colour Tailwind ships with. Components should use theme tokens
        instead, so a colour marked as used is a candidate for a token.
      </p>

      <section className="flex flex-col gap-4">
        <h2 className="text-parchment font-serif text-2xl">Base</h2>

        <div className="flex flex-wrap gap-4">
          {(["black", "white"] as const).map((name) => (
            <Swatch
              key={name}
              name={name}
              css={tailwindColors[name]}
              used={usedPalette.has(name)}
            />
          ))}
        </div>
      </section>

      {scales.map(([hue, shades]) => (
        <section key={hue} className="flex flex-col gap-4">
          <h2 className="text-parchment font-serif text-2xl capitalize">
            {hue}
          </h2>

          <div className="flex flex-wrap gap-2">
            {Object.entries(shades).map(([shade, css]) => (
              <Swatch
                key={shade}
                name={`${hue}-${shade}`}
                css={css}
                used={usedPalette.has(`${hue}-${shade}`)}
              />
            ))}
          </div>
        </section>
      ))}
    </Page>
  )
}

type Role = {
  title: string
  tokens: string[]
  use: string
  why: string
  example?: React.ReactNode
}

const roles: Role[] = [
  {
    title: "Sea is the world",
    tokens: ["background", "card", "secondary", "muted", "sea", "sea-dark"],
    use: "Page and panel surfaces, secondary buttons, and bars that measure something like cargo, voyage or journey progress.",
    why: "The background is already sea-tinted, so everything that is not asking for attention belongs to the same family and recedes.",
    example: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Button variant="secondary">Visit the market</Button>
        <Progress value={60} aria-label="Cargo" />
      </div>
    ),
  },
  {
    title: "Gold is the treasure",
    tokens: ["primary", "gold", "gold-light", "gold-dark"],
    use: "The one main action on a screen, money and value, gilded frames and the treasure strip.",
    why: "Like a treasure chest, gold only looks valuable when it is rare. Use at most one gold button per view so the next step is obvious.",
    example: (
      <div className="flex flex-wrap items-center gap-4">
        <Button>
          <Sailboat /> Set sail
        </Button>
        <span className="text-gold flex items-center gap-1 font-semibold tabular-nums">
          <Coins className="size-4" /> 1 250
        </span>
      </div>
    ),
  },
  {
    title: "Forms are sea",
    tokens: ["sea", "parchment", "input", "border", "ring"],
    use: "Switches, sliders and selected options use sea. Inputs stay on the input and border tokens. Only the submit button is gold.",
    why: "A control records a setting, it is not the main action. The gold focus ring is fine, since only one control has focus at a time.",
    example: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Switch defaultChecked aria-label="Music" />
        <Slider defaultValue={[60]} aria-label="Volume" />
        <Button className="self-start">Save</Button>
      </div>
    ),
  },
  {
    title: "Parchment for headings",
    tokens: ["parchment", "foreground", "muted-foreground"],
    use: "Parchment for headings and text on top of scene art. Foreground for body text, muted foreground for supporting text.",
    why: "Warm off-white matches the old-paper feel of the serif font and keeps headings from competing with gold.",
    example: (
      <div className="flex flex-col gap-1">
        <h3 className="text-parchment font-serif text-2xl">The harbour</h3>
        <p>Ships come and go with the tide.</p>
        <p className="text-muted-foreground text-sm">Open from dawn</p>
      </div>
    ),
  },
  {
    title: "Status only means status",
    tokens: ["success", "error", "warning", "info"],
    use: "Outcomes and states, like a won battle, a shortage or an overloaded hold.",
    why: "If these colours are used for decoration, players stop trusting them as signals.",
    example: (
      <div className="flex flex-wrap gap-2">
        <Button variant="success">Victory</Button>
        <Button variant="error">Too heavy</Button>
        <Button variant="warning">Low on food</Button>
        <Button variant="info">Tip</Button>
      </div>
    ),
  },
  {
    title: "Data colours stay in data",
    tokens: ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"],
    use: "Chart series, and the cargo tokens for each good in the hold.",
    why: "Each series needs to be told apart from the others. Outside charts they would add noise without meaning.",
  },
]

const ColourGuide = () => (
  <Page>
    <p className="text-muted-foreground max-w-prose">
      Two colours carry the game: sea for the world and gold for what matters.
      Always use theme tokens, never raw Tailwind palette classes.
    </p>

    {roles.map(({ title, tokens, use, why, example }) => (
      <section
        key={title}
        className="border-border flex flex-col gap-4 border-t pt-6"
      >
        <h2 className="text-parchment font-serif text-2xl">{title}</h2>

        <div className="flex flex-wrap gap-4">
          {tokens.map((name) => (
            <Swatch key={name} name={name} css={`var(--${name})`} />
          ))}
        </div>

        <div className="grid max-w-prose gap-2">
          <p>{use}</p>
          <p className="text-muted-foreground">{why}</p>
        </div>

        {example}
      </section>
    ))}
  </Page>
)

const meta = {
  title: "design/Colours",
  parameters: { layout: "fullscreen" },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Guide: Story = { render: () => <ColourGuide /> }

export const ShadcnTokens: Story = {
  render: () => (
    <Page>
      <TokenGroups groups={shadcnTokens} />
    </Page>
  ),
}

export const GameTokens: Story = {
  render: () => (
    <Page>
      <TokenGroups groups={gameTokens} />
    </Page>
  ),
}

export const TailwindPaletteColours: Story = {
  name: "Tailwind palette",
  render: () => <TailwindPalette />,
}
