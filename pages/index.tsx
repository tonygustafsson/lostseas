import pacifico from "@/font-pacifico";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <main className={`${pacifico.variable} flex flex-col p-24`}>
      <h1 className="font-serif text-4xl mb-4">Lost Seas</h1>

      {status === "authenticated" && (
        <p>You are {session?.user?.characterName}</p>
      )}
    </main>
  );
}
