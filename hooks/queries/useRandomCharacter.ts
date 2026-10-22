import { useQuery } from "@tanstack/react-query"

export const useRandomCharacter = (excludedCharacterId: string) => {
  const { refetch: fetchRandomCharacter, isFetching: isRandomizing } = useQuery(
    {
      queryKey: ["randomCharacter", excludedCharacterId],
      queryFn: async () => {
        const res = await fetch(
          `/api/user/getRandomCharacter?excludeCharacterId=${encodeURIComponent(excludedCharacterId)}`
        )
        return res.json() as Promise<CharacterCreation>
      },
      enabled: false,
      gcTime: 0,
    }
  )

  return { fetchRandomCharacter, isRandomizing }
}
