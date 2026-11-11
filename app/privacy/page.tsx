import { ArrowLeft, ShieldCheck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"

import Logo from "@/components/Logo"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Privacy policy",
}

const GITHUB_ISSUES_URL = "https://github.com/tonygustafsson/lostseas/issues"

const Section = ({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) => (
  <section className="space-y-2">
    <h2 className="text-parchment font-serif text-2xl">{title}</h2>
    <div className="text-foreground/80 space-y-2 leading-7">{children}</div>
  </section>
)

export default function Page() {
  return (
    <div className="bg-background text-foreground relative isolate min-h-dvh overflow-x-clip">
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
        <Link href="/" aria-label="Lost Seas home">
          <Logo />
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

      <main className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <section className="mx-auto flex max-w-3xl items-start gap-6 py-12 sm:py-16">
          <div className="border-gold/20 bg-gold/10 text-gold-light hidden size-14 shrink-0 items-center justify-center rounded-2xl border sm:flex">
            <ShieldCheck className="size-7" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-parchment font-serif text-3xl leading-tight sm:text-5xl lg:text-6xl">
              Privacy policy
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Last updated 11 November 2026
            </p>
            <p className="text-foreground/75 mt-4 max-w-2xl text-lg leading-8">
              Lost Seas is a free browser game made as a hobby project. There
              are no ads, no in-app purchases and nothing for sale. Play it
              however you like.
            </p>
          </div>
        </section>

        <div className="bg-card/80 border-border mx-auto max-w-3xl space-y-8 rounded-3xl border p-6 backdrop-blur-xl sm:p-8">
          <Section title="What we store">
            <p>
              When you create a character we store your game data, like your
              captain&apos;s name, ships, crew, gold, cargo and log book, in a
              database hosted on Google Firebase. You don&apos;t need to give us
              your real name, email address or phone number.
            </p>
          </Section>

          <Section title="Cookies">
            <p>
              We use one cookie to remember your player ID so you stay signed
              in. If you sign in with a passkey, we store the public part of the
              passkey and use a short-lived cookie during sign-in. We don&apos;t
              use advertising or tracking cookies.
            </p>
          </Section>

          <Section title="Analytics">
            <p>
              We use Vercel Web Analytics and Speed Insights to count anonymous
              page visits and measure how fast the game loads. They don&apos;t
              use cookies and don&apos;t identify you personally.
            </p>
          </Section>

          <Section title="Sharing">
            <p>
              We don&apos;t sell or share your data with anyone. It&apos;s only
              processed by the services the game runs on, which are Vercel and
              Google Firebase.
            </p>
          </Section>

          <Section title="Children">
            <p>
              The game is set in the 17th century and includes references to
              alcohol and tobacco. It doesn&apos;t knowingly collect personal
              information from anyone, including children.
            </p>
          </Section>

          <Section title="Deleting your data">
            <p>
              No personal information is asked for when you register, so your
              character can&apos;t be linked to you. You can stop playing at any
              time. If you want your character deleted, open an issue on GitHub
              and we&apos;ll remove it.
            </p>
          </Section>

          <Section title="Changes">
            <p>
              We may update this page now and then. The date at the top shows
              when it last changed.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions? Open an issue on{" "}
              <a
                href={GITHUB_ISSUES_URL}
                className="text-parchment hover:text-gold-light underline underline-offset-4"
              >
                GitHub
              </a>
              .
            </p>
          </Section>
        </div>
      </main>
    </div>
  )
}
