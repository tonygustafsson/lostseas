import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getCsrfToken } from "next-auth/react";
import pacifico from "@/font-pacifico";
import Button from "@/components/ui/Button";
import { useRouter } from "next/router";
import CenteredLayout from "@/components/layouts/centered";

export default function Login({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const error = router.query.error;

  return (
    <CenteredLayout>
      <h1 className="font-serif text-4xl mb-8">Sign in</h1>

      <form
        method="post"
        action="/api/auth/callback/credentials"
        className={`${pacifico.variable} flex flex-col gap-2 max-w-md`}
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

        <label htmlFor="email">Username</label>

        <input
          id="email"
          name="email"
          type="text"
          autoFocus
          className="text-black px-2"
        />

        <label htmlFor="password">Password</label>

        <input
          id="password"
          name="password"
          type="password"
          className="text-black px-2"
        />

        {error && <p className="text-red-500">{error}</p>}

        <Button type="submit" className="mt-4">
          Sign in
        </Button>
      </form>
    </CenteredLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
