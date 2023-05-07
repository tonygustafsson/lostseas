import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next"
import { useRouter } from "next/router"
import { getCsrfToken } from "next-auth/react"

import CenteredLayout from "@/components/layouts/centered"
import Button from "@/components/ui/Button"
import TextField from "@/components/ui/TextField"

const Login = ({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const error = router.query.error

  return (
    <CenteredLayout>
      <h1 className="font-serif text-4xl mb-8">Sign in</h1>

      <form
        method="post"
        action="/api/auth/callback/credentials"
        className="w-full flex flex-col gap-2 max-w-md"
      >
        <TextField type="hidden" name="csrfToken" defaultValue={csrfToken} />

        <TextField label="Username" id="username" name="username" autoFocus />
        <TextField
          type="password"
          label="Password"
          id="password"
          name="password"
        />

        {error && <p className="text-red-500">{error}</p>}

        <Button type="submit" className="mt-4">
          Sign in
        </Button>
      </form>
    </CenteredLayout>
  )
}

export default Login

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}
