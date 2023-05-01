import pacifico from "@/font-pacifico";
import Button from "@/components/ui/Button";
import { useRouter } from "next/router";
import { useState } from "react";
import DefaultLayout from "@/components/layouts/default";

export default function Register() {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const json = JSON.stringify(Object.fromEntries(formData.entries()));

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: json,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseJson = await response.json();

      router.push("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <DefaultLayout>
      <form
        onSubmit={handleSubmit}
        className={`${pacifico.variable} flex flex-col gap-4 max-w-md`}
      >
        <h2 className="text-2xl">Player</h2>

        <label>
          Name
          <input name="name" type="text" className="text-black px-2 ml-4" />
        </label>

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

        <h2 className="text-2xl">Character</h2>

        <label>
          Name
          <input
            name="characterName"
            type="text"
            className="text-black px-2 ml-4"
          />
        </label>

        <label>
          Age
          <input
            name="characterAge"
            type="number"
            min={15}
            max={80}
            className="text-black px-2 ml-4"
          />
        </label>

        {error && <p className="text-red-500">{error}</p>}

        <Button type="submit">Register</Button>
      </form>
    </DefaultLayout>
  );
}
