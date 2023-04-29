import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getCsrfToken } from "next-auth/react";
import pacifico from "@/font-pacifico";
import Button from "@/components/ui/Button";
import { useRouter } from "next/router";

export default function Login({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const error = router.query.error;

  return (
    <form
      method="post"
      action="/api/auth/callback/credentials"
      className={`flex flex-col gap-4 max-w-md ${pacifico.className}`}
    >
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

      <label>
        Username
        <input name="email" type="text" className="text-black px-2 ml-4" />
      </label>

      <label>
        Password
        <input
          name="password"
          type="password"
          className="text-black px-2 ml-4"
        />
      </label>

      {error && <p className="text-red-500">{error}</p>}

      <Button type="submit">Sign in</Button>
    </form>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
