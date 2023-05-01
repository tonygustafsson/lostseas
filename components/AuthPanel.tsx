import { signIn, signOut, useSession } from "next-auth/react";
import Button from "./ui/Button";
import Link from "next/link";

const AuthPanel = () => {
  const { data: session, status } = useSession();

  const loading = status === "loading";

  if (loading) return null;

  return (
    <div className="bg-slate-800 flex gap-4 p-4 mb-4 justify-end align-middle">
      {session ? (
        <>
          <p>Signed in as {session?.user?.name}</p>
          <Button onClick={() => signOut()}>Sign out</Button>
          <Link href="/settings" className="text-xs">
            Settings
          </Link>{" "}
        </>
      ) : (
        <>
          <Button onClick={() => signIn()}>Sign in</Button>
          <Link href="/register" className="text-xs">
            Register
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthPanel;
