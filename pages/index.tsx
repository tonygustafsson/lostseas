import pacifico from "@/font-pacifico";

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${pacifico.className}`}
    >
      <h1 className="text-4xl">Lost Seas</h1>
    </main>
  );
}
