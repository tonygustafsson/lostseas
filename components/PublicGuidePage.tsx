import { ArrowLeft, BookOpenText } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import GuideContent from "@/components/GuideContent"
import { Button } from "@/components/ui/button"

const PublicGuidePage = () => (
  <div className="bg-background text-foreground relative isolate min-h-screen overflow-hidden">
    <Image
      src="/img/startpage-bg.webp"
      fill
      priority
      sizes="100vw"
      alt=""
      aria-hidden="true"
      className="fixed inset-0 -z-20 object-cover object-[44%_center] opacity-35"
    />
    <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,13,19,0.75)_0%,rgba(5,13,19,0.88)_36rem,var(--background)_76rem)]" />
    <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_68%_12%,rgba(232,153,78,0.18),transparent_42%)]" />

    <header className="border-border mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 border-b px-4 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="flex items-center gap-3"
        aria-label="Lost Seas home"
      >
        <Image
          src="/img/logo.svg"
          alt=""
          width={42}
          height={34}
          className="h-8 w-auto"
        />
        <span className="font-serif text-2xl tracking-wide text-amber-50 sm:text-3xl">
          Lost Seas
        </span>
      </Link>
      <Button
        asChild
        variant="outline"
        className="bg-card/75 hover:bg-muted rounded-full border-white/15 text-amber-50 hover:text-amber-100"
      >
        <Link href="/">
          <ArrowLeft aria-hidden="true" />
          <span className="hidden sm:inline">Back to Lost Seas</span>
          <span className="sm:hidden">Back</span>
        </Link>
      </Button>
    </header>

    <main className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
      <section className="flex max-w-3xl items-start gap-6 py-12 sm:py-16">
        <div className="hidden size-14 shrink-0 items-center justify-center rounded-2xl border border-amber-200/20 bg-amber-200/10 text-amber-200 sm:flex">
          <BookOpenText className="size-7" aria-hidden="true" />
        </div>
        <div>
          <h1 className="font-serif text-4xl leading-tight text-amber-50 sm:text-5xl lg:text-6xl">
            Player Guide
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-100/75">
            New to the open seas? Learn how to provision your ship, grow your
            crew, earn your standing, and make the most of every voyage.
          </p>
        </div>
      </section>

      <GuideContent appearance="public" />

      <footer className="bg-card/80 mt-8 flex flex-col gap-5 rounded-3xl border border-amber-200/15 p-5 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-amber-300 uppercase">
            Ready to set sail?
          </p>
          <p className="mt-1 font-serif text-2xl text-amber-50">
            Your story starts in Lost Seas.
          </p>
        </div>
        <Button asChild size="lg" variant="highlight">
          <Link href="/">Back to Lost Seas</Link>
        </Button>
      </footer>
    </main>
  </div>
)

export default PublicGuidePage
