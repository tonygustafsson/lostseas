import { ArrowLeft, BookOpenText } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import GuideContent from "@/components/GuideContent"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Player Guide",
}

export default async function Page() {
  return (
    <div className="bg-background text-foreground relative isolate min-h-dvh overflow-hidden">
      <div className="pointer-events-none fixed inset-0 -z-20">
        <Image
          src="/img/startpage-bg.png"
          fill
          priority
          sizes="100vw"
          alt=""
          aria-hidden="true"
          className="object-cover object-[40%_center] brightness-75"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 flex flex-col">
        <div className="relative h-screen">
          <div className="from-background/95 via-background/80 to-background/55 lg:via-background/70 lg:to-background/20 absolute inset-0 bg-linear-to-r" />
          <div className="to-background/95 absolute inset-0 bg-linear-to-b from-transparent from-40%" />
        </div>

        <div className="bg-background/95 flex-1" />
      </div>

      <header className="border-border mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 border-b px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="Lost Seas home"
        >
          <Image
            src="/img/logo.svg"
            alt=""
            width={42}
            height={34}
            className="h-8 w-auto"
          />
          <span className="text-parchment font-serif text-2xl tracking-wide sm:text-3xl">
            Lost Seas
          </span>
        </Link>
        <Button
          asChild
          variant="outline"
          className="bg-card/75 hover:bg-muted text-parchment hover:text-gold-light rounded-full border-white/15"
        >
          <Link href="/">
            <ArrowLeft aria-hidden="true" />
            <span className="hidden sm:inline">Back to Lost Seas</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </Button>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <section className="flex max-w-3xl items-start gap-6 py-12 sm:py-16">
          <div className="border-gold/20 bg-gold/10 text-gold-light hidden size-14 shrink-0 items-center justify-center rounded-2xl border sm:flex">
            <BookOpenText className="size-7" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-parchment font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Player Guide
            </h1>
            <p className="text-foreground/75 mt-4 max-w-2xl text-lg leading-8">
              New to the open seas? Learn how to provision your ship, grow your
              crew, earn your standing, and make the most of every voyage.
            </p>
          </div>
        </section>

        <GuideContent appearance="public" />

        <footer className="bg-card/80 border-gold/15 mt-8 flex flex-col gap-4 rounded-3xl border p-6 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="text-gold text-xs font-semibold tracking-widest uppercase">
              Ready to set sail?
            </p>
            <p className="text-parchment mt-1 font-serif text-2xl">
              Your story starts in Lost Seas.
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/">Back to Lost Seas</Link>
          </Button>
        </footer>
      </main>
    </div>
  )
}
