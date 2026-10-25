import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  type ColorUsage,
  colorUsage,
  elementOpacity,
  scannedAt,
} from "./colorUsage.data"

const sections: { kind: ColorUsage["kind"]; title: string }[] = [
  { kind: "token", title: "Theme tokens" },
  { kind: "palette", title: "Tailwind palette" },
  { kind: "literal", title: "Literal values" },
  { kind: "derived", title: "Derived from tokens" },
]

const sum = (colors: ColorUsage[]) =>
  colors.reduce((total, color) => total + color.count, 0)

const total = (record: Record<string, number>) =>
  Object.values(record).reduce((sum, count) => sum + count, 0)

const sortedEntries = (record: Record<string, number>) =>
  Object.entries(record).sort(([, a], [, b]) => b - a)

const Swatch = ({ css }: { css: string }) => (
  <div className="border-border size-12 shrink-0 rounded-md border bg-white">
    <div className="size-full rounded-md" style={{ background: css }} />
  </div>
)

const Counts = ({ record }: { record: Record<string, number> }) => (
  <div className="flex flex-wrap gap-1">
    {sortedEntries(record).map(([label, count]) => (
      <Badge key={label} variant="outline">
        {label} ×{count}
      </Badge>
    ))}
  </div>
)

const ColorTable = ({ colors }: { colors: ColorUsage[] }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Colour</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Token</TableHead>
        <TableHead className="text-right">Uses</TableHead>
        <TableHead>Opacity</TableHead>
        <TableHead>Utilities</TableHead>
        <TableHead>Files</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      {colors.map((color) => (
        <TableRow key={`${color.kind}-${color.name}`}>
          <TableCell>
            <Swatch css={color.css} />
          </TableCell>

          <TableCell className="font-semibold">{color.name}</TableCell>

          <TableCell>
            <code className="text-muted-foreground">{color.token}</code>
          </TableCell>

          <TableCell className="text-right text-lg font-bold">
            {color.count}
          </TableCell>

          <TableCell>
            <Counts record={color.variants} />
          </TableCell>

          <TableCell>
            <Counts record={color.utilities} />
          </TableCell>

          <TableCell>
            <details>
              <summary className="cursor-pointer">
                {Object.keys(color.files).length} files
              </summary>

              <ul className="text-muted-foreground mt-1 text-sm">
                {sortedEntries(color.files).map(([file, count]) => (
                  <li key={file}>
                    {file} ×{count}
                  </li>
                ))}
              </ul>
            </details>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

const ColorUsageOverview = () => (
  <div className="flex flex-col gap-12">
    <div>
      <h1 className="font-serif text-3xl">Colour usage</h1>

      <p className="text-muted-foreground">
        {colorUsage.length} distinct colours used {sum(colorUsage)} times.
        Scanned {scannedAt}. Regenerate with <code>npm run scan:colors</code>.
      </p>
    </div>

    {sections.map(({ kind, title }) => {
      const colors = colorUsage.filter((color) => color.kind === kind)
      if (colors.length === 0) return null

      return (
        <section key={kind} className="flex flex-col gap-4">
          <h2 className="font-serif text-2xl">
            {title} ({colors.length} colours, {sum(colors)} uses)
          </h2>

          <ColorTable colors={colors} />
        </section>
      )
    })}
  </div>
)

const colorOpacities = Object.entries(
  colorUsage.reduce<Record<string, Record<string, number>>>((steps, color) => {
    Object.entries(color.variants).forEach(([variant, count]) => {
      const step = variant.slice(1)
      steps[step] = { ...steps[step], [color.name]: count }
    })

    return steps
  }, {})
).sort(([a], [b]) => parseFloat(a) - parseFloat(b))

const OpacityPreview = ({ step }: { step: string }) => (
  <div className="border-border size-12 rounded-md border">
    <div
      className="bg-foreground size-full rounded-md"
      style={{ opacity: parseFloat(step) / 100 }}
    />
  </div>
)

const OpacityOverview = () => (
  <div className="flex flex-col gap-12">
    <div>
      <h1 className="font-serif text-3xl">Opacity usage</h1>

      <p className="text-muted-foreground">
        {colorOpacities.length} opacity steps on colours and{" "}
        {Object.keys(elementOpacity).length} on elements. Scanned {scannedAt}.
      </p>
    </div>

    <section className="flex flex-col gap-4">
      <h2 className="font-serif text-2xl">
        Colour opacity (modifiers like /50 and alpha in literals)
      </h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Preview</TableHead>
            <TableHead>Step</TableHead>
            <TableHead className="text-right">Uses</TableHead>
            <TableHead>Colours</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {colorOpacities.map(([step, colors]) => (
            <TableRow key={step}>
              <TableCell>
                <OpacityPreview step={step} />
              </TableCell>

              <TableCell className="font-semibold">/{step}</TableCell>

              <TableCell className="text-right text-lg font-bold">
                {total(colors)}
              </TableCell>

              <TableCell>
                <Counts record={colors} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>

    <section className="flex flex-col gap-4">
      <h2 className="font-serif text-2xl">
        Element opacity (opacity-* and inline styles)
      </h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Preview</TableHead>
            <TableHead>Step</TableHead>
            <TableHead className="text-right">Uses</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Object.entries(elementOpacity).map(([step, count]) => (
            <TableRow key={step}>
              <TableCell>
                <OpacityPreview step={step} />
              </TableCell>

              <TableCell className="font-semibold">opacity-{step}</TableCell>

              <TableCell className="text-right text-lg font-bold">
                {count}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  </div>
)

const meta = {
  title: "design/Colour usage",
  component: ColorUsageOverview,
  parameters: { layout: "padded" },
} satisfies Meta<typeof ColorUsageOverview>
export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {}

export const Opacities: Story = { render: () => <OpacityOverview /> }
