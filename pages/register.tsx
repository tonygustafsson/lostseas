import pacifico from "@/font-pacifico";
import Button from "@/components/ui/Button";
import { useRouter } from "next/router";
import { useState } from "react";

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
      console.log(responseJson);

      router.push("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${pacifico.variable} flex flex-col gap-4 max-w-md`}
    >
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

      {error && <p className="text-red-500">{error}</p>}

      <Button type="submit">Register</Button>
    </form>
  );
}
