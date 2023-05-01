import pacifico from "@/font-pacifico";
import Header from "../Header";

export default function CenteredLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />

      <main
        className={`${pacifico.variable} flex flex-col p-4 items-center mt-16 justify-center w-full`}
      >
        {children}
      </main>
    </>
  );
}
