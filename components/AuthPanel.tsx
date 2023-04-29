import { signIn, signOut, useSession } from "next-auth/react";
import Button from "./ui/Button";

const AuthPanel = () => {
  const { data: session, status } = useSession();

  const loading = status === "loading";

  if (loading) return null;

  return (
    <>
      {session ? (
        <p>
          <p>Signed in as {session?.user?.email}</p>
          <Button onClick={() => signOut()}>Sign out</Button>
        </p>
      ) : (
        <>
          <Button onClick={() => signIn()}>Sign in</Button>
        </>
      )}
    </>
  );
};

export default AuthPanel;
