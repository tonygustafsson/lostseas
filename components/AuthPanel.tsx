import { signIn, signOut, useSession } from "next-auth/react";
import Button from "./ui/Button";
import Link from "next/link";

const AuthPanel = () => {
  const { data: session, status } = useSession();

  const loading = status === "loading";

  if (loading) return null;

  return (
    <>
      {session ? (
        <>
          <p>Signed in as {session?.user?.name}</p>
          <Button onClick={() => signOut()}>Sign out</Button>
        </>
      ) : (
        <>
          <Button onClick={() => signIn()}>Sign in</Button>
          <Link href="/register" className="text-xs">
            Register
          </Link>
        </>
      )}
    </>
  );
};

export default AuthPanel;
