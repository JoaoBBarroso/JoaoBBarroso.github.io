import HeaderSection from "@/components/header";
import Footer from "@/components/footer";
import AboutInfo from "@/components/aboutInfo";

export default function About() {
  return (
    <div className="w-full grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-6 gap-16 sm:p-20 sm:pb-4 font-[family-name:var(--font-geist-sans)]">
      <HeaderSection />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <AboutInfo />
      </main>
      <Footer />
    </div>
  );
}
