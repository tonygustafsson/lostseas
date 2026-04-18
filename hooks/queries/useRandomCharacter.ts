import { useQuery } from "@tanstack/react-query"

export const useRandomCharacter = () => {
  const { refetch: fetchRandomCharacter, isFetching: isRandomizing } = useQuery(
    {
      queryKey: ["randomCharacter"],
      queryFn: async () => {
        const res = await fetch(`/api/user/getRandomCharacter`)
        return res.json() as Promise<CharacterCreation>
      },
      enabled: false,
    }
  )

  return { fetchRandomCharacter, isRandomizing }
}
