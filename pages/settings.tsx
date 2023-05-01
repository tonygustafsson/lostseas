import pacifico from "@/font-pacifico";
import Button from "@/components/ui/Button";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSession } from "next-auth/react";
import DefaultLayout from "@/components/layouts/default";
import CenteredLayout from "@/components/layouts/centered";

export default function Settings() {
  const router = useRouter();
  const { data: session, update, status } = useSession();

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const json = JSON.stringify(Object.fromEntries(formData.entries()));

    try {
      const response = await fetch("/api/auth/settings", {
        method: "POST",
        body: json,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseJson = await response.json();

      update();
      router.push("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (status !== "authenticated") {
    return <p>Access denied</p>;
  }

  return (
    <CenteredLayout>
      <h1 className="font-serif text-4xl mb-8">Settings</h1>

      <form
        onSubmit={handleSubmit}
        className={`${pacifico.variable} flex flex-col gap-4 max-w-md`}
      >
        <h2 className="font-serif text-2xl">Player</h2>

        <input type="hidden" name="id" defaultValue={session?.user?.id || ""} />

        <label htmlFor="name">Name</label>

        <input
          id="name"
          name="name"
          type="text"
          defaultValue={session?.user?.name || ""}
          className="text-black px-2"
        />

        <h2 className="font-serif text-2xl mt-8">Character</h2>

        <label htmlFor="characterName">Name</label>

        <input
          id="characterName"
          name="characterName"
          type="text"
          defaultValue={session?.user?.characterName || ""}
          className="text-black px-2"
        />

        <label htmlFor="characterAge">Age</label>

        <input
          id="characterAge"
          name="characterAge"
          type="number"
          min={15}
          max={80}
          defaultValue={session?.user?.characterAge || ""}
          className="text-black px-2"
        />

        {error && <p className="text-red-500">{error}</p>}

        <Button type="submit" className="mt-4">
          Save
        </Button>
      </form>
    </CenteredLayout>
  );
}
