import Navbar from "@/components/Navbar/page";
import HeroSection from "@/components/HeroSection/page";
import Join from "@/components/JoinCommunity/Join";
import Main from "@/components/EventSection/Main";
export default function Home() {
  return (
    <>
      <Navbar/>
      <HeroSection/>
      <Main />
      <Join />
    </>
  );
}
