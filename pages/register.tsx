import CenteredLayout from "@/components/layouts/centered"
import Button from "@/components/ui/Button"
import TextField from "@/components/ui/TextField"
import { useUserMutations } from "@/hooks/queries/useUser"

const Register = () => {
  const { register } = useUserMutations()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const inputData = Object.fromEntries(formData.entries()) as unknown as User

    register(inputData)
  }

  return (
    <CenteredLayout>
      <h1 className="font-serif text-4xl mb-8">Register</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-4 max-w-md"
      >
        <h2 className="font-serif text-2xl">Player</h2>

        <TextField id="name" name="name" label="Name" autoFocus />

        <h2 className="font-serif text-2xl mt-8">Character</h2>

        <TextField id="characterName" name="characterName" label="Name" />
        <TextField
          type="number"
          min={15}
          max={80}
          id="characterAge"
          name="characterAge"
          label="Age"
        />

        <Button type="submit" className="mt-4">
          Register
        </Button>
      </form>
    </CenteredLayout>
  )
}

export default Register
