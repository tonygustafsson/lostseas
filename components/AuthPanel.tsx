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
          <p className="font-serif">Signed in as {session?.user?.email}</p>
          <Button onClick={() => signOut()}>Sign out</Button>
        </>
      ) : (
        <>
          <Button onClick={() => signIn()}>Sign in</Button>
          <Link href="/register" className="font-serif text-xs">
            Register
          </Link>
        </>
      )}
    </>
  );
};

export default AuthPanel;
