import Header from "./components/header";
import Hero from "./components/hero";

export default function Home() {
  return (
    <div className="max-w-[1600px] px-[5%] sm:px-[10%] mx-auto">
      <Header />
      <Hero />
    </div>
  );
}
