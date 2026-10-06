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

import { useGetPlayer } from "@/hooks/queries/usePlayer"

import LoginForm from "./LoginForm"
import RegistrationForm from "./RegistrationForm"
import Screenshots from "./Screenshots"
import SocialMedia from "./SocialMedia"
import { Button } from "./ui/button"

const LoginScreen = () => {
  const { data: player } = useGetPlayer()

  if (player) return null

  return (
    <div className="bg-background text-foreground relative isolate min-h-screen overflow-hidden">
      <Image
        src="/img/startpage-bg.webp"
        fill
        priority
        sizes="100vw"
        alt=""
        aria-hidden="true"
        className="fixed inset-0 -z-20 object-cover object-[45%_center] opacity-45"
      />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,13,19,0.72)_0%,rgba(5,13,19,0.78)_34rem,var(--background)_78rem)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_68%_12%,rgba(232,153,78,0.2),transparent_42%)]" />

      <div className="mx-auto flex max-w-7xl flex-col px-4 pb-16 sm:px-6 lg:px-8">
        <header className="flex min-h-20 items-center gap-4 border-b border-white/10">
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
        </header>

        <section aria-labelledby="page-title" className="max-w-5xl py-12">
          <div className="bg-card/70 mb-6 inline-flex items-center gap-2 rounded-full border border-amber-100/20 px-3.5 py-1.5 text-xs font-semibold tracking-[0.16em] text-amber-200 uppercase shadow-lg shadow-black/20 backdrop-blur">
            <Waves className="size-4" aria-hidden="true" />
            The Caribbean, 1640
          </div>
          <h1
            id="page-title"
            className="max-w-3xl font-serif text-5xl leading-[1.04] tracking-tight text-amber-50 sm:text-6xl lg:text-7xl"
          >
            Your story begins <span className="text-accent">at sea.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100/80 sm:text-xl">
            Lost Seas is a free browser game set in 1640. Start as a simple
            pirate, then earn your reputation, build a crew, command ships, and
            make your fortune across the open seas.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <article className="bg-card/75 rounded-2xl border border-white/10 p-4 backdrop-blur">
              <Compass className="text-accent mb-3 size-5" aria-hidden="true" />
              <h2 className="font-serif text-lg text-amber-50">
                Four rival nations
              </h2>
              <p className="mt-1 text-sm leading-5 text-slate-200/65">
                Explore 16 ports across England, France, Spain, and Holland.
              </p>
            </article>
            <article className="bg-card/75 rounded-2xl border border-white/10 p-4 backdrop-blur">
              <Ship className="mb-3 size-5 text-sky-200" aria-hidden="true" />
              <h2 className="font-serif text-lg text-amber-50">
                Ships &amp; crew
              </h2>
              <p className="mt-1 text-sm leading-5 text-slate-200/65">
                Build your fleet, recruit sailors, and take on ships at sea.
              </p>
            </article>
            <article className="bg-card/75 rounded-2xl border border-white/10 p-4 backdrop-blur">
              <Sparkles
                className="mb-3 size-5 text-violet-200"
                aria-hidden="true"
              />
              <h2 className="font-serif text-lg text-amber-50">
                Make your name
              </h2>
              <p className="mt-1 text-sm leading-5 text-slate-200/65">
                Earn new titles, grow your wealth, and rise through the ranks.
              </p>
            </article>
            <article className="bg-card/75 rounded-2xl border border-white/10 p-4 backdrop-blur">
              <ShieldCheck
                className="mb-3 size-5 text-emerald-200"
                aria-hidden="true"
              />
              <h2 className="font-serif text-lg text-amber-50">Free to play</h2>
              <p className="mt-1 text-sm leading-5 text-slate-200/65">
                No ads, purchases, email address, or real name required.
              </p>
            </article>
          </div>
        </section>

        <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.9fr)]">
          <section
            id="register"
            aria-labelledby="register-title"
            className="bg-card/90 scroll-mt-8 rounded-3xl border border-white/15 p-5 shadow-[0_24px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:p-8 lg:p-10"
          >
            <div className="mb-7 flex items-start gap-6">
              <div className="hidden size-12 shrink-0 items-center justify-center rounded-2xl border border-amber-200/20 bg-amber-200/10 text-amber-200 sm:flex">
                <Anchor className="size-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-accent mb-1 text-xs font-semibold tracking-[0.16em] uppercase">
                  Join the crew
                </p>
                <h2
                  id="register-title"
                  className="font-serif text-3xl text-amber-50 sm:text-4xl"
                >
                  Sign on as a pirate
                </h2>
                <p className="mt-2 max-w-xl leading-6 text-slate-200/70">
                  Choose who you&apos;ll be. It&apos;s free to play, and you can
                  begin without sharing an email address.
                </p>
              </div>
            </div>
            <RegistrationForm />
          </section>

          <section
            id="sign-in"
            aria-labelledby="sign-in-title"
            className="bg-card/85 scroll-mt-8 rounded-3xl border border-white/10 p-5 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-8"
          >
            <div className="mb-5">
              <p className="mb-1 text-xs font-semibold tracking-[0.16em] text-sky-200 uppercase">
                Already have a character?
              </p>
              <h2
                id="sign-in-title"
                className="font-serif text-2xl text-amber-50 sm:text-3xl"
              >
                Back aboard
              </h2>
            </div>
            <LoginForm />
          </section>
        </div>

        <section
          id="more"
          aria-labelledby="more-title"
          className="mt-20 border-t border-white/10 pt-12 sm:mt-24 sm:pt-16"
        >
          <div className="max-w-3xl">
            <p className="text-accent mb-2 text-xs font-semibold tracking-[0.16em] uppercase">
              The world beyond the horizon
            </p>
            <h2
              id="more-title"
              className="font-serif text-3xl text-amber-50 sm:text-4xl"
            >
              A new life on the open seas
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-100/75">
              Sail between towns, hunt for treasure, trade, and take on rival
              ships. England, France, Spain, and Holland each hold four ports to
              discover, with their own atmosphere and imagery.
            </p>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            <article className="bg-card/80 rounded-2xl border border-white/10 p-5 backdrop-blur">
              <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-amber-200/10 text-amber-200">
                <Compass className="size-5" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl text-amber-50">Four nations</h3>
              <p className="mt-2 leading-6 text-slate-200/70">
                Explore the ports and waters claimed by England, France, Spain,
                and Holland.
              </p>
            </article>
            <article className="bg-card/80 rounded-2xl border border-white/10 p-5 backdrop-blur">
              <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-sky-200/10 text-sky-200">
                <Ship className="size-5" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl text-amber-50">
                Build your name
              </h3>
              <p className="mt-2 leading-6 text-slate-200/70">
                Earn better titles, grow your crew, find stronger ships, and
                build your fortune.
              </p>
            </article>
            <article className="bg-card/80 rounded-2xl border border-white/10 p-5 backdrop-blur">
              <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-emerald-200/10 text-emerald-200">
                <Sparkles className="size-5" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl text-amber-50">
                Made to explore
              </h3>
              <p className="mt-2 leading-6 text-slate-200/70">
                Discover AI-created scenes, royalty-free music, and sound
                effects that shift as your voyage unfolds.
              </p>
            </article>
          </div>

          <div className="mt-10 rounded-3xl border border-amber-200/20 bg-[linear-gradient(115deg,rgba(87,56,27,0.48),rgba(9,21,27,0.94)_58%)] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.24)] sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-amber-200/25 bg-amber-200/10 text-amber-200">
                <BookOpenText className="size-7" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <p className="text-accent mb-1 text-xs font-semibold tracking-[0.16em] uppercase">
                  New to Lost Seas?
                </p>
                <h3 className="font-serif text-2xl text-amber-50 sm:text-3xl">
                  Get your bearings with the Player Guide
                </h3>
                <p className="mt-2 leading-6 text-slate-200/75">
                  Learn the ropes of sailing, supplies, ships, crew, and life in
                  the Caribbean.
                </p>
              </div>
              <Button
                asChild
                size="lg"
                variant="highlight"
                className="shrink-0"
              >
                <Link href="/guide">
                  Open the guide
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-12 mb-5 sm:mt-16">
            <p className="text-accent mb-1 text-xs font-semibold tracking-[0.16em] uppercase">
              A glimpse of the voyage
            </p>
            <h2 className="font-serif text-3xl text-amber-50 sm:text-4xl">
              Screenshots
            </h2>
          </div>
          <Screenshots />

          <footer className="mt-10 border-t border-white/10 pt-5">
            <SocialMedia className="my-0 text-slate-300/70" />
          </footer>
        </section>
      </div>
    </div>
  )
}

export default LoginScreen
