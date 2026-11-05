"use client"

import {
  Anchor,
  ArrowRight,
  BookOpenText,
  Compass,
  ShieldCheck,
  Ship,
  Sparkles,
  Waves,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import type { LeaderboardEntry } from "@/firebase/db"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import Leaderboard from "./Leaderboard"
import RegistrationForm from "./RegistrationForm"
import Screenshots from "./Screenshots"
import SignInOptions from "./SignInOptions"
import SocialMedia from "./SocialMedia"
import { Button } from "./ui/button"

type Props = {
  initialCharacter: CharacterCreation
  leaderboard: LeaderboardEntry[]
}

const StartPageScreen = ({ initialCharacter, leaderboard }: Props) => {
  const { data: player } = useGetPlayer()

  if (player) return null

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

      <div className="mx-auto flex max-w-7xl flex-col px-4 pb-16 sm:px-6 lg:px-8">
        <header className="border-border flex min-h-20 items-center gap-4 border-b">
          <Link
            href="/"
            className="flex items-center gap-4"
            aria-label="Lost Seas home"
          >
            <Image src="/img/logo.svg" alt="" width={48} height={37} />
            <span className="text-parchment font-serif text-2xl tracking-wide sm:text-3xl">
              Lost Seas
            </span>
          </Link>
        </header>

        <section aria-labelledby="page-title" className="max-w-5xl py-12">
          <div className="bg-card/70 border-gold/20 text-gold-light mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold tracking-widest uppercase">
            <Waves className="size-4" aria-hidden="true" />
            The Caribbean, 1640
          </div>
          <h1
            id="page-title"
            className="text-parchment max-w-3xl font-serif text-5xl leading-none tracking-tight sm:text-6xl lg:text-7xl"
          >
            Your story begins <span className="text-gold">at sea.</span>
          </h1>
          <p className="text-foreground/80 mt-6 max-w-2xl text-lg leading-8 sm:text-xl">
            Lost Seas is a free browser game set in 1640. Start as a simple
            pirate, then earn your reputation, build a crew, command ships, and
            make your fortune across the open seas.
          </p>
        </section>

        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.9fr)]">
          <section
            id="register"
            aria-labelledby="register-title"
            className="bg-card/90 scroll-mt-8 rounded-3xl border border-white/15 p-6 sm:p-8 lg:p-12"
          >
            <div className="mb-8 flex items-start gap-6">
              <div className="border-gold/20 bg-gold/10 text-gold-light hidden size-12 shrink-0 items-center justify-center rounded-2xl border sm:flex">
                <Anchor className="size-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-gold mb-1 text-xs font-semibold tracking-widest uppercase">
                  Start the adventure
                </p>
                <h2
                  id="register-title"
                  className="text-parchment font-serif text-3xl sm:text-4xl"
                >
                  Your Legend Begins Here
                </h2>
                <p className="text-foreground/70 mt-2 max-w-xl leading-6">
                  Choose who you&apos;ll be. It&apos;s free to play, and you can
                  begin without sharing an email address.
                </p>
              </div>
            </div>
            <RegistrationForm initialCharacter={initialCharacter} />
          </section>

          <section
            id="sign-in"
            aria-labelledby="sign-in-title"
            className="bg-card/85 border-border scroll-mt-8 rounded-3xl border p-6 backdrop-blur-xl sm:p-8"
          >
            <div className="mb-4">
              <p className="text-gold mb-1 text-xs font-semibold tracking-widest uppercase">
                Already have a character?
              </p>
              <h2
                id="sign-in-title"
                className="text-parchment font-serif text-2xl sm:text-3xl"
              >
                Back aboard
              </h2>
            </div>

            <SignInOptions />
          </section>
        </div>

        {leaderboard.length > 0 && (
          <section
            id="leaderboard"
            aria-labelledby="leaderboard-title"
            className="border-border mt-16 border-t pt-12 sm:pt-16"
          >
            <p className="text-gold mb-1 text-xs font-semibold tracking-widest uppercase">
              Hall of fame
            </p>
            <h2
              id="leaderboard-title"
              className="text-parchment mb-6 font-serif text-3xl sm:text-4xl"
            >
              Captains of the Caribbean
            </h2>

            <Leaderboard entries={leaderboard} />
          </section>
        )}

        <section
          id="more"
          aria-labelledby="more-title"
          className="border-border mt-16 border-t pt-12 sm:pt-16"
        >
          <div className="max-w-3xl">
            <p className="text-gold mb-2 text-xs font-semibold tracking-widest uppercase">
              The world beyond the horizon
            </p>
            <h2
              id="more-title"
              className="text-parchment font-serif text-3xl sm:text-4xl"
            >
              A new life on the open seas
            </h2>
            <p className="text-foreground/75 mt-4 text-lg leading-8">
              Sail between towns, hunt for treasure, trade, and take on rival
              ships.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <article className="bg-card/80 border-border rounded-2xl border p-6 backdrop-blur">
              <div className="bg-gold/10 text-gold-light mb-4 flex size-10 items-center justify-center rounded-xl">
                <Compass className="size-5" aria-hidden="true" />
              </div>
              <h3 className="text-parchment font-serif text-xl">
                Four rival nations
              </h3>
              <p className="text-foreground/70 mt-2 leading-6">
                Explore 16 ports across England, France, Spain and Holland, each
                with its own atmosphere and imagery.
              </p>
            </article>

            <article className="bg-card/80 border-border rounded-2xl border p-6 backdrop-blur">
              <div className="bg-gold/10 text-gold-light mb-4 flex size-10 items-center justify-center rounded-xl">
                <Ship className="size-5" aria-hidden="true" />
              </div>
              <h3 className="text-parchment font-serif text-xl">
                Ships, crew &amp; fame
              </h3>
              <p className="text-foreground/70 mt-2 leading-6">
                Recruit sailors, build your fleet, take on rival ships and rise
                through the titles from pirate to duke.
              </p>
            </article>

            <article className="bg-card/80 border-border rounded-2xl border p-6 backdrop-blur">
              <div className="bg-gold/10 text-gold-light mb-4 flex size-10 items-center justify-center rounded-xl">
                <Sparkles className="size-5" aria-hidden="true" />
              </div>
              <h3 className="text-parchment font-serif text-xl">
                Made to explore
              </h3>
              <p className="text-foreground/70 mt-2 leading-6">
                AI-created scenes, royalty-free music and sound effects that
                shift as your voyage unfolds.
              </p>
            </article>

            <article className="bg-card/80 border-border rounded-2xl border p-6 backdrop-blur">
              <div className="bg-gold/10 text-gold-light mb-4 flex size-10 items-center justify-center rounded-xl">
                <ShieldCheck className="size-5" aria-hidden="true" />
              </div>
              <h3 className="text-parchment font-serif text-xl">
                Free to play
              </h3>
              <p className="text-foreground/70 mt-2 leading-6">
                No ads, no purchases, and no email address or real name
                required.
              </p>
            </article>
          </div>

          <div className="from-background to-secondary mt-12 rounded-3xl border bg-linear-115 p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <div className="border-gold/25 bg-gold/10 text-gold-light flex size-14 shrink-0 items-center justify-center rounded-2xl border">
                <BookOpenText className="size-7" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <p className="text-gold mb-1 text-xs font-semibold tracking-widest uppercase">
                  New to Lost Seas?
                </p>
                <h3 className="text-parchment font-serif text-2xl sm:text-3xl">
                  Get your bearings with the Player Guide
                </h3>
                <p className="text-foreground/75 mt-2 leading-6">
                  Learn the ropes of sailing, supplies, ships, crew, and life in
                  the Caribbean.
                </p>
              </div>
              <Button
                asChild
                size="lg"

                className="shrink-0"
              >
                <Link href="/guide">
                  Open the guide
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-12 mb-4 sm:mt-16">
            <p className="text-gold mb-1 text-xs font-semibold tracking-widest uppercase">
              A glimpse of the voyage
            </p>
            <h2 className="text-parchment font-serif text-3xl sm:text-4xl">
              Screenshots
            </h2>
          </div>
          <Screenshots />

          <footer className="border-border mt-12 border-t pt-6">
            <SocialMedia className="my-0 text-white opacity-75" />
          </footer>
        </section>
      </div>
    </div>
  )
}

export default StartPageScreen
