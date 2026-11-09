import { deepFreeze } from "@/__tests__/helpers/createTestPlayer"
import type { createSeededRandom } from "@/__tests__/helpers/seededRandom"
import type { ActionResult } from "@/utils/actions/types"

import { findBadLogText, findBrokenRules } from "./checks"
import { addProblem, type Report } from "./report"

type Success<T extends object> = Extract<ActionResult<T>, { player: Player }>

type Outcome<T extends object> = ActionResult<T> | { blocked: true }

export type Game = {
  player: Player
  seed: number
  steps: number
  random: ReturnType<typeof createSeededRandom>
  report: Report
  /** The last few actions, to show how a problem came about */
  recent: string[]
  /** Prints every action when set */
  trace?: (line: string) => void
}

export const describeMoment = (game: Game) =>
  `seed ${game.seed}, day ${game.player.character.day}, after ${game.recent.join(" > ")}`

/**
 * Runs one action the way an API route would and keeps the new player.
 * The player is frozen first, so an action that mutates it throws.
 * Returns undefined when the action refused or blocked.
 */
export const act = <T extends object>(
  game: Game,
  action: string,
  run: (player: Player) => Outcome<T>,
  { expectSuccess = false } = {}
): Success<T> | undefined => {
  const previous = game.player
  let result: Outcome<T>

  game.steps++
  game.recent = [...game.recent.slice(-5), action]

  try {
    result = run(deepFreeze(structuredClone(previous)))
  } catch (error) {
    addProblem(
      game.report,
      `${action} threw: ${(error as Error).message}`,
      describeMoment(game)
    )

    return undefined
  }

  if ("blocked" in result) {
    game.trace?.(`${action}: blocked by the advisor`)

    return undefined
  }

  if ("error" in result) {
    const message = `${action}: ${result.error}`

    game.report.errors.set(message, (game.report.errors.get(message) ?? 0) + 1)
    game.trace?.(`${action}: refused, ${result.error}`)

    if (expectSuccess) {
      addProblem(
        game.report,
        `unexpected refusal ${message}`,
        describeMoment(game)
      )
    }

    return undefined
  }

  const brokenRules = [
    ...findBrokenRules(result.player, { player: previous, action }),
    findBadLogText(result.log),
  ]

  brokenRules
    .filter((rule) => rule !== undefined)
    .forEach((rule) => addProblem(game.report, rule, describeMoment(game)))

  game.player = result.player
  game.trace?.(
    `${action}: day ${result.player.character.day}, gold ${result.player.character.gold}${result.log ? `, "${result.log.message}"` : ""}`
  )

  return result
}
