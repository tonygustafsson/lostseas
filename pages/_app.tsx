import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

function AuthLinks() {
  const { data: session, status } = useSession();

  const loading = status === "loading";

  if (loading) return null;

  return (
    <>
      {session ? (
        <p>
          <p>Signed in as {session?.user?.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </p>
      ) : (
        <>
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
    </>
  );
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider>
      <AuthLinks />

      <Component {...pageProps} />
    </SessionProvider>
  );
}
